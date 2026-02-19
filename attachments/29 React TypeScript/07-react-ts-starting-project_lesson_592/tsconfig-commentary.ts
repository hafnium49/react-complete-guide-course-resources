/**
 * ============================================================================
 * tsconfig-commentary.ts — LESSON 604
 * ============================================================================
 *
 * JSON files cannot contain comments. This companion file documents
 * the tsconfig.json configuration for this project.
 *
 * ============================================================================
 * WHAT IS tsconfig.json?
 * ============================================================================
 *
 * tsconfig.json configures the TypeScript COMPILER — the tool that
 * transforms .ts and .tsx files into JavaScript. Every TypeScript
 * project can have one. It controls which JavaScript version to
 * target, how strict the type-checking should be, which built-in
 * type libraries to include, and many other compilation behaviors.
 *
 * In this Create React App project, the compiler is invoked
 * AUTOMATICALLY when the development server starts (npm start) or
 * when a production build is created (npm run build). The build
 * workflow (Webpack + react-scripts) integrates the TypeScript
 * compiler behind the scenes — there is no need to run tsc manually.
 *
 * ============================================================================
 * KEY OPTIONS EXPLAINED
 * ============================================================================
 *
 * "target": "es5"
 * ---------------
 * Controls the JavaScript VERSION that the compiled output will use.
 * ES5 is a widely-supported older version, meaning the output code
 * will work in virtually all browsers. TypeScript rewrites modern
 * syntax (arrow functions, template literals, etc.) into ES5
 * equivalents during compilation.
 *
 * NOTE: In some project setups, the TypeScript compiler is not the
 * ONLY transformation step. Tools like Babel may run AFTER tsc and
 * perform additional transformations on the JavaScript output. So
 * the target option might not be the final word on what syntax
 * appears in the shipped bundle.
 *
 * "lib": ["dom", "dom.iterable", "esnext"]
 * -----------------------------------------
 * Specifies which built-in TYPE LIBRARIES TypeScript should include.
 * These libraries are bundled with TypeScript itself — no extra npm
 * packages are needed — but they must be listed here to be activated.
 *
 *   - "dom" — Provides type definitions for all browser DOM APIs:
 *     document, window, HTMLElement, HTMLInputElement, etc. This is
 *     why useRef<HTMLInputElement> works in NewTodo.tsx — the
 *     HTMLInputElement type comes from this library. REMOVING "dom"
 *     would cause TypeScript to no longer recognize DOM types, and
 *     properties like .value on an input ref would produce errors.
 *
 *   - "dom.iterable" — Adds iterable support for DOM collections
 *     (e.g., NodeList.forEach, HTMLCollection iteration).
 *
 *   - "esnext" — Includes type definitions for the latest JavaScript
 *     features (Promise, Map, Set, Array methods, etc.).
 *
 * "allowJs": true
 * ----------------
 * Permits importing plain .js files alongside .ts and .tsx files
 * without causing compilation errors. Useful for projects that mix
 * JavaScript and TypeScript — you can migrate files incrementally
 * rather than converting everything at once.
 *
 * "strict": true
 * ---------------
 * Enables ALL strict type-checking options as a group. This is the
 * MOST IMPORTANT setting for day-to-day TypeScript development.
 *
 * The most impactful sub-option it enables is "noImplicitAny" — when
 * TypeScript cannot infer a type (e.g., an unannotated function
 * parameter), it defaults to "any". With strict mode ON, implicit
 * any is FORBIDDEN — you must explicitly annotate the type. For
 * example, removing the ": string" from a function parameter like
 * addTodoHandler(text: string) would produce an error saying the
 * parameter "implicitly has an 'any' type."
 *
 * Other strict sub-options include strictNullChecks (null and
 * undefined are not assignable to other types without explicit
 * handling), strictFunctionTypes (function parameter types are
 * checked more rigorously), and several more. Setting strict: true
 * is the recommended default for new projects.
 *
 * "jsx": "react-jsx"
 * --------------------
 * Controls how JSX syntax is handled during compilation. The
 * "react-jsx" setting uses the modern JSX transform introduced in
 * React 17, which does NOT require importing React in every file
 * that uses JSX. (The older "react" setting required the classic
 * import React from 'react' in every JSX file.)
 *
 * ============================================================================
 * OTHER OPTIONS (LESS CRITICAL TO UNDERSTAND)
 * ============================================================================
 *
 * "skipLibCheck": true
 *   Skips type-checking of .d.ts declaration files (third-party
 *   type definitions). Speeds up compilation significantly.
 *
 * "esModuleInterop": true
 *   Allows default imports from CommonJS modules that do not have
 *   a default export (e.g., import React from 'react').
 *
 * "allowSyntheticDefaultImports": true
 *   Related to esModuleInterop — permits default import syntax even
 *   when the module does not explicitly export a default.
 *
 * "forceConsistentCasingInFileNames": true
 *   Prevents importing the same file with different casing (e.g.,
 *   './Todo' vs './todo'), which would cause issues on case-
 *   sensitive file systems (Linux) but silently work on case-
 *   insensitive ones (macOS, Windows).
 *
 * "noFallthroughCasesInSwitch": true
 *   Requires break or return in each switch case to prevent
 *   accidental fall-through bugs.
 *
 * "module": "esnext"
 *   Specifies the module system for the output code. "esnext" uses
 *   ES module syntax (import/export).
 *
 * "moduleResolution": "node"
 *   Uses Node.js-style module resolution (looking in node_modules,
 *   resolving index files, etc.).
 *
 * "resolveJsonModule": true
 *   Allows importing .json files as modules.
 *
 * "isolatedModules": true
 *   Ensures each file can be compiled independently (required by
 *   tools like Babel that process files one at a time).
 *
 * "noEmit": true
 *   Tells the TypeScript compiler NOT to produce output files — it
 *   only performs type-checking. The actual JS output is handled by
 *   the build tool (Webpack via react-scripts).
 *
 * ============================================================================
 * "include": ["src"]
 * ============================================================================
 *
 * Tells the compiler to only process files inside the src/ directory.
 * Files outside src/ (like this commentary file in the project root)
 * are not type-checked during the build.
 *
 * ============================================================================
 * HOVERING IN THE IDE
 * ============================================================================
 *
 * In VS Code, hovering over any option in tsconfig.json shows a
 * short description and a link to the detailed official documentation
 * page for that specific option. This is a quick way to look up what
 * an unfamiliar setting does without leaving the editor.
 *
 * For comprehensive documentation on all compiler options, see:
 * https://www.typescriptlang.org/tsconfig
 *
 * ============================================================================
 */

export {};
