# Agent Brief: Dev Life Tycoon

## Project

Dev Life Tycoon is a dev tycoon / life sim game where the player lives a developer career. The player can be an employee or a freelancer, manages money and energy/stress, and makes decisions through text boxes while watching a cozy character working at a PC.

Target stack: Electron (desktop), likely Electron + React.

## Core Fantasy

- Go from broke junior dev to senior/investor with freedom.
- Make meaningful tradeoffs: money vs health vs progress.
- Get the addictive "one more day" loop via events and upgrades.

## Core Loop (Daily Turns)

1. Start of day summary (cash, energy, stress, goals)
2. Choose main activity (work / contract / study / rest / leisure)
3. Random events and quick decisions
4. Apply stat changes and career/contract progress
5. End of day: fixed expenses, mood, unlocks
6. Repeat

## Life Modes

- Employee: fixed salary, benefits, reviews, promotions, boss/coworkers
- Freelancer: variable income, negotiation, non-payment risk, reputation, higher income ceiling, more stress
- Switching between modes can be a key decision (quit, fired, hired)

## Economy

- Income: salary, contract payments, passive investments
- Expenses: rent, utilities, food, leisure, hobbies, purchases
- Investments: funds/stocks/crypto (tone-dependent)
- Upgrades: PC, chair, courses, coffee
- Goals: emergency fund, better setup, move to better place, luxury purchase

## Player Stats (Initial Proposal)

- Cash
- Burn rate (avg daily expenses)
- Energy (0-100)
- Stress (0-100)
- Knowledge/Skills
- Reputation
- Productivity (depends on energy/stress/skills)
- Mood

## Skills Tree Ideas

- Backend (Java/Spring)
- Frontend (Angular/React)
- DevOps (Docker, CI/CD)
- Soft skills (negotiation, leadership)
- Personal finance

## Presentation

- Main view: character at PC, stats panel, narrative text box, decision buttons, day clock
- Scenes: desk, bed, kitchen, city
- Simple animations: typing, posture change, sleep, alerts

## Event Examples

- Client wants "Uber" app for $200
- Unexpected tax
- Party invite
- Job offer in another city
- Laptop breaks
- Mentor recommends a course
- Burnout/anxiety crisis

## Roadmap Summary

- MVP: 1 scene (desk), employee mode, 5 events, 7 days, basic stats
- V1: 2 scenes, basic freelancer, 30+ events, PC/courses upgrades
- V2: investments, more scenes, long missions, goals/endings
- V3: competition, buy other apps, bug count/solutions

## Open Design Questions

- Turn-based (days) vs continuous (hours)
- Financial realism level (sim vs arcade)
- Tone: humor/serious/mixed
- Endings: financial freedom, burnout, startup, etc.
