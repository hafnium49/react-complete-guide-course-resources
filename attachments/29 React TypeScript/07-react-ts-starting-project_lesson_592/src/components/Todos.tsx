/**
 * ============================================================================
 * Todos.tsx — LESSONS 592–594
 * ============================================================================
 *
 * TYPING COMPONENT PROPS WITH React.FC AND GENERICS
 *
 * LESSON 592 created this component with hardcoded todo items. LESSON 593
 * converted it to receive todos through typed props using React.FC<T>.
 *
 * LESSON 594 UPDATE — USING A CLASS AS A TYPE:
 *
 * Previously, items was typed as string[] — each todo was just a plain
 * string. Now each todo is a Todo OBJECT (from models/todo.ts) with
 * "id" and "text" properties. The type annotation changes from:
 *
 *   React.FC<{ items: string[] }>     →  React.FC<{ items: Todo[] }>
 *
 * Because the Todo class name acts as BOTH a constructor function and
 * a type (lesson 594), we can use it directly in our type annotation.
 * "Todo[]" means "an array of objects that match the shape defined by
 * the Todo class" — i.e., objects with an id: string and text: string.
 *
 * This also changes how we render each item in the map callback:
 *
 *   - key={item}       → key={item.id}     (use the unique ID)
 *   - {item}           → {item.text}       (display the text property)
 *
 * THE PROBLEM — UNTYPED PROPS (lesson 593 recap):
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
 * THE SOLUTION — React.FC<T> (lesson 593 recap):
 *
 * React.FC is a generic type from @types/react. It marks a function
 * as a React component and merges your custom props (passed via the
 * generic parameter) with built-in base props like "children".
 *
 * ============================================================================
 */

import React from 'react';

// Import the Todo class to use as a TYPE in our props definition.
// The class serves double duty: it can construct new Todo objects
// (with "new Todo(...)") AND it can be used as a type annotation
// (with "items: Todo[]") — both from the same class definition.
import Todo from '../models/todo';

// The generic parameter now uses Todo[] instead of string[]. This
// means props.items is an array of Todo objects, each guaranteed to
// have an "id" and "text" property. TypeScript auto-completes these
// properties when accessing individual items in the map callback.
const Todos: React.FC<{ items: Todo[] }> = (props) => {
  // Each item in the map is inferred as a Todo object. We access
  // item.id for the key (a unique identifier) and item.text for
  // the display content. TypeScript would flag an error if we tried
  // to access a property that does not exist on the Todo class.
  return (
    <ol>
      {props.items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ol>
  );
};

export default Todos;
