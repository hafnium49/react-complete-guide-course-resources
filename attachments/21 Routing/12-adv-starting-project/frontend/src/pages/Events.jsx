/**
 * ============================================================================
 * EVENTS PAGE COMPONENT (Lessons 361-371, 381 - Loaders + Deferred Loading)
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
 * Lesson 367: Returning Response objects from loaders
 * Lesson 368: What you CAN and CANNOT do in loaders
 * Lesson 369: Error handling with loaders - throwing Error objects
 * Lesson 370: Throwing Response objects for better error handling
 * Lesson 371: The json() utility function for simpler responses
 * Lesson 381: Deferred loading with defer, Await, and Suspense (CURRENT)
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
/**
 * ============================================================================
 * IMPORTS (Lessons 362, 371, 381)
 * ============================================================================
 *
 * useLoaderData (Lesson 362):
 * ===========================
 * Hook to access data returned by the route's loader function.
 *
 * json (Lesson 371):
 * ==================
 * INSTRUCTOR QUOTE:
 * "Now, constructing responses manually like this is possible, but a bit
 * annoying. That's why React router gives you a little helper, utility."
 *
 * INSTRUCTOR QUOTE:
 * "And json is a function that can be imported from react-router-dom."
 *
 * INSTRUCTOR QUOTE:
 * "Now json is a function that creates a response object that includes
 * data in the json format."
 *
 * The json() function simplifies creating Response objects:
 * - Automatically converts objects to JSON (no JSON.stringify needed)
 * - Automatically parses JSON when reading (no JSON.parse needed)
 * - Cleaner, more readable code
 *
 * ============================================================================
 * LESSON 381: DEFERRED LOADING IMPORTS
 * ============================================================================
 *
 * defer (Lesson 381):
 * ===================
 * INSTRUCTOR QUOTE:
 * "And that's where we can defer loading and tell React router that we
 * actually wanna render a component already even though the data is not
 * fully there yet."
 *
 * INSTRUCTOR QUOTE:
 * "In the loader I now don't want to await this promise here. Instead here
 * I can actually get rid of this async keyword and use a special function
 * in this loader function. The defer function which should be imported
 * from react-router-dom."
 *
 * Await (Lesson 381):
 * ===================
 * INSTRUCTOR QUOTE:
 * "Instead what we do in here is we return another component provided by
 * react-router-dom and that's the await component."
 *
 * INSTRUCTOR QUOTE:
 * "And await has a special resolve prop which wants one of our deferred
 * values as a value."
 */
import { useLoaderData, defer, Await } from 'react-router-dom';
/**
 * Suspense (Lesson 381):
 * ======================
 * INSTRUCTOR QUOTE:
 * "As a last step, we have to add another component that must be wrapped
 * around the await component. And that's the suspense component which is
 * imported from React. So not from React router but from React."
 *
 * INSTRUCTOR QUOTE:
 * "The suspense component is a component which can be used in certain
 * situations to show a fallback whilst we're waiting for other data to arrive."
 *
 * INSTRUCTOR QUOTE:
 * "We'll see it again later in the course in a totally different scenario
 * not related to Routing but here it is a component that's supported and
 * used by React router and by the await component to show a fallback whilst
 * we're waiting for these events to be fetched."
 */
import { Suspense } from 'react';

import EventsList from '../components/EventsList';

/**
 * EVENTS PAGE COMPONENT (Lessons 362, 381):
 * =========================================
 * Dramatically simplified compared to the traditional approach!
 *
 * LESSON 381 UPDATE - DEFERRED LOADING:
 * =====================================
 * INSTRUCTOR QUOTE:
 * "But sometimes you wanna load this page before the data is there and show
 * parts of the page already until all the data is there."
 *
 * INSTRUCTOR QUOTE:
 * "For example, here it would make sense to show these buttons already, the
 * all events and new event buttons, even if the list of events hasn't been
 * loaded yet. But at the moment we don't see anything until the events are
 * there."
 *
 * INSTRUCTOR QUOTE:
 * "And that's where we can defer loading and tell React router that we
 * actually wanna render a component already even though the data is not
 * fully there yet."
 *
 * The component now uses:
 * - Suspense: Shows a fallback while waiting for data
 * - Await: Waits for the deferred promise to resolve
 * - A render function inside Await that receives the loaded data
 */
function EventsPage() {
  /**
   * useLoaderData WITH DEFERRED DATA (Lesson 381):
   * ==============================================
   * INSTRUCTOR QUOTE:
   * "We still use useLoaderData here. We still do that. But this data will
   * now actually be an object that gives us access to these deferred value
   * keys here."
   *
   * When using defer, useLoaderData returns an object with keys matching
   * what we passed to defer(). In our case: { events: Promise }
   *
   * INSTRUCTOR QUOTE:
   * "So this data object here will have the keys we set in this object that
   * we pass to defer. And that events key will, in the end, hold a promise
   * as a value."
   */
  const { events } = useLoaderData();

  /**
   * ============================================================================
   * LESSON 381: SUSPENSE + AWAIT PATTERN FOR DEFERRED DATA
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now this is not everything we have to do though. Instead now, as our next
   * step, we have to go to the component where we want to use the deferred
   * data."
   *
   * INSTRUCTOR QUOTE:
   * "And here in this component we now don't directly render the component or
   * the JSX code that needs our data. Instead what we do in here is we return
   * another component provided by react-router-dom and that's the await
   * component."
   *
   * STRUCTURE:
   * ==========
   * <Suspense fallback={<LoadingUI />}>
   *   <Await resolve={promiseFromDefer}>
   *     {(resolvedData) => <ComponentThatNeedsData data={resolvedData} />}
   *   </Await>
   * </Suspense>
   *
   * HOW IT WORKS:
   * =============
   * 1. Component renders immediately (before data arrives)
   * 2. Suspense shows fallback ("Loading...") while Await waits
   * 3. Await's resolve prop receives the promise from defer
   * 4. Once promise resolves, Await calls the render function
   * 5. Render function receives the actual data
   * 6. EventsList renders with the loaded events
   *
   * ============================================================================
   */
  return (
    /**
     * SUSPENSE COMPONENT (Lesson 381):
     * ================================
     * INSTRUCTOR QUOTE:
     * "As a last step, we have to add another component that must be wrapped
     * around the await component. And that's the suspense component which is
     * imported from React."
     *
     * INSTRUCTOR QUOTE:
     * "The suspense component is a component which can be used in certain
     * situations to show a fallback whilst we're waiting for other data to arrive."
     *
     * INSTRUCTOR QUOTE:
     * "Here it is a component that's supported and used by React router and
     * by the await component to show a fallback whilst we're waiting for these
     * events to be fetched."
     *
     * THE FALLBACK PROP (Lesson 381):
     * ===============================
     * INSTRUCTOR QUOTE:
     * "So here the fallback which I do wanna show is actually a paragraph where
     * I say loading. And I will add some inline style here, quick and thoroughly,
     * to set the text alignment to center."
     */
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      {/**
       * AWAIT COMPONENT (Lesson 381):
       * =============================
       * INSTRUCTOR QUOTE:
       * "Instead what we do in here is we return another component provided by
       * react-router-dom and that's the await component."
       *
       * INSTRUCTOR QUOTE:
       * "And await has a special resolve prop which wants one of our deferred
       * values as a value."
       *
       * THE resolve PROP (Lesson 381):
       * ==============================
       * INSTRUCTOR QUOTE:
       * "So here on this data object we know that we have an events key because
       * that's what we set here. So this data object here will have the keys we
       * set in this object that we pass to defer."
       *
       * INSTRUCTOR QUOTE:
       * "And that events key will, in the end, hold a promise as a value. So
       * it's kind of that promise which we wanna pass to this resolve value
       * of the await component."
       */}
      <Await resolve={events}>
        {/**
         * RENDER FUNCTION PATTERN (Lesson 381):
         * =====================================
         * INSTRUCTOR QUOTE:
         * "Now that await component will wait for that data to be there. And
         * then between the opening and closing tags, we output a dynamic value
         * which must be a function that will be executed by a React router once
         * that data is there."
         *
         * INSTRUCTOR QUOTE:
         * "So once that promise resolved. Once we have that data. So here we,
         * therefore, get our events in the end. Our loaded events if we want
         * to call it like this."
         *
         * INSTRUCTOR QUOTE:
         * "Again, this function will be called by React router once the data
         * is there. And it's therefore now here where we wanna output our
         * events list and pass these loaded events as a value for the events
         * prop."
         *
         * WHAT loadedEvents CONTAINS:
         * ===========================
         * The loadedEvents parameter is the RESOLVED value of the promise.
         * Since loadEvents() returns resData.events (an array of events),
         * loadedEvents will be that array directly.
         */}
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
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
 * LESSON 367: RETURNING RESPONSE OBJECTS FROM LOADERS
 * ============================================================================
 *
 * LOADERS CAN RETURN ANY DATA (Lesson 367):
 * =========================================
 * INSTRUCTOR QUOTE:
 * "Now, one important aspect of a loader is to understand that you can return
 * any kind of data in that loader. Here, I'm returning this events property,
 * or the values stored in the events property of my response data, and in
 * this case, it will actually be an array that I return. But we could return
 * a number, some text, an object, whatever you want."
 *
 * RESPONSE OBJECTS (Lesson 367):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "And what you can also return is a response object."
 *
 * BROWSER'S BUILT-IN RESPONSE CONSTRUCTOR (Lesson 367):
 * =====================================================
 * INSTRUCTOR QUOTE:
 * "Well, in the browser you can create a new response object, which I'll name
 * res, here, by instantiating the built-in response constructor function.
 * Now this is built into the browser. This is a modern browser feature."
 *
 * Example of creating a custom Response:
 * const res = new Response(someData, { status: 200 });
 *
 * CRITICAL CONCEPT - LOADER CODE RUNS IN BROWSER (Lesson 367):
 * ============================================================
 * INSTRUCTOR QUOTE:
 * "Now what's really important to understand at this point is that this loader
 * code will not execute on a server. This is still all happening in the browser
 * here, even though it's not in a component it's still in the browser. This is
 * still client-side code. That's really important."
 *
 * REACT ROUTER AUTO-EXTRACTS RESPONSE DATA (Lesson 367):
 * ======================================================
 * INSTRUCTOR QUOTE:
 * "Whenever you return such a response in your loaders, the React Router
 * package will automatically extract the data from your response when using
 * useLoaderData. So the data returned by useLoaderData will still be the
 * response data that was part of the response you returned in your loader."
 *
 * WHY THIS IS USEFUL (Lesson 367):
 * ================================
 * INSTRUCTOR QUOTE:
 * "This feature exists because it's quite common that in this loader function,
 * you reach out to some backend with the browser's built-in fetch function.
 * And this fetch function actually returns a promise that resolves to a response."
 *
 * INSTRUCTOR QUOTE:
 * "Combined with React Router's support for these response objects and its
 * automatic data extraction, that simply means that you can, in the end, take
 * that response, which you get here, so this response object, and return that
 * in your loader. You don't need to manually extract the data from the response."
 *
 * CODE COMPARISON (Lesson 367):
 * =============================
 *
 * BEFORE (manual extraction):
 * ---------------------------
 * export async function loader() {
 *   const response = await fetch('http://localhost:8080/events');
 *   if (!response.ok) { ... }
 *   const resData = await response.json();  // Manual extraction
 *   return resData.events;                   // Return just the events
 * }
 *
 * AFTER (return Response directly):
 * ---------------------------------
 * export async function loader() {
 *   const response = await fetch('http://localhost:8080/events');
 *   if (!response.ok) { ... }
 *   return response;  // Return the Response object directly!
 * }
 *
 * BENEFITS OF RETURNING RESPONSE (Lesson 367):
 * ============================================
 * INSTRUCTOR QUOTE:
 * "But with that, we can reduce our loader code and leverage this built-in
 * support for response objects. And that's why I also wanted to mention that
 * this special kind of return object is supported by React Router and its
 * loader functions."
 *
 * 1. Less code - no need to call .json() manually
 * 2. Cleaner loaders - just fetch and return
 * 3. React Router handles the data extraction
 * 4. Works seamlessly with the Fetch API
 *
 * IMPORTANT - EXTRACT DATA IN COMPONENT (Lesson 367):
 * ===================================================
 * INSTRUCTOR QUOTE:
 * "I just have to make sure that I do extract my events from that data object
 * which I get here because that is actually an object with an events key."
 *
 * Since we return the full response (which contains { events: [...] }),
 * the component must now use: data.events instead of just events
 *
 * ============================================================================
 * LESSON 368: WHAT YOU CAN AND CANNOT DO IN LOADERS
 * ============================================================================
 *
 * KEY REMINDER (Lesson 368):
 * ==========================
 * INSTRUCTOR QUOTE:
 * "This might look like backend code. It might look like it's decoupled from
 * the React application, and it kind of is. But as mentioned before, this code
 * that's defined in the loader, executes in the browser, not on some server."
 *
 * WHAT YOU CAN DO IN LOADERS (Lesson 368):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "And I'm highlighting this because that, of course, means that you can use
 * any browser APIs in your loader functions."
 *
 * ✅ ALLOWED - Browser APIs:
 * --------------------------
 * INSTRUCTOR QUOTE:
 * "You can, for example, access local storage here. You can access cookies here.
 * You can do anything you can do in the other JavaScript code as well."
 *
 * Examples of what you CAN do in loaders:
 *
 * 1. localStorage:
 *    const token = localStorage.getItem('authToken');
 *    if (!token) { return redirect('/login'); }
 *
 * 2. cookies:
 *    const cookies = document.cookie;
 *
 * 3. sessionStorage:
 *    const sessionData = sessionStorage.getItem('userData');
 *
 * 4. fetch() / XMLHttpRequest:
 *    const response = await fetch('/api/data');
 *
 * 5. URL manipulation:
 *    const url = new URL(window.location.href);
 *
 * 6. navigator APIs:
 *    const isOnline = navigator.onLine;
 *
 * 7. Any standard JavaScript:
 *    Arrays, Objects, Date, Math, etc.
 *
 * WHAT YOU CANNOT DO IN LOADERS (Lesson 368):
 * ===========================================
 * INSTRUCTOR QUOTE:
 * "What you can't do in your loader function is, for example, use React Hooks
 * like useState. That does not work because those Hooks are only available in
 * React components and the loader function is not a React component."
 *
 * ❌ NOT ALLOWED - React Hooks:
 * -----------------------------
 * These will NOT work in loaders:
 *
 * export async function loader() {
 *   const [state, setState] = useState();  // ❌ ERROR!
 *   const data = useContext(SomeContext);  // ❌ ERROR!
 *   useEffect(() => {});                   // ❌ ERROR!
 *   const ref = useRef();                  // ❌ ERROR!
 * }
 *
 * WHY HOOKS DON'T WORK (Lesson 368):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "That does not work because those Hooks are only available in React components
 * and the loader function is not a React component."
 *
 * Loaders are:
 * - Regular JavaScript functions
 * - Called by React Router, not by React
 * - Executed before the component renders
 * - Not part of the React component tree
 *
 * THE ONLY LIMITATION (Lesson 368):
 * =================================
 * INSTRUCTOR QUOTE:
 * "But that's the only limitation. Any other default browser features can be
 * used in loader functions."
 *
 * SUMMARY TABLE:
 * ==============
 * | Feature                | Can Use in Loader? |
 * |------------------------|-------------------|
 * | fetch()                | ✅ YES            |
 * | localStorage           | ✅ YES            |
 * | sessionStorage         | ✅ YES            |
 * | document.cookie        | ✅ YES            |
 * | window.location        | ✅ YES            |
 * | navigator              | ✅ YES            |
 * | URL, URLSearchParams   | ✅ YES            |
 * | JSON, Date, Math       | ✅ YES            |
 * | useState               | ❌ NO             |
 * | useEffect              | ❌ NO             |
 * | useContext             | ❌ NO             |
 * | useRef                 | ❌ NO             |
 * | Any React Hook         | ❌ NO             |
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * LESSON 381: HELPER FUNCTION FOR DEFERRED LOADING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In order to defer loading that, what we need to do here is we need to grab
 * that code here and outsource it into a separate function, an async function,
 * which I'll name load events."
 *
 * INSTRUCTOR QUOTE:
 * "And then I put my code in there. So it's almost the same code as before.
 * Just wrapped into a separate function."
 *
 * WHY A SEPARATE FUNCTION? (Lesson 381):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "I'm doing this because in the loader I now don't want to await this promise
 * here."
 *
 * The defer() function needs a PROMISE (not resolved data) to work with.
 * By putting the fetch logic in a separate async function:
 * - The function returns a Promise when called
 * - We can pass that Promise to defer() WITHOUT awaiting it
 * - React Router will handle the promise resolution via Await component
 *
 * WHY IT MUST RETURN A PROMISE (Lesson 381):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "Now we must have a promise here. If we wouldn't have a promise there would
 * be nothing to defer because the idea behind defer is that we have a value
 * that will eventually resolve to another value, which is the definition of
 * a promise."
 *
 * INSTRUCTOR QUOTE:
 * "And that we wanna load a component and render a component even though that
 * future value isn't there yet."
 *
 * INSTRUCTOR QUOTE:
 * "So load events returns a promise. It must return a promise and it does."
 */
async function loadEvents() {
  /**
   * FETCH EVENTS FROM BACKEND:
   * ==========================
   * Same fetch logic as before, but now inside a helper function.
   */
  const response = await fetch('http://localhost:8080/events');

  /**
   * ERROR HANDLING:
   * ===============
   * Still throw errors for non-OK responses.
   */
  if (!response.ok) {
    throw Response.json(
      { message: 'Could not fetch events.' },
      { status: 500 }
    );
  }

  /**
   * ============================================================================
   * IMPORTANT CHANGE FOR DEFER (Lesson 381):
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now I'm getting this error because in my load events helper function I'm
   * still returning the response. And whilst this did work before, where this
   * was the value that was received directly by use loader data, this does not
   * work anymore if we have this, the first step, in between."
   *
   * INSTRUCTOR QUOTE:
   * "What I have to do instead is I have to manually parse that here. So here
   * I got my response data by awaiting for response dot JSON and then here I
   * return resdata dot events in this load events helper function."
   *
   * INSTRUCTOR QUOTE:
   * "That's required because we have just the first step between our loader
   * and use loader data."
   *
   * WHY THIS CHANGE IS NEEDED:
   * ==========================
   * BEFORE (without defer):
   * - Loader returned response directly
   * - React Router auto-parsed the response
   * - useLoaderData received: { events: [...] }
   *
   * AFTER (with defer):
   * - defer() wraps the promise, not the response
   * - The parsing needs to happen INSIDE the promise
   * - loadEvents must return the actual events array
   * - Await component receives the resolved events array
   */
  const resData = await response.json();
  return resData.events;
}

/**
 * ============================================================================
 * EXPORTED LOADER FUNCTION WITH defer (Lessons 364, 367, 368, 381):
 * ============================================================================
 *
 * LESSON 381 UPDATE - USING defer:
 * ================================
 * INSTRUCTOR QUOTE:
 * "In the loader I now don't want to await this promise here. Instead here I
 * can actually get rid of this async keyword and use a special function in
 * this loader function. The defer function which should be imported from
 * react-router-dom."
 *
 * NOTICE: NO async KEYWORD (Lesson 381):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "Instead here I can actually get rid of this async keyword."
 *
 * The loader is no longer async because we're NOT awaiting the data.
 * We're just passing a promise to defer() and returning immediately.
 */
export function loader() {
  /**
   * ============================================================================
   * LESSON 381: THE defer() FUNCTION
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "This defer function. Now defer is a function that must be executed and
   * Q defer we pass an object."
   *
   * INSTRUCTOR QUOTE:
   * "Now in this object, we in the end, bundle all the different HTTP requests
   * we might have going on on this page. In this case it's only one request
   * though. The request for all my events."
   *
   * THE OBJECT STRUCTURE (Lesson 381):
   * ==================================
   * INSTRUCTOR QUOTE:
   * "I'll give that request a key of events. For example, though that key is
   * up to you."
   *
   * INSTRUCTOR QUOTE:
   * "And then here I'll point at load events. I'll actually not just point at
   * it instead I will execute it. So I add parentheses here."
   *
   * IMPORTANT - EXECUTE THE FUNCTION (Lesson 381):
   * ==============================================
   * INSTRUCTOR QUOTE:
   * "So I execute the load events function and I stored a value returned by
   * load events which is a promise, since this is a async function, in this
   * object under the events key."
   *
   * WHY WE CALL loadEvents() NOT JUST REFERENCE IT:
   * ================================================
   * - loadEvents is an async function
   * - Calling loadEvents() STARTS the async operation
   * - It IMMEDIATELY returns a Promise (before the fetch completes)
   * - That Promise is stored under the 'events' key
   * - React Router will use Await to wait for the Promise to resolve
   *
   * HOW defer() WORKS:
   * ==================
   * defer({
   *   events: loadEvents(),  // Promise that will resolve to events array
   *   // You can add more keys for multiple requests:
   *   // users: loadUsers(),
   *   // settings: loadSettings(),
   * })
   *
   * INSTRUCTOR QUOTE:
   * "And it's now this value returned by defer which we return in our loader."
   *
   * BENEFITS OF defer (Lesson 381):
   * ===============================
   * INSTRUCTOR QUOTE:
   * "And that's this defer feature in action. And this defer feature can speed
   * up your pages and make sure that you're already showing some content whilst
   * you're waiting for other content."
   *
   * INSTRUCTOR QUOTE:
   * "It especially shines if you have pages with multiple HTTP requests with
   * different speeds, though."
   *
   * PERFECT USE CASES FOR defer:
   * ============================
   * - Pages with multiple data requirements
   * - Fast navigation with slow data fetching
   * - Show UI skeleton while loading
   * - Progressive data loading (critical data first)
   */
  return defer({
    events: loadEvents(),
  });
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
