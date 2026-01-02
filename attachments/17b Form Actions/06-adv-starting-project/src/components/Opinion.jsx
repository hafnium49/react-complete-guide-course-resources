/**
 * ============================================================================
 * LESSON 279: MULTIPLE FORM ACTIONS - VOTING WITH formAction ON BUTTONS
 * ============================================================================
 *
 * This component demonstrates a powerful React 19 Form Actions feature:
 * using DIFFERENT form actions for DIFFERENT buttons within the SAME form.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Using formAction prop on individual buttons (not just on forms)
 * 2. Having multiple form actions in a single form
 * 3. Triggering different logic based on which button was clicked
 * 4. Accessing Context data from form action functions
 * 5. Preparing for backend integration with voting
 *
 * THE PROBLEM WE'RE SOLVING:
 * ===========================
 * We have ONE form with TWO buttons:
 * - Upvote button → Should increase vote count
 * - Downvote button → Should decrease vote count
 *
 * CHALLENGE:
 * ----------
 * How do we trigger DIFFERENT actions for DIFFERENT buttons in the SAME form?
 *
 * TRADITIONAL APPROACH (Won't work well here):
 * ---------------------------------------------
 * <form action={handleVote}>
 *   <button name="action" value="upvote">↑</button>
 *   <button name="action" value="downvote">↓</button>
 * </form>
 *
 * Then in handleVote:
 * function handleVote(prevState, formData) {
 *   const action = formData.get('action');
 *   if (action === 'upvote') { ... }
 *   else if (action === 'downvote') { ... }
 * }
 *
 * This works, but it's less clean and harder to maintain.
 *
 * REACT 19 SOLUTION: formAction ON BUTTONS
 * =========================================
 * React 19 allows you to set formAction on individual buttons!
 *
 * <form>
 *   <button formAction={upvoteAction}>↑</button>
 *   <button formAction={downvoteAction}>↓</button>
 * </form>
 *
 * Now each button has its own dedicated action function!
 *
 * BENEFITS:
 * ---------
 * ✓ Cleaner separation of concerns (separate functions for separate actions)
 * ✓ Easier to understand (upvoteAction is clearly for upvoting)
 * ✓ Easier to test (can test upvote and downvote logic independently)
 * ✓ More maintainable (changes to upvote logic don't affect downvote)
 * ✓ Type-safe (if using TypeScript, each function has clear purpose)
 *
 * HOW IT WORKS:
 * =============
 * 1. User clicks upvote button
 * 2. React calls upvoteAction (NOT a shared form action)
 * 3. upvoteAction updates the vote count
 * 4. Component re-renders with new vote count
 *
 * 1. User clicks downvote button
 * 2. React calls downvoteAction (different function!)
 * 3. downvoteAction updates the vote count
 * 4. Component re-renders with new vote count
 *
 * CURRENT STATE (LESSON 279):
 * ============================
 * In this lesson, we:
 * ✓ Created upvoteAction and downvoteAction functions
 * ✓ Added formAction prop to each button
 * ✓ Added console.log to verify which action is triggered
 * ✓ Prepared the structure for backend integration
 *
 * Right now, the actions just log to console. This helps us verify:
 * - The correct action is called for each button
 * - The buttons work as expected
 * - We're ready to add real functionality
 *
 * WHAT'S COMING NEXT:
 * ===================
 * In the next lessons, we'll:
 * 1. Actually update the vote count (call Context functions)
 * 2. Send vote updates to the backend
 * 3. Add optimistic updates (instant visual feedback)
 * 4. Handle errors gracefully
 * 5. Prevent duplicate votes
 *
 * FORM DATA IN VOTING:
 * ====================
 * Notice that our form action functions accept formData parameter:
 * function upvoteAction(prevState, formData) { ... }
 *
 * But we don't use formData! Why?
 * - Our form has NO inputs (just buttons)
 * - We don't need to extract any data from the form
 * - We just need the action to be triggered
 *
 * The opinion data (id, votes) comes from props/Context, not from form inputs.
 *
 * However, we COULD include data in the form if needed:
 * <input type="hidden" name="opinionId" value={id} />
 *
 * Then in the action:
 * const opinionId = formData.get('opinionId');
 *
 * But in our case, we have direct access to the id via props/closure,
 * so we don't need to use formData.
 *
 * CONTEXT INTEGRATION:
 * ====================
 * In this lesson, we also access OpinionsContext to get:
 * - upvoteOpinion function (to increase votes)
 * - downvoteOpinion function (to decrease votes)
 *
 * These functions will:
 * 1. Update the local state (Context state)
 * 2. Send the update to the backend
 * 3. Keep the UI in sync with the database
 *
 * WHY USE CONTEXT?
 * ----------------
 * - Centralized vote logic (all voting goes through Context)
 * - Other components can trigger votes too
 * - Easy to add features (vote notifications, analytics, etc.)
 * - State management is in one place
 */

/**
 * IMPORTS
 * =======
 */

/**
 * use() HOOK FROM REACT 19
 * ========================
 * We import the use() hook to consume Context.
 *
 * This is the same pattern we saw in NewOpinion.jsx:
 * - Import use from 'react'
 * - Call use(OpinionsContext) to get context value
 * - Destructure to extract what we need
 *
 * WHY use() INSTEAD OF useContext?
 * --------------------------------
 * Both work, but use() is the new React 19 approach:
 * - More flexible (can be called conditionally)
 * - Can also unwrap Promises (for async data)
 * - Future-proof (React's recommended pattern going forward)
 *
 * WHAT WE'LL GET FROM CONTEXT:
 * -----------------------------
 * The OpinionsContext provides:
 * - opinions: Array of all opinions
 * - addOpinion: Function to add new opinion
 * - upvoteOpinion: Function to upvote ← We need this!
 * - downvoteOpinion: Function to downvote ← We need this!
 */
import { use } from 'react';

/**
 * OPINIONS CONTEXT IMPORT
 * =======================
 * We import the OpinionsContext so we can access the voting functions.
 *
 * The Context is defined in store/opinions-context.jsx and provides:
 * - State: opinions array
 * - Actions: addOpinion, upvoteOpinion, downvoteOpinion
 *
 * In NewOpinion.jsx, we used addOpinion to submit new opinions.
 * Here in Opinion.jsx, we'll use upvoteOpinion and downvoteOpinion.
 *
 * CENTRALIZED STATE MANAGEMENT:
 * ------------------------------
 * By using Context, we ensure:
 * - All opinion-related state is in one place
 * - All opinion-related logic is in one place
 * - Components don't need to know about the backend
 * - Easy to switch backend implementations
 * - Consistent behavior across the app
 */
import { OpinionsContext } from '../store/opinions-context';

/**
 * OPINION COMPONENT
 * =================
 * Displays a single opinion with its metadata and voting controls.
 *
 * WHAT'S NEW IN LESSON 279:
 * --------------------------
 * - Added Context consumption (upvoteOpinion, downvoteOpinion)
 * - Added upvoteAction form action function
 * - Added downvoteAction form action function
 * - Added formAction props to buttons
 * - Buttons are now functional!
 *
 * PROPS:
 * ------
 * @param {Object} props
 * @param {Object} props.opinion - The opinion data object
 * @param {string} props.opinion.id - Unique identifier (needed for voting!)
 * @param {string} props.opinion.title - Opinion title
 * @param {string} props.opinion.body - Opinion content
 * @param {string} props.opinion.userName - Author's name
 * @param {number} props.opinion.votes - Current vote count
 *
 * NESTED DESTRUCTURING:
 * ---------------------
 * { opinion: { id, title, body, userName, votes } }
 *
 * This extracts all opinion properties directly into variables.
 * We need the id for identifying which opinion to vote on!
 */
export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  /**
   * ============================================================================
   * CONSUMING CONTEXT - ACCESSING VOTE FUNCTIONS
   * ============================================================================
   *
   * We use the use() hook to access OpinionsContext and extract the
   * voting functions.
   *
   * HOOK USAGE:
   * -----------
   * const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);
   *
   * WHAT HAPPENS:
   * -------------
   * 1. use(OpinionsContext) accesses the context value provided by
   *    OpinionsContextProvider in App.jsx
   *
   * 2. It returns the contextValue object:
   *    {
   *      opinions: array,
   *      addOpinion: function,
   *      upvoteOpinion: function,
   *      downvoteOpinion: function
   *    }
   *
   * 3. We destructure to extract only what we need:
   *    { upvoteOpinion, downvoteOpinion }
   *
   * 4. We ignore opinions and addOpinion because this component doesn't
   *    need them. We only need the voting functions.
   *
   * WHAT ARE THESE FUNCTIONS?
   * --------------------------
   * upvoteOpinion(id):
   * - Accepts an opinion ID
   * - Increases the vote count for that opinion
   * - Updates Context state
   * - (Later) Sends update to backend
   *
   * downvoteOpinion(id):
   * - Accepts an opinion ID
   * - Decreases the vote count for that opinion
   * - Updates Context state
   * - (Later) Sends update to backend
   *
   * CONTEXT FUNCTION SIGNATURES:
   * -----------------------------
   * From opinions-context.jsx:
   *
   * function upvoteOpinion(id) {
   *   setOpinions((prevOpinions) =>
   *     prevOpinions.map((opinion) =>
   *       opinion.id === id
   *         ? { ...opinion, votes: opinion.votes + 1 }
   *         : opinion
   *     )
   *   );
   *   // Later: Send to backend
   * }
   *
   * function downvoteOpinion(id) {
   *   setOpinions((prevOpinions) =>
   *     prevOpinions.map((opinion) =>
   *       opinion.id === id
   *         ? { ...opinion, votes: opinion.votes - 1 }
   *         : opinion
   *     )
   *   );
   *   // Later: Send to backend
   * }
   *
   * HOW THEY WORK:
   * --------------
   * 1. Find the opinion with matching id
   * 2. Create new opinion object with updated votes
   * 3. Keep all other opinions unchanged
   * 4. Update state (triggers re-render)
   * 5. This component re-renders with new votes value
   *
   * WHY WE NEED THE id:
   * -------------------
   * The voting functions need to know WHICH opinion to update.
   * That's why we destructured id from the opinion prop!
   * We'll pass id to these functions in our form actions.
   */
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  /**
   * ============================================================================
   * FORM ACTION FUNCTION: upvoteAction - NOW ACTUALLY VOTING! (LESSON 280)
   * ============================================================================
   *
   * This async function is called when the user clicks the upvote button.
   *
   * WHAT CHANGED FROM LESSON 279:
   * ------------------------------
   * BEFORE (Lesson 279):
   * - function upvoteAction(prevState, formData) { console.log('UPVOTE'); }
   * - Just logged to console
   * - No actual voting happened
   *
   * AFTER (Lesson 280):
   * - async function upvoteAction(prevState, formData) { await upvoteOpinion(id); }
   * - Actually calls the Context voting function
   * - Sends backend request
   * - Updates vote count
   *
   * WHY MAKE IT ASYNC?
   * ------------------
   * We made this function async because:
   *
   * 1. upvoteOpinion is now an async function (sends backend request)
   * 2. We need to await its completion
   * 3. React's Form Actions system knows how to handle async actions
   * 4. useFormStatus can track when this action is pending
   * 5. Buttons can show loading states automatically
   *
   * FORM ACTION SIGNATURE:
   * ----------------------
   * Form actions always receive two parameters:
   * 1. prevState - The previous state (we don't use it here)
   * 2. formData - FormData object from the form (we don't use it here)
   *
   * Even though we don't use these parameters, React still provides them.
   * Form actions must have this signature to work with Form Actions system.
   *
   * WHY WE DON'T USE THE PARAMETERS:
   * ---------------------------------
   * prevState:
   * - Useful for forms that maintain state (like NewOpinion with errors)
   * - Our voting buttons don't need state management
   * - The vote count is managed by Context, not form state
   *
   * formData:
   * - Useful for extracting input values from a form
   * - Our form has NO inputs (just buttons!)
   * - We get the opinion id from props, not from form data
   *
   * THE await KEYWORD:
   * ------------------
   * await upvoteOpinion(id);
   *
   * This pauses execution until upvoteOpinion completes.
   *
   * What happens during the await:
   * 1. upvoteOpinion sends POST request to backend
   * 2. Backend processes vote (~1 second delay)
   * 3. Backend responds with success
   * 4. upvoteOpinion updates local state
   * 5. upvoteAction resumes (though we don't do anything after it)
   *
   * REACT'S HANDLING OF ASYNC FORM ACTIONS:
   * ----------------------------------------
   * Because this is an async form action, React automatically:
   * - Tracks the pending state (true while upvoteOpinion is running)
   * - Makes this available via useFormStatus hook
   * - Prevents default form submission
   * - Handles errors gracefully
   *
   * If we were using useFormStatus in a Submit button (like NewOpinion does),
   * that button would:
   * - Become disabled when user clicks upvote
   * - Show "Voting..." or similar loading text
   * - Re-enable when vote completes
   *
   * CURRENT ISSUE (will fix in next lesson):
   * -----------------------------------------
   * Right now, the vote buttons DON'T show loading states because:
   * - They don't use useFormStatus
   * - They're just plain buttons with formAction
   * - User can click multiple times rapidly
   * - UI doesn't update until backend responds (~1 second)
   *
   * This creates the "strange behavior" mentioned in the lesson transcript.
   *
   * CLOSURE AND VARIABLE ACCESS:
   * -----------------------------
   * Notice that this function can access:
   * - id (from props destructuring)
   * - upvoteOpinion (from Context)
   *
   * This works because of JavaScript closures:
   * - upvoteAction is defined inside the Opinion component
   * - It "closes over" variables from its outer scope
   * - When upvoteAction runs, it can access those variables
   *
   * This is why we don't need to pass id via formData - we already have it!
   *
   * EXECUTION FLOW:
   * ---------------
   * 1. User clicks upvote button
   * 2. React calls upvoteAction(undefined, formData)
   * 3. upvoteAction calls upvoteOpinion(id)
   * 4. upvoteOpinion sends POST to backend
   * 5. ~1 second delay (backend processing)
   * 6. Backend responds
   * 7. upvoteOpinion updates Context state
   * 8. All Opinion components re-render
   * 9. This opinion shows updated vote count
   * 10. upvoteAction completes
   * 11. Form action finishes
   *
   * USER EXPERIENCE:
   * ----------------
   * What the user sees:
   * 1. Click upvote button
   * 2. Nothing happens immediately
   * 3. Wait ~1 second
   * 4. Vote count suddenly changes
   * 5. Button is still clickable (can vote again!)
   *
   * This isn't ideal UX. In the next lesson, we'll improve it!
   */
  async function upvoteAction(prevState, formData) {
    await upvoteOpinion(id);
  }

  /**
   * ============================================================================
   * FORM ACTION FUNCTION: downvoteAction - NOW ACTUALLY VOTING! (LESSON 280)
   * ============================================================================
   *
   * This async function is called when the user clicks the downvote button.
   *
   * WHAT CHANGED FROM LESSON 279:
   * ------------------------------
   * BEFORE (Lesson 279):
   * - function downvoteAction(prevState, formData) { console.log('DOWNVOTE'); }
   * - Just logged to console
   * - No actual voting happened
   *
   * AFTER (Lesson 280):
   * - async function downvoteAction(prevState, formData) { await downvoteOpinion(id); }
   * - Actually calls the Context voting function
   * - Sends backend request
   * - Updates vote count
   *
   * EXACT SAME STRUCTURE AS upvoteAction:
   * --------------------------------------
   * This function is nearly identical to upvoteAction, just calling
   * downvoteOpinion instead of upvoteOpinion.
   *
   * Everything we explained in upvoteAction applies here:
   * - async function (uses await)
   * - Calls Context function
   * - Sends backend request
   * - Waits for completion
   * - Updates vote count
   * - Uses closure to access id
   *
   * SEPARATE FUNCTION = BETTER CODE ORGANIZATION:
   * ----------------------------------------------
   * We could have used ONE function for both actions:
   *
   * BAD APPROACH (Don't do this):
   * async function voteAction(prevState, formData) {
   *   const action = formData.get('action');
   *   if (action === 'upvote') {
   *     await upvoteOpinion(id);
   *   } else if (action === 'downvote') {
   *     await downvoteOpinion(id);
   *   }
   * }
   *
   * Then on buttons:
   * <button formAction={voteAction} name="action" value="upvote">
   * <button formAction={voteAction} name="action" value="downvote">
   *
   * Why is this BAD?
   * - More complex (if/else logic)
   * - Harder to test (both actions in one function)
   * - Less clear intent (what does voteAction do?)
   * - Couples upvote and downvote logic together
   *
   * BETTER APPROACH (What we have):
   * --------------------------------
   * Two separate functions:
   * - upvoteAction → clearly for upvoting
   * - downvoteAction → clearly for downvoting
   *
   * Benefits:
   * ✓ Clear purpose (function name describes what it does)
   * ✓ Easy to test (test each function independently)
   * ✓ Easy to modify (change upvote without affecting downvote)
   * ✓ Better type safety (if using TypeScript)
   * ✓ Matches React 19's design (formAction on buttons)
   *
   * The small amount of code duplication is worth the clarity!
   *
   * EXECUTION FLOW:
   * ---------------
   * 1. User clicks downvote button
   * 2. React calls downvoteAction(undefined, formData)
   * 3. downvoteAction calls downvoteOpinion(id)
   * 4. downvoteOpinion sends POST to backend
   * 5. ~1 second delay (backend processing)
   * 6. Backend responds
   * 7. downvoteOpinion updates Context state
   * 8. All Opinion components re-render
   * 9. This opinion shows updated vote count (decreased by 1)
   * 10. downvoteAction completes
   * 11. Form action finishes
   *
   * USER EXPERIENCE:
   * ----------------
   * What the user sees:
   * 1. Click downvote button
   * 2. Nothing happens immediately
   * 3. Wait ~1 second
   * 4. Vote count suddenly changes (decreases)
   * 5. Button is still clickable (can vote again!)
   *
   * CURRENT ISSUE (mentioned in lesson transcript):
   * ------------------------------------------------
   * The lesson mentions "strange behavior if I hammer this button because
   * then it looks really weird if it changes like this."
   *
   * This happens because:
   * - User can click the button multiple times rapidly
   * - Each click triggers a backend request
   * - All requests eventually complete (after ~1 second each)
   * - Vote count jumps around as requests finish in order
   * - Very confusing UX!
   *
   * Example of rapid clicking:
   * 1. Click downvote 5 times rapidly
   * 2. 5 backend requests sent
   * 3. First request completes: 10 → 9
   * 4. Second request completes: 9 → 8
   * 5. Third request completes: 8 → 7
   * 6. Fourth request completes: 7 → 6
   * 7. Fifth request completes: 6 → 5
   *
   * The count "jumps" 5 times over 1 second. Very weird!
   *
   * We'll fix this in the next lesson by:
   * - Disabling buttons while voting
   * - Showing loading states
   * - Preventing double-voting
   */
  async function downvoteAction(prevState, formData) {
    await downvoteOpinion(id);
  }

  /**
   * ============================================================================
   * COMPONENT RENDER
   * ============================================================================
   *
   * We render the opinion in a structured, semantic layout.
   *
   * WHAT'S CHANGED FROM PREVIOUS LESSONS:
   * --------------------------------------
   * The buttons now have formAction props!
   * This makes them functional instead of decorative.
   */
  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>

      <p>{body}</p>

      {/*
        VOTING FORM WITH MULTIPLE FORM ACTIONS
        =======================================
        This form demonstrates React 19's ability to have DIFFERENT form actions
        for DIFFERENT buttons within the SAME form.

        THE KEY INSIGHT:
        ----------------
        In traditional forms, you'd have:
        <form action={handleSubmit}>
          <button type="submit">Submit</button>
        </form>

        ONE form = ONE action

        But with React 19's formAction, you can have:
        <form>
          <button formAction={action1}>Button 1</button>
          <button formAction={action2}>Button 2</button>
        </form>

        ONE form = MULTIPLE actions (one per button!)

        WHY THIS IS USEFUL:
        -------------------
        Perfect for scenarios like:
        - Vote buttons (upvote vs downvote)
        - Form with "Save" and "Save & Exit" buttons
        - Multi-step wizards with "Back" and "Next" buttons
        - Search with different search types
        - Any form where buttons trigger different logic

        OUR USE CASE:
        -------------
        - Upvote button → calls upvoteAction → increases votes
        - Downvote button → calls downvoteAction → decreases votes
        - Same form, different actions!

        NO FORM ACTION ON THE FORM:
        ----------------------------
        Notice the <form> itself has NO action prop:
        <form className="votes">

        We don't need it because each button has its own formAction.

        If we added action to the form:
        <form action={defaultAction} className="votes">

        Then:
        - Buttons WITH formAction use their specific action
        - Buttons WITHOUT formAction use the form's default action

        But in our case, both buttons have formAction, so we don't need
        a default action on the form.

        NO INPUTS = NO FORMDATA:
        ------------------------
        This form has no <input> elements, just buttons.

        That's OK! Forms don't require inputs.
        They can just be containers for buttons with actions.

        Our form action functions get formData, but it's empty:
        formData.entries() → [] (no fields)

        We don't need formData because we have the opinion data from props.

        FORM STYLING:
        -------------
        className="votes"

        This CSS class styles the voting controls:
        - Horizontal layout (flexbox/grid)
        - Spacing between buttons and count
        - Alignment of vote elements

        The CSS might look like:
        .votes {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      */}
      <form className="votes">
        {/*
          UPVOTE BUTTON WITH formAction
          ==============================
          This button now has the formAction prop, making it functional!

          THE formAction PROP:
          --------------------
          formAction={upvoteAction}

          This tells React:
          "When this button is clicked, call the upvoteAction function"

          HOW IT WORKS:
          -------------
          1. User clicks this button
          2. React prevents default form submission
          3. React calls upvoteAction(currentState, formData)
          4. upvoteAction executes (currently logs "UPVOTE")
          5. (Next lesson) Vote count updates

          WHY formAction INSTEAD OF onClick?
          -----------------------------------
          We COULD use onClick:
          <button onClick={() => upvoteOpinion(id)}>

          But formAction has benefits:
          ✓ Consistent with Form Actions pattern
          ✓ Works without JavaScript (progressive enhancement)
          ✓ Better accessibility (semantic form submission)
          ✓ Integrates with form features (validation, reset, etc.)
          ✓ Can use useFormStatus for loading states
          ✓ Matches React 19's design philosophy

          BUTTON TYPE:
          ------------
          Notice we still don't specify type="submit" or type="button".

          Inside a form:
          - Default button type is "submit"
          - Clicking triggers form submission
          - formAction handles the submission

          We could be explicit:
          <button type="submit" formAction={upvoteAction}>

          But it's optional since "submit" is the default.

          ACCESSIBILITY IMPROVEMENT:
          ---------------------------
          We should add an aria-label for screen readers:
          <button formAction={upvoteAction} aria-label="Upvote this opinion">

          This would help users who can't see the arrow icon understand
          what the button does.

          We'll add this in a future lesson focused on accessibility.

          TESTING THIS BUTTON:
          --------------------
          1. Open browser console
          2. Click the upvote button
          3. You should see "UPVOTE" logged
          4. This proves formAction is working!

          WHAT YOU'LL SEE:
          ----------------
          - Click: Page doesn't reload (React prevents default)
          - Click: Console shows "UPVOTE"
          - Click: Vote count doesn't change yet (next lesson!)

          The button is now "wired up" and ready for real functionality.
        */}
        <button formAction={upvoteAction}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{votes}</span>

        {/*
          DOWNVOTE BUTTON WITH formAction
          ================================
          This button has its own formAction, separate from the upvote button!

          THE formAction PROP:
          --------------------
          formAction={downvoteAction}

          Notice this is DIFFERENT from the upvote button:
          - Upvote button: formAction={upvoteAction}
          - Downvote button: formAction={downvoteAction}

          TWO BUTTONS, TWO ACTIONS:
          --------------------------
          This is the key feature of Lesson 279:
          - Same form (<form className="votes">)
          - Different actions (upvoteAction vs downvoteAction)
          - React calls the correct function based on which button was clicked

          NO NEED TO CHECK WHICH BUTTON:
          -------------------------------
          We don't need code like:
          function handleVote(prevState, formData) {
            if (wasUpvoteClicked) { ... }
            else if (wasDownvoteClicked) { ... }
          }

          Instead, React automatically calls the right function:
          - Click upvote → upvoteAction called
          - Click downvote → downvoteAction called

          This is much cleaner!

          TESTING THIS BUTTON:
          --------------------
          1. Open browser console
          2. Click the downvote button
          3. You should see "DOWNVOTE" logged
          4. Different from upvote! (which logs "UPVOTE")

          TESTING BOTH BUTTONS:
          ---------------------
          Try clicking both buttons alternately:
          - Click upvote → "UPVOTE" logged
          - Click downvote → "DOWNVOTE" logged
          - Click upvote → "UPVOTE" logged
          - Click downvote → "DOWNVOTE" logged

          Each button consistently triggers its own action.
          This proves the formAction system is working correctly!

          WHAT'S COMING NEXT:
          -------------------
          In the next lesson, we'll:
          1. Replace console.log with actual voting logic
          2. Call upvoteOpinion(id) and downvoteOpinion(id)
          3. See the vote count change when we click
          4. Add backend integration to persist votes
          5. Possibly add optimistic updates for instant feedback
        */}
        <button formAction={downvoteAction}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS - LESSON 279
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. formAction ON BUTTONS: React 19 allows formAction prop on buttons,
 *    not just on forms. This enables multiple form actions per form.
 *
 * 2. MULTIPLE ACTIONS PER FORM: One form can have different actions for
 *    different buttons. Each button's formAction is independent.
 *
 * 3. CLEANER CODE: Separate action functions (upvoteAction, downvoteAction)
 *    are cleaner than one function with if/else logic.
 *
 * 4. CONTEXT INTEGRATION: We accessed upvoteOpinion and downvoteOpinion
 *    from OpinionsContext using the use() hook.
 *
 * 5. CLOSURE ACCESS: Form action functions can access variables from their
 *    outer scope (id, upvoteOpinion, downvoteOpinion) via closures.
 *
 * 6. DEVELOPMENT WORKFLOW: Starting with console.log to verify wiring
 *    before adding real functionality is a best practice.
 *
 * THE formAction PATTERN:
 * =======================
 * ONE FORM, MULTIPLE ACTIONS:
 *
 * <form>
 *   <button formAction={action1}>Action 1</button>
 *   <button formAction={action2}>Action 2</button>
 *   <button formAction={action3}>Action 3</button>
 * </form>
 *
 * Each button can have its own dedicated action function!
 *
 * USE CASES:
 * ==========
 * This pattern is perfect for:
 *
 * 1. VOTING SYSTEMS (our use case):
 *    <form>
 *      <button formAction={upvote}>👍</button>
 *      <button formAction={downvote}>👎</button>
 *    </form>
 *
 * 2. FORM WIZARDS:
 *    <form>
 *      <button formAction={goBack}>← Back</button>
 *      <button formAction={goNext}>Next →</button>
 *    </form>
 *
 * 3. SAVE OPTIONS:
 *    <form>
 *      <button formAction={saveDraft}>Save Draft</button>
 *      <button formAction={publish}>Publish</button>
 *    </form>
 *
 * 4. SEARCH TYPES:
 *    <form>
 *      <input name="query" />
 *      <button formAction={searchUsers}>Search Users</button>
 *      <button formAction={searchPosts}>Search Posts</button>
 *    </form>
 *
 * 5. MULTI-ACTION MODALS:
 *    <form>
 *      <button formAction={cancel}>Cancel</button>
 *      <button formAction={saveChanges}>Save</button>
 *      <button formAction={deleteItem}>Delete</button>
 *    </form>
 *
 * COMPARISON: formAction vs onClick:
 * ===================================
 *
 * USING onClick (Traditional):
 * -----------------------------
 * <button onClick={() => upvoteOpinion(id)}>↑</button>
 *
 * Pros:
 * ✓ Simple and familiar
 * ✓ Direct function call
 * ✓ Easy to understand
 *
 * Cons:
 * ✗ Not semantic (doesn't follow form submission model)
 * ✗ Can't use useFormStatus for loading states
 * ✗ Doesn't work without JavaScript
 * ✗ Not consistent with Form Actions pattern
 *
 * USING formAction (React 19):
 * ----------------------------
 * <button formAction={upvoteAction}>↑</button>
 *
 * Pros:
 * ✓ Semantic form submission
 * ✓ Works with useFormStatus for loading states
 * ✓ Progressive enhancement (works without JS in some cases)
 * ✓ Consistent with Form Actions ecosystem
 * ✓ Better integration with form features
 *
 * Cons:
 * ✗ Requires understanding Form Actions
 * ✗ Slightly more verbose (function wrapper needed)
 *
 * WHEN TO USE formAction:
 * -----------------------
 * Use formAction when:
 * ✓ You want loading states (useFormStatus)
 * ✓ You're already using Form Actions
 * ✓ You want semantic form submission
 * ✓ You need form-related features (validation, reset, etc.)
 *
 * Use onClick when:
 * ✓ Simple button actions (toggle, close modal, etc.)
 * ✓ Not related to form submission
 * ✓ Don't need loading states or form features
 * ✓ Want simplest possible solution
 *
 * EXECUTION FLOW (CURRENT):
 * ==========================
 * 1. User clicks upvote button
 * 2. React sees formAction={upvoteAction}
 * 3. React prevents default form submission
 * 4. React calls upvoteAction(undefined, formData)
 * 5. upvoteAction logs "UPVOTE" to console
 * 6. Nothing else happens (yet!)
 *
 * EXECUTION FLOW (NEXT LESSON):
 * ==============================
 * 1. User clicks upvote button
 * 2. React sees formAction={upvoteAction}
 * 3. React prevents default form submission
 * 4. React calls upvoteAction(undefined, formData)
 * 5. upvoteAction calls upvoteOpinion(id)
 * 6. Context updates opinions state (votes + 1)
 * 7. Component re-renders with new vote count
 * 8. User sees vote count increase!
 * 9. (Later) Backend gets the vote update
 *
 * CODE ORGANIZATION:
 * ==================
 * Notice how we structured this component:
 *
 * 1. Imports (React, Context)
 * 2. Component function
 *    a. Context consumption (use hook)
 *    b. Form action functions (upvoteAction, downvoteAction)
 *    c. Render (JSX)
 *
 * This organization:
 * ✓ Follows React conventions
 * ✓ Keeps related code together
 * ✓ Easy to understand flow
 * ✓ Easy to test (mock Context, test actions)
 *
 * TESTING APPROACH:
 * =================
 * How to test this component:
 *
 * 1. UNIT TESTS:
 *    - Mock OpinionsContext
 *    - Mock use() hook
 *    - Render component
 *    - Simulate button clicks
 *    - Assert correct functions were called
 *
 * 2. INTEGRATION TESTS:
 *    - Render with real Context
 *    - Click buttons
 *    - Assert vote count changes
 *    - Assert Context state updates
 *
 * 3. MANUAL TESTING (current):
 *    - Open browser console
 *    - Click upvote → see "UPVOTE" logged
 *    - Click downvote → see "DOWNVOTE" logged
 *    - Verifies formAction wiring works
 *
 * WHAT'S NEXT:
 * ============
 * In upcoming lessons, we'll:
 *
 * 1. IMPLEMENT VOTING (Lesson 280+):
 *    - Replace console.log with upvoteOpinion(id)
 *    - Replace console.log with downvoteOpinion(id)
 *    - See vote count change on click
 *
 * 2. BACKEND INTEGRATION:
 *    - Send vote updates to backend API
 *    - Persist votes in database
 *    - Handle network errors
 *
 * 3. OPTIMISTIC UPDATES:
 *    - Update UI immediately (don't wait for backend)
 *    - Revert if backend fails
 *    - Better user experience
 *
 * 4. LOADING STATES:
 *    - Disable buttons while voting
 *    - Show loading indicator
 *    - Prevent double-voting
 *
 * 5. ERROR HANDLING:
 *    - Show error messages if vote fails
 *    - Retry failed votes
 *    - Graceful degradation
 *
 * 6. ACCESSIBILITY:
 *    - Add aria-label to buttons
 *    - Keyboard navigation
 *    - Screen reader announcements
 *
 * 7. ANIMATIONS:
 *    - Animate vote count changes
 *    - Button press feedback
 *    - Success/error animations
 *
 * REAL-WORLD APPLICATIONS:
 * ========================
 * This formAction pattern is used in many real apps:
 *
 * - Reddit: Upvote/downvote posts and comments
 * - Stack Overflow: Upvote/downvote questions and answers
 * - Twitter: Like/unlike posts (could use this pattern)
 * - YouTube: Like/dislike videos
 * - Product Hunt: Upvote products
 * - Any voting or rating system
 *
 * The pattern we're learning here is production-ready and scalable!
 */
