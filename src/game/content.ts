import type { EventDefinition } from "../shared/types";

export const MVP_EVENTS: EventDefinition[] = [
  {
    id: "hotfix-urgent",
    title: "09:00 - Hotfix urgente",
    body: "Tu jefe pide un hotfix urgente en producción antes del mediodía.",
    weight: 1.2,
    cooldownDays: 1,
    options: [
      {
        id: "do-now",
        label: "Desplegar ahora",
        description: "Sube el estrés, sube la reputación.",
        effects: [
          { key: "stress", delta: 12 },
          { key: "reputation", delta: 6 },
          { key: "energy", delta: -8 }
        ]
      },
      {
        id: "negotiate",
        label: "Negociar un plazo realista",
        description: "Enfoque diplomático con ganancias moderadas.",
        effects: [
          { key: "stress", delta: 2 },
          { key: "reputation", delta: 4 },
          { key: "softSkills", delta: 1 }
        ]
      },
      {
        id: "delay",
        label: "Retrasar y repriorizar",
        description: "Proteges tu tiempo pero pierdes confianza.",
        effects: [
          { key: "stress", delta: -5 },
          { key: "reputation", delta: -8 },
          { key: "mood", delta: -4 }
        ]
      }
    ]
  },
  {
    id: "surprise-tax",
    title: "Aviso de impuestos inesperado",
    body: "Llega un ajuste fiscal. No es enorme, pero duele esta semana.",
    weight: 1,
    cooldownDays: 2,
    conditions: {
      minDay: 2
    },
    options: [
      {
        id: "pay-now",
        label: "Pagar de inmediato",
        description: "Pierdes dinero, reduces estrés futuro.",
        effects: [
          { key: "cash", delta: -110 },
          { key: "stress", delta: -3 },
          { key: "personalFinance", delta: 1 }
        ]
      },
      {
        id: "partial",
        label: "Pago parcial",
        description: "Menor impacto en efectivo, ligero aumento de estrés.",
        effects: [
          { key: "cash", delta: -55 },
          { key: "stress", delta: 4 }
        ]
      },
      {
        id: "ignore",
        label: "Ignorar por ahora",
        description: "Sin pago inmediato, mayor estrés.",
        effects: [{ key: "stress", delta: 10 }, { key: "mood", delta: -6 }]
      }
    ]
  },
  {
    id: "party-invite",
    title: "Fiesta de networking el viernes",
    body: "Te invitaron a una fiesta de la comunidad dev en el centro.",
    weight: 0.9,
    cooldownDays: 2,
    options: [
      {
        id: "go-party",
        label: "Ir y hacer networking",
        description: "Gastas dinero, ganas ánimo y reputación.",
        effects: [
          { key: "cash", delta: -60 },
          { key: "mood", delta: 15 },
          { key: "reputation", delta: 5 },
          { key: "softSkills", delta: 1 }
        ]
      },
      {
        id: "skip-party",
        label: "Quedarte y recargar",
        description: "Descansas más, pierdes la oportunidad de socializar.",
        effects: [
          { key: "energy", delta: 12 },
          { key: "stress", delta: -8 },
          { key: "reputation", delta: -2 }
        ]
      }
    ]
  },
  {
    id: "laptop-break",
    title: "Tu laptop empieza a fallar",
    body: "Los tiempos de compilación se duplicaron y los cuelgues aleatorios empeoran.",
    weight: 0.8,
    cooldownDays: 3,
    conditions: {
      minDay: 3
    },
    options: [
      {
        id: "repair",
        label: "Reparar ahora",
        description: "Pagas ahora por estabilidad y menos estrés.",
        effects: [
          { key: "cash", delta: -140 },
          { key: "stress", delta: -6 },
          { key: "mood", delta: 4 }
        ]
      },
      {
        id: "push-through",
        label: "Seguir con el equipo dañado",
        description: "Ahorras dinero pero el rendimiento sufre.",
        effects: [
          { key: "stress", delta: 10 },
          { key: "energy", delta: -10 },
          { key: "reputation", delta: -3 }
        ]
      }
    ]
  },
  {
    id: "mentor-course",
    title: "Un mentor recomienda un curso",
    body: "Un mentor senior te recomienda un curso práctico de arquitectura backend.",
    weight: 1.1,
    cooldownDays: 2,
    options: [
      {
        id: "buy-course",
        label: "Tomar el curso",
        description: "Gastas dinero, ganas conocimiento y confianza.",
        effects: [
          { key: "cash", delta: -95 },
          { key: "knowledge", delta: 10 },
          { key: "backend", delta: 2 },
          { key: "mood", delta: 5 }
        ]
      },
      {
        id: "self-study",
        label: "Estudiar por tu cuenta",
        description: "Menores ganancias a menor costo.",
        effects: [
          { key: "cash", delta: -15 },
          { key: "knowledge", delta: 4 },
          { key: "backend", delta: 1 }
        ]
      }
    ]
  }
];
