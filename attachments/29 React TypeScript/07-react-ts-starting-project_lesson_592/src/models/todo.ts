/**
 * ============================================================================
 * todo.ts — LESSON 594
 * ============================================================================
 *
 * A DATA MODEL FOR TODOS — USING A CLASS AS BOTH CONSTRUCTOR AND TYPE
 *
 * FILE EXTENSION — .ts (not .tsx):
 *
 * This file contains no JSX — it is pure TypeScript logic defining a
 * data model. Therefore it uses the .ts extension, not .tsx. It also
 * lives in a "models" folder (not "components") to reflect that it
 * describes the SHAPE of data, not a UI element.
 *
 * WHY A CLASS INSTEAD OF A TYPE ALIAS:
 *
 * There are three ways to describe the shape of a Todo in TypeScript:
 *
 *   1. type Todo = { id: string; text: string };       // type alias
 *   2. interface Todo { id: string; text: string; }     // interface
 *   3. class Todo { id: string; text: string; ... }     // class
 *
 * All three define a shape, but a CLASS can also be INSTANTIATED —
 * you can call "new Todo(...)" to create objects. A type alias or
 * interface only exists at compile time and is erased from the
 * output. A class persists as real JavaScript and can include
 * constructor logic (like auto-generating an ID).
 *
 * In TypeScript, a class name serves DOUBLE DUTY:
 *
 *   - As a CONSTRUCTOR FUNCTION: new Todo("Learn React") creates
 *     an object with id and text properties.
 *   - As a TYPE: you can write "items: Todo[]" in a type annotation
 *     to mean "an array of objects matching this class's shape."
 *
 * This dual role is why classes are especially convenient for data
 * models — you get a reusable type AND a way to create instances
 * in a single definition.
 *
 * TYPESCRIPT CLASS SYNTAX vs JAVASCRIPT:
 *
 * In vanilla JavaScript, class properties are set inside the
 * constructor with "this.id = ..." — you don't declare them
 * beforehand. In TypeScript, you MUST declare properties and their
 * types explicitly in the class body BEFORE the constructor. This
 * lets TypeScript know the shape of the class at compile time:
 *
 *   class Todo {
 *     id: string;       // ← required in TypeScript, not in JS
 *     text: string;     // ← required in TypeScript, not in JS
 *     constructor(...) { ... }
 *   }
 *
 * Without these declarations, TypeScript reports: "Property has no
 * initializer and is not definitely assigned in the constructor."
 *
 * ============================================================================
 */

class Todo {
  // Property declarations with type annotations. These tell TypeScript
  // that every Todo instance will have an "id" of type string and a
  // "text" of type string. In plain JavaScript, you would skip these
  // and just assign values in the constructor — but TypeScript requires
  // the upfront declarations so it can verify types at compile time.
  id: string;
  text: string;

  // The constructor receives the todo text as a parameter and auto-
  // generates a unique ID based on the current timestamp. The type
  // annotation on todoText ensures only strings can be passed in.
  constructor(todoText: string) {
    this.text = todoText;
    this.id = new Date().toISOString();
  }
}

export default Todo;
