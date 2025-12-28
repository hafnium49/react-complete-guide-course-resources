// =============================================================================
// LESSON 266: REUSABLE VALIDATION FUNCTIONS
// =============================================================================
//
// WHY EXTRACT VALIDATION LOGIC INTO UTILITY FUNCTIONS?
// -----------------------------------------------------
// In previous lessons, we wrote validation logic directly in our components:
//
//   const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
//   const passwordIsInvalid = didEdit.password && enteredValues.password.trim().length < 6;
//
// This works fine for a single form, but what if we have MULTIPLE forms
// with the SAME validation rules?
//
// Example:
//   - Login form needs email validation
//   - Signup form needs email validation
//   - Profile form needs email validation
//   - Contact form needs email validation
//
// We'd be copying the SAME validation logic: !value.includes('@')
// into FOUR different components!
//
// THE DRY PRINCIPLE: Don't Repeat Yourself
// -----------------------------------------
// Just like we extracted the Input component to avoid repeating JSX,
// we can extract validation logic to avoid repeating validation code!
//
// BENEFITS OF REUSABLE VALIDATION FUNCTIONS:
// -------------------------------------------
// ✓ Write once, use everywhere
// ✓ Fix bugs in one place
// ✓ Consistent validation across the app
// ✓ Easier to test
// ✓ Cleaner component code
// ✓ Self-documenting (function name explains what it does)
//
// EXAMPLE COMPARISON:
// -------------------
// BEFORE (Inline validation - repeated in every component):
//   const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
//   // This is repeated in Login.jsx, Signup.jsx, Profile.jsx, etc.
//   // If we want to improve email validation (check for .com, etc.),
//   // we'd have to update it in EVERY component!
//
// AFTER (Reusable function - written once, used everywhere):
//   const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email);
//   // This uses our reusable function defined below.
//   // If we want to improve email validation, we just update it HERE!
//
// =============================================================================
// HOW TO USE THESE VALIDATION FUNCTIONS
// =============================================================================
//
// STEP 1: IMPORT THE FUNCTIONS
// -----------------------------
// In your component file (e.g., StateLogin.jsx):
//
//   import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';
//
// STEP 2: USE THEM IN YOUR VALIDATION LOGIC
// ------------------------------------------
// Replace inline validation with function calls:
//
//   // OLD (inline):
//   const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
//
//   // NEW (using function):
//   const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email);
//
// STEP 3: COMBINE MULTIPLE VALIDATIONS IF NEEDED
// -----------------------------------------------
// You can combine multiple validation functions:
//
//   const emailIsInvalid =
//     didEdit.email &&
//     (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email));
//
// This checks BOTH:
//   - Email is not empty
//   - Email contains @
//
// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

// =============================================================================
// isEmail - Check if value is a valid email format
// =============================================================================
//
// WHAT IT DOES:
// -------------
// Checks if the provided value looks like an email address by checking
// if it contains an '@' symbol.
//
// PARAMETERS:
// -----------
// value (string): The email address to validate
//
// RETURNS:
// --------
// true: Value contains '@' (valid email format)
// false: Value does NOT contain '@' (invalid email format)
//
// EXAMPLES:
// ---------
// isEmail('test@test.com')   → true  ✓ (has @)
// isEmail('user@domain.org') → true  ✓ (has @)
// isEmail('testtest.com')    → false ✗ (no @)
// isEmail('test')            → false ✗ (no @)
// isEmail('')                → false ✗ (no @)
//
// HOW IT WORKS:
// -------------
// Uses JavaScript's built-in .includes() method to check if the string
// contains the '@' character.
//
//   'test@test.com'.includes('@') → true
//   'testtest.com'.includes('@')  → false
//
// IMPORTANT: This is a SIMPLE validation!
// ----------------------------------------
// This only checks for the presence of '@'. It doesn't check:
//   - If there's text before the @
//   - If there's a domain after the @
//   - If there's a .com or .org extension
//   - If the email is properly formatted
//
// For production apps, you might want more sophisticated validation:
//   - Regular expression: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   - Library: validator.js
//   - Backend verification: Send confirmation email
//
// But for learning purposes, this simple check is perfect!
//
// USAGE IN COMPONENTS:
// --------------------
// Typically used with the ! (NOT) operator to check if INVALID:
//
//   const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email);
//
// This reads as: "Email is invalid if user touched it AND it's not a valid email"
//
// COMBINING WITH OTHER VALIDATIONS:
// ----------------------------------
// You can combine this with isNotEmpty to ensure email is BOTH not empty AND valid:
//
//   const emailIsInvalid =
//     didEdit.email &&
//     (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email));
//
// =============================================================================
export function isEmail(value) {
  // -------------------------------------------------------------------------
  // THE VALIDATION LOGIC
  // -------------------------------------------------------------------------
  // Check if the value contains the '@' character.
  // This is a simple but effective email validation for our purposes.
  // -------------------------------------------------------------------------
  return value.includes('@');
}

// =============================================================================
// isNotEmpty - Check if value is not empty (after trimming whitespace)
// =============================================================================
//
// WHAT IT DOES:
// -------------
// Checks if the provided value is not empty, after removing leading
// and trailing whitespace.
//
// PARAMETERS:
// -----------
// value (string): The value to check
//
// RETURNS:
// --------
// true: Value has content (not empty after trimming)
// false: Value is empty or only whitespace
//
// EXAMPLES:
// ---------
// isNotEmpty('hello')      → true  ✓ (has content)
// isNotEmpty('   hello  ') → true  ✓ (has content after trimming)
// isNotEmpty('a')          → true  ✓ (has content)
// isNotEmpty('')           → false ✗ (empty)
// isNotEmpty('   ')        → false ✗ (only whitespace)
// isNotEmpty('     \n')    → false ✗ (only whitespace)
//
// HOW IT WORKS:
// -------------
// 1. Uses .trim() to remove leading/trailing whitespace
// 2. Compares the trimmed result to empty string ''
// 3. Returns true if NOT equal (i.e., has content)
//
// Step by step:
//   'hello'.trim() !== ''    → 'hello' !== ''   → true
//   '   '.trim() !== ''      → '' !== ''        → false
//   '  test  '.trim() !== '' → 'test' !== ''    → true
//
// WHY USE .trim()?
// ----------------
// .trim() removes leading and trailing whitespace:
//
//   'hello'.trim()       → 'hello' (no change)
//   '  hello'.trim()     → 'hello' (leading spaces removed)
//   'hello  '.trim()     → 'hello' (trailing spaces removed)
//   '  hello  '.trim()   → 'hello' (both removed)
//   '   '.trim()         → '' (all whitespace removed)
//
// This prevents users from submitting fields with only spaces:
//   - '      ' looks filled, but has no actual content
//   - Without trim: '      ' !== '' → true (would be valid!)
//   - With trim: '      '.trim() !== '' → '' !== '' → false (invalid!)
//
// USAGE IN COMPONENTS:
// --------------------
// Typically used with the ! (NOT) operator to check if empty:
//
//   const nameIsInvalid = didEdit.name && !isNotEmpty(enteredValues.name);
//
// This reads as: "Name is invalid if user touched it AND it's empty"
//
// COMBINING WITH OTHER VALIDATIONS:
// ----------------------------------
// Often combined with other validations:
//
//   const emailIsInvalid =
//     didEdit.email &&
//     (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email));
//
// This ensures email is BOTH not empty AND has valid format.
//
// COMMON USE CASES:
// -----------------
// - Required text fields (name, username, etc.)
// - Required email fields (in addition to format check)
// - Required password fields (in addition to length check)
// - Any field that must have content
//
// =============================================================================
export function isNotEmpty(value) {
  // -------------------------------------------------------------------------
  // THE VALIDATION LOGIC
  // -------------------------------------------------------------------------
  // 1. .trim() removes leading/trailing whitespace
  // 2. !== '' checks if the result is not an empty string
  // 3. Returns true if there's content, false if empty
  // -------------------------------------------------------------------------
  return value.trim() !== '';
}

// =============================================================================
// hasMinLength - Check if value meets minimum length requirement
// =============================================================================
//
// WHAT IT DOES:
// -------------
// Checks if the provided value has at least the specified minimum length.
//
// PARAMETERS:
// -----------
// value (string): The value to check
// minLength (number): The minimum required length
//
// RETURNS:
// --------
// true: Value has length >= minLength
// false: Value has length < minLength
//
// EXAMPLES:
// ---------
// hasMinLength('abc123', 6)    → true  ✓ (6 >= 6)
// hasMinLength('abcdefgh', 6)  → true  ✓ (8 >= 6)
// hasMinLength('abc', 6)       → false ✗ (3 < 6)
// hasMinLength('', 1)          → false ✗ (0 < 1)
// hasMinLength('test', 2)      → true  ✓ (4 >= 2)
//
// HOW IT WORKS:
// -------------
// 1. Gets the .length property of the string
// 2. Compares it to minLength using >=
// 3. Returns true if length is greater than or equal to minLength
//
// Step by step:
//   'abc123'.length >= 6   → 6 >= 6  → true
//   'abc'.length >= 6      → 3 >= 6  → false
//   'abcdefgh'.length >= 6 → 8 >= 6  → true
//
// THE .length PROPERTY:
// ---------------------
// Every JavaScript string has a .length property that returns the
// number of characters:
//
//   'hello'.length    → 5
//   'a'.length        → 1
//   ''.length         → 0
//   '   '.length      → 3 (spaces count!)
//   'test123'.length  → 7
//
// NOTE: This function does NOT trim whitespace!
// ----------------------------------------------
// If you want to check length AFTER trimming whitespace, do this:
//
//   hasMinLength(enteredValues.password.trim(), 6)
//
// Or combine with isNotEmpty:
//
//   const passwordIsInvalid =
//     didEdit.password &&
//     (!hasMinLength(enteredValues.password, 6) ||
//      !isNotEmpty(enteredValues.password));
//
// USAGE IN COMPONENTS:
// --------------------
// Typically used with the ! (NOT) operator to check if too short:
//
//   const passwordIsInvalid =
//     didEdit.password &&
//     !hasMinLength(enteredValues.password, 6);
//
// This reads as: "Password is invalid if user touched it AND it's shorter than 6"
//
// COMMON USE CASES:
// -----------------
// - Password fields (minimum 6-8 characters)
// - Username fields (minimum 3-5 characters)
// - ZIP codes (exactly 5 characters: !hasMinLength(zip, 5) || zip.length > 5)
// - Any field with minimum length requirements
//
// FLEXIBILITY:
// ------------
// The minLength parameter makes this function very flexible!
//
//   hasMinLength(password, 6)     // Password must be at least 6 chars
//   hasMinLength(username, 3)     // Username must be at least 3 chars
//   hasMinLength(code, 4)         // Verification code must be at least 4 chars
//   hasMinLength(name, 1)         // Name must not be empty
//
// Same function, different requirements!
//
// VALIDATION COMPARISON:
// ----------------------
// OLD (inline - in StateLogin.jsx):
//   const passwordIsInvalid =
//     didEdit.password &&
//     enteredValues.password.trim().length < 6;
//
// NEW (using this function):
//   const passwordIsInvalid =
//     didEdit.password &&
//     !hasMinLength(enteredValues.password, 6);
//
// Benefits of the new approach:
//   ✓ More readable: "hasMinLength" is clearer than ".length < 6"
//   ✓ More reusable: Can use same function for username, code, etc.
//   ✓ Easier to test: Test the function once, use it everywhere
//   ✓ Self-documenting: Name explains what it does
//
// =============================================================================
export function hasMinLength(value, minLength) {
  // -------------------------------------------------------------------------
  // THE VALIDATION LOGIC
  // -------------------------------------------------------------------------
  // Check if the string's length is greater than or equal to minLength.
  // Returns true if it meets the requirement, false if too short.
  // -------------------------------------------------------------------------
  return value.length >= minLength;
}

// =============================================================================
// isEqualsToOtherValue - Check if two values are equal
// =============================================================================
//
// WHAT IT DOES:
// -------------
// Checks if two values are exactly equal (using strict equality ===).
//
// PARAMETERS:
// -----------
// value (any): The first value to compare
// otherValue (any): The second value to compare
//
// RETURNS:
// --------
// true: Values are exactly equal
// false: Values are not equal
//
// EXAMPLES:
// ---------
// isEqualsToOtherValue('abc', 'abc')     → true  ✓ (same)
// isEqualsToOtherValue('abc', 'ABC')     → false ✗ (different case)
// isEqualsToOtherValue('abc', 'def')     → false ✗ (different)
// isEqualsToOtherValue('', '')           → true  ✓ (both empty)
// isEqualsToOtherValue('123', 123)       → false ✗ (different types!)
//
// HOW IT WORKS:
// -------------
// Uses JavaScript's strict equality operator (===) to compare values.
//
//   'abc' === 'abc'  → true
//   'abc' === 'def'  → false
//   'abc' === 'ABC'  → false (case-sensitive!)
//
// STRICT EQUALITY (===) vs LOOSE EQUALITY (==):
// ----------------------------------------------
// This function uses === (strict), which is almost always what you want!
//
// STRICT (===):
//   - Checks type AND value
//   - '123' === 123 → false (string vs number)
//   - true === 1 → false (boolean vs number)
//
// LOOSE (==):
//   - Attempts type conversion
//   - '123' == 123 → true (converts string to number)
//   - true == 1 → true (converts boolean to number)
//
// Always use === unless you have a specific reason not to!
//
// USAGE IN COMPONENTS:
// --------------------
// Commonly used for "confirm password" fields:
//
//   const passwordsDontMatch =
//     didEdit.confirmPassword &&
//     !isEqualsToOtherValue(
//       enteredValues.password,
//       enteredValues.confirmPassword
//     );
//
// This reads as: "Passwords don't match if user touched confirm field
//                 AND the two passwords are not equal"
//
// EXAMPLE IN A SIGNUP FORM:
// --------------------------
//   const [enteredValues, setEnteredValues] = useState({
//     password: '',
//     confirmPassword: ''
//   });
//
//   const passwordsDontMatch =
//     didEdit.confirmPassword &&
//     !isEqualsToOtherValue(
//       enteredValues.password,
//       enteredValues.confirmPassword
//     );
//
//   // In JSX:
//   {passwordsDontMatch && <p>Passwords must match!</p>}
//
// COMMON USE CASES:
// -----------------
// - Confirm password fields
// - Confirm email fields
// - Security question answers
// - Any "must match" validation
//
// WHY A SEPARATE FUNCTION?
// -------------------------
// You might think: "Why not just use password === confirmPassword?"
//
// Reasons for using this function:
//   ✓ Consistency with other validation functions
//   ✓ Self-documenting code
//   ✓ Can extend later (e.g., add trimming, case-insensitive comparison)
//   ✓ Easier to test
//   ✓ Clear intent in validation logic
//
// =============================================================================
export function isEqualsToOtherValue(value, otherValue) {
  // -------------------------------------------------------------------------
  // THE VALIDATION LOGIC
  // -------------------------------------------------------------------------
  // Use strict equality (===) to check if values are exactly the same.
  // This compares both type and value.
  // -------------------------------------------------------------------------
  return value === otherValue;
}

// =============================================================================
// SUMMARY: HOW TO USE THESE VALIDATION FUNCTIONS
// =============================================================================
//
// STEP 1: IMPORT
// --------------
// import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';
//
// STEP 2: USE IN VALIDATION LOGIC
// --------------------------------
// // Email validation (must not be empty AND must have @)
// const emailIsInvalid =
//   didEdit.email &&
//   (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email));
//
// // Password validation (must be at least 6 characters)
// const passwordIsInvalid =
//   didEdit.password &&
//   !hasMinLength(enteredValues.password, 6);
//
// // Confirm password (must match original password)
// const confirmPasswordIsInvalid =
//   didEdit.confirmPassword &&
//   !isEqualsToOtherValue(enteredValues.password, enteredValues.confirmPassword);
//
// STEP 3: USE IN ERROR DISPLAY
// -----------------------------
// <Input
//   label="Email"
//   error={emailIsInvalid && "Please enter a valid email."}
// />
//
// <Input
//   label="Password"
//   error={passwordIsInvalid && "Password must be at least 6 characters."}
// />
//
// =============================================================================
// EXTENDING THESE FUNCTIONS
// =============================================================================
//
// These are BASIC validation functions. You can add more advanced ones:
//
// export function isValidPhone(value) {
//   return /^\d{3}-\d{3}-\d{4}$/.test(value);
// }
//
// export function isValidURL(value) {
//   try {
//     new URL(value);
//     return true;
//   } catch {
//     return false;
//   }
// }
//
// export function hasMaxLength(value, maxLength) {
//   return value.length <= maxLength;
// }
//
// export function containsNumber(value) {
//   return /\d/.test(value);
// }
//
// export function containsUppercase(value) {
//   return /[A-Z]/.test(value);
// }
//
// The pattern is always the same:
//   1. Take value(s) as parameter(s)
//   2. Return true if valid, false if invalid
//   3. Give it a clear, descriptive name
//
// =============================================================================
// KEY TAKEAWAYS
// =============================================================================
//
// 1. EXTRACT COMMON LOGIC into reusable utility functions
//    - Follows DRY principle (Don't Repeat Yourself)
//    - Write once, use everywhere
//
// 2. VALIDATION FUNCTIONS return boolean
//    - true = valid
//    - false = invalid
//
// 3. USE WITH ! OPERATOR in components
//    - !isEmail(...) checks if INVALID
//    - Makes validation logic more readable
//
// 4. COMBINE MULTIPLE VALIDATIONS with && and ||
//    - (!isEmail(...) || !isNotEmpty(...)) = email must be valid AND not empty
//
// 5. BENEFITS: Reusable, testable, maintainable, self-documenting
//
// =============================================================================