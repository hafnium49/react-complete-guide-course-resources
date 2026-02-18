/**
 * ============================================================================
 * App.tsx — LESSONS 592–599
 * ============================================================================
 *
 * LESSON 599 UPDATE — useState WITH TYPESCRIPT
 *
 * The todos array was previously hardcoded as a constant OUTSIDE the
 * component. That meant the list never changed — even though the
 * addTodoHandler received new todo text, there was no mechanism to
 * trigger a re-render with the updated list.
 *
 * Now, the todos array is managed with useState INSIDE the component.
 * When a new todo is added, setTodos creates a new array and React
 * re-renders the component with the updated list.
 *
 * ============================================================================
 * WHY useState NEEDS A GENERIC TYPE PARAMETER HERE
 * ============================================================================
 *
 * useState uses TypeScript generics to determine the type of the
 * state value. In many cases, TypeScript can INFER the type from the
 * initial value:
 *
 *   useState('hello')    → TypeScript infers string
 *   useState(42)         → TypeScript infers number
 *   useState(true)       → TypeScript infers boolean
 *
 * But with an EMPTY ARRAY, TypeScript has no elements to examine, so
 * it infers the type as never[] — an array that can never contain
 * anything. Attempting to add a Todo to a never[] causes a type error
 * because Todo is not assignable to never.
 *
 * The fix is to provide an EXPLICIT generic type parameter:
 *
 *   useState<Todo[]>([])
 *
 * This tells TypeScript: "the state is an array of Todo objects, and
 * it starts empty." Now setTodos accepts Todo[] values, and the state
 * variable is correctly typed as Todo[].
 *
 * If the initial value were non-empty — e.g., useState([new Todo('...')])
 * — TypeScript COULD infer Todo[] automatically, and the explicit
 * generic would be optional (though still allowed for clarity).
 *
 * ============================================================================
 * MOVING THE HANDLER INSIDE THE COMPONENT
 * ============================================================================
 *
 * The addTodoHandler was previously defined OUTSIDE the App function.
 * It is now defined INSIDE, because it needs access to the setTodos
 * function returned by useState. Functions that update state must
 * live inside the component where that state is declared.
 *
 * ============================================================================
 * IMMUTABLE STATE UPDATES — concat vs push
 * ============================================================================
 *
 * React state must be updated IMMUTABLY — never modify the existing
 * array directly. Array.push() mutates the existing array in place,
 * which React cannot detect as a change (same reference). Instead,
 * Array.concat() returns a BRAND NEW array with the item appended,
 * leaving the original unchanged. React sees a new array reference
 * and triggers a re-render.
 *
 * The FUNCTION FORM of setState is used here:
 *
 *   setTodos(prevTodos => prevTodos.concat(newTodo))
 *
 * instead of:
 *
 *   setTodos(todos.concat(newTodo))
 *
 * The function form guarantees that prevTodos is the most recent
 * state snapshot. When state updates depend on the PREVIOUS state
 * value, always use the function form to avoid stale closures.
 *
 * ============================================================================
 */

import { useState } from 'react';

import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
  // useState<Todo[]>([]) — the generic parameter <Todo[]> tells
  // TypeScript that this state holds an array of Todo objects.
  // Without the generic, the empty array [] would be inferred as
  // never[], and any attempt to add a Todo would cause a type error.
  const [todos, setTodos] = useState<Todo[]>([]);

  // This handler is now INSIDE the component so it can access
  // setTodos. It still matches the shape expected by NewTodo's
  // onAddTodo prop: (text: string) => void.
  const addTodoHandler = (text: string) => {
    const newTodo = new Todo(text);

    // Use the function form of setTodos to safely base the new
    // state on the previous state. concat() returns a new array
    // with the new todo appended — it does NOT mutate prevTodos.
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  return (
    <div>
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos items={todos} />
    </div>
  );
}

export default App;
