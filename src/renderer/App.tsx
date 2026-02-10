import { useEffect, useMemo, useState } from "react";
import type {
  DayAction,
  DailySummary,
  GameClock,
  GameState,
  PendingEventView,
  TurnResult
} from "../shared/types";

const SLOT_ID = 1;
const MAX_MVP_DAY = 7;

type LoadRunResponse = {
  state: GameState;
  summary: DailySummary;
  meta: {
    createdAt: string;
    lastPlayedAt: string;
    playtimeSeconds: number;
    version: string;
  };
} | null;

type StartRunResponse = {
  state: GameState;
  summary: DailySummary;
};

type ApplyActionResponse = {
  state: GameState;
  result: TurnResult;
};

const ACTIONS: Array<{ key: DayAction; label: string }> = [
  { key: "WORK", label: "Trabajar" },
  { key: "CONTRACT", label: "Contrato" },
  { key: "STUDY", label: "Estudiar" },
  { key: "REST", label: "Descansar" },
  { key: "LEISURE", label: "Ocio" }
];

function formatMoney(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatDate(clock: GameClock): string {
  const month = String(clock.month).padStart(2, "0");
  const day = String(clock.day).padStart(2, "0");
  const hour = String(clock.hour).padStart(2, "0");
  return `${clock.year}-${month}-${day} ${hour}:00`;
}

export function App() {
  const [state, setState] = useState<GameState | null>(null);
  const [summary, setSummary] = useState<DailySummary | null>(null);
  const [pendingEvent, setPendingEvent] = useState<PendingEventView | null>(null);
  const [narrative, setNarrative] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bootAttempt, setBootAttempt] = useState(0);

  async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const timeout = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`${label} timed out after ${ms}ms`));
      }, ms);
    });
    try {
      return await Promise.race([promise, timeout]);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }

  useEffect(() => {
    async function bootstrap() {
      setBusy(true);
      try {
        if (!window.gameApi) {
          throw new Error("Game API is not available. Preload may have failed to load.");
        }
        const loaded = (await withTimeout(
          window.gameApi.loadRun(SLOT_ID),
          8000,
          "loadRun"
        )) as LoadRunResponse;
        if (loaded) {
          setState(loaded.state);
          setSummary(loaded.summary);
          setNarrative([`Partida cargada. Día ${loaded.state.day}.`]);
          return;
        }
        const created = (await withTimeout(
          window.gameApi.startNewRun(SLOT_ID),
          8000,
          "startNewRun"
        )) as StartRunResponse;
        setState(created.state);
        setSummary(created.summary);
        setNarrative(["Nueva partida iniciada. Construye tu semana."]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setBusy(false);
      }
    }
    void bootstrap();
  }, [bootAttempt]);

  const isFinished = Boolean(state && state.day > MAX_MVP_DAY);

  const sceneClass = useMemo(() => {
    if (!state) {
      return "desk-scene";
    }
    if (state.energy < 30) {
      return "desk-scene tired";
    }
    if (state.stress > 70) {
      return "desk-scene stressed";
    }
    return "desk-scene typing";
  }, [state]);

  async function handleStartNewRun() {
    setBusy(true);
    setError(null);
    try {
      const created = (await window.gameApi.startNewRun(SLOT_ID)) as StartRunResponse;
      setState(created.state);
      setSummary(created.summary);
      setPendingEvent(null);
      setNarrative(["Partida reiniciada. Comienza el día 1."]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleApplyAction(action: DayAction) {
    if (busy || !state || pendingEvent || isFinished) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const response = (await window.gameApi.applyAction({
        slotId: SLOT_ID,
        dayAction: action
      })) as ApplyActionResponse;
      setState(response.state);
      setSummary({
        day: response.state.day,
        clock: response.state.clock,
        mode: response.state.mode,
        cash: response.state.cash,
        energy: response.state.energy,
        stress: response.state.stress,
        reputation: response.state.reputation,
        productivity: response.state.productivity,
        mood: response.state.mood,
        goals: response.state.activeGoals
      });
      setNarrative((prev) => [...response.result.narrative, ...prev].slice(0, 16));
      setPendingEvent(response.result.triggeredEvent);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleResolveEvent(optionId: string) {
    if (busy || !state || !pendingEvent || isFinished) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const response = (await window.gameApi.applyAction({
        slotId: SLOT_ID,
        eventOptionId: optionId
      })) as ApplyActionResponse;
      setState(response.state);
      setSummary({
        day: response.state.day,
        clock: response.state.clock,
        mode: response.state.mode,
        cash: response.state.cash,
        energy: response.state.energy,
        stress: response.state.stress,
        reputation: response.state.reputation,
        productivity: response.state.productivity,
        mood: response.state.mood,
        goals: response.state.activeGoals
      });
      setNarrative((prev) => [...response.result.narrative, ...prev].slice(0, 16));
      setPendingEvent(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (!state || !summary) {
    return (
      <div className="loading">
        <p>Cargando juego...</p>
        {error ? <p className="error">{error}</p> : null}
        <button onClick={() => setBootAttempt((value) => value + 1)} disabled={busy}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <main className="layout">
      <section className="left-panel">
        <header className="title-row">
          <h1>Dev Life Tycoon</h1>
          <button onClick={() => void handleStartNewRun()} disabled={busy}>
            Nueva Partida
          </button>
        </header>
        <div className={sceneClass}>
          <div className="screen-glow" />
          <div className="developer">
            <div className="head" />
            <div className="body" />
            <div className="arm left" />
            <div className="arm right" />
          </div>
          <div className="desk" />
          <div className="monitor" />
        </div>
        <div className="feed">
          <h2>Historial</h2>
          {pendingEvent ? (
            <div className="event-box">
              <h3>{pendingEvent.title}</h3>
              <p>{pendingEvent.body}</p>
              <div className="event-options">
                {pendingEvent.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => void handleResolveEvent(option.id)}
                    disabled={busy}
                  >
                    {option.label}
                    <small>{option.description}</small>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="event-placeholder">Elige tu actividad principal del día.</p>
          )}
          <ul>
            {narrative.map((line, index) => (
              <li key={`${line}-${index}`}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="right-panel">
        <div className="clock">
          {formatDate(summary.clock)}
          <span className="clock-day">Día {summary.day > MAX_MVP_DAY ? MAX_MVP_DAY : summary.day} / 7</span>
        </div>
        {isFinished && <p className="done">Semana MVP completada. Inicia una nueva partida para volver a jugar.</p>}
        <div className="stats-grid">
          <StatCard label="Modo" value={summary.mode === "EMPLOYEE" ? "Empleado" : "Freelancer"} />
          <StatCard label="Dinero" value={formatMoney(summary.cash)} />
          <StatCard label="Energía" value={`${summary.energy}`} />
          <StatCard label="Estrés" value={`${summary.stress}`} />
          <StatCard label="Reputación" value={`${summary.reputation}`} />
          <StatCard label="Productividad" value={`${summary.productivity}`} />
          <StatCard label="Ánimo" value={`${summary.mood}`} />
          <StatCard label="Gasto Diario" value={formatMoney(state.burnRate)} />
        </div>
        <div className="goals">
          <h3>Objetivos</h3>
          <ul>
            {summary.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </div>
        <div className="action-grid">
          {ACTIONS.map((action) => (
            <button
              key={action.key}
              onClick={() => void handleApplyAction(action.key)}
              disabled={busy || Boolean(pendingEvent) || isFinished}
            >
              {action.label}
            </button>
          ))}
        </div>
        {error ? <p className="error">{error}</p> : null}
      </aside>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
