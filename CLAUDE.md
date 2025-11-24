# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a course resources repository for "React - The Complete Guide". It contains code snapshots, attachments, and other materials organized by course section. The repository is **read-only** and intended for reference - modifications should not be made to existing snapshots.

## Repository Structure

```
/code/          - Code snapshots organized by section number and topic
/attachments/   - Standalone files and attachments mentioned in lectures
/other/         - Additional resources like course slides
```

Each folder in `/code/` and `/attachments/` corresponds to a specific course section (e.g., "03 React Essentials", "19 Redux Basics").

Within each section folder, there are multiple numbered subdirectories representing different stages:
- `01-starting-project` - Initial code to begin
- `02-<topic>`, `03-<topic>`, etc. - Intermediate snapshots
- Final snapshot (usually highest number or labeled "finished")

## Project Types and Technologies

This repository contains three different types of React projects across various sections:

### Vite Projects (Most Common)
Used in: React Essentials (03), Essentials Deep Dive (04), Essentials Practice (05), Styling (07), Refs Portals (08), Practice Projects (09, 18), State Management (10), Side Effects (11), Behind the Scenes (12), Demo Projects (13), HTTP Requests (15), Custom Hooks (16), Forms (17, 17b), Patterns (27), TypeScript (29), Summary (30)

**Commands:**
```bash
npm install          # Install dependencies
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Create React App (CRA) Projects
Used in: Redux sections (19, 20), Testing (28), some earlier sections

**Commands:**
```bash
npm install          # Install dependencies
npm start            # Start development server (CRA)
npm run build        # Build for production
npm test             # Run tests
```

### Next.js Projects
Used in: NextJS Introduction (25), NextJS App Router Introduction (25), RSC/Suspense (25b)

**Commands:**
```bash
npm install          # Install dependencies
npm run dev          # Start development server (Next.js)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## Working with Code Snapshots

1. **Navigate to the specific snapshot directory** before running commands:
   ```bash
   cd "code/03 React Essentials/01-starting-project"
   ```

2. **Always run `npm install` first** in a snapshot directory before starting the dev server

3. **Identify the project type** by checking `package.json`:
   - Vite projects: `"scripts": { "dev": "vite" }`
   - CRA projects: `"scripts": { "start": "react-scripts start" }`
   - Next.js projects: `"scripts": { "dev": "next dev" }`

## Common Patterns Across Sections

### Section Progression
Most sections follow this pattern:
- **Starting project**: Basic setup with minimal functionality
- **Intermediate snapshots**: Progressive feature additions (numbered sequentially)
- **Finished project**: Complete implementation

### React Concepts by Section
- **Sections 03-05**: Core React fundamentals (components, props, state, events)
- **Sections 07**: Styling approaches (inline, CSS modules, styled-components, Tailwind)
- **Section 08**: Refs, portals, useImperativeHandle
- **Section 10**: Context API, useReducer for state management
- **Section 11**: useEffect, useCallback, cleanup functions
- **Section 12**: Performance optimization (memo, useMemo)
- **Sections 16**: Custom hooks patterns
- **Sections 17, 17b**: Form handling, validation, form actions
- **Sections 19-20**: Redux and Redux Toolkit
- **Section 21**: React Router
- **Section 24**: React Query / TanStack Query
- **Sections 25, 25b**: Next.js with App Router, Server Components, Server Actions
- **Section 27**: Advanced React patterns
- **Section 28**: Testing with React Testing Library
- **Section 29**: TypeScript integration

## Important Notes

- **Do not modify existing code snapshots** - they are reference materials from course recordings
- Each snapshot is self-contained with its own `package.json` and dependencies
- Folder names contain spaces - **always quote paths** in commands
- Projects use different React versions across sections (check package.json)
- Some sections have duplicate names with different focuses (e.g., multiple "25 NextJS" folders)

## Testing

Testing examples are primarily in Section 28. Test files follow React Testing Library conventions:
```bash
npm test              # Run tests in watch mode (CRA projects)
npm test -- --coverage  # Run with coverage report
```
