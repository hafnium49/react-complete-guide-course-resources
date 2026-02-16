/**
 * ============================================================================
 * no-typescript.js — LESSON 580
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
 * type checking, which TypeScript solves. The next lessons will explore
 * these problems in detail.
 *
 * ============================================================================
 */

function add(a, b) {
  return a + b;
}

const result = add("2", "5");

console.log(result);
