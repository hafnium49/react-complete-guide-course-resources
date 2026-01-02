/**
 * ============================================================================
 * LESSON 281: LOADING STATES WITH useActionState - PREVENTING DOUBLE-VOTING
 * ============================================================================
 *
 * This component demonstrates how to add loading states and prevent double-voting
 * using React 19's useActionState hook with multiple form actions.
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
 *
 * useActionState() HOOK FROM REACT 19 (NEW IN LESSON 281)
 * ========================================================
 * We also import useActionState to manage form action state and loading states.
 *
 * This hook allows us to:
 * - Track when a form action is pending (in progress)
 * - Wrap form actions to get their pending state
 * - Manage form state across submissions
 * - Disable buttons during submission
 * - Provide better UX with loading indicators
 *
 * HOOK SIGNATURE:
 * ---------------
 * const [state, formAction, pending] = useActionState(action, initialState);
 *
 * Parameters:
 * - action: The form action function to wrap
 * - initialState: Initial state value (often null for simple cases)
 *
 * Returns (array with 3 elements):
 * - state: Current state value (updated by action's return value)
 * - formAction: Wrapped version of the action to use on buttons
 * - pending: Boolean - true while action is running, false otherwise
 *
 * WHY WE NEED THIS:
 * -----------------
 * In Lesson 280, we noticed "strange behavior" when rapidly clicking vote buttons:
 * - Multiple requests sent simultaneously
 * - Vote count "jumps" as requests complete
 * - No visual feedback during voting
 * - User can double-vote
 *
 * useActionState fixes this by:
 * - Tracking pending state for each action
 * - Allowing us to disable buttons while voting
 * - Providing pending state for UI feedback
 * - Making the UX much smoother
 */
import { use, useActionState } from 'react';

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
   * FORM ACTION FUNCTION: upvoteAction - WILL BE WRAPPED BY useActionState
   * ============================================================================
   *
   * This async function is the "raw" form action that will be wrapped by
   * useActionState to add loading state tracking.
   *
   * LESSON 280 vs LESSON 281:
   * --------------------------
   * LESSON 280 (Previous):
   * - We used this function directly on the button: formAction={upvoteAction}
   * - No loading state tracking
   * - Users could click multiple times rapidly
   * - No visual feedback during voting
   *
   * LESSON 281 (Current):
   * - We wrap this function with useActionState
   * - Get a wrapped version (upvoteFormAction) and pending state (upvotePending)
   * - Use the wrapped version on the button: formAction={upvoteFormAction}
   * - Can now track loading and disable buttons
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
   * WRAPPING FORM ACTIONS WITH useActionState - ADDING LOADING STATES
   * ============================================================================
   *
   * THE PROBLEM WE'RE SOLVING (from Lesson 280):
   * ----------------------------------------------
   * When we tested the voting buttons in Lesson 280, we noticed:
   * "If you're now hammering this upvote button, there is some strange behavior
   * because then it looks really weird if it changes like this."
   *
   * What happens when rapidly clicking:
   * 1. User clicks upvote 5 times rapidly
   * 2. All 5 requests are sent to the backend
   * 3. Each request takes ~1 second to complete
   * 4. The vote count "jumps" as each request finishes
   * 5. Very confusing and janky UX!
   *
   * THE SOLUTION: useActionState
   * -----------------------------
   * We use useActionState to wrap our form actions and track their pending state.
   *
   * This allows us to:
   * ✓ Know when a voting action is in progress
   * ✓ Disable buttons while voting
   * ✓ Prevent double-voting
   * ✓ Show loading indicators (if we wanted to)
   * ✓ Provide smooth, predictable UX
   *
   * WHY WE NEED TWO CALLS:
   * -----------------------
   * We have TWO separate form actions (upvote and downvote), so we need
   * TWO separate useActionState calls.
   *
   * As the instructor explains:
   * "Here I have to call this hook twice though because I have two actions,
   * and one hook can only handle one action."
   *
   * Each useActionState call:
   * - Wraps one action
   * - Tracks pending state for that action
   * - Returns a wrapped version of that action
   *
   * We can't do this with just one useActionState because each hook only
   * tracks ONE action's pending state.
   *
   * HOOK CALL #1: WRAP UPVOTE ACTION
   * =================================
   * const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(upvoteAction, null);
   *
   * PARAMETERS:
   * -----------
   * 1. upvoteAction - The raw form action function we defined above
   * 2. null - Initial state value (we don't need state management, so null)
   *
   * RETURN VALUES (Array with 3 elements):
   * --------------------------------------
   * 1. upvoteFormState - Current state (we don't use this, so we could name it _upvoteFormState)
   * 2. upvoteFormAction - Wrapped version of upvoteAction to use on button
   * 3. upvotePending - Boolean: true while upvoteAction is running, false otherwise
   *
   * WHAT EACH RETURN VALUE IS FOR:
   * --------------------------------
   * upvoteFormState:
   * - Stores state returned by the form action
   * - Useful for error messages, validation results, etc.
   * - In our case, upvoteAction doesn't return anything, so this stays null
   * - We don't use it, but we still need to destructure it (could use _ prefix)
   *
   * upvoteFormAction:
   * - This is the WRAPPED version of upvoteAction
   * - It has the same behavior as upvoteAction
   * - But it also updates the pending state automatically
   * - We'll use THIS on the button, not the original upvoteAction
   *
   * upvotePending:
   * - Boolean value: true or false
   * - true: upvoteAction is currently running (async operation in progress)
   * - false: upvoteAction is not running (idle)
   * - We'll use this to disable buttons and show loading states
   *
   * HOW IT WORKS:
   * -------------
   * 1. Initially: upvotePending = false
   * 2. User clicks upvote button
   * 3. upvoteFormAction is called
   * 4. upvotePending immediately becomes true
   * 5. upvoteAction executes (sends backend request)
   * 6. ~1 second delay (waiting for backend)
   * 7. upvoteAction completes
   * 8. upvotePending becomes false again
   * 9. Buttons re-enable
   *
   * BUTTON LOGIC:
   * -------------
   * We'll disable BOTH buttons when EITHER action is pending:
   * <button formAction={upvoteFormAction} disabled={upvotePending || downvotePending}>
   * <button formAction={downvoteFormAction} disabled={upvotePending || downvotePending}>
   *
   * Why disable both buttons?
   * - Prevents voting in both directions simultaneously
   * - Clearer UX (user knows voting is in progress)
   * - Prevents race conditions
   * - One vote at a time, as expected
   */
  const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(
    upvoteAction,
    null
  );

  /**
   * HOOK CALL #2: WRAP DOWNVOTE ACTION
   * ====================================
   * const [downvoteFormState, downvoteFormAction, downvotePending] = useActionState(downvoteAction, null);
   *
   * This is the SAME pattern as the upvote hook, just for the downvote action.
   *
   * PARAMETERS:
   * -----------
   * 1. downvoteAction - The raw form action function we defined above
   * 2. null - Initial state value (we don't need state management, so null)
   *
   * RETURN VALUES:
   * --------------
   * 1. downvoteFormState - Current state (not used, stays null)
   * 2. downvoteFormAction - Wrapped version of downvoteAction to use on button
   * 3. downvotePending - Boolean: true while downvoteAction is running, false otherwise
   *
   * WHY WE CAN'T COMBINE THEM:
   * ---------------------------
   * You might think: "Can't we just use one useActionState for both actions?"
   *
   * NO, we can't because:
   * - useActionState tracks ONE action at a time
   * - We have TWO different actions (upvote and downvote)
   * - Each action needs its own pending state
   *
   * If we tried to use one hook:
   * const [state, action, pending] = useActionState(???, null);
   *
   * What would we pass as the first parameter? upvoteAction or downvoteAction?
   * We'd have to choose one, and then we couldn't track the other!
   *
   * ALTERNATIVE APPROACH (More complex, not recommended):
   * ------------------------------------------------------
   * We COULD create a single combined action:
   *
   * function voteAction(prevState, formData) {
   *   const action = formData.get('action');
   *   if (action === 'upvote') await upvoteOpinion(id);
   *   else if (action === 'downvote') await downvoteOpinion(id);
   * }
   *
   * const [state, formAction, pending] = useActionState(voteAction, null);
   *
   * <button name="action" value="upvote" disabled={pending}>↑</button>
   * <button name="action" value="downvote" disabled={pending}>↓</button>
   *
   * But this is worse because:
   * ✗ Loses the clarity of separate actions
   * ✗ Needs extra form data for action type
   * ✗ More complex logic in the action function
   * ✗ Harder to test and maintain
   *
   * THE BETTER APPROACH (What we're doing):
   * ----------------------------------------
   * Two separate useActionState calls:
   * ✓ Clear separation of concerns
   * ✓ Each action is independent
   * ✓ Easy to understand and maintain
   * ✓ Can track each action's pending state separately
   * ✓ More flexible (could show different loading states for each button)
   *
   * In our case, we disable both buttons when either is pending,
   * but we COULD show different loading indicators if we wanted:
   * - Upvote button: {upvotePending ? '⏳' : '↑'}
   * - Downvote button: {downvotePending ? '⏳' : '↓'}
   *
   * This wouldn't be possible with a single useActionState!
   *
   * TIMING AND STATE UPDATES:
   * --------------------------
   * upvotePending and downvotePending are independent:
   *
   * Scenario 1: User clicks upvote
   * - upvotePending: false → true → false (1 second cycle)
   * - downvotePending: false (unchanged)
   *
   * Scenario 2: User clicks downvote
   * - upvotePending: false (unchanged)
   * - downvotePending: false → true → false (1 second cycle)
   *
   * Scenario 3: User tries to click both (but they're disabled!)
   * - If upvote is clicked first: upvotePending = true
   * - Both buttons become disabled
   * - Downvote click is blocked (button is disabled)
   * - upvotePending goes back to false
   * - Both buttons re-enable
   * - Now user can vote again (upvote or downvote)
   *
   * This prevents simultaneous voting and race conditions!
   */
  const [downvoteFormState, downvoteFormAction, downvotePending] =
    useActionState(downvoteAction, null);

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
          UPVOTE BUTTON WITH WRAPPED formAction AND disabled STATE (LESSON 281)
          ======================================================================
          This button demonstrates the complete useActionState pattern!

          WHAT'S NEW IN LESSON 281:
          --------------------------
          BEFORE (Lesson 280):
          - formAction={upvoteAction}
          - No disabled prop
          - Users could click multiple times rapidly
          - Vote count would "jump" as requests completed

          AFTER (Lesson 281):
          - formAction={upvoteFormAction} ← Wrapped version from useActionState
          - disabled={upvotePending || downvotePending} ← Prevents double-voting
          - Buttons disable while ANY vote is in progress
          - Smooth, predictable UX

          THE formAction PROP (Updated):
          -------------------------------
          formAction={upvoteFormAction}

          Notice we're using upvoteFormAction, NOT upvoteAction!

          upvoteFormAction is the WRAPPED version returned by useActionState:
          const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(upvoteAction, null);
                                    ↑ We use THIS on the button

          WHY THE WRAPPED VERSION?
          ------------------------
          The wrapped version (upvoteFormAction):
          ✓ Does everything upvoteAction does (calls upvoteOpinion)
          ✓ PLUS automatically updates upvotePending state
          ✓ Sets upvotePending = true when called
          ✓ Sets upvotePending = false when complete
          ✓ This happens automatically - we don't write the code!

          If we used the raw upvoteAction:
          ✗ The pending state wouldn't update
          ✗ The disabled prop wouldn't work
          ✗ We'd be back to the Lesson 280 behavior (double-voting)

          THE disabled PROP (New!):
          --------------------------
          disabled={upvotePending || downvotePending}

          This is a Boolean expression that evaluates to true or false.

          WHEN THE BUTTON IS DISABLED:
          -----------------------------
          The button becomes disabled when EITHER:
          - upvotePending is true (upvote action is running)
          - OR downvotePending is true (downvote action is running)

          WHY DISABLE BOTH BUTTONS?
          --------------------------
          We disable BOTH buttons (upvote and downvote) when EITHER action is pending.

          This prevents:
          ✗ Clicking upvote while upvote is already in progress (double upvote)
          ✗ Clicking downvote while downvote is already in progress (double downvote)
          ✗ Clicking upvote while downvote is in progress (simultaneous votes)
          ✗ Clicking downvote while upvote is in progress (simultaneous votes)

          The rule is: ONE VOTE AT A TIME.

          USER EXPERIENCE FLOW:
          ---------------------
          1. Initially: Both buttons enabled (upvotePending = false, downvotePending = false)
          2. User clicks upvote
          3. upvoteFormAction is called
          4. upvotePending becomes true IMMEDIATELY
          5. disabled={true || false} = true
          6. BOTH buttons become disabled (visual feedback!)
          7. Backend request is sent (~1 second)
          8. Vote count updates (Context state changes)
          9. Backend request completes
          10. upvotePending becomes false
          11. disabled={false || false} = false
          12. BOTH buttons re-enable
          13. User can vote again

          VISUAL FEEDBACK:
          ----------------
          When a button is disabled:
          - CSS styling changes (often grayed out, lower opacity)
          - Cursor changes to "not-allowed" or default
          - Button doesn't respond to clicks
          - User clearly sees voting is in progress

          This is much better UX than Lesson 280 where:
          - Buttons stayed clickable
          - No visual feedback
          - Vote count "jumped" unexpectedly

          PREVENTING THE "STRANGE BEHAVIOR":
          -----------------------------------
          The instructor mentioned in Lesson 280:
          "If you're now hammering this upvote button, there is some strange behavior
          because then it looks really weird if it changes like this."

          LESSON 280 (Without disabled):
          User clicks 5 times → 5 requests sent → Vote jumps 5 times → Weird!

          LESSON 281 (With disabled):
          User clicks once → Button disables → Request completes → Button re-enables
          User can click again → Button disables → Request completes → Button re-enables
          One vote at a time → Smooth, predictable → No weirdness!

          ALTERNATIVE: useFormStatus APPROACH
          ------------------------------------
          The instructor also mentions an alternative approach:
          "You could outsource the buttons into separate components and use
          useFormStatus there."

          This would mean:
          - Create UpvoteButton component with useFormStatus
          - Create DownvoteButton component with useFormStatus
          - Each tracks its own pending state
          - Similar to how Submit.jsx uses useFormStatus

          But the instructor chose useActionState because:
          ✓ Keeps voting logic in one component
          ✓ No need to create extra components
          ✓ Easier to manage shared state (both buttons disabled together)
          ✓ More straightforward for this use case

          BOOLEAN LOGIC BREAKDOWN:
          ------------------------
          disabled={upvotePending || downvotePending}

          Truth table:
          upvotePending | downvotePending | Result | Button State
          --------------|-----------------|--------|-------------
          false         | false           | false  | ENABLED
          true          | false           | true   | DISABLED
          false         | true            | true   | DISABLED
          true          | true            | true   | DISABLED

          Only ONE scenario enables the button: BOTH pending states are false.
          This ensures only one vote can happen at a time.

          CSS STYLING (Automatic):
          -------------------------
          Browsers automatically style disabled buttons with CSS
          using the :disabled pseudo-class with properties like
          opacity: 0.6, cursor: not-allowed, etc.

          You can customize this in your CSS to change the
          appearance of disabled buttons (background-color,
          color, opacity, etc.).

          ACCESSIBILITY BENEFITS:
          -----------------------
          The disabled attribute:
          ✓ Tells screen readers the button is disabled
          ✓ Prevents keyboard navigation to the button
          ✓ Semantic HTML (better than just CSS styling)
          ✓ Works without JavaScript (if we were doing SSR)

          Screen reader announcement:
          "Upvote button, dimmed, unavailable"

          TESTING THE BEHAVIOR:
          ---------------------
          1. Open the app in the browser
          2. Click an upvote button
          3. Notice BOTH buttons (upvote and downvote) gray out immediately
          4. Wait ~1 second
          5. Vote count increases
          6. Both buttons re-enable
          7. Try clicking rapidly - only first click registers!

          This is the improved UX we wanted!
        */}
        <button
          formAction={upvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
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
          DOWNVOTE BUTTON WITH WRAPPED formAction AND disabled STATE (LESSON 281)
          ========================================================================
          This button mirrors the upvote button pattern with useActionState!

          WHAT'S NEW IN LESSON 281:
          --------------------------
          BEFORE (Lesson 280):
          - formAction={downvoteAction}
          - No disabled prop
          - Users could click multiple times rapidly
          - Vote count would "jump" as requests completed

          AFTER (Lesson 281):
          - formAction={downvoteFormAction} ← Wrapped version from useActionState
          - disabled={upvotePending || downvotePending} ← Prevents double-voting
          - Buttons disable while ANY vote is in progress
          - Smooth, predictable UX

          THE formAction PROP (Updated):
          -------------------------------
          formAction={downvoteFormAction}

          Notice we're using downvoteFormAction, NOT downvoteAction!

          downvoteFormAction is the WRAPPED version returned by useActionState:
          const [downvoteFormState, downvoteFormAction, downvotePending] = useActionState(downvoteAction, null);
                                      ↑ We use THIS on the button

          SAME PATTERN AS UPVOTE:
          -----------------------
          Both buttons follow the exact same pattern:
          - Upvote: formAction={upvoteFormAction}
          - Downvote: formAction={downvoteFormAction}

          Each uses the wrapped version from useActionState.

          THE disabled PROP (Identical to Upvote):
          -----------------------------------------
          disabled={upvotePending || downvotePending}

          Notice this is THE SAME as the upvote button!

          Both buttons share the same disabled logic:
          - Disabled when upvote is pending
          - Disabled when downvote is pending
          - Only enabled when BOTH are not pending

          SYMMETRY AND CONSISTENCY:
          -------------------------
          Both voting buttons have identical disabled logic.
          This ensures:
          ✓ Consistent UX (both buttons behave the same way)
          ✓ No simultaneous voting (only one action at a time)
          ✓ Clear visual feedback (both gray out together)
          ✓ Predictable behavior (users quickly learn the pattern)

          USER EXPERIENCE WITH DOWNVOTE:
          -------------------------------
          1. User clicks downvote button
          2. downvoteFormAction is called
          3. downvotePending becomes true IMMEDIATELY
          4. disabled={false || true} = true
          5. BOTH buttons (upvote and downvote) become disabled
          6. Backend request is sent (~1 second)
          7. Vote count DECREASES (Context state changes)
          8. Backend request completes
          9. downvotePending becomes false
          10. disabled={false || false} = false
          11. BOTH buttons re-enable
          12. User can vote again (upvote or downvote)

          PREVENTING VOTE SPAM:
          ---------------------
          Without the disabled prop (Lesson 280):
          - User hammers downvote button 10 times
          - 10 backend requests sent
          - Vote count decreases by 10 over 1-2 seconds
          - "Strange behavior" as count jumps

          With the disabled prop (Lesson 281):
          - User clicks downvote button
          - Button immediately disables
          - First request processes
          - Vote count decreases by 1
          - Button re-enables
          - User can click again (but only once at a time)
          - Smooth, controlled voting

          COMPLETE LESSON 281 SOLUTION:
          ------------------------------
          We've now implemented the complete solution to the double-voting problem:
          1. ✓ Imported useActionState hook
          2. ✓ Wrapped both form actions (upvote and downvote)
          3. ✓ Extracted pending states (upvotePending, downvotePending)
          4. ✓ Used wrapped actions on buttons (upvoteFormAction, downvoteFormAction)
          5. ✓ Added disabled prop to both buttons
          6. ✓ Disabled both buttons when either action is pending

          Result: Smooth, predictable voting UX with no double-voting!

          TESTING THE COMPLETE BEHAVIOR:
          -------------------------------
          1. Open the app in the browser
          2. Click a downvote button
          3. Notice BOTH buttons (upvote and downvote) gray out immediately
          4. Wait ~1 second
          5. Vote count DECREASES
          6. Both buttons re-enable
          7. Try rapid clicking - only first click registers!
          8. Try alternating between upvote and downvote - each vote waits for previous to complete
          9. Perfect UX!
        */}
        <button
          formAction={downvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
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
 * SUMMARY & KEY CONCEPTS - LESSON 281: useActionState for Loading States
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. useActionState HOOK: React 19's hook for wrapping form actions and
 *    tracking their pending state. Essential for loading states and UX.
 *
 * 2. WRAPPING FORM ACTIONS: useActionState wraps an action function and
 *    returns [state, wrappedAction, pending]. Use the wrapped action on buttons.
 *
 * 3. PENDING STATE TRACKING: The pending boolean automatically becomes true
 *    when the action starts and false when it completes.
 *
 * 4. MULTIPLE useActionState CALLS: Each action needs its own useActionState
 *    hook. We used two hooks for upvote and downvote actions.
 *
 * 5. DISABLED BUTTONS: Using disabled={upvotePending || downvotePending}
 *    prevents double-voting and provides visual feedback.
 *
 * 6. SOLVING THE "STRANGE BEHAVIOR": By disabling buttons during voting,
 *    we prevent the vote count from "jumping" when users rapidly click.
 *
 * LESSONS 279-281 PROGRESSION:
 * =============================
 * LESSON 279: Set up multiple form actions with formAction on buttons
 * LESSON 280: Made actions async and added backend integration
 * LESSON 281: Added loading states with useActionState to prevent double-voting
 *
 * THE useActionState PATTERN:
 * ============================
 * COMPLETE IMPLEMENTATION WITH LOADING STATES:
 *
 * // 1. Define the raw form action
 * async function upvoteAction(prevState, formData) {
 *   await upvoteOpinion(id);
 * }
 *
 * // 2. Wrap it with useActionState
 * const [upvoteFormState, upvoteFormAction, upvotePending] =
 *   useActionState(upvoteAction, null);
 *
 * // 3. Use wrapped action and pending state on button
 * <button
 *   formAction={upvoteFormAction}
 *   disabled={upvotePending || downvotePending}
 * >
 *   Upvote
 * </button>
 *
 * This pattern gives you automatic loading state management!
 *
 * USE CASES FOR useActionState:
 * ==============================
 * This pattern is perfect for ANY async form action where you need:
 *
 * 1. VOTING SYSTEMS (our use case):
 *    - Prevent double-voting
 *    - Disable buttons during vote submission
 *    - Show which vote is in progress
 *
 * 2. FORM SUBMISSIONS:
 *    - Disable submit button during submission
 *    - Prevent duplicate submissions
 *    - Show "Submitting..." state
 *
 * 3. DELETE OPERATIONS:
 *    - Disable delete button during deletion
 *    - Prevent accidental double-deletes
 *    - Show "Deleting..." state
 *
 * 4. ASYNC ACTIONS WITH BACKEND:
 *    - Any button that triggers an API call
 *    - Any button that needs to wait for a response
 *    - Any button that should be disabled during operation
 *
 * COMPARISON: useActionState vs Manual State Management:
 * ========================================================
 *
 * WITHOUT useActionState (Manual approach):
 * ------------------------------------------
 * const [isVoting, setIsVoting] = useState(false);
 *
 * async function upvoteAction(prevState, formData) {
 *   setIsVoting(true);
 *   try {
 *     await upvoteOpinion(id);
 *   } finally {
 *     setIsVoting(false);
 *   }
 * }
 *
 * <button formAction={upvoteAction} disabled={isVoting}>
 *
 * Cons:
 * ✗ Manual state management (more code)
 * ✗ Need try/finally to ensure state resets
 * ✗ Have to remember to update state
 * ✗ More places for bugs
 * ✗ Shared state for multiple actions gets complex
 *
 * WITH useActionState (Automatic):
 * ---------------------------------
 * const [_, upvoteFormAction, upvotePending] = useActionState(upvoteAction, null);
 *
 * <button formAction={upvoteFormAction} disabled={upvotePending}>
 *
 * Pros:
 * ✓ Automatic state management (less code)
 * ✓ React handles pending state automatically
 * ✓ No need for try/finally
 * ✓ Cleaner, more declarative
 * ✓ Each action gets its own pending state
 * ✓ Less room for bugs
 *
 * WHEN TO USE useActionState:
 * ----------------------------
 * Use useActionState when:
 * ✓ You have async form actions
 * ✓ You need loading/pending states
 * ✓ You want to disable buttons during submission
 * ✓ You want React to manage the state automatically
 * ✓ You're using React 19 or newer
 *
 * Use manual useState when:
 * ✓ You need more complex state logic
 * ✓ You need to control state updates manually
 * ✓ You're not using React 19 yet
 *
 * EXECUTION FLOW (LESSON 281 - WITH useActionState):
 * ====================================================
 * 1. User clicks upvote button
 * 2. React sees formAction={upvoteFormAction} (wrapped version!)
 * 3. React prevents default form submission
 * 4. React calls upvoteFormAction
 * 5. upvotePending becomes true IMMEDIATELY
 * 6. Component re-renders with disabled buttons
 * 7. upvoteFormAction internally calls the original upvoteAction
 * 8. upvoteAction calls upvoteOpinion(id)
 * 9. Backend request is sent
 * 10. ~1 second delay (backend processing)
 * 11. Backend responds
 * 12. Context updates opinions state (votes + 1)
 * 13. Component re-renders with new vote count
 * 14. upvoteAction completes
 * 15. upvotePending becomes false automatically
 * 16. Component re-renders with enabled buttons
 * 17. User can vote again!
 *
 * KEY DIFFERENCES FROM LESSON 280:
 * =================================
 * Steps 5-6 and 15-16 are NEW in Lesson 281:
 * - upvotePending automatically becomes true at start
 * - upvotePending automatically becomes false at end
 * - Buttons automatically disable/enable based on pending
 * - User gets immediate visual feedback
 * - Double-voting is prevented
 *
 * CODE ORGANIZATION (LESSON 281):
 * ================================
 * Notice how we structured this component:
 *
 * 1. Imports (React hooks: use, useActionState; Context)
 * 2. Component function
 *    a. Context consumption (use hook)
 *    b. Form action functions (upvoteAction, downvoteAction)
 *    c. useActionState hooks (wrapping both actions)
 *    d. Render (JSX with wrapped actions and disabled prop)
 *
 * This organization:
 * ✓ Follows React conventions
 * ✓ Keeps related code together
 * ✓ Hooks are called at the top level
 * ✓ Form actions defined before being wrapped
 * ✓ Easy to understand flow
 * ✓ Easy to test (mock Context and hooks)
 *
 * TESTING APPROACH (LESSON 281):
 * ===============================
 * How to test this component with useActionState:
 *
 * 1. UNIT TESTS:
 *    - Mock OpinionsContext
 *    - Mock use() and useActionState hooks
 *    - Render component
 *    - Simulate button clicks
 *    - Assert buttons disable during action
 *    - Assert correct functions were called
 *
 * 2. INTEGRATION TESTS:
 *    - Render with real Context
 *    - Click upvote button
 *    - Assert both buttons become disabled immediately
 *    - Wait for action to complete
 *    - Assert vote count increases
 *    - Assert buttons re-enable
 *    - Repeat for downvote
 *
 * 3. MANUAL TESTING (Lesson 281):
 *    - Open the app in browser
 *    - Click upvote → buttons gray out immediately
 *    - Wait ~1 second → vote count increases
 *    - Buttons re-enable
 *    - Try rapid clicking → only first click works!
 *    - Verifies useActionState prevents double-voting
 *
 * COMPLETED IN LESSONS 279-281:
 * ==============================
 * ✓ LESSON 279: Set up multiple form actions with formAction on buttons
 * ✓ LESSON 280: Made actions async and added backend integration
 * ✓ LESSON 281: Added loading states with useActionState to prevent double-voting
 *
 * WHAT WE'VE ACCOMPLISHED:
 * ========================
 * ✓ Multiple form actions (upvote and downvote)
 * ✓ Async backend integration (HTTP POST requests)
 * ✓ Confirm-then-update pattern (wait for backend before UI update)
 * ✓ Loading state tracking (useActionState)
 * ✓ Disabled buttons during voting (prevents double-voting)
 * ✓ Clean, maintainable code structure
 *
 * POTENTIAL FUTURE ENHANCEMENTS:
 * ===============================
 * If we wanted to extend this further, we could add:
 *
 * 1. OPTIMISTIC UPDATES:
 *    - Update UI immediately (don't wait for backend)
 *    - Revert if backend fails
 *    - Even faster perceived performance
 *
 * 2. ERROR HANDLING WITH UI FEEDBACK:
 *    - Show toast/alert if vote fails
 *    - Retry failed votes automatically
 *    - Display error message to user
 *
 * 3. LOADING INDICATORS:
 *    - Spinner icons on buttons during voting
 *    - "Voting..." text instead of icons
 *    - Progress bars for long operations
 *
 * 4. ENHANCED ACCESSIBILITY:
 *    - aria-label on buttons ("Upvote this opinion")
 *    - Announce vote changes to screen readers
 *    - Keyboard shortcuts for voting
 *
 * 5. ANIMATIONS:
 *    - Animate vote count changes (count up/down)
 *    - Button press feedback (scale, color change)
 *    - Success animations when vote completes
 *
 * REAL-WORLD APPLICATIONS:
 * ========================
 * The useActionState + formAction pattern we implemented is used in many real apps:
 *
 * - Reddit: Upvote/downvote with loading states (buttons disable during vote)
 * - Stack Overflow: Vote buttons disable to prevent double-voting
 * - Twitter: Like button shows loading state during request
 * - YouTube: Like/dislike with instant feedback and disabled state
 * - Product Hunt: Upvote buttons disable during submission
 * - Any voting, rating, or action system with async backend
 *
 * The patterns we learned (Form Actions + useActionState) are:
 * ✓ Production-ready
 * ✓ Scalable
 * ✓ User-friendly
 * ✓ Industry standard
 * ✓ React 19 best practices
 *
 * This is exactly how modern React apps should handle async form actions!
 */
