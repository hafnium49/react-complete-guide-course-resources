/**
 * ============================================================================
 * EVENTS PAGE COMPONENT (Lessons 361-362 - useLoaderData Hook)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 361: Showed traditional useEffect approach and its problems
 * Lesson 362: Refactored to use useLoaderData for cleaner code
 *
 * ============================================================================
 * LESSON 362: ACCESSING LOADER DATA WITH useLoaderData
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So how do we now get access to that data returned by our loader? Well,
 * for that we have to go to the component where we want to use it. Like
 * for example, the events page component."
 *
 * CLEANING UP THE COMPONENT (Lesson 362):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "There, as a first step, I can get rid of all that remaining code, which
 * we had in there before, all that state management, and useEffect, and get
 * rid of this div here, which shows my loading and error estates."
 *
 * INSTRUCTOR QUOTE:
 * "We will see how we can implement those states again in the near future,
 * but for the moment, we can get rid of that."
 *
 * INSTRUCTOR QUOTE:
 * "Of course, we also get rid of these checks here therefore and just return
 * events list like that, and we can get rid of these imports."
 *
 * ============================================================================
 * THE useLoaderData HOOK (Lesson 362)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And now to get access to the data returned by the loader function for
 * this page, we can import 'use loader data' from React-router-dom."
 *
 * WHAT IT DOES (Lesson 362):
 * ==========================
 * INSTRUCTOR QUOTE:
 * "This is a special hook which we can execute to get access to the closest
 * loader data, and I will show you what 'closest loader data' means in just
 * a second."
 *
 * "Closest loader data" means:
 * - The loader data from the route that rendered this component
 * - If component is nested, it gets data from the nearest parent route
 *   that has a loader
 *
 * NAMING THE RESULT (Lesson 362):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "So here, I now get my data by calling 'use loader data.' We could also
 * name it 'events' since we know that it will be a list of events in case
 * of this component here, due to the code we wrote in this loader."
 *
 * WHAT YOU GET (Lesson 362):
 * ==========================
 * INSTRUCTOR QUOTE:
 * "And events here will really be that data returned by that loader."
 *
 * ============================================================================
 * PROMISES ARE AUTOMATICALLY RESOLVED (Lesson 362)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now since I'm using a single weight, technically this loader function
 * will return a promise. Any data returned in that function will be wrapped
 * by a promise, that's how a single weight works."
 *
 * INSTRUCTOR QUOTE:
 * "But React Router will actually check if a promise is returned and
 * automatically get the resolved data from that promise for you."
 *
 * INSTRUCTOR QUOTE:
 * "So you don't need to worry about whether you are returning a promise
 * here or not, you will always get the final data that would be yielded
 * by the promise with help of use loader data."
 *
 * ============================================================================
 * THE RESULT - CLEANER CODE (Lesson 362)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And therefore now it's this events object, this array of events, which
 * we can pass as a value to this events prop on events list."
 *
 * INSTRUCTOR QUOTE:
 * "If we save that all, you will see that we got the same result as before,
 * we got this list of events, in this case only one event, but if we had
 * multiple events returned by the backend, we would see multiple events here."
 *
 * BENEFITS (Lesson 362):
 * ======================
 * INSTRUCTOR QUOTE:
 * "And of course that's much less code than what we had before, and it's
 * also not part of the component function, which makes the component function
 * way leaner and easier to reason about."
 *
 * INSTRUCTOR QUOTE:
 * "Of course, we're also not managing any loading or error estate yet, but
 * nonetheless we got a way leaner events page component and that's definitely
 * a decent improvement over what we had before."
 *
 * ============================================================================
 * CODE COMPARISON
 * ============================================================================
 *
 * BEFORE (Traditional useEffect approach - ~50 lines):
 * ====================================================
 * - 3 useState hooks (isLoading, fetchedEvents, error)
 * - useEffect with async function
 * - Conditional rendering for loading/error/data states
 * - Complex JSX with multiple conditions
 *
 * AFTER (useLoaderData approach - ~5 lines):
 * ==========================================
 * - 1 hook call: useLoaderData()
 * - Simple JSX returning EventsList with data
 * - No state management in component
 * - Data fetching handled by route loader
 *
 * ============================================================================
 * DATA FLOW WITH useLoaderData
 * ============================================================================
 *
 * 1. User navigates to /events
 * 2. React Router sees this route has a `loader` property
 * 3. Loader function is called (fetch happens)
 * 4. Loader returns data (resData.events)
 * 5. React Router stores this data
 * 6. Component renders
 * 7. useLoaderData() retrieves the stored data
 * 8. EventsList receives the events and displays them
 *
 * ============================================================================
 */
import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

/**
 * EVENTS PAGE COMPONENT (Lesson 362):
 * ====================================
 * Dramatically simplified compared to the traditional approach!
 *
 * NO MORE:
 * - useState for loading, error, data
 * - useEffect for triggering fetch
 * - Conditional rendering for different states
 *
 * JUST:
 * - Call useLoaderData() to get the data
 * - Pass it to the child component
 *
 * The loader in App.jsx handles all the data fetching.
 */
function EventsPage() {
  /**
   * useLoaderData HOOK (Lesson 362):
   * ================================
   * This hook returns whatever was returned by the loader function
   * defined for this route in App.jsx.
   *
   * INSTRUCTOR QUOTE:
   * "This is a special hook which we can execute to get access to the
   * closest loader data."
   *
   * In our case, the loader returns `resData.events` which is an array
   * of event objects from the backend API.
   *
   * PROMISE HANDLING:
   * =================
   * INSTRUCTOR QUOTE:
   * "But React Router will actually check if a promise is returned and
   * automatically get the resolved data from that promise for you."
   *
   * So even though the async loader returns a Promise, we get the
   * resolved value here - no need for .then() or await.
   */
  const events = useLoaderData();

  /**
   * SIMPLIFIED RETURN (Lesson 362):
   * ===============================
   * INSTRUCTOR QUOTE:
   * "Of course, we also get rid of these checks here therefore and just
   * return events list like that."
   *
   * No more conditional rendering for:
   * - {isLoading && <p>Loading...</p>}
   * - {error && <p>{error}</p>}
   * - {!isLoading && fetchedEvents && <EventsList ... />}
   *
   * Just return the EventsList with the data we got from the loader.
   * Loading and error states will be handled differently (future lessons).
   */
  return <EventsList events={events} />;
}

export default EventsPage;

/**
 * ============================================================================
 * SUMMARY: WHY THIS IS BETTER (Lesson 362)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And of course that's much less code than what we had before, and it's
 * also not part of the component function, which makes the component
 * function way leaner and easier to reason about."
 *
 * BENEFITS:
 * =========
 * 1. Component only focuses on RENDERING, not data fetching
 * 2. Data fetching logic is in the route definition (App.jsx)
 * 3. Separation of concerns: loading logic vs presentation logic
 * 4. Much easier to test - component just needs data passed in
 * 5. Data is available BEFORE component renders
 *
 * REMAINING QUESTIONS (for future lessons):
 * ==========================================
 * - How to show loading state while loader is running?
 * - How to handle errors from the loader?
 * - How to access loader data in nested components?
 *
 * ============================================================================
 */
