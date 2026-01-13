/**
 * ============================================================================
 * EVENTS PAGE COMPONENT (Lessons 361-366 - Loaders, useLoaderData, Navigation)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 361: Showed traditional useEffect approach and its problems
 * Lesson 362: Refactored to use useLoaderData for cleaner code
 * Lesson 363: Explored where useLoaderData can/cannot be used
 * Lesson 364: Moved loader function from App.jsx to this file
 * Lesson 365: Explained WHEN loaders execute (on navigation start)
 * Lesson 366: Introduced useNavigation hook for loading state (see Root.jsx)
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
 * LESSON 364: STORING LOADERS IN COMPONENT FILES
 * ============================================================================
 *
 * WHY MOVE THE LOADER? (Lesson 364):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "Now we got a pretty lean events page component, but one thing I wanna do
 * before we move on is I wanna restructure where we put that loader code."
 *
 * INSTRUCTOR QUOTE:
 * "Now there's nothing wrong with putting this code here, by the way, but a
 * common pattern and a recommendation if you wanna call it like that, is that
 * you do actually put that loader code here into your component file where you
 * need it."
 *
 * WHERE TO PUT THE LOADER (Lesson 364):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "In this case, that's the events.js file in the pages folder. And here we
 * can simply export a function which we could name loader for example."
 *
 * NAMING CONVENTION (Lesson 364):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "Well, there is a loader function already, the load or property wants a
 * function, but actually you could name this function anything you want."
 *
 * INSTRUCTOR QUOTE:
 * "It doesn't have to be named loader, but this is a name you will see
 * commonly, which is why I'm using this name here."
 *
 * THE FUNCTION CODE (Lesson 364):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "And then it's this loader function here which should hold that code that
 * we currently have in App.js for this loader property. So cut the code and
 * put it in here."
 *
 * IMPORTING IN App.jsx (Lesson 364):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "Then back in app.js, we can simply import that loader here and give it an
 * LES like events loader from that file where I define this loader function."
 *
 * USING THE IMPORTED LOADER (Lesson 364):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "So I import it from dot slash pages slash events, and then we just use
 * events loader which is that pointer at that function and use that as a
 * value for this loader property here."
 *
 * WHY USE AN ALIAS? (Lesson 364):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "You're not forced to use an alias, but as your application grows, you might
 * have loaders in different files, and different files might export something
 * named loader. Hence assigning unique aliases helps you differentiate between
 * these different loaders. And here we have only one, so it's not a problem,
 * but it's a good practice."
 *
 * MULTIPLE LOADERS PATTERN:
 * =========================
 * When you have many routes with loaders, each page file exports its own
 * loader function:
 *
 * // Events.jsx exports: loader (imported as eventsLoader)
 * // EventDetail.jsx exports: loader (imported as eventDetailLoader)
 * // NewEvent.jsx exports: loader (imported as newEventLoader)
 *
 * This keeps related code together and makes App.jsx cleaner.
 *
 * ============================================================================
 * LESSON 365: WHEN DOES THE LOADER EXECUTE?
 * ============================================================================
 *
 * KEY CONCEPT (Lesson 365):
 * =========================
 * INSTRUCTOR QUOTE:
 * "The loader for a page will be called right when we start navigating to that
 * page. So not after the page component has been rendered, but before we
 * actually go there."
 *
 * TIMING COMPARISON:
 * ==================
 *
 * TRADITIONAL useEffect APPROACH:
 * -------------------------------
 * 1. User clicks link to /events
 * 2. Navigation happens IMMEDIATELY
 * 3. EventsPage component renders (without data)
 * 4. useEffect runs after render
 * 5. Fetch starts
 * 6. Component shows "Loading..." state
 * 7. Fetch completes
 * 8. Component re-renders with data
 *
 * LOADER APPROACH (React Router):
 * -------------------------------
 * 1. User clicks link to /events
 * 2. Loader function starts executing (fetch begins)
 * 3. User waits on current page (navigation paused)
 * 4. Fetch completes
 * 5. Navigation happens
 * 6. EventsPage component renders WITH data already available
 *
 * DEMONSTRATION (Lesson 365):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "And you can see that that's the case if you go to the backend API, and
 * there to routes, events.js, and here this very first route... we can do
 * here, between this 'const events' line and the 'res.json' line, is that
 * we add a timeout."
 *
 * INSTRUCTOR QUOTE:
 * "If we now go to the homepage and click on 'events'. And you will see that
 * at first nothing happens, and only after one and a half seconds we go there.
 * So here I click, and now we wait. And now we go there."
 *
 * ADVANTAGES (Lesson 365):
 * ========================
 * INSTRUCTOR QUOTE:
 * "The advantage of this approach is that you can rely on the data being there
 * once the events page component is being rendered. You don't need to worry
 * about whether the data is there yet or not and therefore you don't need to
 * render a loading state on this event's page component."
 *
 * This is why EventsPage is so simple - it doesn't need:
 * - Loading state management
 * - Conditional rendering for loading/error/data states
 * - The data is GUARANTEED to be available
 *
 * DISADVANTAGES (Lesson 365):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "The downside, of course, is that we have this delay where it looks to the
 * user as if nothing is happening."
 *
 * From the user's perspective:
 * - They click "Events"
 * - Nothing visible happens
 * - They might think the app is broken
 * - After the delay, they suddenly see the new page
 *
 * SOLUTIONS (Lesson 365):
 * =======================
 * INSTRUCTOR QUOTE:
 * "And we'll see how we can improve this user experience in a couple of
 * seconds, and actually also later, again, towards the end of the section
 * because React Router gives us various tools for improving that user
 * experience."
 *
 * Coming in future lessons:
 * - useNavigation hook (shows loading indicator during navigation)
 * - Deferred data loading
 * - Suspense integration
 *
 * ============================================================================
 */

/**
 * EXPORTED LOADER FUNCTION (Lesson 364):
 * ======================================
 * This is the loader function that was previously defined inline in App.jsx.
 *
 * INSTRUCTOR QUOTE:
 * "In this case, that's the events.js file in the pages folder. And here we
 * can simply export a function which we could name loader for example."
 *
 * INSTRUCTOR QUOTE:
 * "And then it's this loader function here which should hold that code that
 * we currently have in App.js for this loader property."
 *
 * This function:
 * 1. Is executed by React Router BEFORE EventsPage renders
 * 2. Fetches events data from the backend API
 * 3. Returns the events array for useLoaderData() to access
 *
 * BENEFITS OF THIS PATTERN:
 * =========================
 * 1. Keeps data fetching logic close to the component that uses it
 * 2. Makes App.jsx cleaner (just imports and route definitions)
 * 3. Easier to find and maintain loader code
 * 4. Each page can manage its own data requirements
 */
export async function loader() {
  /**
   * FETCH EVENTS FROM BACKEND:
   * ==========================
   * Same fetch call as before, just moved from App.jsx to here.
   */
  const response = await fetch('http://localhost:8080/events');

  /**
   * ERROR HANDLING (placeholder):
   * =============================
   * Error handling will be covered in later lessons.
   * For now, we assume the request succeeds.
   */
  if (!response.ok) {
    // Error handling will be covered in later lessons
  } else {
    /**
     * RETURN EVENTS DATA:
     * ===================
     * The backend returns { events: [...] }, so we extract
     * resData.events to return just the array.
     *
     * This is what useLoaderData() will receive in EventsPage.
     */
    const resData = await response.json();
    return resData.events;
  }
}

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
 * ============================================================================
 * LESSON 363: LOADER DATA SCOPE
 * ============================================================================
 *
 * WHERE CAN useLoaderData BE USED? (Lesson 363):
 * ==============================================
 * INSTRUCTOR QUOTE:
 * "You can access loaded data with help of useLoaderData in any component
 * on the same level or lower level than the component where you added the
 * loader, so the route on which you added the loader."
 *
 * ✅ WORKS: EventsPage (this component - same level as loader)
 * ✅ WORKS: EventsList (child component - lower level)
 * ❌ FAILS: RootLayout (parent route - higher level, returns undefined)
 * ❌ FAILS: EventsRootLayout (parent route - higher level)
 *
 * INSTRUCTOR QUOTE:
 * "You just have to be careful that you're not accidentally using
 * useLoaderData on a higher level than you're fetching the data."
 *
 * ALTERNATIVE APPROACHES (Lesson 363):
 * ====================================
 * 1. Use useLoaderData HERE and pass as props (CURRENT APPROACH)
 *    - More explicit data flow
 *    - EventsList is reusable
 *
 * 2. Use useLoaderData directly in EventsList
 *    - Works because EventsList is lower level
 *    - Couples EventsList to React Router
 *
 * INSTRUCTOR QUOTE:
 * "Ultimately, it's up to you."
 *
 * REMAINING QUESTIONS (for future lessons):
 * ==========================================
 * - How to show loading state while loader is running?
 * - How to handle errors from the loader?
 *
 * ============================================================================
 */
