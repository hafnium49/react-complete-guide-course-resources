/**
 * ============================================================================
 * basics.ts — LESSONS 583–589
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
 *   LESSON 585 — Type inference:
 *   - How TypeScript automatically determines types from initial values
 *   - Why explicit annotations are redundant when initializing immediately
 *   - Best practice: rely on inference, annotate only when necessary
 *
 *   LESSON 586 — Union types:
 *   - Allowing multiple types for a single variable with the pipe (|) syntax
 *   - When explicit annotations are NOT redundant (overriding inference)
 *   - Union types can be used anywhere a type assignment appears
 *
 *   LESSON 587 — Type aliases:
 *   - The "type" keyword for creating reusable custom type names
 *   - Eliminating duplicated type definitions across the codebase
 *   - Type aliases are erased during compilation (TypeScript-only feature)
 *
 *   LESSON 588 — Functions and types:
 *   - Parameter types (recap) and return type inference
 *   - Explicit return type annotations (when needed vs redundant)
 *   - The "void" return type for functions that return nothing
 *
 *   LESSON 589 — Generics:
 *   - The problem: using "any" to write flexible functions loses type safety
 *   - Generic type parameters (<T>) for type-safe flexibility
 *   - How TypeScript infers the concrete type from the arguments
 *   - Why generics matter: catching errors that "any" would silently allow
 *
 * This file covers the complete TypeScript fundamentals introduction.
 * Later lessons move on to using TypeScript with React.
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

// ============================================================================
// LESSON 587: TYPE ALIASES
// ============================================================================
//
// As TypeScript code grows, you will often find yourself repeating the same
// type definition in multiple places. For example, the object type
// { name: string; age: number } was used both for "person" (a single
// object) and "people" (an array of objects) in lesson 584. Duplicating
// a type definition is error-prone — if the structure changes, you must
// update every copy.
//
// TYPE ALIASES solve this by letting you assign a name to any type
// definition. You define it once, then reference the name wherever you
// need that type.
//
// SYNTAX:
//
//   type Person = { name: string; age: number };
//
// The "type" keyword is a TYPESCRIPT-ONLY feature — it does not exist in
// standard JavaScript. During compilation, type aliases (like all type
// information) are completely ERASED from the output. They exist solely
// for the type checker and your IDE; the browser never sees them.
//
// KEY POINTS:
//
//   - The name after "type" can be anything you choose (by convention,
//     PascalCase — e.g., Person, CourseGoal, UserData).
//   - The right side of the "=" is a TYPE DEFINITION, not a JavaScript
//     value. It can be any type: a primitive, an object type, a union,
//     an array type, or any combination.
//   - Once defined, the alias can be used in all the same places as an
//     inline type: variable annotations, function parameters, return
//     types, array element types, etc.
//   - Changing the alias definition automatically updates every place
//     that references it — single source of truth.
// ============================================================================

// Define a reusable type alias for a person object. This replaces the
// inline { name: string; age: number } that was previously duplicated
// across the "person" and "people" variables.
type Person = {
  name: string;
  age: number;
};

// ── OBJECT TYPE ─────────────────────────────────────────────────────────────

// An object type definition describes the required structure. The syntax
// uses curly braces with property names and their types — it LOOKS like
// an object literal but it is NOT creating a value. It appears after the
// colon (in the type position), not after the equals sign (the value
// position).
//
// LESSON 587 UPDATE: The inline object type that was originally written
// here has been extracted into a type alias (see the "Person" type alias
// below). The variable now references that alias instead of repeating
// the full object structure.
let person: Person = {
  name: "Max",
  age: 32,
};

// UNCOMMENTING THE BLOCK BELOW WOULD CAUSE A COMPILE-TIME ERROR:
// The object { isEmployee: true } does not match the Person type alias
// (which requires { name: string; age: number }). TypeScript rejects it
// because the properties and their types do not align.
//
// person = {
//   isEmployee: true,
// };

// ── COMBINING ARRAYS AND OBJECTS ────────────────────────────────────────────

// Appending [] after a type name creates an ARRAY OF OBJECTS where each
// element must conform to the specified structure. Using the Person alias
// here (instead of repeating the full object type) demonstrates why type
// aliases are valuable — the type is defined once and reused everywhere.
let people: Person[];

// ============================================================================
// LESSON 585: TYPE INFERENCE
// ============================================================================
//
// In the examples above, every variable has an EXPLICIT type annotation
// written out by hand. But TypeScript has a powerful feature called TYPE
// INFERENCE that often makes explicit annotations unnecessary.
//
// HOW IT WORKS:
//
// When you declare a variable AND assign an initial value in the same
// statement, TypeScript automatically examines the value and infers the
// variable's type from it. You do not need to write the type yourself —
// TypeScript figures it out.
//
//   let course = "React - The Complete Guide";   // inferred as string
//   let count = 42;                              // inferred as number
//   let active = true;                           // inferred as boolean
//
// After inference, the variable is locked to that type just as firmly as
// if you had written an explicit annotation. Attempting to assign a value
// of a different type will produce a compile-time error.
//
// WHEN TO USE EXPLICIT ANNOTATIONS vs INFERENCE:
//
//   REDUNDANT (avoid):
//     let course: string = "React - The Complete Guide";
//
//   The ": string" annotation adds no information — TypeScript already
//   knows the initial value is a string. Writing it out is extra work
//   for no benefit.
//
//   NECESSARY (keep):
//     let age: number;
//     age = 24;
//
//   Here the declaration has NO initial value, so TypeScript cannot infer
//   the type. Without the explicit annotation, the variable would default
//   to "any". The annotation is needed to tell TypeScript what to expect.
//
// BEST PRACTICE:
//
// Rely on type inference whenever possible. Only add explicit type
// annotations when TypeScript cannot determine the type on its own —
// typically when a variable is declared without an initial value, or
// when the inferred type is broader than what you intend. This keeps
// code concise without sacrificing type safety.
// ============================================================================

// ── TYPE INFERENCE IN ACTION ────────────────────────────────────────────────

// No ": string" annotation needed. TypeScript inspects the initial value
// "React - The Complete Guide" and infers that course is of type string.
// Hovering over this variable in the IDE confirms the inferred type.
let course = "React - The Complete Guide";

// UNCOMMENTING THE LINE BELOW WOULD CAUSE A COMPILE-TIME ERROR:
//   Type 'number' is not assignable to type 'string'.
// Even though no explicit type was written, inference locks the variable
// to string. Assigning a number (e.g., a course ID) is rejected.
// course = 12345;

// COMPARE: Adding an explicit annotation here IS valid but REDUNDANT.
// Both lines below produce the exact same result — the variable is
// typed as string either way. The second form is preferred because
// it is shorter and leverages inference.
//
//   let title: string = "Advanced TypeScript";   // explicit (redundant)
//   let title = "Advanced TypeScript";            // inferred (preferred)

// ============================================================================
// LESSON 586: UNION TYPES
// ============================================================================
//
// Up to this point, every variable has been restricted to a SINGLE type —
// just a number, just a string, just a boolean. But sometimes a variable
// legitimately needs to accept more than one type. For example, a "course"
// variable might hold either a course name (string) or a course ID (number).
//
// UNION TYPE SYNTAX:
//
// A union type is created by joining two or more types with the PIPE
// symbol (|):
//
//   let value: string | number;
//
// This declares that "value" can hold either a string OR a number — both
// are valid assignments. You can chain as many types as needed:
//
//   let flexible: string | number | boolean;
//
// WHERE UNION TYPES CAN BE USED:
//
// Union types work anywhere a type annotation appears — variable
// declarations, function parameters, function return types, object
// properties, array element types, etc. They are not limited to
// simple variable declarations.
//
// UNION TYPES AND TYPE INFERENCE:
//
// In lesson 585 we learned that explicitly writing ": string" on a
// variable initialized with a string is redundant. But when defining
// a UNION type, the explicit annotation is NOT redundant — inference
// would only give you the type of the initial value (e.g., string),
// not the union you actually want (string | number). So union type
// annotations are always necessary and never redundant.
// ============================================================================

// ── UNION TYPE IN ACTION ────────────────────────────────────────────────────

// Without a union type, TypeScript infers "course" as string (lesson 585),
// and assigning a number would fail. By explicitly annotating the variable
// as "string | number", we tell TypeScript that BOTH types are acceptable.
// This annotation is NOT redundant — it expands the allowed types beyond
// what inference alone would provide.
let courseFlexible: string | number = "React - The Complete Guide";

// Now assigning a number is perfectly valid — the union type permits it.
// Without the union, this line would produce a compile-time error.
courseFlexible = 12345;

// ── UNION TYPES ON OTHER VARIABLES ──────────────────────────────────────────

// Union types can combine any types, including complex ones. Here a
// userName could be a single string (e.g., "Max") or an array of strings
// (e.g., ["Max", "Schwarzmüller"] for first and last name separately).
let flexibleName: string | string[] = "Max";
flexibleName = ["Max", "Schwarzmüller"];

// ============================================================================
// LESSON 588: FUNCTIONS AND TYPES
// ============================================================================
//
// Functions interact with the type system in TWO places:
//
//   1. PARAMETER TYPES — annotations on the input values (already seen in
//      lesson 581 with the add function). These work exactly like variable
//      type annotations: a colon after the parameter name, followed by the
//      type.
//
//   2. RETURN TYPE — the type of the value the function gives back. This
//      is placed after the closing parenthesis of the parameter list:
//
//        function add(a: number, b: number): number { ... }
//                                            ^^^^^^
//                                         return type
//
// RETURN TYPE INFERENCE:
//
// Just as TypeScript infers variable types from initial values (lesson 585),
// it also infers RETURN TYPES by analyzing the return statement and the
// types of the values involved. If a function returns "a + b" where both
// a and b are numbers, TypeScript knows the result must be a number — no
// explicit return type annotation is needed.
//
// You CAN add an explicit return type, and it is not an error to do so.
// But if the inferred type is already correct, it is redundant — the same
// best-practice rule from lesson 585 applies: let inference do the work
// unless you have a specific reason to override it.
//
// THE "void" RETURN TYPE:
//
// Some functions perform an action (like logging to the console) but do
// NOT return a value — they have no return statement. TypeScript represents
// this with the special type "void".
//
//   function printOutput(value: any): void { console.log(value); }
//
// "void" is conceptually similar to undefined (which is what a function
// without a return statement actually produces at runtime), but it is a
// distinct type used exclusively for function return values. It signals
// to other developers and to the type checker that the function's return
// value is intentionally unused.
//
// NOTE ON "any" FOR PARAMETERS:
//
// In most cases, "any" should be avoided (lesson 584). But for a utility
// function whose sole purpose is to log a value — where the type of the
// value genuinely does not matter — "any" is an acceptable choice. The
// function works identically regardless of what it receives.
// ============================================================================

// ── FUNCTION WITH INFERRED RETURN TYPE ──────────────────────────────────────

// Parameter types are explicitly set to number. The return type is INFERRED
// as number because "a + b" with two number operands can only produce a
// number. Hovering over the function name in the IDE confirms:
//   function add(a: number, b: number): number
// There is no need to write ": number" after the parameter list explicitly.
function add(a: number, b: number) {
  return a + b;
}

// An explicit return type annotation IS possible but REDUNDANT here.
// The following would be equivalent:
//
//   function add(a: number, b: number): number { return a + b; }
//
// Only add an explicit return type when:
//   - The inferred type is not what you intend (e.g., you want to narrow it)
//   - You want to document the contract for a complex function
//   - The function has multiple return paths with different types

// ── FUNCTION WITH void RETURN TYPE ──────────────────────────────────────────

// This function logs a value to the console but does not return anything.
// TypeScript infers the return type as "void" — a special type that means
// "this function produces no usable return value."
//
// The parameter is typed as "any" because the function simply passes the
// value to console.log, which accepts anything. The concrete type of the
// input is irrelevant to the function's behavior.
//
// NOTE: The function is named "printOutput" rather than "print" to avoid
// clashing with JavaScript's built-in window.print() function, which
// would cause a compilation error due to the name conflict.
function printOutput(value: any) {
  console.log(value);
}

// ============================================================================
// LESSON 589: GENERICS
// ============================================================================
//
// THE PROBLEM — FLEXIBILITY vs TYPE SAFETY:
//
// Consider a utility function that inserts a value at the beginning of an
// array and returns the new array. To make it work with ANY type of array
// (numbers, strings, objects, etc.), you might type the parameters as "any":
//
//   function insertAtBeginning(array: any[], value: any) {
//     return [value, ...array];
//   }
//
// This works — it accepts any array and any value. But it has a critical
// flaw: TypeScript loses ALL type information about the result. Even if
// you pass in a number[] and a number, the returned array is typed as
// any[]. That means TypeScript will not catch mistakes when you use the
// returned values — you could call string methods on numbers without any
// error, completely defeating the purpose of type checking.
//
// GENERICS SOLVE THIS:
//
// A GENERIC function uses a TYPE PARAMETER (conventionally named T) to
// create a link between the types of the inputs and the type of the output.
// Instead of hardcoding a specific type or giving up with "any", the
// function says: "I don't know the type yet — the CALLER will determine
// it when they invoke me."
//
// SYNTAX:
//
//   function insertAtBeginning<T>(array: T[], value: T): T[] {
//     return [value, ...array];
//   }
//
// The <T> after the function name DEFINES a generic type parameter. It
// acts as a placeholder that gets filled in with a concrete type each
// time the function is called. Everywhere "T" appears in the parameter
// list and return type, it represents the SAME concrete type.
//
// HOW TYPE INFERENCE WORKS WITH GENERICS:
//
// When you call insertAtBeginning([1, 2, 3], -1), TypeScript examines the
// arguments and determines that T must be "number" — because the array
// contains numbers and the value is a number. The return type is then
// inferred as number[], not any[]. All type information is preserved.
//
// You do NOT need to specify T explicitly (though you can):
//
//   insertAtBeginning<number>([1, 2, 3], -1)   // explicit (valid but verbose)
//   insertAtBeginning([1, 2, 3], -1)            // inferred (preferred)
//
// WHY THIS MATTERS:
//
// With the "any" version, TypeScript would silently allow calling
// updatedArray[0].split("") on a number — no error until runtime. With
// the generic version, TypeScript knows the result is number[] and
// immediately flags .split("") as invalid on a number value. Generics
// give you the FLEXIBILITY of "any" (works with any type) combined with
// the SAFETY of explicit types (TypeScript tracks what T actually is).
//
// GENERICS ARE USED EXTENSIVELY IN REACT:
//
// React's own type definitions use generics heavily — for example,
// useState<T> lets TypeScript know the type of state you're managing.
// Understanding generics here prepares you for React + TypeScript in
// the upcoming lessons.
// ============================================================================

// ── GENERIC FUNCTION: insertAtBeginning ─────────────────────────────────────

// The <T> after the function name declares a generic type parameter. When
// the function is called, TypeScript fills in T with the actual type of
// the arguments. The parameter "array" must be an array of T values, and
// "value" must also be of type T — ensuring they are compatible. The
// return type T[] is inferred automatically (it could also be written
// explicitly, but inference handles it).
function insertAtBeginning<T>(array: T[], value: T) {
  // The spread operator creates a new array with "value" as the first
  // element, followed by all elements of the original array. Because
  // both inputs are typed as T, the result is also T[].
  return [value, ...array];
}

// ── USING THE GENERIC FUNCTION WITH NUMBERS ─────────────────────────────────

// TypeScript examines the arguments: [1, 2, 3] is number[] and -1 is a
// number. It infers T = number, so the return type is number[]. The
// variable updatedArray is correctly typed as number[] — all type
// information is preserved.
const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); // number[]

// Because TypeScript knows updatedArray is number[], it catches type
// errors when you try to use the elements incorrectly:
//
// UNCOMMENTING THE LINE BELOW WOULD CAUSE A COMPILE-TIME ERROR:
//   Property 'split' does not exist on type 'number'.
//
// updatedArray[0].split("");
//
// With the "any" version of the function, this error would NOT be caught
// — TypeScript would allow .split("") on an any value, and the bug would
// only surface at runtime. Generics prevent this class of error entirely.

// ── USING THE SAME GENERIC FUNCTION WITH STRINGS ────────────────────────────

// The same function works with strings too — T is inferred as "string"
// this time, producing a string[] result. The function is reusable across
// types without losing type safety.
const stringArray = insertAtBeginning(["a", "b", "c"], "d"); // string[]
