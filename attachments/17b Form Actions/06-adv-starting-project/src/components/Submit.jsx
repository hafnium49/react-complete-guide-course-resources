/**
 * ============================================================================
 * LESSON 278: SUBMIT COMPONENT - useFormStatus HOOK
 * ============================================================================
 *
 * This component demonstrates React 19's useFormStatus hook, which provides
 * information about the current status of a form submission, including whether
 * the form is currently being submitted (pending state).
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Using the useFormStatus hook from react-dom
 * 2. Understanding why useFormStatus must be used in a nested component
 * 3. Accessing the pending state to show loading indicators
 * 4. Disabling buttons during form submission
 * 5. Changing button text based on submission state
 * 6. Creating reusable form UI components
 *
 * REACT 19 FEATURE: useFormStatus HOOK
 * ====================================
 * The useFormStatus hook is a new React 19 feature that provides information
 * about the current form submission status.
 *
 * Import location:
 * ----------------
 * import { useFormStatus } from 'react-dom';
 *
 * NOT from 'react'! This hook is part of react-dom because it interacts
 * with DOM form elements.
 *
 * What it returns:
 * ----------------
 * An object with properties like:
 * - pending: boolean (true if form is being submitted, false otherwise)
 * - data: FormData object (the data being submitted)
 * - method: string (the HTTP method - GET, POST, etc.)
 * - action: string (the form action URL)
 *
 * Most commonly used property:
 * - pending: Shows if the form is currently submitting
 *
 * IMPORTANT RESTRICTION: MUST BE USED IN NESTED COMPONENT
 * ========================================================
 * The useFormStatus hook CANNOT be called in the component that contains
 * the <form> element. It MUST be called in a component that is rendered
 * INSIDE the form.
 *
 * WHY THIS RESTRICTION?
 * ---------------------
 * React needs the form context to exist before useFormStatus can read from it.
 * When you call useFormStatus in a component, React looks UP the component
 * tree to find the nearest parent <form> element, then reads its status.
 *
 * This is similar to how Context works - you can't consume a Context in the
 * same component that provides it. You must consume it in a child component.
 *
 * WRONG (Won't work):
 * -------------------
 * function MyForm() {
 *   const { pending } = useFormStatus(); // ✗ ERROR! No parent form exists yet
 *   return <form>...</form>;
 * }
 *
 * RIGHT (Will work):
 * ------------------
 * function MyForm() {
 *   return (
 *     <form>
 *       <SubmitButton />     // ✓ useFormStatus called inside form
 *     </form>
 *   );
 * }
 *
 * function SubmitButton() {
 *   const { pending } = useFormStatus(); // ✓ Works! Parent form exists
 *   return <button disabled={pending}>Submit</button>;
 * }
 *
 * BENEFITS OF THIS PATTERN:
 * ==========================
 * 1. REUSABILITY: This Submit component can be used in ANY form that uses
 *    Form Actions, and it will automatically adapt to that form's status.
 *
 * 2. SEPARATION OF CONCERNS: The submit button logic is isolated in its
 *    own component, making the main form component cleaner.
 *
 * 3. CONSISTENCY: All forms in your app can use the same Submit component,
 *    ensuring consistent behavior (disabled during submission, text changes).
 *
 * 4. TESTABILITY: You can test the Submit component independently.
 *
 * ALTERNATIVE APPROACH (NOT USED HERE):
 * ======================================
 * Instead of useFormStatus, we could use the pending value from useActionState:
 *
 * const [formState, formAction, pending] = useActionState(actionFn, initialState);
 *                                  ↑
 *                          Third return value!
 *
 * Then in the JSX:
 * <button disabled={pending}>
 *   {pending ? 'Submitting...' : 'Submit'}
 * </button>
 *
 * Why useFormStatus is better:
 * -----------------------------
 * - Cleaner separation (submit button logic in its own component)
 * - More reusable (same component works in any form)
 * - Follows React 19's recommended patterns
 * - Can be used by multiple buttons in the same form
 *
 * Both approaches work! useFormStatus is just cleaner and more flexible.
 */

/**
 * IMPORTS
 * =======
 */

/**
 * useFormStatus HOOK IMPORT
 * ==========================
 * This hook must be imported from 'react-dom', NOT from 'react'.
 *
 * WHY react-dom?
 * --------------
 * useFormStatus interacts with DOM-specific form features, so it's part
 * of react-dom (which handles React's interaction with the browser DOM).
 *
 * Other hooks from react-dom:
 * - useFormState (older name for useActionState)
 * - useOptimistic (for optimistic UI updates)
 *
 * Most hooks come from 'react' (useState, useEffect, etc.), but some
 * DOM-specific hooks come from 'react-dom'.
 */
import { useFormStatus } from 'react-dom';

/**
 * SUBMIT COMPONENT
 * ================
 * A reusable submit button component that automatically adjusts its state
 * based on the current form submission status.
 *
 * USAGE:
 * ------
 * Place this component inside any <form> that uses Form Actions:
 *
 * <form action="...">
 *   <input ... />
 *   <input ... />
 *   <Submit />  ← Automatically shows loading state
 * </form>
 *
 * WHAT IT DOES:
 * -------------
 * 1. Detects when the parent form is being submitted
 * 2. Disables the submit button during submission
 * 3. Changes button text from "Submit" to "Submitting..."
 * 4. Re-enables and resets text when submission completes
 *
 * NO PROPS NEEDED:
 * ----------------
 * This component doesn't need any props! It automatically reads the form
 * status from the nearest parent <form> using the useFormStatus hook.
 *
 * This makes it extremely easy to use - just drop it in any form!
 */
export default function Submit() {
  /**
   * ============================================================================
   * useFormStatus HOOK USAGE
   * ============================================================================
   *
   * This hook returns an object with information about the parent form's
   * current status.
   *
   * WHAT WE GET BACK:
   * -----------------
   * const status = useFormStatus();
   *
   * status object contains:
   * {
   *   pending: boolean,     // Is the form currently submitting?
   *   data: FormData,       // The form data being submitted
   *   method: string,       // HTTP method (GET, POST, etc.)
   *   action: string        // The form action URL
   * }
   *
   * WHAT WE EXTRACT:
   * ----------------
   * const { pending } = useFormStatus();
   *
   * We only need the 'pending' property for this component.
   * - pending = true: Form is currently being submitted
   * - pending = false: Form is idle (not submitting)
   *
   * WHEN IS pending TRUE?
   * ---------------------
   * The pending property becomes true when:
   * 1. User clicks the submit button
   * 2. React calls the form action function
   * 3. Form action function is executing (especially if it's async)
   * 4. React is waiting for the async action to complete
   *
   * The pending property becomes false when:
   * 1. Form action function completes
   * 2. Form action returns a value
   * 3. Form is reset (if validation succeeded)
   *
   * IMPORTANT: WHY await MATTERS
   * -----------------------------
   * In our form action (NewOpinion.jsx), we have:
   *
   * async function shareOpinionAction(prevState, formData) {
   *   // ... validation ...
   *   await addOpinion({ userName, title, body }); // ← CRITICAL!
   *   return { errors: null };
   * }
   *
   * The 'await' keyword makes React WAIT for the backend request to complete
   * before marking the form as "done submitting".
   *
   * WITH await:
   * - pending = true while backend request is in progress
   * - Button stays disabled until backend responds
   * - User can't double-submit
   * - Clean UX: button disabled → "Submitting..." → form resets
   *
   * WITHOUT await (if we removed it):
   * - pending = true for just a split second
   * - Button would re-enable before backend responds
   * - User could submit again (double submission!)
   * - Bad UX: button flickers disabled/enabled
   *
   * EXECUTION FLOW:
   * ---------------
   * 1. User clicks Submit button
   *    → pending changes from false to true
   *    → This component re-renders
   *    → Button becomes disabled
   *    → Text changes to "Submitting..."
   *
   * 2. Form action executes (shareOpinionAction)
   *    → Validation runs
   *    → await addOpinion() sends backend request
   *    → Component STAYS in pending state (button still disabled)
   *    → Backend processes request (~1 second delay)
   *    → Backend responds
   *    → addOpinion completes
   *
   * 3. Form action returns
   *    → pending changes from true to false
   *    → This component re-renders
   *    → Button becomes enabled
   *    → Text changes back to "Submit"
   *    → Form resets (if validation succeeded)
   *
   * COMPONENT RE-RENDERING:
   * -----------------------
   * This component re-renders when:
   * - pending changes from false to true (submission starts)
   * - pending changes from true to false (submission completes)
   *
   * React automatically triggers these re-renders because useFormStatus
   * subscribes to the form's status changes.
   *
   * HOW REACT TRACKS THIS:
   * ----------------------
   * React internally tracks the status of each form that has a Form Action.
   * When you call useFormStatus(), React:
   * 1. Looks up the component tree for the nearest <form> element
   * 2. Checks if that form has a Form Action
   * 3. Returns the current status of that form's action
   * 4. Subscribes this component to status changes
   * 5. Re-renders when the status changes
   *
   * This is similar to how Context works - React maintains the state
   * (form status) at the form level, and child components can subscribe
   * to changes.
   */
  const { pending } = useFormStatus();

  /**
   * ============================================================================
   * COMPONENT RENDER
   * ============================================================================
   *
   * We render a submit button that adjusts based on the pending state.
   */
  return (
    <p className="form-actions">
      {/*
        SUBMIT BUTTON WITH DYNAMIC STATE
        =================================
        This button changes its state based on whether the form is being
        submitted or not.

        THE disabled PROP:
        ------------------
        disabled={pending}

        This is a boolean prop that controls whether the button can be clicked.

        - When pending = true: disabled={true} → Button is disabled
          - Button appears grayed out
          - Click events are ignored
          - Cursor shows "not-allowed" icon
          - Prevents user from clicking again (prevents double-submission)

        - When pending = false: disabled={false} → Button is enabled
          - Button appears normal
          - Click events work
          - User can submit the form

        WHY DISABLE DURING SUBMISSION?
        -------------------------------
        1. PREVENT DOUBLE SUBMISSION:
           - User might click Submit multiple times out of impatience
           - Without disabling, each click would trigger a new submission
           - Could create duplicate opinions in the database
           - Disabling prevents this!

        2. VISUAL FEEDBACK:
           - Disabled button shows user that something is happening
           - Combined with "Submitting..." text, it's clear the form is processing
           - Better UX than a button that looks clickable but does nothing

        3. ACCESSIBILITY:
           - Screen readers announce disabled buttons differently
           - Users with screen readers know the form is processing
           - Proper semantic HTML communicates state

        ALTERNATIVE: aria-busy
        ----------------------
        You could also add aria-busy attribute for better accessibility:

        <button disabled={pending} aria-busy={pending}>
          {pending ? 'Submitting...' : 'Submit'}
        </button>

        This explicitly tells screen readers the button is "busy" processing.

        THE BUTTON TEXT:
        ----------------
        {pending ? 'Submitting...' : 'Submit'}

        This uses a ternary operator to conditionally render text:
        - condition ? valueIfTrue : valueIfFalse

        WHEN pending IS TRUE:
        - {true ? 'Submitting...' : 'Submit'}
        - Evaluates to: 'Submitting...'
        - Button shows: "Submitting..."
        - User sees that the form is being processed

        WHEN pending IS FALSE:
        - {false ? 'Submitting...' : 'Submit'}
        - Evaluates to: 'Submit'
        - Button shows: "Submit"
        - Normal state, ready for user to click

        WHY CHANGE THE TEXT?
        --------------------
        1. CLEAR FEEDBACK:
           - "Submitting..." tells user exactly what's happening
           - Combined with disabled state, it's unmistakable
           - No confusion about whether the form is working

        2. MATCHES USER EXPECTATIONS:
           - Users expect to see loading indicators
           - Changing text is a common pattern across the web
           - Familiar UX = better UX

        3. ACCESSIBILITY:
           - Screen readers read the button text
           - "Submitting..." tells screen reader users what's happening
           - Better than just a disabled button with no explanation

        ALTERNATIVE TEXT OPTIONS:
        -------------------------
        You could use different text:
        - "Submitting..."
        - "Please wait..."
        - "Processing..."
        - "Sending..."
        - "Loading..."

        You could even add an emoji or icon:
        - "⏳ Submitting..."
        - "🚀 Sending..."

        Or use a spinner component:
        - {pending ? <><Spinner /> Submitting...</> : 'Submit'}

        THE TIMING:
        -----------
        The button state changes are perfectly synchronized with the form action:

        Timeline:
        1. t=0ms: User clicks "Submit"
        2. t=0ms: pending = true, button shows "Submitting..." and is disabled
        3. t=0ms-1000ms: Backend request in progress (await addOpinion)
        4. t=1000ms: Backend responds, addOpinion completes
        5. t=1000ms: Form action returns { errors: null }
        6. t=1000ms: pending = false, button shows "Submit" and is enabled
        7. t=1000ms: Form resets (inputs clear)

        USER EXPERIENCE:
        ----------------
        From the user's perspective:
        1. Fill out form
        2. Click Submit
        3. Button immediately becomes "Submitting..." and grayed out
        4. (Wait 1 second - backend processing)
        5. New opinion appears in the list
        6. Form clears
        7. Button becomes "Submit" again and is enabled
        8. Ready to submit another opinion!

        This is MUCH better than:
        - No feedback (user wonders if click worked)
        - Button stays clickable (user might click multiple times)
        - No loading indicator (user doesn't know what's happening)

        TESTING THIS COMPONENT:
        -----------------------
        Try these scenarios to see the pending state in action:

        1. Valid submission:
           - Fill all fields correctly
           - Click Submit
           - Watch button change to "Submitting..." and become disabled
           - Wait for new opinion to appear
           - Button resets to "Submit" and becomes enabled

        2. Invalid submission:
           - Leave a field empty or enter invalid data
           - Click Submit
           - Button does NOT change (validation fails immediately)
           - Error messages appear
           - Button stays enabled as "Submit"

        3. Rapid clicks (testing double-submission prevention):
           - Fill all fields correctly
           - Click Submit multiple times quickly
           - Only ONE submission goes through
           - Button is disabled after first click
           - Subsequent clicks are ignored
      */}
      <button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </p>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS - LESSON 278
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. useFormStatus HOOK: React 19's hook for accessing form submission status
 *    - Must be imported from 'react-dom' (not 'react')
 *    - Returns an object with pending, data, method, action properties
 *    - Must be used in a component INSIDE the form (not in the form component)
 *
 * 2. NESTED COMPONENT REQUIREMENT: useFormStatus can't be used in the
 *    component that renders the <form>. It must be used in a child component
 *    rendered inside the form.
 *
 * 3. PENDING STATE: The pending property is true when the form is being
 *    submitted and false otherwise. Perfect for showing loading indicators.
 *
 * 4. BUTTON DISABLING: Setting disabled={pending} prevents double-submissions
 *    and provides clear visual feedback to users.
 *
 * 5. CONDITIONAL TEXT: Using {pending ? 'Submitting...' : 'Submit'} provides
 *    clear feedback about what's currently happening.
 *
 * 6. REUSABLE COMPONENT: This Submit component can be used in ANY form that
 *    uses Form Actions, making it highly reusable.
 *
 * WHY THIS PATTERN IS POWERFUL:
 * ==============================
 * Before React 19 Form Actions, you had to:
 * - Manually track submission state with useState
 * - Set isSubmitting = true when submitting starts
 * - Set isSubmitting = false when submitting completes
 * - Remember to set it false on errors too
 * - Pass this state to the submit button
 * - Handle all edge cases manually
 *
 * With React 19 Form Actions + useFormStatus:
 * - React automatically tracks the submission state
 * - pending is always accurate
 * - No manual state management needed
 * - Works perfectly with async form actions
 * - Clean, simple, reusable code
 *
 * COMPARISON: useFormStatus vs useActionState pending
 * ====================================================
 *
 * TWO WAYS TO ACCESS PENDING STATE:
 * ----------------------------------
 *
 * METHOD 1: useActionState (third return value)
 * -----------------------------------------------
 * const [formState, formAction, pending] = useActionState(actionFn, initialState);
 *
 * Pros:
 * - Available in the same component as the form
 * - Direct access without extra component
 * - Simple for basic use cases
 *
 * Cons:
 * - Couples submit button logic to form component
 * - Less reusable (can't extract submit button easily)
 * - Form component knows too much about UI details
 *
 * METHOD 2: useFormStatus (used in this lesson)
 * -----------------------------------------------
 * function SubmitButton() {
 *   const { pending } = useFormStatus();
 *   return <button disabled={pending}>...</button>;
 * }
 *
 * Pros:
 * - Separation of concerns (submit button logic isolated)
 * - Highly reusable (same component works in any form)
 * - Cleaner form component (doesn't manage submit button state)
 * - Can have multiple components reading form status
 * - Follows React 19 best practices
 *
 * Cons:
 * - Requires extra component
 * - Must understand the nested component requirement
 * - Slightly more code (but more organized)
 *
 * BEST PRACTICE:
 * --------------
 * Use useFormStatus for production apps! The extra component is worth it for:
 * - Cleaner code organization
 * - Better reusability
 * - Easier testing
 * - More flexibility
 *
 * HOW await ENABLES THIS PATTERN:
 * ================================
 * In our form action (NewOpinion.jsx), the await keyword is CRITICAL:
 *
 * async function shareOpinionAction(prevState, formData) {
 *   // ... validation ...
 *   await addOpinion(...data...); // ← Must await!
 *   return success state;
 * }
 *
 * WHY await IS ESSENTIAL:
 * -----------------------
 * - await makes the function PAUSE until addOpinion completes
 * - React waits for the Promise to resolve before marking form as done
 * - pending stays true during the entire backend request
 * - Button stays disabled until backend responds
 * - Clean UX: disabled → submitting → success → enabled
 *
 * Without await:
 * - Function returns immediately (doesn't wait for backend)
 * - pending = true for just a millisecond
 * - Button flickers disabled/enabled
 * - User could double-submit
 * - Bad UX
 *
 * ACCESSIBILITY FEATURES:
 * =======================
 * ✓ Disabled button prevents accidental double-submission
 * ✓ Disabled state is announced by screen readers
 * ✓ "Submitting..." text tells users what's happening
 * ✓ Clear visual feedback (grayed out button)
 *
 * Future enhancements:
 * - Add aria-busy={pending} for explicit busy state
 * - Add aria-live region to announce submission status
 * - Add loading spinner icon for visual feedback
 * - Add keyboard shortcut info (e.g., "Press Enter to submit")
 *
 * REAL-WORLD USE CASES:
 * =====================
 * This pattern is perfect for:
 * - Login forms (prevent multiple login attempts)
 * - Payment forms (prevent double-charging)
 * - Comment forms (prevent duplicate comments)
 * - Contact forms (prevent duplicate messages)
 * - Any form that communicates with a backend
 *
 * EXTENDING THIS COMPONENT:
 * ==========================
 * You could enhance this Submit component with:
 *
 * 1. LOADING SPINNER:
 *    {pending ? <><Spinner /> Submitting...</> : 'Submit'}
 *
 * 2. CUSTOM TEXT (via props):
 *    function Submit({ submitText = 'Submit', submittingText = 'Submitting...' }) {
 *      const { pending } = useFormStatus();
 *      return <button disabled={pending}>{pending ? submittingText : submitText}</button>;
 *    }
 *
 * 3. CUSTOM STYLING:
 *    <button className={pending ? 'submitting' : ''}>
 *
 * 4. PROGRESS INDICATOR:
 *    Show a progress bar while submitting
 *
 * 5. SUCCESS ANIMATION:
 *    Briefly show a checkmark after successful submission
 *
 * But the basic version shown here is clean, simple, and works great!
 *
 * TESTING THIS COMPONENT:
 * =======================
 * To test the Submit component:
 *
 * 1. Unit test the component in isolation:
 *    - Mock useFormStatus to return { pending: false }
 *    - Assert button is enabled and shows "Submit"
 *    - Mock useFormStatus to return { pending: true }
 *    - Assert button is disabled and shows "Submitting..."
 *
 * 2. Integration test with a form:
 *    - Render a form with Submit component
 *    - Submit the form
 *    - Assert button becomes disabled
 *    - Assert text changes to "Submitting..."
 *    - Wait for submission to complete
 *    - Assert button becomes enabled
 *    - Assert text changes back to "Submit"
 *
 * 3. E2E test:
 *    - Fill out the form in a browser
 *    - Click Submit
 *    - Verify button is disabled and text changes
 *    - Verify form submission succeeds
 *    - Verify button re-enables
 *
 * WHAT'S NEXT:
 * ============
 * In future lessons, we might:
 * - Add error handling for failed submissions
 * - Show error messages from the backend
 * - Implement optimistic updates for voting
 * - Add animations for form state transitions
 * - Implement form reset functionality with hooks
 * - Add more sophisticated loading indicators
 */
