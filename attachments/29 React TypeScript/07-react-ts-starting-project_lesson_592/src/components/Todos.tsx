/**
 * ============================================================================
 * Todos.tsx — LESSONS 592–595, 600–602
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
 * ============================================================================
 * LESSON 601 RECAP — THE .bind() TECHNIQUE (STILL USED HERE)
 * ============================================================================
 *
 * The .bind() approach from lesson 601 is still used here to
 * pre-configure the todo ID for each TodoItem's onRemoveTodo
 * callback. The difference is that the removeTodo function now
 * comes from CONTEXT instead of props.
 *
 * ============================================================================
 * LESSON 602 — REPLACING PROPS WITH useContext
 * ============================================================================
 *
 * This component previously received both items (Todo[]) and
 * onRemoveTodo ((id: string) => void) as PROPS from App.tsx. That
 * required App to act as a middleman, passing data and functions
 * through even though App itself did not use them.
 *
 * Now, both values come directly from the TodosContext via the
 * useContext hook. The component no longer accepts any custom props,
 * so the generic parameter on React.FC is removed entirely.
 *
 * AUTOMATIC TYPE INFERENCE FROM useContext:
 *
 * When you call useContext(TodosContext), TypeScript automatically
 * knows the return type because TodosContext was created with
 * createContext<TodosContextObj>(...). There is no need to annotate
 * the todosCtx variable — hovering over it in the IDE shows the
 * full TodosContextObj type with items, addTodo, and removeTodo.
 *
 * WHAT CHANGED IN THE JSX:
 *
 *   - props.items        → todosCtx.items
 *   - props.onRemoveTodo → todosCtx.removeTodo
 *
 * The .bind(null, item.id) technique remains the same — it still
 * pre-configures the ID so TodoItem receives a () => void function.
 *
 * REMOVING THE PROPS TYPE DEFINITION:
 *
 * Since this component no longer uses any custom props, the generic
 * parameter on React.FC<{ items: Todo[]; onRemoveTodo: ... }> is
 * removed. The component is now just React.FC with no type argument.
 * The Todo model import is also removed since items are accessed
 * through context, not through a typed prop.
 *
 * ============================================================================
 */

import React, { useContext } from 'react';

import TodoItem from './TodoItem';
import classes from './Todos.module.css';
// Import the context object (named export) — NOT the provider.
// The context is passed to useContext to access the current value.
import { TodosContext } from '../store/todos-context';

// No custom props — all data comes from context. The generic
// parameter on React.FC is omitted since there are no props to type.
const Todos: React.FC = () => {
  // useContext returns the current context value. TypeScript infers
  // its type as TodosContextObj automatically from the generic
  // parameter that was set on createContext.
  const todosCtx = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        // .bind(null, item.id) still pre-fills the id — the only
        // change is the source: todosCtx.removeTodo instead of
        // props.onRemoveTodo.
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
