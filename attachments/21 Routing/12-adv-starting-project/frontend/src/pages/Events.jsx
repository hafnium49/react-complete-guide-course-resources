/**
 * ============================================================================
 * EVENTS PAGE COMPONENT (Lesson 361 - Data Fetching Introduction)
 * ============================================================================
 *
 * LESSON OVERVIEW (Lesson 361):
 * =============================
 * INSTRUCTOR QUOTE:
 * "We are now ready to dive deeper into Routing and explore more advanced
 * features of React router. And one of the most important feature sets offered
 * by React router is related to data fetching and submission and that's there
 * for what we'll explore next."
 *
 * INSTRUCTOR QUOTE:
 * "For that attached, you find a new file Events.js which you should use to
 * replace your Events.js file in the pages folder with it."
 *
 * ============================================================================
 * TRADITIONAL DATA FETCHING APPROACH (Lesson 361)
 * ============================================================================
 *
 * This file demonstrates the TRADITIONAL approach to fetching data in React:
 * - Using useEffect to trigger the fetch when component mounts
 * - Managing loading, error, and data states with useState
 * - Rendering different UI based on these states
 *
 * INSTRUCTOR QUOTE:
 * "And this code should look familiar to you. Fraud discourse, you already
 * learned how you can send http requests to a backend and how you can leverage
 * useEffect to fetch data from a backend. So this should be familiar code here."
 *
 * ============================================================================
 * PROBLEMS WITH THIS APPROACH (Lesson 361)
 * ============================================================================
 *
 * PROBLEM 1: Boilerplate Code
 * ===========================
 * INSTRUCTOR QUOTE:
 * "Now, there is nothing wrong with debt code, but of course it is worth
 * noting that it's quite some boiler plate code, which you have to repeat
 * every time you are sending a request to a backend."
 *
 * INSTRUCTOR QUOTE:
 * "Though you could kind of mitigate that by creating a custom hook and you
 * could outsource that logic into a custom hook. But nonetheless, it's quite
 * some code that must be written to handle these different http request states
 * and to fetch that data."
 *
 * PROBLEM 2: Request Timing
 * =========================
 * INSTRUCTOR QUOTE:
 * "And in addition, what's all the worth noting is that of course this request
 * will only be sent once we reached this page. So once we navigate it to this
 * page... So we only start sending that request as soon as we reach the events
 * page. We don't start sending the request any earlier instead only once we
 * reach this page."
 *
 * INSTRUCTOR QUOTE:
 * "And that of course means that this entire events page component must be
 * rendered before this request is sent. That's not necessarily a problem.
 * And here it is a pretty straightforward, simple component."
 *
 * PROBLEM 3: Complex Components
 * =============================
 * INSTRUCTOR QUOTE:
 * "But of course, in more complex applications this component could be rather
 * complex and it could also have a bunch of nested child components and having
 * to render and evaluate all these components before we actually start sending
 * that request for that data which we absolutely need, is suboptimal."
 *
 * ============================================================================
 * THE BETTER APPROACH - React Router's loader (Lesson 361)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "You could argue that it would be much nicer if React router would initiate
 * the data fetching as soon as we start navigating to this page. So as soon
 * as we start rendering this component, so to say or even before we render
 * the component and we then render the component with the fetched data instead
 * of first rendering the component without the fetched data with the loading
 * state fallback instead and then fetching data after it has been rendered as
 * it's currently happening."
 *
 * INSTRUCTOR QUOTE:
 * "It could be preferable to do it the other way around and first fetched the
 * data and then render this component. And that's exactly what React router
 * allows us to do. And where React router helps us."
 *
 * INSTRUCTOR QUOTE:
 * "With React router at least if you're using version six or higher you don't
 * have to write all that code for fetching data and for handling these different
 * states. Instead, React router helps you with all of that."
 *
 * ============================================================================
 * DATA FLOW COMPARISON
 * ============================================================================
 *
 * TRADITIONAL APPROACH (Current):
 * ===============================
 * 1. User clicks link to /events
 * 2. React Router renders EventsPage component
 * 3. Component renders with loading state
 * 4. useEffect triggers after render
 * 5. Fetch request is sent
 * 6. Response received
 * 7. State updated, component re-renders with data
 *
 * Timeline: Navigate → Render → Effect → Fetch → Re-render
 *
 * REACT ROUTER LOADER APPROACH (Better):
 * ======================================
 * 1. User clicks link to /events
 * 2. React Router calls loader function BEFORE rendering
 * 3. Fetch request is sent
 * 4. Response received
 * 5. Component renders WITH the data already available
 *
 * Timeline: Navigate → Fetch → Render (with data)
 *
 * ============================================================================
 * BACKEND API REQUIREMENT (Lesson 361)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And you should make sure that that backend API server is up and running in
 * a separate terminal window as shown a couple of lectures ago."
 *
 * Make sure the backend is running:
 * cd backend
 * npm start
 *
 * The backend runs on http://localhost:8080
 *
 * ============================================================================
 */
import { useEffect, useState } from 'react';

import EventsList from '../components/EventsList';

/**
 * EVENTS PAGE COMPONENT - TRADITIONAL APPROACH:
 * =============================================
 * This version uses the traditional useEffect pattern for data fetching.
 *
 * STATE MANAGEMENT:
 * - isLoading: Track whether request is in progress
 * - fetchedEvents: Store the fetched event data
 * - error: Store any error message
 *
 * This approach requires managing 3 separate states and handling
 * all the different UI scenarios manually.
 */
function EventsPage() {
  /**
   * STATE HOOKS (Traditional Approach):
   * ===================================
   * Three separate pieces of state to manage the HTTP request lifecycle:
   *
   * 1. isLoading - Shows loading indicator while fetching
   * 2. fetchedEvents - Stores the array of events from backend
   * 3. error - Stores error message if request fails
   *
   * INSTRUCTOR QUOTE:
   * "An error is stored with help of state if it's a invalid response, for
   * example because we got an error back from the backend. If we don't have
   * an error, we instead extract the data from the response and store that
   * with help of state as well. And we're all managing the loading state."
   */
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  /**
   * useEffect FOR DATA FETCHING (Traditional Approach):
   * ====================================================
   * This pattern is familiar from earlier in the course.
   *
   * TIMING ISSUE:
   * - This effect runs AFTER the component renders
   * - The fetch request only starts after initial render
   * - User sees loading state before seeing actual data
   *
   * INSTRUCTOR QUOTE:
   * "So we only start sending that request as soon as we reach the events
   * page. We don't start sending the request any earlier instead only once
   * we reach this page."
   */
  useEffect(() => {
    /**
     * ASYNC FUNCTION FOR FETCHING:
     * ============================
     * We define an async function inside useEffect because
     * useEffect callback itself cannot be async.
     */
    async function fetchEvents() {
      setIsLoading(true);

      /**
       * FETCH REQUEST TO BACKEND:
       * =========================
       * Sends GET request to the dummy backend API.
       * Backend must be running on port 8080.
       */
      const response = await fetch('http://localhost:8080/events');

      /**
       * ERROR HANDLING:
       * ===============
       * Check if response is OK (status 200-299).
       * If not, store error message in state.
       */
      if (!response.ok) {
        setError('Fetching events failed.');
      } else {
        /**
         * EXTRACT EVENT DATA:
         * ===================
         * Parse JSON response and extract events array.
         *
         * INSTRUCTOR QUOTE:
         * "My response data object is actually an object that will have an
         * events property which holds the actual array of events. That's
         * simply how the backend API returns the response for this request."
         */
        const resData = await response.json();
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    }

    // Execute the fetch function
    fetchEvents();
  }, []); // Empty dependency array = run once on mount

  /**
   * CONDITIONAL RENDERING (Traditional Approach):
   * ==============================================
   * Must manually handle all the different states:
   * - Loading state: Show loading indicator
   * - Error state: Show error message
   * - Success state: Show the fetched data
   *
   * INSTRUCTOR QUOTE:
   * "And then all these states are used down here to either show a loading
   * text, an error message or to render the fetched events which are now
   * fetched from the dummy backend some dummy event data from the backend."
   */
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {/* Show loading indicator while fetching */}
        {isLoading && <p>Loading...</p>}
        {/* Show error message if fetch failed */}
        {error && <p>{error}</p>}
      </div>
      {/**
       * RENDER EVENTS LIST:
       * ===================
       * Only render EventsList when:
       * - Not loading (fetch completed)
       * - fetchedEvents exists (data was successfully fetched)
       *
       * INSTRUCTOR QUOTE:
       * "Those events are rendered here with help of that events list
       * component which exists to this components folder already."
       */}
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
}

export default EventsPage;

/**
 * ============================================================================
 * NEXT: REACT ROUTER'S loader PROPERTY (Lesson 361)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And it helps you with all of that by giving you an extra property which
 * you can add to your route definitions. Now we're currently talking about
 * this events page. That's this page where we're fetching data, and in our
 * route definitions we can add an extra property to that route definition
 * of that page. We can add the extra loader property."
 *
 * INSTRUCTOR QUOTE:
 * "Now, loader is a property that wants a function as a value, a regular
 * function or an error function that does not matter. And this function
 * will be executed by a React router whenever you are about to visit this
 * route. So just before this route gets rendered, just before this JSX code
 * gets rendered, this loader function will be triggered and executed by a
 * React router."
 *
 * INSTRUCTOR QUOTE:
 * "And it's in this loader function where you can therefore load and fetch
 * your data."
 *
 * See App.jsx for the loader implementation!
 *
 * ============================================================================
 */
