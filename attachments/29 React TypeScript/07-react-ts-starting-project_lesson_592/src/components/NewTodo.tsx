/**
 * ============================================================================
 * NewTodo.tsx — LESSON 596
 * ============================================================================
 *
 * A FORM COMPONENT FOR ADDING TODOS — TYPING EVENT OBJECTS
 *
 * This component renders a form where the user can type in a new todo
 * and submit it. It introduces an important TypeScript concept for
 * React: TYPING EVENT HANDLER PARAMETERS.
 *
 * THE PROBLEM — EVENT OBJECTS HAVE NO IMPLICIT TYPE:
 *
 * When you write a function that will handle a form submission event
 * and include an "event" parameter, TypeScript does not automatically
 * know what type that parameter is. Unlike props (which React.FC can
 * describe), event handler parameters must be typed MANUALLY — you
 * must tell TypeScript what kind of event object the function will
 * receive.
 *
 * Without a type annotation, TypeScript reports:
 *
 *   "Parameter 'event' implicitly has an 'any' type."
 *
 * And you get no auto-completion for methods like event.preventDefault().
 *
 * REACT EVENT TYPES:
 *
 * React provides its own set of event types (wrappers around native
 * DOM events) that match the specific event listener being used:
 *
 *   - React.FormEvent   — for onSubmit handlers on <form> elements
 *   - React.MouseEvent  — for onClick handlers on buttons, divs, etc.
 *   - React.ChangeEvent — for onChange handlers on inputs, selects, etc.
 *   - React.KeyboardEvent — for onKeyDown, onKeyUp handlers
 *   (and many more)
 *
 * The type must MATCH the event listener where the function is used.
 * If you type the parameter as React.MouseEvent but connect the
 * function to onSubmit (which expects React.FormEvent), TypeScript
 * reports a type mismatch — another safety check that prevents bugs.
 *
 * FORM SUBMISSION PATTERN:
 *
 * The standard React pattern for handling form submission is:
 *
 *   1. Define a handler function that receives the event object
 *   2. Call event.preventDefault() to stop the browser's default
 *      page reload behavior
 *   3. Extract the user input (via refs or state)
 *   4. Connect the handler to the form's onSubmit prop
 *
 * This pattern is identical to non-TypeScript React — the only
 * addition is the type annotation on the event parameter.
 *
 * GETTING USER INPUT — useRef (coming in the next lesson):
 *
 * This lesson sets up the form and the submit handler. The actual
 * extraction of user input using useRef with TypeScript will be
 * covered in the next lesson. For now, the handler only calls
 * preventDefault() to demonstrate the event typing pattern.
 *
 * ============================================================================
 */

import React from 'react';

const NewTodo: React.FC = () => {
  // The event parameter is typed as React.FormEvent because this
  // function will be connected to a <form>'s onSubmit prop. This
  // type gives us access to methods like preventDefault() with full
  // auto-completion. Using a different event type (e.g., MouseEvent)
  // would cause a TypeScript error when connecting to onSubmit.
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // TODO: Extract user input and create a new todo.
    // This will be implemented in the next lesson using useRef.
  };

  return (
    // Connect the submitHandler to the form's onSubmit prop. React
    // will call this function with a FormEvent object when the user
    // submits the form (by clicking the button or pressing Enter).
    <form onSubmit={submitHandler}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
