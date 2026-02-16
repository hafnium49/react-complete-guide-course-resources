/**
 * ============================================================================
 * basics.ts — LESSONS 583 & 584
 * ============================================================================
 *
 * TYPESCRIPT FUNDAMENTALS — PRIMITIVE AND COMPLEX TYPES
 *
 * This file explores the core type system features of TypeScript, from
 * the most fundamental primitives to more complex structures.
 *
 * WHAT THIS FILE COVERS:
 *
 *   LESSON 583 — Primitive types:
 *   - number, string, boolean
 *   - Type annotations on variables (not just function parameters)
 *   - Declaration-only vs declaration-with-assignment
 *   - Lowercase vs uppercase type names (number vs Number)
 *   - Why null/undefined are rarely used as standalone annotations
 *
 *   LESSON 584 — Complex types:
 *   - Array types (e.g., string[], number[])
 *   - Object types with defined structure (e.g., { name: string; age: number })
 *   - The "any" type and why it should be avoided
 *   - Combining arrays and objects (arrays of objects)
 *
 * UPCOMING TOPICS (covered in later lessons):
 *
 *   - Function types and return types
 *   - Union types, type aliases, and more advanced patterns
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

// ============================================================================
// LESSON 584: COMPLEX TYPES — ARRAYS AND OBJECTS
// ============================================================================
//
// ARRAY TYPES:
//
// To declare that a variable holds an ARRAY of a certain type, append
// square brackets [] to the element type:
//
//   string[]   → an array where every element must be a string
//   number[]   → an array where every element must be a number
//   boolean[]  → an array where every element must be a boolean
//
// Note the difference: "string" (without brackets) means a single string
// value, while "string[]" means an array containing only strings.
//
// OBJECT TYPES:
//
// TypeScript lets you describe the exact SHAPE (structure) of an object
// using an object type definition. The syntax looks similar to creating
// an object literal, but it appears on the RIGHT side of the colon in a
// type annotation — so it defines a type, not a value.
//
// Inside the curly braces, each property is listed with its name, a colon,
// and its expected type. Properties are separated by semicolons (not commas,
// though commas also work):
//
//   { name: string; age: number }
//
// This means: "an object that has a 'name' property of type string AND
// an 'age' property of type number."
//
// THE "any" TYPE:
//
// When you declare a variable without a type annotation AND without an
// initial value, TypeScript assigns the implicit type "any". This means
// the variable can hold literally anything — numbers, strings, objects,
// arrays, etc. You can also write "any" explicitly:
//
//   let data: any;
//
// While valid, "any" completely disables type checking for that variable.
// It is essentially opting back into plain JavaScript behavior, which
// defeats the purpose of using TypeScript. Avoid "any" whenever possible
// and use a specific type instead.
//
// COMBINING ARRAYS AND OBJECTS:
//
// Array types and object types can be combined to describe arrays of
// objects. Append [] after the object type definition:
//
//   { name: string; age: number }[]
//
// This declares an array where every element must be an object matching
// that structure.
// ============================================================================

// ── ARRAY TYPE: string[] ────────────────────────────────────────────────────

// The square brackets after "string" mean this variable must hold an ARRAY
// of strings — not a single string. Every element in the array must be a
// string; mixing in a number or other type would cause a compile error.
let hobbies: string[] = ["Sports", "Cooking"];

// UNCOMMENTING THE LINE BELOW WOULD CAUSE A COMPILE-TIME ERROR:
//   Type 'number' is not assignable to type 'string'.
// because the array is typed as string-only.
// hobbies = ["Sports", "Cooking", 3];

// ── THE "any" TYPE (AND WHY TO AVOID IT) ────────────────────────────────────

// Without a type annotation, TypeScript defaults to "any" — the variable
// accepts any value with no type checking at all. Writing "any" explicitly
// makes the intent visible but is equally permissive.
// let person: any;
//
// With "any", ALL of the following would be allowed — no errors, no safety:
//   person = "hello";
//   person = 42;
//   person = { isEmployee: true };
//
// This is the fallback you should avoid. Use a proper type instead.

// ── OBJECT TYPE ─────────────────────────────────────────────────────────────

// An object type definition describes the required structure. The syntax
// uses curly braces with property names and their types — it LOOKS like
// an object literal but it is NOT creating a value. It appears after the
// colon (in the type position), not after the equals sign (the value
// position).
let person: {
  name: string;
  age: number;
} = {
  name: "Max",
  age: 32,
};

// UNCOMMENTING THE BLOCK BELOW WOULD CAUSE A COMPILE-TIME ERROR:
// The object { isEmployee: true } does not match the required structure
// { name: string; age: number }. TypeScript rejects it because the
// properties and their types do not align.
//
// person = {
//   isEmployee: true,
// };

// ── COMBINING ARRAYS AND OBJECTS ────────────────────────────────────────────

// Appending [] after an object type definition creates an ARRAY OF OBJECTS
// where each element must conform to the specified structure. This is a
// common pattern — for example, a list of users, products, or posts would
// each be typed as an array of objects with a defined shape.
let people: {
  name: string;
  age: number;
}[];
