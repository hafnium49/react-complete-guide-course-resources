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

import { useState } from 'react';
import Input from './Input.jsx';

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
  // TRACKING "TOUCHED" STATE - New in Lesson 261
  // ===========================================================================
  //
  // PROBLEM WE'RE SOLVING:
  // -----------------------
  // In Lesson 260, we validated on every keystroke by checking:
  //   emailIsInvalid = enteredValues.email !== '' && !enteredValues.email.includes('@')
  //
  // This had problems:
  //   - Error showed TOO EARLY (as soon as user started typing)
  //   - Couldn't distinguish "never touched" from "cleared after typing"
  //
  // THE SOLUTION: Track Whether User Has Interacted With Each Field
  // ----------------------------------------------------------------
  // We need a separate piece of state to track whether the user has
  // "touched" or "edited" each input field.
  //
  // "Touched" means:
  //   - User clicked into the field (gave it focus)
  //   - User typed something or left it empty
  //   - User left the field (it lost focus / "blurred")
  //
  // We track this with a "didEdit" state object.
  //
  // WHY A SEPARATE STATE?
  // ---------------------
  // We COULD merge this into enteredValues:
  //   {
  //     email: { value: '', didEdit: false },
  //     password: { value: '', didEdit: false }
  //   }
  //
  // But that makes the code more complex. It's cleaner to have two states:
  //   - enteredValues: { email: '', password: '' }
  //   - didEdit: { email: false, password: false }
  //
  // ===========================================================================
  const [didEdit, setDidEdit] = useState({
    // -------------------------------------------------------------------------
    // INITIAL VALUES: false (User hasn't touched these fields yet)
    // -------------------------------------------------------------------------
    // When the component first renders:
    //   - User hasn't clicked on email field → email: false
    //   - User hasn't clicked on password field → password: false
    //
    // These will be set to true when the user BLURS (leaves) a field.
    // -------------------------------------------------------------------------
    email: false,    // Has user interacted with email field? Initially: No
    password: false, // Has user interacted with password field? Initially: No
  });
  //
  // HOW THIS STATE WILL BE USED:
  // -----------------------------
  // 1. Initially, both are false (user hasn't touched anything)
  //
  // 2. User clicks on email field → nothing happens yet (still false)
  //
  // 3. User types in email field → we'll RESET it to false (Lesson 261 improvement)
  //    Why? To hide error while user is actively fixing the issue
  //
  // 4. User tabs out of email field (blur event) → we set email to true
  //    Now we know: "User has finished with this field, we can validate it"
  //
  // 5. We only show validation errors if:
  //    - didEdit.email is true (user has interacted with it)
  //    - AND the value is invalid
  //
  // This gives the user a chance to type before we show errors!
  //
  // ===========================================================================

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

    // -------------------------------------------------------------------------
    // NEW IN LESSON 261: Reset "didEdit" to false when user starts typing again
    // -------------------------------------------------------------------------
    //
    // WHY DO THIS?
    // ------------
    // If the user has an error showing (from blur validation), and they start
    // typing to fix it, we want to HIDE the error immediately.
    //
    // This gives immediate positive feedback:
    //   - User sees error after leaving field
    //   - User goes back to fix it
    //   - Error disappears as soon as they start typing!
    //   - User feels encouraged that they're fixing the issue
    //
    // HOW IT WORKS:
    // -------------
    // 1. User had invalid email 'test', left field → didEdit.email = true, error shows
    // 2. User clicks back into email field
    // 3. User types '@' → handleInputChange fires
    // 4. We set didEdit.email = false (this line below)
    // 5. Error disappears! (because emailIsInvalid now uses didEdit.email)
    // 6. User continues typing 'test.com'
    // 7. User leaves field → blur event → didEdit.email = true again
    // 8. Now it's valid, so no error shows!
    //
    // WITHOUT THIS:
    // -------------
    // Error would stay visible WHILE user is typing the fix.
    // This can feel discouraging - like "I'm fixing it but the error won't go away!"
    //
    // WITH THIS:
    // ----------
    // Error disappears immediately when user starts typing.
    // This feels encouraging - "Great! I'm on the right track!"
    //
    // THE BEST OF BOTH WORLDS:
    // -------------------------
    // - Don't show error too early (wait for blur)
    // - Don't show error too long (hide when user starts fixing)
    // - Show error again if still invalid when they leave field
    //
    // -------------------------------------------------------------------------
    setDidEdit((prevEdit) => ({
      ...prevEdit,           // Keep other fields unchanged
      [identifier]: false,   // Reset this field to false (user is editing now)
    }));
    //
    // Example execution:
    //   handleInputChange('email', 't')
    //   → setDidEdit({ email: false, password: false })  (email was true, now false)
    //
    // This happens on EVERY KEYSTROKE in ANY input!
    //
    // -------------------------------------------------------------------------
  }

  // ===========================================================================
  // BLUR HANDLER - Fires when input loses focus (NEW IN LESSON 261)
  // ===========================================================================
  //
  // WHAT IS "BLUR"?
  // ---------------
  // "Blur" is the opposite of "focus":
  //   - User clicks on input → input gets "focus"
  //   - User clicks outside input or presses Tab → input loses "focus" = "blur"
  //
  // The blur event is a BUILT-IN BROWSER EVENT, just like click or change.
  //
  // WHY VALIDATE ON BLUR?
  // ---------------------
  // Blur validation gives the user a chance to FINISH TYPING before we
  // show an error. This avoids the "error too early" problem.
  //
  // Example user flow:
  //   1. User clicks on email field → focus (nothing happens yet)
  //   2. User types 't' → onChange fires (we reset didEdit to false)
  //   3. User types 'e' → onChange fires (didEdit still false)
  //   4. User types 's' → onChange fires (didEdit still false)
  //   5. User types 't' → onChange fires (didEdit still false)
  //   6. User tabs to next field → BLUR EVENT! (we set didEdit to true)
  //   7. Now we validate: didEdit.email is true, email is 'test' (no @)
  //   8. Error shows!
  //
  // The user had a chance to type their full email before we complained!
  //
  // ===========================================================================
  function handleInputBlur(identifier) {
    // -------------------------------------------------------------------------
    // SET didEdit TO TRUE - Mark this field as "touched"
    // -------------------------------------------------------------------------
    //
    // When this function runs, it means:
    //   - User clicked into the field (gave it focus)
    //   - User may or may not have typed something
    //   - User left the field (blur event fired)
    //
    // Now we know the user has "touched" this field, so we can validate it!
    //
    // -------------------------------------------------------------------------
    setDidEdit((prevEdit) => ({
      // -----------------------------------------------------------------------
      // SAME PATTERN AS handleInputChange
      // -----------------------------------------------------------------------
      // We use the same pattern here:
      //   1. Function form of setState (prevEdit => ...)
      //   2. Spread previous state (...prevEdit)
      //   3. Update one property dynamically ([identifier]: true)
      //
      // This is IDENTICAL to handleInputChange, except:
      //   - handleInputChange sets [identifier]: false (user is typing)
      //   - handleInputBlur sets [identifier]: true (user left field)
      //
      // -----------------------------------------------------------------------
      ...prevEdit,         // Keep other fields unchanged
      [identifier]: true,  // Mark THIS field as touched/edited
    }));
    //
    // Example execution:
    //   User leaves email field → handleInputBlur('email')
    //   → setDidEdit({ email: true, password: false })
    //
    // After this runs, didEdit.email is true, so we'll check if email is valid.
    //
    // -------------------------------------------------------------------------
  }
  //
  // THE COMPLETE BLUR VALIDATION FLOW:
  // -----------------------------------
  //
  // 1. Page loads
  //    - didEdit: { email: false, password: false }
  //    - No errors shown (didEdit.email is false)
  //
  // 2. User clicks on email field
  //    - Nothing changes (no onChange yet, no onBlur yet)
  //
  // 3. User types 'test' (each keystroke triggers onChange)
  //    - enteredValues.email: 'test'
  //    - didEdit.email: false (we reset it to false on each keystroke)
  //    - No error shown (didEdit.email is false)
  //
  // 4. User tabs to password field (onBlur fires on email field)
  //    - handleInputBlur('email') runs
  //    - didEdit.email: true
  //    - Component re-renders
  //    - emailIsInvalid is recalculated
  //    - didEdit.email && !'test'.includes('@') → true && true → true
  //    - Error appears!
  //
  // 5. User goes back to email field and types '@'
  //    - onChange fires → didEdit.email set to false
  //    - Error disappears immediately! (didEdit.email is false)
  //
  // 6. User types 'test.com'
  //    - Still typing, didEdit.email still false
  //    - No error (even though it's now valid)
  //
  // 7. User tabs to password field again
  //    - onBlur fires → didEdit.email set to true
  //    - Email is now 'test@test.com' (valid!)
  //    - didEdit.email && !'test@test.com'.includes('@') → true && false → false
  //    - No error shown! Success!
  //
  // ===========================================================================

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
    // UPDATED VALIDATION LOGIC - Using didEdit instead of checking if empty
    // -------------------------------------------------------------------------
    //
    // LESSON 260 (Old approach):
    //   emailIsInvalid = enteredValues.email !== '' && !enteredValues.email.includes('@')
    //
    // Problems with old approach:
    //   - Error showed as soon as user started typing 't'
    //   - Too early! User was still typing!
    //
    // LESSON 261 (New approach):
    //   emailIsInvalid = didEdit.email && !enteredValues.email.includes('@')
    //
    // Benefits of new approach:
    //   ✓ Wait until user has LEFT the field (blur)
    //   ✓ Give user a chance to finish typing
    //   ✓ Hide error while user is actively fixing it
    //   ✓ Show error again if still invalid after leaving field
    //
    // -------------------------------------------------------------------------
    //
    // THE NEW CONDITION: didEdit.email
    // ---------------------------------
    // Instead of checking if email is not empty (enteredValues.email !== ''),
    // we check if the user has TOUCHED/LEFT the field (didEdit.email).
    //
    // This is MUCH BETTER because:
    //
    // OLD WAY (Lesson 260):
    //   email = ''     → error: NO  (good! not started yet)
    //   email = 't'    → error: YES (bad! user is still typing!)
    //   email = 'te'   → error: YES (bad! user is still typing!)
    //   email = 'tes'  → error: YES (bad! user is still typing!)
    //   email = 'test' → error: YES (bad! user is still typing!)
    //
    // NEW WAY (Lesson 261):
    //   email = '', didEdit: false → error: NO  (good! not touched yet)
    //   email = 't', didEdit: false → error: NO  (good! user is still typing!)
    //   [user tabs out] didEdit becomes true
    //   email = 't', didEdit: true → error: YES (good! now we can validate!)
    //   [user clicks back in and types]
    //   email = 't@', didEdit: false → error: NO  (good! user is fixing it!)
    //   [user tabs out] didEdit becomes true
    //   email = 't@', didEdit: true → error: YES (still invalid)
    //   [user clicks back in and types]
    //   email = 't@t', didEdit: false → error: NO  (good! still fixing!)
    //   [user tabs out] didEdit becomes true
    //   email = 't@t', didEdit: true → error: NO  (valid! has @)
    //
    // -------------------------------------------------------------------------
    didEdit.email &&
    // -------------------------------------------------------------------------
    // THE includes() METHOD (Same as Lesson 260)
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
  // SIMPLIFIED EXPLANATION (Updated for Lesson 261):
  // -------------------------------------------------
  // emailIsInvalid will be true when:
  //   1. User has TOUCHED and LEFT the field (didEdit.email is true)
  //   2. AND the email doesn't have an @ symbol (invalid format)
  //
  // THIS SOLVES THE PROBLEMS FROM LESSON 260!
  // ------------------------------------------
  //
  // ✓ PROBLEM 1 SOLVED: Error doesn't show too early
  // -------------------------------------------------
  // User types: 't'
  // didEdit.email: false (user hasn't left field yet)
  // emailIsInvalid: false (because didEdit.email is false)
  // Error message: NOT shown
  // User continues typing without being annoyed!
  //
  // ✓ PROBLEM 2 SOLVED: Error shows when user clears field
  // -------------------------------------------------------
  // User types: 'test@test.com' (valid)
  // User tabs out: didEdit.email becomes true, no error (valid)
  // User goes back and deletes everything: ''
  // didEdit.email: false (we reset it when user starts typing)
  // User tabs out again: didEdit.email becomes true
  // emailIsInvalid: true (didEdit.email && !''.includes('@'))
  // Error message: SHOWN! (Empty email is required)
  //
  // ✓ PROBLEM 3 SOLVED: Can distinguish "untouched" from "cleared"
  // ---------------------------------------------------------------
  // Untouched: didEdit.email = false → No error
  // Touched and left: didEdit.email = true → Validate and show error if needed
  //
  // BONUS: Error disappears while user is fixing it!
  // -------------------------------------------------
  // User has error showing (invalid email, left field)
  // User clicks back into field and starts typing
  // didEdit.email: false (we reset it in handleInputChange)
  // Error disappears immediately! User feels encouraged!
  //
  // ===========================================================================

  // ===========================================================================
  // COMPUTING VALIDITY: Is the password invalid? (NEW IN LESSON 265!)
  // ===========================================================================
  //
  // SAME PATTERN AS EMAIL VALIDATION
  // ---------------------------------
  // We use the exact same pattern for password validation:
  //   1. Check if user has left the field (didEdit.password)
  //   2. Check if password is actually invalid
  //
  // DIFFERENCE: PASSWORD VALIDATION RULE
  // -------------------------------------
  // For email, we checked: !email.includes('@')
  // For password, we check: password.trim().length < 6
  //
  // WHY .trim()?
  // ------------
  // .trim() removes leading and trailing whitespace.
  //
  // Examples:
  //   'abc123'.trim()       → 'abc123' (no change)
  //   '  abc123  '.trim()   → 'abc123' (spaces removed)
  //   '   '.trim()          → '' (all whitespace removed)
  //
  // Why do we need this?
  //   - Prevents user from submitting password with only spaces
  //   - '      ' has length 6, but it's not a valid password!
  //   - '      '.trim() has length 0, so validation catches it
  //
  // THE COMPLETE VALIDATION:
  // ------------------------
  // enteredValues.password.trim().length < 6
  //
  // Step by step:
  //   1. Get password from state: enteredValues.password
  //   2. Remove whitespace: .trim()
  //   3. Get length: .length
  //   4. Check if too short: < 6
  //
  // Examples:
  //   Password: ''          → ''.trim().length = 0 → 0 < 6 → true (INVALID)
  //   Password: 'abc'       → 'abc'.trim().length = 3 → 3 < 6 → true (INVALID)
  //   Password: '   '       → '   '.trim().length = 0 → 0 < 6 → true (INVALID)
  //   Password: 'abc123'    → 'abc123'.trim().length = 6 → 6 < 6 → false (VALID)
  //   Password: 'abcdefgh'  → 'abcdefgh'.trim().length = 8 → 8 < 6 → false (VALID)
  //
  // WHY MINIMUM 6 CHARACTERS?
  // --------------------------
  // This is a common security requirement:
  //   - Too short passwords are easier to crack
  //   - 6 is a reasonable minimum (many sites use 8+)
  //   - Prevents weak passwords like "123", "abc", "pass"
  //
  // In a real app, you might also check:
  //   - Must have uppercase letter
  //   - Must have lowercase letter
  //   - Must have number
  //   - Must have special character
  //
  // COMBINING BOTH CONDITIONS WITH &&:
  // -----------------------------------
  // didEdit.password && enteredValues.password.trim().length < 6
  //
  // This is true ONLY when BOTH conditions are met:
  //   1. User has left the password field (didEdit.password = true)
  //   2. Password is too short (< 6 characters after trimming)
  //
  // VALIDATION FLOW EXAMPLES:
  // --------------------------
  // User types 'abc' and tabs away:
  //   didEdit.password: true (left field)
  //   'abc'.trim().length: 3
  //   3 < 6: true
  //   passwordIsInvalid: true && true → true
  //   → Error shows!
  //
  // User types 'abc123' and tabs away:
  //   didEdit.password: true (left field)
  //   'abc123'.trim().length: 6
  //   6 < 6: false
  //   passwordIsInvalid: true && false → false
  //   → No error!
  //
  // User types 'abc' but stays in field:
  //   didEdit.password: false (still in field)
  //   'abc'.trim().length: 3
  //   3 < 6: true
  //   passwordIsInvalid: false && true → false
  //   → No error yet! (User still typing)
  //
  // ===========================================================================
  const passwordIsInvalid =
    didEdit.password &&
    enteredValues.password.trim().length < 6;
  //
  // Now we have BOTH email and password validation!
  // Both use the same pattern (didEdit + validation rule).
  //
  // This makes it easy to add more validations:
  //   const usernameIsInvalid = didEdit.username && validation...
  //   const phoneIsInvalid = didEdit.phone && validation...
  //
  // The pattern is consistent and predictable!
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
            EMAIL INPUT - Using Reusable Component
            ===================================================================

            BEFORE (90+ lines of JSX and comments):
              <div className="control no-margin">
                <label htmlFor="email">Email</label>
                <input ... all the props ... />
                <div className="control-error">
                  {emailIsInvalid && <p>Error</p>}
                </div>
              </div>

            AFTER (8 clean lines):
              <Input
                label="Email"
                id="email"
                type="email"
                name="email"
                value={enteredValues.email}
                onChange={(event) => handleInputChange('email', event.target.value)}
                onBlur={() => handleInputBlur('email')}
                error={emailIsInvalid && "Please enter a valid email."}
              />

            All the complexity is now encapsulated in Input.jsx!

            WHAT GETS FORWARDED:
            --------------------
            The Input component receives these props and:
              - Uses 'label' for the <label> text
              - Uses 'id' for <label htmlFor> AND <input id>
              - Uses 'error' for conditional error message
              - Spreads type, name, value, onChange, onBlur onto <input>

            The result is the EXACT SAME HTML structure as before,
            but with much cleaner React code!

            =================================================================== */}
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={enteredValues.email}
          onChange={(event) => handleInputChange('email', event.target.value)}
          onBlur={() => handleInputBlur('email')}
          error={emailIsInvalid && "Please enter a valid email."}
        />

        {/* ===================================================================
            PASSWORD INPUT - Using Reusable Component (NEW IN LESSON 265!)
            ===================================================================

            Same pattern as email, but:
              - Different label: "Password"
              - Different id: "password"
              - Different type: "password" (hides characters)
              - Different identifier in handlers: 'password'
              - Different validation: passwordIsInvalid
              - Different error message: "Please enter a valid password."

            IMPORTANT: onBlur Handler Added!
            ---------------------------------
            In the transcript, the instructor mentioned:
              "And for onBlur, onChange, and value, I can again copy the code
               from down there, though here I don't even have an onBlur listener
               yet, which I'll change now though."

            So we're adding the onBlur handler that was missing before!

            This means password will now have the SAME blur validation as email:
              - User types in password field (didEdit.password stays false)
              - User tabs away → onBlur fires → didEdit.password becomes true
              - passwordIsInvalid is recalculated
              - If password < 6 characters → error shows!

            CONSISTENCY:
            ------------
            Now BOTH inputs have:
              ✓ onChange (updates state on every keystroke)
              ✓ onBlur (marks field as touched when user leaves)
              ✓ value (controlled by state)
              ✓ error (shows when invalid AND touched)

            This is the complete blur validation pattern!

            =================================================================== */}
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={enteredValues.password}
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
          onBlur={() => handleInputBlur('password')}
          error={passwordIsInvalid && "Please enter a valid password."}
        />
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
