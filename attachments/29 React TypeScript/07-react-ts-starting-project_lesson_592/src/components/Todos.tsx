/**
 * ============================================================================
 * Todos.tsx — LESSONS 592–593
 * ============================================================================
 *
 * TYPING COMPONENT PROPS WITH React.FC AND GENERICS
 *
 * LESSON 592 created this component with hardcoded todo items. LESSON 593
 * converts it to receive todos through PROPS — and this is where
 * TypeScript's value in a React project becomes clear.
 *
 * THE PROBLEM — UNTYPED PROPS:
 *
 * If you add a "props" parameter to a plain function component without
 * a type annotation, TypeScript warns you in two ways:
 *
 *   1. "Parameter 'props' implicitly has an 'any' type" — TypeScript
 *      does not know what shape the props object has, so it falls back
 *      to "any", which disables all type checking.
 *
 *   2. No auto-completion — the IDE cannot suggest prop names or
 *      catch mistakes when accessing props.propertyName because
 *      "any" means "could be anything."
 *
 * You COULD manually type props as an inline object type:
 *
 *   function Todos(props: { items: string[] }) { ... }
 *
 * But this misses the BUILT-IN props that every React component
 * receives automatically — most importantly, the "children" prop.
 * You would have to manually add "children" (and know its type)
 * to every component's prop definition, which is tedious and
 * error-prone.
 *
 * THE SOLUTION — React.FC<T> (Functional Component):
 *
 * React (via @types/react) provides a generic type called React.FC
 * (short for FunctionalComponent). Assigning this type to a component
 * does two things:
 *
 *   1. It tells TypeScript that this function is a React component,
 *      which means it automatically receives the base props object
 *      (including "children") without you having to define them.
 *
 *   2. The generic parameter <T> lets you MERGE your own custom
 *      props with those base props. Whatever object type you put
 *      between the angle brackets gets combined with the built-in
 *      props like "children".
 *
 * SYNTAX:
 *
 *   const Todos: React.FC<{ items: string[] }> = (props) => { ... };
 *
 *   - "React.FC" is the base type (functional component)
 *   - "<{ items: string[] }>" is the generic type argument — YOUR
 *     custom props definition, merged with the built-in base props
 *   - "props" now has full type information: props.items is string[],
 *     props.children is also available, and the IDE auto-completes
 *
 * HOW THIS USES GENERICS (lesson 589–590 callback):
 *
 * In lesson 589, we used angle brackets to DEFINE a generic type
 * parameter (<T>) on our own function. Here, we use angle brackets
 * differently — to CONSUME an existing generic type (React.FC) by
 * plugging in a concrete value for its internal type placeholder.
 * This is the same pattern shown in lesson 590 with Array<number>.
 *
 * React.FC is generic because different components have different
 * props. The type parameter lets each component specify its own
 * props shape while inheriting the common base props automatically.
 *
 * WHY ARROW FUNCTION SYNTAX:
 *
 * To assign the React.FC type, the component must be stored in a
 * variable (const) so that the type annotation can be placed on the
 * variable. This naturally leads to arrow function syntax:
 *
 *   const Todos: React.FC<...> = (props) => { ... };
 *
 * This is functionally identical to a regular function declaration —
 * arrow functions were used throughout the course as well.
 *
 * BENEFITS OF TYPED PROPS:
 *
 *   - Auto-completion: typing "props." in the IDE shows all available
 *     properties (items, children, etc.)
 *   - Error detection: if App.tsx uses <Todos /> without passing the
 *     required "items" prop, TypeScript flags it as an error
 *   - Documentation: the type definition serves as a contract — other
 *     developers can see exactly which props this component expects
 *
 * ============================================================================
 */

import React from 'react';

// The component is defined as an arrow function stored in a const,
// which allows the React.FC type annotation to be placed on the
// variable. The generic parameter { items: string[] } defines our
// custom props — this gets merged with the built-in base props
// (like children) by the FC type.
const Todos: React.FC<{ items: string[] }> = (props) => {
  // props.items is known to be string[] thanks to our type definition.
  // TypeScript provides full auto-completion for array methods like
  // .map() because it knows the type of items. Each item is inferred
  // as a string, so we can safely use it as JSX content and as a key.
  return (
    <ol>
      {props.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
};

export default Todos;
