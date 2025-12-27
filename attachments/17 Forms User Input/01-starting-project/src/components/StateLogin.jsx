// =============================================================================
// STATE LOGIN COMPONENT - Managing Form Values with STATE (Controlled Components)
// =============================================================================
//
// This file preserves the STATE approach (Lesson 256) for reference.
// See Login.jsx for the REFS approach (Lesson 257).
//
// APPROACH 1: STATE (Controlled Components)
//
// This means:
//   - React manages the input values via state
//   - We update state on every keystroke (onChange)
//   - We feed the state value back to the input (value prop)
//   - This creates "Two-Way Binding"
//
// We explored TWO variations:
//   A) Separate state for each input (simpler, more state slices)
//   B) Combined state object (more scalable for large forms) ← We use this
//
// =============================================================================

import { useState } from 'react';

export default function StateLogin() {
  // ===========================================================================
  // APPROACH A: SEPARATE STATE FOR EACH INPUT (Commented Out)
  // ===========================================================================
  //
  // You COULD create separate state for each input:
  //
  //   const [enteredEmail, setEnteredEmail] = useState('');
  //   const [enteredPassword, setEnteredPassword] = useState('');
  //
  // Then create separate handlers:
  //
  //   function handleEmailChange(event) {
  //     setEnteredEmail(event.target.value);
  //   }
  //
  //   function handlePasswordChange(event) {
  //     setEnteredPassword(event.target.value);
  //   }
  //
  // PROS:
  //   ✓ Simple and straightforward
  //   ✓ Easy to understand
  //   ✓ Good for small forms (2-3 inputs)
  //
  // CONS:
  //   ✗ Lots of repetitive code
  //   ✗ Many state slices for large forms
  //   ✗ Many handler functions
  //
  // For a form with 10 inputs, you'd need:
  //   - 10 useState calls
  //   - 10 handler functions
  //   - That's a LOT of code!
  //
  // ===========================================================================

  // ===========================================================================
  // APPROACH B: COMBINED STATE OBJECT (What We're Using)
  // ===========================================================================
  //
  // Instead, we use ONE state object to hold ALL form values:
  //
  //   {
  //     email: '',
  //     password: ''
  //   }
  //
  // This scales better! For 10 inputs, we still have just ONE state object.
  //
  // ===========================================================================
  const [enteredValues, setEnteredValues] = useState({
    email: '',    // Initial value for email input
    password: '', // Initial value for password input
  });
  // We could add more properties here for additional inputs
  // without needing new useState calls!

  // ===========================================================================
  // GENERIC INPUT CHANGE HANDLER - Works for ANY Input!
  // ===========================================================================
  //
  // This single function can handle changes for ALL inputs in the form.
  //
  // HOW IT WORKS:
  // -------------
  // 1. Takes an 'identifier' parameter (e.g., 'email' or 'password')
  // 2. Takes the new 'value' that was entered
  // 3. Updates ONLY that field in the state object
  // 4. Preserves all other fields unchanged
  //
  // WHY USE THE FUNCTION FORM OF setState?
  // --------------------------------------
  // We use: setEnteredValues(prevValues => ({ ...prevValues, ... }))
  // Instead of: setEnteredValues({ ...enteredValues, ... })
  //
  // Because:
  //   - React state updates can be batched (async)
  //   - If you call setState twice in quick succession, the second might
  //     not see the first update yet
  //   - The function form GUARANTEES you get the latest state
  //   - Always use function form when new state depends on old state!
  //
  // ===========================================================================
  function handleInputChange(identifier, value) {
    // -------------------------------------------------------------------------
    // UPDATING STATE IMMUTABLY
    // -------------------------------------------------------------------------
    // We MUST NOT mutate the state object directly:
    //   ❌ BAD: enteredValues[identifier] = value;
    //   ❌ BAD: enteredValues.email = value;
    //
    // Instead, we create a NEW object with the updated value.
    // -------------------------------------------------------------------------

    setEnteredValues((prevValues) => ({
      // -----------------------------------------------------------------------
      // THE SPREAD OPERATOR: ...prevValues
      // -----------------------------------------------------------------------
      // This copies ALL existing properties from the previous state.
      //
      // If prevValues is { email: 'test@test.com', password: 'abc123' }
      // Then ...prevValues gives us: email: 'test@test.com', password: 'abc123'
      //
      // We do this because we only want to UPDATE one field, not REPLACE
      // the entire object. We must preserve the other field's value!
      // -----------------------------------------------------------------------
      ...prevValues,

      // -----------------------------------------------------------------------
      // DYNAMIC PROPERTY ACCESS: [identifier]
      // -----------------------------------------------------------------------
      // Square brackets allow us to use a VARIABLE as a property name!
      //
      // If identifier is 'email', this becomes:  email: value
      // If identifier is 'password', this becomes:  password: value
      //
      // This is called "computed property name" syntax in JavaScript.
      //
      // Without this, we'd need separate handlers for each input:
      //   function handleEmailChange(value) {
      //     setEnteredValues(prev => ({ ...prev, email: value }));
      //   }
      //   function handlePasswordChange(value) {
      //     setEnteredValues(prev => ({ ...prev, password: value }));
      //   }
      //
      // With dynamic property access, ONE function works for ALL inputs!
      // -----------------------------------------------------------------------
      [identifier]: value,
    }));
    // Note: The parentheses around the object are IMPORTANT!
    // Without them, JavaScript thinks the curly braces are the function body,
    // not an object literal. The parentheses say: "return this object".
  }

  // ===========================================================================
  // INPUT VALIDATION - Computed Value (Recalculated on Every Render)
  // ===========================================================================
  //
  // WHAT IS A COMPUTED VALUE?
  // -------------------------
  // A computed value is a variable that's calculated based on state or props.
  //
  // It's NOT state itself - we don't use useState for it.
  // It's simply a regular variable that we compute inside the component.
  //
  // WHY DOES THIS WORK?
  // -------------------
  // Every time the component re-renders (e.g., when state changes),
  // this component function runs again from top to bottom.
  // So this emailIsInvalid variable gets recalculated with the NEW state values!
  //
  // Example flow:
  //   1. User types 't' in email input
  //   2. handleInputChange updates state to { email: 't', password: '' }
  //   3. React re-renders this component
  //   4. useState returns the new state: { email: 't', password: '' }
  //   5. This line runs again: emailIsInvalid = ...
  //   6. It checks if 't' includes '@' (it doesn't)
  //   7. emailIsInvalid becomes true
  //   8. React renders the error message (see JSX below)
  //
  // ===========================================================================
  const emailIsInvalid =
    // -------------------------------------------------------------------------
    // VALIDATION LOGIC - Check if email is invalid
    // -------------------------------------------------------------------------
    //
    // We want emailIsInvalid to be true IF:
    //   - The email is NOT empty (user has started typing)
    //   - AND the email doesn't include an @ symbol (invalid format)
    //
    // WHY CHECK IF EMAIL IS NOT EMPTY?
    // --------------------------------
    // Without this check, the error would show IMMEDIATELY when page loads!
    //
    // Initial state: { email: '', password: '' }
    // ''.includes('@') is false
    // !false is true
    // emailIsInvalid would be true → Error shows on page load!
    //
    // That's annoying! We want to give the user a chance to type first.
    //
    // So we add: enteredValues.email !== ''
    // This means: only show error if user has started typing.
    //
    // THE && OPERATOR (Logical AND):
    // ------------------------------
    // Both conditions must be true for the whole expression to be true.
    //
    // Examples:
    //   email = ''          → '' !== '' is false → emailIsInvalid = false ✓
    //   email = 't'         → 't' !== '' is true, !'t'.includes('@') is true → true ✗
    //   email = 'test@'     → 'test@' !== '' is true, !'test@'.includes('@') is false → false ✓
    //   email = 'test@test' → 'test@test' !== '' is true, !'test@test'.includes('@') is false → false ✓
    //
    // -------------------------------------------------------------------------
    enteredValues.email !== '' &&
    // -------------------------------------------------------------------------
    // THE includes() METHOD
    // -------------------------------------------------------------------------
    //
    // .includes(searchString) is a JavaScript string method that checks
    // if a string contains a specific substring.
    //
    // Returns true if found, false if not:
    //   'hello'.includes('h')     → true
    //   'hello'.includes('z')     → false
    //   'test@test.com'.includes('@') → true
    //   'testtest.com'.includes('@')  → false
    //
    // THE ! OPERATOR (Logical NOT):
    // -----------------------------
    // The exclamation mark negates (flips) the boolean value:
    //   !true  → false
    //   !false → true
    //
    // So: !enteredValues.email.includes('@')
    // Means: "email DOES NOT include @"
    //
    // This is equivalent to:
    //   enteredValues.email.includes('@') === false
    //
    // But !includes() is more concise and idiomatic.
    //
    // -------------------------------------------------------------------------
    !enteredValues.email.includes('@');
  //
  // SIMPLIFIED EXPLANATION:
  // -----------------------
  // emailIsInvalid will be true when:
  //   1. User has typed something (email is not empty)
  //   2. AND what they typed doesn't have an @ symbol
  //
  // PROBLEMS WITH THIS APPROACH (We'll discuss and solve these next!):
  // ------------------------------------------------------------------
  //
  // PROBLEM 1: Error shows TOO EARLY
  // --------------------------------
  // User types: 't'
  // emailIsInvalid: true (no @ yet)
  // Error message: "Please enter a valid email address"
  // User thinks: "I'm not done typing yet!"
  //
  // This is annoying! The user barely started typing.
  //
  // PROBLEM 2: No error when user CLEARS a valid email
  // ---------------------------------------------------
  // User types: 'test@test.com' (valid, no error)
  // User deletes everything, email becomes ''
  // emailIsInvalid: false (because email === '')
  // Error message: (not shown)
  // Expected: Should show error! The field is required.
  //
  // PROBLEM 3: Can't distinguish between "untouched" and "cleared"
  // ---------------------------------------------------------------
  // We're using email !== '' to avoid showing errors initially.
  // But this means we also WON'T show errors if user clears the field.
  //
  // WE'LL FIX THESE PROBLEMS IN UPCOMING LESSONS!
  // ----------------------------------------------
  // We'll learn about:
  //   - Validating on BLUR (when field loses focus)
  //   - Tracking if field has been TOUCHED
  //   - Combining validation strategies
  //
  // ===========================================================================

  // ===========================================================================
  // RESET HANDLER - For Controlled Components
  // ===========================================================================
  //
  // With controlled components (state), resetting is EASY!
  // Just reset the state to its initial values.
  //
  // ===========================================================================
  function handleReset() {
    // -------------------------------------------------------------------------
    // RESETTING STATE-BASED FORMS
    // -------------------------------------------------------------------------
    //
    // Since our inputs are controlled by state (value={enteredValues.email}),
    // resetting the state AUTOMATICALLY clears the inputs!
    //
    // We just set the state back to the same initial value we used in useState:
    //
    // -------------------------------------------------------------------------
    setEnteredValues({
      email: '',
      password: '',
    });

    // That's it! The inputs will now show empty strings.
    //
    // This works because:
    //   1. We call setEnteredValues({ email: '', password: '' })
    //   2. React re-renders the component with new state
    //   3. Inputs render with value={enteredValues.email} = ''
    //   4. User sees empty inputs!
    //
    // BENEFITS OF STATE-BASED RESET:
    // -------------------------------
    //   ✓ Clean and predictable
    //   ✓ Follows React patterns (state controls UI)
    //   ✓ Can reset to non-empty defaults if needed
    //   ✓ Can reset individual fields selectively
    //   ✓ TypeScript-friendly (type-safe)
    //
    // ALTERNATIVE: Reset to custom defaults
    // --------------------------------------
    // You can reset to non-empty values:
    //   setEnteredValues({
    //     email: 'default@example.com',
    //     password: ''
    //   });
  }

  // ===========================================================================
  // FORM SUBMISSION HANDLER
  // ===========================================================================
  function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload on form submission

    // -------------------------------------------------------------------------
    // ACCESSING THE FORM VALUES
    // -------------------------------------------------------------------------
    // With the state approach, we have access to the values at ALL times!
    // We can use them here in handleSubmit, or anywhere else in the component.
    //
    // This is one of the main benefits of controlled components - you always
    // know what the current values are.
    // -------------------------------------------------------------------------
    console.log('Submitted!');
    console.log(enteredValues); // { email: '...', password: '...' }

    // We could also access individual values:
    // console.log('Email:', enteredValues.email);
    // console.log('Password:', enteredValues.password);

    // -------------------------------------------------------------------------
    // OPTIONAL: Reset after successful submission
    // -------------------------------------------------------------------------
    //
    // After sending data to backend, you might want to clear the form:
    //
    //   fetch('/api/login', { method: 'POST', body: JSON.stringify(enteredValues) })
    //     .then(response => {
    //       if (response.ok) {
    //         setEnteredValues({ email: '', password: '' });  // Clear form
    //         // Show success message
    //       }
    //     });
    //
    // -------------------------------------------------------------------------

    // TODO: Here we would typically:
    // - Validate the data
    // - Send it to a backend API
    // - Show a loading state
    // - Handle success/error responses
    // - Reset form on success
  }

  return (
    // form element will render the login form every time the login button is clicked
    // To prevent the default browser behavior of reloading the page on form submission, we use onSubmit={handleSubmit}.
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>

          {/* ===================================================================
              CONTROLLED INPUT: Email
              ===================================================================

              This is a CONTROLLED COMPONENT because:
                1. value={enteredValues.email} - React controls the displayed value
                2. onChange updates state - React knows about every change

              TWO-WAY BINDING:
              ----------------
              value={enteredValues.email}
                ↓
                State flows DOWN to the input (displayed value)

              onChange={(event) => ...}
                ↑
                User input flows UP to state (updates value)

              This creates a "single source of truth" - the state.
              The input always shows what's in state, nothing more, nothing less.

              =================================================================== */}
          <input
            id="email"
            type="email"
            name="email"
            // -----------------------------------------------------------------
            // VALUE PROP: Display the current state value
            // -----------------------------------------------------------------
            // This makes React CONTROL the input's value.
            // The input will ALWAYS show whatever is in enteredValues.email.
            //
            // Try this: Comment out this line and the onChange.
            // You won't be able to type in the input! (It stays at '')
            // -----------------------------------------------------------------
            value={enteredValues.email}
            // -----------------------------------------------------------------
            // onChange PROP: Update state when user types
            // -----------------------------------------------------------------
            // This fires on EVERY keystroke!
            //
            // We can't just do: onChange={handleInputChange}
            // Because React would only pass the EVENT object, not our
            // custom 'identifier' parameter.
            //
            // So we wrap it in an arrow function that:
            //   1. Receives the event from React
            //   2. Calls handleInputChange with custom arguments
            //   3. Passes 'email' as identifier
            //   4. Passes event.target.value as the new value
            //
            // event.target is the input element itself.
            // event.target.value is the current text in the input.
            // -----------------------------------------------------------------
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
          {/*
            WHAT HAPPENS WHEN USER TYPES?
            ------------------------------
            1. User types 't' in the email input
            2. Browser triggers 'change' event
            3. Our onChange arrow function runs
            4. It calls handleInputChange('email', 't')
            5. handleInputChange updates state: { email: 't', password: '' }
            6. React re-renders the component with new state
            7. Input's value becomes 't' (from value={enteredValues.email})
            8. User sees 't' in the input

            This happens for EVERY keystroke! Fast, but React is optimized for it.
          */}

          {/* ===================================================================
              CONDITIONAL ERROR MESSAGE - Shown only when email is invalid
              ===================================================================

              CONDITIONAL RENDERING IN REACT:
              -------------------------------
              We use the && (logical AND) operator to conditionally render JSX.

              Syntax:
                {condition && <JSX to render>}

              How it works:
                - If condition is true: React renders the JSX
                - If condition is false: React renders nothing (null)

              This is called "short-circuit evaluation":
                - JavaScript evaluates left to right
                - If left side is false, right side is never evaluated
                - If left side is true, right side is evaluated and returned

              Examples:
                {true && <p>Shown</p>}     → Renders <p>Shown</p>
                {false && <p>Hidden</p>}   → Renders nothing
                {5 > 3 && <p>Math!</p>}    → Renders <p>Math!</p>

              WHY USE && INSTEAD OF IF STATEMENT?
              -----------------------------------
              You CAN'T use if statements directly in JSX:
                ❌ {if (emailIsInvalid) <div>Error</div>}  // Syntax error!

              But you CAN use:
                ✓ {emailIsInvalid && <div>Error</div>}     // Works!
                ✓ {emailIsInvalid ? <div>Error</div> : null}  // Also works

              The && approach is cleaner when you only render something
              if the condition is true (no "else" case needed).

              =================================================================== */}
          <div className="control-error">
            {/* -----------------------------------------------------------------
                THE className PROP
                -----------------------------------------------------------------
                "control-error" is a CSS class defined in index.css.

                It styles the error message container with:
                  - Red text color
                  - Appropriate spacing
                  - Error icon or styling

                ----------------------------------------------------------------- */}

            {/* -----------------------------------------------------------------
                CONDITIONAL RENDERING: Show error only if emailIsInvalid is true
                -----------------------------------------------------------------

                Remember: emailIsInvalid is our computed value from above.

                When emailIsInvalid is true:
                  - The && short-circuits to evaluate the right side
                  - React renders the <p> element
                  - User sees the error message

                When emailIsInvalid is false:
                  - The && short-circuits and returns false
                  - React doesn't render anything
                  - User sees no error message

                IMPORTANT: This recalculates on EVERY RENDER!
                ---------------------------------------------
                Every time the user types a character:
                  1. State updates (enteredValues.email changes)
                  2. Component re-renders
                  3. emailIsInvalid is recalculated
                  4. This condition is re-evaluated
                  5. Error appears or disappears based on new value

                This gives INSTANT FEEDBACK as the user types!

                ----------------------------------------------------------------- */}
            {emailIsInvalid && (
              <p>
                {/* -------------------------------------------------------------
                    ERROR MESSAGE TEXT
                    -------------------------------------------------------------
                    This message appears when:
                      - User has typed something (email !== '')
                      - AND email doesn't include '@'

                    Example scenarios when this shows:
                      - Email: 't'          → Shows error
                      - Email: 'test'       → Shows error
                      - Email: 'test.com'   → Shows error
                      - Email: 'test@'      → Error disappears!
                      - Email: 'test@test'  → No error

                    ------------------------------------------------------------- */}
                Please enter a valid email address.
              </p>
            )}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>

          {/* ===================================================================
              CONTROLLED INPUT: Password
              ===================================================================

              Same pattern as email, but:
                - value={enteredValues.password} - different state property
                - handleInputChange('password', ...) - different identifier

              THE POWER OF THE GENERIC HANDLER:
              ----------------------------------
              Notice we're using the SAME handleInputChange function!
              We just pass a different identifier ('password' vs 'email').

              This is much cleaner than having separate functions:
                handleEmailChange, handlePasswordChange, etc.

              For a form with 20 inputs, we still only need ONE handler!

              =================================================================== */}
          <input
            id="password"
            type="password"
            name="password"
            value={enteredValues.password}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </div>
      </div>

      <p className="form-actions">
        <button type="button" onClick={handleReset} className="button button-flat">
          Reset
        </button>
        {/*type="button" would prevent the button from submitting the form*/}
        <button className="button">Login</button>
      </p>
    </form>
  );
}

// =============================================================================
// CONTROLLED vs UNCONTROLLED COMPONENTS
// =============================================================================
//
// CONTROLLED COMPONENTS (What We Just Implemented):
// -------------------------------------------------
// - Input value is controlled by React state
// - You set the value prop: <input value={state} />
// - You handle onChange: <input onChange={handler} />
// - React is the "single source of truth"
//
// Example:
//   const [email, setEmail] = useState('');
//   <input value={email} onChange={(e) => setEmail(e.target.value)} />
//
// UNCONTROLLED COMPONENTS (We'll see this later):
// -----------------------------------------------
// - Input value is controlled by the DOM
// - You DON'T set the value prop
// - You use a ref to read the value when needed
// - The DOM is the "source of truth"
//
// Example:
//   const emailRef = useRef();
//   <input ref={emailRef} />
//   // Later: const email = emailRef.current.value;
//
// =============================================================================

// =============================================================================
// THE SPREAD OPERATOR AND IMMUTABILITY
// =============================================================================
//
// WHY WE USE: setEnteredValues(prev => ({ ...prev, [id]: value }))
//
// WRONG WAY (Mutation):
// ---------------------
//   const newValues = prevValues;  // Same object reference!
//   newValues[identifier] = value; // Mutating the original
//   setEnteredValues(newValues);   // React might not detect the change!
//
// React compares objects by REFERENCE, not by value.
// If you mutate the object, the reference stays the same.
// React thinks: "Same reference? No change! Don't re-render."
//
// RIGHT WAY (Creating New Object):
// --------------------------------
//   setEnteredValues(prev => ({
//     ...prev,              // Copy all existing properties
//     [identifier]: value   // Override one property
//   }));
//
// This creates a NEW object with a NEW reference.
// React thinks: "Different reference? Something changed! Re-render!"
//
// THE SPREAD OPERATOR (...) does a SHALLOW COPY:
//   const prev = { email: 'a', password: 'b' };
//   const next = { ...prev, email: 'c' };
//   // next is { email: 'c', password: 'b' }
//   // prev is still { email: 'a', password: 'b' } (unchanged)
//
// =============================================================================

// =============================================================================
// DYNAMIC PROPERTY NAMES (Computed Properties)
// =============================================================================
//
// STATIC PROPERTY NAME:
//   const obj = { email: 'test@test.com' };
//   // Property name is literally "email"
//
// DYNAMIC PROPERTY NAME:
//   const propertyName = 'email';
//   const obj = { [propertyName]: 'test@test.com' };
//   // Property name comes from the variable
//   // Same result: { email: 'test@test.com' }
//
// This allows us to write:
//   function updateField(fieldName, value) {
//     setState(prev => ({ ...prev, [fieldName]: value }));
//   }
//
// Instead of:
//   function updateEmail(value) {
//     setState(prev => ({ ...prev, email: value }));
//   }
//   function updatePassword(value) {
//     setState(prev => ({ ...prev, password: value }));
//   }
//   // ... 10 more functions for 10 more fields
//
// ONE generic function instead of MANY specific functions!
//
// =============================================================================

// =============================================================================
// WHY USE AN ARROW FUNCTION IN onChange?
// =============================================================================
//
// WHY NOT: onChange={handleInputChange}
// -------------------------------------
// Because React would call it like this:
//   handleInputChange(event)
//
// But our function signature is:
//   handleInputChange(identifier, value)
//
// React doesn't know about our custom 'identifier' parameter!
//
// WHY YES: onChange={(event) => handleInputChange('email', event.target.value)}
// ------------------------------------------------------------------------------
// The arrow function acts as a "wrapper":
//   1. React calls the arrow function with the event
//   2. The arrow function calls handleInputChange with custom arguments
//   3. We control exactly what arguments are passed
//
// This pattern is VERY common in React for passing extra arguments to handlers:
//
//   onClick={() => handleDelete(itemId)}
//   onChange={(e) => handleChange('fieldName', e.target.value)}
//   onSubmit={(e) => handleSubmit(formId, e)}
//
// =============================================================================

// =============================================================================
// WHEN TO USE CONTROLLED vs UNCONTROLLED
// =============================================================================
//
// USE CONTROLLED (STATE) WHEN:
// ---------------------------
//   ✓ You need to validate on every keystroke
//   ✓ You need to transform input as user types (e.g., format phone number)
//   ✓ You need to enable/disable submit based on input validity
//   ✓ You need to enforce input format (e.g., only numbers)
//   ✓ You want instant feedback (character count, password strength)
//
// USE UNCONTROLLED (REFS) WHEN:
// -----------------------------
//   ✓ Simple forms where you only need values on submit
//   ✓ File inputs (can't be controlled)
//   ✓ Integrating with non-React code
//   ✓ Performance is critical (avoid re-renders on every keystroke)
//
// =============================================================================

// =============================================================================
// PERFORMANCE CONSIDERATION
// =============================================================================
//
// With controlled components, the component re-renders on EVERY KEYSTROKE!
//
// User types: "h" → render
// User types: "e" → render
// User types: "l" → render
// User types: "l" → render
// User types: "o" → render
//
// 5 letters = 5 re-renders!
//
// Is this a problem?
// ------------------
// Usually NO! React is VERY fast at re-rendering.
// For most forms, this is perfectly fine.
//
// When it MIGHT be a problem:
// ---------------------------
//   - Very complex forms with many inputs
//   - Heavy computations in the component
//   - Large lists being rendered
//
// Solutions:
// ----------
//   - Use React.memo to prevent unnecessary child re-renders
//   - Use useMemo for expensive calculations
//   - Debounce state updates (wait until user stops typing)
//   - Consider uncontrolled components (refs) for simple cases
//
// =============================================================================

// =============================================================================
// VALIDATION ON EVERY KEYSTROKE - COMPLETE GUIDE
// =============================================================================
//
// This lesson demonstrates VALIDATION ON KEYSTROKE (as the user types).
//
// WHAT WE IMPLEMENTED:
// --------------------
// 1. A computed value that validates the email on every render:
//      const emailIsInvalid = enteredValues.email !== '' &&
//                             !enteredValues.email.includes('@');
//
// 2. Conditional rendering to show an error message:
//      {emailIsInvalid && <p>Please enter a valid email address.</p>}
//
// HOW IT WORKS:
// -------------
// Every time the user types a character:
//   1. onChange fires → handleInputChange runs
//   2. State updates with new email value
//   3. Component re-renders
//   4. emailIsInvalid is recalculated based on new state
//   5. Error message appears or disappears based on emailIsInvalid
//
// This gives INSTANT FEEDBACK as the user types!
//
// =============================================================================
// WHY WE NEED THE STATE APPROACH FOR KEYSTROKE VALIDATION
// =============================================================================
//
// CONTROLLED COMPONENTS (State) - Can validate on every keystroke ✓
// ----------------------------------------------------------------
// With state, we have access to the value on EVERY CHANGE:
//   - onChange fires on every keystroke
//   - We update state with the new value
//   - We can validate the new value immediately
//   - We can show/hide errors in real-time
//
// Example:
//   <input
//     value={enteredValues.email}
//     onChange={(e) => handleInputChange('email', e.target.value)}
//   />
//
// Every keystroke → onChange → state update → re-render → validation
//
// UNCONTROLLED COMPONENTS (Refs) - Can't validate on keystroke ✗
// ---------------------------------------------------------------
// With refs, we only have access to the value when we READ it:
//   - No onChange handler
//   - No state updates on keystroke
//   - We only read the value on submit
//   - Can't validate until form is submitted
//
// Example:
//   const emailRef = useRef();
//   <input ref={emailRef} />
//
//   // Can only validate on submit:
//   function handleSubmit() {
//     const email = emailRef.current.value;  // Only now do we have the value!
//     if (!email.includes('@')) { ... }       // Too late for keystroke validation
//   }
//
// FORMDATA API - Can't validate on keystroke ✗
// ---------------------------------------------
// FormData only works on form submission:
//   - We create FormData in the submit handler
//   - We can't access values until form is submitted
//   - Can't validate on keystroke
//
// Example:
//   function handleSubmit(event) {
//     const fd = new FormData(event.target);  // Only works on submit!
//     const email = fd.get('email');
//   }
//
// CONCLUSION:
// -----------
// For KEYSTROKE VALIDATION, you MUST use CONTROLLED COMPONENTS (state).
// Refs and FormData only work for SUBMIT VALIDATION.
//
// =============================================================================
// THE VALIDATION LOGIC EXPLAINED
// =============================================================================
//
// Our validation condition:
//   const emailIsInvalid = enteredValues.email !== '' &&
//                          !enteredValues.email.includes('@');
//
// This means emailIsInvalid is true when BOTH conditions are true:
//   1. enteredValues.email !== ''            (email is NOT empty)
//   2. !enteredValues.email.includes('@')    (email does NOT include @)
//
// WHY CHECK IF EMAIL IS NOT EMPTY?
// --------------------------------
// Version WITHOUT the empty check:
//   const emailIsInvalid = !enteredValues.email.includes('@');
//
// Initial state: { email: '', password: '' }
// ''.includes('@') → false
// !false → true
// emailIsInvalid → true
// Result: Error shows IMMEDIATELY when page loads! ❌
//
// This is terrible UX! The user sees an error before they've even started typing.
//
// Version WITH the empty check:
//   const emailIsInvalid = enteredValues.email !== '' &&
//                          !enteredValues.email.includes('@');
//
// Initial state: { email: '', password: '' }
// '' !== '' → false
// false && anything → false (short-circuit)
// emailIsInvalid → false
// Result: No error on page load! ✓
//
// User types 't':
// 't' !== '' → true
// !'t'.includes('@') → true
// true && true → true
// emailIsInvalid → true
// Result: Error shows! ✓
//
// User types '@':
// 't@' !== '' → true
// !'t@'.includes('@') → false
// true && false → false
// emailIsInvalid → false
// Result: Error disappears! ✓
//
// =============================================================================
// PROBLEMS WITH KEYSTROKE VALIDATION (As Discussed in the Lesson)
// =============================================================================
//
// PROBLEM 1: Error Shows TOO EARLY
// ---------------------------------
// Scenario:
//   User starts typing: 't'
//   emailIsInvalid: true (no @ yet)
//   Error message: "Please enter a valid email address"
//   User's reaction: "I'M NOT DONE TYPING YET!"
//
// The user has barely started typing their email address, but we're already
// showing an error. This is annoying and creates a poor user experience.
//
// Example flow:
//   User types: 't'       → Error appears (no @)
//   User types: 'e'       → Error still there
//   User types: 's'       → Error still there
//   User types: 't'       → Error still there
//   User types: '@'       → Error disappears!
//   User types: 't'       → No error
//   User types: 'e'       → No error
//   User types: 's'       → No error
//   User types: 't'       → No error
//   User types: '.'       → No error
//   User types: 'c'       → No error
//   User types: 'o'       → No error
//   User types: 'm'       → No error
//
// The user saw an error for the first 4 keystrokes, even though they were
// in the middle of typing a valid email address!
//
// PROBLEM 2: No Error When User CLEARS a Valid Email
// ---------------------------------------------------
// Scenario:
//   User types: 'test@test.com' (valid, no error shown)
//   User selects all and deletes
//   Email is now: ''
//   emailIsInvalid: false (because email === '')
//   Error message: (not shown)
//   Expected: Should show an error! The field is required.
//
// Because we check `email !== ''` to avoid showing errors initially,
// we also DON'T show errors when the user clears the field.
//
// This means the user can submit a form with an empty email and we won't
// warn them until they try to submit!
//
// Example flow:
//   Initial state: email = ''          → No error (correct!)
//   User types: 'test@test.com'        → No error (correct!)
//   User erases everything: email = '' → No error (WRONG! Should show error)
//
// PROBLEM 3: Can't Distinguish Between "Untouched" and "Cleared"
// ---------------------------------------------------------------
// Our current validation can't tell the difference between:
//   1. Initial state (user hasn't touched the field yet)
//   2. Cleared state (user typed something, then deleted it)
//
// Both cases result in email === '', but they should be treated differently:
//   1. Untouched: Don't show error (give user a chance to type)
//   2. Cleared: Show error (user removed a value that should be there)
//
// To fix this, we need to track whether the field has been "touched" or not.
// We'll learn about this in the next lesson!
//
// =============================================================================
// THE SOLUTION: VALIDATE ON BLUR (Next Lesson)
// =============================================================================
//
// The instructor mentions that we'll next explore validating on BLUR
// (when the input loses focus).
//
// WHAT IS BLUR?
// -------------
// "Blur" is the event that fires when an input loses focus.
//
// Example:
//   1. User clicks on email input → input gets "focus"
//   2. User types their email
//   3. User clicks outside the input or presses Tab → input loses "focus"
//   4. "blur" event fires
//
// WHY VALIDATE ON BLUR?
// ---------------------
// Blur validation waits until the user has FINISHED typing in a field
// before showing an error.
//
// This solves the "too early" problem:
//   - User types 't' → No error (still focused)
//   - User types 'e' → No error (still focused)
//   - User types 's' → No error (still focused)
//   - User types 't' → No error (still focused)
//   - User tabs to next field → Blur event → NOW check if valid → Show error!
//
// The user had a chance to type a complete email before we complained!
//
// BLUR VALIDATION IMPLEMENTATION (Preview):
// -----------------------------------------
// We'll add an onBlur handler to the input:
//
//   <input
//     value={enteredValues.email}
//     onChange={(e) => handleInputChange('email', e.target.value)}
//     onBlur={handleEmailBlur}  ← NEW!
//   />
//
//   function handleEmailBlur() {
//     // Validate the email when user leaves the field
//     // Mark the field as "touched"
//     // Show error if invalid
//   }
//
// We'll explore this in the next lesson!
//
// =============================================================================
// COMBINING VALIDATION STRATEGIES (Future Lessons)
// =============================================================================
//
// The best user experience often comes from COMBINING validation approaches:
//
// 1. VALIDATE ON SUBMIT (catch all errors before submission)
//    - User clicks Submit button
//    - Validate ALL fields
//    - Show errors for invalid fields
//    - Prevent submission if any field is invalid
//
// 2. VALIDATE ON BLUR (individual field feedback)
//    - User leaves a field (blur event)
//    - Validate that specific field
//    - Show error if invalid
//    - Mark field as "touched"
//
// 3. VALIDATE ON CHANGE (clear errors as user fixes them)
//    - After a field has an error shown
//    - Validate on every keystroke
//    - Clear error as soon as field becomes valid
//    - Provides instant positive feedback
//
// Example flow with combined validation:
//   1. User clicks Submit without filling form
//      → Submit validation catches empty fields
//      → All fields marked as "touched"
//      → Errors shown for all invalid fields
//
//   2. User clicks on email field
//      → Field gets focus
//
//   3. User types 't'
//      → Change validation runs (field is touched)
//      → Invalid (no @)
//      → Error stays (was already showing)
//
//   4. User types '@'
//      → Change validation runs
//      → Valid!
//      → Error disappears immediately ✓
//
//   5. User tabs to password field
//      → Email blur validation runs
//      → Valid!
//      → No error shown ✓
//
// This provides the best of all approaches:
//   - Not annoying (doesn't show errors too early)
//   - Helpful (shows errors after user leaves field)
//   - Responsive (clears errors immediately when fixed)
//
// We'll implement this combined approach in future lessons!
//
// =============================================================================
// KEY TAKEAWAYS FROM THIS LESSON
// =============================================================================
//
// 1. KEYSTROKE VALIDATION requires the STATE approach (controlled components)
//    - Refs and FormData can only validate on submit
//
// 2. COMPUTED VALUES recalculate on every render
//    - const emailIsInvalid = ... (not state, just a variable)
//    - Automatically updates when state changes
//
// 3. CONDITIONAL RENDERING with &&
//    - {emailIsInvalid && <p>Error</p>}
//    - Shows JSX only when condition is true
//
// 4. VALIDATING ON KEYSTROKE has problems:
//    - Shows errors TOO EARLY (user is still typing)
//    - Can't distinguish "untouched" from "cleared"
//    - Needs to be combined with other validation approaches
//
// 5. NEXT UP: Validate on BLUR (when field loses focus)
//    - Gives user a chance to finish typing
//    - Better user experience
//    - Still provides timely feedback
//
// =============================================================================
