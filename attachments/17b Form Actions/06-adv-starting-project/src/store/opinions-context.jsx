/**
 * ============================================================================
 * LESSON 280: BACKEND INTEGRATION FOR VOTING - ASYNC VOTE OPERATIONS
 * ============================================================================
 *
 * This file implements the Context API for managing opinions data and handling
 * all backend communication. This is the "brain" of our application - it's
 * where all the data fetching, state management, and backend operations happen.
 *
 * WHAT'S NEW IN LESSON 280:
 * ==========================
 * We've upgraded the voting functions (upvoteOpinion and downvoteOpinion) to:
 * ✓ Send HTTP requests to the backend API
 * ✓ Use async/await for asynchronous operations
 * ✓ Only update local state if backend request succeeds
 * ✓ Persist votes to the database
 *
 * This replaces the previous "optimistic update" pattern (client-side only)
 * with a "confirm-then-update" pattern (wait for backend confirmation).
 *
 * WHY USE CONTEXT HERE?
 * =====================
 * In this application, multiple components need access to:
 * 1. The list of opinions (for displaying them)
 * 2. Functions to add new opinions
 * 3. Functions to upvote/downvote opinions
 *
 * Without Context, we would have to:
 * - Store all this state in App.jsx
 * - Pass it down through multiple component levels (prop drilling)
 * - Make App.jsx responsible for all backend communication
 * - Mix UI logic with data logic
 *
 * With Context, we can:
 * - Centralize all data management in one place
 * - Let any component access the data without prop drilling
 * - Separate concerns (UI vs data management)
 * - Make components easier to test and maintain
 *
 * CONTEXT API PATTERN:
 * ====================
 * When using Context, we typically create TWO exports:
 * 1. The Context itself (OpinionsContext) - for consuming the data
 * 2. A Provider component (OpinionsContextProvider) - for managing the data
 *
 * This pattern keeps our code organized and makes it clear where state
 * management happens (Provider) vs where it's consumed (Context).
 *
 * BACKEND COMMUNICATION:
 * ======================
 * This file handles all HTTP requests to the backend server:
 * - GET /opinions - Fetch all opinions (on initial load)
 * - POST /opinions - Create a new opinion
 * - POST /opinions/:id/upvote - Upvote an opinion (NEW!)
 * - POST /opinions/:id/downvote - Downvote an opinion (NEW!)
 *
 * The backend server:
 * - Runs on http://localhost:3000
 * - Is a Node.js/Express server with a db.json file
 * - Provides REST API endpoints
 * - Stores opinions persistently
 * - Has an artificial 1-second delay to simulate network latency
 */

import { createContext, useEffect, useState } from 'react';

/**
 * OPINIONS CONTEXT CREATION
 * ==========================
 * createContext creates a new Context object that components can subscribe to.
 *
 * DEFAULT VALUE EXPLANATION:
 * --------------------------
 * We provide a default value here with the shape of our context data:
 * - opinions: null (will be an array once loaded)
 * - addOpinion: empty function
 * - upvoteOpinion: empty function
 * - downvoteOpinion: empty function
 *
 * WHY PROVIDE DEFAULT VALUES?
 * ----------------------------
 * 1. TYPE SAFETY: It documents what shape the context will have, making it
 *    easier for developers to understand what's available.
 *
 * 2. AUTOCOMPLETE: IDEs can use this to provide better autocomplete suggestions.
 *
 * 3. FALLBACK: If a component tries to use this context outside of a provider,
 *    it will get these default values instead of crashing.
 *
 * 4. DOCUMENTATION: It serves as inline documentation of the context API.
 *
 * NOTE: These default values are rarely used in practice because we'll always
 * wrap our components with the Provider, which provides the ACTUAL values.
 */
export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

/**
 * OPINIONS CONTEXT PROVIDER COMPONENT
 * ====================================
 * This is the component that:
 * 1. Manages the opinions state
 * 2. Fetches initial data from the backend
 * 3. Provides functions to modify the opinions
 * 4. Makes everything available to child components via Context
 *
 * PROPS:
 * ------
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that need access
 *                                           to the opinions context
 *
 * The 'children' prop is a special React prop that contains whatever JSX is
 * nested inside this component. For example:
 * <OpinionsContextProvider>
 *   <NewOpinion />     ← These are the children
 *   <Opinions />       ← These are the children
 * </OpinionsContextProvider>
 */
export function OpinionsContextProvider({ children }) {
  /**
   * OPINIONS STATE
   * ==============
   * This state holds the array of all opinions loaded from the backend.
   *
   * STATE LIFECYCLE:
   * ----------------
   * 1. Initial value: undefined (no initial value provided)
   * 2. After fetch completes: array of opinion objects
   * 3. After adding opinion: array with new opinion prepended
   * 4. After voting: array with updated vote counts
   *
   * WHY START WITH UNDEFINED?
   * --------------------------
   * We use undefined instead of [] because:
   * - undefined means "not loaded yet"
   * - [] means "loaded, but no opinions exist"
   * - This distinction helps us show different UI states
   *
   * OPINION OBJECT STRUCTURE:
   * -------------------------
   * Each opinion in the array has this shape:
   * {
   *   id: string,        // Unique identifier (generated by backend)
   *   title: string,     // Opinion title
   *   body: string,      // Opinion content
   *   userName: string,  // Name of the person who shared it
   *   votes: number      // Current vote count (can be negative)
   * }
   */
  const [opinions, setOpinions] = useState();

  /**
   * INITIAL DATA LOADING EFFECT
   * ============================
   * This useEffect runs once when the component mounts and fetches the
   * initial opinions from the backend.
   *
   * DEPENDENCY ARRAY: []
   * --------------------
   * The empty dependency array [] means this effect runs:
   * - Once when the component mounts (initial render)
   * - Never again (no dependencies to trigger re-runs)
   *
   * This is perfect for initial data loading - we only want to fetch the
   * opinions once when the app starts.
   */
  useEffect(() => {
    /**
     * LOAD OPINIONS FUNCTION
     * ======================
     * An async function that fetches opinions from the backend.
     *
     * WHY DEFINE A FUNCTION INSIDE useEffect?
     * ----------------------------------------
     * useEffect cannot be async directly. This code would NOT work:
     * useEffect(async () => { ... }, [])
     *
     * So we define an async function inside, then call it immediately.
     * This is a common pattern for async operations in useEffect.
     *
     * BACKEND REQUEST:
     * ----------------
     * - Endpoint: http://localhost:3000/opinions
     * - Method: GET (default)
     * - Expected response: Array of opinion objects
     *
     * ERROR HANDLING:
     * ---------------
     * Note: This code doesn't handle errors yet. In a production app, you'd
     * want to:
     * - Wrap in try/catch
     * - Check if response.ok
     * - Show error messages to users
     * - Retry failed requests
     *
     * We'll add proper error handling in future lessons.
     */
    async function loadOpinions() {
      /**
       * FETCH API
       * =========
       * The fetch() function is built into modern browsers and allows us to
       * make HTTP requests.
       *
       * By default, fetch:
       * - Uses GET method
       * - Returns a Promise that resolves to a Response object
       * - Doesn't automatically parse JSON (we need .json() for that)
       */
      const response = await fetch('http://localhost:3000/opinions');

      /**
       * PARSING JSON RESPONSE
       * =====================
       * response.json() extracts the JSON body content from the Response.
       * It returns a Promise that resolves to the parsed JavaScript object.
       *
       * The backend returns something like:
       * [
       *   { id: '1', title: 'React is great', body: '...', userName: 'Alice', votes: 5 },
       *   { id: '2', title: 'Vue is better', body: '...', userName: 'Bob', votes: -2 }
       * ]
       */
      const opinions = await response.json();

      /**
       * UPDATING STATE
       * ==============
       * Once we have the opinions data, we update our state.
       * This triggers a re-render of all components that depend on this data.
       *
       * React will:
       * 1. Update the opinions state
       * 2. Re-render this component (and create new contextValue)
       * 3. Re-render all components consuming this context
       * 4. Those components will now see the loaded opinions
       */
      setOpinions(opinions);
    }

    /**
     * CALLING THE ASYNC FUNCTION
     * ===========================
     * We defined the function above, now we call it to actually fetch the data.
     */
    loadOpinions();
  }, []); // Empty dependency array = run once on mount

  /**
   * ADD OPINION FUNCTION
   * ====================
   * This async function handles adding a new opinion by:
   * 1. Sending the opinion data to the backend
   * 2. Receiving the saved opinion (with generated ID) from the backend
   * 3. Updating the local state to include the new opinion
   *
   * This function will be called from the NewOpinion component via a form
   * action in future lessons.
   *
   * @param {Object} enteredOpinionData - The opinion data from the form
   * @param {string} enteredOpinionData.userName - User's name
   * @param {string} enteredOpinionData.title - Opinion title
   * @param {string} enteredOpinionData.body - Opinion content
   *
   * ASYNCHRONOUS OPERATION:
   * -----------------------
   * This function is marked as 'async' because it performs a network request,
   * which takes time. The 'await' keyword pauses execution until the request
   * completes.
   */
  async function addOpinion(enteredOpinionData) {
    /**
     * POST REQUEST TO BACKEND
     * =======================
     * We're making a POST request to create a new opinion.
     *
     * FETCH OPTIONS:
     * --------------
     * The second argument to fetch() is an options object that configures:
     * - method: 'POST' (we're creating new data)
     * - headers: Tell the server we're sending JSON
     * - body: The actual data (must be a string, so we stringify the object)
     */
    const response = await fetch('http://localhost:3000/opinions', {
      method: 'POST',

      /**
       * HEADERS
       * =======
       * HTTP headers provide metadata about the request.
       * 'Content-Type': 'application/json' tells the server:
       * "The data I'm sending is in JSON format"
       *
       * This is important because the server needs to know how to parse
       * the request body. Without this header, the server might not
       * correctly parse our data.
       */
      headers: {
        'Content-Type': 'application/json',
      },

      /**
       * REQUEST BODY
       * ============
       * JSON.stringify() converts our JavaScript object to a JSON string.
       *
       * Example:
       * enteredOpinionData = { userName: 'Alice', title: 'React', body: '...' }
       * After stringify: '{"userName":"Alice","title":"React","body":"..."}'
       *
       * We need to send a string because HTTP requests transmit text, not
       * JavaScript objects.
       */
      body: JSON.stringify(enteredOpinionData),
    });

    /**
     * ERROR HANDLING (BASIC)
     * ======================
     * response.ok is a boolean that's true if the status code is 200-299.
     * If the request failed (status 400, 500, etc.), we exit early.
     *
     * Note: This is basic error handling. In production, you'd want to:
     * - Show an error message to the user
     * - Log the error for debugging
     * - Maybe retry the request
     * - Handle different error types differently
     *
     * By returning early, we don't update the local state, so the UI stays
     * as it was. The new opinion won't appear (correctly, since it wasn't
     * saved to the backend).
     */
    if (!response.ok) {
      return;
    }

    /**
     * PARSING THE SAVED OPINION
     * =========================
     * The backend processes our data and returns the saved opinion, which
     * includes:
     * - All the data we sent (userName, title, body)
     * - A generated unique ID
     * - Initial votes count (probably 0)
     *
     * Example response:
     * {
     *   id: '3',
     *   userName: 'Alice',
     *   title: 'React is great',
     *   body: 'React makes building UIs easy',
     *   votes: 0
     * }
     */
    const savedOpinion = await response.json();

    /**
     * UPDATING STATE WITH NEW OPINION
     * ================================
     * Now we update our local state to include the newly created opinion.
     *
     * IMPORTANT PATTERN: Functional State Update
     * -------------------------------------------
     * We use the functional form: setOpinions(prevOpinions => ...)
     * This is crucial because:
     *
     * 1. STALE CLOSURES: The addOpinion function might execute after state
     *    has changed. Using prevOpinions ensures we always work with the
     *    most current state.
     *
     * 2. CONCURRENT UPDATES: If multiple opinions are added rapidly, this
     *    pattern ensures all updates are applied correctly.
     *
     * ARRAY SPREAD PATTERN:
     * ---------------------
     * [savedOpinion, ...prevOpinions]
     *
     * This creates a NEW array with:
     * - savedOpinion first (newest opinion at the top)
     * - ...prevOpinions spread after it (all existing opinions)
     *
     * Why create a new array?
     * - React detects changes by comparing references
     * - If we mutated prevOpinions directly, React wouldn't detect the change
     * - Creating a new array ensures React knows to re-render
     *
     * Example:
     * Before: [{ id: '2', ... }, { id: '1', ... }]
     * After:  [{ id: '3', ... }, { id: '2', ... }, { id: '1', ... }]
     */
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  /**
   * ============================================================================
   * UPVOTE OPINION FUNCTION - NOW WITH BACKEND INTEGRATION (LESSON 280)
   * ============================================================================
   *
   * This async function handles upvoting an opinion by:
   * 1. Sending a POST request to the backend to increment the vote
   * 2. Waiting for the backend to confirm the vote was saved
   * 3. Only then updating the local state to reflect the new vote count
   *
   * @param {string} id - The unique identifier of the opinion to upvote
   *
   * WHAT CHANGED FROM PREVIOUS LESSON:
   * -----------------------------------
   * BEFORE (Lesson 279):
   * - Function was synchronous (not async)
   * - Only updated local state (client-side only)
   * - No backend persistence
   * - Instant UI update ("optimistic update")
   *
   * AFTER (Lesson 280):
   * - Function is async (uses async/await)
   * - Sends POST request to backend API
   * - Waits for backend confirmation
   * - Updates local state only if backend succeeds
   * - Votes are persisted in database
   *
   * WHY MAKE IT ASYNC?
   * ------------------
   * Making this function async allows:
   * 1. We can use 'await' to wait for the fetch request
   * 2. Form actions can wait for the vote to complete (using await)
   * 3. React's useFormStatus can track the pending state
   * 4. Buttons can show loading states while voting
   * 5. We prevent double-voting (button disabled while pending)
   *
   * CONFIRM-THEN-UPDATE PATTERN:
   * -----------------------------
   * This pattern is different from "optimistic updates":
   * - Wait for backend to confirm the vote succeeded
   * - Only update UI after confirmation
   * - Slower (user waits ~1 second) but more reliable
   * - User sees loading state during the wait
   *
   * Pros:
   * ✓ UI always reflects actual database state
   * ✓ No need to rollback if request fails
   * ✓ Simpler error handling
   * ✓ More predictable behavior
   *
   * Cons:
   * ✗ Slower user experience (network delay)
   * ✗ User has to wait to see vote change
   *
   * In the next lesson, we might switch to optimistic updates for a better UX!
   *
   * BACKEND API ENDPOINT:
   * ---------------------
   * POST http://localhost:3000/opinions/:id/upvote
   *
   * Example: POST http://localhost:3000/opinions/3/upvote
   *
   * The backend:
   * 1. Finds the opinion with id = '3'
   * 2. Increments votes by 1
   * 3. Saves to database
   * 4. Returns success response (200 OK)
   * 5. Has artificial 1-second delay to simulate network latency
   */
  async function upvoteOpinion(id) {
    /**
     * SENDING UPVOTE REQUEST TO BACKEND
     * =================================
     * We use fetch() to send a POST request to the backend.
     *
     * URL CONSTRUCTION:
     * -----------------
     * `http://localhost:3000/opinions/${id}/upvote`
     *
     * This is a template literal that builds the URL dynamically:
     * - If id = '3', URL becomes: .../opinions/3/upvote
     * - If id = '7', URL becomes: .../opinions/7/upvote
     *
     * The ${id} part is replaced with the actual id value.
     *
     * TEMPLATE LITERALS:
     * ------------------
     * Template literals use backticks (`) and allow embedded expressions (${...}).
     * They're perfect for building URLs with dynamic parts.
     *
     * Alternative (concatenation):
     * 'http://localhost:3000/opinions/' + id + '/upvote'
     * But template literals are cleaner and more readable!
     *
     * REQUEST CONFIGURATION:
     * ----------------------
     * { method: 'POST' }
     *
     * We specify method: 'POST' because:
     * - We're modifying data (incrementing votes)
     * - The backend expects a POST request (see backend code)
     * - GET is for reading, POST/PUT/PATCH for modifying
     *
     * NO BODY NEEDED:
     * ---------------
     * Notice we don't send any body data. Why?
     * - The opinion ID is in the URL (not the body)
     * - We're just saying "upvote this opinion"
     * - No additional data needed
     *
     * Compare to addOpinion() which DOES send body data (opinion content).
     *
     * BACKEND DELAY:
     * --------------
     * The backend has an artificial 1-second delay (setTimeout).
     * This simulates real-world network latency, so we can see:
     * - Loading states in action
     * - How async form actions work
     * - The user experience during slow requests
     *
     * In production, network delays are usually 100-500ms, but can be longer
     * with slow connections or distant servers.
     */
    const response = await fetch(
      `http://localhost:3000/opinions/${id}/upvote`,
      {
        method: 'POST',
      }
    );

    /**
     * ERROR HANDLING
     * ==============
     * Check if the backend request was successful.
     *
     * response.ok:
     * ------------
     * This is a boolean property that's true if:
     * - Status code is 200-299 (success range)
     * - Examples: 200 OK, 201 Created, 204 No Content
     *
     * It's false if:
     * - Status code is 400-599 (error range)
     * - Examples: 404 Not Found, 500 Internal Server Error
     *
     * WHY CHECK THIS?
     * ---------------
     * If the request failed (e.g., opinion doesn't exist, server error),
     * we DON'T want to update the local state.
     *
     * Example scenario:
     * 1. User clicks upvote
     * 2. Backend is down (response.ok = false)
     * 3. We return early (don't update state)
     * 4. Vote count stays the same (correct!)
     * 5. User knows something went wrong
     *
     * EARLY RETURN PATTERN:
     * ---------------------
     * if (!response.ok) { return; }
     *
     * By returning early, we skip the state update below.
     * This is cleaner than wrapping the state update in an if statement.
     *
     * IMPROVEMENT FOR NEXT LESSON:
     * -----------------------------
     * Right now, if the request fails, nothing happens. The user might
     * wonder "Did my vote work?" In a future lesson, we could:
     * - Show an error message
     * - Retry the request
     * - Use optimistic updates with rollback
     * - Show a "Failed to vote" notification
     */
    if (!response.ok) {
      return;
    }

    /**
     * UPDATING LOCAL STATE AFTER SUCCESSFUL BACKEND UPDATE
     * =====================================================
     * Now that we know the backend successfully saved the vote, we update
     * the local state to match.
     *
     * WHY UPDATE LOCAL STATE?
     * -----------------------
     * The backend has the new vote count in its database, but our UI still
     * shows the old count. We need to update our local state so the UI
     * re-renders with the new vote count.
     *
     * COULD WE JUST REFETCH ALL OPINIONS?
     * ------------------------------------
     * Yes, we could call:
     * const opinions = await fetch('.../opinions').then(r => r.json());
     * setOpinions(opinions);
     *
     * But that's inefficient:
     * - Extra network request
     * - Fetches ALL opinions (slow if there are many)
     * - Delays UI update
     *
     * It's better to update the specific opinion locally since we know
     * exactly what changed (votes += 1).
     *
     * FUNCTIONAL STATE UPDATE:
     * ------------------------
     * setOpinions(prevOpinions => ...)
     *
     * We use the functional form because:
     * - This function might be called while state is updating
     * - We need the MOST CURRENT state value
     * - Prevents race conditions if multiple votes happen quickly
     *
     * MAP PATTERN FOR IMMUTABLE UPDATES:
     * -----------------------------------
     * prevOpinions.map(opinion => ...)
     *
     * map() creates a NEW array by transforming each element:
     * - For each opinion in the array
     * - If it's the one we voted on (opinion.id === id), update it
     * - Otherwise, return it unchanged
     *
     * This creates a new array reference, which React needs to detect changes.
     *
     * TERNARY OPERATOR:
     * -----------------
     * opinion.id === id ? {...opinion, votes: opinion.votes + 1} : opinion
     *
     * This is shorthand for:
     * if (opinion.id === id) {
     *   return { ...opinion, votes: opinion.votes + 1 };
     * } else {
     *   return opinion;
     * }
     *
     * OBJECT SPREAD PATTERN:
     * ----------------------
     * { ...opinion, votes: opinion.votes + 1 }
     *
     * This creates a NEW object with:
     * - All properties from opinion (...opinion)
     * - votes property overwritten with new value
     *
     * Example transformation:
     * Before: { id: '3', title: 'React', votes: 5, userName: 'Alice', body: '...' }
     * After:  { id: '3', title: 'React', votes: 6, userName: 'Alice', body: '...' }
     *              ↑ All same         ↑ Incremented              ↑ All same
     *
     * WHY CREATE A NEW OBJECT?
     * ------------------------
     * React uses reference equality to detect changes:
     * - If we mutated the existing opinion object, React wouldn't see the change
     * - Creating a new object gives React a different reference
     * - React compares old reference !== new reference → triggers re-render
     *
     * REACT RE-RENDER FLOW:
     * ---------------------
     * 1. setOpinions is called with new array
     * 2. React compares old array reference !== new array reference
     * 3. React schedules a re-render of this Provider component
     * 4. New contextValue is created with updated opinions array
     * 5. All components consuming OpinionsContext re-render
     * 6. Opinion component (for the upvoted opinion) re-renders with new votes
     * 7. User sees the updated vote count!
     */
    setOpinions((prevOpinions) =>
      prevOpinions.map((opinion) =>
        opinion.id === id
          ? { ...opinion, votes: opinion.votes + 1 }
          : opinion
      )
    );
  }

  /**
   * ============================================================================
   * DOWNVOTE OPINION FUNCTION - NOW WITH BACKEND INTEGRATION (LESSON 280)
   * ============================================================================
   *
   * This async function handles downvoting an opinion by:
   * 1. Sending a POST request to the backend to decrement the vote
   * 2. Waiting for the backend to confirm the vote was saved
   * 3. Only then updating the local state to reflect the new vote count
   *
   * @param {string} id - The unique identifier of the opinion to downvote
   *
   * IMPLEMENTATION:
   * ---------------
   * This function is ALMOST IDENTICAL to upvoteOpinion, with two differences:
   *
   * 1. DIFFERENT ENDPOINT:
   *    - upvoteOpinion: .../opinions/${id}/upvote
   *    - downvoteOpinion: .../opinions/${id}/downvote
   *
   * 2. DIFFERENT VOTE CHANGE:
   *    - upvoteOpinion: votes: opinion.votes + 1
   *    - downvoteOpinion: votes: opinion.votes - 1
   *
   * Everything else is exactly the same:
   * - async function (uses await)
   * - POST request to backend
   * - Error checking (response.ok)
   * - Functional state update
   * - Immutable map operation
   * - Object spread pattern
   *
   * WHY SEPARATE FUNCTIONS?
   * ------------------------
   * We could have one function that accepts a 'direction' parameter:
   * function vote(id, direction) {
   *   const endpoint = direction === 'up' ? 'upvote' : 'downvote';
   *   const change = direction === 'up' ? +1 : -1;
   *   ...
   * }
   *
   * But separate functions are clearer:
   * ✓ Clear intent (upvoteOpinion does one thing)
   * ✓ Easier to understand
   * ✓ Easier to test
   * ✓ Better autocomplete
   * ✓ Type-safe (if using TypeScript)
   *
   * The small amount of code duplication is worth the clarity!
   *
   * BACKEND API ENDPOINT:
   * ---------------------
   * POST http://localhost:3000/opinions/:id/downvote
   *
   * Example: POST http://localhost:3000/opinions/3/downvote
   *
   * The backend:
   * 1. Finds the opinion with id = '3'
   * 2. Decrements votes by 1 (votes can go negative!)
   * 3. Saves to database
   * 4. Returns success response (200 OK)
   * 5. Has artificial 1-second delay
   *
   * NEGATIVE VOTES:
   * ---------------
   * Unlike some platforms (Reddit floors at 0), we allow negative votes.
   * An opinion with -5 votes means it received 5 more downvotes than upvotes.
   *
   * This gives users clearer feedback about community sentiment:
   * - 0 votes: Neutral or no votes
   * - -5 votes: Community strongly disagrees
   *
   * If you wanted to prevent negative votes:
   * votes: Math.max(0, opinion.votes - 1)
   */
  async function downvoteOpinion(id) {
    /**
     * SENDING DOWNVOTE REQUEST TO BACKEND
     * ===================================
     * Same pattern as upvoteOpinion, but different endpoint.
     *
     * The backend route handler for /downvote is almost identical to /upvote,
     * just doing `votes--` instead of `votes++`.
     */
    const response = await fetch(
      `http://localhost:3000/opinions/${id}/downvote`,
      {
        method: 'POST',
      }
    );

    /**
     * ERROR HANDLING
     * ==============
     * Same as upvoteOpinion - return early if request failed.
     */
    if (!response.ok) {
      return;
    }

    /**
     * UPDATING LOCAL STATE AFTER SUCCESSFUL BACKEND UPDATE
     * =====================================================
     * Same pattern as upvoteOpinion, but decrementing votes instead.
     *
     * votes: opinion.votes - 1
     *          ↑ Previous value    ↑ Subtract 1
     *
     * Example:
     * Before: { id: '3', votes: 5, ... }
     * After:  { id: '3', votes: 4, ... }
     *
     * Or with negative votes:
     * Before: { id: '7', votes: -2, ... }
     * After:  { id: '7', votes: -3, ... }
     */
    setOpinions((prevOpinions) =>
      prevOpinions.map((opinion) =>
        opinion.id === id
          ? { ...opinion, votes: opinion.votes - 1 }
          : opinion
      )
    );
  }

  /**
   * CONTEXT VALUE OBJECT
   * ====================
   * This object contains everything we want to make available to consuming
   * components.
   *
   * WHAT'S INCLUDED:
   * ----------------
   * - opinions: The current state (array of opinions or undefined)
   * - addOpinion: Async function to add a new opinion
   * - upvoteOpinion: Async function to upvote an opinion (UPDATED!)
   * - downvoteOpinion: Async function to downvote an opinion (UPDATED!)
   *
   * IMPORTANT: Functions are now ASYNC
   * -----------------------------------
   * Components calling upvoteOpinion or downvoteOpinion should await them:
   *
   * await upvoteOpinion(id);
   *
   * This allows:
   * - Form actions to wait for completion
   * - useFormStatus to track pending state
   * - Loading indicators while voting
   * - Error handling
   *
   * SHORTHAND PROPERTY SYNTAX:
   * --------------------------
   * opinions: opinions can be written as just: opinions
   * This is ES6 shorthand for when the key and value have the same name.
   *
   * FUNCTION REFERENCES:
   * --------------------
   * We're passing references to the functions (not calling them).
   * Components will receive these functions and can call them when needed.
   *
   * IMPORTANT: This object is created on EVERY RENDER
   * --------------------------------------------------
   * Every time this component re-renders (e.g., when opinions state changes),
   * a new contextValue object is created. This is usually fine, but in
   * performance-critical apps, you might wrap this in useMemo() to prevent
   * unnecessary re-renders of consuming components.
   *
   * Example with useMemo():
   * const contextValue = useMemo(() => ({
   *   opinions, addOpinion, upvoteOpinion, downvoteOpinion
   * }), [opinions]);
   */
  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  /**
   * PROVIDER COMPONENT RENDER
   * ==========================
   * We return the OpinionsContext.Provider component, which:
   * 1. Makes the contextValue available to all child components
   * 2. Renders the children inside the provider
   *
   * HOW CONTEXT WORKS:
   * ------------------
   * Any component nested inside this provider can access contextValue by:
   * - Using useContext(OpinionsContext) hook (React 18)
   * - Using use(OpinionsContext) hook (React 19 - newer approach)
   *
   * Example:
   * <OpinionsContext.Provider value={contextValue}>
   *   <NewOpinion />      ← Can access contextValue
   *   <Opinions>          ← Can access contextValue
   *     <Opinion />       ← Can access contextValue (even though nested deeper)
   *   </Opinions>
   * </OpinionsContext.Provider>
   *
   * The 'value' prop is what gets passed to consuming components.
   */
  return <OpinionsContext.Provider value={contextValue}>{children}</OpinionsContext.Provider>;
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS - LESSON 280
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. ASYNC VOTING FUNCTIONS: Made upvoteOpinion and downvoteOpinion async
 *    to handle backend requests with async/await.
 *
 * 2. BACKEND PERSISTENCE: Votes are now saved to the database, not just
 *    updated locally. Votes survive page reloads!
 *
 * 3. CONFIRM-THEN-UPDATE PATTERN: Wait for backend confirmation before
 *    updating UI. More reliable than optimistic updates, but slower.
 *
 * 4. TEMPLATE LITERALS FOR URLs: Use backticks and ${id} to build dynamic
 *    URLs for API endpoints.
 *
 * 5. POST REQUESTS WITHOUT BODY: You can send POST requests with just a URL
 *    and method, no body needed if the action is simple (like voting).
 *
 * 6. ERROR HANDLING: Check response.ok before updating state to ensure
 *    backend request succeeded.
 *
 * 7. FUNCTIONAL STATE UPDATES: Always use prevState => ... form when new
 *    state depends on old state, especially with async operations.
 *
 * EXECUTION FLOW EXAMPLE:
 * =======================
 * User clicks upvote button →
 * 1. Form action calls upvoteOpinion(id)
 * 2. upvoteOpinion sends POST to backend
 * 3. Backend increments votes in database (~1 second delay)
 * 4. Backend responds with 200 OK
 * 5. upvoteOpinion updates local state
 * 6. Context value changes
 * 7. All consuming components re-render
 * 8. User sees updated vote count!
 *
 * CURRENT USER EXPERIENCE:
 * ========================
 * ✓ Click vote button
 * ✓ Wait ~1 second (backend delay)
 * ✓ Vote count updates
 * ✓ Votes are persisted
 * ✓ Reload page - votes are still there!
 *
 * ✗ Slow feedback (1 second wait)
 * ✗ Button is clickable during loading (can double-vote)
 * ✗ No loading indicator
 * ✗ No error messages if request fails
 *
 * WHAT'S COMING NEXT:
 * ===================
 * In the next lesson, we'll improve the UX by:
 * - Making form actions async in Opinion.jsx
 * - Using await to wait for voting to complete
 * - Enabling useFormStatus to show loading states
 * - Disabling buttons while voting
 * - Preventing double-voting
 * - Possibly adding optimistic updates for instant feedback
 *
 * BEST PRACTICES DEMONSTRATED:
 * ============================
 * ✓ Async/await for clean asynchronous code
 * ✓ Error handling before state updates
 * ✓ Functional state updates for reliability
 * ✓ Immutable update patterns
 * ✓ Template literals for dynamic URLs
 * ✓ Separate functions for separate actions (clarity over DRY)
 * ✓ Comments explaining WHY, not just WHAT
 */
