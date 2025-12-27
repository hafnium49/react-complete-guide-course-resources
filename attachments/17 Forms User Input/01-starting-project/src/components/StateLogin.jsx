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
