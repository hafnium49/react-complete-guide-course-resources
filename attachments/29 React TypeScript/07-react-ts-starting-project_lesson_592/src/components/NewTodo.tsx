/**
 * ============================================================================
 * NewTodo.tsx — LESSONS 596–598, 600, 602
 * ============================================================================
 *
 * A FORM COMPONENT FOR ADDING TODOS — TYPING EVENTS, REFS, AND
 * FUNCTION PROPS
 *
 * LESSON 596 introduced this component with a typed submit handler.
 * LESSON 597 added useRef with TypeScript to extract user input.
 * LESSON 598 added a CALLBACK PROP so this component could
 * communicate the entered text back to the parent (App) component.
 *
 * ============================================================================
 * LESSON 596 RECAP — TYPING EVENT HANDLER PARAMETERS
 * ============================================================================
 *
 * React event types must be annotated manually on handler parameters:
 *
 *   - React.FormEvent   — for onSubmit on <form>
 *   - React.MouseEvent  — for onClick on buttons, divs, etc.
 *   - React.ChangeEvent — for onChange on inputs, selects, etc.
 *
 * ============================================================================
 * LESSON 597 RECAP — useRef WITH TYPESCRIPT
 * ============================================================================
 *
 * useRef is generic: useRef<HTMLInputElement>(null) specifies the
 * element type and the required null initial value. The "!" operator
 * asserts non-null when accessing .current inside the submit handler.
 *
 * ============================================================================
 * LESSON 598 RECAP — FUNCTION TYPES IN PROPS (CALLBACK PATTERN)
 * ============================================================================
 *
 * Previously, this component received an onAddTodo callback through
 * props, typed as (text: string) => void. The parent (App) defined
 * the actual handler function and passed it down via JSX attributes.
 *
 * ============================================================================
 * LESSON 602 — REPLACING PROPS WITH useContext
 * ============================================================================
 *
 * Instead of receiving a callback from the parent through props,
 * this component now accesses the addTodo function directly from
 * the TodosContext via useContext. This eliminates the need for the
 * parent to know about or forward the callback.
 *
 * WHAT CHANGED:
 *
 *   - The onAddTodo prop is removed from the component's type
 *     definition. React.FC no longer has a generic parameter since
 *     there are no custom props to describe.
 *   - The (props) parameter is removed from the arrow function.
 *   - props.onAddTodo(enteredText) becomes todosCtx.addTodo(enteredText).
 *   - useContext and TodosContext are imported.
 *
 * WHAT STAYED THE SAME:
 *
 * Everything INSIDE the component — the ref, the submit handler, the
 * form JSX — remains identical. The only difference is WHERE the
 * addTodo function comes from (context instead of props). The
 * internal logic of reading the input, validating it, and calling
 * the function is unchanged.
 *
 * ============================================================================
 */

import React, { useRef, useContext } from 'react';

import classes from './NewTodo.module.css';
import { TodosContext } from '../store/todos-context';

// No custom props — the addTodo function comes from context.
// The generic parameter on React.FC is omitted.
const NewTodo: React.FC = () => {
  // Access the context to get the addTodo function. TypeScript
  // knows the full shape of the context value automatically.
  const todosCtx = useContext(TodosContext);

  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    // Call addTodo from context instead of from props. TypeScript
    // still verifies that enteredText (string) matches the expected
    // parameter type — the type safety comes from the context's
    // type definition rather than from a props interface.
    todosCtx.addTodo(enteredText);
  };

  // The "form" class from NewTodo.module.css styles the form container,
  // label, input, and button using nested selectors (.form label, etc.).
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
