// =============================================================================
// SIGNUP COMPONENT - Using FormData API (APPROACH 3)
// =============================================================================
//
// This is a MORE COMPLEX form with many inputs:
//   - Email
//   - Password & Confirm Password
//   - First Name & Last Name
//   - Role (select dropdown)
//   - How did you find us? (multiple checkboxes with SAME name)
//   - Terms agreement (single checkbox)
//
// PROBLEM with State/Refs:
// -------------------------
// With STATE approach:
//   - Need useState for each input (8+ state variables!)
//   - Need onChange handler for each input
//   - Lots of repetitive code
//
// With REFS approach:
//   - Need useRef for each input (8+ refs!)
//   - Need to set ref prop on each input
//   - Still lots of repetitive code
//
// SOLUTION: FormData API
// ----------------------
// The browser provides a built-in FormData object that:
//   ✓ Automatically extracts ALL form values
//   ✓ No state or refs needed
//   ✓ Works with any number of inputs
//   ✓ Very clean and concise code
//
// The ONLY requirement: All inputs must have a 'name' attribute!
//
// =============================================================================

export default function Signup() {
  // ===========================================================================
  // FORM SUBMISSION HANDLER - Using FormData API
  // ===========================================================================
  function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload (as always!)

    // -------------------------------------------------------------------------
    // RESETTING THE FORM - Three Approaches
    // -------------------------------------------------------------------------
    //
    // APPROACH 1: Reset Button with type="reset" (What we use)
    // ---------------------------------------------------------
    // The simplest approach is to use a button with type="reset":
    //   <button type="reset">Reset</button>
    //
    // This is BUILT INTO THE BROWSER! No JavaScript needed.
    // When clicked, it automatically clears all form inputs.
    //
    // APPROACH 2: Programmatic Reset with event.target.reset() (Recommended)
    // -----------------------------------------------------------------------
    // You can reset the form programmatically:
    //   event.target.reset();
    //
    // event.target is the <form> element.
    // Form elements have a built-in reset() method.
    //
    // This is the SAME as clicking a type="reset" button!
    //
    // When to use this?
    //   - After successful form submission
    //   - After sending data to backend
    //   - To clear form after processing
    //
    // Example:
    //   fetch('/api/signup', { method: 'POST', body: formData })
    //     .then(() => event.target.reset());  // Clear form on success
    //
    // APPROACH 3: Manual Reset with State (For Controlled Components)
    // ----------------------------------------------------------------
    // If using useState (controlled components), reset state:
    //   setEnteredValues({ email: '', password: '' });
    //
    // Since inputs are controlled by state, resetting state clears inputs.
    //
    // See StateLogin.jsx for an example of this approach.
    //
    // APPROACH 4: Manual Reset with Refs (NOT RECOMMENDED!)
    // ------------------------------------------------------
    // With refs, you COULD do:
    //   emailRef.current.value = '';
    //   passwordRef.current.value = '';
    //
    // But this is DISCOURAGED because:
    //   - You're directly manipulating the DOM
    //   - React's philosophy is to let React control the UI
    //   - Can cause bugs if React re-renders
    //
    // Instead, use event.target.reset() (Approach 2).
    //
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // STEP 1: Create FormData Object from the Form
    // -------------------------------------------------------------------------
    //
    // The FormData constructor is built into the browser (not React).
    //
    // It takes a <form> element as input and creates an object that
    // contains all the form's input values.
    //
    // HOW TO GET THE FORM ELEMENT?
    // -----------------------------
    // event.target is the element that triggered the event.
    // Since this is a 'submit' event on the <form>, event.target IS the form!
    //
    // REQUIREMENT: All inputs must have a 'name' attribute!
    // ------------------------------------------------------
    // FormData uses the 'name' attribute to identify inputs:
    //   <input name="email" />       → FormData will have 'email' key
    //   <input name="first-name" />  → FormData will have 'first-name' key
    //
    // Without 'name', FormData won't know what to call the value!
    //
    // -------------------------------------------------------------------------
    const fd = new FormData(event.target);

    // -------------------------------------------------------------------------
    // STEP 2: Extract Individual Values (Optional)
    // -------------------------------------------------------------------------
    //
    // You CAN get individual values using the get() method:
    //
    //   const email = fd.get('email');
    //   const password = fd.get('password');
    //   const firstName = fd.get('first-name');
    //   // ... repeat for all inputs
    //
    // But this gets repetitive for many inputs!
    // Let's use a better approach...
    //
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // STEP 3: Convert ALL Values to an Object (Better Approach!)
    // -------------------------------------------------------------------------
    //
    // MAGIC LINE: Object.fromEntries(fd.entries())
    // ---------------------------------------------
    //
    // Let's break this down:
    //
    // 1. fd.entries()
    //    Returns an iterator of [name, value] pairs:
    //    [
    //      ['email', 'test@test.com'],
    //      ['password', 'abc123'],
    //      ['confirm-password', 'abc123'],
    //      ['first-name', 'John'],
    //      ['last-name', 'Doe'],
    //      ['role', 'student'],
    //      ['terms', 'on'],
    //      // Note: 'acquisition' checkboxes are missing! (We'll fix this)
    //    ]
    //
    // 2. Object.fromEntries(...)
    //    Converts the array of [key, value] pairs into an object:
    //    {
    //      email: 'test@test.com',
    //      password: 'abc123',
    //      'confirm-password': 'abc123',
    //      'first-name': 'John',
    //      'last-name': 'Doe',
    //      role: 'student',
    //      terms: 'on'
    //    }
    //
    // ONE LINE OF CODE for ALL inputs! Very clean!
    //
    // -------------------------------------------------------------------------
    const data = Object.fromEntries(fd.entries());

    // -------------------------------------------------------------------------
    // STEP 4: Handle Multi-Value Inputs (Checkboxes with Same Name)
    // -------------------------------------------------------------------------
    //
    // PROBLEM: Multiple checkboxes with the SAME name are lost!
    // ----------------------------------------------------------
    //
    // In our form, we have:
    //   <input type="checkbox" name="acquisition" value="google" />
    //   <input type="checkbox" name="acquisition" value="friend" />
    //   <input type="checkbox" name="acquisition" value="other" />
    //
    // All three have name="acquisition"!
    //
    // When using fd.entries(), only the LAST checked box is included.
    // The others are lost because they have the same key name.
    //
    // SOLUTION: Use fd.getAll() for multi-value inputs
    // -------------------------------------------------
    //
    // getAll() returns an ARRAY of all values with that name:
    //   - If user checked "Google" and "Friend":
    //     fd.getAll('acquisition') → ['google', 'friend']
    //   - If user checked only "Google":
    //     fd.getAll('acquisition') → ['google']
    //   - If user checked nothing:
    //     fd.getAll('acquisition') → []
    //
    // -------------------------------------------------------------------------
    const acquisitionChannel = fd.getAll('acquisition');

    // Add the acquisition channels to our data object
    data.acquisition = acquisitionChannel;

    // -------------------------------------------------------------------------
    // NOW WE HAVE ALL THE DATA!
    // -------------------------------------------------------------------------
    //
    // data now contains:
    //   {
    //     email: 'test@test.com',
    //     password: 'abc123',
    //     'confirm-password': 'abc123',
    //     'first-name': 'John',
    //     'last-name': 'Doe',
    //     role: 'student',
    //     terms: 'on',  // 'on' if checked, undefined if not
    //     acquisition: ['google', 'friend']  // Array of checked values
    //   }
    //
    // We can now:
    //   - Validate the data
    //   - Send it to a backend API
    //   - Process it however we need
    //
    // -------------------------------------------------------------------------
    console.log(data);

    // -------------------------------------------------------------------------
    // OPTIONAL: Reset the form after successful submission
    // -------------------------------------------------------------------------
    //
    // After processing the data (e.g., sending to backend), you might want
    // to clear the form so the user can submit again.
    //
    // Uncomment this line to reset the form after submission:
    //   event.target.reset();
    //
    // In this demo, we DON'T reset so you can see the data you entered.
    // But in a real app, you'd typically reset after successful API call:
    //
    //   fetch('/api/signup', { method: 'POST', body: data })
    //     .then(response => {
    //       if (response.ok) {
    //         event.target.reset();  // Clear form on success
    //         // Show success message
    //       }
    //     });
    //
    // -------------------------------------------------------------------------

    // TODO: In a real app, we would:
    // - Validate passwords match (data.password === data['confirm-password'])
    // - Check if terms are accepted (data.terms === 'on')
    // - Validate email format
    // - Send data to backend API
    // - Show success/error messages
    // - Reset form on successful submission
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      {/* =====================================================================
          EMAIL INPUT
          =====================================================================

          name="email" is REQUIRED for FormData to work!

          FormData will extract this as:
            { email: 'user typed value' }

          ===================================================================== */}
      <div className="control">
        <label htmlFor="email">Email</label>
        {/* must have name attribute for FormData */}
        <input id="email" type="email" name="email" />
      </div>

      {/* =====================================================================
          PASSWORD INPUTS
          =====================================================================

          Two separate inputs for password and confirmation.

          FormData will extract these as:
            {
              password: '...',
              'confirm-password': '...'
            }

          Note: Property names can have hyphens when using bracket notation:
            data['confirm-password']  ✓ Works
            data.confirm-password     ✗ Syntax error (can't use - in dot notation)

          ===================================================================== */}
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

      {/* =====================================================================
          NAME INPUTS
          =====================================================================

          FormData will extract these as:
            {
              'first-name': '...',
              'last-name': '...'
            }

          ===================================================================== */}
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

      {/* =====================================================================
          SELECT DROPDOWN
          =====================================================================

          The <select> element also needs a 'name' attribute.
          FormData extracts the selected option's 'value'.

          FormData will extract this as:
            { role: 'student' }  (or 'teacher', 'employee', etc.)

          The <option> elements have 'value' attributes.
          Whichever option is selected, its value is what FormData gets.

          ===================================================================== */}
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

      {/* =====================================================================
          CHECKBOX GROUP - Multiple Checkboxes with SAME NAME
          =====================================================================

          IMPORTANT: All three checkboxes have name="acquisition"!

          This is intentional! We want to collect ALL checked values.

          <fieldset> and <legend>:
          ------------------------
          - <fieldset> groups related inputs (semantic HTML)
          - <legend> provides a caption for the group
          - This improves accessibility (screen readers)

          CHECKBOX BEHAVIOR:
          ------------------
          Each checkbox has:
            - type="checkbox"    → Makes it a checkbox
            - name="acquisition" → SAME name for all (collect multiple)
            - value="google"     → The value if this box is checked

          WHY SAME NAME?
          --------------
          When multiple inputs share a name, we can get ALL their values:
            fd.getAll('acquisition') → ['google', 'friend', 'other']

          If they had different names:
            name="acquisition-google"
            name="acquisition-friend"
            name="acquisition-other"
          We'd need to check each separately - much more work!

          EXTRACTING THESE VALUES:
          ------------------------
          We CANNOT use Object.fromEntries() for these!
          It would only keep the LAST checked value.

          We MUST use fd.getAll('acquisition') to get an array of all:
            ['google', 'friend']  // If user checked Google and Friend

          ===================================================================== */}
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

      {/* =====================================================================
          SINGLE CHECKBOX - Terms Agreement
          =====================================================================

          This is a SINGLE checkbox (not a group).
          name="terms"

          CHECKBOX VALUE BEHAVIOR:
          ------------------------
          - If checked: FormData includes { terms: 'on' }
          - If NOT checked: FormData does NOT include 'terms' at all

          This is different from text inputs (which always have a value).

          CHECKING IF ACCEPTED:
          ---------------------
          To check if user accepted terms:
            if (data.terms === 'on') {
              // User accepted
            } else {
              // User did NOT accept (data.terms is undefined)
            }

          Or use boolean conversion:
            const termsAccepted = data.terms === 'on';

          ===================================================================== */}
      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      {/* =====================================================================
          FORM BUTTONS
          =====================================================================

          BUTTON TYPES IN FORMS:
          ----------------------
          Buttons inside forms can have three types:

          type="submit" (DEFAULT):
            - Triggers form submission
            - Fires the form's 'submit' event
            - Our handleSubmit function runs
            - FormData extracts all values
            - This is the DEFAULT if no type specified!

          type="button":
            - Does nothing by default
            - Just a regular button
            - Won't submit or reset the form
            - Useful for custom actions

          type="reset":
            - Clears all form inputs to their initial values
            - BUILT INTO THE BROWSER - no JavaScript needed!
            - Same as calling form.reset() in JavaScript
            - Resets ALL inputs in the form

          RESET BUTTON BEHAVIOR:
          ----------------------
          When you click the Reset button:
            1. Browser finds all inputs in the form
            2. Sets each input's value back to its initial state
            3. Text inputs → empty string (or defaultValue if set)
            4. Checkboxes → unchecked (or defaultChecked if set)
            5. Radio buttons → deselected (or defaultChecked if set)
            6. Select dropdowns → first option (or defaultValue if set)

          No state changes, no React involved - pure browser behavior!

          ===================================================================== */}
      <p className="form-actions">
        {/*
          RESET BUTTON
          ------------
          type="reset" tells the browser to clear all form inputs.
          This is completely automatic - no event handler needed!

          When clicked:
            - All text inputs cleared to ''
            - All checkboxes unchecked
            - All selects reset to first option

          This is the EASIEST way to reset a form with FormData/Refs.
        */}
        <button type="reset" className="button button-flat">
          Reset
        </button>

        {/*
          SUBMIT BUTTON
          -------------
          No type specified = defaults to type="submit"

          When clicked:
            - Triggers form's 'submit' event
            - handleSubmit function runs
            - FormData extracts all values
        */}
        <button className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}

// =============================================================================
// FORMDATA API - DETAILED EXPLANATION
// =============================================================================
//
// WHAT IS FormData?
// -----------------
// FormData is a browser-provided constructor function (built into JavaScript).
// It creates an object that represents form field names and values.
//
// BASIC USAGE:
//
//   const formElement = document.querySelector('form');
//   const formData = new FormData(formElement);
//
// In React:
//
//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//   }
//
// =============================================================================
// FORMDATA METHODS
// =============================================================================
//
// 1. get(name)
//    -----------
//    Returns the value of a single input with the given name.
//
//    Example:
//      const email = formData.get('email');
//      // Returns: 'test@test.com'
//
//    If input doesn't exist: returns null
//    If multiple inputs have same name: returns the FIRST value only
//
// 2. getAll(name)
//    ------------
//    Returns an ARRAY of ALL values with the given name.
//
//    Example:
//      const channels = formData.getAll('acquisition');
//      // Returns: ['google', 'friend', 'other']
//
//    Use this for:
//      - Multiple checkboxes with the same name
//      - Multi-select dropdowns
//
// 3. entries()
//    ---------
//    Returns an iterator of [name, value] pairs.
//
//    Example:
//      for (const [name, value] of formData.entries()) {
//        console.log(name, value);
//      }
//
//    Commonly used with Object.fromEntries() to create an object:
//      const data = Object.fromEntries(formData.entries());
//
// 4. has(name)
//    ---------
//    Checks if a field with the given name exists.
//
//    Example:
//      if (formData.has('email')) {
//        // Email field exists
//      }
//
// 5. append(name, value)
//    -------------------
//    Adds a new value (for modifying FormData).
//
//    Example:
//      formData.append('customField', 'customValue');
//
// 6. set(name, value)
//    ----------------
//    Sets a value, replacing any existing value.
//
//    Example:
//      formData.set('email', 'newemail@test.com');
//
// 7. delete(name)
//    ------------
//    Removes a field.
//
//    Example:
//      formData.delete('password');
//
// =============================================================================
// CONVERTING FORMDATA TO A PLAIN OBJECT
// =============================================================================
//
// FormData is NOT a plain JavaScript object. It's a special Map-like object.
//
// You CANNOT do:
//   formData.email  ✗ undefined
//   formData['email']  ✗ undefined
//
// You MUST use:
//   formData.get('email')  ✓ Works
//
// TO GET A PLAIN OBJECT:
// ----------------------
//
//   const data = Object.fromEntries(formData.entries());
//
// Now you CAN use:
//   data.email  ✓ Works
//   data['confirm-password']  ✓ Works
//
// =============================================================================
// HANDLING DIFFERENT INPUT TYPES WITH FORMDATA
// =============================================================================
//
// TEXT INPUTS:
//   <input type="text" name="firstName" />
//   formData.get('firstName')  → 'John'
//
// EMAIL/PASSWORD/etc:
//   <input type="email" name="email" />
//   formData.get('email')  → 'test@test.com'
//
// SELECT DROPDOWN:
//   <select name="role">
//     <option value="student">Student</option>
//   </select>
//   formData.get('role')  → 'student'
//
// SINGLE CHECKBOX:
//   <input type="checkbox" name="terms" />
//   If checked: formData.get('terms')  → 'on'
//   If NOT checked: formData.get('terms')  → null
//
// MULTIPLE CHECKBOXES (same name):
//   <input type="checkbox" name="hobbies" value="reading" />
//   <input type="checkbox" name="hobbies" value="gaming" />
//   formData.getAll('hobbies')  → ['reading', 'gaming']
//
// RADIO BUTTONS (same name):
//   <input type="radio" name="gender" value="male" />
//   <input type="radio" name="gender" value="female" />
//   formData.get('gender')  → 'male' (whichever is selected)
//
// FILE INPUT:
//   <input type="file" name="avatar" />
//   formData.get('avatar')  → File object
//
// MULTI-SELECT:
//   <select name="languages" multiple>
//     <option value="js">JavaScript</option>
//     <option value="py">Python</option>
//   </select>
//   formData.getAll('languages')  → ['js', 'py']
//
// =============================================================================
// PROS AND CONS OF FORMDATA
// =============================================================================
//
// PROS:
// -----
//   ✓ Very clean code - no state or refs needed
//   ✓ Scales perfectly - 1 form with 100 inputs? Same code!
//   ✓ Built into the browser - no libraries needed
//   ✓ Works with any number/type of inputs
//   ✓ Easy to send to backend (FormData is ready for fetch)
//
// CONS:
// -----
//   ✗ Only works on form submission (can't read values before)
//   ✗ Can't validate on every keystroke easily
//   ✗ Can't transform input as user types
//   ✗ Requires 'name' attribute on all inputs
//   ✗ Multi-value inputs need special handling (getAll)
//
// =============================================================================
// WHEN TO USE FORMDATA
// =============================================================================
//
// USE FormData WHEN:
// ------------------
//   ✓ You have a large form with many inputs
//   ✓ You only need values on submit (not while typing)
//   ✓ You want clean, minimal code
//   ✓ You're sending data to a backend
//   ✓ You don't need instant validation
//
// DON'T USE FormData WHEN:
// ------------------------
//   ✗ You need to validate on every keystroke
//   ✗ You need to transform input as user types
//   ✗ You need to show character count or other live feedback
//   ✗ You need to enable/disable submit based on form validity
//   ✗ Form is very simple (2-3 inputs) - state might be simpler
//
// =============================================================================
// COMBINING FORMDATA WITH FETCH
// =============================================================================
//
// FormData is PERFECT for sending to a backend:
//
//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//
//     fetch('https://api.example.com/signup', {
//       method: 'POST',
//       body: formData  // Send FormData directly!
//     });
//   }
//
// Or convert to JSON:
//
//   const data = Object.fromEntries(formData.entries());
//   fetch('https://api.example.com/signup', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   });
//
// =============================================================================
// COMPARISON: STATE vs REFS vs FORMDATA
// =============================================================================
//
// For an 8-input form:
//
// STATE APPROACH:
//   - 8 useState() calls (or 1 with object)
//   - 8 onChange handlers (or 1 generic)
//   - 8 value props
//   - Re-renders on every keystroke
//   - ~100+ lines of code
//
// REFS APPROACH:
//   - 8 useRef() calls
//   - 8 ref props
//   - 8 ref.current.value reads on submit
//   - No re-renders while typing
//   - ~50 lines of code
//
// FORMDATA APPROACH:
//   - 0 useState() calls
//   - 0 useRef() calls
//   - 2 lines in handleSubmit:
//       const fd = new FormData(event.target);
//       const data = Object.fromEntries(fd.entries());
//   - No re-renders while typing
//   - ~10 lines of code
//
// FormData wins for large forms! 🏆
//
// =============================================================================
// RESETTING FORMS - COMPLETE GUIDE
// =============================================================================
//
// There are FOUR ways to reset a form in React:
//
// 1. RESET BUTTON (type="reset") - EASIEST
// -----------------------------------------
//
//   <button type="reset">Reset</button>
//
// How it works:
//   - Built into the browser (HTML standard)
//   - NO JavaScript needed!
//   - Automatically clears ALL form inputs
//   - Resets to initial values (empty for text, unchecked for checkboxes)
//
// Pros:
//   ✓ Zero code required
//   ✓ Works with any form (state, refs, FormData)
//   ✓ Browser handles everything
//   ✓ Accessible (keyboard users can trigger with Enter/Space)
//
// Cons:
//   ✗ User must click the button (not automatic)
//   ✗ Can't customize behavior
//
// =============================================================================
// 2. PROGRAMMATIC RESET: event.target.reset() - RECOMMENDED
// =============================================================================
//
//   function handleSubmit(event) {
//     event.preventDefault();
//     // ... process form data ...
//     event.target.reset();  // Clear the form
//   }
//
// How it works:
//   - event.target is the <form> element
//   - Form elements have a built-in reset() method
//   - Calling it does the SAME thing as clicking type="reset" button
//
// When to use:
//   ✓ After successful form submission
//   ✓ After sending data to backend
//   ✓ After successful API call
//
// Example with fetch:
//   fetch('/api/signup', { method: 'POST', body: formData })
//     .then(response => {
//       if (response.ok) {
//         event.target.reset();  // Clear form on success
//       }
//     });
//
// Pros:
//   ✓ Automatic (no user action needed)
//   ✓ Same as type="reset" button
//   ✓ Works with FormData and Refs
//   ✓ Clean, one-line solution
//
// Cons:
//   ✗ Requires access to event object
//   ✗ Can't customize what gets reset
//
// =============================================================================
// 3. STATE RESET: setEnteredValues({ ... }) - FOR CONTROLLED COMPONENTS
// =============================================================================
//
//   const [enteredValues, setEnteredValues] = useState({
//     email: '',
//     password: ''
//   });
//
//   function handleReset() {
//     setEnteredValues({ email: '', password: '' });
//   }
//
// How it works:
//   - Controlled components have inputs bound to state
//   - Resetting state automatically clears inputs
//   - Because value={enteredValues.email} reflects state
//
// When to use:
//   ✓ When using useState for form values
//   ✓ When you need to reset to non-empty defaults
//   ✓ When you want to reset some fields but not others
//
// Pros:
//   ✓ Full control over what gets reset
//   ✓ Can reset to custom default values
//   ✓ Can reset individual fields
//   ✓ Follows React patterns (state controls UI)
//
// Cons:
//   ✗ More code (must manually set each state value)
//   ✗ Only works with controlled components
//   ✗ Must maintain sync between state structure and inputs
//
// =============================================================================
// 4. REFS RESET: ref.current.value = '' - NOT RECOMMENDED!
// =============================================================================
//
//   const emailRef = useRef();
//   const passwordRef = useRef();
//
//   function handleReset() {
//     emailRef.current.value = '';
//     passwordRef.current.value = '';
//   }
//
// How it works:
//   - Directly manipulates DOM elements
//   - Sets value property on each input element
//
// WHY NOT RECOMMENDED?
// --------------------
//   ✗ Violates React's declarative philosophy
//   ✗ Directly manipulating DOM (React should control UI)
//   ✗ Can cause bugs if React re-renders
//   ✗ Lots of repetitive code for many inputs
//   ✗ Can get out of sync with React's virtual DOM
//
// BETTER ALTERNATIVE:
// -------------------
// Use event.target.reset() instead (Approach 2)!
//
//   function handleSubmit(event) {
//     event.preventDefault();
//     // ... process data ...
//     event.target.reset();  // Much cleaner!
//   }
//
// =============================================================================
// RESET STRATEGIES COMPARISON
// =============================================================================
//
// SCENARIO 1: Simple form with FormData/Refs
// -------------------------------------------
// Best: type="reset" button OR event.target.reset()
//
//   <button type="reset">Reset</button>
//   // OR
//   event.target.reset();
//
// SCENARIO 2: Controlled form with useState
// ------------------------------------------
// Best: Reset state
//
//   setEnteredValues({ email: '', password: '' });
//
// SCENARIO 3: Reset after successful API call
// --------------------------------------------
// Best: event.target.reset() in the then() block
//
//   fetch('/api/signup', { ... })
//     .then(() => event.target.reset());
//
// SCENARIO 4: Reset with custom default values
// ---------------------------------------------
// Best: State approach (only one that supports this)
//
//   setEnteredValues({
//     email: 'default@example.com',
//     role: 'student'
//   });
//
// =============================================================================
// BUTTON TYPE SUMMARY
// =============================================================================
//
// type="submit":
//   - Submits the form
//   - Triggers 'submit' event
//   - DEFAULT type (if no type specified)
//   - Calls onSubmit handler
//
// type="button":
//   - Does nothing by default
//   - Won't submit or reset
//   - Good for custom onClick handlers
//   - Prevents accidental form submission
//
// type="reset":
//   - Resets all form inputs
//   - Clears text inputs to ''
//   - Unchecks checkboxes
//   - Resets selects to first option
//   - NO JavaScript needed!
//
// IMPORTANT: If you don't specify a type, button defaults to "submit"!
//
//   <button>Click me</button>
//   // ↑ This will SUBMIT THE FORM!
//
//   <button type="button">Click me</button>
//   // ↑ This will NOT submit the form
//
// =============================================================================
