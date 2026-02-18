/**
 * ============================================================================
 * Todos.tsx — LESSONS 592–595
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
 */

import React from 'react';

import Todo from '../models/todo';
import TodoItem from './TodoItem';

// The map callback now renders <TodoItem /> instead of a raw <li>.
// TypeScript auto-completes the "text" prop because it knows the
// TodoItem component expects { text: string } from its React.FC
// generic parameter. Pressing Ctrl+Space in the IDE shows the
// available props for TodoItem.
const Todos: React.FC<{ items: Todo[] }> = (props) => {
  return (
    <ol>
      {props.items.map((item) => (
        <TodoItem key={item.id} text={item.text} />
      ))}
    </ol>
  );
};

export default Todos;
