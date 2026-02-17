/**
 * ============================================================================
 * package-commentary.ts — LESSON 591
 * ============================================================================
 *
 * COMMENTARY ON package.json DEPENDENCIES
 *
 * Since JSON files do not support comments, this companion file explains
 * the key dependencies in the react-ts project's package.json.
 *
 * ============================================================================
 * HOW THIS PROJECT WAS CREATED
 * ============================================================================
 *
 * This project was scaffolded using Create React App with the TypeScript
 * template:
 *
 *   npx create-react-app react-ts --template typescript
 *
 * The "--template typescript" flag selects a special project template
 * that:
 *
 *   1. Installs the TypeScript compiler as a dependency
 *   2. Installs @types packages for React and related libraries
 *   3. Creates .tsx files instead of .js files in the src/ folder
 *   4. Generates a tsconfig.json with sensible default settings
 *   5. Configures the build process to compile TypeScript automatically
 *
 * ============================================================================
 * CORE DEPENDENCIES (same as non-TypeScript CRA projects)
 * ============================================================================
 *
 *   "react"          — The core React library for building components
 *   "react-dom"      — The DOM-specific rendering methods (createRoot, etc.)
 *   "react-scripts"  — The CRA build tooling (dev server, bundler, etc.)
 *
 * These are the same packages found in every CRA project, regardless
 * of whether TypeScript is used.
 *
 * ============================================================================
 * TYPESCRIPT-SPECIFIC DEPENDENCIES (new compared to standard CRA)
 * ============================================================================
 *
 *   "typescript"         — The TypeScript language compiler itself. This is
 *                          the same package we installed manually in the
 *                          ts-basics lessons using "npm install typescript".
 *                          Here, CRA installs it automatically as part of
 *                          the template.
 *
 *   "@types/react"       — Type definitions for the React library
 *   "@types/react-dom"   — Type definitions for the ReactDOM library
 *   "@types/jest"        — Type definitions for the Jest test framework
 *   "@types/node"        — Type definitions for Node.js built-in modules
 *
 * ============================================================================
 * WHAT ARE @types PACKAGES?
 * ============================================================================
 *
 * Libraries like React and ReactDOM were originally written in plain
 * JavaScript. They work perfectly in JavaScript projects, but TypeScript
 * needs to know the TYPES of everything — function parameters, return
 * values, component props, etc. — in order to provide type checking
 * and IDE auto-completion.
 *
 * The @types packages act as TRANSLATION BRIDGES between these vanilla
 * JavaScript libraries and TypeScript projects. They contain type
 * DECLARATION FILES (.d.ts) that describe the shapes and types of the
 * library's API without changing any of the library's actual code.
 *
 * For example, @types/react tells TypeScript that:
 *   - useState is a generic function: useState<T>(initialValue: T)
 *   - A component's props must be an object
 *   - Event handlers receive specific event types (MouseEvent, etc.)
 *
 * Without these @types packages, TypeScript would treat every React
 * API call as "any" — losing all the benefits of type checking.
 *
 * NOT ALL LIBRARIES NEED @types PACKAGES:
 *
 * Some modern libraries ship with built-in type definitions — the
 * .d.ts files are included directly in the library package. In those
 * cases, no separate @types package is needed. But libraries that
 * were originally written for JavaScript-only (like React) rely on
 * community-maintained @types definitions from the DefinitelyTyped
 * repository.
 *
 * ============================================================================
 * THE DEV SERVER AND TYPESCRIPT COMPILATION
 * ============================================================================
 *
 * When you run "npm start" in this project, the development server
 * does everything it did in non-TypeScript projects (bundling files,
 * hot reloading, etc.) PLUS one additional step: it compiles all
 * TypeScript (.ts and .tsx) files to JavaScript before bundling.
 *
 * This compilation happens automatically — you never need to run
 * "npx tsc" manually like we did in the ts-basics lessons. The same
 * automatic compilation also applies when building for production
 * with "npm run build".
 *
 * The browser still receives plain JavaScript at the end — it never
 * sees TypeScript directly. The TypeScript-to-JavaScript step is
 * simply an additional stage in the build pipeline, handled
 * transparently by the dev server.
 *
 * ============================================================================
 * PROJECT COMMANDS (same as non-TypeScript CRA projects)
 * ============================================================================
 *
 *   npm start      — Start the development server (localhost:3000)
 *   npm run build  — Build optimized production files
 *   npm test       — Run tests with Jest
 *   npm run eject  — Expose the underlying build configuration
 *
 * These commands are identical to a standard CRA project. The only
 * difference is what happens behind the scenes: TypeScript compilation
 * is now part of the pipeline.
 *
 * ============================================================================
 */
