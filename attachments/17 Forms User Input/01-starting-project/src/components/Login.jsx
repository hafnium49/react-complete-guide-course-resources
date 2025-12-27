// =============================================================================
// LOGIN COMPONENT - Managing Form Values with REFS (Uncontrolled Components)
// =============================================================================
//
// In this lesson, we're implementing APPROACH 2: REFS (Uncontrolled Components)
//
// This is an ALTERNATIVE to the STATE approach (see StateLogin.jsx).
//
// This means:
//   - The DOM manages the input values (not React state)
//   - We DON'T update state on every keystroke
//   - We DON'T use value/onChange props
//   - We use useRef to READ values when needed (e.g., on submit)
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
// =============================================================================

import { useRef } from 'react';

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
  // FORM SUBMISSION HANDLER
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

    // Now we have the values! We can use them for:
    console.log('Submitted!');
    console.log('Entered email:', enteredEmail);
    console.log('Entered password:', enteredPassword);

    // TODO: Here we would typically:
    // - Validate the data
    // - Send it to a backend API
    // - Show a loading state
    // - Handle success/error responses

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
