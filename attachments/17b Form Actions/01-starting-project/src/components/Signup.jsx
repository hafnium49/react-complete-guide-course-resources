import { useActionState } from 'react';
import { isEmail, isNotEmpty, hasMinLength, isEqualToOtherValue } from '../util/validation.js';

// =============================================================================
// SIGNUP COMPONENT & FIRST FORM ACTION
// =============================================================================
//
// In the previous course section, you learned how to handle form submissions
// and user input in React apps **manually**, by:
//   - Adding an `onSubmit` prop to the `<form>` element
//   - Pointing `onSubmit` at a handler function, e.g. `handleSubmit`
//   - Receiving an **event object** inside that handler
//   - Calling `event.preventDefault()` to prevent the browser's default behavior
//   - Optionally constructing a `FormData` object from `event.target`
//
// That approach is still 100% valid and you'll see it used in many projects,
// regardless of the React version.
//
// In this section, however, you're learning about an **alternative**:
// React's **Form Actions** feature, which is built into **React 19+**.
//
// =============================================================================
// WHAT ARE FORM ACTIONS (HIGH LEVEL)?
// =============================================================================
//
// - Only available in **React 19 or higher**.
// - Instead of `<form onSubmit={handleSubmit}>`, you use `<form action={fn}>`.
// - The function you pass to `action` is your **form action**.
// - React:
//     ✓ Listens for the submit event
//     ✓ Calls `preventDefault()` behind the scenes
//     ✓ Automatically creates a **FormData** object for you
//     ✓ Calls your action function with that FormData object
//
// So instead of:
//
//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const email = formData.get('email');
//   }
//
//   <form onSubmit={handleSubmit}> … </form>
//
// you can now write:
//
//   function signUpAction(formData) {
//     const email = formData.get('email');
//   }
//
//   <form action={signUpAction}> … </form>
//
// Key differences:
//   - You **no longer** receive the event object.
//   - You **do not** call `event.preventDefault()` yourself.
//   - You work with **FormData** directly.
//
// =============================================================================
// REACT 19 REQUIREMENT (CHECKING `package.json`)
// =============================================================================
//
// Form Actions are a **React feature**, but they only exist starting with
// React 19. If you look at this project's `package.json`, you'll see:
//
//   "react": "^19.0.0",
//   "react-dom": "^19.0.0"
//
// That `^19.0.0` indicates that this project is allowed to use React 19+,
// so using Form Actions here is safe.
//
// In other projects, always **inspect `package.json` first** before assuming
// that Form Actions are available.
//
// =============================================================================
// A NOTE ON THE `action` ATTRIBUTE / PROP
// =============================================================================
//
// In plain HTML (no React), a `<form>` can have an `action` **attribute**:
//
//   <form action="/some-endpoint" method="POST">
//
// That tells the browser **where** to send the form data when the form is
// submitted. The browser then:
//   - Builds a request
//   - Sends the data to that URL
//   - Navigates / reloads the page
//
// In React 19, we are instead using the `action` **prop** in JSX:
//
//   <form action={signUpAction}>
//
// Here, React **overrides** the original meaning:
//   - It does NOT send the data to some URL automatically.
//   - Instead, it **executes the function** you provide.
//   - It still suppresses the browser's default behavior for you.
//
// So: In React 19+, think of `action={someFunction}` as
//   "call this function when the form is submitted (with FormData)".
//
// =============================================================================
// WHY `name` ATTRIBUTES ARE CRITICAL
// =============================================================================
//
// This form already uses `name` attributes on all relevant inputs:
//   - `name="email"`, `name="password"`, `name="confirm-password"`, ...
//
// The `name` string becomes the **key** inside the FormData object.
// That’s why, in the action function, we can do:
//
//   formData.get('email')
//
// and expect to get the value of the field with `name="email"`.
//
// If you forget to add a `name` attribute, that field’s value will not be
// included in the FormData object.
//
// =============================================================================

// -----------------------------------------------------------------------------
// FORM ACTION FUNCTION (NOW WITH STATE MANAGEMENT VIA useActionState)
// -----------------------------------------------------------------------------
// This function serves as our form action. When used with `useActionState`,
// React calls it with TWO parameters:
//
//   1. `previousState` - The previous form state (or initial state on first call)
//   2. `formData` - The FormData object containing all form values
//
// IMPORTANT: When you use `useActionState`, the action function signature
// CHANGES compared to when you use it directly on a form:
//
//   WITHOUT useActionState:
//     function signUpAction(formData) { ... }
//     <form action={signUpAction}>
//
//   WITH useActionState:
//     function signUpAction(previousState, formData) { ... }
//     const [formState, formAction] = useActionState(signUpAction, initialState);
//     <form action={formAction}>
//
// This is because `useActionState` needs to pass the previous state to your
// action function so you can build new state based on it (if needed).
// -----------------------------------------------------------------------------
function signUpAction(previousState, formData) {
  // ---------------------------------------------------------------------------
  // PARAMETER EXPLANATION
  // ---------------------------------------------------------------------------
  // `previousState` (first parameter):
  //   - Contains the last state returned by this action (or initial state)
  //   - Useful if you want to build new state based on old state
  //   - In this lesson, we don't use it, but we must accept it
  //
  // `formData` (second parameter):
  //   - The FormData object automatically created by React
  //   - Contains all form values keyed by their `name` attributes
  //   - This is what we use to extract user input
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // 1) EXTRACTING ALL RELEVANT VALUES FROM FORMDATA
  // ---------------------------------------------------------------------------
  // In the previous lesson we only extracted the email.
  // Now we extract ALL the fields we care about, using the `name` values
  // from the JSX as keys for FormData.
  //
  // IMPORTANT: The strings used below (e.g. 'email', 'password', 'first-name')
  // MUST match the `name="..."` attributes from the form inputs exactly.
  // ---------------------------------------------------------------------------

  // Shorten the constant name from `enteredEmail` to just `email`,
  // as done in the lesson.
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password');
  const firstName = formData.get('first-name');
  const lastName = formData.get('last-name');
  const role = formData.get('role');
  const terms = formData.get('terms');

  // Special case: Multiple checkboxes with the same `name="acquisition"`.
  //
  // Here, the user can select zero, one, or multiple "acquisition" options.
  // Therefore we use **getAll** (not `get`) so that we always get an **array**
  // of selected values (even if it's empty).
  const acquisitionChannel = formData.getAll('acquisition');

  // ---------------------------------------------------------------------------
  // 2) PREPARING VALIDATION (COLLECTING ERRORS)
  // ---------------------------------------------------------------------------
  // We now want to validate these extracted values.
  //
  // There are many ways of structuring validation logic. In this lesson,
  // we:
  //   - Create an `errors` array
  //   - Run a series of checks
  //   - Push **human-readable error messages** into that array
  //
  // Later, we’ll use these messages to give feedback to the user.
  // ---------------------------------------------------------------------------
  const errors = [];

  // ---------------------------------------------------------------------------
  // 3) IMPORTED VALIDATION HELPERS
  // ---------------------------------------------------------------------------
  // We use helper functions defined in `src/util/validation.js`:
  //   - isEmail(value)
  //   - isNotEmpty(value)
  //   - hasMinLength(value, minLength)
  //   - isEqualToOtherValue(value, otherValue)
  //
  // These helpers keep the validation logic readable and reusable.
  // ---------------------------------------------------------------------------

  // EMAIL VALIDATION
  // ----------------
  // Check if the email **is not** a valid email.
  // `isEmail` currently just checks for the presence of '@', which is simple
  // but good enough for demonstration purposes.
  if (!isEmail(email)) {
    errors.push('Invalid email address.');
  }

  // PASSWORD VALIDATION
  // -------------------
  // Here we validate the password in two ways:
  //   1) It must not be empty.
  //   2) It must have at least 6 characters.
  //
  // We only have an `isNotEmpty` function, so we invert its result with `!`
  // to detect the "empty" case.
  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push('You must provide a password with at least six characters.');
  }

  // PASSWORD MATCH VALIDATION
  // -------------------------
  // Check whether `password` and `confirmPassword` match.
  // Again, we invert the helper result (`!isEqualToOtherValue`) to detect
  // the "invalid" case.
  if (!isEqualToOtherValue(password, confirmPassword)) {
    errors.push('Passwords do not match.');
  }

  // NAME VALIDATION
  // ---------------
  // Ensure that BOTH first and last name are provided (not just one of them).
  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push('Please provide both your first and last name.');
  }

  // ROLE VALIDATION
  // ---------------
  // The user must pick a role from the dropdown.
  // An empty or missing role value is considered invalid.
  if (!isNotEmpty(role)) {
    errors.push('Please select a role.');
  }

  // TERMS & CONDITIONS VALIDATION
  // -----------------------------
  // The "terms" value will be:
  //   - `null` / falsy if the checkbox was NOT checked
  //   - a string (e.g. 'on') if it was checked
  //
  // So we can simply check for "falsy" to validate this.
  if (!terms) {
    errors.push('You must agree to the terms and conditions.');
  }

  // ACQUISITION CHANNEL VALIDATION
  // ------------------------------
  // `acquisitionChannel` is an array returned by `formData.getAll('acquisition')`.
  //   - []      → user selected no channels
  //   - ['x']   → one channel selected
  //   - ['x','y'] → multiple channels selected
  //
  // We want to enforce "at least one channel".
  if (acquisitionChannel.length === 0) {
    errors.push('Please select at least one acquisition channel.');
  }

  // ---------------------------------------------------------------------------
  // 4) RETURNING STATE FROM THE ACTION FUNCTION
  // ---------------------------------------------------------------------------
  // When using `useActionState`, your action function can return a value.
  // This return value becomes the new form state that React will store.
  //
  // You can return:
  //   - Any value (object, array, string, number, null, etc.)
  //   - Or nothing at all (undefined)
  //
  // In this lesson, we return an object with an `errors` key:
  //   - If there ARE errors: `{ errors: ['error1', 'error2', ...] }`
  //   - If there are NO errors: `{ errors: null }`
  //
  // This pattern lets us distinguish between:
  //   - "Form hasn't been submitted yet" (initial state: `{ errors: null }`)
  //   - "Form was submitted and has errors" (`{ errors: [...] }`)
  //   - "Form was submitted and is valid" (`{ errors: null }`)
  //
  // NOTE: The shape of this object is entirely up to you! You could return:
  //   - `{ errors: [...] }` (what we're doing)
  //   - `{ validationErrors: [...] }`
  //   - `{ messages: { errors: [...] } }`
  //   - Or any other structure that fits your needs
  // ---------------------------------------------------------------------------
  
  if (errors.length > 0) {
    // We have validation errors. Return them so they can be displayed to the user.
    //
    // JavaScript shortcut: `{ errors }` is equivalent to `{ errors: errors }`
    // This is called "shorthand property names" in ES6.
    return { errors };
  }

  // If we reach this point, the data passed all validation checks.
  // Return `{ errors: null }` to indicate "no errors" (form is valid).
  //
  // You could now:
  //   - Send the data to a backend API
  //   - Trigger a state update
  //   - Navigate the user somewhere else, etc.
  //
  // For now, we just return the "no errors" state.
  return { errors: null };
}

export default function Signup() {
  // ===========================================================================
  // COMPONENT FUNCTION WITH useActionState HOOK
  // ===========================================================================
  // This component now demonstrates how to use `useActionState` to:
  //   1. Connect a form action function to form state management
  //   2. Access the return value from the action function
  //   3. Display validation errors to the user
  //
  // ===========================================================================
  // THE useActionState HOOK
  // ===========================================================================
  // `useActionState` is a **new hook introduced in React 19**.
  // It's specifically designed to work with form actions.
  //
  // Purpose:
  //   - Manages state related to form actions
  //   - Gives you access to the return value from your action function
  //   - Provides a "pending" flag for async operations (useful later)
  //
  // Syntax:
  //   const [formState, formAction, pending] = useActionState(actionFunction, initialState);
  //
  // Parameters:
  //   1. `actionFunction` - Your form action function (e.g. `signUpAction`)
  //   2. `initialState` - The initial state before the form is submitted
  //
  // Returns (array with 3 elements):
  //   1. `formState` - Current form state (starts as `initialState`, then becomes
  //                    whatever your action function returns)
  //   2. `formAction` - Enhanced version of your action function (use this in JSX)
  //   3. `pending` - Boolean indicating if the action is currently executing
  //                  (useful for async actions, which we'll cover later)
  //
  // IMPORTANT: You MUST use the `formAction` returned by `useActionState` in your
  // JSX, NOT the original `signUpAction` function directly!
  //
  // Why? Because React wraps your original function to:
  //   - Track when it's called
  //   - Update `formState` with the return value
  //   - Set `pending` appropriately
  // ===========================================================================

  // ---------------------------------------------------------------------------
  // SETTING UP useActionState
  // ---------------------------------------------------------------------------
  // We pass:
  //   1. `signUpAction` - Our action function (defined above)
  //   2. `{ errors: null }` - Initial state (no errors before submission)
  //
  // We get back:
  //   - `formState` - Will contain `{ errors: null }` initially, then whatever
  //                   `signUpAction` returns (either `{ errors: [...] }` or
  //                   `{ errors: null }`)
  //   - `formAction` - Enhanced version of `signUpAction` to use in JSX
  //   - `pending` - Not used in this lesson (but available for async actions)
  // ---------------------------------------------------------------------------
  const [formState, formAction, pending] = useActionState(signUpAction, {
    errors: null,
  });

  return (
    // -------------------------------------------------------------------------
    // THE `action` PROP (NOW USING formAction FROM useActionState)
    // -------------------------------------------------------------------------
    // IMPORTANT: We use `formAction` here, NOT `signUpAction` directly!
    //
    // `formAction` is the "enhanced" version of `signUpAction` that React
    // creates internally. It:
    //   - Calls your original `signUpAction` function
    //   - Updates `formState` with the return value
    //   - Manages the `pending` flag
    //
    // If you used `signUpAction` directly here, `useActionState` wouldn't
    // know when the action runs, and `formState` would never update!
    // -------------------------------------------------------------------------
    <form action={formAction}>
      {/* =======================================================================
          FORM HEADER
          =======================================================================
          Welcome message and instructions for the user.
          ======================================================================= */}
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      {/* =======================================================================
          EMAIL INPUT
          =======================================================================
          Single email input field.
          
          Notice the `name="email"` attribute - this is crucial for form actions
          to be able to extract the value later.
          ======================================================================= */}
      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      {/* =======================================================================
          PASSWORD INPUTS
          =======================================================================
          Two password fields side by side:
          - Password: The user's chosen password
          - Confirm Password: To verify they typed it correctly
          
          Both have `name` attributes so we can extract their values.
          ======================================================================= */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      {/* =======================================================================
          NAME INPUTS
          =======================================================================
          First name and last name fields, displayed side by side.
          ======================================================================= */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      {/* =======================================================================
          ROLE SELECT DROPDOWN
          =======================================================================
          A dropdown menu for selecting the user's role.
          
          Note: The label says "What best describes your role?" but the
          `htmlFor` points to "role" (the select's id). This is correct.
          
          The select has `name="role"` so we can extract the selected value.
          ======================================================================= */}
      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* =======================================================================
          ACQUISITION CHECKBOXES (FIELD SET)
          =======================================================================
          A group of checkboxes for "How did you find us?"
          
          IMPORTANT: All checkboxes share the same `name="acquisition"` but have
          different `value` attributes. This means:
          - Users can select multiple options
          - When extracting values, we'll get an array of selected values
          - This is a common pattern for multi-select checkbox groups
          ======================================================================= */}
      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      {/* =======================================================================
          TERMS AND CONDITIONS CHECKBOX
          =======================================================================
          A single checkbox for agreeing to terms and conditions.
          
          Notice the structure: the input is INSIDE the label. This is valid
          HTML and means clicking the label text will also toggle the checkbox.
          
          The checkbox has `name="terms"` so we can check if it's checked.
          ======================================================================= */}
      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      {/* =======================================================================
          ERROR MESSAGES DISPLAY
          =======================================================================
          Display validation errors to the user if any exist.
          
          HOW IT WORKS:
          ------------
          When the form is submitted:
            1. `signUpAction` runs and validates the form data
            2. If there are errors, it returns `{ errors: ['error1', 'error2', ...] }`
            3. If there are no errors, it returns `{ errors: null }`
            4. React updates `formState` with this return value
            5. We check `formState.errors` here to conditionally render errors
          
          CONDITIONAL RENDERING:
          ----------------------
          `formState.errors` can be:
            - `null` → No errors (or form hasn't been submitted yet)
            - `['error1', 'error2', ...]` → Array of error messages
          
          We use `formState.errors && ...` to check if errors exist.
          This works because:
            - `null && <ul>...</ul>` → `null` (nothing renders)
            - `['error1'] && <ul>...</ul>` → `<ul>...</ul>` (errors render)
          
          NOTE: The CSS class is "error" (singular), not "errors" (plural).
          This matches the styling defined in the project's CSS file.
          ======================================================================= */}
      {formState.errors && (
        <ul className="error">
          {/* Map through each error message and display it as a list item */}
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {/* =======================================================================
          FORM ACTION BUTTONS
          =======================================================================
          Two buttons at the bottom of the form:
          
          1. RESET BUTTON (type="reset")
             - Has `type="reset"` which means it will clear all form fields
             - This is a native HTML feature - no JavaScript needed
             - Styled with "button-flat" class for a secondary appearance
          
          2. SIGN UP BUTTON (type="submit" by default)
             - No explicit `type` attribute, so it defaults to "submit"
             - This button will trigger our **form action**
             - React will call `formAction` (from useActionState) when clicked
             - `formAction` internally calls `signUpAction` and updates `formState`
          ======================================================================= */}
      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}

// =============================================================================
// WHAT WE LEARNED IN THIS LESSON
// =============================================================================
//
// In this lesson, we learned how to:
//
//   1. RETURN VALUES FROM FORM ACTIONS
//      - Form actions can return any value (object, array, string, null, etc.)
//      - We return `{ errors: [...] }` when there are errors
//      - We return `{ errors: null }` when the form is valid
//
//   2. USE THE useActionState HOOK
//      - Import `useActionState` from 'react'
//      - Call it with: `useActionState(actionFunction, initialState)`
//      - Get back: `[formState, formAction, pending]`
//      - Use `formAction` (not the original function) in your JSX
//
//   3. ACCESS ACTION RETURN VALUES
//      - `formState` contains whatever your action function returns
//      - Initially, it's the `initialState` you provided
//      - After submission, it becomes the return value from your action
//
//   4. DISPLAY ERRORS TO THE USER
//      - Check if `formState.errors` is truthy (not null)
//      - Conditionally render an error list
//      - Map through the errors array to display each message
//
//   5. UNDERSTAND THE ACTION FUNCTION SIGNATURE CHANGE
//      - WITHOUT useActionState: `function signUpAction(formData) { ... }`
//      - WITH useActionState: `function signUpAction(previousState, formData) { ... }`
//      - The first parameter is the previous state (even if you don't use it)
//
// =============================================================================
// CURRENT LIMITATION: FORM RESETS AFTER SUBMISSION
// =============================================================================
//
// Right now, there's a UX problem:
//   - When you submit the form (even with errors), React automatically resets
//     all form fields
//   - This means valid values you entered get cleared, which is frustrating!
//
// Example:
//   - User enters a valid email: "test@example.com"
//   - User forgets to enter a password
//   - User clicks "Sign up"
//   - Errors appear, BUT the email field is now empty (cleared by React)
//   - User has to re-enter the email, which is annoying
//
// In the next lesson, we'll learn how to prevent this automatic reset and
// keep user-entered values in the form fields even after submission.
//
// =============================================================================
// WHAT'S NEXT?
// =============================================================================
//
// In upcoming lessons, you'll learn:
//
//   1. How to prevent automatic form reset (keep user values)
//   2. Handle asynchronous actions (e.g. sending data to a server)
//   3. Implement optimistic updating for a snappy UX
//
// Remember: Form Actions are **one** way of handling forms in React 19+.
// The "classic" `onSubmit` + `event` + `preventDefault` approach is still
// valid and important to understand – you will encounter both patterns
// in real-world React codebases.
//
// =============================================================================


