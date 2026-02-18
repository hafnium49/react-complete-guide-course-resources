/**
 * ============================================================================
 * NewTodo.tsx — LESSONS 596–598
 * ============================================================================
 *
 * A FORM COMPONENT FOR ADDING TODOS — TYPING EVENTS, REFS, AND
 * FUNCTION PROPS
 *
 * LESSON 596 introduced this component with a typed submit handler.
 * LESSON 597 added useRef with TypeScript to extract user input.
 * LESSON 598 adds a CALLBACK PROP so this component can communicate
 * the entered text back to the parent (App) component.
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
 * LESSON 598 — FUNCTION TYPES IN PROPS (CALLBACK PATTERN)
 * ============================================================================
 *
 * CHILD-TO-PARENT COMMUNICATION:
 *
 * A common React pattern is passing a function from a parent to a
 * child component via props. The child calls the function to send
 * data back up. This pattern is identical in TypeScript — the only
 * addition is that the FUNCTION ITSELF must be typed in the props
 * definition.
 *
 * FUNCTION TYPE SYNTAX IN TYPESCRIPT:
 *
 * A function type describes the shape of a function — its parameters
 * and return type — using arrow notation within a type definition:
 *
 *   onAddTodo: (text: string) => void
 *
 *   - (text: string)   — the function takes one parameter of type string
 *   - => void           — the function returns nothing
 *
 * IMPORTANT: This looks like an arrow function, but it is NOT creating
 * a function. It appears inside a TYPE DEFINITION (between the angle
 * brackets of React.FC<...>), so TypeScript interprets it as a
 * function TYPE — a description of what shape the function must have.
 *
 * EXAMPLES OF FUNCTION TYPES:
 *
 *   () => void                    — no parameters, no return value
 *   (text: string) => void        — one string parameter, no return
 *   (a: number, b: number) => number — two numbers in, one number out
 *   (items: Todo[]) => boolean    — array of Todos in, boolean out
 *
 * WHY THIS MATTERS:
 *
 * TypeScript verifies BOTH sides of the callback:
 *
 *   1. Inside this component — calling props.onAddTodo(enteredText)
 *      is valid because enteredText is a string and onAddTodo expects
 *      a string. Passing a number would cause a type error.
 *
 *   2. In the parent (App.tsx) — the function passed to onAddTodo
 *      must match the declared shape. A function with wrong parameter
 *      types or a different number of parameters would be rejected.
 *
 * ============================================================================
 */

import React, { useRef } from 'react';

// The generic parameter now includes onAddTodo — a FUNCTION TYPE.
// It describes a callback that accepts a string and returns nothing.
// This is the typed version of the "pass a function as a prop"
// pattern used throughout the course for child-to-parent communication.
const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    // Call the callback function received from the parent. TypeScript
    // knows that onAddTodo expects exactly one string argument because
    // of our function type definition above. Passing a value of the
    // wrong type (e.g., a number) would be flagged as an error.
    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
