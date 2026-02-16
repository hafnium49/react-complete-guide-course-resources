/**
 * ============================================================================
 * with-typescript.ts — LESSON 582
 * ============================================================================
 *
 * INSTALLING AND USING THE TYPESCRIPT COMPILER
 *
 * PREREQUISITE — Node.js:
 *
 * TypeScript is distributed as an npm package, so Node.js (and npm) must
 * be installed on your system. Since React development already requires
 * Node.js, this prerequisite is already satisfied.
 *
 * INSTALLING TYPESCRIPT INTO A PROJECT:
 *
 * Two steps were needed to set up this project for TypeScript:
 *
 *   1. npm init -y           → Creates an empty package.json (required
 *                               before installing any npm dependency).
 *   2. npm install typescript → Installs the TypeScript compiler locally
 *                               into this project's node_modules.
 *
 * LOCAL vs GLOBAL INSTALLATION:
 *
 * "npm install typescript" installs into the current project only. To
 * install system-wide (available in any project without a local install),
 * use "npm install -g typescript". Per-project installation is preferred
 * because different projects can pin different TypeScript versions.
 *
 * NOTE: This is still a plain web project (HTML + JS), NOT a React project.
 * React integration comes in later lessons.
 *
 * ============================================================================
 * THE TYPESCRIPT COMPILER (tsc)
 * ============================================================================
 *
 * BROWSERS CANNOT EXECUTE TYPESCRIPT DIRECTLY. The .ts file must be
 * COMPILED to plain JavaScript before it can run. The TypeScript compiler
 * ("tsc") handles this transformation.
 *
 * WHAT COMPILATION DOES:
 *
 *   1. REMOVES all type annotations — JavaScript does not understand them,
 *      so they are stripped out entirely. The resulting .js file contains
 *      only standard JavaScript.
 *
 *   2. REPORTS type errors — if any value violates its declared type, tsc
 *      prints an error message. This is the second line of defense after
 *      the IDE's real-time highlighting (which uses the same type checker).
 *
 *   3. DOWNLEVELS modern syntax — by default (without a tsconfig.json),
 *      tsc targets older JavaScript versions for maximum browser compat.
 *      For example, "const" may become "var". A tsconfig.json file can
 *      override this target to keep modern syntax.
 *
 * IMPORTANT: Even when tsc reports errors, it STILL produces a .js output
 * file by default. The errors are warnings, not blockers — tsc assumes
 * you might want to test the output despite the issues. This behavior
 * can be changed with the "noEmitOnError" compiler option.
 *
 * INVOKING THE COMPILER:
 *
 *   npx tsc with-typescript.ts
 *
 * "npx" runs the locally installed tsc binary from node_modules. Pointing
 * it at a specific .ts file tells it what to compile. Without a filename,
 * tsc looks for a tsconfig.json in the project root — since we don't have
 * one yet, it would error. Specifying the file directly bypasses that
 * requirement.
 *
 * The compiled output is written to "with-typescript.js" (same name, .js
 * extension) in the same directory. That .js file is what index.html
 * should reference via its <script> tag.
 *
 * THE WORKFLOW:
 *
 *   1. Write code in the .ts file (with type annotations).
 *   2. The IDE highlights type errors in real time.
 *   3. Run "npx tsc with-typescript.ts" to compile.
 *   4. tsc reports any errors you may have missed in the IDE.
 *   5. The compiled .js file (annotations stripped) runs in the browser.
 *
 * ============================================================================
 */
// The same add() function from no-typescript.js, but now with TYPE
// ANNOTATIONS. The ": number" after each parameter name declares that
// ONLY number values are acceptable. Any other type passed to this
// function will be flagged as an error by both the IDE and the compiler.
function add(a, b) {
    return a + b;
}
// With type annotations in place, passing strings here would immediately
// trigger a compile-time error:
//
//   Argument of type 'string' is not assignable to parameter of type 'number'.
//
// The bug from no-typescript.js is now impossible — the type system
// prevents it before the code ever runs. The call below uses proper
// number literals, so it compiles cleanly and produces 7.
var result = add(2, 5);
// After compilation, this logs 7 to the console. Open the compiled
// with-typescript.js in index.html to verify in the browser.
console.log(result);
