/**
 * ============================================================================
 * Todos.tsx — LESSONS 592–595, 600
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
 */

import React from 'react';

import Todo from '../models/todo';
import TodoItem from './TodoItem';
// CSS Module import — the "classes" object maps each CSS class name
// defined in the .module.css file to a unique, scoped class string.
// This prevents style collisions between components.
import classes from './Todos.module.css';

const Todos: React.FC<{ items: Todo[] }> = (props) => {
  return (
    <ul className={classes.todos}>
      {props.items.map((item) => (
        <TodoItem key={item.id} text={item.text} />
      ))}
    </ul>
  );
};

export default Todos;
