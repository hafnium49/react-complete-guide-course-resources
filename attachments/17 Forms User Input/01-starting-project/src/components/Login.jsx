// =============================================================================
// LOGIN COMPONENT - Managing Form Values with REFS (Uncontrolled Components)
// =============================================================================
//
// LESSON 262: VALIDATING INPUT ON FORM SUBMISSION
// ===============================================
//
// In this lesson, we're implementing APPROACH 2: REFS (Uncontrolled Components)
// AND adding SUBMIT VALIDATION.
//
// This is an ALTERNATIVE to the STATE approach (see StateLogin.jsx).
//
// This means:
//   - The DOM manages the input values (not React state)
//   - We DON'T update state on every keystroke
//   - We DON'T use value/onChange props
//   - We use useRef to READ values when needed (e.g., on submit)
//   - We validate ONLY on form submission (not on keystroke or blur)
//
// PROS vs STATE:
//   ✓ Less code - no onChange handlers needed
//   ✓ Fewer re-renders - component doesn't re-render on every keystroke
//   ✓ Simpler for basic forms
//
// CONS vs STATE:
//   ✗ Can't validate on every keystroke easily
//   ✗ Can't transform input as user types
//   ✗ Resetting values requires DOM manipulation (not recommended)
//   ✗ Still need one ref per input (like one state per input)
//
// WHY SUBMIT VALIDATION WITH REFS?
// ---------------------------------
// With refs (uncontrolled components), we CAN'T easily validate on every
// keystroke because we don't have onChange handlers tracking the input.
//
// We COULD add onChange handlers just for validation, but then we might as
// well use the STATE approach instead!
//
// So with refs, the NATURAL validation point is ON SUBMIT.
//
// This means:
//   - User fills out the form
//   - User clicks "Login" (submit button)
//   - We read the ref values in handleSubmit
//   - We validate those values
//   - If invalid, show error and prevent submission
//   - If valid, process the data
//
// =============================================================================

import { useRef, useState } from 'react';

export default function Login() {
  // ===========================================================================
  // CREATING REFS FOR EACH INPUT
  // ===========================================================================
  //
  // useRef() creates a "ref" object that can hold a reference to a DOM element.
  //
  // A ref object looks like this:
  //   {
  //     current: <the referenced value>
  //   }
  //
  // Initially, current is undefined (no connection established yet).
  //
  // Once we connect the ref to an input using the ref prop,
  // current will hold the actual DOM element (the <input> HTML element).
  //
  // IMPORTANT: Refs are NOT reactive!
  // - Changing a ref does NOT trigger a re-render
  // - This is WHY they're good for form inputs (no re-renders on keystroke)
  //
  // ===========================================================================

  const email = useRef();
  // After connection, email.current will be: <input id="email" ... />

  const password = useRef();
  // After connection, password.current will be: <input id="password" ... />

  // NOTE: We need one ref for EACH input we want to read.
  // For a form with 10 inputs, we'd need 10 useRef() calls.
  // This is similar to needing separate useState for each input.

  // ===========================================================================
  // STATE FOR VALIDATION ERRORS (NEW IN LESSON 262!)
  // ===========================================================================
  //
  // Even though we're using REFS for the input values, we still need STATE
  // to track validation errors!
  //
  // WHY?
  // ----
  // Because we need to SHOW/HIDE error messages based on validation.
  // When an error message appears/disappears, the UI must update.
  // UI updates in React = state changes!
  //
  // We CAN'T use refs for this because:
  //   - Refs don't trigger re-renders
  //   - We need a re-render to show/hide the error message
  //
  // So our approach is a HYBRID:
  //   - REFS for input values (no re-render on keystroke)
  //   - STATE for validation errors (re-render when error shows/hides)
  //
  // This gives us the best of both worlds!
  //
  // ===========================================================================

  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  // Initially false = no error shown
  // Will be set to true if user submits an invalid email

  // ===========================================================================
  // FORM SUBMISSION HANDLER (WITH VALIDATION!)
  // ===========================================================================
  function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload
    
    // -------------------------------------------------------------------------
    // ACCESSING REF VALUES
    // -------------------------------------------------------------------------
    // To get the value the user typed, we:
    //   1. Access the ref: email
    //   2. Access the DOM element: email.current
    //   3. Access the value property: email.current.value
    //
    // WHY email.current?
    // ------------------
    // The ref object has a 'current' property that holds the actual value.
    // This is standard for all refs created with useRef().
    //
    // WHY .value?
    // -----------
    // email.current is the actual <input> DOM element.
    // DOM input elements have a 'value' property that holds the current text.
    //
    // This is native browser JavaScript, not React-specific:
    //   const inputElement = document.getElementById('email');
    //   console.log(inputElement.value);  // Same concept!
    //
    // -------------------------------------------------------------------------

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    // -------------------------------------------------------------------------
    // VALIDATION LOGIC (NEW IN LESSON 262!)
    // -------------------------------------------------------------------------
    //
    // Now, BEFORE we process the form data, we VALIDATE it.
    //
    // This is SUBMIT VALIDATION:
    //   - Only runs when user clicks submit
    //   - Reads the current values from refs
    //   - Checks if they're valid
    //   - If invalid, show error and STOP
    //   - If valid, proceed with submission
    //
    // VALIDATION RULE:
    // ----------------
    // Email must contain an '@' symbol.
    //
    // This is a simple check! In a real app, you'd use more sophisticated
    // validation (regex pattern, checking for domain, etc.).
    //
    // -------------------------------------------------------------------------

    const emailIsValid = enteredEmail.includes('@');
    // Returns true if email contains '@', false otherwise
    //
    // Examples:
    //   'test@example.com' → true
    //   'test' → false
    //   '@' → true (basic check, doesn't verify format!)

    // -------------------------------------------------------------------------
    // HANDLING INVALID EMAIL
    // -------------------------------------------------------------------------
    if (!emailIsValid) {
      // Email is INVALID!
      // We need to:
      //   1. Show an error message to the user
      //   2. STOP the submission process (don't send data)

      setEmailIsInvalid(true);
      // Setting state to true will:
      //   - Trigger a re-render
      //   - In the JSX below, emailIsInvalid will be true
      //   - The error message will be displayed

      return;
      // STOP HERE! Don't execute the rest of the function.
      // This prevents us from logging "Submitted!" or sending data to a server.
      //
      // The form submission is BLOCKED until the user fixes the email.
    }

    // -------------------------------------------------------------------------
    // HANDLING VALID EMAIL
    // -------------------------------------------------------------------------
    //
    // If we reach this point, the email is VALID!
    // (If it was invalid, we would have returned early above.)
    //
    // Now we should:
    //   1. Clear any existing error message
    //   2. Process the form data
    //
    // -------------------------------------------------------------------------

    setEmailIsInvalid(false);
    // Clear the error message (if it was showing)
    //
    // WHY do this?
    // ------------
    // Imagine:
    //   1. User enters invalid email, clicks submit
    //   2. Error shows: "Please enter a valid email"
    //   3. User fixes the email, clicks submit again
    //   4. We need to HIDE the error message now!
    //
    // By setting emailIsInvalid to false, we ensure the error is cleared.

    // Now we have valid values! We can use them:
    console.log('Submitted!');
    console.log('Entered email:', enteredEmail);
    console.log('Entered password:', enteredPassword);

    // In a real app, here we would:
    // - Send the data to a backend API
    // - Show a loading state
    // - Handle success/error responses
    // - Redirect to a dashboard or show success message

    // -------------------------------------------------------------------------
    // RESETTING INPUT VALUES (Not Recommended!)
    // -------------------------------------------------------------------------
    //
    // You CAN reset the inputs like this:
    //   email.current.value = '';
    //   password.current.value = '';
    //
    // But this is DISCOURAGED!
    //
    // WHY?
    // ----
    // - You're manipulating the DOM directly
    // - React philosophy: React should control the UI
    // - Can lead to bugs if you're not careful
    //
    // This is acceptable in simple cases, but use with caution.
    // With the STATE approach, resetting is cleaner:
    //   setEnteredValues({ email: '', password: '' });
    //
    // -------------------------------------------------------------------------
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>

          {/* ===================================================================
              UNCONTROLLED INPUT: Email
              ===================================================================

              This is an UNCONTROLLED COMPONENT because:
                1. NO value prop - React doesn't control the displayed value
                2. NO onChange prop - React doesn't track changes
                3. Has ref prop - We can READ the value when needed

              THE BROWSER MANAGES THE VALUE:
              ------------------------------
              When the user types, the browser updates the input's value.
              React doesn't know or care about these changes.

              We only READ the value when we need it (on submit).

              =================================================================== */}
          <input
            id="email"
            type="email"
            name="email"
            // -----------------------------------------------------------------
            // THE REF PROP - Establishing the Connection
            // -----------------------------------------------------------------
            // By setting ref={email}, we're telling React:
            //   "When you render this input, store a reference to it in
            //    the email ref object's 'current' property"
            //
            // BEFORE connection:  email.current = undefined
            // AFTER connection:   email.current = <input> DOM element
            //
            // This happens automatically when React renders the component!
            //
            // THE REF PROP WORKS ON ALL HTML ELEMENTS:
            // ----------------------------------------
            // You can use ref on any HTML element:
            //   <div ref={myDivRef}></div>
            //   <button ref={myButtonRef}>Click</button>
            //   <img ref={myImageRef} />
            //
            // This gives you direct access to the DOM element.
            //
            // -----------------------------------------------------------------
            ref={email}
          />
          {/*
            WHAT HAPPENS AS USER TYPES?
            ----------------------------
            1. User types 't' in the email input
            2. Browser updates the input's value to 't'
            3. React DOESN'T re-render (no state changed!)
            4. email.current.value is now 't'
            5. We can read it anytime: email.current.value

            NO re-renders on each keystroke!
            The value is stored in the DOM, not in React state.
          */}

          {/* ===================================================================
              ERROR MESSAGE DISPLAY (NEW IN LESSON 262!)
              ===================================================================

              CONDITIONAL RENDERING:
              ----------------------
              We use the && operator to conditionally show the error message.

              How it works:
                emailIsInvalid && <p>...</p>

              When emailIsInvalid is false:
                false && <p>...</p> → false (nothing renders)

              When emailIsInvalid is true:
                true && <p>...</p> → <p>...</p> (error message renders)

              THE FLOW:
              ---------
              1. Initially, emailIsInvalid = false
                 → No error message shown

              2. User enters "test" (no @) and clicks submit
                 → handleSubmit runs
                 → emailIsValid = false
                 → setEmailIsInvalid(true)
                 → Component re-renders
                 → emailIsInvalid is now true
                 → Error message appears!

              3. User fixes email to "test@example.com" and clicks submit
                 → handleSubmit runs
                 → emailIsValid = true
                 → setEmailIsInvalid(false)
                 → Component re-renders
                 → emailIsInvalid is now false
                 → Error message disappears!

              CSS STYLING:
              ------------
              The 'control-error' class is defined in the project's CSS.
              It typically shows the error in red with appropriate spacing.

              =================================================================== */}
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>

          {/* ===================================================================
              UNCONTROLLED INPUT: Password
              ===================================================================

              Same pattern as email:
                - No value prop
                - No onChange prop
                - Has ref prop to read the value later

              COMPARISON WITH STATE APPROACH:
              --------------------------------
              State approach (StateLogin.jsx):
                - value={enteredValues.password}
                - onChange={(e) => handleInputChange('password', e.target.value)}
                - Re-renders on every keystroke

              Refs approach (this file):
                - ref={password}
                - No re-renders while typing
                - Read value on submit: password.current.value

              =================================================================== */}
          <input
            id="password"
            type="password"
            name="password"
            ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button type="button" className="button button-flat">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

// =============================================================================
// CONTROLLED vs UNCONTROLLED COMPONENTS - DETAILED COMPARISON
// =============================================================================
//
// CONTROLLED COMPONENTS (StateLogin.jsx - Using useState):
// --------------------------------------------------------
// Code:
//   const [email, setEmail] = useState('');
//   <input
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//   />
//
// How it works:
//   1. User types 't'
//   2. onChange fires
//   3. setEmail('t') updates state
//   4. Component re-renders
//   5. Input shows 't' from value={email}
//
// Pros:
//   ✓ Full control over the value at all times
//   ✓ Can validate on every keystroke
//   ✓ Can transform input as user types (e.g., format phone number)
//   ✓ Can enable/disable submit based on validity
//   ✓ Easy to reset: setEmail('')
//
// Cons:
//   ✗ More code (useState + onChange handler)
//   ✗ Re-renders on every keystroke
//   ✗ Need state for each input
//
// =============================================================================
//
// UNCONTROLLED COMPONENTS (This file - Using useRef):
// ----------------------------------------------------
// Code:
//   const emailRef = useRef();
//   <input ref={emailRef} />
//   // On submit: emailRef.current.value
//
// How it works:
//   1. User types 't'
//   2. Browser updates input value to 't'
//   3. NO React involvement!
//   4. NO re-render
//   5. We can read emailRef.current.value anytime
//
// Pros:
//   ✓ Less code (no onChange, no state)
//   ✓ NO re-renders on keystroke (better performance)
//   ✓ Simpler for basic forms
//   ✓ Good for file inputs (can't be controlled anyway)
//
// Cons:
//   ✗ Can't validate on every keystroke easily
//   ✗ Can't transform input as user types
//   ✗ Harder to reset (requires DOM manipulation)
//   ✗ Still need one ref per input
//   ✗ Can't conditionally enable/disable submit based on input
//
// =============================================================================

// =============================================================================
// WHEN TO USE WHICH APPROACH?
// =============================================================================
//
// USE CONTROLLED (STATE) WHEN:
// ---------------------------
//   ✓ You need instant validation as user types
//     Example: "Password must be 8+ characters" shown while typing
//
//   ✓ You need to format input as user types
//     Example: Phone number (555) 123-4567 formatted automatically
//
//   ✓ You need to enable/disable submit based on form validity
//     Example: Submit button disabled until all fields valid
//
//   ✓ You need to enforce input rules
//     Example: Only allow numbers in a "quantity" field
//
//   ✓ You want to show character count
//     Example: "140/280 characters" for a tweet
//
// USE UNCONTROLLED (REFS) WHEN:
// -----------------------------
//   ✓ Simple forms where you only need values on submit
//     Example: Basic login form (check values when submitted)
//
//   ✓ File uploads (file inputs can't be controlled)
//     Example: <input type="file" ref={fileRef} />
//
//   ✓ Integrating with non-React code
//     Example: Using a third-party library that needs DOM access
//
//   ✓ Performance is critical and form is very complex
//     Example: 100-field form where re-renders are slow
//
//   ✓ You don't need instant feedback
//     Example: Simple contact form
//
// =============================================================================

// =============================================================================
// THE REF OBJECT STRUCTURE
// =============================================================================
//
// When you call useRef(), you get back a ref object:
//
//   const myRef = useRef();
//
// The object looks like this:
//
//   {
//     current: undefined  // Initially
//   }
//
// After connecting to a DOM element with ref={myRef}:
//
//   {
//     current: <input id="email" type="email" ... >  // The actual DOM element
//   }
//
// You always access the value through the 'current' property:
//
//   myRef.current            // The DOM element
//   myRef.current.value      // The input's value
//   myRef.current.focus()    // Call methods on the element
//   myRef.current.disabled = true  // Modify properties
//
// WHY .current?
// -------------
// React uses 'current' as a convention. This allows React to:
//   - Update the reference without triggering re-renders
//   - Maintain the same object identity across renders
//   - Distinguish refs from other objects
//
// =============================================================================

// =============================================================================
// REFS ARE NOT REACTIVE
// =============================================================================
//
// IMPORTANT: Changing a ref does NOT trigger a re-render!
//
// Example:
//
//   const countRef = useRef(0);
//
//   function handleClick() {
//     countRef.current = countRef.current + 1;  // NO RE-RENDER!
//     console.log(countRef.current);  // Shows updated value
//   }
//
// The value updates, but the component doesn't re-render.
// The UI won't reflect the new value!
//
// This is DIFFERENT from state:
//
//   const [count, setCount] = useState(0);
//
//   function handleClick() {
//     setCount(count + 1);  // RE-RENDERS!
//   }
//
// USE REFS FOR:
//   - Values that DON'T need to trigger re-renders
//   - DOM element references
//   - Storing previous values
//   - Timers (setTimeout/setInterval IDs)
//
// USE STATE FOR:
//   - Values that SHOULD trigger re-renders
//   - Data that affects what's displayed
//   - User input that needs validation
//
// =============================================================================

// =============================================================================
// ACCESSING DOM ELEMENTS WITH REFS
// =============================================================================
//
// Refs give you direct access to DOM elements.
// You can do anything the native DOM API allows:
//
// READ PROPERTIES:
//   email.current.value          // Get the input's value
//   email.current.checked        // For checkboxes
//   email.current.files          // For file inputs
//
// CALL METHODS:
//   email.current.focus()        // Focus the input
//   email.current.blur()         // Remove focus
//   email.current.select()       // Select the text
//   email.current.click()        // Programmatically click
//
// MODIFY PROPERTIES (Use with caution!):
//   email.current.value = ''     // Clear the input
//   email.current.disabled = true // Disable the input
//   email.current.className = 'error'  // Add a class
//
// WHY USE WITH CAUTION?
// ---------------------
// React's philosophy is that React should control the UI.
// When you manipulate the DOM directly, you're bypassing React.
//
// This can lead to:
//   - React's virtual DOM being out of sync with actual DOM
//   - Unexpected behavior when component re-renders
//   - Harder to debug
//
// WHEN IT'S OK:
//   - Reading values (always safe)
//   - Calling methods like focus() (usually safe)
//   - Working with third-party libraries that need DOM access
//
// WHEN TO AVOID:
//   - Changing content that React manages
//   - Adding/removing classes that React controls
//   - Modifying attributes React sets
//
// =============================================================================

// =============================================================================
// SCALING THE REFS APPROACH
// =============================================================================
//
// PROBLEM: One ref per input
// --------------------------
// Just like with state, you need one ref for each input:
//
//   const email = useRef();
//   const password = useRef();
//   const firstName = useRef();
//   const lastName = useRef();
//   const phone = useRef();
//   // ... for 10 inputs, that's 10 useRef() calls!
//
// ALTERNATIVE SOLUTION: FormData API
// ----------------------------------
// In the next lesson, we'll learn about the FormData API,
// which extracts ALL form values automatically:
//
//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const email = formData.get('email');  // Uses 'name' attribute
//     const password = formData.get('password');
//   }
//
// No refs needed! No state needed! Very clean for large forms.
//
// =============================================================================

// =============================================================================
// REFS IN REACT: OTHER USE CASES
// =============================================================================
//
// Besides form inputs, refs are useful for:
//
// 1. FOCUSING ELEMENTS:
//    const inputRef = useRef();
//    useEffect(() => {
//      inputRef.current.focus();  // Auto-focus on mount
//    }, []);
//
// 2. MEASURING ELEMENTS:
//    const divRef = useRef();
//    const width = divRef.current.offsetWidth;
//    const height = divRef.current.offsetHeight;
//
// 3. SCROLLING TO ELEMENTS:
//    const sectionRef = useRef();
//    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
//
// 4. INTEGRATING THIRD-PARTY LIBRARIES:
//    const chartRef = useRef();
//    useEffect(() => {
//      const chart = new Chart(chartRef.current, config);
//    }, []);
//
// 5. STORING PREVIOUS VALUES:
//    const prevCountRef = useRef();
//    useEffect(() => {
//      prevCountRef.current = count;
//    });
//
// 6. STORING TIMER IDs:
//    const timerRef = useRef();
//    timerRef.current = setTimeout(() => { ... }, 1000);
//    // Later: clearTimeout(timerRef.current);
//
// =============================================================================

// =============================================================================
// LESSON 262: SUBMIT VALIDATION - DETAILED EXPLANATION
// =============================================================================
//
// WHAT IS SUBMIT VALIDATION?
// ---------------------------
// Submit validation means checking if form data is valid ONLY when the user
// tries to submit the form (by clicking the submit button).
//
// The validation logic runs in the form's onSubmit handler, BEFORE we process
// or send the data.
//
// If validation fails:
//   - Show error message
//   - Prevent form submission
//   - User must fix the error and try again
//
// If validation succeeds:
//   - Clear any error messages
//   - Process the data (send to API, etc.)
//
// =============================================================================
// WHY USE SUBMIT VALIDATION?
// =============================================================================
//
// REASON 1: Natural fit for refs/uncontrolled components
// -------------------------------------------------------
// When using refs, we don't have onChange handlers tracking every keystroke.
// We only read the values when needed - typically on submit.
//
// So it makes sense to validate at that same moment!
//
// We COULD add onChange handlers just for validation, but then we're getting
// closer to the STATE approach anyway. With refs, submit validation is simpler.
//
// REASON 2: Less code for simple forms
// -------------------------------------
// You don't need to:
//   - Track which fields have been touched (no didEdit state)
//   - Handle onBlur events
//   - Handle onChange events for validation
//
// Just one validation check in handleSubmit!
//
// REASON 3: Always necessary as a safety net
// -------------------------------------------
// Even if you have keystroke or blur validation, you should STILL validate
// on submit!
//
// Why? Because users can bypass earlier validation by:
//   - Directly clicking submit without touching any fields
//   - Using browser autofill (which may not trigger onChange)
//   - Pasting data and immediately clicking submit
//   - Disabling JavaScript and bypassing client-side validation
//
// Submit validation is your LAST LINE OF DEFENSE before sending data!
//
// =============================================================================
// WHEN IS SUBMIT VALIDATION A GOOD CHOICE?
// =============================================================================
//
// Submit validation works well when:
//
// ✓ Using refs or FormData (can't validate on keystroke easily)
//   Example: This Login component using useRef
//
// ✓ Simple forms where instant feedback isn't critical
//   Example: Newsletter signup (just an email field)
//
// ✓ You want minimal code (no blur/keystroke tracking)
//   Example: Contact form with name, email, message
//
// ✓ As a safety net even with other validation
//   Example: Complex signup form with blur validation + submit validation
//
// ✓ Forms where users expect to fill everything then submit
//   Example: Multi-step wizard where validation happens at end of each step
//
// =============================================================================
// WHEN IS SUBMIT VALIDATION NOT ENOUGH?
// =============================================================================
//
// Submit validation alone may not provide the best UX when:
//
// ✗ Long forms with many fields
//   Problem: User fills out 20 fields, clicks submit, THEN learns field 2
//   was invalid. They have to scroll back up to fix it.
//   Solution: Add blur validation so each field is validated as they go.
//
// ✗ Complex validation rules
//   Problem: User needs to match a specific pattern but only finds out on submit.
//   Solution: Show validation hints on blur or keystroke.
//
// ✗ Password confirmation
//   Problem: User types two different passwords, only finds out on submit.
//   Solution: Show "Passwords don't match" as soon as they leave the confirm field.
//
// ✗ Real-time requirements (e.g., username availability)
//   Problem: User picks username, fills form, submits, THEN learns it's taken.
//   Solution: Check availability on blur.
//
// In these cases, COMBINE approaches:
//   - Validate on blur for immediate field-level feedback
//   - Validate on keystroke (after touched) to clear errors as user fixes
//   - STILL validate on submit as final check!
//
// =============================================================================
// THE THREE VALIDATION APPROACHES COMPARED
// =============================================================================
//
// KEYSTROKE VALIDATION (Lesson 260):
// -----------------------------------
// When: On every character typed (onChange)
//
// Pros:
//   ✓ Instant feedback (user knows immediately if input is invalid)
//   ✓ Great for complex rules (e.g., password strength)
//
// Cons:
//   ✗ Can show errors TOO EARLY (user types "t", sees "Invalid email!")
//   ✗ Annoying for users who haven't finished typing
//   ✗ Needs careful logic to avoid premature errors
//
// Code:
//   const emailIsInvalid =
//     enteredEmail !== '' && !enteredEmail.includes('@');
//
// BLUR VALIDATION (Lesson 261):
// ------------------------------
// When: When input loses focus (onBlur)
//
// Pros:
//   ✓ Errors shown at right time (after user finishes with field)
//   ✓ Good balance between instant and delayed feedback
//   ✓ Can clear errors on keystroke (user sees error disappear as they fix)
//
// Cons:
//   ✗ Slightly more complex (need didEdit state to track touched fields)
//   ✗ User must leave field to see error
//
// Code:
//   const [didEdit, setDidEdit] = useState({ email: false });
//   const emailIsInvalid = didEdit.email && !enteredEmail.includes('@');
//   <input onBlur={() => setDidEdit(prev => ({ ...prev, email: true }))} />
//
// SUBMIT VALIDATION (Lesson 262 - This File):
// --------------------------------------------
// When: When form is submitted (onSubmit)
//
// Pros:
//   ✓ Simple - just one validation check
//   ✓ Natural fit for refs
//   ✓ Always necessary as safety net
//   ✓ Less code
//
// Cons:
//   ✗ Errors shown TOO LATE (only after user tries to submit)
//   ✗ For long forms, user may have to scroll back to fix errors
//   ✗ Less immediate feedback
//
// Code:
//   function handleSubmit(event) {
//     event.preventDefault();
//     const emailIsValid = email.current.value.includes('@');
//     if (!emailIsValid) {
//       setEmailIsInvalid(true);
//       return;
//     }
//     setEmailIsInvalid(false);
//     // Process form...
//   }
//
// =============================================================================
// COMBINING VALIDATION APPROACHES - BEST PRACTICE
// =============================================================================
//
// For the BEST user experience, combine multiple approaches:
//
// 1. SUBMIT VALIDATION (Always!)
//    - Final check before processing data
//    - Catches everything, even if user bypassed earlier validation
//
// 2. BLUR VALIDATION (For individual fields)
//    - User gets feedback after finishing each field
//    - Not too early (lets them finish typing)
//    - Not too late (don't wait until submit)
//
// 3. KEYSTROKE VALIDATION (After field touched)
//    - Only AFTER blur validation has shown an error
//    - Clears error as user types the fix
//    - Provides instant positive feedback
//
// Example flow:
//   1. User types "test" in email, tabs away
//      → onBlur fires → Show "Invalid email"
//
//   2. User goes back, types "@example.com"
//      → onChange fires → Error clears immediately!
//
//   3. User clicks submit
//      → onSubmit fires → Final validation check
//      → If somehow invalid, still caught here!
//
// This combines the best of all worlds!
//
// =============================================================================
// HYBRID APPROACH: REFS + STATE
// =============================================================================
//
// Notice that even though we use REFS for input values, we still use STATE
// for validation errors!
//
// Why this hybrid approach?
//
// REFS FOR VALUES:
//   - No re-render on every keystroke
//   - Better performance
//   - Less code (no onChange for values)
//
// STATE FOR ERRORS:
//   - Need re-render to show/hide errors
//   - Can't use refs (refs don't trigger re-renders)
//   - Small state, so re-renders are cheap
//
// This is a great pattern:
//   - Use refs for frequently changing data (input values)
//   - Use state for infrequently changing data (error visibility)
//
// Best of both worlds!
//
// =============================================================================
// SUBMIT VALIDATION CHECKLIST
// =============================================================================
//
// When implementing submit validation:
//
// ✓ Prevent default form submission
//   event.preventDefault();
//
// ✓ Read values from refs
//   const enteredEmail = email.current.value;
//
// ✓ Perform validation checks
//   const emailIsValid = enteredEmail.includes('@');
//
// ✓ If invalid: show error and STOP
//   if (!emailIsValid) {
//     setEmailIsInvalid(true);
//     return;  // ← Important! Stop here!
//   }
//
// ✓ If valid: clear error and continue
//   setEmailIsInvalid(false);
//   // Process form data...
//
// ✓ Display error message in JSX
//   {emailIsInvalid && <p>Please enter a valid email</p>}
//
// ✓ Use state for error visibility (not refs!)
//   const [emailIsInvalid, setEmailIsInvalid] = useState(false);
//
// =============================================================================
// IMPORTANT: ALWAYS VALIDATE ON BOTH CLIENT AND SERVER
// =============================================================================
//
// Everything we've learned is CLIENT-SIDE validation.
// This happens in the browser, in React.
//
// BUT: You MUST also validate on the SERVER!
//
// Why?
// ----
//   - Users can disable JavaScript
//   - Users can bypass the UI and send HTTP requests directly
//   - Malicious users can send any data they want
//
// Client-side validation is for USER EXPERIENCE.
// Server-side validation is for SECURITY.
//
// Example flow:
//
//   1. Client-side validation (React)
//      → Fast feedback, good UX
//      → Can be bypassed
//
//   2. Send data to server
//
//   3. Server-side validation (Node.js, Python, etc.)
//      → Can't be bypassed
//      → Final authority on valid data
//
//   4. If server finds invalid data
//      → Return error to client
//      → Client shows error message
//
// NEVER trust client-side validation alone!
//
// =============================================================================
// NEXT STEPS
// =============================================================================
//
// We've now learned THREE ways to handle forms:
//
//   1. STATE (Controlled Components) - StateLogin.jsx
//      ✓ Full control, instant validation
//      ✗ More code, re-renders on keystroke
//
//   2. REFS (Uncontrolled Components) - This file
//      ✓ Less code, fewer re-renders
//      ✗ Can't easily validate on keystroke
//
//   3. FORMDATA API - Coming next!
//      ✓ Even less code, no refs needed
//      ✓ Works great for forms with many inputs
//      ✗ Only available on submit
//
// Each approach has its place. Choose based on your needs:
//
//   - Complex form with instant validation? → STATE
//   - Simple form with submit validation? → REFS or FORMDATA
//   - Many inputs, simple validation? → FORMDATA
//   - File uploads? → REFS (files can't be controlled)
//
// Master all three approaches, then pick the right tool for each job!
//
// =============================================================================
