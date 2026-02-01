/**
 * ============================================================================
 * NewMeetupForm.js - LESSON 485: ADD NEW MEETUP FORM COMPONENT
 * ============================================================================
 *
 * This component renders a form for creating new meetups.
 * It's pure React using the useRef hook - no NextJS-specific code here!
 *
 * From the instructor:
 * "These are mostly just React components and standard React code.
 * There's nothing NextJS specific about those files... We get components
 * for showing a form."
 *
 * ============================================================================
 * 🎓 COMPONENT PURPOSE
 * ============================================================================
 *
 * NewMeetupForm provides a form for users to add new meetups with:
 * • Title input
 * • Image URL input
 * • Address input
 * • Description textarea
 * • Submit button
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FORM STRUCTURE                                                          │
 * │                                                                          │
 * │  ┌────────────────────────────────────────────────────────────────────┐ │
 * │  │  <Card>                                                             │ │
 * │  │  ┌──────────────────────────────────────────────────────────────┐  │ │
 * │  │  │  Meetup Title:    [________________________]                 │  │ │
 * │  │  │  Meetup Image:    [________________________]                 │  │ │
 * │  │  │  Address:         [________________________]                 │  │ │
 * │  │  │  Description:     [________________________]                 │  │ │
 * │  │  │                   [________________________]                 │  │ │
 * │  │  │                   [________________________]                 │  │ │
 * │  │  │                                                              │  │ │
 * │  │  │                              ┌────────────┐                  │  │ │
 * │  │  │                              │ Add Meetup │                  │  │ │
 * │  │  │                              └────────────┘                  │  │ │
 * │  │  └──────────────────────────────────────────────────────────────┘  │ │
 * │  └────────────────────────────────────────────────────────────────────┘ │
 * │  </Card>                                                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎯 USING useRef FOR FORM INPUT VALUES
 * ============================================================================
 *
 * This form uses the useRef hook (not useState) to access input values.
 * This is called the "uncontrolled component" pattern.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  CONTROLLED vs UNCONTROLLED COMPONENTS                                   │
 * │                                                                          │
 * │  CONTROLLED (useState):                                                  │
 * │  • React manages the input value via state                              │
 * │  • Value updates on every keystroke                                     │
 * │  • More re-renders, but more control                                    │
 * │                                                                          │
 * │  const [title, setTitle] = useState('');                                │
 * │  <input value={title} onChange={(e) => setTitle(e.target.value)} />     │
 * │                                                                          │
 * │  UNCONTROLLED (useRef):                                                  │
 * │  • DOM manages the input value                                          │
 * │  • Value read only when needed (e.g., on submit)                        │
 * │  • Fewer re-renders, simpler for basic forms                            │
 * │                                                                          │
 * │  const inputRef = useRef();                                             │
 * │  <input ref={inputRef} />                                               │
 * │  // Later: inputRef.current.value                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📋 PROPS THIS COMPONENT RECEIVES
 * ============================================================================
 *
 * ┌─────────────┬─────────────────────────────────────────────────────────┐
 * │ Prop        │ Description                                              │
 * ├─────────────┼─────────────────────────────────────────────────────────┤
 * │ onAddMeetup │ Callback function called when form is submitted         │
 * │             │ Receives meetup data object as argument                 │
 * └─────────────┴─────────────────────────────────────────────────────────┘
 *
 * The onAddMeetup callback receives:
 * {
 *   title: string,
 *   image: string,
 *   address: string,
 *   description: string
 * }
 *
 * ============================================================================
 * 📝 HOW THIS WILL BE USED IN NEXTJS
 * ============================================================================
 *
 * In upcoming lessons, you'll use this in a page like:
 *
 * ```javascript
 * // pages/new-meetup.js
 * import NewMeetupForm from '../components/meetups/NewMeetupForm';
 * import Layout from '../components/layout/Layout';
 *
 * function NewMeetupPage() {
 *   async function addMeetupHandler(meetupData) {
 *     // Send meetupData to API route or database
 *     const response = await fetch('/api/new-meetup', {
 *       method: 'POST',
 *       body: JSON.stringify(meetupData),
 *       headers: { 'Content-Type': 'application/json' }
 *     });
 *     // Redirect to home page after successful creation
 *   }
 *
 *   return (
 *     <Layout>
 *       <NewMeetupForm onAddMeetup={addMeetupHandler} />
 *     </Layout>
 *   );
 * }
 *
 * export default NewMeetupPage;
 * ```
 *
 * ============================================================================
 * 🔧 useRef HOOK DEEP DIVE
 * ============================================================================
 *
 * The useRef hook creates a "ref" object with a .current property:
 *
 * const myRef = useRef();
 * // myRef = { current: undefined }
 *
 * When attached to a DOM element via ref attribute:
 * <input ref={myRef} />
 * // myRef.current now points to the actual DOM <input> element
 *
 * Access the input value:
 * myRef.current.value  // Returns whatever is typed in the input
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  KEY POINTS ABOUT useRef                                                 │
 * │                                                                          │
 * │  1. Does NOT cause re-renders when .current changes                     │
 * │  2. Persists across re-renders (unlike regular variables)               │
 * │  3. Provides direct access to DOM elements                              │
 * │  4. Common uses:                                                         │
 * │     • Accessing form input values                                       │
 * │     • Storing previous state values                                     │
 * │     • Accessing child component methods (imperative handle)             │
 * │     • Storing mutable values that don't need to trigger renders         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚛️ REACT CONCEPTS USED
 * ============================================================================
 *
 * 1. useRef HOOK
 *    Creates references to DOM elements for uncontrolled inputs
 *
 * 2. FORM HANDLING
 *    onSubmit event handler with event.preventDefault()
 *
 * 3. CALLBACK PROPS
 *    props.onAddMeetup - parent component provides the handler
 *
 * 4. HTML FORM ELEMENTS
 *    <form>, <input>, <textarea>, <label>, <button>
 *
 * 5. HTML ATTRIBUTES
 *    type="text", type="url", required, rows, id, htmlFor
 *
 * ============================================================================
 * 📂 LOCATION IN PROJECT
 * ============================================================================
 *
 *   /components/
 *   └── /meetups/
 *       ├── MeetupDetail.js
 *       ├── MeetupItem.js
 *       ├── MeetupList.js
 *       ├── NewMeetupForm.js    ← THIS FILE
 *       └── NewMeetupForm.module.css
 *
 * ============================================================================
 */

import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

/**
 * NewMeetupForm Component - Form for Creating New Meetups
 *
 * Renders a form with inputs for meetup details and calls the
 * onAddMeetup callback with the collected data when submitted.
 *
 * @param {Object} props
 * @param {Function} props.onAddMeetup - Callback function that receives meetup data
 *
 * @example
 * function handleAddMeetup(meetupData) {
 *   console.log(meetupData);
 *   // { title: '...', image: '...', address: '...', description: '...' }
 * }
 *
 * <NewMeetupForm onAddMeetup={handleAddMeetup} />
 */
function NewMeetupForm(props) {
  /**
   * CREATE REFS FOR EACH INPUT
   *
   * useRef() creates a ref object: { current: undefined }
   * When attached to an input via ref={...}, current becomes the DOM element.
   *
   * We need a separate ref for each input field to access its value later.
   */
  const titleInputRef = useRef();       // For meetup title
  const imageInputRef = useRef();       // For meetup image URL
  const addressInputRef = useRef();     // For meetup address
  const descriptionInputRef = useRef(); // For meetup description

  /**
   * FORM SUBMIT HANDLER
   *
   * Called when the form is submitted (button click or Enter key).
   *
   * 1. Prevents default browser form submission (page reload)
   * 2. Reads values from all input refs
   * 3. Creates meetup data object
   * 4. Calls parent's onAddMeetup callback with the data
   *
   * @param {Event} event - The form submission event
   */
  function submitHandler(event) {
    // IMPORTANT: Prevent the browser's default form submission
    // Without this, the page would reload and data would be lost!
    event.preventDefault();

    /**
     * READ VALUES FROM REFS
     *
     * Each ref's .current property points to the actual DOM <input> element.
     * The .value property contains whatever the user typed.
     *
     * inputRef.current → <input type="text" ... />
     * inputRef.current.value → "what user typed"
     */
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    /**
     * CREATE MEETUP DATA OBJECT
     *
     * Bundle all the entered data into a single object.
     * This will be sent to the backend or stored in a database.
     */
    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    /**
     * CALL THE PARENT'S CALLBACK
     *
     * The parent component (usually a page) provides the onAddMeetup function.
     * It decides what to do with the data (save to DB, redirect, etc.)
     */
    props.onAddMeetup(meetupData);
  }

  return (
    // Card provides consistent styling (background, shadow, rounded corners)
    <Card>
      {/*
       * FORM ELEMENT
       * - onSubmit triggers when form is submitted
       * - CSS Module class for styling
       */}
      <form className={classes.form} onSubmit={submitHandler}>
        {/*
         * TITLE INPUT
         * - type="text" for plain text input
         * - required attribute prevents empty submission
         * - ref connects this input to titleInputRef
         * - htmlFor in label matches input id for accessibility
         */}
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>

        {/*
         * IMAGE URL INPUT
         * - type="url" provides URL validation
         * - Browser will check if input looks like a valid URL
         */}
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>

        {/*
         * ADDRESS INPUT
         * - Simple text input for the meetup location
         */}
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={addressInputRef} />
        </div>

        {/*
         * DESCRIPTION TEXTAREA
         * - <textarea> instead of <input> for multi-line text
         * - rows="5" sets the visible height (5 lines)
         * - User can type longer text for meetup description
         */}
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>

        {/*
         * SUBMIT BUTTON
         * - Inside a <form>, clicking a <button> triggers form submission
         * - This calls the onSubmit handler (submitHandler)
         */}
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
