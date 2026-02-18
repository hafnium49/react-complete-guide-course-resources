/**
 * ============================================================================
 * Todos.tsx — LESSONS 592–595, 600, 601
 * ============================================================================
 *
 * TYPING COMPONENT PROPS WITH React.FC AND GENERICS
 *
 * LESSON 592 created this component with hardcoded todo items. LESSON 593
 * converted it to receive todos through typed props using React.FC<T>.
 * LESSON 594 changed items from string[] to Todo[] using the Todo class.
 *
 * LESSON 595 UPDATE — OUTSOURCING A CHILD COMPONENT:
 *
 * The inline <li> element has been replaced with a dedicated
 * <TodoItem /> component. This is standard React practice — extract
 * repeated or complex markup into its own component for clarity and
 * reusability.
 *
 * The key prop is set on <TodoItem /> here in the parent (where .map
 * runs), not inside the TodoItem component itself. React handles
 * "key" as a special prop — the React.FC type allows it to be passed
 * on any component without it being declared in the component's own
 * props definition.
 *
 * The text prop is passed as item.text — only the string content,
 * not the entire Todo object, because TodoItem only needs the text
 * to render. The ID is used here for the key but is not forwarded
 * into the child component.
 *
 * ============================================================================
 * LESSON 600 — ADDING CSS MODULES (NOTHING TYPESCRIPT-SPECIFIC)
 * ============================================================================
 *
 * CSS Modules work exactly the same way in a TypeScript React project
 * as they do in a plain JavaScript React project. There is NOTHING
 * TypeScript-specific about importing or using CSS files — the build
 * tool (Create React App / Webpack) handles CSS module resolution
 * regardless of whether the component file is .tsx or .jsx.
 *
 * The import statement "import classes from './Todos.module.css'"
 * brings in an object where each key is a CSS class name defined in
 * the file (e.g., classes.todos corresponds to the .todos selector).
 * These are then applied via className={classes.todos} on JSX
 * elements.
 *
 * The list element is changed from <ol> to <ul> since the CSS module
 * removes default list styling (list-style: none), making ordered
 * numbering irrelevant.
 *
 * ============================================================================
 * LESSON 601 — FORWARDING THE REMOVE CALLBACK (PROP CHAIN)
 * ============================================================================
 *
 * This component sits BETWEEN App (which owns the state) and
 * TodoItem (which handles the click). It does not define the removal
 * logic itself — it receives onRemoveTodo from App and forwards it
 * down to each TodoItem. This is a PROP CHAIN: a function passed
 * through multiple layers of components to reach the one that
 * actually triggers it.
 *
 * TYPE MISMATCH AND THE .bind() SOLUTION:
 *
 * App's removeTodoHandler expects a string parameter (the todo ID),
 * but TodoItem's onRemoveTodo prop is typed as () => void (no
 * parameters). These shapes do not match directly. The solution is
 * .bind() — a built-in JavaScript method that creates a NEW function
 * with pre-configured arguments:
 *
 *   props.onRemoveTodo.bind(null, item.id)
 *
 *   - The first argument to .bind() sets the "this" context. Since
 *     arrow functions ignore "this", null is passed.
 *   - The second argument (item.id) becomes the FIRST argument that
 *     onRemoveTodo will receive when it is eventually called.
 *
 * The result is a new function that takes NO parameters (matching
 * TodoItem's () => void type) but internally calls the original
 * function with item.id already filled in.
 *
 * AN ALTERNATIVE APPROACH — PASSING THE ID THROUGH:
 *
 * Instead of using .bind(), you could pass the ID as a separate prop
 * to TodoItem and have TodoItem call onRemoveTodo(id) itself. Both
 * approaches are valid. The .bind() approach keeps TodoItem simpler
 * by not requiring it to know about IDs at all.
 *
 * ============================================================================
 */

import React from 'react';

import Todo from '../models/todo';
import TodoItem from './TodoItem';
// CSS Module import — the "classes" object maps each CSS class name
// defined in the .module.css file to a unique, scoped class string.
// This prevents style collisions between components.
import classes from './Todos.module.css';

// Props now include onRemoveTodo — a function that takes an ID
// (string) and returns nothing. This matches the shape of
// removeTodoHandler defined in App.tsx.
const Todos: React.FC<{ items: Todo[]; onRemoveTodo: (id: string) => void }> = (props) => {
  return (
    <ul className={classes.todos}>
      {props.items.map((item) => (
        // .bind(null, item.id) pre-fills the id argument so that
        // TodoItem receives a () => void function — it does not
        // need to know or pass the id itself.
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveTodo={props.onRemoveTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
