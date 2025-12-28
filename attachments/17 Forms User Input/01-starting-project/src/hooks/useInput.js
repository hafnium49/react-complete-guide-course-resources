// =============================================================================
// LESSON 267: CUSTOM HOOK FOR INPUT MANAGEMENT
// =============================================================================
//
// WHY CREATE A CUSTOM HOOK FOR INPUT MANAGEMENT?
// -----------------------------------------------
// In StateLogin.jsx, we had to write a LOT of code to manage form inputs:
//   - useState for enteredValues (email, password)
//   - useState for didEdit (email, password)
//   - handleInputChange function
//   - handleInputBlur function
//   - Validation logic (emailIsInvalid, passwordIsInvalid)
//
// If we have 10 different forms in our app (Login, Signup, Profile, Contact, etc.),
// we'd have to COPY all this code into EACH form component!
//
// THE DRY PRINCIPLE: Don't Repeat Yourself
// -----------------------------------------
// Just like we extracted:
//   - JSX into the Input component (Lesson 265)
//   - Validation logic into utility functions (Lesson 266)
//
// We can now extract the STATE MANAGEMENT logic into a CUSTOM HOOK!
//
// WHAT IS A CUSTOM HOOK?
// ----------------------
// A custom hook is a JavaScript function that:
//   - Starts with "use" (e.g., useInput, useForm, useAuth)
//   - Can use other React hooks (useState, useEffect, etc.)
//   - Encapsulates reusable stateful logic
//   - Can be called from any component
//
// It's like a regular function, but it can use hooks!
//
// WHY CAN'T WE USE A REGULAR FUNCTION?
// -------------------------------------
// Because we need to use useState and other hooks!
//
// React rules say: "Hooks can only be called from:
//   1. React component functions
//   2. Other custom hooks"
//
// So if we want to extract code that uses useState,
// we MUST create a custom hook, not a regular function.
//
// BENEFITS OF THIS CUSTOM HOOK:
// ------------------------------
// ✓ Write state management logic ONCE
// ✓ Use it in EVERY form (Login, Signup, Profile, etc.)
// ✓ Reduce code duplication
// ✓ Easier to maintain (fix bugs in one place)
// ✓ Easier to test (test the hook independently)
// ✓ Cleaner components (less code)
//
// =============================================================================
// HOW THIS CUSTOM HOOK WORKS
// =============================================================================
//
// DESIGN DECISION: One Hook Per Input
// ------------------------------------
// Instead of managing ALL inputs in one hook (like we did in StateLogin.jsx):
//   const [enteredValues, setEnteredValues] = useState({ email: '', password: '' });
//
// We make this hook manage ONE SINGLE INPUT:
//   const [enteredValue, setEnteredValue] = useState('');
//
// WHY?
// ----
// This makes the hook more flexible and reusable:
//   - Use it for email? Call useInput() once
//   - Use it for password? Call useInput() again
//   - Use it for 10 inputs? Call useInput() 10 times
//
// Each call creates an INDEPENDENT instance with its own state!
//
// USAGE EXAMPLE:
// --------------
// In a component:
//   const { value: emailValue, handleInputChange: handleEmailChange, ... } = useInput('', isEmail);
//   const { value: passwordValue, handleInputChange: handlePasswordChange, ... } = useInput('', hasMinLength);
//
// Each useInput() call manages ONE input field independently.
//
// =============================================================================
// PARAMETERS THIS HOOK ACCEPTS
// =============================================================================
//
// PARAMETER 1: defaultValue
// --------------------------
// The initial value for the input.
//
// Examples:
//   useInput('')           → Starts with empty string (most common)
//   useInput('test@test.com') → Pre-populate with a value
//   useInput('John Doe')   → For editing existing data
//
// Why make this a parameter?
//   - Allows pre-populating inputs when editing data
//   - Example: Edit Profile form should show current user data
//   - Example: Edit Post form should show current post content
//
// PARAMETER 2: validationFn
// --------------------------
// A function that validates the input value.
//
// This function should:
//   - Accept a value as parameter
//   - Return true if valid
//   - Return false if invalid
//
// Examples:
//   useInput('', isEmail)                    → Validates with isEmail function
//   useInput('', (value) => value.length > 3) → Custom validation
//   useInput('', (value) => isEmail(value) && isNotEmpty(value)) → Combined validation
//
// Why make this a parameter?
//   - Different inputs have different validation rules
//   - Email needs isEmail validation
//   - Password needs hasMinLength validation
//   - Username might need custom API check
//   - By passing the function, we keep the hook flexible!
//
// =============================================================================

import { useState } from 'react';

// =============================================================================
// THE useInput CUSTOM HOOK
// =============================================================================
//
// NAMING CONVENTION:
// ------------------
// Must start with "use" so React knows it's a hook!
//
// Examples of valid hook names:
//   ✓ useInput
//   ✓ useForm
//   ✓ useAuth
//   ✓ useFetch
//
// Examples of INVALID hook names:
//   ✗ inputHook (doesn't start with "use")
//   ✗ manageInput (doesn't start with "use")
//   ✗ Input (looks like a component)
//
// React will apply the "Rules of Hooks" to any function starting with "use":
//   - Must only be called from components or other hooks
//   - Must only be called at the top level (not in loops, conditions, etc.)
//
// =============================================================================
export default function useInput(defaultValue, validationFn) {
  // ===========================================================================
  // STATE: MANAGING THE INPUT VALUE (ONE SINGLE VALUE, NOT AN OBJECT!)
  // ===========================================================================
  //
  // DESIGN CHANGE FROM StateLogin.jsx:
  // -----------------------------------
  // BEFORE (in StateLogin.jsx):
  //   const [enteredValues, setEnteredValues] = useState({
  //     email: '',
  //     password: ''
  //   });
  //
  // AFTER (in this hook):
  //   const [enteredValue, setEnteredValue] = useState(defaultValue);
  //
  // WHY THE CHANGE?
  // ---------------
  // This hook manages ONE input, not ALL inputs.
  //
  // So instead of an object with multiple properties,
  // we just have a single value!
  //
  // USING THE defaultValue PARAMETER:
  // ----------------------------------
  // We use the defaultValue parameter as the initial state.
  //
  // This allows the component to control the initial value:
  //   useInput('')           → Starts empty
  //   useInput('test@test.com') → Starts with this value
  //
  // Examples:
  //   User creating a new account: useInput('') (empty form)
  //   User editing their profile: useInput(user.email) (pre-populated)
  //
  // ===========================================================================
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  // This state holds the CURRENT value of the input field.
  //
  // When user types "hello", enteredValue becomes "hello"
  // When user deletes text, enteredValue becomes ""
  // When form is reset, we can setEnteredValue('') to clear it

  // ===========================================================================
  // STATE: TRACKING WHETHER USER HAS TOUCHED THE INPUT
  // ===========================================================================
  //
  // DESIGN CHANGE FROM StateLogin.jsx:
  // -----------------------------------
  // BEFORE (in StateLogin.jsx):
  //   const [didEdit, setDidEdit] = useState({
  //     email: false,
  //     password: false
  //   });
  //
  // AFTER (in this hook):
  //   const [didEdit, setDidEdit] = useState(false);
  //
  // WHY THE CHANGE?
  // ---------------
  // Again, this hook manages ONE input, so we only need ONE boolean!
  //
  // WHAT DOES didEdit MEAN?
  // ------------------------
  // didEdit = false: User has NOT touched this input yet
  //   - They haven't clicked on it
  //   - OR they're currently typing in it
  //   - We DON'T show validation errors yet
  //
  // didEdit = true: User HAS touched and LEFT this input
  //   - They clicked on it (focus)
  //   - They typed something (or left it empty)
  //   - They left it (blur)
  //   - NOW we can show validation errors!
  //
  // THE FLOW:
  // ---------
  // 1. Page loads → didEdit: false
  // 2. User clicks on input → didEdit: false (still typing)
  // 3. User types "test" → didEdit: false (still typing)
  // 4. User tabs away (blur) → didEdit: true (finished with field!)
  // 5. User goes back and types more → didEdit: false (editing again!)
  // 6. User tabs away again → didEdit: true (finished again!)
  //
  // This gives the BEST UX for validation timing!
  //
  // ===========================================================================
  const [didEdit, setDidEdit] = useState(false);
  // Initially false = user hasn't touched this input yet
  // Becomes true when user leaves the field (blur)
  // Becomes false again when user starts typing (onChange)

  // ===========================================================================
  // HANDLER: WHEN INPUT VALUE CHANGES (USER TYPES)
  // ===========================================================================
  //
  // DESIGN CHANGE FROM StateLogin.jsx:
  // -----------------------------------
  // BEFORE (in StateLogin.jsx):
  //   function handleInputChange(identifier, value) {
  //     setEnteredValues(prevValues => ({
  //       ...prevValues,
  //       [identifier]: value
  //     }));
  //     setDidEdit(prevEdit => ({
  //       ...prevEdit,
  //       [identifier]: false
  //     }));
  //   }
  //
  // AFTER (in this hook):
  //   function handleInputChange(event) {
  //     setEnteredValue(event.target.value);
  //     setDidEdit(false);
  //   }
  //
  // WHY SIMPLER?
  // ------------
  // Because we're managing ONE input, not multiple!
  //
  // We don't need:
  //   - The identifier parameter (which input is this?)
  //   - The spread operator (...prevValues)
  //   - The computed property name ([identifier]: value)
  //
  // We just directly set the single value!
  //
  // PARAMETER: event
  // ----------------
  // This will be the standard React event object from onChange.
  //
  // The component will call this function like:
  //   <input onChange={handleInputChange} />
  //
  // React automatically passes the event object.
  //
  // We extract the value from: event.target.value
  //
  // THE TWO STATE UPDATES:
  // ----------------------
  // 1. setEnteredValue(event.target.value)
  //    → Update the input's value to what user typed
  //
  // 2. setDidEdit(false)
  //    → Mark as "currently editing"
  //    → This HIDES any error message that was showing
  //    → Gives user immediate positive feedback as they fix the error!
  //
  // EXAMPLE FLOW:
  // -------------
  // 1. User has invalid email "test" (no @)
  // 2. User tabs away → didEdit becomes true → error shows
  // 3. User goes back and types "@" → handleInputChange fires
  // 4. setEnteredValue("test@") → value updated
  // 5. setDidEdit(false) → error DISAPPEARS immediately!
  // 6. User feels encouraged - "I'm fixing it!"
  //
  // ===========================================================================
  function handleInputChange(event) {
    // -------------------------------------------------------------------------
    // UPDATE THE INPUT VALUE
    // -------------------------------------------------------------------------
    // Get the new value from the event and update our state
    // -------------------------------------------------------------------------
    setEnteredValue(event.target.value);
    // event.target.value is what the user typed
    // This updates our enteredValue state to match

    // -------------------------------------------------------------------------
    // RESET "TOUCHED" STATE
    // -------------------------------------------------------------------------
    // Mark the field as "currently being edited"
    // This hides any validation error that was showing
    // -------------------------------------------------------------------------
    setDidEdit(false);
    // When user starts typing again, we hide the error
    // This gives immediate positive feedback!
  }

  // ===========================================================================
  // HANDLER: WHEN INPUT LOSES FOCUS (USER LEAVES FIELD)
  // ===========================================================================
  //
  // DESIGN CHANGE FROM StateLogin.jsx:
  // -----------------------------------
  // BEFORE (in StateLogin.jsx):
  //   function handleInputBlur(identifier) {
  //     setDidEdit(prevEdit => ({
  //       ...prevEdit,
  //       [identifier]: true
  //     }));
  //   }
  //
  // AFTER (in this hook):
  //   function handleInputBlur() {
  //     setDidEdit(true);
  //   }
  //
  // WHY SIMPLER?
  // ------------
  // Same reason as handleInputChange!
  //
  // We're managing ONE input, so we just set the single didEdit state to true.
  //
  // NO PARAMETER NEEDED!
  // --------------------
  // We don't need the identifier because we're only managing one input.
  //
  // The component will call this function like:
  //   <input onBlur={handleInputBlur} />
  //
  // React automatically calls it when the input loses focus.
  //
  // WHAT THIS DOES:
  // ---------------
  // Sets didEdit to true, which means:
  //   "User has finished with this field, we can now validate it!"
  //
  // This triggers the validation error to appear (if the value is invalid).
  //
  // EXAMPLE FLOW:
  // -------------
  // 1. User types "test" in email field
  // 2. User tabs to next field → onBlur fires → handleInputBlur runs
  // 3. setDidEdit(true) → marks field as touched
  // 4. Component re-renders
  // 5. hasError is recalculated (didEdit && !valueIsValid)
  // 6. hasError becomes true (if value is invalid)
  // 7. Error message appears in the UI!
  //
  // ===========================================================================
  function handleInputBlur() {
    // -------------------------------------------------------------------------
    // MARK FIELD AS "TOUCHED"
    // -------------------------------------------------------------------------
    // User has left the field, so we can now show validation errors
    // -------------------------------------------------------------------------
    setDidEdit(true);
    // When user leaves the field, we mark it as touched
    // This allows validation errors to appear
  }

  // ===========================================================================
  // COMPUTED VALUE: IS THE VALUE VALID?
  // ===========================================================================
  //
  // NEW IN LESSON 267!
  // ------------------
  // We outsource the validation logic into this custom hook!
  //
  // HOW IT WORKS:
  // -------------
  // We call the validationFn (passed as a parameter) with the current value.
  //
  // The validationFn should return:
  //   - true if the value is valid
  //   - false if the value is invalid
  //
  // EXAMPLE USAGE IN COMPONENT:
  // ----------------------------
  // const { ... } = useInput('', isEmail);
  //   → validationFn is isEmail
  //   → valueIsValid = isEmail(enteredValue)
  //
  // const { ... } = useInput('', (value) => hasMinLength(value, 6));
  //   → validationFn is the arrow function
  //   → valueIsValid = hasMinLength(enteredValue, 6)
  //
  // WHY ACCEPT validationFn AS A PARAMETER?
  // ----------------------------------------
  // Because different inputs have different validation rules!
  //
  // Email input: needs isEmail validation
  // Password input: needs hasMinLength validation
  // Username input: might need custom API validation
  //
  // By accepting the validation function as a parameter,
  // we keep this hook flexible and reusable!
  //
  // COMBINING MULTIPLE VALIDATIONS:
  // --------------------------------
  // If you need to run multiple validations, pass an arrow function:
  //
  //   useInput('', (value) => isEmail(value) && isNotEmpty(value))
  //
  // This arrow function will be the validationFn, and it runs both checks!
  //
  // RECALCULATION:
  // --------------
  // This is a computed value (not state), so it recalculates on every render.
  //
  // When user types "t" → enteredValue changes → valueIsValid recalculates
  // When user types "@" → enteredValue changes → valueIsValid recalculates
  //
  // ===========================================================================
  const valueIsValid = validationFn(enteredValue);
  // Call the validation function with the current value
  //
  // Examples:
  //   If validationFn is isEmail and enteredValue is 'test@test.com':
  //     valueIsValid = isEmail('test@test.com') = true
  //
  //   If validationFn is isEmail and enteredValue is 'test':
  //     valueIsValid = isEmail('test') = false
  //
  //   If validationFn is (value) => hasMinLength(value, 6) and enteredValue is 'abc':
  //     valueIsValid = hasMinLength('abc', 6) = false

  // ===========================================================================
  // COMPUTED VALUE: SHOULD WE SHOW AN ERROR?
  // ===========================================================================
  //
  // THE VALIDATION FORMULA:
  // -----------------------
  // hasError = didEdit && !valueIsValid
  //
  // This means "show error" when BOTH conditions are true:
  //   1. User has touched and left the field (didEdit is true)
  //   2. The value is NOT valid (!valueIsValid is true)
  //
  // TRUTH TABLE:
  // ------------
  // didEdit | valueIsValid | !valueIsValid | hasError | UI State
  // --------|--------------|---------------|----------|------------------
  // false   | false        | true          | false    | No error (user hasn't touched yet)
  // false   | true         | false         | false    | No error (user still typing)
  // true    | false        | true          | true     | ERROR! (invalid and touched)
  // true    | true         | false         | false    | No error (valid!)
  //
  // EXAMPLE FLOWS:
  // --------------
  // Flow 1: User types invalid email and leaves field
  //   1. Page loads → didEdit: false, value: '' → hasError: false (no error)
  //   2. User types 'test' → didEdit: false, value: 'test' → hasError: false (still typing)
  //   3. User tabs away → didEdit: true, value: 'test' → hasError: true (ERROR!)
  //
  // Flow 2: User fixes the error
  //   1. Error is showing → didEdit: true, value: 'test' → hasError: true
  //   2. User types '@' → didEdit: false, value: 'test@' → hasError: false (error hides!)
  //   3. User continues typing → didEdit: false, value: 'test@test.com' → hasError: false
  //   4. User tabs away → didEdit: true, value: 'test@test.com' → hasError: false (valid!)
  //
  // Flow 3: User starts with valid email
  //   1. User types 'test@test.com' → didEdit: false → hasError: false (still typing)
  //   2. User tabs away → didEdit: true, valueIsValid: true → hasError: false (no error!)
  //
  // WHY THIS FORMULA WORKS PERFECTLY:
  // ----------------------------------
  // ✓ No error on page load (didEdit is false)
  // ✓ No error while user is typing (didEdit is false)
  // ✓ Error appears when user leaves field with invalid value (both true)
  // ✓ Error disappears when user starts typing to fix it (didEdit becomes false)
  // ✓ No error when user leaves field with valid value (valueIsValid is true)
  //
  // This is the PERFECT validation timing for great UX!
  //
  // ===========================================================================
  const hasError = didEdit && !valueIsValid;
  // Show error only if:
  //   1. User has touched and left the field (didEdit = true)
  //   2. AND the value is invalid (!valueIsValid = true)

  // ===========================================================================
  // RETURN: EXPOSING VALUES AND FUNCTIONS TO THE COMPONENT
  // ===========================================================================
  //
  // WHAT COMPONENTS NEED:
  // ---------------------
  // Components using this hook need access to:
  //   1. value - to display in the input (value prop)
  //   2. handleInputChange - to update value when user types (onChange prop)
  //   3. handleInputBlur - to mark as touched when user leaves (onBlur prop)
  //   4. hasError - to show/hide error message (conditional rendering)
  //
  // WHY RETURN AN OBJECT?
  // ---------------------
  // We could return an array:
  //   return [value, handleInputChange, handleInputBlur, hasError];
  //
  // But an object is better because:
  //   ✓ Named properties (self-documenting)
  //   ✓ Can destructure with aliases easily
  //   ✓ Order doesn't matter
  //   ✓ Can add more properties later without breaking existing code
  //
  // DESTRUCTURING WITH ALIASES IN COMPONENT:
  // -----------------------------------------
  // const {
  //   value: emailValue,
  //   handleInputChange: handleEmailChange,
  //   handleInputBlur: handleEmailBlur,
  //   hasError: emailHasError
  // } = useInput('', isEmail);
  //
  // WHY USE ALIASES?
  // ----------------
  // Because we'll call useInput MULTIPLE TIMES for different inputs!
  //
  // If we call it twice without aliases:
  //   const { value, handleInputChange, ... } = useInput('', isEmail);
  //   const { value, handleInputChange, ... } = useInput('', hasMinLength);
  //   // ERROR! Can't declare 'value' twice!
  //
  // With aliases:
  //   const { value: emailValue, ... } = useInput('', isEmail);
  //   const { value: passwordValue, ... } = useInput('', hasMinLength);
  //   // Perfect! Two different variables!
  //
  // USAGE EXAMPLE IN COMPONENT:
  // ----------------------------
  // const {
  //   value: emailValue,
  //   handleInputChange: handleEmailChange,
  //   handleInputBlur: handleEmailBlur,
  //   hasError: emailHasError
  // } = useInput('', (value) => isEmail(value) && isNotEmpty(value));
  //
  // <Input
  //   value={emailValue}
  //   onChange={handleEmailChange}
  //   onBlur={handleEmailBlur}
  //   error={emailHasError && "Please enter a valid email."}
  // />
  //
  // ===========================================================================
  return {
    // -------------------------------------------------------------------------
    // value: The current input value
    // -------------------------------------------------------------------------
    // Component will use this for the input's value prop
    // -------------------------------------------------------------------------
    value: enteredValue,

    // -------------------------------------------------------------------------
    // handleInputChange: Function to call when value changes
    // -------------------------------------------------------------------------
    // Component will use this for the input's onChange prop
    // -------------------------------------------------------------------------
    handleInputChange,

    // -------------------------------------------------------------------------
    // handleInputBlur: Function to call when input loses focus
    // -------------------------------------------------------------------------
    // Component will use this for the input's onBlur prop
    // -------------------------------------------------------------------------
    handleInputBlur,

    // -------------------------------------------------------------------------
    // hasError: Boolean indicating if there's a validation error
    // -------------------------------------------------------------------------
    // Component will use this for conditional error rendering
    // -------------------------------------------------------------------------
    hasError,
  };
  //
  // The component can now destructure these values and use them!
  //
  // ===========================================================================
}

// =============================================================================
// SUMMARY: HOW TO USE THIS CUSTOM HOOK
// =============================================================================
//
// STEP 1: IMPORT THE HOOK
// -----------------------
// import useInput from '../hooks/useInput.js';
// import { isEmail, hasMinLength } from '../util/validation.js';
//
// STEP 2: CALL THE HOOK (ONCE PER INPUT!)
// ----------------------------------------
// // For email input:
// const {
//   value: emailValue,
//   handleInputChange: handleEmailChange,
//   handleInputBlur: handleEmailBlur,
//   hasError: emailHasError
// } = useInput('', (value) => isEmail(value) && isNotEmpty(value));
//
// // For password input:
// const {
//   value: passwordValue,
//   handleInputChange: handlePasswordChange,
//   handleInputBlur: handlePasswordBlur,
//   hasError: passwordHasError
// } = useInput('', (value) => hasMinLength(value, 6));
//
// STEP 3: USE IN JSX
// ------------------
// <Input
//   label="Email"
//   id="email"
//   type="email"
//   name="email"
//   value={emailValue}
//   onChange={handleEmailChange}
//   onBlur={handleEmailBlur}
//   error={emailHasError && "Please enter a valid email."}
// />
//
// <Input
//   label="Password"
//   id="password"
//   type="password"
//   name="password"
//   value={passwordValue}
//   onChange={handlePasswordChange}
//   onBlur={handlePasswordBlur}
//   error={passwordHasError && "Password must be at least 6 characters."}
// />
//
// STEP 4: USE IN SUBMIT HANDLER
// ------------------------------
// function handleSubmit(event) {
//   event.preventDefault();
//
//   // Check if either input has an error
//   if (emailHasError || passwordHasError) {
//     return; // Don't submit if there are errors
//   }
//
//   // Use the values
//   console.log(emailValue, passwordValue);
//   // Send to backend, etc.
// }
//
// =============================================================================
// KEY TAKEAWAYS
// =============================================================================
//
// 1. CUSTOM HOOKS extract reusable stateful logic
//    - Must start with "use"
//    - Can use other hooks (useState, useEffect, etc.)
//    - Can be called from components or other hooks
//
// 2. THIS HOOK manages ONE input per call
//    - Call it once for email → gets email state
//    - Call it again for password → gets separate password state
//    - Each call is independent!
//
// 3. ACCEPT validation function as parameter
//    - Makes the hook flexible
//    - Different inputs have different rules
//    - Can combine multiple validations with arrow function
//
// 4. RETURN an object with named properties
//    - Easier to destructure with aliases
//    - Self-documenting
//    - Can add more properties later
//
// 5. BENEFITS: Reusable, testable, maintainable, cleaner components
//
// =============================================================================
