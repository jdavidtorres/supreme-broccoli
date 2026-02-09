# Dev Life Tycoon (working title)

Un juego tipo **dev tycoon / life sim** donde vives la carrera de un desarrollador: puedes ser **empleado** o **freelancer por contratos**, administras tu **dinero** (gastas, ahorras, inviertes), manejas tu **energía/estrés** y tomas decisiones a través de **cajas de texto** mientras ves una **personita** trabajando en su PC.

> **Stack objetivo:** Electron (desktop) + SQLite

---

## 1) Elevator pitch

Eres un dev en un apartaestudio. Cada día eliges qué hacer: aceptar contratos, trabajar horas extra, estudiar, descansar, salir de fiesta, invertir, comprar equipo… y cada elección cambia tus stats, tus oportunidades y tu estilo de vida.

El juego mezcla:

- **Decisiones** (texto + opciones)
- **Progresión** (skills, reputación, salud, carrera)
- **Economía personal** (presupuesto realista, inversión, deudas)
- **Visual cozy** (personita + escenarios: escritorio / cama / ciudad)

---

## 2) Fantasía del jugador

- Sentir el “power fantasy” de pasar de dev junior quebrado a dev senior/inversor con libertad.
- Tomar decisiones con consecuencias: **dinero vs. salud vs. progreso**.
- Vivir el loop adictivo de “un día más” por mejoras, eventos y oportunidades.

---

## 3) Ciclo de vida (2010 → 2025)

El juego cubre **15 años** de carrera: desde **2010 hasta 2025**.

- El progreso se mide en **días** (loop diario) y se agrupa en **semanas/meses/años** para hitos.
- Cada año puede desbloquear:
  - nuevas tecnologías y tendencias
  - mejores tipos de trabajo/contratos
  - eventos macro (crisis, boom tech, cambios de mercado)

> El objetivo es que el jugador sienta evolución real: **junior → mid → senior → lead / indie / inversionista**.

---

## 4) Tiempo, velocidades y loop principal

El juego corre en **tiempo continuo** durante la jornada laboral, con **4 velocidades**:

- ⏸️ **Pausado**
- ▶️ **Velocidad 1**
- ⏩ **Velocidad 2**
- ⏭️ **Velocidad 3**

### Conversión de tiempo

- **1 hora del juego = 1 segundo** (multiplicado por la velocidad elegida).
- Un “día” dura **solo el periodo de trabajo** (base 8h; hasta 12h con perks).

### Estructura de eventos

- Por cada **semana** pueden aparecer hasta **4 eventos** (work, vida personal, finanzas, salud, etc.).
- Los eventos pueden dispararse:
  - durante el trabajo (mientras corre el tiempo)
  - durante el descanso (sleep)

### Sleep y “skip” natural

- Cuando llega la hora de dormir, el jugador puede **pasar al siguiente día**.
- Durante la dormida pueden ocurrir eventos (sueños, ansiedad, llamada, emergencia, etc.), pero se **resuelven al día siguiente** como parte del “Inicio del día”.

### Loop diario

1. **Inicio del día**: resumen + resolución de eventos de sueño pendientes
2. **Plan de jornada**: elegir tareas (trabajo/contrato/estudio/ocio) y asignar horas
3. **Jornada en tiempo real**: el reloj corre (pausa/velocidades 1–3)
4. **Eventos de la semana**: pueden interrumpir con decisiones
5. **Fin de jornada**: resultados (dinero, XP, reputación, energía/estrés)
6. **Dormir**: aplicar recuperación y encolar eventos nocturnos
7. Repetir

---

## 4) Modos de vida

### A) Empleado

- Sueldo fijo
- Beneficios (posibles)
- Performance reviews
- Ascensos
- Jefe/compañeros
- Menos riesgo, crecimiento gradual

### B) Freelancer / Contratos

- Ingresos variables
- Negociación (precio/tiempo)
- Riesgo de impagos
- Reputación y portafolio
- Mayor techo de ingresos, más estrés

> Se puede permitir cambiar de modo con decisiones clave (renunciar, despedido, aceptar empleo, etc.).

---

## 5) Economía personal (realista)

La economía busca sentirse **como vida real**, sin volverse una hoja de Excel imposible.

### Ingresos

- Sueldo (empleado)
- Pagos por contratos (freelancer)
- Bonos / comisiones (eventos)
- Ingresos pasivos (inversiones)

### Gastos

- **Fijos:** arriendo, servicios, internet, plan celular, transporte, comida básica
- **Salud:** EPS/seguro (según país), medicamentos, terapia (eventos)
- **Deuda:** tarjeta, créditos (intereses mensuales)
- **Variables:** ocio/fiestas, citas, hobbies, delivery
- **Mejoras:** PC, silla, cursos, café premium 😄

### Impuestos y fricción realista

- Retención/Impuestos (empleado)
- Impuestos por ingresos (freelancer, con riesgo de sanción si ignoras)
- Eventos de gastos inesperados (daños, multas, emergencias)

### Líneas de crédito y deuda

El jugador puede acceder a **líneas de crédito** que permiten suavizar crisis o acelerar decisiones, pero con consecuencias a largo plazo.

- Tipos de crédito:
  - **Tarjeta de crédito** (límite bajo/medio, interés alto)
  - **Crédito personal** (monto medio, interés variable)
  - **Crédito preferencial** (desbloqueable con alto patrimonio y reputación)

- Condiciones del crédito dependen de:
  - **Patrimonio neto** (cash + inversiones − deudas)
  - **Estabilidad de ingresos**
  - **Historial de pagos**
  - **Score financiero interno** (no visible directamente)

### Score financiero (sistema interno)

El juego mantiene un **score financiero oculto** que representa la confianza del sistema financiero en el jugador.

- El score **no se muestra como número exacto**, solo como rangos narrativos:
  - Riesgo alto
  - Riesgo medio
  - Buen perfil
  - Perfil excelente

#### Cómo sube el score

- Pagar créditos y tarjetas **a tiempo**
- Mantener un **burn rate bajo** respecto a ingresos
- Ahorrar de forma constante
- Mantener deuda controlada
- Tener ingresos estables

#### Cómo baja el score

- Retrasos en pagos
- Uso excesivo de crédito
- Deuda alta sostenida
- Crisis financieras frecuentes

#### Impacto del score

- Define **tasas de interés** (mejor score → menor interés)
- Define **límites de crédito**
- Desbloquea **créditos preferenciales**
- Modifica eventos bancarios (ofertas, rechazos, refinanciaciones)
- Influye en el **reporte final narrativo**

### Compra de cartera (unificación de deudas)

Pueden aparecer eventos u ofertas de **compra de cartera**, donde un banco (o el mismo) propone **unificar deudas** existentes.

- Requisitos comunes:
  - score financiero medio o alto
  - historial de pagos aceptable

- Efectos posibles:
  - reducción de la tasa de interés global
  - extensión o reducción del plazo
  - simplificación a una sola cuota mensual

- Trade-offs:
  - costos administrativos iniciales
  - mayor plazo total (más intereses a largo plazo)

> Estas ofertas refuerzan la sensación de progresión financiera y premian un buen manejo del score.

> El crédito es una **herramienta estratégica**, no una trampa: bien usado acelera progreso; mal usado, genera presión constante.

### Inflación y progreso de vida

- Con los años, los precios y oportunidades cambian.
- Subir de nivel profesional aumenta ingreso potencial, pero también expectativas de estilo de vida.

### Objetivos

- Colchón de emergencia
- Comprar mejor setup
- Mudarte a un lugar mejor
- Viaje / lujo (por ejemplo un reloj)
- **Comprar una empresa o app** (late game)

---

## 6) Horas del día (capacidad de trabajo)

- Base: **hasta 8 horas de trabajo/día**.
- Con progresión: puedes subir gradualmente hasta **12 horas/día** mediante **skills/perks** (pero con trade-offs).
- Trabajar por encima de tu “zona cómoda” aumenta:
  - fatiga
  - estrés
  - riesgo de burnout

> La idea no es “hacer 12h siempre”, sino que sea una opción estratégica para picos de demanda.

---

## 7) Stats del personaje (propuesta)

- 💰 **Cash**: dinero disponible
- 🧾 **Burn rate**: gastos diarios promedio
- 🔋 **Energía** (0-100)
- 😵 **Estrés** (0-100)
- 🧠 **Conocimiento** (skills)
- ⭐ **Reputación** (profesional)
- 🧑‍💻 **Productividad** (depende de energía/estrés/skills)
- 😊 **Ánimo** (influye en eventos y productividad)

---

## 8) Skills (árbol de progresión con puntos)

El árbol de progresión se desbloquea con **puntos de mejora**.

### 8.1 Cómo ganas puntos de mejora

- ✅ **Acciones repetibles** (grind sano):
  - estudiar
  - practicar (mini-tareas)
  - completar trabajo real (tickets, features)

- 🏆 **Logros** (hitos):
  - “Primer empleo”
  - “Primer contrato grande”
  - “30 días sin faltar”
  - “Ahorré 6 meses de gastos”
  - “Deploy sin incidentes X veces”

> Algunas skills solo se obtienen por **logros** (perks únicos), no por puntos.

### 8.2 Tipos de skills

- **Skills normales (con puntos):** mejoras incrementales (más productividad, menos estrés por tarea, mejor negociación).
- **Perks por logro:** cambian reglas (ej: “Overtime controlado” para llegar a 12h/día, “Networker” para mejores ofertas, etc.).

### 8.3 Ramas sugeridas

- Backend
- Frontend
- DevOps (Docker, CI/CD)
- Soft skills (negociación, liderazgo)
- Finanzas personales (mejores decisiones de inversión)

---

## 8) Presentación / Arte

### Vista principal

- Personita sentada frente al PC.
- UI con:
  - Panel de stats
  - Caja de texto narrativa
  - Botones de decisión
  - Calendario/clock del día

### Escenarios (fondos)

- **Escritorio** (trabajo/coding)
- **Cama** (descanso / burnout / reflexión)
- **Cocina** (comer / meal prep / gastar)
- **Ciudad** (fiesta, networking, eventos)

### Animaciones simples

- Teclear
- Cambiar postura
- Dormir
- Alertas en el PC (build fail, PR review, deploy)

---

## 9) UI/UX (texto + decisiones)

La interacción principal del jugador ocurre a través de **canales de comunicación** que simulan la vida digital real de un dev.

### Canales de interacción

#### 📧 Emails

Canal **formal y asíncrono**. Se usa para:

- ofertas laborales
- comunicaciones de bancos
- compra de cartera
- propuestas de adquisición (empresas/apps)
- notificaciones importantes (impuestos, contratos grandes)

El tono del email varía según:

- reputación profesional
- score financiero
- año del juego (2010 vs 2025)

Ejemplo:

> _“Dado su excelente perfil financiero, queremos ofrecerle una mejora en sus condiciones crediticias…”_

---

#### 💬 Chats (Slack / WhatsApp / Teams-like)

Canal **rápido y reactivo**, usado para:

- mensajes del jefe
- clientes
- compañeros
- emergencias
- mini-decisiones inmediatas

Los chats pueden:

- interrumpir la jornada
- requerir respuesta rápida
- aumentar estrés si se acumulan

Ejemplo:

> _“¿Puedes revisar esto antes del deploy de hoy?”_

---

#### 🔔 Notificaciones del sistema

Canal **breve y constante**, usado para:

- recordatorios (pagos, cuotas, deadlines)
- alertas del sistema (burnout, deuda alta)
- eventos pasivos (intereses cobrados, ingresos recibidos)

Ejemplo:

> _“Se ha debitado la cuota del crédito personal.”_

---

### Decisiones

Cada mensaje (email/chat/notificación) puede presentar:

- opciones explícitas (botones)
- decisiones diferidas (responder luego)
- consecuencias acumulativas si se ignora

> El jugador siente que vive **dentro de su bandeja de entrada**, no en menús artificiales.

---

## 10) Mercado, datos reales y eventos macro

Para dar **dinamismo y sensación de realidad**, el juego puede consultar **APIs públicas del mercado de valores** con datos **históricos** (2010–2025).

> Los datos se usan como **referencia contextual**, no como simulación financiera real. No hay implicaciones legales al ser históricos y no transaccionales.

### 10.1 Mercado de valores (datos reales)

- El juego consulta precios históricos (por fecha) de empresas reales.

- La consulta a APIs externas se realiza:
  - **1 vez por mes (por defecto)**
  - opcionalmente **1 vez por semana** si se quiere mayor granularidad

- Los valores obtenidos se **cachean localmente** (SQLite):
  - por empresa
  - por fecha (mes/semana)

- El jugador puede:
  - invertir en acciones
  - ver subidas/bajadas reales del mercado
  - usar esa información para decisiones narrativas y financieras

Ejemplos:

- Comprar acciones de Microsoft en 2013 al precio real de ese año.
- Ver el impacto de crisis reales (ej. caídas del mercado) reflejado en el juego.

> El jugador **no compra la empresa**, solo participa del valor de mercado como inversionista.

### 10.2 Capa de ficción controlada (ucronía)

Sobre los datos reales se aplica una **capa narrativa ficticia** para crear eventos interesantes:

- Noticias alternativas:
  - “Apple anuncia la compra de Google y un layoff del 30%”
  - “Microsoft cierra una división completa de productos legacy”

Reglas:

- Si una empresa sufre un evento ficticio extremo:
  - puede desaparecer del listado de inversión
  - puede cambiar su comportamiento (más volátil, más riesgosa)

- El mercado real **no se altera**, solo la disponibilidad o riesgo dentro del juego.

Esto permite:

- sorpresa
- decisiones difíciles
- historias únicas sin romper la coherencia histórica

### 10.3 Impacto en el jugador

Los eventos de mercado pueden:

- afectar inversiones
- cambiar ofertas laborales
- generar layoffs (si eres empleado)
- crear oportunidades (comprar barato, cambiar de rol)

No todos los eventos afectan siempre al jugador:

- algunos son solo informativos
- otros impactan según:
  - sector del jugador
  - empresa donde trabaja
  - inversiones activas

### 10.4 Canales de comunicación

Estos eventos se presentan exclusivamente vía:

- 📧 emails (boletines, comunicados oficiales)
- 💬 chats (rumores, mensajes internos)
- 🔔 notificaciones (alertas de mercado)

Nunca como popups abstractos.

---

### 10.5 Manejo de conectividad y fallback

El sistema de mercado está diseñado para funcionar **online u offline**.

- Si hay conexión:
  - se consulta la API según la frecuencia definida (mensual/semanal)
  - se actualiza el cache local

- Si **no hay conexión**:
  - se usan los **últimos valores cacheados**
  - si no existe cache para ese periodo:
    - la funcionalidad de mercado se **desactiva temporalmente**
    - se notifica al jugador de forma diegética

Ejemplos de mensajes:

- _“No se pudo actualizar el mercado. Usando datos recientes.”_
- _“El mercado no está disponible hoy. Los analistas no han enviado datos.”_

> El juego **nunca se rompe** por falta de conexión: simplemente adapta la experiencia.

---

## 12) Tech (Electron) – notas iniciales

- Electron + React para UI
- Estado del juego en:
  - JSON local (save files)
  - o SQLite (si queremos más robustez)

- Motor de eventos: tabla/archivo con condiciones y efectos
- Animaciones 2D simples (Sprites/Lottie/Canvas)

---

## 13) Estado del diseño

- Tiempo: **continuo** durante la jornada laboral, con **4 velocidades** (pausa + 1/2/3).
- Duración: **2010 → 2025**.
- Estructura de eventos: **hasta 4 eventos por semana** + eventos nocturnos que se **resuelven al día siguiente**.
- Jornada: **8h base** y hasta **12h** con perks/skills (con trade-offs).
- Economía: **realista**.
- Tono: **mixto** (momentos serios + humor del mundo dev).

## 14) Final del juego (31 de diciembre de 2025)

El juego **no tiene una victoria o derrota rígida**.

Al llegar al **31 de diciembre de 2025**, el tiempo se detiene y se muestra un **Reporte Final de Vida Profesional**, seguido de una **reflexión guiada**.

### Reporte final

El reporte resume:

- Estado financiero:
  - dinero disponible
  - ingresos pasivos
  - deudas (si existen)
  - estabilidad mensual

- Estado personal:
  - nivel de burnout
  - estrés promedio histórico
  - vacaciones disfrutadas

- Carrera:
  - rol alcanzado (junior, senior, lead, indie, etc.)
  - reputación
  - skills más desarrolladas

### Evaluación narrativa (no binaria)

El juego **no juzga** al jugador.

En cambio:

- Si hay **libertad financiera**, bajo burnout y balance de vida:
  - mensajes de **felicitación** y reconocimiento
  - tono cálido: “lo hiciste bien, construiste una vida sostenible”

- Si hay **problemas financieros**, burnout alto o poco disfrute personal:
  - mensajes de **aliento y empatía**, no de castigo
  - tono humano: “hiciste lo que pudiste con lo que tenías”

> El jugador es quien define internamente si su historia fue una victoria o no.

### Epílogo

Tras el reporte:

- texto narrativo corto que refleja el camino recorrido
- opción de:
  - empezar una nueva partida
  - volver a jugar desde un año anterior
  - seguir en modo libre (sandbox post-2025)

---

## 15) Estado del diseño (actualizado)

### Core (cerrado)

- Tiempo: **continuo** durante la jornada laboral, con **4 velocidades** (pausa + 1/2/3).
- Duración: **2010 → 2025**.
- Loop diario + semanal estable.
- Jornada: **8h base** y hasta **12h** con perks/skills (con trade-offs).
- Economía: **realista** (ingresos, gastos, impuestos, deuda, crédito).
- Score financiero **interno y narrativo**.
- Canales de interacción: **emails, chats y notificaciones**.
- Mercado con **datos históricos reales + capa de ficción controlada**.
- Final **reflexivo, no punitivo**, con reporte completo.

### Sistemas secundarios (cerrados)

- Empleado / Freelancer intercambiables.
- Árbol de skills con puntos + perks por logros.
- Compra de cartera.
- Compra de empresas / apps (cash vs cash + deuda).
- Eventos macro de mercado y carrera.

### Fuera de alcance (por ahora)

Para mantener el proyecto **terminable**:

- Multijugador.
- Microgestión visual compleja.
- Simulación financiera en tiempo real.
- IA avanzada de NPCs.

> Este documento ya es una **fuente única de verdad** para desarrollo.
