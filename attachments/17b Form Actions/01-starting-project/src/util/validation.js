// =============================================================================
// VALIDATION UTILITY FUNCTIONS
// =============================================================================
// This file contains reusable validation functions that can be used to
// validate form input values.
//
// These functions are simple, pure functions that take a value (and sometimes
// additional parameters) and return a boolean indicating whether the value
// passes the validation check.
//
// These validation functions can be used with form actions or with manual
// form handling approaches. They're not specific to form actions - they're
// just helper functions for validation logic.
//
// =============================================================================

/**
 * Validates if a value is a valid email address.
 * 
 * NOTE: This is a SIMPLE email validation that only checks for the presence
 * of an '@' symbol. In a real application, you would want to use a more
 * robust email validation (like a regex pattern or a validation library).
 * 
 * @param {string} value - The value to validate
 * @returns {boolean} - True if the value contains '@', false otherwise
 * 
 * @example
 * isEmail('test@example.com') // returns true
 * isEmail('invalid-email')    // returns false
 */
export function isEmail(value) {
  return value.includes('@');
}

/**
 * Validates if a value is not empty (after trimming whitespace).
 * 
 * This function trims the value (removes leading and trailing whitespace)
 * and checks if the result is not an empty string.
 * 
 * @param {string} value - The value to validate
 * @returns {boolean} - True if the value is not empty after trimming, false otherwise
 * 
 * @example
 * isNotEmpty('hello')     // returns true
 * isNotEmpty('   ')       // returns false (only whitespace)
 * isNotEmpty('  hello  ') // returns true (has content after trimming)
 */
export function isNotEmpty(value) {
  return value.trim() !== '';
}

/**
 * Validates if a value has a minimum length.
 * 
 * This is useful for validating passwords, usernames, or any field that
 * requires a minimum number of characters.
 * 
 * @param {string} value - The value to validate
 * @param {number} minLength - The minimum required length
 * @returns {boolean} - True if the value length is >= minLength, false otherwise
 * 
 * @example
 * hasMinLength('password', 8)  // returns true (8 characters)
 * hasMinLength('pass', 8)      // returns false (only 4 characters)
 */
export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

/**
 * Validates if a value is equal to another value.
 * 
 * This is useful for confirming passwords, email addresses, or any field
 * where the user needs to enter the same value twice.
 * 
 * @param {string} value - The first value to compare
 * @param {string} otherValue - The second value to compare
 * @returns {boolean} - True if both values are equal, false otherwise
 * 
 * @example
 * isEqualToOtherValue('password', 'password')  // returns true
 * isEqualToOtherValue('password', 'Password')  // returns false (case-sensitive)
 */
export function isEqualToOtherValue(value, otherValue) {
  return value === otherValue;
}

// =============================================================================
// USING THESE VALIDATION FUNCTIONS
// =============================================================================
//
// These functions can be used in form actions or manual form handling:
//
// EXAMPLE WITH FORM ACTIONS (you'll learn this in upcoming lessons):
//   async function handleSignup(formData) {
//     const email = formData.get('email');
//     if (!isEmail(email)) {
//       return { error: 'Invalid email' };
//     }
//     // ... rest of the logic
//   }
//
// EXAMPLE WITH MANUAL FORM HANDLING:
//   function handleSubmit(event) {
//     event.preventDefault();
//     const email = emailRef.current.value;
//     if (!isEmail(email)) {
//       setEmailIsInvalid(true);
//       return;
//     }
//     // ... rest of the logic
//   }
//
// =============================================================================