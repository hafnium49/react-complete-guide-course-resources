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
          EMAIL INPUT - WITH BUILT-IN BROWSER VALIDATION (NEW IN LESSON 263!)
          =====================================================================

          name="email" is REQUIRED for FormData to work!

          FormData will extract this as:
            { email: 'user typed value' }

          NEW IN LESSON 263: Built-In HTML Validation Attributes
          -------------------------------------------------------
          We're adding the 'required' attribute to let the BROWSER validate!

          ===================================================================== */}
      <div className="control">
        <label htmlFor="email">Email</label>
        {/* ==================================================================
            BUILT-IN VALIDATION: required + type="email"
            ==================================================================

            The 'required' attribute is a BUILT-IN HTML attribute (not React!)
            that tells the browser this field is mandatory.

            WHAT 'required' DOES:
            ---------------------
            - Prevents form submission if field is empty
            - Browser shows error: "Please fill out this field"
            - NO JavaScript code needed!
            - Works even if JavaScript is disabled

            HOW IT WORKS:
            -------------
            1. User tries to submit form with empty email
            2. BROWSER detects 'required' attribute
            3. BROWSER prevents submission
            4. BROWSER shows error message
            5. BROWSER focuses the invalid field

            The error message varies by browser:
              Chrome: "Please fill out this field."
              Firefox: "Please fill out this field."
              Safari: "Fill out this field."
              Edge: "Please fill out this field."

            COMBINING WITH type="email":
            ----------------------------
            The 'type' attribute also provides validation!

            type="email" tells the browser:
              - This should be an email address
              - Validate the format (must have @ symbol)
              - Show email keyboard on mobile devices

            So with type="email" + required, the browser checks:
              1. Is the field filled out? (required)
              2. Does it look like an email? (type="email")

            Examples:
              ''                → Error: "Please fill out this field"
              'test'            → Error: "Please include an '@' in the email address"
              'test@'           → Error: "Please enter a part following '@'"
              'test@test.com'   → Valid! ✓

            NO CUSTOM JAVASCRIPT NEEDED!
            -----------------------------
            Compare this to our custom validation in Login.jsx:
              const emailIsInvalid = !email.includes('@');
              {emailIsInvalid && <p>Please enter a valid email</p>}

            With built-in validation:
              <input type="email" required />
              // That's it! Browser does everything!

            IMPORTANT NOTES:
            ----------------
            - The 'required' attribute in React is written WITHOUT a value:
                ✓ <input required />       (Correct in React)
                ✗ <input required="true" /> (Works but unnecessary)
                ✗ <input required={true} /> (Works but unnecessary)

            - In plain HTML, you'd write:
                <input required>           (No closing /)
              But in JSX/React, we use:
                <input required />         (With self-closing /)

            - To remove required conditionally:
                <input required={someCondition} />
                // If someCondition is false, 'required' won't be added

            BROWSER COMPATIBILITY:
            ----------------------
            'required' and type="email" are supported in ALL modern browsers:
              ✓ Chrome, Firefox, Safari, Edge
              ✓ iOS Safari, Chrome Mobile
              ✓ Even IE 10+

            This is VERY safe to use!

            ================================================================== */}
        <input
          id="email"
          type="email"
          name="email"
          required // NEW IN LESSON 263! Browser validates this is filled & valid email
        />
      </div>

      {/* =====================================================================
          PASSWORD INPUTS - WITH BUILT-IN VALIDATION (NEW IN LESSON 263!)
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

          NEW IN LESSON 263: Built-In Validation
          ---------------------------------------
          Adding 'required' and 'minLength' attributes!

          ===================================================================== */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          {/* ==================================================================
              BUILT-IN VALIDATION: required + minLength
              ==================================================================

              We're adding TWO validation attributes here:
                1. required   - Field must be filled out
                2. minLength  - Field must be at least N characters

              THE 'minLength' ATTRIBUTE:
              --------------------------
              minLength sets the MINIMUM number of characters required.

              Syntax in React:
                minLength={6}         ✓ Correct (number in curly braces)
                minLength="6"         ✓ Also works (string)
                minlength={6}         ✗ Wrong! Must be camelCase in React

              WHAT HAPPENS WITH minLength={6}:
              ---------------------------------
              1. User enters less than 6 characters (e.g., "abc")
              2. User tries to submit
              3. BROWSER prevents submission
              4. BROWSER shows error message
              5. BROWSER focuses the password field

              Example error messages:
                Chrome: "Please lengthen this text to 6 characters or more
                         (you are currently using 3 characters)."
                Firefox: "Please use at least 6 characters
                          (you are currently using 3 characters)."

              VALIDATION EXAMPLES:
              --------------------
              User enters: ''        → Error: "Please fill out this field"
                                        (required validation fails first)

              User enters: 'abc'     → Error: "Please lengthen this text to 6..."
                                        (minLength validation fails)

              User enters: 'abc123'  → Valid! ✓ (6 characters)
                                        (Both validations pass)

              User enters: 'abcdef'  → Valid! ✓ (6 characters)

              User enters: 'a'       → Error: "Please lengthen this text to 6..."
                                        (Only 1 character, need 6)

              WHY VALIDATE PASSWORD LENGTH?
              ------------------------------
              - Security: Longer passwords are harder to crack
              - Best practice: Most systems require 6-8+ characters
              - User protection: Prevents weak passwords like "123"

              Common minimum lengths:
                - 6 characters: Basic security
                - 8 characters: Good security (recommended)
                - 12 characters: Strong security

              COMBINING MULTIPLE VALIDATION ATTRIBUTES:
              ------------------------------------------
              You can combine as many as you need:
                <input
                  required
                  minLength={8}
                  maxLength={50}
                  pattern="[A-Za-z0-9]+"
                />

              The browser checks ALL of them in order:
                1. required     → Is it filled?
                2. minLength    → Long enough?
                3. maxLength    → Not too long?
                4. pattern      → Matches format?

              OTHER COMMON VALIDATION ATTRIBUTES:
              -----------------------------------
              - maxLength={50}     → Maximum length
              - min={0}            → Minimum value (for numbers)
              - max={100}          → Maximum value (for numbers)
              - pattern="[0-9]+"   → Regex pattern to match
              - step={5}           → Increment step (for numbers)

              IMPORTANT: BROWSER-PROVIDED VALIDATION!
              ----------------------------------------
              All of this is BUILT INTO THE BROWSER.
              We don't write ANY validation code!
              No useState, no if statements, no error messages!

              The browser:
                ✓ Checks the validations
                ✓ Shows error messages
                ✓ Prevents submission
                ✓ Focuses invalid fields

              Compare to custom validation (what we did before):
                const passwordIsInvalid =
                  didEdit.password &&
                  enteredPassword.trim().length < 6;

                {passwordIsInvalid && (
                  <p>Password must be at least 6 characters</p>
                )}

              With built-in validation:
                <input required minLength={6} />
                // That's it! Browser handles everything!

              LIMITATION: Can't check if passwords match
              -------------------------------------------
              Built-in validation CAN'T check if password and confirm-password
              match. That requires custom JavaScript validation!

              For that, you'd need:
                const passwordsMatch =
                  data.password === data['confirm-password'];

                if (!passwordsMatch) {
                  // Show error
                }

              This is why we often COMBINE built-in + custom validation!
                - Built-in: For simple checks (required, minLength)
                - Custom:   For complex checks (passwords match)

              ================================================================== */}
          <input
            id="password"
            type="password"
            name="password"
            required // NEW! Must be filled out
            minLength={6} // NEW! Must be at least 6 characters
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          {/* ==================================================================
              CONFIRM PASSWORD - Same validation as password field
              ==================================================================

              We add the SAME validation attributes here:
                - required: Must be filled out
                - minLength={6}: Must be at least 6 characters

              IMPORTANT LIMITATION:
              ---------------------
              Built-in validation CANNOT check if this matches the password!

              The browser can check:
                ✓ Is it filled out?
                ✓ Is it at least 6 characters?

              The browser CANNOT check:
                ✗ Does it match the password field?

              For "passwords must match" validation, you need custom JavaScript:

                function handleSubmit(event) {
                  event.preventDefault();
                  const fd = new FormData(event.target);
                  const data = Object.fromEntries(fd.entries());

                  if (data.password !== data['confirm-password']) {
                    // Show error: "Passwords don't match"
                    return;
                  }

                  // Passwords match, continue...
                }

              COMBINING APPROACHES:
              ---------------------
              Best practice is to use BOTH:
                1. Built-in validation for basic checks (required, minLength)
                2. Custom validation for complex checks (passwords match)

              This gives you:
                ✓ Easy setup (built-in attributes)
                ✓ Full control (custom JavaScript)
                ✓ Best user experience (fast feedback + comprehensive checks)

              ================================================================== */}
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required // NEW! Must be filled out
            minLength={6} // NEW! Must be at least 6 characters
          />
        </div>
      </div>

      <hr />

      {/* =====================================================================
          NAME INPUTS - WITH BUILT-IN VALIDATION (NEW IN LESSON 263!)
          =====================================================================

          FormData will extract these as:
            {
              'first-name': '...',
              'last-name': '...'
            }

          NEW IN LESSON 263: Adding 'required' attribute
          -----------------------------------------------

          ===================================================================== */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          {/* ==================================================================
              BUILT-IN VALIDATION ON TEXT INPUT
              ==================================================================

              The 'required' attribute works on ALL input types!

              We've seen it on:
                - type="email"    (Email input above)
                - type="password" (Password inputs above)

              Now we use it on:
                - type="text"     (Name inputs)

              SAME VALIDATION BEHAVIOR:
              -------------------------
              If user tries to submit with empty first name:
                - Browser prevents submission
                - Browser shows: "Please fill out this field"
                - Browser focuses this input

              'required' works the EXACT SAME WAY regardless of type!

              WORKS ON ANY INPUT TYPE:
              ------------------------
              - type="text"       ✓
              - type="email"      ✓
              - type="password"   ✓
              - type="number"     ✓
              - type="tel"        ✓
              - type="url"        ✓
              - type="date"       ✓
              - type="file"       ✓
              - <textarea>        ✓
              - <select>          ✓
              - type="checkbox"   ✓ (Must be checked!)
              - type="radio"      ✓ (Must select one!)

              The browser handles validation for ALL of these!

              ================================================================== */}
          <input
            type="text"
            id="first-name"
            name="first-name"
            required // NEW IN LESSON 263! Must be filled out
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          {/* Same validation as first-name */}
          <input
            type="text"
            id="last-name"
            name="last-name"
            required // NEW IN LESSON 263! Must be filled out
          />
        </div>
      </div>

      {/* =====================================================================
          SELECT DROPDOWN - WITH BUILT-IN VALIDATION (NEW IN LESSON 263!)
          =====================================================================

          The <select> element also needs a 'name' attribute.
          FormData extracts the selected option's 'value'.

          FormData will extract this as:
            { role: 'student' }  (or 'teacher', 'employee', etc.)

          The <option> elements have 'value' attributes.
          Whichever option is selected, its value is what FormData gets.

          NEW IN LESSON 263: Adding 'required' to Select Elements
          --------------------------------------------------------

          ===================================================================== */}
      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        {/* ====================================================================
            BUILT-IN VALIDATION ON <SELECT> ELEMENTS
            ====================================================================

            The 'required' attribute works on <select> elements too!

            HOW IT WORKS WITH SELECT:
            --------------------------
            When you add 'required' to a <select>:
              - User MUST select an option
              - User CANNOT leave it at the default selection
              - Browser prevents submission if not selected

            IMPORTANT: What counts as "selected"?
            -------------------------------------
            By default, the FIRST <option> is auto-selected:
              <select name="role">
                <option value="student">Student</option>  ← Auto-selected!
                <option value="teacher">Teacher</option>
              </select>

            In this case, "student" is already selected, so 'required' passes!

            TO FORCE USER TO MAKE A CHOICE:
            --------------------------------
            Add an empty or placeholder option as the first one:

              <select name="role" required>
                <option value="">-- Please select --</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>

            Now:
              - Default selection is the empty option (value="")
              - Browser sees value="" as "not selected"
              - If user submits without choosing, error shows!
              - Error: "Please select an item in the list"

            IN OUR CASE:
            ------------
            We don't have an empty placeholder option.
            "Student" is automatically selected.
            So 'required' will always pass (a value is selected).

            But we're adding 'required' anyway to:
              1. Be consistent (all fields are required)
              2. Protect against future changes
              3. Make validation explicit in the code

            If we wanted to force a choice, we'd add:
              <option value="">-- Select your role --</option>
              as the first option!

            SELECT VALIDATION ERRORS:
            -------------------------
            If user tries to submit with empty value:
              Chrome: "Please select an item in the list."
              Firefox: "Please select one of these options."

            WORKS ON ALL FORM CONTROLS:
            ----------------------------
            The 'required' attribute works on:
              ✓ <input> elements (all types)
              ✓ <select> elements (like this one)
              ✓ <textarea> elements

            Browser handles validation for ALL of them!

            ==================================================================== */}
        <select
          id="role"
          name="role"
          required // NEW IN LESSON 263! User must select a role
        >
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
          SINGLE CHECKBOX - Terms Agreement (WITH VALIDATION! NEW IN LESSON 263)
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

          NEW IN LESSON 263: Adding 'required' to Checkbox
          -------------------------------------------------

          ===================================================================== */}
      <div className="control">
        <label htmlFor="terms-and-conditions">
          {/* ==================================================================
              BUILT-IN VALIDATION ON CHECKBOXES
              ==================================================================

              The 'required' attribute works on checkboxes too!

              But it behaves DIFFERENTLY than on text inputs!

              HOW 'required' WORKS ON CHECKBOXES:
              -----------------------------------
              On text inputs:
                - 'required' means "must have a value"
                - Empty string = invalid

              On checkboxes:
                - 'required' means "MUST BE CHECKED"
                - Unchecked = invalid
                - Checked = valid

              CHECKBOX VALIDATION FLOW:
              -------------------------
              1. User tries to submit form with unchecked terms checkbox
              2. Browser detects 'required' attribute on checkbox
              3. Browser checks if checkbox is checked
              4. It's NOT checked → Validation fails!
              5. Browser prevents submission
              6. Browser shows error message
              7. Browser focuses the checkbox

              BROWSER ERROR MESSAGES:
              -----------------------
              If user tries to submit without checking:
                Chrome: "Please check this box if you want to proceed."
                Firefox: "Please check this box if you want to proceed."
                Safari: "You must check this box."

              VALIDATION EXAMPLES:
              --------------------
              Checkbox unchecked → Error: "Please check this box..."
              Checkbox checked   → Valid! ✓

              COMMON USE CASE: Terms & Conditions
              ------------------------------------
              This is PERFECT for "I agree to terms" checkboxes!

              You MUST require users to accept terms before signup.

              Without 'required':
                - User can skip accepting terms
                - Form submits anyway
                - Legal issues! Users didn't consent!

              With 'required':
                - User MUST check the box
                - Form won't submit until they do
                - Clear consent recorded

              IMPORTANT: Acquisition Checkboxes vs Terms Checkbox
              ----------------------------------------------------
              Notice we're adding 'required' here, but NOT to the
              "How did you find us?" checkboxes above!

              Why?
                - Acquisition checkboxes are OPTIONAL
                  (User can check 0, 1, 2, or all 3)
                - Terms checkbox is MANDATORY
                  (User MUST check it to proceed)

              This shows you can mix required and optional fields!

              CHECKBOX 'required' ONLY WORKS ON INDIVIDUAL CHECKBOXES:
              ---------------------------------------------------------
              'required' on a checkbox means "THIS checkbox must be checked"

              It does NOT mean "at least one checkbox in a group must be checked"

              For checkbox groups (like acquisition channels):
                - Each checkbox is independent
                - Adding 'required' to one means THAT ONE must be checked
                - To require "at least one", you need custom JavaScript

              Example of checkbox group with 'required':
                <input type="checkbox" name="hobbies" value="reading" required />
                <input type="checkbox" name="hobbies" value="gaming" />
                <input type="checkbox" name="hobbies" value="sports" />

              This means "reading checkbox MUST be checked"
              (The others are optional)

              That's usually NOT what you want for groups!
              For groups, typically ALL are optional OR you need custom validation.

              ================================================================== */}
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            required // NEW IN LESSON 263! User MUST check this box
          />
          I agree to the terms and conditions
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

// =============================================================================
// LESSON 263: BUILT-IN HTML FORM VALIDATION - COMPLETE GUIDE
// =============================================================================
//
// WHAT IS BUILT-IN HTML FORM VALIDATION?
// ---------------------------------------
// Browsers provide built-in validation features that work WITHOUT any JavaScript!
//
// You enable them by adding HTML attributes to your form inputs:
//   - required
//   - minLength / maxLength
//   - min / max
//   - type (email, url, etc.)
//   - pattern (regex)
//
// The browser then:
//   ✓ Validates inputs automatically
//   ✓ Shows error messages automatically
//   ✓ Prevents form submission if invalid
//   ✓ Focuses the first invalid field
//
// ALL without writing ANY JavaScript validation code!
//
// =============================================================================
// BUILT-IN VALIDATION ATTRIBUTES - COMPLETE REFERENCE
// =============================================================================
//
// 1. required
// -----------
// Makes a field mandatory - must have a value to submit.
//
// Works on:
//   - All <input> types (text, email, password, number, etc.)
//   - <select>
//   - <textarea>
//   - type="checkbox" (must be CHECKED, not just filled)
//   - type="radio" (must select ONE option in the group)
//
// Examples:
//   <input type="text" required />
//   <input type="email" required />
//   <input type="checkbox" required />  // Must be checked!
//   <select required>...</select>
//   <textarea required></textarea>
//
// Browser errors:
//   - "Please fill out this field." (for inputs)
//   - "Please select an item in the list." (for select)
//   - "Please check this box if you want to proceed." (for checkboxes)
//
// =============================================================================
// 2. minLength & maxLength
// ------------------------
// Set minimum and maximum character length.
//
// Works on:
//   - type="text"
//   - type="email"
//   - type="password"
//   - type="search"
//   - type="tel"
//   - type="url"
//   - <textarea>
//
// Examples:
//   <input type="password" minLength={6} maxLength={20} />
//   <input type="text" minLength={2} maxLength={50} />
//   <textarea minLength={10} maxLength={500}></textarea>
//
// In React (IMPORTANT):
//   ✓ minLength={6}      // Correct (camelCase)
//   ✗ minlength={6}      // Wrong! Won't work in React
//
// In plain HTML:
//   <input minlength="6">  // lowercase
//
// Browser errors:
//   - "Please lengthen this text to 6 characters or more
//      (you are currently using 3 characters)."
//
// =============================================================================
// 3. min & max
// ------------
// Set minimum and maximum numeric values.
//
// Works on:
//   - type="number"
//   - type="range"
//   - type="date"
//   - type="time"
//   - type="datetime-local"
//   - type="month"
//   - type="week"
//
// Examples:
//   <input type="number" min={0} max={100} />
//   <input type="date" min="2024-01-01" max="2024-12-31" />
//   <input type="range" min={0} max={10} />
//
// Browser errors:
//   - "Value must be less than or equal to 100."
//   - "Value must be greater than or equal to 0."
//
// =============================================================================
// 4. type (with built-in validation)
// -----------------------------------
// Different input types have built-in validation rules.
//
// type="email"
//   - Validates email format (must have @)
//   - Shows email keyboard on mobile
//   - Example: "Please include an '@' in the email address."
//
// type="url"
//   - Validates URL format (must start with http:// or https://)
//   - Example: "Please enter a URL."
//
// type="number"
//   - Only allows numbers
//   - Provides up/down arrows
//   - Works with min/max/step
//
// type="tel"
//   - Shows phone keyboard on mobile
//   - No automatic validation (phone formats vary by country)
//
// type="date"
//   - Shows date picker
//   - Validates date format
//   - Works with min/max
//
// Examples:
//   <input type="email" required />
//     → Must be filled AND must be valid email
//
//   <input type="url" required />
//     → Must be filled AND must be valid URL
//
//   <input type="number" min={0} max={100} />
//     → Must be number between 0-100
//
// =============================================================================
// 5. pattern (Regular Expression)
// --------------------------------
// Validates input against a regex pattern.
//
// Works on:
//   - type="text"
//   - type="email"
//   - type="password"
//   - type="tel"
//   - type="url"
//   - type="search"
//
// Examples:
//   <input type="text" pattern="[A-Za-z]+" />
//     → Only letters allowed
//
//   <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
//     → Phone format: 123-456-7890
//
//   <input type="text" pattern="[A-Z][0-9]{5}" />
//     → One uppercase letter + 5 digits
//
//   <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
//     → Password: 8+ chars, must have uppercase, lowercase, number
//
// IMPORTANT: Pattern attribute doesn't need delimiters (/ /)!
//   ✓ pattern="[0-9]+"     // Correct
//   ✗ pattern="/[0-9]+/"   // Wrong!
//
// Browser errors:
//   - "Please match the requested format."
//
// To provide a custom hint, use the 'title' attribute:
//   <input
//     type="text"
//     pattern="[0-9]{5}"
//     title="Please enter a 5-digit ZIP code"
//   />
//
// =============================================================================
// 6. step
// -------
// Defines the increment/decrement step for number inputs.
//
// Works on:
//   - type="number"
//   - type="range"
//   - type="date"
//   - type="time"
//
// Examples:
//   <input type="number" step={5} />
//     → Only allows multiples of 5 (0, 5, 10, 15...)
//
//   <input type="number" min={0} max={1} step={0.1} />
//     → Allows decimal increments (0, 0.1, 0.2, 0.3...)
//
//   <input type="time" step={60} />
//     → Only allows times on the minute (no seconds)
//
// Browser errors:
//   - "Please enter a valid value. The two nearest valid values are..."
//
// =============================================================================
// COMBINING MULTIPLE VALIDATION ATTRIBUTES
// =============================================================================
//
// You can combine as many attributes as needed!
//
// Example 1: Password with all constraints
//   <input
//     type="password"
//     required
//     minLength={8}
//     maxLength={50}
//     pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*"
//   />
//
// Browser checks (in order):
//   1. Is it filled? (required)
//   2. Is it at least 8 characters? (minLength)
//   3. Is it at most 50 characters? (maxLength)
//   4. Does it match the pattern? (pattern)
//
// Example 2: Email with length limit
//   <input
//     type="email"
//     required
//     maxLength={100}
//   />
//
// Browser checks:
//   1. Is it filled? (required)
//   2. Is it valid email format? (type="email")
//   3. Is it at most 100 chars? (maxLength)
//
// Example 3: Age with constraints
//   <input
//     type="number"
//     required
//     min={18}
//     max={120}
//   />
//
// Browser checks:
//   1. Is it filled? (required)
//   2. Is it a number? (type="number")
//   3. Is it at least 18? (min)
//   4. Is it at most 120? (max)
//
// =============================================================================
// DISABLING BUILT-IN VALIDATION
// =============================================================================
//
// Sometimes you want to disable browser validation (e.g., for testing).
//
// On the FORM element, add 'noValidate':
//   <form onSubmit={handleSubmit} noValidate>
//     ...
//   </form>
//
// In React:
//   <form noValidate>  // Note: NOT novalidate in React!
//
// This disables ALL built-in validation for the entire form.
// You'd then use custom JavaScript validation instead.
//
// =============================================================================
// BROWSER COMPATIBILITY
// =============================================================================
//
// Built-in HTML validation is VERY widely supported:
//
//   ✓ Chrome (all versions)
//   ✓ Firefox (all versions)
//   ✓ Safari (all versions)
//   ✓ Edge (all versions)
//   ✓ Mobile browsers (iOS Safari, Chrome Mobile, etc.)
//   ✓ Even Internet Explorer 10+
//
// It's safe to use in production!
//
// =============================================================================
// ACCESSIBILITY BENEFITS
// =============================================================================
//
// Built-in validation is MORE accessible than custom validation!
//
// Why?
//   ✓ Screen readers understand HTML validation attributes
//   ✓ Error messages are announced automatically
//   ✓ Invalid fields are marked with aria-invalid automatically
//   ✓ Works without JavaScript (progressive enhancement)
//   ✓ Keyboard navigation works automatically
//
// Custom validation often requires:
//   - Manual ARIA attributes (aria-invalid, aria-describedby)
//   - Manual focus management
//   - Manual screen reader announcements
//   - More complex code
//
// Built-in validation: Free accessibility! ✓
//
// =============================================================================
// LIMITATIONS OF BUILT-IN VALIDATION
// =============================================================================
//
// Built-in validation CAN'T do:
//
//   ✗ Check if two fields match (e.g., password confirmation)
//   ✗ Async validation (e.g., check if username is already taken)
//   ✗ Cross-field validation (e.g., end date must be after start date)
//   ✗ Complex business rules
//   ✗ Custom error message styling
//   ✗ Custom error message text (varies by browser/language)
//   ✗ Validate while typing (only on submit)
//
// For these cases, you need CUSTOM JavaScript validation!
//
// =============================================================================
// BEST PRACTICE: COMBINE BOTH!
// =============================================================================
//
// The best approach is to use BOTH built-in AND custom validation:
//
// 1. ADD BUILT-IN VALIDATION for basic checks:
//    - required (all mandatory fields)
//    - minLength (passwords, usernames)
//    - type="email" (email fields)
//    - maxLength (prevent very long inputs)
//
// 2. ADD CUSTOM VALIDATION for complex checks:
//    - Passwords match
//    - Username availability
//    - Date range validation
//    - Custom error messages
//
// Example:
//   <input
//     type="password"
//     required           // Built-in: Must be filled
//     minLength={8}      // Built-in: At least 8 chars
//   />
//
//   // Custom validation in handleSubmit:
//   if (data.password !== data['confirm-password']) {
//     setError('Passwords do not match');
//     return;
//   }
//
// This gives you:
//   ✓ Fast setup (built-in attributes)
//   ✓ Good UX (browser handles simple checks)
//   ✓ Full control (custom validation for complex checks)
//   ✓ Accessibility (built-in validation is accessible)
//   ✓ Progressive enhancement (works without JS)
//
// =============================================================================
// LEARNING MORE
// =============================================================================
//
// For complete documentation on HTML form validation, see:
//   https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
//
// This MDN article (mentioned in Lesson 263) covers:
//   - All validation attributes in detail
//   - Browser compatibility
//   - Examples
//   - CSS pseudo-classes for styling (:valid, :invalid)
//   - JavaScript Constraint Validation API
//
// Other useful MDN pages:
//   - <input> element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
//   - Form validation: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
//   - Input types: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
//
// =============================================================================
// STYLING VALIDATION STATES WITH CSS
// =============================================================================
//
// Browsers provide CSS pseudo-classes for styling validation states:
//
// :valid
//   - Matches inputs that pass validation
//   - Example: input:valid { border-color: green; }
//
// :invalid
//   - Matches inputs that fail validation
//   - Example: input:invalid { border-color: red; }
//
// :required
//   - Matches inputs with 'required' attribute
//   - Example: input:required { border-left: 3px solid blue; }
//
// :optional
//   - Matches inputs WITHOUT 'required' attribute
//   - Example: input:optional { background-color: #f0f0f0; }
//
// CAREFUL: :invalid applies BEFORE user interaction!
//   Empty required field = :invalid (even on page load!)
//
// Better approach - only show errors after user interaction:
//   input:invalid:focus,
//   input:invalid:not(:placeholder-shown) {
//     border-color: red;
//   }
//
// Or use JavaScript to add 'touched' class after blur.
//
// =============================================================================
// VALIDATION IN REACT - IMPORTANT NOTES
// =============================================================================
//
// 1. ATTRIBUTE NAMES ARE CAMELCASE IN REACT:
//    ✓ minLength={6}    (React JSX)
//    ✗ minlength={6}    (Won't work!)
//
//    ✓ maxLength={50}   (React JSX)
//    ✗ maxlength={50}   (Won't work!)
//
//    ✓ noValidate       (React JSX)
//    ✗ novalidate       (Won't work!)
//
// 2. BOOLEAN ATTRIBUTES:
//    ✓ <input required />              (Correct, concise)
//    ✓ <input required={true} />       (Works but unnecessary)
//    ✓ <input required={isRequired} /> (Conditional)
//
// 3. NUMBER vs STRING:
//    Both work, but numbers are preferred:
//      ✓ minLength={6}      (Preferred)
//      ✓ minLength="6"      (Also works)
//
// 4. CONTROLLED COMPONENTS:
//    Built-in validation works GREAT with controlled components!
//      <input
//        type="email"
//        value={email}
//        onChange={(e) => setEmail(e.target.value)}
//        required
//      />
//
// 5. FORMDATA & REFS:
//    Built-in validation also works with uncontrolled components!
//      <input type="email" name="email" required />
//
// =============================================================================
// SUMMARY: BUILT-IN VS CUSTOM VALIDATION
// =============================================================================
//
// BUILT-IN VALIDATION:
//   Pros:
//     ✓ Zero code required
//     ✓ Automatic error messages
//     ✓ Prevents form submission
//     ✓ Better accessibility
//     ✓ Works without JavaScript
//     ✓ Browser-tested and reliable
//
//   Cons:
//     ✗ Limited validation rules
//     ✗ Can't customize error messages easily
//     ✗ Can't do complex/cross-field validation
//     ✗ Error styling varies by browser
//
//   When to use:
//     - Simple validation (required, minLength, email format)
//     - Prototype/quick projects
//     - When accessibility is priority
//     - As a baseline (always!)
//
// CUSTOM VALIDATION (JavaScript):
//   Pros:
//     ✓ Full control over logic
//     ✓ Custom error messages
//     ✓ Complex validation rules
//     ✓ Async validation (API calls)
//     ✓ Cross-field validation
//     ✓ Can validate while typing
//
//   Cons:
//     ✗ More code to write
//     ✗ More code to maintain
//     ✗ Need to handle accessibility manually
//     ✗ Requires JavaScript
//
//   When to use:
//     - Complex validation rules
//     - Need custom error messages
//     - Passwords must match
//     - Username availability checks
//     - Multi-step forms
//
// RECOMMENDED APPROACH:
// ---------------------
// Use BOTH together!
//   1. Built-in validation for basic checks
//   2. Custom JavaScript validation for complex checks
//
// This gives you the best of both worlds:
//   ✓ Quick setup (built-in)
//   ✓ Good UX (both)
//   ✓ Full control (custom)
//   ✓ Accessibility (built-in)
//   ✓ Progressive enhancement (built-in works without JS)
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
