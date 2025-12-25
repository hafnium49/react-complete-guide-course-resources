// =============================================================================
// LOGIN COMPONENT - Handling Form Submission
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

export default function Login() {
  // ===========================================================================
  // HANDLING FORM SUBMISSION
  // ===========================================================================
  //
  // This function is called when the form is submitted.
  // It receives an EVENT OBJECT automatically from the browser.
  //
  // IMPORTANT: We could also use onClick on the button, but using onSubmit
  // on the form is MORE ELEGANT because:
  //   1. It works when user presses Enter in any field
  //   2. The event object has special methods for forms
  //   3. It's the semantically correct way to handle form submission
  //
  // ===========================================================================
  function handleSubmit(event) {
    // -------------------------------------------------------------------------
    // PREVENTING DEFAULT BROWSER BEHAVIOR
    // -------------------------------------------------------------------------
    //
    // WHY IS THIS NECESSARY?
    // ----------------------
    // When a form is submitted, the browser's DEFAULT behavior is to:
    //   1. Collect all form data
    //   2. Generate an HTTP request
    //   3. Send it to the server (the form's 'action' URL, or current URL)
    //   4. RELOAD the page with the server's response
    //
    // This default behavior exists because before Single Page Apps (SPAs),
    // forms were handled by the SERVER. The browser would send the form data,
    // and the server would respond with a new HTML page.
    //
    // THE PROBLEM IN REACT:
    // ---------------------
    // In a React app:
    //   - The page reload would RESET all React state
    //   - The console log would disappear (page refreshed)
    //   - The URL gets query parameters added (?email=...&password=...)
    //   - The development server is NOT prepared to handle form submissions
    //   - Even a production server often just serves static files
    //
    // Without preventDefault(), if you click "Login":
    //   1. You'd briefly see "Submitted!" in the console
    //   2. The page would immediately reload
    //   3. The console would be cleared
    //   4. The URL would change to something like: localhost:5174/?email=&password=
    //
    // THE SOLUTION:
    // -------------
    // Call event.preventDefault() FIRST, before any other logic.
    // This tells the browser: "Don't do your default thing, I'll handle it!"
    //
    // This is a VERY COMMON PATTERN in React applications:
    //   function handleSubmit(event) {
    //     event.preventDefault();  // Always first!
    //     // ...rest of your submission logic
    //   }
    //
    // -------------------------------------------------------------------------
    event.preventDefault();

    // -------------------------------------------------------------------------
    // NOW WE CAN ADD OUR CUSTOM LOGIC
    // -------------------------------------------------------------------------
    // After preventing the default behavior, we can:
    //   - Extract the entered values
    //   - Validate the data
    //   - Send our own HTTP request to a backend
    //   - Update React state
    //   - Navigate to another page
    //   - etc.
    //
    // For now, we just log to confirm the form submission is working.
    // The page should NOT reload, and "Submitted!" should stay in the console.
    // -------------------------------------------------------------------------
    console.log('Submitted!');

    // TODO: Next steps we'll implement:
    // 1. Extract the email and password values (multiple approaches)
    // 2. Validate the input
    // 3. Send data to a backend or process it
  }

  // ===========================================================================
  // ALTERNATIVE APPROACH: onClick on the Button
  // ===========================================================================
  //
  // You COULD handle submission by adding onClick to the button:
  //
  //   <button onClick={handleSubmit}>Login</button>
  //
  // But this has a PROBLEM: the form still submits and reloads the page!
  //
  // To fix that, you'd need to either:
  //   a) Add type="button" to prevent form submission
  //   b) Still call event.preventDefault() in the handler
  //
  // Using onSubmit on the <form> is BETTER because:
  //   1. It catches ALL submission methods (button click, Enter key, etc.)
  //   2. It's semantically correct (forms have submit events)
  //   3. The event object is specifically for form submission
  //
  // ===========================================================================

  // ===========================================================================
  // BUTTON TYPE ATTRIBUTE - IMPORTANT!
  // ===========================================================================
  //
  // Buttons inside forms have a DEFAULT type of "submit"!
  //
  //   <button>Login</button>
  //   // Is the same as:
  //   <button type="submit">Login</button>
  //
  // This means clicking the button SUBMITS THE FORM.
  //
  // If you DON'T want a button to submit the form, set type="button":
  //
  //   <button type="button">Reset</button>
  //   // This button won't submit the form
  //
  // This is why our Reset button has type="button" - we don't want
  // clicking Reset to submit the form!
  //
  // ===========================================================================

  // ===========================================================================
  // THE htmlFor ATTRIBUTE
  // ===========================================================================
  //
  // In HTML, you use the "for" attribute on labels:
  //   <label for="email">Email</label>
  //
  // But in JSX (React), "for" is a RESERVED WORD in JavaScript!
  // (It's used for for-loops: for (let i = 0; i < 10; i++) { ... })
  //
  // So React uses "htmlFor" instead:
  //   <label htmlFor="email">Email</label>
  //
  // This is similar to how we use "className" instead of "class"
  // (because "class" is also reserved in JavaScript).
  //
  // The htmlFor/for attribute connects a label to an input:
  //   - Clicking the label focuses the input
  //   - Screen readers can associate them
  //   - Better accessibility and usability
  //
  // ===========================================================================

  return (
    // =========================================================================
    // THE FORM ELEMENT WITH onSubmit HANDLER
    // =========================================================================
    //
    // We add onSubmit={handleSubmit} to listen for form submissions.
    //
    // The form's 'submit' event fires when:
    //   - User clicks a submit button (type="submit" or no type specified)
    //   - User presses Enter while focused on an input
    //
    // This is the STANDARD PATTERN for handling forms in React:
    //   <form onSubmit={handleSubmit}>
    //     ...inputs...
    //     <button>Submit</button>
    //   </form>
    //
    // =========================================================================
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {/* =====================================================================
          INPUT GROUP: Email and Password
          ===================================================================== */}
      <div className="control-row">
        <div className="control no-margin">
          {/*
            LABEL htmlFor ATTRIBUTE:
            -------------------------
            In HTML it's "for", but in JSX we use "htmlFor" because
            "for" is a reserved JavaScript keyword (used in for-loops).

            Same reason we use "className" instead of "class".

            This connects the label to the input with matching id.
            Clicking the label will focus the input.
          */}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      {/* =====================================================================
          FORM ACTIONS: Reset and Submit Buttons
          ===================================================================== */}
      <p className="form-actions">
        {/*
          RESET BUTTON - type="button"
          -----------------------------
          We set type="button" explicitly so this button does NOT
          submit the form. Without this, clicking Reset would also
          trigger form submission!

          Remember: The DEFAULT type for buttons in forms is "submit"!
        */}
        <button type="button" className="button button-flat">
          Reset
        </button>

        {/*
          LOGIN BUTTON - type="submit" (default)
          --------------------------------------
          No type specified, so it defaults to type="submit".

          When clicked, it will:
            1. Trigger the form's 'submit' event
            2. Our handleSubmit function runs
            3. event.preventDefault() stops the page reload
            4. We can then process the form data

          We could explicitly write type="submit" but it's not needed.
        */}
        <button className="button">Login</button>
      </p>
    </form>
  );
}

// =============================================================================
// WHY THE PAGE WAS RELOADING (Before We Fixed It)
// =============================================================================
//
// THE PROBLEM:
// ------------
// Without our onSubmit handler and event.preventDefault():
//
//   1. User clicks the Login button
//   2. Button type defaults to "submit"
//   3. Form generates an HTTP request with the form data
//   4. Browser sends request to current URL (localhost:5174)
//   5. Page reloads with the response
//   6. URL changes to: localhost:5174/?email=...&password=...
//   7. All React state is lost
//   8. Console is cleared
//
// THE FIX:
// --------
//   1. Add onSubmit={handleSubmit} to the form
//   2. In handleSubmit, call event.preventDefault() FIRST
//   3. Now the form doesn't reload the page
//   4. We can handle the data with JavaScript instead
//
// =============================================================================

// =============================================================================
// FORM ACTIONS (React 19+) - PREVIEW
// =============================================================================
//
// React 19 introduced a new way to handle forms called "Form Actions".
//
// Instead of:
//   <form onSubmit={handleSubmit}>
//
// You can use:
//   <form action={handleSubmit}>
//
// This is a more modern approach that we'll explore in the NEXT section.
//
// For now, we're using the traditional onSubmit approach because:
//   1. It works in ALL React versions
//   2. It's what you'll see in most existing React projects
//   3. Understanding it helps you understand Form Actions too
//
// Form Actions offer some benefits like:
//   - Automatic pending states
//   - Progressive enhancement
//   - Better integration with Server Components
//
// But the onSubmit approach is still perfectly valid and widely used!
//
// =============================================================================

// =============================================================================
// NEXT STEPS: EXTRACTING FORM VALUES
// =============================================================================
//
// Now that we can handle form submission without page reload,
// the next step is to EXTRACT THE VALUES the user entered.
//
// We have THREE approaches:
//
//   1. STATE (Controlled Components)
//      - Track each input's value with useState
//      - Update state on every keystroke
//      - Full control, but more code
//
//   2. REFS (Uncontrolled Components)
//      - Use useRef to access DOM elements
//      - Read values only when needed
//      - Less code, but less control
//
//   3. FORMDATA API (Browser Built-in)
//      - Use new FormData(event.target) to get all values
//      - Very clean and concise
//      - Works with the 'name' attribute on inputs
//
// We'll explore all three in the upcoming lessons!
//
// =============================================================================
