/**
 * ============================================================================
 * LESSON 282: OPTIMISTIC UPDATES WITH useOptimistic - INSTANT UI FEEDBACK
 * ============================================================================
 *
 * This component demonstrates how to add optimistic updates for instant UI feedback
 * using React 19's useOptimistic hook in combination with form actions.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Using useOptimistic hook for instant UI updates
 * 2. Understanding optimistic vs confirm-then-update patterns
 * 3. Temporary state management during form submission
 * 4. Automatic rollback on backend errors
 * 5. Combining useOptimistic with useActionState for best UX
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
 * SUMMARY & KEY CONCEPTS - LESSON 282: useOptimistic for Instant UI Updates
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. useOptimistic HOOK: React 19's hook for optimistic updates - instant UI
 *    feedback before backend confirms the change. Game-changer for UX!
 *
 * 2. OPTIMISTIC STATE: useOptimistic manages TEMPORARY state that's shown
 *    ONLY during form submission. Automatically discarded when submission completes.
 *
 * 3. INSTANT FEEDBACK: User sees changes IMMEDIATELY (no waiting for backend).
 *    Vote count updates the moment they click, not 1 second later.
 *
 * 4. AUTOMATIC ROLLBACK: If backend fails, optimistic state is discarded and
 *    UI reverts to real state. No manual error handling needed!
 *
 * 5. SEAMLESS SUCCESS: If backend succeeds, optimistic state matches real state.
 *    No flicker or visible transition when switching from optimistic → real.
 *
 * 6. FORM ACTION INTEGRATION: useOptimistic is designed specifically for
 *    form actions. Call setOptimisticState() inside form actions BEFORE async work.
 *
 * 7. COMBINING HOOKS: We use BOTH useOptimistic (instant feedback) AND
 *    useActionState (prevent double-voting) together for perfect UX!
 *
 * LESSONS 279-282 PROGRESSION:
 * =============================
 * LESSON 279: Set up multiple form actions with formAction on buttons
 * LESSON 280: Made actions async and added backend integration
 * LESSON 281: Added loading states with useActionState to prevent double-voting
 * LESSON 282: Added optimistic updates with useOptimistic for instant feedback
 *
 * THE useOptimistic PATTERN (NEW IN LESSON 282):
 * ================================================
 * COMPLETE IMPLEMENTATION WITH INSTANT UI UPDATES:
 *
 * // 1. Set up optimistic state
 * const [optimisticVotes, setVotesOptimistically] = useOptimistic(
 *   votes,                              // Real state from props
 *   (prevVotes, mode) => {              // Update function
 *     return mode === 'up' ? prevVotes + 1 : prevVotes - 1;
 *   }
 * );
 *
 * // 2. Call setVotesOptimistically in form action BEFORE backend request
 * async function upvoteAction(prevState, formData) {
 *   setVotesOptimistically('up');      // ← Instant UI update!
 *   await upvoteOpinion(id);           // ← Backend request (slow)
 * }
 *
 * // 3. Wrap with useActionState (for disabled buttons)
 * const [_, upvoteFormAction, upvotePending] =
 *   useActionState(upvoteAction, null);
 *
 * // 4. Display optimistic state in UI
 * <form>
 *   <button
 *     formAction={upvoteFormAction}
 *     disabled={upvotePending || downvotePending}
 *   >
 *     ↑
 *   </button>
 *   <span>{optimisticVotes}</span>     // ← Shows optimistic value!
 * </form>
 *
 * This pattern gives you INSTANT feedback + automatic rollback on errors!
 *
 * USE CASES FOR useOptimistic:
 * =============================
 * This pattern is perfect for ANY user action that:
 * - Has a predictable outcome
 * - Can be shown immediately
 * - Needs backend confirmation
 * - Should rollback on errors
 *
 * 1. VOTING SYSTEMS (our use case):
 *    - Show vote count change instantly
 *    - User doesn't wait for server
 *    - Rollback if vote fails
 *    - Examples: Reddit, Stack Overflow, Product Hunt
 *
 * 2. LIKE/FAVORITE BUTTONS:
 *    - Heart icon fills immediately
 *    - Like count increments instantly
 *    - Rollback if server rejects
 *    - Examples: Twitter likes, Instagram hearts
 *
 * 3. TODO LIST ACTIONS:
 *    - Mark task complete instantly (strikethrough)
 *    - Delete task immediately (fade out)
 *    - Rollback if backend fails
 *    - Better UX than waiting for confirmation
 *
 * 4. SOCIAL INTERACTIONS:
 *    - Follow/unfollow users (instant button state change)
 *    - Block/unblock (instant UI update)
 *    - Mute/unmute (instant feedback)
 *
 * 5. SHOPPING CART:
 *    - Add to cart (instant cart count update)
 *    - Remove from cart (instant removal)
 *    - Update quantity (instant number change)
 *
 * 6. STATUS CHANGES:
 *    - Mark as read/unread
 *    - Archive/unarchive
 *    - Flag/unflag
 *    - Any toggleable state
 *
 * WHEN NOT TO USE useOptimistic:
 * ===============================
 * Don't use optimistic updates when:
 * ✗ Outcome is unpredictable (e.g., payment processing - might fail)
 * ✗ Error state is complex (can't easily rollback)
 * ✗ User needs to wait for validation (e.g., password strength check)
 * ✗ Backend response changes the data significantly
 *
 * In those cases, stick with confirm-then-update (Lesson 280 pattern).
 *
 * COMPARISON: OPTIMISTIC UPDATES vs CONFIRM-THEN-UPDATE:
 * ========================================================
 *
 * CONFIRM-THEN-UPDATE (Lesson 280-281):
 * --------------------------------------
 * async function upvoteAction(prevState, formData) {
 *   await upvoteOpinion(id);  // Backend first
 *   // UI updates when Context state changes
 * }
 *
 * <span>{votes}</span>  // Shows real state from props
 *
 * Timeline:
 * 1. User clicks upvote
 * 2. Buttons disable
 * 3. Backend request sent
 * 4. User waits ~1 second ⏳
 * 5. Backend responds
 * 6. Context updates
 * 7. UI updates (vote count changes)
 * 8. Buttons re-enable
 *
 * Pros:
 * ✓ UI always shows confirmed data
 * ✓ No rollback needed (backend validates first)
 * ✓ Simpler mental model
 *
 * Cons:
 * ✗ User has to wait for backend
 * ✗ Feels slow/unresponsive
 * ✗ Poor UX for predictable actions
 *
 * OPTIMISTIC UPDATES (Lesson 282):
 * ---------------------------------
 * const [optimisticVotes, setVotesOptimistically] = useOptimistic(
 *   votes,
 *   (prev, mode) => mode === 'up' ? prev + 1 : prev - 1
 * );
 *
 * async function upvoteAction(prevState, formData) {
 *   setVotesOptimistically('up');  // UI first!
 *   await upvoteOpinion(id);       // Backend second
 * }
 *
 * <span>{optimisticVotes}</span>  // Shows optimistic state
 *
 * Timeline:
 * 1. User clicks upvote
 * 2. UI updates INSTANTLY (vote count changes) ⚡
 * 3. Buttons disable
 * 4. Backend request sent
 * 5. User sees result immediately (doesn't wait)
 * 6. Backend responds
 * 7. Optimistic state discarded
 * 8. Real state takes over (same value, seamless)
 * 9. Buttons re-enable
 *
 * Pros:
 * ✓ INSTANT feedback (no waiting)
 * ✓ Feels fast and responsive
 * ✓ Automatic rollback on errors
 * ✓ Seamless success (no flicker)
 * ✓ Better UX for predictable actions
 *
 * Cons:
 * ✗ UI briefly shows unconfirmed data
 * ✗ Rollback visible if backend fails
 * ✗ Slightly more complex (two states)
 *
 * WHEN TO USE EACH:
 * -----------------
 * Use OPTIMISTIC UPDATES when:
 * ✓ Action outcome is predictable
 * ✓ User expects instant feedback
 * ✓ Backend rarely fails
 * ✓ Rollback is acceptable
 * Examples: voting, liking, following
 *
 * Use CONFIRM-THEN-UPDATE when:
 * ✓ Action outcome is unpredictable
 * ✓ Backend validation is critical
 * ✓ Errors are common
 * ✓ Rollback would be confusing
 * Examples: payments, complex forms, file uploads
 *
 * EXECUTION FLOW (LESSON 282 - WITH OPTIMISTIC UPDATES):
 * =======================================================
 * 1. User clicks upvote button
 * 2. React sees formAction={upvoteFormAction} (wrapped by useActionState)
 * 3. React prevents default form submission
 * 4. React calls upvoteFormAction
 * 5. upvotePending becomes true (buttons disable)
 * 6. upvoteFormAction calls upvoteAction
 * 7. setVotesOptimistically('up') is called ← NEW IN LESSON 282!
 * 8. Update function runs: (10, 'up') => 11
 * 9. optimisticVotes becomes 11 INSTANTLY
 * 10. Component re-renders (vote count changes from 10 → 11) ⚡
 * 11. User sees new count IMMEDIATELY (no waiting!)
 * 12. await upvoteOpinion(id) runs
 * 13. Backend request is sent
 * 14. ~1 second delay (backend processing)
 * 15. Backend responds with success
 * 16. Context updates: votes prop becomes 11
 * 17. upvoteAction completes
 * 18. Form submission completes
 * 19. React discards optimistic state
 * 20. optimisticVotes now uses votes prop (11)
 * 21. No visible UI change (optimistic 11 → real 11, seamless!)
 * 22. upvotePending becomes false (buttons re-enable)
 * 23. User can vote again!
 *
 * KEY DIFFERENCES FROM LESSON 281:
 * =================================
 * Steps 7-11 are NEW in Lesson 282:
 * - setVotesOptimistically('up') called BEFORE backend request
 * - optimisticVotes updates instantly
 * - Component re-renders immediately
 * - User sees vote count change right away (no 1 second wait!)
 * - Backend request happens AFTER UI update
 *
 * Steps 19-21 are also NEW:
 * - React automatically discards optimistic state when form completes
 * - Real state (votes prop) takes over
 * - If backend succeeded: no visible change (optimistic matched real)
 * - If backend failed: visible rollback (optimistic reverts to old real)
 *
 * LESSON 281: User waits 1 second to see change
 * LESSON 282: User sees change INSTANTLY (0ms wait!)
 *
 * This is the power of optimistic updates!
 *
 * CODE ORGANIZATION (LESSON 282):
 * ================================
 * Notice how we structured this component:
 *
 * 1. Imports (React hooks: use, useActionState, useOptimistic; Context)
 * 2. Component function
 *    a. Context consumption (use hook)
 *    b. useOptimistic hook (optimistic vote management)
 *    c. Form action functions (upvoteAction, downvoteAction)
 *       - Each calls setVotesOptimistically BEFORE backend request
 *    d. useActionState hooks (wrapping both actions for pending state)
 *    e. Render (JSX with wrapped actions, disabled prop, optimisticVotes)
 *
 * This organization:
 * ✓ Follows React conventions
 * ✓ Keeps related code together
 * ✓ All hooks are called at the top level (before form actions)
 * ✓ Form actions defined before being wrapped
 * ✓ Optimistic state set up before being used
 * ✓ Easy to understand flow
 * ✓ Easy to test (mock Context and hooks)
 * ✓ Clear separation: optimistic state → actions → wrapped actions → UI
 *
 * TESTING APPROACH (LESSON 282):
 * ===============================
 * How to test this component with useOptimistic:
 *
 * 1. UNIT TESTS:
 *    - Mock OpinionsContext
 *    - Mock use(), useActionState, and useOptimistic hooks
 *    - Render component
 *    - Simulate button clicks
 *    - Assert optimistic state updates immediately
 *    - Assert backend function called after optimistic update
 *
 * 2. INTEGRATION TESTS:
 *    - Render with real Context
 *    - Click upvote button
 *    - Assert vote count increases IMMEDIATELY (optimistic)
 *    - Assert both buttons become disabled
 *    - Wait for action to complete
 *    - Assert vote count stays the same (confirmed by backend)
 *    - Assert buttons re-enable
 *    - Test backend failure: vote count should rollback
 *
 * 3. MANUAL TESTING (Lesson 282):
 *    - Open the app in browser
 *    - Click upvote → vote count changes INSTANTLY ⚡
 *    - Buttons also gray out immediately
 *    - Wait ~1 second → buttons re-enable
 *    - Vote count stays at new value (confirmed)
 *    - Try rapid clicking → only first click works (buttons disabled)
 *    - Simulate backend error (see instructor's demo):
 *      * Vote count changes instantly (optimistic)
 *      * Then rolls back to old value (automatic error handling!)
 *    - Verifies useOptimistic provides instant feedback + rollback
 *
 * COMPLETED IN LESSONS 279-282:
 * ==============================
 * ✓ LESSON 279: Set up multiple form actions with formAction on buttons
 * ✓ LESSON 280: Made actions async and added backend integration
 * ✓ LESSON 281: Added loading states with useActionState to prevent double-voting
 * ✓ LESSON 282: Added optimistic updates with useOptimistic for instant feedback
 *
 * WHAT WE'VE ACCOMPLISHED:
 * ========================
 * ✓ Multiple form actions (upvote and downvote)
 * ✓ Async backend integration (HTTP POST requests)
 * ✓ Optimistic updates (instant UI feedback with useOptimistic)
 * ✓ Automatic rollback on errors (useOptimistic handles failures)
 * ✓ Loading state tracking (useActionState)
 * ✓ Disabled buttons during voting (prevents double-voting)
 * ✓ Perfect UX: INSTANT feedback + prevented double-voting + error handling
 * ✓ Clean, maintainable code structure
 * ✓ Production-ready voting system!
 *
 * POTENTIAL FUTURE ENHANCEMENTS:
 * ===============================
 * We've now implemented a production-ready voting system!
 * If we wanted to extend it even further, we could add:
 *
 * 1. ERROR MESSAGES WITH UI FEEDBACK:
 *    - Show toast/alert when vote fails (beyond just rollback)
 *    - Display specific error message to user
 *    - Retry button for failed votes
 *    - "Something went wrong" notification
 *
 * 2. VISUAL LOADING INDICATORS:
 *    - Spinner icons on buttons during voting
 *    - "Voting..." text instead of icons
 *    - Progress bar or pulse animation
 *    - Skeleton loading states
 *
 * 3. ENHANCED ACCESSIBILITY:
 *    - aria-label on buttons ("Upvote this opinion by UserName")
 *    - aria-live region to announce vote changes to screen readers
 *    - Keyboard shortcuts for voting (e.g., ↑ for upvote, ↓ for downvote)
 *    - Focus management after voting
 *
 * 4. SMOOTH ANIMATIONS:
 *    - Animate vote count changes (count up/down with spring animation)
 *    - Button press feedback (scale, color change, ripple effect)
 *    - Success animations when vote confirms
 *    - Rollback animation when backend fails
 *
 * 5. VOTE HISTORY & PERSISTENCE:
 *    - Remember which opinions user has voted on
 *    - Highlight voted opinions (different color)
 *    - Allow undo/change vote
 *    - Sync across devices
 *
 * 6. RATE LIMITING:
 *    - Limit how many votes per minute
 *    - Show cooldown timer
 *    - Prevent spam voting
 *
 * But the current implementation is already excellent!
 *
 * REAL-WORLD APPLICATIONS:
 * ========================
 * The patterns we implemented (useOptimistic + useActionState + formAction)
 * are used in many real production apps:
 *
 * - Reddit: Upvote/downvote with INSTANT feedback + disabled buttons
 *   * Vote count changes immediately (optimistic)
 *   * Button grays out to prevent spam
 *   * Rollback if backend fails
 *
 * - Twitter/X: Like button with instant feedback
 *   * Heart icon fills immediately (optimistic)
 *   * Like count increments instantly
 *   * Rollback if server rejects
 *
 * - Stack Overflow: Vote buttons with instant + disabled state
 *   * Vote count changes right away
 *   * Buttons disable during request
 *   * Seamless UX
 *
 * - YouTube: Like/dislike with instant visual feedback
 *   * Thumbs up fills immediately
 *   * Count updates instantly
 *   * Professional UX
 *
 * - Product Hunt: Upvote buttons with optimistic updates
 *   * Vote count jumps immediately
 *   * Button disables temporarily
 *   * Feels snappy and responsive
 *
 * - LinkedIn: Post reactions (like, celebrate, etc.)
 *   * Icon changes instantly
 *   * Count updates immediately
 *   * Button disabled briefly
 *
 * The patterns we learned (useOptimistic + useActionState + Form Actions) are:
 * ✓ Production-ready (used by major apps)
 * ✓ Scalable (works with millions of users)
 * ✓ User-friendly (instant feedback)
 * ✓ Error-resilient (automatic rollback)
 * ✓ Industry standard (best practices)
 * ✓ React 19 best practices (newest features)
 *
 * This is EXACTLY how modern React apps should handle user interactions!
 *
 * LESSON 282 TAUGHT US:
 * =====================
 * As the instructor emphasized:
 * "This here is a great example for a place in the user interface
 * where optimistic updating might be a good idea. Because when I
 * press this button, we have to wait for a second until this vote
 * number goes up. Now that's not horrible of course, but we can
 * do better."
 *
 * And we did! With useOptimistic, we achieved:
 * ✓ Instant UI updates (no waiting)
 * ✓ Automatic error handling (rollback on failure)
 * ✓ Seamless success (no flicker)
 * ✓ Better UX (feels fast and responsive)
 *
 * This is the power of React 19's useOptimistic hook!
 */
