/**
 * ============================================================================
 * App.tsx — LESSONS 592–602
 * ============================================================================
 *
 * LESSONS 592–601 RECAP:
 *
 * This component previously held ALL the todo state management:
 * useState<Todo[]>, addTodoHandler, removeTodoHandler, and the prop
 * wiring to pass these down to child components. That approach
 * worked, but it required App to act as a middleman — passing
 * functions and data through props even though App itself did not
 * use them.
 *
 * ============================================================================
 * LESSON 602 — MIGRATING TO THE CONTEXT API
 * ============================================================================
 *
 * All state management has been moved to TodosContextProvider in
 * store/todos-context.tsx. App no longer imports useState, Todo, or
 * defines any handler functions. Its only responsibility is to:
 *
 *   1. Wrap the component tree with <TodosContextProvider>
 *   2. Render <NewTodo /> and <Todos /> as children
 *
 * The provider replaces the outer <div> that previously wrapped the
 * JSX content. Any component rendered inside the provider can access
 * the context value via useContext — no props needed.
 *
 * WHY THIS SIMPLIFIES App:
 *
 * Before (lessons 599–601), App needed these imports and logic:
 *   - useState from React
 *   - Todo from models
 *   - addTodoHandler and removeTodoHandler functions
 *   - Props on <NewTodo onAddTodo={...}> and <Todos items={...} onRemoveTodo={...}>
 *
 * Now, App is a thin wrapper with no state, no handlers, and no
 * data props — all of that lives in the context provider.
 *
 * ============================================================================
 */

import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
// The provider component wraps the tree and supplies context to all
// descendants. Without this wrapper, useContext calls in child
// components would only receive the dummy default values from
// createContext, not the real state-backed values.
import TodosContextProvider from './store/todos-context';

// App is now a lightweight shell. The TodosContextProvider handles
// state management internally, and child components access the
// context directly via useContext instead of receiving props.
function App() {
  return (
    <TodosContextProvider>
      <NewTodo />
      <Todos />
    </TodosContextProvider>
  );
}

export default App;
