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
import StateLogin from './components/StateLogin.jsx';

function App() {
  // ===========================================================================
  // APP STRUCTURE - LESSONS 265-267: REUSABLE COMPONENTS & CUSTOM HOOKS
  // ===========================================================================
  //
  // Now using the StateLogin component to demonstrate REUSABLE COMPONENTS,
  // REUSABLE VALIDATION FUNCTIONS, and CUSTOM HOOKS.
  //
  // VALIDATION APPROACHES WE'VE EXPLORED SO FAR:
  // ---------------------------------------------
  //   1. KEYSTROKE (StateLogin.jsx) - Validate as user types (Lesson 260)
  //      - Custom JavaScript validation
  //      - Runs on every keystroke (onChange)
  //      - Shows errors immediately
  //
  //   2. BLUR (StateLogin.jsx) - Validate when field loses focus (Lesson 261)
  //      - Custom JavaScript validation
  //      - Runs when user leaves field (onBlur)
  //      - Better UX timing
  //
  //   3. SUBMIT (Login.jsx) - Validate when form is submitted (Lesson 262)
  //      - Custom JavaScript validation
  //      - Runs when user clicks submit (onSubmit)
  //      - Natural fit for refs/FormData
  //
  //   4. BUILT-IN VALIDATION (Signup.jsx) - Browser handles validation (Lesson 263)
  //      - NO custom JavaScript needed!
  //      - Browser validates automatically
  //      - Uses HTML attributes like 'required', 'minLength', etc.
  //
  //   5. REUSABLE COMPONENTS (StateLogin.jsx) - Reduce code duplication (Lesson 265)
  //      - Extract common JSX into reusable components
  //      - Input.jsx wraps label + input + error message
  //      - Clean, maintainable, scalable code
  //
  //   6. REUSABLE VALIDATION FUNCTIONS (StateLogin.jsx) - Reduce logic duplication (Lesson 266)
  //      - Extract validation logic into utility functions
  //      - util/validation.js exports isEmail(), hasMinLength(), etc.
  //      - Write once, use everywhere
  //
  //   7. CUSTOM HOOKS (StateLogin.jsx) - Extract state management logic ← NEW! (Lesson 267)
  //      - Extract ALL state management into a reusable custom hook
  //      - hooks/useInput.js manages value, didEdit, handlers, and validation
  //      - Call useInput() once per input field
  //      - Component code reduced by 90%!
  //
  // ===========================================================================
  // WHAT IS A CUSTOM HOOK? (LESSON 267)
  // ===========================================================================
  //
  // A custom hook is a JAVASCRIPT FUNCTION that:
  //   - Starts with "use" (useInput, useForm, useAuth, etc.)
  //   - Can call other React hooks (useState, useEffect, etc.)
  //   - Extracts reusable logic from components
  //   - Returns values and functions for the component to use
  //
  // WHY CREATE A CUSTOM HOOK?
  // -------------------------
  // BEFORE (Lessons 260-266):
  //   Every form component had to repeat:
  //     - const [enteredValues, setEnteredValues] = useState({ ... });
  //     - const [didEdit, setDidEdit] = useState({ ... });
  //     - function handleInputChange(identifier, value) { ... }
  //     - function handleInputBlur(identifier) { ... }
  //     - const emailIsInvalid = didEdit.email && !validationFn(email);
  //
  //   This is ~200 lines of code that we had to copy to every form!
  //
  // AFTER (Lesson 267):
  //   We extracted all of this into the useInput hook:
  //     const { value, handleInputChange, handleInputBlur, hasError } = useInput('', validationFn);
  //
  //   This is ~1 line of code! 90% reduction!
  //
  // THE useInput HOOK:
  // ------------------
  // Location: hooks/useInput.js
  //
  // What it does:
  //   - Manages value state for ONE input
  //   - Manages didEdit state for ONE input
  //   - Provides handleInputChange function
  //   - Provides handleInputBlur function
  //   - Computes hasError based on validation
  //
  // How to use it:
  //   1. Call useInput() once per input field
  //   2. Pass defaultValue (initial value)
  //   3. Pass validationFn (function that validates the value)
  //   4. Destructure the returned values
  //   5. Use them in your JSX!
  //
  // Example:
  //   const {
  //     value: emailValue,
  //     handleInputChange: handleEmailChange,
  //     handleInputBlur: handleEmailBlur,
  //     hasError: emailHasError
  //   } = useInput('', (value) => isEmail(value) && isNotEmpty(value));
  //
  //   <Input
  //     value={emailValue}
  //     onChange={handleEmailChange}
  //     onBlur={handleEmailBlur}
  //     error={emailHasError && "Please enter a valid email."}
  //   />
  //
  // BENEFITS OF CUSTOM HOOKS:
  // --------------------------
  //   ✓ Code Reusability - Write once, use in ANY form component
  //   ✓ Less Code - 90% reduction in component code
  //   ✓ Easier Testing - Test hook independently
  //   ✓ Easier Maintenance - Fix bugs in one place
  //   ✓ Better Organization - Logic separated from UI
  //   ✓ Composability - Combine multiple hooks
  //
  // KEY INSIGHT:
  // ------------
  // Custom hooks are to LOGIC what components are to UI!
  //   - Components extract reusable UI (JSX)
  //   - Hooks extract reusable logic (state, effects, etc.)
  //
  // Together they make React code:
  //   - DRY (Don't Repeat Yourself)
  //   - Clean (easy to read)
  //   - Maintainable (easy to change)
  //   - Scalable (easy to grow)
  //
  // ===========================================================================
  // WHAT IS BUILT-IN BROWSER VALIDATION?
  // ===========================================================================
  //
  // Browsers have BUILT-IN validation features that you can enable by adding
  // special HTML attributes to your form inputs.
  //
  // Examples:
  //   <input type="email" required />
  //   <input type="password" required minLength={6} />
  //   <input type="text" required maxLength={50} />
  //
  // When you add these attributes:
  //   - The BROWSER validates the input (not React, not JavaScript!)
  //   - The BROWSER shows error messages (not you!)
  //   - The BROWSER prevents form submission if validation fails
  //
  // This is the EASIEST way to add validation because you don't write ANY code!
  //
  // ===========================================================================
  // BROWSER VALIDATION vs CUSTOM JAVASCRIPT VALIDATION
  // ===========================================================================
  //
  // CUSTOM JAVASCRIPT VALIDATION (What we did in Lessons 260-262):
  // ---------------------------------------------------------------
  //   - YOU write the validation logic
  //   - YOU write the error messages
  //   - YOU show/hide errors
  //   - YOU prevent form submission
  //   - Full control, but more work
  //
  //   Example:
  //     const emailIsInvalid = didEdit.email && !email.includes('@');
  //     {emailIsInvalid && <p>Please enter a valid email</p>}
  //
  // BROWSER VALIDATION (What we'll do in Lesson 263):
  // --------------------------------------------------
  //   - BROWSER writes the validation logic (built-in!)
  //   - BROWSER writes the error messages (automatic!)
  //   - BROWSER shows/hides errors (no state needed!)
  //   - BROWSER prevents form submission (automatic!)
  //   - Less control, but MUCH less work!
  //
  //   Example:
  //     <input type="email" required />
  //     // That's it! Browser does everything!
  //
  // ===========================================================================
  // WHY USE BUILT-IN BROWSER VALIDATION?
  // ===========================================================================
  //
  // PROS:
  // -----
  //   ✓ ZERO code required - just add HTML attributes
  //   ✓ Automatic validation - browser handles everything
  //   ✓ Automatic error messages - browser provides them
  //   ✓ Works without JavaScript - accessible fallback
  //   ✓ Consistent UX - users familiar with browser errors
  //   ✓ Less code to maintain - no custom validation logic
  //   ✓ Better accessibility - screen readers understand it
  //
  // CONS:
  // -----
  //   ✗ Less control - can't customize error messages easily
  //   ✗ Styling limitations - error styling varies by browser
  //   ✗ Limited validation rules - only basic checks
  //   ✗ Can't do complex validation (e.g., "passwords must match")
  //   ✗ Error messages vary by browser language
  //
  // ===========================================================================
  // WHEN TO USE BUILT-IN VALIDATION?
  // ===========================================================================
  //
  // USE BUILT-IN VALIDATION WHEN:
  // ------------------------------
  //   ✓ You have simple validation requirements
  //   ✓ You want minimal code
  //   ✓ Browser error messages are acceptable
  //   ✓ You're building a quick prototype
  //   ✓ Accessibility is important (it just works!)
  //
  // USE CUSTOM VALIDATION WHEN:
  // ---------------------------
  //   ✗ You need custom error messages
  //   ✗ You need complex validation logic
  //   ✗ You want consistent cross-browser styling
  //   ✗ You need to validate against backend data
  //   ✗ You want instant feedback while typing
  //
  // BEST APPROACH: COMBINE BOTH!
  // -----------------------------
  //   1. Add built-in validation for basic checks (required, minLength, etc.)
  //   2. Add custom JavaScript validation for complex rules
  //   3. This gives you BOTH easy setup AND full control!
  //
  // ===========================================================================
  // IMPORTANT: ALWAYS VALIDATE ON SERVER TOO!
  // ===========================================================================
  //
  // Whether you use built-in validation OR custom JavaScript validation,
  // you MUST ALWAYS validate on the server as well!
  //
  // Why?
  // ----
  //   - Users can disable JavaScript
  //   - Users can bypass client-side validation
  //   - Malicious users can send HTTP requests directly
  //
  // Client-side validation = UX (User Experience)
  // Server-side validation = SECURITY
  //
  // NEVER trust client-side validation alone!
  //
  // ===========================================================================

  return (
    <>
      <Header />
      <main>
        <StateLogin />
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
