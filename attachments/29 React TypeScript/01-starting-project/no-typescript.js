/**
 * ============================================================================
 * no-typescript.js — LESSONS 580, 581 & 582
 * ============================================================================
 *
 * SECTION 29: REACT + TYPESCRIPT — INTRODUCTION
 *
 * Throughout this entire course, React has been used with plain JavaScript.
 * That is the standard approach — React is a JavaScript library, and most
 * tutorials, documentation, and examples use JavaScript.
 *
 * However, React can also be used with TYPESCRIPT, a language that builds
 * on top of JavaScript (it is NOT a completely different language). This
 * section introduces TypeScript and shows how to combine it with React.
 *
 * WHAT THIS SECTION COVERS:
 *
 *   1. What TypeScript is and why it is useful
 *   2. TypeScript fundamentals — the essential basics needed to get started
 *   3. Using TypeScript with React — writing React components, props, state,
 *      and other patterns in TypeScript
 *
 * This file (no-typescript.js) is plain JavaScript — it serves as a
 * starting point to illustrate the problems that arise when there is no
 * type checking, which TypeScript solves.
 *
 * ============================================================================
 * LESSON 581: WHAT IS TYPESCRIPT AND WHY USE IT?
 * ============================================================================
 *
 * TYPESCRIPT AS A SUPERSET OF JAVASCRIPT:
 *
 * TypeScript is called a "superset" of JavaScript. This means it EXTENDS
 * the JavaScript language by adding new syntax on top of it. All existing
 * JavaScript constructs — if statements, for loops, objects, functions,
 * arrow functions, destructuring — remain exactly the same. TypeScript
 * layers additional features onto that foundation.
 *
 * SUPERSET vs LIBRARY — AN IMPORTANT DISTINCTION:
 *
 * React is a LIBRARY: it uses standard JavaScript features (functions,
 * objects, classes) to build new capabilities around them. You import
 * React functions and call them — everything is still plain JavaScript
 * under the hood.
 *
 * TypeScript is NOT a library — it extends the CORE LANGUAGE SYNTAX itself.
 * It introduces new keywords and constructs (like type annotations) that
 * do not exist in standard JavaScript.
 *
 * STATIC TYPING — THE HEADLINE FEATURE:
 *
 * The most important thing TypeScript adds is STATIC TYPING. This is where
 * the name comes from: Type + Script. JavaScript on its own is DYNAMICALLY
 * typed — it does have types (number, string, boolean, object, etc.) but
 * it never forces you to declare which types a function expects or a
 * variable holds. Values can be any type, and JavaScript figures it out
 * at runtime.
 *
 * Static typing means you declare types AHEAD OF TIME, in the code itself,
 * before the program ever runs. The type checker can then verify at write-
 * time that every value matches its expected type.
 *
 * THE PROBLEM WITH DYNAMIC TYPING — DEMONSTRATED BELOW:
 *
 * The add() function is designed to perform mathematical addition. When
 * called with numbers (e.g., add(2, 5)), it correctly returns 7. But
 * nothing in the plain JavaScript code PREVENTS someone from passing
 * strings instead.
 *
 * When called as add("2", "5"), JavaScript does not complain — the +
 * operator silently switches from mathematical addition to string
 * concatenation, producing "25" instead of 7. No error is thrown,
 * no warning appears. The code "works" but produces the wrong result.
 *
 * In a small file like this, the mistake is obvious. But in a large
 * project with many files and multiple developers, someone might call
 * a function or use an object in an unintended way without realizing it.
 * Nothing warns them that the function was meant for numbers, not strings.
 *
 * HOW TYPESCRIPT SOLVES THIS:
 *
 * With TypeScript, you can add TYPE ANNOTATIONS to function parameters:
 *
 *   function add(a: number, b: number) {
 *     return a + b;
 *   }
 *
 * The ": number" after each parameter name declares that the function
 * expects numbers — and ONLY numbers. If someone writes add("2", "5"),
 * the IDE immediately highlights an error:
 *
 *   "Argument of type 'string' is not assignable to parameter of type 'number'."
 *
 * This error appears WHILE YOU ARE WRITING CODE, long before the program
 * runs. You catch the mistake at the earliest possible moment, rather
 * than discovering a subtle bug at runtime (or worse, in production).
 *
 * Type annotations are not limited to function parameters — they can be
 * used on variables, return types, object shapes, and many other places
 * throughout the codebase. The next lessons explore these in detail.
 *
 * WHY THIS MATTERS:
 *
 * TypeScript lets you write SAFER code by catching type mismatches before
 * execution. The larger the project and the more people working on it,
 * the more valuable this early error detection becomes.
 *
 * ============================================================================
 * LESSON 582: INSTALLING AND COMPILING TYPESCRIPT
 * ============================================================================
 *
 * This file (no-typescript.js) remains as the plain-JavaScript "before"
 * example. The TypeScript version of this same code now lives in
 * with-typescript.ts, where type annotations have been added to the add()
 * function parameters.
 *
 * See with-typescript.ts for full details on:
 *   - Installing TypeScript via npm
 *   - The TypeScript compiler (tsc) and how to invoke it
 *   - What compilation does (strips types, downlevels syntax, reports errors)
 *   - The development workflow (write .ts → compile → run .js in browser)
 *
 * index.html now loads the compiled with-typescript.js instead of this
 * file. To see the string-concatenation bug in action again, change the
 * <script src> back to "no-typescript.js".
 *
 * ============================================================================
 */

// A plain JavaScript function with no type information. The parameters a
// and b accept ANY value — numbers, strings, booleans, objects — because
// JavaScript does not enforce types on function parameters.
function add(a, b) {
  // The + operator behaves differently depending on the types of its
  // operands. For two numbers it performs addition; for two strings (or
  // if either operand is a string) it performs concatenation. This dual
  // behavior is the root of the bug demonstrated below.
  return a + b;
}

// BUG: Passing strings instead of numbers. The developer INTENDED this
// function for mathematical addition, but nothing in the code enforces
// that intent. JavaScript silently concatenates the strings, producing
// "25" instead of 7. With TypeScript's type annotations, this call would
// be flagged as an error immediately in the IDE.
const result = add(2, 5);

// Logs "25" (string concatenation) to the console — not 7 (addition).
// Open index.html in a browser and check the developer tools console
// to see this output.
console.log(result);
