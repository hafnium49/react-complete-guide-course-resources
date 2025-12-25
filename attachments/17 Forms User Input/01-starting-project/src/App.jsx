// =============================================================================
// SECTION 17: FORMS & USER INPUT
// =============================================================================
//
// Welcome to the Forms section! No matter what kind of web application you
// build, and whether you use React or not, you WILL need to deal with user
// input at some point. Forms are fundamental to web development.
//
// =============================================================================
// WHAT MAKES FORMS TRICKY?
// =============================================================================
//
// Forms seem simple on the surface, but they're actually more complex than
// they appear! Here's why:
//
//   1. CAPTURING INPUT
//      - How do we get the values the user typed?
//      - When do we read the values? On every keystroke? On submit?
//      - How do we handle different input types (text, checkbox, select)?
//
//   2. VALIDATION (The Trickier Part!)
//      - When do we validate? On blur? On change? On submit?
//      - How do we show error messages?
//      - How do we handle multiple validation rules?
//      - What about async validation (e.g., checking if username exists)?
//
//   3. USER EXPERIENCE
//      - When to show errors? Too early is annoying, too late is confusing
//      - How to prevent double submissions?
//      - How to handle loading states?
//
//   4. FORM SUBMISSION
//      - Prevent the default browser behavior (page reload)
//      - Collect all form data
//      - Send to server or process locally
//
// =============================================================================
// WHAT WE'LL LEARN IN THIS SECTION
// =============================================================================
//
// 1. HANDLING FORM SUBMISSION
//    - Preventing default behavior
//    - Collecting form data
//    - Different approaches to reading input values
//
// 2. VALIDATING USER INPUT
//    - When to validate (on blur, on change, on submit)
//    - How to show validation errors
//    - Different validation strategies
//
// 3. BROWSER BUILT-IN FEATURES
//    - HTML5 validation attributes (required, pattern, minLength, etc.)
//    - The FormData API
//    - Browser-native form features
//
// 4. CUSTOM REACT SOLUTIONS
//    - Controlled components (managing input state with React)
//    - Uncontrolled components (using refs)
//    - Custom hooks for form handling
//    - Building reusable form components
//
// =============================================================================
// THE DEMO APPLICATION
// =============================================================================
//
// This demo app has a simple Login form with:
//   - Email input
//   - Password input
//   - Reset button
//   - Login (submit) button
//
// We'll use this form to explore different approaches to:
//   - Reading form values
//   - Validating inputs
//   - Handling submission
//   - Showing error messages
//
// =============================================================================

import Header from './components/Header.jsx';
import Login from './components/Login.jsx';

function App() {
  // ===========================================================================
  // APP STRUCTURE
  // ===========================================================================
  // For now, the App is simple:
  //   - Header: Shows the logo and title
  //   - main: Contains the Login form
  //
  // The Login component is where all the interesting form logic will happen!
  // ===========================================================================

  return (
    <>
      <Header />
      <main>
        <Login />
      </main>
    </>
  );
}

export default App;

// =============================================================================
// FORMS IN REACT vs VANILLA JAVASCRIPT
// =============================================================================
//
// In vanilla JavaScript, you might handle forms like this:
//
//   document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     // Do something with the values...
//   });
//
// In React, we have multiple options:
//
//   1. UNCONTROLLED COMPONENTS (using refs or FormData)
//      - Let the DOM handle the input state
//      - Read values when needed (on submit)
//      - Less React code, but less control
//
//   2. CONTROLLED COMPONENTS (using state)
//      - React manages the input value via state
//      - Update state on every keystroke
//      - Full control, but more code
//
//   3. HYBRID APPROACHES
//      - Use uncontrolled for simple forms
//      - Use controlled for complex validation
//      - Mix and match based on needs
//
// We'll explore ALL of these approaches in this section!
//
// =============================================================================

// =============================================================================
// THE VALIDATION CHALLENGE
// =============================================================================
//
// Validation is typically the TRICKIEST part of forms. Consider:
//
// WHEN to validate?
// -----------------
//   - On every keystroke? (Can be annoying: "Invalid email" after typing "a")
//   - On blur (leaving field)? (Good for "did you forget this field?")
//   - On submit? (User doesn't see errors until they try to submit)
//   - Combination? (Submit + blur for best UX)
//
// WHAT to validate?
// -----------------
//   - Required fields (is it filled in?)
//   - Format (is it a valid email format?)
//   - Length (minimum/maximum characters)
//   - Pattern (matches a regex?)
//   - Custom rules (passwords match? username available?)
//
// HOW to show errors?
// -------------------
//   - Inline under each field
//   - Summary at the top
//   - Highlighted field borders
//   - Accessible for screen readers
//
// We'll tackle all of these challenges step by step!
//
// =============================================================================
