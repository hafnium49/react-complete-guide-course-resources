// =============================================================================
// LOGIN COMPONENT - Our Form to Experiment With
// =============================================================================
//
// WHAT IS A FORM?
// ---------------
// A form is simply a COLLECTION OF INPUT FIELDS:
//   - Typically used with labels (for accessibility)
//   - Wrapped by the built-in HTML <form> element
//
// This login form has:
//   - Email input
//   - Password input
//   - Reset button
//   - Login (submit) button
//
// =============================================================================
// THE TWO MAIN CHALLENGES WITH FORMS
// =============================================================================
//
// 1. HANDLE SUBMISSION & EXTRACT VALUES (Relatively Easy!)
//    - Get the data the user entered
//    - We have 3 approaches: State, Refs, or FormData API
//
// 2. VALIDATE DATA & SHOW ERRORS (The Tricky Part!)
//    - Check if data is valid
//    - Show helpful error messages
//    - The challenge: WHEN to validate?
//
// =============================================================================
// CURRENT STATE OF THIS FORM
// =============================================================================
//
// Right now, this form doesn't DO anything. When you click Login:
//   1. The browser's DEFAULT behavior happens
//   2. The page RELOADS (form submits to current URL)
//   3. Any data entered is lost
//
// This is the STARTING POINT. We'll progressively add:
//   - Form submission handling (prevent reload)
//   - Input value extraction (state, refs, FormData)
//   - Validation logic (on change, on blur, on submit)
//   - Error messages (when and how to show them)
//
// =============================================================================

export default function Login() {
  // ===========================================================================
  // THE HTML FORM ELEMENT
  // ===========================================================================
  //
  // <form> is a special HTML element that:
  //   1. Groups related inputs together
  //   2. Handles submission via the 'submit' event
  //   3. Supports default validation attributes
  //   4. Can submit data to a server URL (via action/method attributes)
  //
  // DEFAULT BROWSER BEHAVIOR:
  // -------------------------
  // When a form is submitted (e.g., clicking a submit button):
  //   1. The browser collects all form data
  //   2. It sends an HTTP request to the form's 'action' URL
  //   3. The page RELOADS with the server's response
  //
  // This default behavior made sense before Single Page Apps (SPAs).
  // In React, we usually want to:
  //   1. PREVENT the default reload
  //   2. Handle submission with JavaScript
  //   3. Stay on the same page
  //
  // ===========================================================================

  return (
    <form>
      {/* =====================================================================
          FORM HEADING
          =====================================================================
          Just a simple heading to identify the form.
          In a real app, this might be styled more prominently.
          ===================================================================== */}
      <h2>Login</h2>

      {/* =====================================================================
          INPUT GROUP: Email and Password
          =====================================================================
          We use className="control-row" for horizontal layout.
          Each input is wrapped in a "control" div for styling.

          INPUT ATTRIBUTES EXPLAINED:
          ---------------------------
          - id: For connecting <label> to <input> (accessibility)
          - type: Determines input behavior and mobile keyboard
          - name: IMPORTANT for form data extraction (we'll use this later!)

          type="email":
            - Shows email-specific keyboard on mobile
            - Browser can provide basic email format validation

          type="password":
            - Masks the input (shows dots instead of text)
            - Browsers may offer password managers

          name="email" / name="password":
            - These names are used when extracting form data
            - They become property names in FormData
            - Essential for server-side form handling
          ===================================================================== */}
      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
          {/*
            LABEL + INPUT CONNECTION:
            -------------------------
            The htmlFor attribute connects the label to the input.
            When users click the label, the input gets focused.
            This is important for:
              - Accessibility (screen readers)
              - UX (larger click target)
              - Mobile usability

            In HTML, it's "for". In React/JSX, it's "htmlFor"
            (because "for" is a reserved word in JavaScript).
          */}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      {/* =====================================================================
          FORM ACTIONS: Reset and Submit Buttons
          =====================================================================

          BUTTON TYPES IN FORMS:
          ----------------------
          Buttons inside forms have special behavior based on their type:

          type="submit" (DEFAULT):
            - Triggers form submission
            - Causes the 'submit' event to fire
            - This is the DEFAULT if no type is specified!

          type="button":
            - Does nothing by default
            - Just a regular button
            - Won't trigger form submission

          type="reset":
            - Resets all form inputs to their initial values
            - Built-in browser behavior, no JavaScript needed!

          IMPORTANT: If you don't specify a type, buttons default to "submit"!

          In our form:
          - Reset button: Uses type="button" (we'll add reset logic ourselves)
          - Login button: Uses default type (submit) - triggers form submission
          ===================================================================== */}
      <p className="form-actions">
        {/*
          RESET BUTTON
          ------------
          className="button-flat" gives it a less prominent style.

          Note: We could use type="reset" for automatic reset behavior,
          but we're using type="button" so we can demonstrate
          custom reset logic later.

          For now, clicking this does nothing (no onClick handler yet).
        */}
        <button className="button button-flat">Reset</button>

        {/*
          LOGIN (SUBMIT) BUTTON
          ---------------------
          No type specified, so it defaults to type="submit".

          When clicked, this will:
            1. Trigger the form's 'submit' event
            2. Currently: causes page reload (default browser behavior)
            3. Later: we'll add an onSubmit handler to prevent this

          className="button" gives it the primary button styling.
        */}
        <button className="button">Login</button>
      </p>
    </form>
  );
}

// =============================================================================
// WHAT'S NEXT?
// =============================================================================
//
// In the upcoming lessons, we'll add:
//
// 1. FORM SUBMISSION HANDLING (Easy!)
//    - onSubmit event handler on the <form>
//    - event.preventDefault() to stop page reload
//    - Extract the email and password values
//
// 2. THREE APPROACHES TO EXTRACT DATA (Easy!)
//    - State (controlled): useState + two-way binding
//    - Refs (uncontrolled): useRef to access DOM elements
//    - FormData API: Browser's built-in form data extraction (NEW!)
//
// 3. VALIDATION - THE TRICKY PART!
//    The challenge is WHEN to validate:
//
//    a) ON EVERY KEYSTROKE
//       - Check as user types
//       - Problem: Errors shown TOO EARLY!
//       - "Invalid email" after typing just "t" - annoying!
//
//    b) ON BLUR (When Field Loses Focus)
//       - Check when user tabs/clicks away
//       - Problem: Errors may show TOO LONG!
//       - Error stays until user leaves field again
//
//    c) ON FORM SUBMISSION
//       - Check only when user clicks submit
//       - Problem: Errors shown TOO LATE!
//       - User fills entire form before seeing mistakes
//
//    SOLUTION: Combine approaches for best UX!
//    - Submit: Initial validation
//    - Blur: Per-field feedback
//    - Change: Clear errors as user fixes them
//
// 4. USER EXPERIENCE IMPROVEMENTS
//    - Reset button functionality
//    - Disable submit while invalid
//    - Loading states during submission
//
// =============================================================================

// =============================================================================
// FORM INPUT TYPES REFERENCE
// =============================================================================
//
// HTML5 introduced many input types. Here are the most common:
//
// TEXT INPUTS:
//   type="text"      - General text input
//   type="email"     - Email with basic format validation
//   type="password"  - Masked text for passwords
//   type="tel"       - Phone number (special keyboard on mobile)
//   type="url"       - URL with format validation
//   type="search"    - Search input (may have clear button)
//
// NUMBER INPUTS:
//   type="number"    - Numeric input with up/down buttons
//   type="range"     - Slider control
//
// DATE/TIME INPUTS:
//   type="date"      - Date picker
//   type="time"      - Time picker
//   type="datetime-local" - Date and time picker
//
// SELECTION INPUTS:
//   type="checkbox"  - Boolean on/off toggle
//   type="radio"     - One-of-many selection
//   <select>         - Dropdown menu (not an input type)
//
// FILE INPUTS:
//   type="file"      - File upload
//
// OTHER:
//   type="color"     - Color picker
//   type="hidden"    - Hidden data (not visible to user)
//
// We'll explore several of these throughout this section!
//
// =============================================================================
