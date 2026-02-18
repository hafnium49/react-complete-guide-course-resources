/**
 * ============================================================================
 * App.tsx — LESSONS 592–598
 * ============================================================================
 *
 * LESSON 598 UPDATE — WIRING THE CALLBACK FROM NewTodo TO App
 *
 * The NewTodo component now expects an onAddTodo prop — a function
 * that takes a string and returns void. In this file, we define the
 * addTodoHandler function that matches that shape and pass it as the
 * prop value. When the user submits the form, NewTodo calls
 * props.onAddTodo(enteredText), which invokes addTodoHandler here.
 *
 * FUNCTION SHAPE MUST MATCH:
 *
 * The addTodoHandler function must accept a string parameter (the
 * todo text) and return nothing — matching the function type defined
 * in NewTodo's props: (text: string) => void. If the shapes don't
 * match (wrong parameter type, wrong number of parameters, or a
 * return type mismatch), TypeScript flags an error on the JSX prop.
 *
 * NEXT STEP — STATE MANAGEMENT:
 *
 * The todos array is still hardcoded outside the component. To make
 * the list dynamic (adding new todos triggers a re-render), we need
 * to manage it with useState. That will be wired up in the next
 * lesson — for now, the handler is defined but does not yet modify
 * the list.
 *
 * ============================================================================
 */

import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

const todos = [new Todo('Learn React'), new Todo('Learn TypeScript')];

// This function matches the shape expected by NewTodo's onAddTodo
// prop: (text: string) => void. It receives the entered text from
// the child component's form submission. The parameter type MUST be
// string — if it were number or any other type, TypeScript would
// reject the function when it is passed to NewTodo's onAddTodo prop.
const addTodoHandler = (text: string) => {
  // TODO: Add the new todo to the todos array using state management.
  // This will be implemented in the next lesson with useState.
};

// Pass addTodoHandler as the onAddTodo prop to NewTodo. TypeScript
// verifies that the function shape matches the expected type. If we
// forgot this prop entirely, TypeScript would flag an error because
// onAddTodo is required (not optional) in NewTodo's type definition.
function App() {
  return (
    <div>
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos items={todos} />
    </div>
  );
}

export default App;
