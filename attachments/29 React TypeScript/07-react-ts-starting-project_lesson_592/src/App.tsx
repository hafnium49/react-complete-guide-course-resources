/**
 * ============================================================================
 * App.tsx — LESSONS 592–593
 * ============================================================================
 *
 * LESSON 593 UPDATE — PASSING TYPED PROPS
 *
 * The Todos component now expects an "items" prop of type string[].
 * Because the prop is required (not optional), TypeScript will flag
 * an error if we use <Todos /> without passing "items". This is one
 * of the key benefits of typed props — incorrect component usage is
 * caught at compile time, directly in the IDE, before the code ever
 * runs.
 *
 * If we wanted to make "items" optional, we could add a question mark
 * in the Todos component's type definition: { items?: string[] }.
 * But then the component would need to handle the case where items
 * is undefined. Here, items is required — every usage of <Todos />
 * MUST provide it.
 *
 * ============================================================================
 */

import Todos from './components/Todos';

// The items prop is passed as an array of strings. Without this prop,
// TypeScript would report an error because the Todos component's type
// definition (React.FC<{ items: string[] }>) marks it as required.
function App() {
  return (
    <div>
      <Todos items={['Learn React', 'Learn TypeScript']} />
    </div>
  );
}

export default App;
