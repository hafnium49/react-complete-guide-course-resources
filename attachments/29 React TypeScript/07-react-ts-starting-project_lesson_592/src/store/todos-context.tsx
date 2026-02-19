/**
 * ============================================================================
 * todos-context.tsx — LESSON 602
 * ============================================================================
 *
 * USING THE CONTEXT API WITH TYPESCRIPT
 *
 * This file centralizes all todo state management into a single
 * context. Previously, the state lived in App.tsx and was passed
 * down through props (App → Todos → TodoItem, App → NewTodo). That
 * required every intermediate component to declare and forward props
 * it did not use itself — a "prop chain" or "prop drilling" pattern.
 *
 * With the Context API, components that CONSUME the data (Todos,
 * NewTodo) can access it directly via useContext, without the parent
 * (App) acting as a middleman. App's only job becomes wrapping the
 * component tree with the context provider.
 *
 * FILE EXTENSION — .tsx (not .ts):
 *
 * This file contains JSX (the <TodosContext.Provider> element in the
 * provider component), so it must use the .tsx extension. Pure data
 * models (like todo.ts) use .ts because they contain no JSX.
 *
 * FOLDER CONVENTION — store/:
 *
 * Placing context files in a "store" folder is a naming convention
 * used throughout this course. It is not required by React — the
 * file could live anywhere. The convention signals that files in
 * this folder manage application-wide state rather than UI rendering.
 *
 * ============================================================================
 * TYPE ALIAS FOR THE CONTEXT SHAPE
 * ============================================================================
 *
 * A type alias (TodosContextObj) defines the shape of the context
 * value in ONE place. This alias is then reused wherever the shape
 * is needed — as the generic parameter for createContext AND as the
 * explicit type annotation for the contextValue object inside the
 * provider component.
 *
 * Without a shared type alias, the same type definition would need
 * to be written out (copy-pasted) in multiple places. If the shape
 * changes later, every copy would need to be updated. The alias
 * ensures a single source of truth.
 *
 * ============================================================================
 * createContext WITH A GENERIC TYPE PARAMETER
 * ============================================================================
 *
 * createContext is generic, just like useState:
 *
 *   React.createContext<TodosContextObj>(defaultValue)
 *
 * The generic parameter tells TypeScript what shape the context
 * value will have. This enables full type-checking and IDE
 * auto-completion when any component calls useContext on this
 * context — TypeScript knows the exact properties and their types.
 *
 * DEFAULT VALUE vs ACTUAL VALUE:
 *
 * The argument to createContext is a DEFAULT value — it is used
 * only when a component calls useContext WITHOUT a matching Provider
 * ancestor in the tree. In practice, the Provider always supplies
 * the real value (from state), so the default is essentially a
 * placeholder. However, TypeScript still checks that the default
 * matches the declared shape. The dummy functions (() => {}) satisfy
 * the function types in the shape definition.
 *
 * ============================================================================
 * TYPE DEFINITION vs CONCRETE VALUE — A KEY DISTINCTION
 * ============================================================================
 *
 * Inside the angle brackets <TodosContextObj>, we write TYPE
 * definitions: items: Todo[], addTodo: (text: string) => void, etc.
 * These describe the SHAPE of data — what types are expected.
 *
 * Inside the parentheses (the createContext argument), we write
 * CONCRETE JavaScript values: items: [], addTodo: () => {}, etc.
 * These are real runtime objects with actual (dummy) implementations.
 *
 * The function type "(text: string) => void" (in the type) looks
 * similar to the arrow function "() => {}" (in the value), but they
 * serve different purposes. The type describes what shape a function
 * MUST have; the value IS an actual (no-op) function.
 *
 * ============================================================================
 * THE PROVIDER COMPONENT PATTERN
 * ============================================================================
 *
 * TodosContextProvider is a wrapper component that:
 *   1. Manages the todos state with useState
 *   2. Defines the handler functions (add, remove)
 *   3. Bundles everything into a context value object
 *   4. Passes the value to <TodosContext.Provider>
 *   5. Renders props.children inside the provider
 *
 * By encapsulating state logic here, the App component becomes a
 * thin shell that only sets up the component tree structure.
 *
 * EXPLICIT TYPE ANNOTATION ON contextValue:
 *
 * The contextValue object is annotated with : TodosContextObj to
 * catch type mismatches at the point of creation rather than at the
 * point of use. Without this annotation, TypeScript would INFER the
 * type from the object literal. If a property had the wrong type
 * (e.g., addTodo missing its parameter), the error would only appear
 * later when contextValue is assigned to the Provider's value prop.
 * The explicit annotation catches such errors immediately.
 *
 * ============================================================================
 * EXPORTS — TWO SEPARATE EXPORTS
 * ============================================================================
 *
 * This file has TWO exports:
 *
 *   1. TodosContext (named export) — the context object itself.
 *      Consumer components import this to pass to useContext().
 *
 *   2. TodosContextProvider (default export) — the provider wrapper.
 *      App.tsx imports this to wrap the component tree.
 *
 * The type alias TodosContextObj is NOT exported because it is only
 * needed internally in this file. External components do not need
 * to reference the context shape directly — they get full type
 * information automatically from useContext(TodosContext).
 *
 * ============================================================================
 */

import React, { useState } from 'react';

import Todo from '../models/todo';

// A type alias that describes the shape of the context value.
// Defined once and reused as the generic parameter for createContext
// and as the type annotation for the contextValue object below.
type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

// createContext<TodosContextObj>() — the generic parameter ensures
// that TypeScript knows the shape of this context wherever it is
// consumed with useContext. The argument is the default value, which
// is only used if no Provider is found in the component tree.
// The dummy functions satisfy the type checker but are never called
// in practice because the Provider always supplies real functions.
export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: () => {},
});

// This provider component encapsulates all todo state management.
// It uses React.FC so that props.children is available — the
// provider must render its children inside the context wrapper.
const TodosContextProvider: React.FC = (props) => {
  // State management logic moved here from App.tsx. The useState
  // generic parameter <Todo[]> is still required for the empty
  // initial array, just as it was in App.tsx (lesson 599).
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string) => {
    const newTodo = new Todo(text);

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  // Explicit type annotation ensures this object matches the
  // context shape. Without it, a typo or missing property would
  // only be caught when assigned to the Provider's value prop.
  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
