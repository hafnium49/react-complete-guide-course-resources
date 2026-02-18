/**
 * ============================================================================
 * App.tsx — LESSONS 592–601
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
 * LESSON 601 — REMOVING TODOS (filter FOR IMMUTABLE DELETION)
 * ============================================================================
 *
 * To remove a todo, the removeTodoHandler receives the ID of the
 * todo to delete. It uses Array.filter() to produce a NEW array
 * that excludes the matching todo, then passes that new array to
 * setTodos. Like concat, filter does NOT mutate the original
 * array — it returns a brand new one.
 *
 * HOW filter WORKS FOR DELETION:
 *
 *   prevTodos.filter(todo => todo.id !== todoId)
 *
 * filter keeps every element where the callback returns true. By
 * checking todo.id !== todoId, we KEEP all todos whose ID does NOT
 * match the one being removed, effectively dropping the one that
 * does match.
 *
 * THE CALLBACK CHAIN — App → Todos → TodoItem:
 *
 * removeTodoHandler is defined here with the signature
 * (todoId: string) => void. It is passed to the Todos component
 * as the onRemoveTodo prop. Todos then uses .bind(null, item.id)
 * to pre-fill the ID for each TodoItem, so TodoItem receives a
 * simple () => void callback it can attach directly to onClick.
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

  // Receives the ID of the todo to remove. The parameter type is
  // string because that is how IDs are typed in the Todo class.
  // Uses the function form of setTodos since the new state depends
  // on the previous state.
  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      // filter returns a new array containing only the todos whose
      // ID does NOT match todoId — the matching todo is excluded.
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  return (
    <div>
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos items={todos} onRemoveTodo={removeTodoHandler} />
    </div>
  );
}

export default App;
