/**
 * ============================================================================
 * LESSON 283: FORM ACTIONS SUMMARY - COMPREHENSIVE RECAP
 * ============================================================================
 *
 * This lesson is a COMPLETE SUMMARY of all form actions features we've learned!
 *
 * As the instructor says: "And that's now it for form actions. These are the
 * core form actions related features React offers."
 *
 * This component demonstrates the FULL form actions toolkit:
 * - Form actions with action/formAction props
 * - Automatic form data collection
 * - useActionState for state management and loading states
 * - useOptimistic for instant UI updates
 * - Async form actions for backend integration
 *
 * KEY LEARNING OBJECTIVES (COMPLETE SECTION SUMMARY):
 * ====================================================
 * 1. Form Actions: Functions passed to action prop (form) or formAction prop (buttons)
 * 2. Automatic FormData: React collects all input values automatically
 * 3. Automatic Form Reset: Forms reset after submission (can be a problem!)
 * 4. useActionState: Return values from actions, manage state, track loading
 * 5. Async Actions: Form actions can be async for backend requests
 * 6. useFormStatus: Track pending state and update UI while submitting
 * 7. useOptimistic: Temporary state for instant UI feedback
 * 8. Choice: Form actions OR manual onSubmit - both are valid!
 *
 * THE PROBLEM WE'RE SOLVING (FROM LESSON 281):
 * ==============================================
 * In Lesson 281, we solved the double-voting problem with useActionState.
 * Now we have a NEW problem: SLOW UI FEEDBACK.
 *
 * CURRENT BEHAVIOR (Lesson 281):
 * -------------------------------
 * 1. User clicks upvote button
 * 2. Buttons disable immediately (good!)
 * 3. Backend request is sent (~1 second)
 * 4. User waits... ⏳ (vote count doesn't change yet)
 * 5. Backend responds
 * 6. Vote count updates
 * 7. Buttons re-enable
 *
 * THE ISSUE:
 * ----------
 * As the instructor says:
 * "When I press this button, we have to wait for a second
 * until this vote number goes up. Now that's not horrible of course,
 * but we can do better."
 *
 * Users expect INSTANT feedback when they click.
 * Waiting 1 second feels sluggish, even though it's technically working correctly.
 *
 * DESIRED BEHAVIOR (Lesson 282):
 * -------------------------------
 * 1. User clicks upvote button
 * 2. Vote count updates INSTANTLY ⚡ (optimistic update!)
 * 3. Buttons disable
 * 4. Backend request is sent (~1 second)
 * 5. Backend responds
 * 6. Vote count is confirmed (already showing correct value)
 * 7. Buttons re-enable
 *
 * MUCH BETTER UX! Vote count changes immediately = feels fast and responsive.
 *
 * REACT 19 SOLUTION: useOptimistic HOOK
 * ======================================
 * React 19 provides the useOptimistic hook for this exact use case!
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
 * useActionState() HOOK FROM REACT 19 (FROM LESSON 281)
 * =======================================================
 * We import useActionState to manage form action state and loading states.
 * This prevents double-voting by disabling buttons during submission.
 *
 * useOptimistic() HOOK FROM REACT 19 (NEW IN LESSON 282)
 * =======================================================
 * We also import useOptimistic for instant UI updates (optimistic updates).
 *
 * This hook allows us to:
 * - Update the UI INSTANTLY when user clicks (before backend responds)
 * - Show a TEMPORARY optimistic state while form is submitting
 * - Automatically REPLACE optimistic state with real state when backend responds
 * - Automatically ROLLBACK to old state if backend fails
 *
 * HOOK SIGNATURE:
 * ---------------
 * const [optimisticState, setOptimisticState] = useOptimistic(
 *   actualState,
 *   updateFunction
 * );
 *
 * Parameters:
 * - actualState: The real/current state value (e.g., votes prop)
 * - updateFunction: (prevState, ...customArgs) => newState
 *
 * Returns (array with 2 elements):
 * - optimisticState: The state to display in UI (temporary during submission)
 * - setOptimisticState: Function to trigger optimistic update
 *
 * HOW IT WORKS:
 * -------------
 * 1. Call setOptimisticState('up') BEFORE sending backend request
 * 2. updateFunction runs: (prevVotes, 'up') => prevVotes + 1
 * 3. optimisticState immediately becomes prevVotes + 1
 * 4. Component re-renders with new optimistic value
 * 5. User sees instant feedback!
 * 6. Backend request sent and processed
 * 7. When backend responds:
 *    - If SUCCESS: optimistic state is discarded, real state takes over (same value)
 *    - If FAILURE: optimistic state is discarded, rolls back to old value
 *
 * WHY WE NEED THIS:
 * -----------------
 * In Lesson 281, vote count updates were SLOW:
 * - User clicks → waits 1 second → count updates
 * - Feels sluggish even though it works correctly
 *
 * useOptimistic fixes this by:
 * - Updating UI INSTANTLY (no waiting!)
 * - Still sending backend request (correctness)
 * - Best of both worlds: FAST + CORRECT
 */
import { use, useActionState, useOptimistic } from 'react';

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
   * OPTIMISTIC STATE MANAGEMENT WITH useOptimistic (NEW IN LESSON 282)
   * ============================================================================
   *
   * THE GOAL:
   * ---------
   * We want the vote count to update INSTANTLY when the user clicks,
   * not after 1 second when the backend responds.
   *
   * THE SOLUTION:
   * -------------
   * Use the useOptimistic hook to manage a temporary, optimistic vote count.
   *
   * HOOK CALL:
   * ----------
   * const [optimisticVotes, setVotesOptimistically] = useOptimistic(
   *   votes,
   *   (prevVotes, mode) => {
   *     return mode === 'up' ? prevVotes + 1 : prevVotes - 1;
   *   }
   * );
   *
   * PARAMETER 1: votes (Initial/Actual State)
   * ------------------------------------------
   * This is the REAL vote count from props.
   *
   * It comes from the opinions Context state, which is updated
   * when the backend confirms the vote.
   *
   * This is the "source of truth" - the actual, confirmed vote count.
   *
   * useOptimistic uses this as:
   * - The initial value for optimisticVotes
   * - The fallback value if optimistic update fails
   * - The final value once form submission completes
   *
   * PARAMETER 2: Update Function
   * -----------------------------
   * This function defines HOW to update the optimistic state.
   *
   * Function signature: (prevState, ...customArgs) => newState
   *
   * First parameter (prevVotes):
   * - Automatically passed by React
   * - The previous optimistic state value
   * - Initially equals the votes prop
   *
   * Additional parameters (...customArgs):
   * - YOU define these!
   * - Passed when you call setVotesOptimistically(...args)
   * - In our case: mode ('up' or 'down')
   *
   * Return value:
   * - The new optimistic state
   * - In our case: prevVotes + 1 or prevVotes - 1
   *
   * THE UPDATE FUNCTION EXPLAINED:
   * -------------------------------
   * (prevVotes, mode) => {
   *   return mode === 'up' ? prevVotes + 1 : prevVotes - 1;
   * }
   *
   * This is a simple conditional:
   * - If mode is 'up': add 1 to votes (upvote)
   * - Otherwise: subtract 1 from votes (downvote)
   *
   * WHY WE NEED THE mode PARAMETER:
   * --------------------------------
   * We have TWO different actions (upvote and downvote).
   * We need to know WHICH action triggered the optimistic update.
   *
   * We COULD have used two separate useOptimistic hooks:
   * const [optimisticVotes1, setUpvoteOptimistically] = useOptimistic(votes, prev => prev + 1);
   * const [optimisticVotes2, setDownvoteOptimistically] = useOptimistic(votes, prev => prev - 1);
   *
   * But that's complicated! Instead:
   * - ONE useOptimistic hook
   * - ONE update function
   * - ONE mode parameter to distinguish between up and down
   *
   * RETURN VALUES:
   * --------------
   * optimisticVotes:
   * - The state value to show in the UI
   * - Initially equals votes prop
   * - Changes to temporary value when setVotesOptimistically is called
   * - Reverts to real votes prop when form submission completes
   *
   * setVotesOptimistically:
   * - Function to trigger an optimistic update
   * - Call it with custom arguments: setVotesOptimistically('up')
   * - Those arguments are passed to the update function
   * - Should be called BEFORE the async backend request
   *
   * HOW IT WORKS (UPVOTE EXAMPLE):
   * -------------------------------
   * 1. votes prop = 10 (real state from Context)
   * 2. optimisticVotes = 10 (initially matches real state)
   * 3. User clicks upvote button
   * 4. We call setVotesOptimistically('up')
   * 5. Update function runs: (10, 'up') => 11
   * 6. optimisticVotes becomes 11 INSTANTLY
   * 7. Component re-renders, shows 11 in UI
   * 8. Backend request is sent
   * 9. ~1 second passes
   * 10. Backend responds with success
   * 11. Context state updates: votes prop becomes 11
   * 12. Form submission completes
   * 13. React discards optimistic state
   * 14. optimisticVotes now comes from votes prop (11)
   * 15. No visible change (optimistic 11 → real 11)
   *
   * WHAT IF BACKEND FAILS?
   * -----------------------
   * 1. votes prop = 10
   * 2. optimisticVotes = 10
   * 3. User clicks upvote
   * 4. setVotesOptimistically('up') called
   * 5. optimisticVotes becomes 11 (optimistic)
   * 6. UI shows 11
   * 7. Backend request sent
   * 8. Backend returns ERROR (status 500)
   * 9. Context state DOESN'T update (votes prop stays 10)
   * 10. Form submission completes (even though it failed)
   * 11. React discards optimistic state
   * 12. optimisticVotes reverts to votes prop (10)
   * 13. UI changes: 11 → 10 (ROLLBACK!)
   *
   * As the instructor demonstrates:
   * "If I do that, you'll see that now when you upload it still updates
   * instantly optimistically, but then it rolls back to the old value.
   * Because again, use optimistic only gives you this temporary value."
   *
   * AUTOMATIC ROLLBACK:
   * -------------------
   * useOptimistic is SMART:
   * - It knows when the form action completes
   * - It automatically discards the optimistic state
   * - It falls back to the real state (votes prop)
   * - If backend failed, real state didn't change, so it rolls back
   * - If backend succeeded, real state matches optimistic, so no visible change
   *
   * IMPORTANT: DESIGNED FOR FORM ACTIONS
   * -------------------------------------
   * As the instructor emphasizes:
   * "It should be called inside of form actions because use optimistic
   * is meant to be used in conjunction with form actions."
   *
   * useOptimistic is specifically designed for this pattern:
   * - You call setVotesOptimistically inside a form action
   * - React tracks which form action it was called from
   * - When that form action completes, optimistic state is discarded
   *
   * This wouldn't work properly with onClick handlers or other event handlers!
   *
   * TEMPORARY STATE LIFETIME:
   * -------------------------
   * As the instructor explains:
   * "The state produced by use optimistic, my optimistic votes in this case,
   * will be a temporary state, you could say, that's only shown on the UI
   * whilst the form that invoked this optimistic function is being submitted.
   * And thereafter this state will be thrown away and the actual UI state
   * that is applied by some other code in your application will become active again."
   *
   * Timeline:
   * - BEFORE form submission: optimisticVotes = votes (real state)
   * - DURING form submission: optimisticVotes = temporary value (optimistic state)
   * - AFTER form submission: optimisticVotes = votes (real state again)
   *
   * The optimistic state is ONLY active during the form submission!
   */
  const [optimisticVotes, setVotesOptimistically] = useOptimistic(
    votes,
    (prevVotes, mode) => {
      return mode === 'up' ? prevVotes + 1 : prevVotes - 1;
    }
  );

  /**
   * ============================================================================
   * FORM ACTION FUNCTION: upvoteAction - WITH OPTIMISTIC UPDATE (LESSON 282)
   * ============================================================================
   *
   * This async function is the "raw" form action that will be wrapped by
   * useActionState to add loading state tracking.
   *
   * LESSON 281 vs LESSON 282:
   * --------------------------
   * LESSON 281 (Previous):
   * - async function upvoteAction() { await upvoteOpinion(id); }
   * - Backend request sent first
   * - UI updates AFTER backend responds (~1 second delay)
   * - Slow feedback
   *
   * LESSON 282 (Current):
   * - async function upvoteAction() {
   *     setVotesOptimistically('up');  ← NEW! Called FIRST
   *     await upvoteOpinion(id);
   *   }
   * - Optimistic update happens FIRST (instant UI update!)
   * - Backend request sent AFTER
   * - UI updates immediately, then confirmed by backend
   * - Fast, responsive UX
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
   *
   * NEW IN LESSON 282: OPTIMISTIC UPDATE
   * =====================================
   * We now call setVotesOptimistically('up') BEFORE the backend request!
   *
   * ORDER OF OPERATIONS:
   * --------------------
   * 1. setVotesOptimistically('up') ← NEW! Instant UI update
   * 2. await upvoteOpinion(id)       ← Backend request (takes ~1 second)
   *
   * WHY THIS ORDER?
   * ---------------
   * We want the UI to update IMMEDIATELY when the user clicks.
   * Then we send the backend request to make it official.
   *
   * WHAT setVotesOptimistically('up') DOES:
   * ----------------------------------------
   * 1. Calls the update function: (prevVotes, 'up') => prevVotes + 1
   * 2. optimisticVotes becomes prevVotes + 1 (instantly!)
   * 3. Component re-renders
   * 4. UI shows the new vote count (no waiting!)
   *
   * The 'up' parameter we pass here becomes the mode parameter
   * in the update function.
   *
   * CLOSURE ACCESS:
   * ---------------
   * This function can access setVotesOptimistically because:
   * - upvoteAction is defined inside the Opinion component
   * - It "closes over" variables from the component scope
   * - setVotesOptimistically is available via closure
   *
   * EXECUTION FLOW (LESSON 282):
   * -----------------------------
   * 1. User clicks upvote button
   * 2. upvoteFormAction is called (wrapped by useActionState)
   * 3. upvotePending becomes true (buttons disable)
   * 4. upvoteAction is called
   * 5. setVotesOptimistically('up') runs ← NEW!
   *    - optimisticVotes: 10 → 11 (instant!)
   *    - Component re-renders
   *    - UI shows 11 immediately
   * 6. await upvoteOpinion(id) runs
   *    - Backend request sent
   *    - ~1 second delay
   *    - Backend responds
   *    - Context state updates: votes prop becomes 11
   * 7. upvoteAction completes
   * 8. Form submission completes
   * 9. React discards optimistic state
   * 10. optimisticVotes now comes from votes prop (11)
   * 11. No visible change (optimistic 11 → real 11)
   * 12. upvotePending becomes false (buttons re-enable)
   *
   * USER EXPERIENCE:
   * ----------------
   * What the user sees:
   * 1. Click upvote
   * 2. Vote count changes INSTANTLY (10 → 11) ⚡
   * 3. Buttons gray out
   * 4. Wait ~1 second
   * 5. Buttons re-enable
   * 6. Vote count stays at 11 (confirmed by backend)
   *
   * MUCH BETTER than Lesson 281 where user had to wait 1 second!
   *
   * WHAT IF BACKEND FAILS?
   * -----------------------
   * If the backend returns an error (e.g., status 500):
   * 1. setVotesOptimistically('up') runs
   * 2. UI shows 11 (optimistic)
   * 3. await upvoteOpinion(id) runs
   * 4. Backend returns error
   * 5. upvoteOpinion returns WITHOUT updating Context
   * 6. votes prop stays at 10 (not updated)
   * 7. Form submission completes
   * 8. React discards optimistic state
   * 9. optimisticVotes reverts to votes prop (10)
   * 10. UI changes: 11 → 10 (ROLLBACK!)
   *
   * As the instructor demonstrates with a simulated error:
   * "If I do that, you'll see that now when you upload it still
   * updates instantly optimistically, but then it rolls back to
   * the old value."
   *
   * This automatic rollback is a key feature of useOptimistic!
   */
  async function upvoteAction(prevState, formData) {
    setVotesOptimistically('up');
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
   *
   * NEW IN LESSON 282: OPTIMISTIC UPDATE
   * =====================================
   * Just like upvoteAction, we now call setVotesOptimistically('down')
   * BEFORE the backend request for instant UI feedback!
   *
   * ORDER OF OPERATIONS:
   * --------------------
   * 1. setVotesOptimistically('down') ← NEW! Instant UI update
   * 2. await downvoteOpinion(id)       ← Backend request (takes ~1 second)
   *
   * WHAT setVotesOptimistically('down') DOES:
   * ------------------------------------------
   * 1. Calls the update function: (prevVotes, 'down') => prevVotes - 1
   * 2. optimisticVotes becomes prevVotes - 1 (instantly!)
   * 3. Component re-renders
   * 4. UI shows the new vote count (decremented)
   *
   * The 'down' parameter we pass here becomes the mode parameter
   * in the update function. The update function checks:
   * - If mode === 'up': return prevVotes + 1
   * - Else (mode === 'down'): return prevVotes - 1
   *
   * SAME PATTERN AS UPVOTE:
   * -----------------------
   * Both upvoteAction and downvoteAction follow the identical pattern:
   * 1. Call setVotesOptimistically with mode ('up' or 'down')
   * 2. UI updates instantly
   * 3. Send backend request with await
   * 4. Backend confirms
   * 5. Optimistic state discarded, real state takes over
   *
   * USER EXPERIENCE:
   * ----------------
   * What the user sees:
   * 1. Click downvote
   * 2. Vote count changes INSTANTLY (10 → 9) ⚡
   * 3. Buttons gray out
   * 4. Wait ~1 second
   * 5. Buttons re-enable
   * 6. Vote count stays at 9 (confirmed by backend)
   *
   * PERFECT UX! No waiting for backend to see the result.
   */
  async function downvoteAction(prevState, formData) {
    setVotesOptimistically('down');
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

        {/*
          VOTE COUNT DISPLAY - USING OPTIMISTIC STATE (LESSON 282)
          =========================================================
          This is where we display the vote count to the user.

          LESSON 281 vs LESSON 282:
          --------------------------
          LESSON 281: <span>{votes}</span>
          - Displayed the REAL votes from props
          - Only updated AFTER backend confirmed the vote
          - User had to wait ~1 second to see change
          - Slow feedback

          LESSON 282: <span>{optimisticVotes}</span>
          - Displays the OPTIMISTIC votes from useOptimistic
          - Updates INSTANTLY when user clicks
          - Shows temporary value during submission
          - Reverts to real value when backend responds
          - Fast feedback!

          WHY THIS CHANGE IS CRITICAL:
          -----------------------------
          This is the KEY to making optimistic updates work!

          optimisticVotes behaves differently based on form submission state:

          BEFORE VOTING:
          - optimisticVotes = votes (matches real prop)
          - Shows the actual vote count from database

          DURING VOTING (form submission in progress):
          - optimisticVotes = temporary optimistic value
          - Shows the PREDICTED vote count (real count + 1 or - 1)
          - User sees instant feedback

          AFTER VOTING (form submission complete):
          - optimisticVotes = votes (back to real prop)
          - If SUCCESS: real count matches optimistic (no visible change)
          - If FAILURE: real count different from optimistic (rollback!)

          EXAMPLE FLOW (SUCCESSFUL UPVOTE):
          ----------------------------------
          1. votes = 10, optimisticVotes = 10
          2. UI shows: <span>{10}</span>
          3. User clicks upvote
          4. setVotesOptimistically('up') called
          5. optimisticVotes becomes 11 (votes still 10)
          6. UI instantly shows: <span>{11}</span> ← Instant feedback!
          7. Backend request sent
          8. ~1 second delay
          9. Backend responds with success
          10. Context updates: votes becomes 11
          11. Form submission completes
          12. React discards optimistic state
          13. optimisticVotes now uses votes (11)
          14. UI shows: <span>{11}</span> ← Same value, seamless!

          EXAMPLE FLOW (FAILED UPVOTE):
          ------------------------------
          1. votes = 10, optimisticVotes = 10
          2. UI shows: <span>{10}</span>
          3. User clicks upvote
          4. setVotesOptimistically('up') called
          5. optimisticVotes becomes 11 (votes still 10)
          6. UI instantly shows: <span>{11}</span> ← Optimistic!
          7. Backend request sent
          8. Backend returns ERROR (500)
          9. Context DOESN'T update: votes stays 10
          10. Form submission completes
          11. React discards optimistic state
          12. optimisticVotes reverts to votes (10)
          13. UI shows: <span>{10}</span> ← Rollback!

          As the instructor says:
          "If I do that, you'll see that now when you upload it still
          updates instantly optimistically, but then it rolls back to
          the old value. Because again, use optimistic only gives you
          this temporary value."

          THE MAGIC OF useOptimistic:
          ---------------------------
          By simply changing {votes} to {optimisticVotes}, we get:
          ✓ Instant UI updates (user sees change immediately)
          ✓ Automatic rollback on errors (no manual error handling needed)
          ✓ Seamless success (optimistic → real with no flicker)
          ✓ Perfect UX (feels fast and responsive)

          This is React 19's optimistic updates in action!

          IMPORTANT:
          ----------
          We MUST use optimisticVotes here, not votes.
          If we used votes, we wouldn't see the optimistic update!
          The whole point is to display the temporary optimistic state.
        */}
        <span>{optimisticVotes}</span>

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
 * LESSON 283: COMPLETE FORM ACTIONS SUMMARY - EVERYTHING WE'VE LEARNED
 * ============================================================================
 *
 * "And that's now it for form actions. These are the core form actions
 * related features React offers." - Maximilian Schwarzmüller
 *
 * ============================================================================
 * THE COMPLETE FORM ACTIONS TOOLKIT (React 19)
 * ============================================================================
 *
 * 1. FORM ACTIONS - THE FOUNDATION
 * =================================
 * "The key takeaway they offer is that you can define functions which you
 * can pass as values for the action prop to form elements, or as you learned
 * to buttons, and there the formAction prop."
 *
 * TWO WAYS TO USE FORM ACTIONS:
 *
 * Option A: On the <form> element (all buttons use this action)
 * -------------------------------------------------------------
 * <form action={handleSubmit}>
 *   <input name="email" />
 *   <button type="submit">Submit</button>
 * </form>
 *
 * Option B: On individual <button> elements (different actions per button)
 * -------------------------------------------------------------------------
 * <form>
 *   <button formAction={upvoteAction}>↑</button>   ← Uses upvoteAction
 *   <button formAction={downvoteAction}>↓</button> ← Uses downvoteAction
 * </form>
 *
 * This component uses Option B - multiple buttons with different formActions!
 *
 * 2. AUTOMATIC FORM DATA COLLECTION
 * ==================================
 * "React will then make sure that these action functions are invoked and it
 * will give you the form data automatically. So it will automatically collect
 * all the input values and give you such a form data object."
 *
 * function handleSubmit(formData) {
 *   const email = formData.get('email');     // Automatic!
 *   const password = formData.get('password'); // No manual extraction!
 * }
 *
 * React collects ALL input values automatically:
 * - <input name="field" /> → formData.get('field')
 * - <textarea name="message" /> → formData.get('message')
 * - <select name="choice" /> → formData.get('choice')
 *
 * No need for:
 * ✗ useState for every input
 * ✗ onChange handlers for every input
 * ✗ ref.current.value for extraction
 *
 * 3. AUTOMATIC FORM RESET (AND THE PROBLEM IT CREATES)
 * =====================================================
 * "It will also automatically reset the form, which can be a problem."
 *
 * WHAT HAPPENS:
 * - After form action completes, React resets all inputs to empty
 * - This is usually what you want (success state)
 * - But if there's an ERROR, the user loses their input!
 *
 * EXAMPLE PROBLEM:
 * 1. User fills out a long form
 * 2. Submits → validation error (e.g., "email already exists")
 * 3. Form resets → all user input GONE!
 * 4. User has to retype everything
 * 5. Very frustrating UX!
 *
 * THE SOLUTION: useActionState
 * ----------------------------
 * "That's why you also might want to use useActionState so that your form
 * action can return a value, any value of your choice. Can be an object,
 * as is the case here, but doesn't have to be."
 *
 * Return the entered values from your action:
 * async function submitAction(prevState, formData) {
 *   const email = formData.get('email');
 *   const result = await submitToBackend(email);
 *   if (!result.success) {
 *     return { error: result.message, enteredEmail: email };  // ← Return input!
 *   }
 * }
 *
 * Then pre-populate inputs with returned values:
 * <input name="email" defaultValue={formState?.enteredEmail} />
 *
 * 4. useActionState - STATE MANAGEMENT FOR FORM ACTIONS
 * ======================================================
 * "You can use that form state to update the UI to show some error messages,
 * for example, but also to pre-populate, or repopulate those input fields
 * with the values entered by the user."
 *
 * const [formState, formAction, isPending] = useActionState(action, initialState);
 *
 * WHAT IT PROVIDES:
 * - formState: Value returned by your action function
 * - formAction: Wrapped version of your action (use this on form/button)
 * - isPending: Boolean - true while action is running
 *
 * USE CASES:
 * ✓ Show error messages: {formState?.error && <p>{formState.error}</p>}
 * ✓ Pre-populate inputs: <input defaultValue={formState?.email} />
 * ✓ Disable buttons: <button disabled={isPending}>Submit</button>
 * ✓ Show loading states: {isPending && <Spinner />}
 *
 * 5. FORM ACTIONS CAN DO ANYTHING
 * ================================
 * "You can do anything you want in your form actions. You can store the code
 * in local storage if you want to do that. But you can also, of course, use
 * context or directly send a request from inside the form action if you want
 * to, to send the data to a backend."
 *
 * EXAMPLES OF WHAT YOU CAN DO:
 *
 * Store in localStorage:
 * function saveAction(formData) {
 *   localStorage.setItem('draft', JSON.stringify({
 *     title: formData.get('title'),
 *     content: formData.get('content')
 *   }));
 * }
 *
 * Use Context:
 * function addAction(formData) {
 *   addOpinion({                            // ← Context function
 *     title: formData.get('title'),
 *     body: formData.get('body')
 *   });
 * }
 *
 * Send to backend:
 * async function submitAction(formData) {
 *   const response = await fetch('/api/submit', {
 *     method: 'POST',
 *     body: formData
 *   });
 *   return await response.json();
 * }
 *
 * 6. ASYNC FORM ACTIONS
 * ======================
 * "Form actions can be async. They don't have to be, as you also saw in
 * this section, but they can be."
 *
 * SYNC ACTION (no waiting):
 * function simpleAction(formData) {
 *   console.log(formData.get('name'));
 *   // Completes immediately
 * }
 *
 * ASYNC ACTION (with waiting):
 * async function backendAction(formData) {
 *   const response = await fetch('/api/save', {  // ← Network request
 *     method: 'POST',
 *     body: formData
 *   });
 *   return await response.json();  // ← Wait for response
 * }
 *
 * WHY ASYNC MATTERS:
 * - Most real-world forms send data to a backend
 * - Backend requests take time (network latency)
 * - async/await lets you wait for the response
 * - React tracks when async actions complete
 *
 * 7. useFormStatus - LOADING STATES DURING SUBMISSION
 * ====================================================
 * "If they are async and if they potentially take a bit longer, you got
 * additional hooks like useFormStatus, which you can use to update the UI
 * whilst the form is being submitted."
 *
 * // In a child component (must be INSIDE the <form>)
 * import { useFormStatus } from 'react-dom';
 *
 * function SubmitButton() {
 *   const { pending, data, method, action } = useFormStatus();
 *
 *   return (
 *     <button disabled={pending}>
 *       {pending ? 'Submitting...' : 'Submit'}
 *     </button>
 *   );
 * }
 *
 * WHAT useFormStatus PROVIDES:
 * - pending: Boolean - true while form is submitting
 * - data: FormData object being submitted
 * - method: HTTP method (GET/POST)
 * - action: The action function being called
 *
 * IMPORTANT RULE:
 * useFormStatus must be used in a component that is RENDERED INSIDE <form>.
 * It won't work if the component is the form itself!
 *
 * 8. useOptimistic - INSTANT UI FEEDBACK
 * =======================================
 * "You got useOptimistic to perform optimistic updates. So to set some
 * temporary state, some temporary value, which will automatically be thrown
 * away once the form submission is over, so once the action function is done."
 *
 * const [optimisticValue, setOptimistic] = useOptimistic(
 *   actualValue,           // Real state from props/context
 *   (prev, newValue) => {  // Update function
 *     return newValue;     // Return new optimistic value
 *   }
 * );
 *
 * HOW IT WORKS:
 * 1. Display optimisticValue in UI (not actualValue)
 * 2. Call setOptimistic() in form action BEFORE backend request
 * 3. UI updates INSTANTLY (no waiting for backend!)
 * 4. Backend request processes in background
 * 5. When complete, optimistic state is discarded
 * 6. actualValue takes over (success = same value, failure = rollback)
 *
 * THIS COMPONENT'S IMPLEMENTATION:
 * const [optimisticVotes, setVotesOptimistically] = useOptimistic(
 *   votes,
 *   (prev, mode) => mode === 'up' ? prev + 1 : prev - 1
 * );
 *
 * async function upvoteAction() {
 *   setVotesOptimistically('up');  // ← Instant UI update!
 *   await upvoteOpinion(id);       // ← Backend request (slow)
 * }
 *
 * <span>{optimisticVotes}</span>   // ← Shows instant feedback
 *
 * 9. FORM ACTIONS ARE OPTIONAL!
 * ==============================
 * "Now when it comes to handling form submissions, it's therefore, of course,
 * is up to you whether you want to use form actions or whether you want to
 * handle submissions manually with help of the onSubmit prop and by preventing
 * the default and by using all these things you learned in the previous course
 * section, because that's also absolutely valid. You don't have to use form
 * actions, but of course, you can."
 *
 * OPTION A: FORM ACTIONS (New React 19 approach)
 * -----------------------------------------------
 * <form action={handleSubmit}>
 *   <input name="email" />
 *   <button>Submit</button>
 * </form>
 *
 * function handleSubmit(formData) {
 *   const email = formData.get('email');
 *   // Submit to backend...
 * }
 *
 * Pros:
 * ✓ Automatic form data collection
 * ✓ Works with useActionState, useFormStatus, useOptimistic
 * ✓ Progressive enhancement (works without JS)
 * ✓ Built-in pending state tracking
 * ✓ Cleaner code for simple forms
 *
 * OPTION B: MANUAL onSubmit (Traditional approach)
 * -------------------------------------------------
 * <form onSubmit={handleSubmit}>
 *   <input value={email} onChange={(e) => setEmail(e.target.value)} />
 *   <button>Submit</button>
 * </form>
 *
 * function handleSubmit(event) {
 *   event.preventDefault();
 *   // Use email state directly...
 * }
 *
 * Pros:
 * ✓ Full control over form behavior
 * ✓ Real-time validation as user types
 * ✓ Complex validation logic
 * ✓ Conditional field rendering based on input
 * ✓ Integration with third-party form libraries
 *
 * WHEN TO USE EACH:
 * -----------------
 * Use FORM ACTIONS when:
 * - Form is straightforward (collect and submit)
 * - You want automatic form data handling
 * - You need loading states during submission
 * - You want optimistic updates
 * - Progressive enhancement matters
 *
 * Use MANUAL onSubmit when:
 * - Complex real-time validation needed
 * - Form fields depend on each other
 * - Integration with form libraries (Formik, React Hook Form)
 * - Full control over submission timing
 * - Complex multi-step forms
 *
 * BOTH ARE VALID! Choose based on your needs.
 *
 * ============================================================================
 * COMPLETE SECTION PROGRESSION (LESSONS 273-283)
 * ============================================================================
 *
 * This section taught form actions from the ground up:
 *
 * LESSON 273-278: NewOpinion Component
 * ------------------------------------
 * - Basic form action setup with action prop
 * - Automatic form data collection
 * - useActionState for state management
 * - Form validation and error handling
 * - useFormStatus for loading states
 * - Submit button component pattern
 *
 * LESSON 279: Opinion Component - Multiple Form Actions
 * ------------------------------------------------------
 * - formAction prop on individual buttons
 * - Two separate actions: upvoteAction, downvoteAction
 * - Different buttons trigger different actions
 *
 * LESSON 280: Backend Integration
 * --------------------------------
 * - Made form actions async
 * - Added await for backend requests
 * - Connected to Context for state management
 *
 * LESSON 281: Preventing Double-Voting
 * -------------------------------------
 * - useActionState for pending state
 * - Disabled buttons during submission
 * - Prevented rapid clicking issues
 *
 * LESSON 282: Optimistic Updates
 * -------------------------------
 * - useOptimistic for instant feedback
 * - Temporary state during submission
 * - Automatic rollback on errors
 *
 * LESSON 283: Summary (THIS LESSON)
 * ----------------------------------
 * - Complete recap of all concepts
 * - When to use form actions vs onSubmit
 * - The full form actions toolkit
 *
 * ============================================================================
 * WHAT THIS COMPONENT DEMONSTRATES (COMPLETE FEATURE SET)
 * ============================================================================
 *
 * This Opinion component showcases the FULL form actions toolkit:
 *
 * 1. MULTIPLE FORM ACTIONS (formAction prop):
 *    <button formAction={upvoteFormAction}>↑</button>
 *    <button formAction={downvoteFormAction}>↓</button>
 *
 * 2. ASYNC BACKEND INTEGRATION:
 *    async function upvoteAction() {
 *      await upvoteOpinion(id);  // HTTP POST to backend
 *    }
 *
 * 3. LOADING STATE MANAGEMENT (useActionState):
 *    const [state, action, isPending] = useActionState(upvoteAction, null);
 *    <button disabled={isPending}>
 *
 * 4. OPTIMISTIC UPDATES (useOptimistic):
 *    const [optimisticVotes, setOptimistic] = useOptimistic(votes, updateFn);
 *    setOptimistic('up');  // Instant UI update!
 *    <span>{optimisticVotes}</span>
 *
 * 5. CONTEXT INTEGRATION (use hook):
 *    const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);
 *
 * Together, these provide:
 * ✓ Instant UI feedback (useOptimistic)
 * ✓ Prevented double-voting (useActionState + disabled)
 * ✓ Backend synchronization (async actions)
 * ✓ Automatic error handling (rollback on failure)
 * ✓ Professional UX (same patterns as Reddit, Twitter, etc.)
 *
 * ============================================================================
 * FINAL THOUGHTS FROM THE INSTRUCTOR
 * ============================================================================
 *
 * "You can use all these features thanks to this form actions feature that's
 * built into React."
 *
 * "When it comes to handling form submissions, it's therefore, of course,
 * is up to you whether you want to use form actions or whether you want to
 * handle submissions manually with help of the onSubmit prop and by preventing
 * the default and by using all these things you learned in the previous course
 * section, because that's also absolutely valid."
 *
 * "You don't have to use form actions, but of course, you can."
 *
 * THE KEY TAKEAWAYS:
 * ==================
 * 1. Form actions are POWERFUL but OPTIONAL
 * 2. They work great with useActionState, useFormStatus, and useOptimistic
 * 3. They automatically handle form data collection
 * 4. They can be async for backend integration
 * 5. You can have multiple actions per form (with formAction on buttons)
 * 6. Traditional onSubmit is still valid - choose based on your needs!
 *
 * This concludes the Form Actions section of the course.
 * You now have all the tools to build production-ready forms in React 19!
 */
