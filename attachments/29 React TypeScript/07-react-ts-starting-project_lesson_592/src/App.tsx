/**
 * ============================================================================
 * App.tsx — LESSONS 592–596
 * ============================================================================
 *
 * LESSON 596 UPDATE — ADDING THE NewTodo FORM COMPONENT
 *
 * A new <NewTodo /> component is rendered above the todo list. It
 * displays a form where the user can type and submit a new todo.
 * For now, the form handles submission (with preventDefault) but
 * does not yet create actual todos — that wiring comes in the next
 * lesson when useRef is introduced.
 *
 * LESSON 594 — USING THE Todo CLASS TO CREATE DATA
 *
 * Instead of passing plain strings as items, we now create Todo OBJECTS
 * using the Todo class from models/todo.ts. Each Todo instance has:
 *
 *   - id: string   (auto-generated in the constructor from a timestamp)
 *   - text: string (the todo description, passed to the constructor)
 *
 * The Todos component's type definition has been updated to expect
 * Todo[] instead of string[], so passing plain strings would now
 * cause a TypeScript error — the type system ensures that the data
 * shape matches what the component expects.
 *
 * TYPE SAFETY IN ACTION:
 *
 * If we tried to pass incorrect data (e.g., plain strings, objects
 * missing the "id" or "text" property, or objects with wrong types),
 * TypeScript would flag the error directly in the IDE. Errors are
 * caught during development, not at runtime when the user encounters
 * a broken page.
 *
 * ============================================================================
 */

import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

// Create Todo instances using the class constructor. Each call to
// "new Todo(...)" produces an object with an auto-generated id and
// the provided text. The resulting array is typed as Todo[] —
// TypeScript infers this from the constructor calls.
const todos = [new Todo('Learn React'), new Todo('Learn TypeScript')];

// Pass the todos array as the items prop. TypeScript verifies that
// the array matches the expected type (Todo[]) defined in the Todos
// component's React.FC generic parameter.
function App() {
  return (
    <div>
      <NewTodo />
      <Todos items={todos} />
    </div>
  );
}

export default App;
