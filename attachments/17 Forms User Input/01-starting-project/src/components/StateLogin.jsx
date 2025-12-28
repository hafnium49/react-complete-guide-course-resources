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
//
// LESSON 265: BUILDING REUSABLE COMPONENTS TO REDUCE CODE DUPLICATION
// =====================================================================
//
// In this lesson, we refactor our form to use a REUSABLE INPUT COMPONENT.
//
// THE PROBLEM: CODE DUPLICATION
// ------------------------------
// Before, we had nearly identical JSX for email and password:
//   - Same div structure (div.control > label + input + error message)
//   - Same CSS classes (control, control-error)
//   - Same error display pattern ({isInvalid && <p>Error</p>})
//   - Only differences: label text, id, type, validation logic
//
// This violates the DRY principle (Don't Repeat Yourself).
//
// THE SOLUTION: EXTRACT A REUSABLE COMPONENT
// -------------------------------------------
// We created Input.jsx which wraps the common structure:
//   <Input
//     label="Email"
//     id="email"
//     type="email"
//     value={enteredValues.email}
//     onChange={(event) => handleInputChange('email', event.target.value)}
//     onBlur={() => handleInputBlur('email')}
//     error={emailIsInvalid && "Please enter a valid email."}
//   />
//
// This is much cleaner than repeating the entire div/label/input/error structure!
//
// BENEFITS:
// ---------
// ✓ Less code - 2 lines instead of 20+ lines per input
// ✓ Maintainability - Fix bugs in one place
// ✓ Consistency - All inputs have same structure
// ✓ Scalability - Easy to add new inputs
// ✓ Readability - Clear what props matter (label, error, etc.)
//
// =============================================================================

// =============================================================================
// LESSON 267: USING CUSTOM HOOK FOR INPUT MANAGEMENT (NEW!)
// =============================================================================
//
// In Lessons 265-266, we improved our code by:
//   - Extracting common JSX into Input component (Lesson 265)
//   - Extracting validation logic into utility functions (Lesson 266)
//
// But we still have a lot of repetitive STATE MANAGEMENT code:
//   - useState for enteredValues (email, password)
//   - useState for didEdit (email, password)
//   - handleInputChange function
//   - handleInputBlur function
//
// If we create 10 different forms (Login, Signup, Profile, etc.),
// we'd have to COPY all this state management code into each one!
//
// LESSON 267 SOLUTION: CUSTOM HOOK (useInput)
// --------------------------------------------
// We extract ALL the state management logic into a custom hook!
//
// WHAT WE'RE REMOVING:
// --------------------
// ✗ const [enteredValues, setEnteredValues] = useState({ email: '', password: '' });
// ✗ const [didEdit, setDidEdit] = useState({ email: false, password: false });
// ✗ function handleInputChange(identifier, value) { ... }
// ✗ function handleInputBlur(identifier) { ... }
// ✗ const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email);
// ✗ const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);
//
// WHAT WE'RE ADDING:
// ------------------
// ✓ import useInput from '../hooks/useInput.js';
// ✓ const { value: emailValue, ..., hasError: emailHasError } = useInput('', validationFn);
// ✓ const { value: passwordValue, ..., hasError: passwordHasError } = useInput('', validationFn);
//
// BENEFITS:
// ---------
// ✓ Much less code in this component (went from ~200 lines to ~50 lines)
// ✓ State management logic is reusable (can use in ANY form)
// ✓ Easier to test (test the hook independently)
// ✓ Easier to maintain (fix bugs in one place)
// ✓ Cleaner, more readable component code
//
// =============================================================================

import Input from './Input.jsx';

// =============================================================================
// IMPORTS: CUSTOM HOOK AND VALIDATION FUNCTIONS
// =============================================================================
//
// useInput: Our custom hook for managing input state
//   - Manages value state (what user typed)
//   - Manages didEdit state (has user touched this field?)
//   - Provides handleInputChange and handleInputBlur functions
//   - Provides hasError boolean (should we show validation error?)
//
// Validation functions: For checking if values are valid
//   - isEmail: Checks if value contains '@'
//   - isNotEmpty: Checks if value is not empty after trimming
//   - hasMinLength: Checks if value meets minimum length requirement
//
// =============================================================================
import useInput from '../hooks/useInput.js';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';

export default function StateLogin() {
  // ===========================================================================
  // LESSON 267: USING THE useInput CUSTOM HOOK (NEW!)
  // ===========================================================================
  //
  // BEFORE (Lessons 260-266):
  // --------------------------
  // We managed state manually in this component:
  //   - const [enteredValues, setEnteredValues] = useState({ email: '', password: '' });
  //   - const [didEdit, setDidEdit] = useState({ email: false, password: false });
  //   - function handleInputChange(identifier, value) { ... }
  //   - function handleInputBlur(identifier) { ... }
  //   - const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email);
  //   - const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);
  //
  // This was ~200 lines of code!
  //
  // AFTER (Lesson 267):
  // -------------------
  // We use the useInput custom hook:
  //   - Call useInput() once for email
  //   - Call useInput() once for password
  //   - Get back everything we need (value, handlers, error state)
  //
  // This is ~20 lines of code!
  //
  // 90% CODE REDUCTION! 🎉
  //
  // ===========================================================================

  // ===========================================================================
  // EMAIL INPUT: USING useInput HOOK
  // ===========================================================================
  //
  // CALLING THE HOOK:
  // -----------------
  // useInput(defaultValue, validationFn)
  //
  // PARAMETER 1: defaultValue = ''
  //   - We start with an empty string
  //   - Could be pre-populated: useInput('test@test.com', ...)
  //
  // PARAMETER 2: validationFn = (value) => isEmail(value) && isNotEmpty(value)
  //   - This is a FUNCTION that validates the value
  //   - It receives the current value as a parameter
  //   - It must return true (valid) or false (invalid)
  //
  // WHY AN ARROW FUNCTION?
  // ----------------------
  // Because we want to run TWO validation functions!
  //
  // We could pass just one:
  //   useInput('', isEmail)
  //   → Would only check if email contains '@'
  //
  // But we want to check BOTH:
  //   - Email contains '@' (isEmail)
  //   - Email is not empty (isNotEmpty)
  //
  // So we wrap them in an arrow function:
  //   (value) => isEmail(value) && isNotEmpty(value)
  //
  // This arrow function:
  //   1. Gets called by the hook with the current value
  //   2. Calls isEmail(value) → returns true/false
  //   3. Calls isNotEmpty(value) → returns true/false
  //   4. Combines with && → returns true only if BOTH are true
  //   5. Returns the result to the hook
  //
  // WHAT THE HOOK RETURNS:
  // ----------------------
  // An object with:
  //   - value: The current input value (what user typed)
  //   - handleInputChange: Function to call onChange
  //   - handleInputBlur: Function to call onBlur
  //   - hasError: Boolean (should we show error?)
  //
  // DESTRUCTURING WITH ALIASES:
  // ----------------------------
  // We destructure the returned object and rename the properties!
  //
  // Why rename?
  //   - We'll call useInput() twice (email and password)
  //   - We can't have two variables named "value"
  //   - So we rename: value: emailValue, value: passwordValue
  //
  // Syntax:
  //   { originalName: newName } = object
  //
  // Examples:
  //   { value: emailValue } → Creates variable emailValue from object.value
  //   { handleInputChange: handleEmailChange } → Creates handleEmailChange from object.handleInputChange
  //
  // ===========================================================================
  const {
    value: emailValue,
    // -------------------------------------------------------------------------
    // emailValue: The current email input value
    // -------------------------------------------------------------------------
    // This is what the user has typed in the email field.
    // We'll use this for the input's value prop:
    //   <Input value={emailValue} />
    // -------------------------------------------------------------------------

    handleInputChange: handleEmailChange,
    // -------------------------------------------------------------------------
    // handleEmailChange: Function to update email value
    // -------------------------------------------------------------------------
    // This function is called when user types in the email field.
    // We'll use this for the input's onChange prop:
    //   <Input onChange={handleEmailChange} />
    //
    // React automatically passes the event object to this function.
    // -------------------------------------------------------------------------

    handleInputBlur: handleEmailBlur,
    // -------------------------------------------------------------------------
    // handleEmailBlur: Function to mark email as "touched"
    // -------------------------------------------------------------------------
    // This function is called when user leaves the email field.
    // We'll use this for the input's onBlur prop:
    //   <Input onBlur={handleEmailBlur} />
    //
    // This sets the internal didEdit state to true in the hook.
    // -------------------------------------------------------------------------

    hasError: emailHasError,
    // -------------------------------------------------------------------------
    // emailHasError: Boolean indicating if email is invalid
    // -------------------------------------------------------------------------
    // This is true when:
    //   1. User has touched and left the field (didEdit = true)
    //   2. AND the value is invalid (!valueIsValid = true)
    //
    // We'll use this for conditional error rendering:
    //   error={emailHasError && "Please enter a valid email."}
    // -------------------------------------------------------------------------
  } = useInput(
    '',  // Start with empty string
    // -------------------------------------------------------------------------
    // VALIDATION FUNCTION: Combined email validation
    // -------------------------------------------------------------------------
    // This arrow function will be called by the hook with the current value.
    // It returns true if BOTH conditions are met:
    //   1. Value is a valid email (contains '@')
    //   2. Value is not empty (after trimming whitespace)
    //
    // The && operator means: "true only if BOTH are true"
    //
    // Examples:
    //   value = 'test@test.com'
    //     isEmail('test@test.com') → true
    //     isNotEmpty('test@test.com') → true
    //     true && true → true (VALID!)
    //
    //   value = 'test'
    //     isEmail('test') → false (no @)
    //     isNotEmpty('test') → true
    //     false && true → false (INVALID!)
    //
    //   value = ''
    //     isEmail('') → false
    //     isNotEmpty('') → false
    //     false && false → false (INVALID!)
    //
    //   value = '   ' (only spaces)
    //     isEmail('   ') → false
    //     isNotEmpty('   ') → false (trim makes it empty)
    //     false && false → false (INVALID!)
    // -------------------------------------------------------------------------
    (value) => isEmail(value) && isNotEmpty(value)
  );

  // ===========================================================================
  // PASSWORD INPUT: USING useInput HOOK
  // ===========================================================================
  //
  // SAME PATTERN AS EMAIL!
  // ----------------------
  // We call useInput() again for the password field.
  //
  // This creates a COMPLETELY INDEPENDENT state!
  //   - Email has its own value, didEdit, handlers
  //   - Password has its own value, didEdit, handlers
  //   - They don't interfere with each other
  //
  // VALIDATION FUNCTION:
  // --------------------
  // (value) => hasMinLength(value, 6)
  //
  // This checks if the password is at least 6 characters long.
  //
  // We COULD add more validations:
  //   (value) => hasMinLength(value, 6) && isNotEmpty(value)
  //
  // But hasMinLength already returns false for empty strings:
  //   hasMinLength('', 6) → ''.length >= 6 → 0 >= 6 → false
  //
  // So we only need the one check here.
  //
  // DIFFERENT ALIASES:
  // ------------------
  // We rename all the properties to "password" versions:
  //   - value: passwordValue
  //   - handleInputChange: handlePasswordChange
  //   - handleInputBlur: handlePasswordBlur
  //   - hasError: passwordHasError
  //
  // Now we have separate variables for email and password!
  //
  // ===========================================================================
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput(
    '',  // Start with empty string
    // -------------------------------------------------------------------------
    // VALIDATION FUNCTION: Password length validation
    // -------------------------------------------------------------------------
    // This arrow function checks if password is at least 6 characters.
    //
    // Why pass the minLength parameter (6)?
    //   - hasMinLength needs TWO parameters: (value, minLength)
    //   - The hook only passes ONE parameter: value
    //   - We use an arrow function to add the second parameter!
    //
    // How it works:
    //   1. Hook calls: validationFn(enteredValue)
    //   2. Our arrow function receives: (value)
    //   3. We call: hasMinLength(value, 6)
    //   4. hasMinLength returns: value.length >= 6
    //   5. We return that result to the hook
    //
    // Examples:
    //   value = 'abc123'
    //     hasMinLength('abc123', 6) → 6 >= 6 → true (VALID!)
    //
    //   value = 'abc'
    //     hasMinLength('abc', 6) → 3 >= 6 → false (INVALID!)
    //
    //   value = ''
    //     hasMinLength('', 6) → 0 >= 6 → false (INVALID!)
    // -------------------------------------------------------------------------
    (value) => hasMinLength(value, 6)
  );
  //
  // ===========================================================================
  // LESSON 267: ALL VALIDATION IS NOW IN THE HOOK!
  // ===========================================================================
  //
  // BEFORE (Lessons 265-266):
  // --------------------------
  // We had to manually compute validation in this component:
  //
  //   const emailIsInvalid =
  //     didEdit.email &&
  //     !isEmail(enteredValues.email);
  //
  //   const passwordIsInvalid =
  //     didEdit.password &&
  //     !hasMinLength(enteredValues.password, 6);
  //
  // AFTER (Lesson 267):
  // -------------------
  // The hook does all of this for us!
  //
  // Inside useInput hook:
  //   const valueIsValid = validationFn(enteredValue);
  //   const hasError = didEdit && !valueIsValid;
  //
  // We just get back the hasError boolean:
  //   - emailHasError (from useInput for email)
  //   - passwordHasError (from useInput for password)
  //
  // NO MORE VALIDATION CODE IN THIS COMPONENT!
  // -------------------------------------------
  // The hook handles:
  //   ✓ Tracking the value (enteredValue state)
  //   ✓ Tracking if touched (didEdit state)
  //   ✓ Running validation (validationFn)
  //   ✓ Computing hasError (didEdit && !valueIsValid)
  //
  // We just consume the result!
  //
  // ===========================================================================

  // ===========================================================================
  // LESSON 267: RESET FUNCTIONALITY REMOVED (FOR NOW)
  // ===========================================================================
  //
  // BEFORE (Lessons 260-266):
  // --------------------------
  // We had a handleReset function that reset the enteredValues state:
  //
  //   function handleReset() {
  //     setEnteredValues({ email: '', password: '' });
  //   }
  //
  // This worked because we managed the state ourselves.
  //
  // AFTER (Lesson 267):
  // -------------------
  // We no longer have direct access to setEnteredValues!
  // The state is managed INSIDE the useInput hook.
  //
  // HOW TO ADD RESET FUNCTIONALITY WITH HOOKS:
  // -------------------------------------------
  // We would need to update the useInput hook to expose a reset function:
  //
  //   Inside useInput.js:
  //     function reset() {
  //       setEnteredValue(defaultValue);
  //       setDidEdit(false);
  //     }
  //
  //     return {
  //       value: enteredValue,
  //       handleInputChange,
  //       handleInputBlur,
  //       hasError,
  //       reset  // NEW! Expose reset function
  //     };
  //
  //   In this component:
  //     const {
  //       value: emailValue,
  //       ...,
  //       reset: resetEmail  // Get reset function
  //     } = useInput('', emailValidation);
  //
  //     const {
  //       value: passwordValue,
  //       ...,
  //       reset: resetPassword  // Get reset function
  //     } = useInput('', passwordValidation);
  //
  //     function handleReset() {
  //       resetEmail();
  //       resetPassword();
  //     }
  //
  // This will be covered in a future lesson!
  // For now, we'll comment out the reset button.
  //
  // ===========================================================================

  // ===========================================================================
  // FORM SUBMISSION HANDLER - LESSON 267 UPDATED
  // ===========================================================================
  //
  // WHAT CHANGED IN LESSON 267:
  // ----------------------------
  // BEFORE: We accessed form values from enteredValues state
  //   console.log(enteredValues.email);
  //   console.log(enteredValues.password);
  //
  // AFTER: We access form values from the hook return values
  //   console.log(emailValue);
  //   console.log(passwordValue);
  //
  // The hook gives us the values directly, no need for a combined state object!
  //
  // ===========================================================================
  function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload on form submission

    // =========================================================================
    // LESSON 267: VALIDATION CHECK BEFORE SUBMISSION
    // =========================================================================
    //
    // NEW IN LESSON 267: Check if there are validation errors!
    // --------------------------------------------------------
    //
    // The useInput hook gives us hasError for each field:
    //   - emailHasError: true if email is invalid AND user has touched it
    //   - passwordHasError: true if password is invalid AND user has touched it
    //
    // We should NOT submit the form if ANY field has an error!
    //
    // WHY CHECK HERE?
    // ---------------
    // Even though we show error messages in the UI, we want a final check here
    // to prevent submission with invalid data.
    //
    // Scenario:
    //   1. User fills out email with invalid value
    //   2. User tabs away → Error shows (didEdit.email = true)
    //   3. User ignores error and clicks Submit button
    //   4. Without this check, invalid data would be sent!
    //   5. WITH this check, submission is prevented ✓
    //
    // THE CHECK:
    // ----------
    // if (emailHasError || passwordHasError) {
    //   return;  // Stop execution, don't submit
    // }
    //
    // EXPLANATION:
    // ------------
    // The || operator means "OR":
    //   - If emailHasError is true → condition is true → return early
    //   - If passwordHasError is true → condition is true → return early
    //   - Only if BOTH are false → condition is false → continue to submission
    //
    // EXAMPLES:
    // ---------
    // emailHasError = true, passwordHasError = false
    //   → true || false → true → return (don't submit)
    //
    // emailHasError = false, passwordHasError = true
    //   → false || true → true → return (don't submit)
    //
    // emailHasError = true, passwordHasError = true
    //   → true || true → true → return (don't submit)
    //
    // emailHasError = false, passwordHasError = false
    //   → false || false → false → continue (submit!)
    //
    // EARLY RETURN:
    // -------------
    // The return statement EXITS the function immediately.
    // None of the code below runs if we return early.
    //
    // This is a common pattern called a "guard clause":
    //   - Check for invalid conditions first
    //   - Return early if invalid
    //   - Continue with normal flow if valid
    //
    // ALTERNATIVE: Show a message
    // ----------------------------
    // You could also show a message to the user:
    //
    //   if (emailHasError || passwordHasError) {
    //     alert('Please fix the errors before submitting');
    //     return;
    //   }
    //
    // Or focus the first invalid field:
    //
    //   if (emailHasError) {
    //     emailInputRef.current.focus();
    //     return;
    //   }
    //
    // But for now, we just prevent submission silently.
    // The error messages in the UI are enough feedback!
    //
    // =========================================================================
    if (emailHasError || passwordHasError) {
      return; // Don't submit if there are validation errors
    }

    // -------------------------------------------------------------------------
    // LESSON 267: ACCESSING THE FORM VALUES FROM HOOKS
    // -------------------------------------------------------------------------
    //
    // BEFORE (Lessons 260-266):
    // --------------------------
    // We accessed values from the enteredValues state:
    //   const email = enteredValues.email;
    //   const password = enteredValues.password;
    //
    // AFTER (Lesson 267):
    // -------------------
    // We access values directly from the hook return values:
    //   const email = emailValue;
    //   const password = passwordValue;
    //
    // WHY IS THIS BETTER?
    // -------------------
    // The hook encapsulates the state management!
    //   - We don't need to know HOW the value is stored
    //   - We don't need to know the state structure
    //   - The hook handles everything internally
    //   - We just use the values it gives us
    //
    // BENEFITS:
    // ---------
    // ✓ Simpler - just use emailValue, not enteredValues.email
    // ✓ More flexible - hook can change internal implementation
    // ✓ Better separation of concerns - component doesn't manage state
    // ✓ Easier to test - component receives values as props from hook
    //
    // WHAT WE HAVE ACCESS TO:
    // -----------------------
    // From the email hook:
    //   - emailValue: The current email input value
    //   - handleEmailChange: Function to call onChange
    //   - handleEmailBlur: Function to call onBlur
    //   - emailHasError: Boolean (is email invalid?)
    //
    // From the password hook:
    //   - passwordValue: The current password input value
    //   - handlePasswordChange: Function to call onChange
    //   - handlePasswordBlur: Function to call onBlur
    //   - passwordHasError: Boolean (is password invalid?)
    //
    // We can use these values anywhere in the component!
    //
    // -------------------------------------------------------------------------
    console.log('Submitted!');
    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);

    // We could also log them as an object if we want:
    // console.log({ email: emailValue, password: passwordValue });

    // -------------------------------------------------------------------------
    // WHAT HAPPENS NEXT IN A REAL APP
    // -------------------------------------------------------------------------
    //
    // In a real application, we would:
    //
    // 1. SEND DATA TO BACKEND:
    //    --------------------------------------------------------------------
    //    Send the validated data to your server:
    //
    //      fetch('/api/login', {
    //        method: 'POST',
    //        headers: { 'Content-Type': 'application/json' },
    //        body: JSON.stringify({
    //          email: emailValue,
    //          password: passwordValue
    //        })
    //      })
    //
    // 2. SHOW LOADING STATE:
    //    --------------------------------------------------------------------
    //    Disable the submit button and show a spinner:
    //
    //      const [isSubmitting, setIsSubmitting] = useState(false);
    //
    //      setIsSubmitting(true);
    //      // ... send request ...
    //      setIsSubmitting(false);
    //
    //      <button disabled={isSubmitting}>
    //        {isSubmitting ? 'Logging in...' : 'Login'}
    //      </button>
    //
    // 3. HANDLE SUCCESS:
    //    --------------------------------------------------------------------
    //    On successful login:
    //
    //      .then(response => {
    //        if (response.ok) {
    //          // Store auth token
    //          localStorage.setItem('token', response.token);
    //          // Redirect to dashboard
    //          navigate('/dashboard');
    //        }
    //      })
    //
    // 4. HANDLE ERRORS:
    //    --------------------------------------------------------------------
    //    On failed login:
    //
    //      .catch(error => {
    //        // Show error message
    //        setErrorMessage('Invalid email or password');
    //        // Or use a toast notification
    //      })
    //
    // 5. RESET FORM (optional):
    //    --------------------------------------------------------------------
    //    Clear the form after successful submission:
    //
    //      // With hooks, we'd need to expose a reset function!
    //      // See next lesson on adding reset functionality to the hook
    //
    // -------------------------------------------------------------------------

    // TODO: Here we would typically:
    // - Send data to a backend API
    // - Show a loading state
    // - Handle success/error responses
    // - Navigate to another page on success
  }

  return (
    // form element will render the login form every time the login button is clicked
    // To prevent the default browser behavior of reloading the page on form submission, we use onSubmit={handleSubmit}.
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {/* =====================================================================
          USING THE REUSABLE INPUT COMPONENT (NEW IN LESSON 265!)
          =====================================================================

          BEFORE (Direct JSX - lots of duplication):
          ------------------------------------------
          We had to write out the full structure for each input:
            <div className="control no-margin">
              <label htmlFor="email">Email</label>
              <input ... />
              <div className="control-error">
                {emailIsInvalid && <p>Error</p>}
              </div>
            </div>

          This was repeated for email, password, and any other inputs!

          AFTER (Using Input component - clean and DRY):
          -----------------------------------------------
          Now we can use our reusable Input component:
            <Input
              label="Email"
              id="email"
              type="email"
              ...other props...
              error={emailIsInvalid && "Error message"}
            />

          The Input component handles:
            ✓ Wrapping div with correct className
            ✓ Label with correct htmlFor
            ✓ Input element with all forwarded props
            ✓ Error message div with conditional rendering

          BENEFITS OF THIS APPROACH:
          ---------------------------
          ✓ Less code - 8 lines instead of 30+ per input
          ✓ Consistency - All inputs have same structure
          ✓ Maintainability - Fix bugs in one place (Input.jsx)
          ✓ Scalability - Easy to add 10 more inputs
          ✓ Readability - Clear what props matter

          PROPS WE'RE PASSING:
          --------------------
          Explicit props (pulled out in Input component):
            - label: Text for the <label>
            - id: For label htmlFor AND input id
            - error: Error message (or false if no error)

          Forwarded props (spread onto <input> via {...props}):
            - type: Input type (email, password, text, etc.)
            - name: Form field name
            - value: Controlled component value
            - onChange: Change handler
            - onBlur: Blur handler (for validation timing)

          HOW ERROR PROP WORKS:
          ---------------------
          We use a clever pattern with &&:
            error={emailIsInvalid && "Please enter a valid email."}

          If emailIsInvalid is false:
            error = false && "..." = false
            → Input component gets error={false}
            → {error && <p>{error}</p>} renders nothing

          If emailIsInvalid is true:
            error = true && "..." = "Please enter a valid email."
            → Input component gets error="Please enter a valid email."
            → {error && <p>{error}</p>} renders the <p> with message

          This is cleaner than passing both isInvalid and errorMessage!

          ===================================================================== */}
      <div className="control-row">
        {/* ===================================================================
            EMAIL INPUT - LESSON 267: USING VALUES FROM useInput HOOK
            ===================================================================

            BEFORE (Lessons 265-266): Using manual state management
            --------------------------------------------------------
            We passed values and handlers from our component state:
              <Input
                value={enteredValues.email}
                onChange={(event) => handleInputChange('email', event.target.value)}
                onBlur={() => handleInputBlur('email')}
                error={emailIsInvalid && "Please enter a valid email."}
              />

            We had to:
              - Manage enteredValues state manually
              - Create handleInputChange function
              - Create handleInputBlur function
              - Compute emailIsInvalid manually
              - Pass 'email' identifier to generic handlers

            AFTER (Lesson 267): Using useInput custom hook
            -----------------------------------------------
            We pass values and handlers directly from the hook:
              <Input
                value={emailValue}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                error={emailHasError && "Please enter a valid email."}
              />

            The hook provides:
              - emailValue: Current email input value
              - handleEmailChange: Specific handler for email changes
              - handleEmailBlur: Specific handler for email blur
              - emailHasError: Boolean indicating if email is invalid

            BENEFITS OF THE HOOK APPROACH:
            -------------------------------
            ✓ SIMPLER PROPS:
              - value={emailValue} instead of value={enteredValues.email}
              - No need to pass 'email' identifier
              - Cleaner, more readable code

            ✓ DEDICATED HANDLERS:
              - onChange={handleEmailChange} is email-specific
              - No wrapper arrow function needed!
              - React passes the event directly to handleEmailChange
              - Inside the hook, handleEmailChange receives the event

            ✓ AUTOMATIC ERROR TRACKING:
              - emailHasError is computed automatically by the hook
              - No need to write validation logic in this component
              - Hook handles didEdit state internally

            ✓ ENCAPSULATED STATE:
              - All email-related state is managed by one hook call
              - Component doesn't need to know about internal state structure
              - Hook can change implementation without affecting component

            HOW THE HANDLERS WORK:
            ----------------------
            BEFORE: We needed arrow functions to pass the identifier
              onChange={(event) => handleInputChange('email', event.target.value)}

              Why?
              - handleInputChange needed TWO parameters: (identifier, value)
              - React only passes ONE parameter: event
              - Arrow function "wraps" the call to add 'email' identifier
              - We extract event.target.value and pass it

            AFTER: We pass the handler directly
              onChange={handleEmailChange}

              Why this works:
              - handleEmailChange INSIDE THE HOOK expects ONE parameter: event
              - React passes the event to handleEmailChange
              - Hook extracts event.target.value internally
              - No wrapper needed! Direct reference!

            This is cleaner and more performant (no arrow function created on each render).

            PROPS WE'RE PASSING:
            --------------------
            Explicit props (used by Input component):
              - label="Email": Text for the <label>
              - id="email": For label htmlFor AND input id
              - error={emailHasError && "..."}: Error message or false

            Forwarded props (spread onto <input>):
              - type="email": Input type for HTML validation
              - name="email": Form field name (for FormData if needed)
              - value={emailValue}: Controlled component value FROM HOOK
              - onChange={handleEmailChange}: Change handler FROM HOOK
              - onBlur={handleEmailBlur}: Blur handler FROM HOOK

            THE ERROR PROP PATTERN:
            -----------------------
            error={emailHasError && "Please enter a valid email."}

            This uses the && operator for conditional values:
              - If emailHasError is false: false && "..." → false
              - If emailHasError is true: true && "..." → "Please enter a valid email."

            In Input.jsx:
              {error && <p>{error}</p>}

            If error is false: {false && ...} → renders nothing
            If error is a string: {string && ...} → renders the <p>

            COMPLETE FLOW:
            --------------
            1. User types in email field
               → Input component calls onChange={handleEmailChange}
               → handleEmailChange receives event from React
               → Inside hook: setEnteredValue(event.target.value)
               → Inside hook: setDidEdit(false)
               → Hook re-runs, returns new emailValue
               → Component re-renders with new emailValue
               → Input shows new value

            2. User leaves email field (tabs away)
               → Input component calls onBlur={handleEmailBlur}
               → handleEmailBlur runs inside hook
               → Inside hook: setDidEdit(true)
               → Hook re-runs, computes hasError = didEdit && !valueIsValid
               → Component re-renders with emailHasError = true/false
               → Error shows if emailHasError is true

            3. User goes back and types in email field
               → onChange fires again
               → Inside hook: setDidEdit(false)
               → hasError becomes false (didEdit is now false)
               → Error disappears immediately!

            This is the complete blur validation pattern powered by a custom hook!

            =================================================================== */}
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailHasError && "Please enter a valid email."}
        />

        {/* ===================================================================
            PASSWORD INPUT - LESSON 267: USING VALUES FROM useInput HOOK
            ===================================================================

            BEFORE (Lessons 265-266): Using manual state management
            --------------------------------------------------------
            We passed values and handlers from our component state:
              <Input
                value={enteredValues.password}
                onChange={(event) => handleInputChange('password', event.target.value)}
                onBlur={() => handleInputBlur('password')}
                error={passwordIsInvalid && "Please enter a valid password."}
              />

            We had to:
              - Manage enteredValues.password state manually
              - Call handleInputChange with 'password' identifier
              - Call handleInputBlur with 'password' identifier
              - Compute passwordIsInvalid manually
              - Wrap handlers in arrow functions

            AFTER (Lesson 267): Using useInput custom hook
            -----------------------------------------------
            We pass values and handlers directly from the hook:
              <Input
                value={passwordValue}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                error={passwordHasError && "Please enter a valid password."}
              />

            The hook provides:
              - passwordValue: Current password input value
              - handlePasswordChange: Specific handler for password changes
              - handlePasswordBlur: Specific handler for password blur
              - passwordHasError: Boolean indicating if password is invalid

            SAME PATTERN AS EMAIL, INDEPENDENT STATE:
            ------------------------------------------
            We called useInput() TWICE:
              1. const { ... } = useInput('', emailValidation);
              2. const { ... } = useInput('', passwordValidation);

            Each call creates INDEPENDENT state:
              - Email has its own enteredValue, didEdit
              - Password has its own enteredValue, didEdit
              - They don't interfere with each other
              - Each has its own handlers
              - Each has its own validation

            This is POWERFUL! We can:
              - Use the same hook for any number of inputs
              - Each input gets its own state management
              - No need to manage a combined state object
              - No need to pass identifiers to generic handlers

            DIFFERENT VALIDATION:
            ---------------------
            Email validation: (value) => isEmail(value) && isNotEmpty(value)
              - Checks for '@' symbol
              - Checks that value is not empty

            Password validation: (value) => hasMinLength(value, 6)
              - Checks that password is at least 6 characters
              - Already handles empty case (0 >= 6 → false)

            Each input can have COMPLETELY DIFFERENT validation logic!
            The hook doesn't care what the validation function does,
            it just calls it and uses the result.

            PROPS WE'RE PASSING:
            --------------------
            Explicit props (used by Input component):
              - label="Password": Text for the <label>
              - id="password": For label htmlFor AND input id
              - error={passwordHasError && "..."}: Error message or false

            Forwarded props (spread onto <input>):
              - type="password": Hides characters for security
              - name="password": Form field name (for FormData if needed)
              - value={passwordValue}: Controlled component value FROM HOOK
              - onChange={handlePasswordChange}: Change handler FROM HOOK
              - onBlur={handlePasswordBlur}: Blur handler FROM HOOK

            VALIDATION ERROR MESSAGE:
            -------------------------
            error={passwordHasError && "Please enter a valid password."}

            passwordHasError is true when:
              1. User has left the password field (didEdit = true inside hook)
              2. AND password validation failed (hasMinLength(value, 6) → false)

            Examples:
              - User types "abc" and tabs away → passwordHasError = true → Error shows
              - User types "abc123" and tabs away → passwordHasError = false → No error
              - User hasn't touched field yet → passwordHasError = false → No error

            COMPLETE FLOW (SAME AS EMAIL):
            ------------------------------
            1. User types in password field
               → onChange={handlePasswordChange} fires
               → Inside hook: setEnteredValue(event.target.value)
               → Inside hook: setDidEdit(false)
               → passwordHasError becomes false
               → No error while typing

            2. User leaves password field
               → onBlur={handlePasswordBlur} fires
               → Inside hook: setDidEdit(true)
               → Hook re-computes: hasError = didEdit && !valueIsValid
               → passwordHasError = true/false
               → Error shows if invalid

            3. User goes back and types
               → onChange fires
               → Inside hook: setDidEdit(false)
               → passwordHasError becomes false
               → Error disappears immediately

            CONSISTENCY ACROSS INPUTS:
            --------------------------
            Both email and password now use the EXACT SAME PATTERN:
              ✓ Same hook: useInput()
              ✓ Same props: value, onChange, onBlur, error
              ✓ Same flow: type → no error, leave → validate, type → clear error
              ✓ Different validation: email checks '@', password checks length

            This consistency makes the code:
              - Easy to understand (one pattern to learn)
              - Easy to extend (add more inputs with same pattern)
              - Easy to maintain (fix once, works everywhere)
              - Easy to test (same behavior for all inputs)

            =================================================================== */}
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordHasError && "Please enter a valid password."}
        />
      </div>

      <p className="form-actions">
        {/* ===================================================================
            LESSON 267: RESET BUTTON TEMPORARILY REMOVED
            ===================================================================

            The Reset button has been commented out for this lesson because:
              - We no longer have direct access to the state
              - The state is managed inside the useInput hook
              - We would need the hook to expose a reset() function

            How to add it back:
              1. Update useInput.js to return a reset function
              2. Destructure reset from each useInput call
              3. Create handleReset function that calls both reset functions
              4. Uncomment this button

            For now, the focus is on understanding how the custom hook works!

            =================================================================== */}
        {/* <button type="button" onClick={handleReset} className="button button-flat">
          Reset
        </button> */}

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

// =============================================================================
// VALIDATION ON BLUR - COMPLETE GUIDE (LESSON 261)
// =============================================================================
//
// This lesson demonstrates BLUR VALIDATION (when the input loses focus).
//
// WHAT WE IMPLEMENTED:
// --------------------
// 1. A new state to track whether user has touched each field:
//      const [didEdit, setDidEdit] = useState({ email: false, password: false });
//
// 2. A blur handler that marks fields as touched:
//      function handleInputBlur(identifier) {
//        setDidEdit(prev => ({ ...prev, [identifier]: true }));
//      }
//
// 3. Updated validation logic to use didEdit:
//      const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
//
// 4. Added onBlur event handler to inputs:
//      <input onBlur={() => handleInputBlur('email')} />
//
// 5. BONUS: Reset didEdit to false when user starts typing again:
//      In handleInputChange:
//        setDidEdit(prev => ({ ...prev, [identifier]: false }));
//
// =============================================================================
// HOW BLUR VALIDATION WORKS
// =============================================================================
//
// BLUR = When input loses focus
// ------------------------------
// The "blur" event fires when an input field loses focus:
//   - User clicks on input → focus
//   - User types something
//   - User tabs to next field or clicks outside → blur
//
// This is the PERFECT time to validate!
// User has finished typing, so we can check if the value is valid.
//
// THE COMPLETE FLOW:
// ------------------
//
// 1. Page loads
//    - enteredValues: { email: '', password: '' }
//    - didEdit: { email: false, password: false }
//    - emailIsInvalid: false (didEdit.email is false)
//    - No errors shown ✓
//
// 2. User clicks on email field
//    - Input gets focus
//    - Nothing changes yet (no onChange, no onBlur)
//
// 3. User types 't'
//    - onChange fires → handleInputChange('email', 't')
//    - enteredValues.email: 't'
//    - didEdit.email: false (we reset it to false in handleInputChange)
//    - emailIsInvalid: false (didEdit.email is false)
//    - No error shown ✓ (User is still typing!)
//
// 4. User types 'e', 's', 't' (each keystroke)
//    - onChange fires each time
//    - enteredValues.email: 'test'
//    - didEdit.email: false (still false, user is typing)
//    - No error shown ✓
//
// 5. User tabs to password field (OR clicks outside)
//    - onBlur fires → handleInputBlur('email')
//    - didEdit.email: true (marked as touched!)
//    - Component re-renders
//    - emailIsInvalid is recalculated:
//      didEdit.email && !'test'.includes('@')
//      → true && true → true
//    - Error appears! ✗ (Invalid email)
//
// 6. User goes back to email field and types '@'
//    - User clicks back into field
//    - onChange fires → handleInputChange('email', '@')
//    - didEdit.email: false (we reset it to false!)
//    - emailIsInvalid: false (didEdit.email is false)
//    - Error disappears immediately! ✓ (User feels encouraged!)
//
// 7. User continues typing 'test.com'
//    - onChange fires on each keystroke
//    - enteredValues.email: 'test@test.com'
//    - didEdit.email: false (still typing)
//    - No error ✓
//
// 8. User tabs to password field again
//    - onBlur fires → handleInputBlur('email')
//    - didEdit.email: true
//    - emailIsInvalid is recalculated:
//      didEdit.email && !'test@test.com'.includes('@')
//      → true && false → false
//    - No error! ✓ (Valid email!)
//
// =============================================================================
// THE THREE STATES OF AN INPUT FIELD
// =============================================================================
//
// An input field can be in three states:
//
// STATE 1: PRISTINE (Never Touched)
// ----------------------------------
//   - User hasn't clicked on the field yet
//   - didEdit: false
//   - We DON'T show errors
//   - Give user a chance to fill it out!
//
// STATE 2: FOCUSED (User Is Typing)
// ----------------------------------
//   - User is actively typing in the field
//   - Field has focus
//   - didEdit: false (we reset it when user types)
//   - We DON'T show errors
//   - Don't interrupt the user while they're working!
//
// STATE 3: TOUCHED (User Left Field)
// -----------------------------------
//   - User has left the field (blur event)
//   - didEdit: true
//   - We DO validate and show errors if needed
//   - User has finished with this field, we can give feedback!
//
// TRANSITIONS:
// ------------
//   PRISTINE → (click) → FOCUSED
//   FOCUSED → (tab/click outside) → TOUCHED
//   TOUCHED → (click back in) → FOCUSED
//   FOCUSED → (tab again) → TOUCHED
//
// This state machine gives the best UX!
//
// =============================================================================
// WHY RESET didEdit TO FALSE WHEN USER TYPES?
// =============================================================================
//
// This is the KEY IMPROVEMENT in Lesson 261!
//
// WITHOUT RESETTING (What we might think):
// -----------------------------------------
//   1. User has invalid email, leaves field
//      → didEdit.email: true, error shows
//   2. User clicks back in to fix it
//   3. User starts typing '@'
//      → didEdit.email: still true (not reset!)
//      → Error still showing while user types!
//   4. User finishes typing 'test@test.com'
//      → Error disappears (now valid)
//      → But error was visible the whole time while fixing!
//
// This feels BAD! User is actively fixing the issue but the error stays!
//
// WITH RESETTING (What we implemented):
// --------------------------------------
//   1. User has invalid email, leaves field
//      → didEdit.email: true, error shows
//   2. User clicks back in to fix it
//   3. User starts typing '@'
//      → We set didEdit.email: false (in handleInputChange!)
//      → Error disappears immediately! ✓
//   4. User finishes typing 'test@test.com'
//      → No error showing (didEdit is false while typing)
//   5. User tabs to next field
//      → didEdit.email: true (blur event)
//      → We validate: it's now valid!
//      → No error ✓
//
// This feels GREAT! Error disappears as soon as user starts fixing it!
// User gets immediate positive feedback: "I'm on the right track!"
//
// =============================================================================
// COMPARISON: KEYSTROKE vs BLUR VALIDATION
// =============================================================================
//
// KEYSTROKE VALIDATION (Lesson 260):
// -----------------------------------
// Validates: On EVERY character typed
// Shows errors: As soon as user types first character
// Problem: TOO EARLY - user is still typing!
//
// Example:
//   User types: 't' → Error! "Invalid email"
//   User types: 'e' → Error! (still no @)
//   User types: 's' → Error! (still no @)
//   User types: 't' → Error! (annoying!)
//   User types: '@' → Error disappears
//
// This is ANNOYING! User barely started typing.
//
// BLUR VALIDATION (Lesson 261):
// ------------------------------
// Validates: When user LEAVES the field
// Shows errors: After user is done typing
// Benefit: JUST RIGHT - user had a chance to finish!
//
// Example:
//   User types: 't' → No error
//   User types: 'e' → No error
//   User types: 's' → No error
//   User types: 't' → No error
//   User tabs away → NOW validate → Error! "Invalid email"
//   User goes back → Error disappears as soon as they type
//   User types: '@test.com' → No error while typing
//   User tabs away → Validate → No error (valid!)
//
// This is PERFECT! Best of both worlds.
//
// =============================================================================
// THE TWO-WAY DANCE: didEdit true ↔ false
// =============================================================================
//
// didEdit toggles between true and false as user interacts:
//
//   onBlur → set didEdit to TRUE  (user left field, validate now!)
//   onChange → set didEdit to FALSE (user is typing, hide error!)
//   onBlur → set didEdit to TRUE  (user left again, validate again!)
//   onChange → set didEdit to FALSE (typing again, hide again!)
//
// This creates a responsive, encouraging UX:
//   - Error appears when user leaves field (if invalid)
//   - Error disappears when user starts fixing it
//   - Error appears again if still invalid when they leave
//   - Error stays hidden if valid when they leave
//
// =============================================================================
// HANDLING EMPTY FIELDS
// =============================================================================
//
// PROBLEM FROM LESSON 260:
// ------------------------
// With keystroke validation (email !== ''), we couldn't detect:
//   - User types 'test@test.com' (valid, no error)
//   - User deletes everything (empty)
//   - email === '' → emailIsInvalid was false
//   - No error shown! (But field is required!)
//
// SOLVED IN LESSON 261:
// ---------------------
// With blur validation (didEdit.email):
//   - User types 'test@test.com' (valid)
//   - User tabs away → didEdit.email: true, no error (valid)
//   - User goes back and deletes everything
//   - onChange → didEdit.email: false, email: ''
//   - User tabs away → didEdit.email: true
//   - emailIsInvalid: didEdit.email && !''.includes('@')
//     → true && true → true
//   - Error shows! ✓ (Empty email is invalid)
//
// Now we CAN detect when user clears a field!
//
// =============================================================================
// IMPLEMENTATION SUMMARY
// =============================================================================
//
// 1. CREATE didEdit STATE:
//    const [didEdit, setDidEdit] = useState({ email: false, password: false });
//
// 2. CREATE BLUR HANDLER:
//    function handleInputBlur(identifier) {
//      setDidEdit(prev => ({ ...prev, [identifier]: true }));
//    }
//
// 3. UPDATE CHANGE HANDLER (reset didEdit):
//    function handleInputChange(identifier, value) {
//      setEnteredValues(prev => ({ ...prev, [identifier]: value }));
//      setDidEdit(prev => ({ ...prev, [identifier]: false }));  // NEW!
//    }
//
// 4. UPDATE VALIDATION LOGIC:
//    const emailIsInvalid = didEdit.email &&  // Was: enteredValues.email !== ''
//                           !enteredValues.email.includes('@');
//
// 5. ADD onBlur TO JSX:
//    <input
//      value={enteredValues.email}
//      onChange={(e) => handleInputChange('email', e.target.value)}
//      onBlur={() => handleInputBlur('email')}  // NEW!
//    />
//
// =============================================================================
// KEY TAKEAWAYS FROM LESSON 261
// =============================================================================
//
// 1. BLUR VALIDATION waits until user leaves the field
//    - Gives user a chance to finish typing
//    - Avoids the "error too early" problem
//
// 2. TRACK TOUCHED STATE with didEdit
//    - Separate state to know if user has interacted with field
//    - false = pristine or actively typing
//    - true = user left field, we can validate
//
// 3. RESET didEdit when user starts typing again
//    - Hides error immediately when user is fixing the issue
//    - Provides encouraging UX
//    - Shows error again if still invalid when they leave
//
// 4. THIS IS THE BEST APPROACH for most forms!
//    - Not too early (unlike keystroke validation)
//    - Not too late (unlike submit-only validation)
//    - Responsive (error disappears when user starts fixing)
//
// 5. NEXT UP: Validate on SUBMIT (catch all errors before submission)
//    - Combine blur validation with submit validation
//    - The ultimate form validation strategy!
//
// =============================================================================
