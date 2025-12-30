/**
 * ============================================================================
 * LESSON 275: OPINIONS CONTEXT - BACKEND COMMUNICATION & STATE MANAGEMENT
 * ============================================================================
 *
 * This file implements the Context API for managing opinions data and handling
 * all backend communication. This is the "brain" of our application - it's
 * where all the data fetching, state management, and backend operations happen.
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
 * - Note: Upvote/downvote are client-side only for now (optimistic updates)
 *
 * The backend server:
 * - Runs on http://localhost:3000
 * - Is a Node.js/Express server with a db.json file
 * - Provides REST API endpoints
 * - Stores opinions persistently
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
   * UPVOTE OPINION FUNCTION
   * =======================
   * This function increments the vote count for a specific opinion.
   *
   * @param {string} id - The unique identifier of the opinion to upvote
   *
   * IMPORTANT NOTE: CLIENT-SIDE ONLY
   * ---------------------------------
   * Notice this function is NOT async and doesn't make a backend request.
   * This is an "optimistic update" pattern:
   * 1. Update the UI immediately (feels fast to the user)
   * 2. In a real app, you'd also send the vote to the backend
   * 3. If the backend request fails, you'd revert the change
   *
   * Why use this pattern?
   * - Makes the app feel more responsive
   * - User doesn't wait for the network request
   * - Good for operations that rarely fail (like voting)
   *
   * In future lessons, we might add backend persistence for votes.
   */
  function upvoteOpinion(id) {
    /**
     * IMMUTABLE STATE UPDATE WITH MAP
     * ================================
     * We use the functional state update pattern again, and map() to create
     * a new array with the updated opinion.
     *
     * FUNCTIONAL STATE UPDATE:
     * ------------------------
     * setOpinions(prevOpinions => ...)
     * Using the function form ensures we work with the most current state.
     *
     * MAP PATTERN:
     * ------------
     * prevOpinions.map() creates a new array by transforming each opinion.
     * For each opinion, we check:
     * - If it's the one being upvoted (opinion.id === id), return an updated version
     * - Otherwise, return the opinion unchanged
     *
     * OBJECT SPREAD PATTERN:
     * ----------------------
     * { ...opinion, votes: opinion.votes + 1 }
     *
     * This creates a NEW object with:
     * - All properties from opinion (...opinion)
     * - votes property overwritten with the new value
     *
     * Example:
     * Before: { id: '1', title: 'React', votes: 5, ... }
     * After:  { id: '1', title: 'React', votes: 6, ... }
     *
     * Why create new objects?
     * - React needs new references to detect changes
     * - Immutability makes debugging easier (can track history)
     * - Prevents accidental mutations that cause bugs
     */
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        // Check if this is the opinion to update
        if (opinion.id === id) {
          // Return a new object with votes incremented
          return { ...opinion, votes: opinion.votes + 1 };
        }
        // Return unchanged opinion for all others
        return opinion;
      });
    });
  }

  /**
   * DOWNVOTE OPINION FUNCTION
   * =========================
   * This function decrements the vote count for a specific opinion.
   *
   * @param {string} id - The unique identifier of the opinion to downvote
   *
   * IMPLEMENTATION:
   * ---------------
   * This function is identical to upvoteOpinion, except:
   * - We SUBTRACT 1 from votes instead of adding
   * - votes: opinion.votes - 1
   *
   * Everything else works the same way:
   * - Functional state update
   * - Immutable map operation
   * - Object spread pattern
   * - Client-side only (no backend request)
   *
   * VOTES CAN BE NEGATIVE:
   * ----------------------
   * Notice there's no check to prevent negative votes. An opinion with more
   * downvotes than upvotes will have a negative number (e.g., -3).
   * This is intentional - it shows opinions the community disagrees with.
   */
  function downvoteOpinion(id) {
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          // Return a new object with votes decremented
          return { ...opinion, votes: opinion.votes - 1 };
        }
        return opinion;
      });
    });
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
   * - addOpinion: Function to add a new opinion
   * - upvoteOpinion: Function to upvote an opinion
   * - downvoteOpinion: Function to downvote an opinion
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
  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. CONTEXT API PATTERN: Create a Context and a Provider component to manage
 *    shared state and make it available to multiple components.
 *
 * 2. BACKEND COMMUNICATION: Use fetch() to load data from and send data to
 *    a backend server. Handle async operations with async/await.
 *
 * 3. IMMUTABLE STATE UPDATES: Always create new arrays/objects when updating
 *    state. Use spread operators (...) and map() to create new references.
 *
 * 4. FUNCTIONAL STATE UPDATES: Use setOpinions(prev => ...) when the new state
 *    depends on the previous state to avoid stale closure issues.
 *
 * 5. OPTIMISTIC UPDATES: For operations like voting, update the UI immediately
 *    without waiting for the backend. This makes the app feel faster.
 *
 * 6. USEEFFECT FOR DATA LOADING: Use useEffect with empty dependency array []
 *    to load initial data once when the component mounts.
 *
 * 7. ERROR HANDLING: Check response.ok to detect failed requests. More
 *    sophisticated error handling will be added in future lessons.
 *
 * REACT 19 FEATURES COMING:
 * =========================
 * In future lessons, we'll add:
 * - Form actions for submitting opinions (useActionState)
 * - Form actions for voting buttons
 * - Proper loading states during async operations
 * - Better error handling and user feedback
 * - Possibly optimistic updates with automatic rollback
 *
 * BEST PRACTICES DEMONSTRATED:
 * ============================
 * ✓ Separate data management from UI components
 * ✓ Use Context for data that many components need
 * ✓ Keep functions that modify state close to where state is defined
 * ✓ Use immutable update patterns
 * ✓ Use async/await for cleaner asynchronous code
 * ✓ Provide default values in createContext for better DX
 */
