/**
 * ============================================================================
 * basics.ts — LESSON 583
 * ============================================================================
 *
 * TYPESCRIPT FUNDAMENTALS — PRIMITIVE TYPES
 *
 * This file explores the core type system features of TypeScript, starting
 * with the most fundamental building blocks: primitive value types.
 *
 * WHAT THIS FILE COVERS:
 *
 *   - Primitive types: number, string, boolean
 *   - Type annotations on variables (not just function parameters)
 *   - The difference between declaration-only and declaration-with-assignment
 *   - Why lowercase type names matter (number vs Number)
 *   - Why null/undefined are rarely used as standalone type annotations
 *
 * UPCOMING TOPICS (covered in later lessons):
 *
 *   - Complex types: arrays, objects
 *   - Function types and return types
 *   - And more advanced patterns
 *
 * ============================================================================
 * PRIMITIVE TYPES IN JAVASCRIPT (AND TYPESCRIPT)
 * ============================================================================
 *
 * JavaScript has several primitive value types built in:
 *
 *   - number    — integers and floating-point numbers (e.g., 24, 3.14)
 *   - string    — text values (e.g., "hello", 'world', `template`)
 *   - boolean   — true or false
 *   - null      — intentional absence of a value
 *   - undefined — variable declared but not yet assigned
 *   - symbol    — unique identifiers (rarely needed in React development)
 *
 * Of these, number, string, and boolean are the three you will use most
 * often when annotating types. null and undefined play a role too, but
 * they are typically combined with other types rather than used alone
 * (covered in a later lesson).
 *
 * TYPE ANNOTATION SYNTAX FOR VARIABLES:
 *
 * In lesson 581, we saw type annotations on function PARAMETERS:
 *
 *   function add(a: number, b: number) { ... }
 *
 * The same colon syntax works on VARIABLE DECLARATIONS:
 *
 *   let age: number;
 *
 * The colon followed by the type name tells TypeScript what kind of value
 * this variable is allowed to hold. Any attempt to assign an incompatible
 * value will be flagged as an error.
 *
 * LOWERCASE vs UPPERCASE TYPE NAMES:
 *
 * TypeScript's primitive types use LOWERCASE names:
 *
 *   number, string, boolean    ← correct (primitive types)
 *   Number, String, Boolean    ← wrong (JavaScript wrapper objects)
 *
 * JavaScript has built-in constructor objects like Number, String, and
 * Boolean (uppercase). These are NOT the same as the primitive types.
 * Using the uppercase versions in type annotations will not cause an
 * immediate error, but it refers to the wrapper object type rather than
 * the primitive — which is almost never what you want. Always use the
 * lowercase forms.
 *
 * ============================================================================
 */

// ── PRIMITIVE TYPE: number ──────────────────────────────────────────────────

// A variable declared with a type annotation but NO initial value. This is
// valid — the variable exists but is undefined until a value is assigned.
// TypeScript will enforce that only number values can be assigned later.
let age: number;

// Assigning an integer — perfectly valid.
age = 24;

// Floating-point numbers (decimals) are also "number" in TypeScript, just
// like in JavaScript. There is no separate "int" vs "float" distinction.
age = 24.5;

// UNCOMMENTING THE LINE BELOW WOULD CAUSE A COMPILE-TIME ERROR:
//   Type 'string' is not assignable to type 'number'.
// This is the core value of type annotations — catching mismatches early.
// age = "24";

// ── PRIMITIVE TYPE: string ──────────────────────────────────────────────────

// Declaration with type annotation AND an initial value on the same line.
// Both styles (with or without initial value) are valid — use whichever
// fits the situation.
let userName: string = "Max";

// ── PRIMITIVE TYPE: boolean ─────────────────────────────────────────────────

// Boolean variables accept only the values true or false. Any other value
// (a number, a string, an object) would be rejected by the type checker.
let isInstructor: boolean = true;

// ── WHY null AND undefined ARE RARELY USED AS STANDALONE TYPES ──────────────

// It IS technically possible to annotate a variable as type null:
//
//   let hobbies: null = null;
//
// But this makes the variable almost useless — it can ONLY ever hold null.
// Assigning a string, number, array, or anything else would be an error.
// In practice, null and undefined are combined with other types using
// UNION TYPES (e.g., string | null) to indicate that a value might or
// might not be present. Union types are covered in an upcoming lesson.
