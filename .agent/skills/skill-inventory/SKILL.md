---
name: skill-inventory
description: Reviews README as source of truth to find missing or unclear skills and proposes updates to the skills inventory. Use when the README changes or when validating the skill list.
---

# Skill Inventory Review

## When to use

Use this skill when the README is the authoritative source and you need to detect missing or unclear skills for the project.

## Steps

1. Read README and extract all skill-related mentions (skills tree, soft skills, finance, etc.).
2. Compare against the current skills inventory in .agent/skills and any design docs.
3. List missing skills, overlaps, or unclear entries with a short rationale.
4. Hand off to the `agent-update` skill to sync AGENTS.md with README-derived updates.

## Output

- A concise list of missing or unclear skills and where they appear in README.
- A short recommendation on how to categorize them.
- A note confirming the handoff to `agent-update`.
