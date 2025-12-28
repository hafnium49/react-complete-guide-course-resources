// =============================================================================
// SECTION 17B: FORM ACTIONS
// =============================================================================
//
// Welcome to the Form Actions section! This section builds upon what you learned
// in the previous section about handling form submissions and user input in React.
//
// =============================================================================
// WHAT ARE FORM ACTIONS?
// =============================================================================
//
// Form Actions are a feature that's built into React, but ONLY if you're using
// React 19 or higher. This is a relatively new feature that was introduced in
// React 19, so it's not available in older React versions.
//
// If you're working in a project that uses at least version 19 or higher,
// you can use this form actions feature as an ALTERNATIVE to handling form
// submissions manually (as you learned in the previous section).
//
// IMPORTANT: As a React developer, you should know about BOTH approaches:
//   - Manual form handling (from previous section: useState, useRef, FormData)
//   - Form Actions (this section: React 19+ built-in feature)
//
// Why? Because you will encounter BOTH approaches out there in the wild!
// Different projects use different approaches, and understanding both makes
// you a more versatile developer.
//
// =============================================================================
// WHAT WILL YOU LEARN IN THIS SECTION?
// =============================================================================
//
// In this section, you'll learn:
//
//   1. HOW TO USE FORM ACTIONS
//      - What form actions are and how they work
//      - How to set up form actions in your React components
//
//   2. EXTRACTING VALUES AND MANAGING FORM STATE
//      - How to extract form values using form actions
//      - How to manage form state with this React feature
//
//   3. SYNCHRONOUS AND ASYNCHRONOUS ACTIONS
//      - How to set up synchronous form actions
//      - How to handle asynchronous operations (like API calls) with form actions
//
//   4. OPTIMISTIC UPDATING
//      - How to implement optimistic updating in your user interface
//      - How to use React's form actions feature to provide instant feedback
//        to users while operations are still processing
//
// =============================================================================
// ABOUT THIS STARTING PROJECT
// =============================================================================
//
// This starting project is very similar to the project you saw in the previous
// section, but it's a slightly simplified version.
//
// KEY DIFFERENCES:
//   - This project ONLY has a Signup component (no Login form)
//   - This is intentional because you already know how to handle forms in general
//   - In this section, you'll learn an ALTERNATIVE approach using form actions
//
// WHY NO LOGIN FORM?
// ------------------
// Since you already learned the fundamentals of form handling in the previous
// section, we're focusing on teaching you the NEW approach (form actions) using
// just the signup form. Once you understand form actions, you can apply the
// same concepts to any form, including login forms.
//
// =============================================================================
// GETTING STARTED
// =============================================================================
//
// If you're using the local version of this project:
//
//   1. Download/extract the project files
//   2. Run `npm install` to install all dependencies
//   3. Run `npm run dev` to start the development server
//   4. Visit `http://localhost:5173` to see the page
//
// You should see a page with a signup form on the screen.
//
// =============================================================================
// PROJECT STRUCTURE
// =============================================================================
//
// This project uses:
//   - React 19.0.0 (required for form actions feature)
//   - Vite as the build tool
//   - A simple component structure with Header and Signup components
//
// The main focus is on the Signup component, where you'll learn how to
// implement form actions step by step.
//
// =============================================================================

import Header from './components/Header.jsx';
import Signup from './components/Signup.jsx';

function App() {
  // ===========================================================================
  // APP COMPONENT
  // ===========================================================================
  // This is the root component of our application.
  //
  // Currently, it simply renders:
  //   - A Header component (shows the app title and logo)
  //   - A Signup component (contains the signup form we'll be working with)
  //
  // As we progress through this section, we'll be modifying the Signup
  // component to use React's form actions feature instead of manual form
  // handling.
  //
  // ===========================================================================

  return (
    <>
      <Header />
      <main>
        <Signup />
      </main>
    </>
  );
}

export default App;
