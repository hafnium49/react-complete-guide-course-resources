// =============================================================================
// SECTION 17: FORMS & USER INPUT
// =============================================================================
//
// Welcome to the Forms section! No matter what kind of web application you
// build, and whether you use React or not, you WILL need to deal with user
// input at some point. Forms are fundamental to web development.
//
// =============================================================================
// WHAT IS A FORM?
// =============================================================================
//
// A form is simply a COLLECTION OF INPUT FIELDS that are typically:
//   - Used in conjunction with LABELS (for accessibility and UX)
//   - Wrapped by the built-in HTML <form> element
//
// Forms can be simple (like a login form with email and password) or complex
// (like a signup form with many fields, checkboxes, and validation rules).
//
// Technically, in the code:
//
//   <form>                          ← The form wrapper element
//     <label htmlFor="email">       ← Label connected to input
//     <input id="email" type="email" name="email" />  ← Input field
//     ...more inputs...
//     <button>Submit</button>       ← Submit button
//   </form>
//
// =============================================================================
// THE TWO MAIN THINGS WE DO WITH FORMS
// =============================================================================
//
// Forms are essentially about TWO main tasks:
//
//   1. HANDLE SUBMISSION & EXTRACT VALUES
//      - Get the data the user entered
//      - Process or send that data somewhere
//
//   2. VALIDATE DATA & SHOW ERRORS
//      - Check if the data is correct/complete
//      - Show helpful error messages if not
//
// =============================================================================
// PART 1: EXTRACTING DATA (The Easier Part)
// =============================================================================
//
// Thankfully, handling form submission and extracting entered data is
// RELATIVELY EASY! We have THREE main approaches:
//
//   APPROACH 1: STATE (Two-Way Binding)
//   -----------------------------------
//   Manage input values with useState and update on every keystroke.
//
//     const [email, setEmail] = useState('');
//     <input value={email} onChange={(e) => setEmail(e.target.value)} />
//
//   ✓ Full control over the value at all times
//   ✓ Easy to validate on every keystroke
//   ✗ More code, updates on every keystroke
//
//   APPROACH 2: REFS (Uncontrolled)
//   -------------------------------
//   Use useRef to access the DOM element and read its value when needed.
//
//     const emailRef = useRef();
//     <input ref={emailRef} />
//     // Later: emailRef.current.value
//
//   ✓ Less code, simpler for basic forms
//   ✓ Only read value when you need it (e.g., on submit)
//   ✗ Less control, harder to validate on every keystroke
//
//   APPROACH 3: FORMDATA API (Browser Built-in) - NEW!
//   ---------------------------------------------------
//   Use the browser's built-in FormData object to extract all form values.
//
//     function handleSubmit(event) {
//       const formData = new FormData(event.target);
//       const email = formData.get('email');  // Uses the 'name' attribute!
//     }
//
//   ✓ Very clean and concise
//   ✓ Works with any number of inputs automatically
//   ✓ Native browser feature
//   ✗ Only available on form submission
//
// We'll explore ALL THREE approaches in this section!
//
// =============================================================================
// PART 2: VALIDATION (The Tricky Part!)
// =============================================================================
//
// Extracting data is typically quite straightforward.
// It's the VALIDATION part that can be tricky!
//
// The challenge is: WHEN do you validate?
//
//   OPTION A: VALIDATE ON EVERY KEYSTROKE
//   --------------------------------------
//   Show errors as the user types.
//
//   PROBLEM: Errors may be shown TOO EARLY!
//
//   Example: User starts typing email "t" and immediately sees
//   "Invalid email address!" - That's annoying! They're not done typing!
//
//   OPTION B: VALIDATE ON BLUR (When Field Loses Focus)
//   ---------------------------------------------------
//   Show errors when the user leaves an input field.
//
//   PROBLEM: Errors may show for TOO LONG!
//
//   Example: User types invalid email, tabs away, sees error.
//   Then they go back and fix it, but the error stays until they
//   leave the field AGAIN. This can be confusing.
//
//   OPTION C: VALIDATE ON FORM SUBMISSION
//   -------------------------------------
//   Only check values when the user tries to submit.
//
//   PROBLEM: Errors may be shown TOO LATE!
//
//   Example: User fills out a long form, clicks submit, and THEN
//   sees they made a mistake at the top. They had to wait until
//   the end to find out something was wrong.
//
// THE SOLUTION: COMBINE APPROACHES!
// ---------------------------------
// The best user experience often comes from combining these approaches:
//   - Validate on submit for initial feedback
//   - Validate on blur for individual field feedback
//   - Validate on change AFTER a field has been touched (to clear errors)
//
// We'll explore how to implement all of these and combine them!
//
// =============================================================================
// THE DEMO APPLICATION
// =============================================================================
//
// This demo app has a simple Login form with:
//   - Email input
//   - Password input
//   - Reset button
//   - Login (submit) button
//
// We'll also work with a more complex Signup form later.
//
// We'll use these forms to explore different approaches to:
//   - Reading form values (state, refs, FormData)
//   - Validating inputs (on change, on blur, on submit)
//   - Handling submission
//   - Showing error messages
//
// =============================================================================

import Header from './components/Header.jsx';
import Signup from './components/Signup.jsx';

function App() {
  // ===========================================================================
  // APP STRUCTURE
  // ===========================================================================
  // Now using the Signup component to demonstrate the FormData API.
  //
  // We've explored three approaches to handle forms:
  //   1. STATE (StateLogin.jsx)    - Controlled components with useState
  //   2. REFS (Login.jsx)          - Uncontrolled components with useRef
  //   3. FORMDATA (Signup.jsx)     - Browser-native FormData API ← CURRENT
  //
  // The Signup component demonstrates how FormData makes complex forms
  // with many inputs much easier to manage!
  // ===========================================================================

  return (
    <>
      <Header />
      <main>
        <Signup />
      </main>
    </>
  );
}

export default App;

// =============================================================================
// THREE APPROACHES TO EXTRACT FORM DATA
// =============================================================================
//
// APPROACH 1: STATE (Two-Way Binding / Controlled Components)
// -----------------------------------------------------------
// Manage each input's value with React state.
//
//   const [email, setEmail] = useState('');
//
//   <input
//     value={email}                                  // Controlled by state
//     onChange={(e) => setEmail(e.target.value)}    // Update state on change
//   />
//
// Pros:
//   ✓ Full control over the value at ALL times
//   ✓ Can validate on every keystroke
//   ✓ Can transform input as user types (e.g., format phone number)
//
// Cons:
//   ✗ More code (state + handler for each input)
//   ✗ Component re-renders on every keystroke
//
// =============================================================================
//
// APPROACH 2: REFS (Uncontrolled Components)
// ------------------------------------------
// Let the DOM manage the input state, use refs to read values when needed.
//
//   const emailRef = useRef();
//
//   <input ref={emailRef} />
//
//   // On submit:
//   const email = emailRef.current.value;
//
// Pros:
//   ✓ Less code
//   ✓ Fewer re-renders (DOM manages input state)
//   ✓ Simple for basic forms
//
// Cons:
//   ✗ Less control (can't easily validate on every keystroke)
//   ✗ Need a ref for each input
//
// =============================================================================
//
// APPROACH 3: FORMDATA API (Browser Built-in) - NEW!
// ---------------------------------------------------
// Use the browser's native FormData object to extract all values at once.
//
//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const email = formData.get('email');      // Uses the 'name' attribute!
//     const password = formData.get('password');
//   }
//
// Pros:
//   ✓ Very clean and concise
//   ✓ Works with any number of inputs automatically
//   ✓ No refs or state needed for each input
//   ✓ Native browser feature
//
// Cons:
//   ✗ Only works on form submission
//   ✗ Requires inputs to have 'name' attributes
//
// We'll explore ALL THREE in this section!
//
// =============================================================================

// =============================================================================
// THE VALIDATION TIMING PROBLEM
// =============================================================================
//
// WHEN to validate is the key question. Each timing has trade-offs:
//
// VALIDATE ON EVERY KEYSTROKE:
// ----------------------------
//   User types: "t"
//   Immediate error: "Invalid email address!"
//   User thinks: "But I'm not done typing yet!"
//
//   → Errors shown TOO EARLY = annoying user experience
//
// VALIDATE ON BLUR (Field Loses Focus):
// -------------------------------------
//   User types invalid email, tabs away → Error shows
//   User goes back, starts fixing → Error STAYS
//   User is still typing the fix, but error is there
//
//   → Errors may persist TOO LONG = confusing
//
// VALIDATE ON FORM SUBMISSION:
// ----------------------------
//   User fills out 10 fields, clicks Submit
//   Only THEN sees: "Field 2 is invalid"
//   Has to scroll back up to find and fix it
//
//   → Errors shown TOO LATE = frustrating
//
// THE SOLUTION: COMBINE APPROACHES
// --------------------------------
// Best UX typically comes from combining:
//
//   1. Validate on SUBMIT first (catch all errors)
//   2. After submit, validate on BLUR (individual field feedback)
//   3. After error shown, validate on CHANGE (clear error as user fixes)
//
// This gives immediate feedback without being annoying!
//
// =============================================================================
