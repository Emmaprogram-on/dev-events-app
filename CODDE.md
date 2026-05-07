# CODDE.md - AI Agent Instructions

## Overview
This file contains instructions for AI agents working on the CoddeConf project.

## Mandatory Rules

### 1. Before Doing Anything
The AI agent MUST read the following files in this exact order:
1. `CODDE.md` - This file
2. `STATUS.md` - Current project status and progress
3. `CODDECONF.md` - Detailed project requirements and milestones

### 2. Understanding Next Milestone and Task
- The AI must read `CODDECONF.md` to understand what the next milestone and task is
- The AI must start work from any milestone tagged "BUILDING"
- The AI must NOT assume what needs to be done next
- The AI must follow the milestones and tasks as defined in CODDECONF.md

### 3. Single Task Execution
- The AI must NOT do two tasks at the same time
- The AI must complete one task before moving to the next
- Each task must be completed fully before starting another

### 4. Status Updates
- The STATUS.md file must be updated after EVERY task is completed
- The AI must mark completed tasks as 'done'
- The AI must mark any current milestone being worked on as "BUILDING"
- The AI must mark in-progress tasks as 'in progress'
- The AI must mark pending tasks as 'pending'

### 5. Current Task Highlighting
- The AI must highlight where in the milestone we're currently working
- The current task should be clearly marked in STATUS.md
- The AI must always know which task is being worked on

### 6. Asking Questions
- The AI must NOT assume anything
- The AI must ask questions before doing anything unclear
- The AI must seek clarification when requirements are ambiguous

### 7. File Access Order
Before making any code changes, the AI must:
1. Read CODDE.md
2. Read STATUS.md
3. Read CODDECONF.md
4. Understand the current milestone and task
5. Only then proceed with implementation

## Project Structure
- `CODDE.md` - This file (instructions for AI agents)
- `STATUS.md` - Current progress tracking
- `CODECONF.md` - Detailed project breakdown and requirements