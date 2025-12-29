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
// FIRST FORM ACTION IMPLEMENTATION
// -----------------------------------------------------------------------------
// According to the lesson, we now:
//   - Create a function (initially called `handleSubmit` in the video)
//   - Then rename it to `signUpAction` to better reflect its purpose
//
// We'll skip the temporary `handleSubmit` name here and go straight to the
// final name that the instructor ends up with: `signUpAction`.
// -----------------------------------------------------------------------------
function signUpAction(formData) {
  // ---------------------------------------------------------------------------
  // `formData` PARAMETER
  // ---------------------------------------------------------------------------
  // This is an instance of the built-in `FormData` class, automatically
  // created and provided by React when the form is submitted.
  //
  // In the previous section, you saw:
  //   const formData = new FormData(event.target);
  //
  // where `event.target` was the submitted form element. That manual step is
  // no longer needed when using Form Actions – React does it for you.
  // ---------------------------------------------------------------------------

  // Extract the submitted email value.
  //
  // IMPORTANT:
  //   - The string `'email'` below MUST match the `name="email"` attribute
  //     on the corresponding `<input>` field.
  //   - If you rename the `name` attribute in the JSX, you must update the
  //     key used here as well.
  const enteredEmail = formData.get('email');

  // For this first step, the instructor only extracts the email and logs it.
  // You could also extract all other fields here in the same way:
  //   const password = formData.get('password');
  //   const firstName = formData.get('first-name');
  //   const role = formData.get('role');
  //
  // Logging helps you verify that the form action is called correctly and that
  // the FormData object contains the values you expect.
  console.log('Submitted email via form action:', enteredEmail);

  // NOTE (from the lesson):
  // After submission, you might notice that the form fields are cleared.
  // That's because React **automatically resets the form** after the action
  // has been executed.
  //
  // Later in this section, you’ll learn how to **keep** the user-entered
  // values (instead of resetting them) if that’s the behavior you want.
}

export default function Signup() {
  // ===========================================================================
  // COMPONENT FUNCTION
  // ===========================================================================
  // This component now demonstrates:
  //   - How to register a **form action** via the `action` prop on `<form>`.
  //   - How React 19+ calls `signUpAction(formData)` on submit.
  //
  // Mentally compare this with the older `onSubmit` + `event` + `preventDefault`
  // pattern you learned before – both are useful and valid.
  // ===========================================================================

  return (
    // -------------------------------------------------------------------------
    // THE `action` PROP (FORM ACTIONS IN ACTION!)
    // -------------------------------------------------------------------------
    // By setting `action={signUpAction}`, we tell React:
    //   "When this form is submitted, build a FormData object and pass it
    //    into `signUpAction`."
    //
    // React will:
    //   - Intercept the submit event
    //   - Call `preventDefault()` internally
    //   - Create a FormData object from all form inputs that have a `name`
    //   - Invoke `signUpAction(formData)`
    //
    // You do NOT write any event-handling or `preventDefault()` code yourself
    // here – that’s the core convenience of the Form Actions feature.
    // -------------------------------------------------------------------------
    <form action={signUpAction}>
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
             - React will call `signUpAction(formData)` when this is clicked
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
// WHAT'S NEXT?
// =============================================================================
//
// In the upcoming lessons, you'll build on this foundation and:
//
//   1. Extract more than just the email value
//   2. Add validation using utility functions
//   3. Handle asynchronous actions (e.g. sending the data to a server)
//   4. Implement optimistic updating for a snappy UX
//
// Remember: Form Actions are **one** way of handling forms in React 19+.
// The "classic" `onSubmit` + `event` + `preventDefault` approach is still
// valid and important to understand – you will encounter both patterns
// in real-world React codebases.
//
// =============================================================================


