import type { EventDefinition } from "../shared/types";

export const MVP_EVENTS: EventDefinition[] = [
  {
    id: "hotfix-urgent",
    title: "09:00 - Urgent hotfix",
    body: "Your manager asks for an urgent production hotfix before noon.",
    weight: 1.2,
    cooldownDays: 1,
    options: [
      {
        id: "do-now",
        label: "Ship now",
        description: "Stress up, reputation up.",
        effects: [
          { key: "stress", delta: 12 },
          { key: "reputation", delta: 6 },
          { key: "energy", delta: -8 }
        ]
      },
      {
        id: "negotiate",
        label: "Negotiate realistic ETA",
        description: "Soft approach with moderate gains.",
        effects: [
          { key: "stress", delta: 2 },
          { key: "reputation", delta: 4 },
          { key: "softSkills", delta: 1 }
        ]
      },
      {
        id: "delay",
        label: "Delay and reprioritize",
        description: "You protect bandwidth but hurt trust.",
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
    title: "Unexpected tax notice",
    body: "A tax adjustment arrives. Not huge, but painful this week.",
    weight: 1,
    cooldownDays: 2,
    conditions: {
      minDay: 2
    },
    options: [
      {
        id: "pay-now",
        label: "Pay immediately",
        description: "Lose cash, reduce future stress.",
        effects: [
          { key: "cash", delta: -110 },
          { key: "stress", delta: -3 },
          { key: "personalFinance", delta: 1 }
        ]
      },
      {
        id: "partial",
        label: "Partial payment",
        description: "Softer cash hit, slight stress increase.",
        effects: [
          { key: "cash", delta: -55 },
          { key: "stress", delta: 4 }
        ]
      },
      {
        id: "ignore",
        label: "Ignore for now",
        description: "No immediate payment, larger stress.",
        effects: [{ key: "stress", delta: 10 }, { key: "mood", delta: -6 }]
      }
    ]
  },
  {
    id: "party-invite",
    title: "Friday networking party",
    body: "You got invited to a dev community party downtown.",
    weight: 0.9,
    cooldownDays: 2,
    options: [
      {
        id: "go-party",
        label: "Go and network",
        description: "Spend cash, gain mood and reputation.",
        effects: [
          { key: "cash", delta: -60 },
          { key: "mood", delta: 15 },
          { key: "reputation", delta: 5 },
          { key: "softSkills", delta: 1 }
        ]
      },
      {
        id: "skip-party",
        label: "Skip and recharge",
        description: "Rest more, lose chance to network.",
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
    title: "Your laptop starts failing",
    body: "Build times doubled and random crashes are getting worse.",
    weight: 0.8,
    cooldownDays: 3,
    conditions: {
      minDay: 3
    },
    options: [
      {
        id: "repair",
        label: "Repair now",
        description: "Pay now for stability and lower stress.",
        effects: [
          { key: "cash", delta: -140 },
          { key: "stress", delta: -6 },
          { key: "mood", delta: 4 }
        ]
      },
      {
        id: "push-through",
        label: "Keep working on broken setup",
        description: "Save money but performance suffers.",
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
    title: "Mentor recommends a course",
    body: "A senior mentor recommends a practical backend architecture course.",
    weight: 1.1,
    cooldownDays: 2,
    options: [
      {
        id: "buy-course",
        label: "Take the course",
        description: "Spend money, gain knowledge and confidence.",
        effects: [
          { key: "cash", delta: -95 },
          { key: "knowledge", delta: 10 },
          { key: "backend", delta: 2 },
          { key: "mood", delta: 5 }
        ]
      },
      {
        id: "self-study",
        label: "Self-study instead",
        description: "Smaller gains at lower cost.",
        effects: [
          { key: "cash", delta: -15 },
          { key: "knowledge", delta: 4 },
          { key: "backend", delta: 1 }
        ]
      }
    ]
  }
];
