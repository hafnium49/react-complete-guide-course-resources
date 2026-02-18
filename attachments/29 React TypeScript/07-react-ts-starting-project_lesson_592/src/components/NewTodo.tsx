/**
 * ============================================================================
 * NewTodo.tsx — LESSONS 596–597
 * ============================================================================
 *
 * A FORM COMPONENT FOR ADDING TODOS — TYPING EVENTS AND REFS
 *
 * LESSON 596 introduced this component with a form and a typed submit
 * handler (React.FormEvent). LESSON 597 adds useRef with TypeScript
 * to extract the user's input from the text field.
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
 * The type must MATCH the event listener. Using the wrong event type
 * (e.g., MouseEvent on onSubmit) produces a TypeScript error.
 *
 * ============================================================================
 * LESSON 597 — useRef WITH TYPESCRIPT
 * ============================================================================
 *
 * THE PROBLEM — useRef NEEDS A GENERIC TYPE:
 *
 * In plain JavaScript, useRef() creates a ref that can be connected
 * to any element — TypeScript has no idea which HTML element it will
 * be attached to. Since different HTML elements have different
 * properties (an input has .value, a button does not), TypeScript
 * requires you to specify the element type upfront.
 *
 * SYNTAX:
 *
 *   const todoTextInputRef = useRef<HTMLInputElement>(null);
 *
 *   - useRef is a GENERIC hook — the angle brackets specify what
 *     type of value the ref will eventually hold
 *   - HTMLInputElement is the built-in DOM type for <input> elements
 *   - null is the REQUIRED initial value because the ref is not yet
 *     connected to any element when it is created
 *
 * BUILT-IN HTML ELEMENT TYPES:
 *
 * Every DOM element has a corresponding TypeScript type. You can
 * find the type name on the MDN documentation page for each element:
 *
 *   <input>      → HTMLInputElement
 *   <button>     → HTMLButtonElement
 *   <p>          → HTMLParagraphElement
 *   <div>        → HTMLDivElement
 *   <textarea>   → HTMLTextAreaElement
 *   <select>     → HTMLSelectElement
 *   (and many more)
 *
 * ACCESSING THE REF VALUE — ? vs !:
 *
 * Because the ref starts as null and may not yet be connected when
 * you try to read it, the "current" property could be null. This
 * leads to two TypeScript operators for handling possibly-null values:
 *
 *   OPTIONAL CHAINING — the "?" operator:
 *
 *     todoTextInputRef.current?.value
 *
 *     "Try to access .value. If current is null, return undefined
 *     instead of crashing." The resulting type is string | undefined.
 *
 *   NON-NULL ASSERTION — the "!" operator:
 *
 *     todoTextInputRef.current!.value
 *
 *     "I guarantee that current is NOT null at this point — go ahead
 *     and access .value directly." The resulting type is just string.
 *
 * IMPORTANT: Use "!" only when you are CERTAIN the ref is connected.
 * In a submit handler, the form can only be submitted after React
 * has rendered the input and connected the ref — so "!" is safe here.
 *
 * These operators (? and !) are NOT specific to refs or React — they
 * are general TypeScript operators for any value that could be null.
 *
 * COMMUNICATION BACK TO THE PARENT:
 *
 * Once the entered text is extracted and validated, it needs to be
 * passed back to the App component (which manages the list of todos).
 * That parent-to-child communication pattern will be wired up in
 * the next lesson.
 *
 * ============================================================================
 */

import React, { useRef } from 'react';

const NewTodo: React.FC = () => {
  // Create a ref that will be connected to the text <input> element.
  // The generic parameter <HTMLInputElement> tells TypeScript what
  // type of DOM element this ref will hold — enabling auto-completion
  // for input-specific properties like .value, .checked, .focus(), etc.
  //
  // The initial value MUST be null because the ref has no connection
  // yet — React will assign the actual DOM element to .current after
  // the component renders and the ref={...} attribute is processed.
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // Access the input's current value through the ref. The "!"
    // after .current is the non-null assertion operator — it tells
    // TypeScript that .current is definitely not null at this point.
    // This is safe because the submit handler can only fire after
    // the form (and its input) have been rendered and the ref has
    // been connected.
    //
    // Without "!", TypeScript would infer enteredText as
    // string | undefined. With "!", it knows it is just string.
    const enteredText = todoTextInputRef.current!.value;

    // Basic validation: if the trimmed input is empty (nothing but
    // whitespace), exit early without adding a todo. This is standard
    // input validation — unrelated to TypeScript.
    if (enteredText.trim().length === 0) {
      return;
    }

    // TODO: Pass the entered text back to the App component to add
    // it to the list of todos. This will be wired up in the next
    // lesson using a callback prop.
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="text">Todo text</label>
      {/* Connect the ref to the input element. TypeScript verifies
          that the ref type (HTMLInputElement) matches the element
          type (<input>). Connecting a ref typed as HTMLInputElement
          to a <button> element would cause a type error. */}
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
