/**
 * ============================================================================
 * useHttp CUSTOM HOOK - REUSABLE HTTP REQUEST LOGIC (Lesson 298)
 * ============================================================================
 *
 * This custom hook encapsulates all the logic for making HTTP requests,
 * including loading states, error handling, and data management.
 *
 * LESSON 298 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Creating custom hooks for reusable logic
 * 2. Why standard functions won't work (need stateful logic)
 * 3. Managing async operations with loading/error states
 * 4. Using useCallback to prevent infinite loops
 * 5. Automatic GET request execution on mount
 * 6. Manual POST request triggering via sendRequest
 * 7. Accepting initialData to avoid undefined errors
 * 8. Defining config outside component to prevent infinite loops
 *
 * WHY A CUSTOM HOOK? (Lesson 298)
 * ===============================
 * The instructor explains:
 * "we have two components, the Checkout component and the Meals component,
 * that both need to send requests, even though those requests are sent at
 * different points of time, but they both do it. And they then also, both
 * in the end need to deal with different request states: failing requests,
 * loading requests and requests that succeeded."
 *
 * "So we have that same logic which we in the end need in two different
 * components to update the UI. And since it's some stateful logic that
 * should impact the UI and where changes should impact the UI, we need a
 * custom hook, because just creating a custom standard function won't do
 * the trick."
 *
 * FILE STRUCTURE (Lesson 298):
 * ============================
 * The instructor explains:
 * "So in the source folder I'll add a hooks folder. And I'll name it,
 * useHttp. This is the file name and in there I'll also export a function
 * called useHttp, and as you learned in this course, custom hooks must
 * start with 'use' to signal to React that the special rules of hooks
 * should apply here."
 *
 * USAGE EXAMPLES:
 * ===============
 * GET request (automatic):
 * const { data, isLoading, error } = useHttp('/api/meals', {}, []);
 *
 * POST request (manual):
 * const { data, sendRequest, isLoading } = useHttp('/api/orders', { method: 'POST', headers: {...} });
 * sendRequest(JSON.stringify(orderData));
 */

import { useCallback, useEffect, useState } from 'react';

/**
 * SEND HTTP REQUEST HELPER (Lesson 298)
 * =====================================
 * This is a pure async function (not a hook) that handles the actual
 * HTTP request. It's extracted to keep the hook logic cleaner.
 *
 * INSTRUCTOR QUOTE (Lesson 298):
 * "this is not the hook, instead it's a helper function that could be
 * outsourced into a separate file or added in the same file, which is
 * what I'll do here, which receives the URL and the config and then
 * uses the built-in fetch function to send the request"
 *
 * WHY SEPARATE THIS FUNCTION?
 * ---------------------------
 * 1. Keeps the hook focused on state management
 * 2. This function is just about HTTP mechanics
 * 3. Easier to test in isolation
 * 4. Could be reused outside of React if needed
 *
 * @param {string} url - The URL to fetch
 * @param {Object} config - Fetch configuration (method, headers, body, etc.)
 * @returns {Promise<any>} The parsed JSON response
 * @throws {Error} If response is not OK (status 4xx or 5xx)
 */
async function sendHttpRequest(url, config) {
  /**
   * FETCH API (Lesson 298)
   * ======================
   * fetch() is the modern browser API for making HTTP requests.
   * It returns a Promise that resolves to a Response object.
   *
   * INSTRUCTOR QUOTE (Lesson 298):
   * "which receives the URL and the config and then uses the built-in
   * fetch function to send the request"
   *
   * The config object can include:
   * - method: 'GET', 'POST', 'PUT', 'DELETE'
   * - headers: { 'Content-Type': 'application/json' }
   * - body: JSON string of data to send
   *
   * ASYNC/AWAIT (Lesson 298):
   * The instructor notes: "you are awaiting, and of course, therefore,
   * we also need the async keyword here on this function"
   */
  const response = await fetch(url, config);

  /**
   * PARSE JSON RESPONSE
   * ===================
   * response.json() parses the response body as JSON.
   * This also returns a Promise, hence the await.
   *
   * We parse the response BEFORE checking if it's OK because:
   * - Error responses often include useful JSON data (error messages)
   * - We want to include that data in our error handling
   */
  const resData = await response.json();

  /**
   * ERROR HANDLING
   * ==============
   * response.ok is true for status codes 200-299.
   * If false (4xx or 5xx), we throw an error.
   *
   * We use the message from the server if available, otherwise
   * provide a generic message.
   *
   * Throwing an error here will be caught by the try/catch in sendRequest.
   */
  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  return resData;
}

/**
 * useHttp CUSTOM HOOK
 * ===================
 * A reusable hook for making HTTP requests with loading and error states.
 *
 * HOOK RULES:
 * -----------
 * Custom hooks must:
 * - Start with "use" (useHttp, useState, useEffect, etc.)
 * - Only be called at the top level of components or other hooks
 * - Can use other hooks inside them
 *
 * @param {string} url - The URL to fetch
 * @param {Object} config - Fetch configuration
 * @param {any} initialData - Initial value for data state
 *
 * @returns {Object} Hook return value
 * @returns {any} data - Response data
 * @returns {boolean} isLoading - True while request is in progress
 * @returns {string|undefined} error - Error message if request failed
 * @returns {Function} sendRequest - Function to trigger the request
 * @returns {Function} clearData - Function to reset data to initial value
 */
export default function useHttp(url, config, initialData) {
  /**
   * STATE MANAGEMENT (Lesson 298)
   * =============================
   * We track three pieces of state:
   * - data: The response data (starts with initialData)
   * - isLoading: Whether a request is in progress
   * - error: Any error message from a failed request
   *
   * INSTRUCTOR QUOTE (Lesson 298):
   * "in that custom hook, we wanna manage some state and update the UI
   * of the component that is using this hook based on that state."
   *
   * WHY THREE STATES? (Lesson 298):
   * "You could also just use two states, for example, like isLoading
   * and error... In the end it's up to you, but I like to have this
   * data state here as well."
   *
   * WHY initialData? (Lesson 298):
   * "because it will try to go through all meals and output list item
   * elements for all meals, and if that meals data is undefined initially,
   * this will fail"
   *
   * This is why Meals.jsx passes [] as initialData - to ensure
   * .map() doesn't fail on undefined during initial render.
   */
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  /**
   * CLEAR DATA FUNCTION
   * ===================
   * Resets data to the initial value.
   * Useful after successful operations (e.g., clear form data after submit).
   *
   * Used in Checkout.jsx after successful order submission.
   */
  function clearData() {
    setData(initialData);
  }

  /**
   * SEND REQUEST FUNCTION (Lesson 298)
   * ==================================
   * This function actually sends the HTTP request.
   * It's wrapped in useCallback to prevent unnecessary re-creations.
   *
   * WHY useCallback? (Lesson 298)
   * -----------------------------
   * INSTRUCTOR QUOTE:
   * "we need to wrap this inner function with useCallback... The reason
   * for that is that we would otherwise create an infinite loop."
   *
   * "because we're using sendRequest inside of useEffect as a dependency,
   * useEffect will run again whenever sendRequest changes. And it does
   * change if we don't use useCallback"
   *
   * THE INFINITE LOOP PROBLEM (Lesson 298):
   * 1. Component renders → sendRequest recreated (new reference)
   * 2. useEffect sees sendRequest changed → runs sendRequest()
   * 3. sendRequest updates state (setData, setIsLoading, setError)
   * 4. State update triggers re-render → back to step 1
   *
   * useCallback memoizes the function - it only creates a new function
   * when the dependencies (url, config) change.
   *
   * DEPENDENCY ARRAY: [url, config]
   * -------------------------------
   * sendRequest depends on url and config because it uses them to
   * make the request. If these change, we need a new function.
   *
   * @param {string} data - Request body data (for POST/PUT requests)
   */
  const sendRequest = useCallback(
    async function sendRequest(data) {
      /**
       * SET LOADING STATE (Lesson 298)
       * ==============================
       * Before starting the request, set isLoading to true.
       * Components can use this to show loading indicators.
       *
       * INSTRUCTOR QUOTE (Lesson 298):
       * "set isLoading to true right at the start here, and then try to
       * send that HTTP request"
       */
      setIsLoading(true);

      try {
        /**
         * TRY-CATCH FOR ERROR HANDLING (Lesson 298)
         * =========================================
         * INSTRUCTOR QUOTE:
         * "I wanna wrap my code here into a try catch block because
         * the request could fail."
         */
        /**
         * MAKE THE REQUEST
         * ================
         * Call our helper function with the URL and config.
         * We spread the config and add the body data.
         *
         * { ...config, body: data }
         * - Copies all properties from config (method, headers, etc.)
         * - Adds/overwrites body with the data parameter
         *
         * For GET requests, data will be undefined and body will be ignored.
         */
        const resData = await sendHttpRequest(url, { ...config, body: data });

        /**
         * SUCCESS - UPDATE DATA
         * =====================
         * If request succeeds, store the response data.
         * This will trigger a re-render in consuming components.
         */
        setData(resData);
      } catch (error) {
        /**
         * ERROR - STORE ERROR MESSAGE
         * ===========================
         * If request fails, store the error message.
         * The error could come from:
         * - Network failure
         * - Our thrown error (non-OK response)
         * - JSON parsing error
         */
        setError(error.message || 'Something went wrong!');
      }

      /**
       * CLEAR LOADING STATE
       * ===================
       * Whether success or error, we're done loading.
       * This runs after either the try or catch block.
       */
      setIsLoading(false);
    },
    [url, config]
  );

  /**
   * AUTOMATIC GET REQUEST (Lesson 298)
   * ==================================
   * For GET requests, we want to fetch data immediately when the
   * component mounts. This useEffect handles that.
   *
   * INSTRUCTOR QUOTE (Lesson 298):
   * "now depending on the config that was passed, I either want to send
   * that request, or I don't want to send it. I only wanna send it if
   * it's a GET request, because for POST requests I only want to send
   * those requests once the user clicked a button."
   *
   * CONDITION (Lesson 298):
   * -----------------------
   * INSTRUCTOR QUOTE:
   * "if we have no method set, or if the method is get... only then
   * this useEffect function should call sendRequest"
   *
   * We only auto-fetch if:
   * - config exists AND method is 'GET' OR method is undefined (default is GET)
   * - OR config doesn't exist at all
   *
   * This means:
   * - useHttp('/meals', {}) → Auto-fetch (GET)
   * - useHttp('/meals', { method: 'GET' }) → Auto-fetch (GET)
   * - useHttp('/orders', { method: 'POST' }) → Don't auto-fetch
   *
   * For POST/PUT/DELETE, the component must call sendRequest manually.
   *
   * DEPENDENCY ARRAY: [sendRequest, config]
   * ---------------------------------------
   * - sendRequest: Function to call (memoized, so stable)
   * - config: To re-check the condition if config changes
   */
  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  /**
   * RETURN VALUE
   * ============
   * Return an object with all the state and functions.
   *
   * Components destructure what they need:
   * const { data, isLoading, error } = useHttp(...);
   * const { sendRequest, isLoading } = useHttp(...);
   */
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}

/**
 * ============================================================================
 * LESSON 298 - SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * CUSTOM HOOKS (Lesson 298):
 * ==========================
 * Custom hooks let you extract component logic into reusable functions.
 *
 * INSTRUCTOR QUOTE:
 * "So we have that same logic which we in the end need in two different
 * components to update the UI. And since it's some stateful logic that
 * should impact the UI and where changes should impact the UI, we need a
 * custom hook, because just creating a custom standard function won't do
 * the trick."
 *
 * Rules:
 * - Name must start with "use"
 * - Can call other hooks inside
 * - Share logic, not state (each component gets its own state)
 *
 * HOOK RETURN PATTERN:
 * ====================
 * Return an object with named properties:
 * return { data, isLoading, error, sendRequest };
 *
 * This allows consumers to destructure only what they need.
 *
 * useCallback - PREVENTING INFINITE LOOPS (Lesson 298):
 * =====================================================
 * Memoizes a function to prevent unnecessary re-creations.
 *
 * INSTRUCTOR QUOTE:
 * "we need to wrap this inner function with useCallback... The reason
 * for that is that we would otherwise create an infinite loop."
 *
 * Without: New function every render → useEffect runs every render
 * With: Same function until deps change → useEffect runs only when needed
 *
 * CONFIG OBJECT - ANOTHER INFINITE LOOP PITFALL (Lesson 298):
 * ===========================================================
 * INSTRUCTOR QUOTE:
 * "Here's one problem, with this config object... I'm also using this
 * config object as a dependency of my sendRequest function... Therefore
 * this config object is recreated, therefore this function is recreated,
 * therefore useEffect runs again, and it all starts all over again."
 *
 * SOLUTION: Define the config object OUTSIDE the component:
 *
 *   // OUTSIDE component - stable reference
 *   const requestConfig = { method: 'POST', headers: {...} };
 *
 *   function MyComponent() {
 *     const { sendRequest } = useHttp('/orders', requestConfig);
 *     // ...
 *   }
 *
 * LOADING/ERROR STATE PATTERN (Lesson 298):
 * =========================================
 * The three-state pattern for async operations:
 * - isLoading: true while in progress
 * - error: set if operation failed
 * - data: set if operation succeeded
 *
 * This pattern allows components to show appropriate UI for each state.
 *
 * initialData PARAMETER (Lesson 298):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "because it will try to go through all meals and output list item
 * elements for all meals, and if that meals data is undefined initially,
 * this will fail"
 *
 * Pass [] for array data to prevent .map() errors during initial render.
 *
 * USAGE IN COMPONENTS:
 * ====================
 *
 * GET Request (Meals.jsx):
 * ------------------------
 * // Config defined OUTSIDE component to prevent infinite loops
 * const mealsConfig = {};
 *
 * function Meals() {
 *   const { data: meals, isLoading, error } = useHttp(
 *     'http://localhost:3000/meals',
 *     mealsConfig,
 *     []  // initialData to prevent undefined.map() error
 *   );
 *   // Automatically fetches on mount
 *   // Show loading, error, or meals based on state
 * }
 *
 * POST Request (Checkout.jsx):
 * ----------------------------
 * // Config defined OUTSIDE component to prevent infinite loops
 * const requestConfig = {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' }
 * };
 *
 * function Checkout() {
 *   const { sendRequest, isLoading, error } = useHttp(
 *     'http://localhost:3000/orders',
 *     requestConfig
 *   );
 *   // Call sendRequest(JSON.stringify(data)) when form is submitted
 *   // Does NOT auto-fetch because method is 'POST'
 * }
 *
 * LESSON 298 WORKFLOW:
 * ====================
 * 1. Create hooks folder: src/hooks/
 * 2. Create useHttp.js with sendHttpRequest helper + useHttp hook
 * 3. Manage state: data, isLoading, error
 * 4. Wrap sendRequest in useCallback to prevent infinite loops
 * 5. Use useEffect to auto-fetch for GET requests only
 * 6. Accept initialData to prevent undefined errors
 * 7. Define config objects OUTSIDE consuming components
 * 8. Return object with state and functions for consumers to destructure
 */
