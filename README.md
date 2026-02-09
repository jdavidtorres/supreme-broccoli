# Dev Life Tycoon

Un juego tipo **dev tycoon / life sim** donde vives la carrera de un desarrollador: puedes ser **empleado** o **freelancer por contratos**, administras tu **dinero** (gastas, ahorras, inviertes), manejas tu **energía/estrés** y tomas decisiones a través de **cajas de texto** mientras ves una **personita** trabajando en su PC.

> **Stack objetivo:** Electron (desktop)

---

## 1) Elevator pitch

Eres un dev en un apartaestudio. Cada día eliges qué hacer: aceptar contratos, trabajar horas extra, estudiar, descansar, salir de fiesta, invertir, comprar equipo… y cada elección cambia tus stats, tus oportunidades y tu estilo de vida.

El juego mezcla:

* **Decisiones** (texto + opciones)
* **Progresión** (skills, reputación, salud, carrera)
* **Economía personal** (presupuesto realista, inversión, deudas)
* **Visual cozy** (personita + escenarios: escritorio / cama / ciudad)

---

## 2) Fantasía del jugador

* Sentir el “power fantasy” de pasar de dev junior quebrado a dev senior/inversor con libertad.
* Tomar decisiones con consecuencias: **dinero vs. salud vs. progreso**.
* Vivir el loop adictivo de “un día más” por mejoras, eventos y oportunidades.

---

## 3) Loop principal (core gameplay)

1. **Inicio del día**: resumen (dinero, energía, estrés, objetivos)
2. **Decisión del día**: escoger actividad principal (trabajo / contrato / estudio / descanso / ocio)
3. **Mini-decisiones**: eventos aleatorios y decisiones rápidas
4. **Resultado**: cambios en stats + progreso de carrera/contratos
5. **Fin de día**: gastos fijos, estado de ánimo, desbloqueos
6. Repetir

---

## 4) Modos de vida

### A) Empleado

* Sueldo fijo
* Beneficios (posibles)
* Performance reviews
* Ascensos
* Jefe/compañeros
* Menos riesgo, crecimiento gradual

### B) Freelancer / Contratos

* Ingresos variables
* Negociación (precio/tiempo)
* Riesgo de impagos
* Reputación y portafolio
* Mayor techo de ingresos, más estrés

> Se puede permitir cambiar de modo con decisiones clave (renunciar, despedido, aceptar empleo, etc.).

---

## 5) Economía personal (sistema de dinero)

### Ingresos

* Sueldo (empleado)
* Pagos por contratos
* Ingresos pasivos (inversiones)

### Gastos

* Fijos: arriendo, servicios, comida
* Variables: ocio/fiestas, hobbies, compras
* Inversiones: fondos/acciones/cripto (según enfoque)
* Mejoras: PC, silla, cursos, café premium 😄

### Objetivos

* Colchón de emergencia
* Comprar mejor setup
* Mudarte a un lugar mejor
* Viaje / lujo (por ejemplo un reloj)

---

## 6) Stats del personaje (propuesta)

* 💰 **Cash**: dinero disponible
* 🧾 **Burn rate**: gastos diarios promedio
* 🔋 **Energía** (0-100)
* 😵 **Estrés** (0-100)
* 🧠 **Conocimiento** (skills)
* ⭐ **Reputación** (profesional)
* 🧑‍💻 **Productividad** (depende de energía/estrés/skills)
* 😊 **Ánimo** (influye en eventos y productividad)

---

## 7) Skills (árbol de progresión)

* Backend (Java/Spring)
* Frontend (Angular/React)
* DevOps (Docker, CI/CD)
* Soft skills (negociación, liderazgo)
* Finanzas personales (mejores decisiones de inversión)

> Suben con estudio, trabajo real, cursos y proyectos.

---

## 8) Presentación / Arte

### Vista principal

* Personita sentada frente al PC.
* UI con:

  * Panel de stats
  * Caja de texto narrativa
  * Botones de decisión
  * Calendario/clock del día

### Escenarios (fondos)

* **Escritorio** (trabajo/coding)
* **Cama** (descanso / burnout / reflexión)
* **Cocina** (comer / meal prep / gastar)
* **Ciudad** (fiesta, networking, eventos)

### Animaciones simples

* Teclear
* Cambiar postura
* Dormir
* Alertas en el PC (build fail, PR review, deploy)

---

## 9) UI/UX (texto + decisiones)

El juego se cuenta en un feed tipo “historia del día”, por ejemplo:

> **09:00** Tu jefe pide un hotfix urgente. ¿Qué haces?

* A) Lo haces ya (estrés +10, reputación +5)
* B) Negocias plazo (soft skills check)
* C) Lo pospones (reputación -10)

---

## 10) Eventos (ideas rápidas)

* Cliente quiere “una app como Uber” por 200 USD
* Te llega un impuesto inesperado
* Te invitan a una fiesta el viernes
* Oferta laboral en otra ciudad
* Se daña el portátil
* Un mentor te recomienda un curso
* Crisis: burnout / ansiedad

---

## 11) Roadmap (MVP → Full)

### MVP (jugable rápido)

* Un escenario (escritorio)
* Empleado + 5 eventos
* 7 días jugables
* Stats básicos (cash/energía/estrés/reputación)

### V1

* 2 escenarios (escritorio + cama)
* Freelancer básico
* 30+ eventos
* Mejoras de PC/cursos

### V2

* Inversiones
* Más escenarios
* Misiones largas (proyectos)
* Metas y finales

V3

* Competencia
* Compra de otras apps
* Conteo y solución de bugs

---

## 12) Tech (Electron) – notas iniciales

* Electron + React  para UI
* Estado del juego en:

  * JSON local (save files)
  * o SQLite (si queremos más robustez)
* Motor de eventos: tabla/archivo con condiciones y efectos
* Animaciones 2D simples (Sprites/Lottie/Canvas)

---

## 13) Próximas decisiones de diseño

* ¿Tiempo por turnos (días) o continuo (horas)?
* ¿Realismo financiero (muy real) o arcade?
* ¿Tono: humor, serio, o mixto?
* ¿Finales: libertad financiera, burnout, startup, etc.?
