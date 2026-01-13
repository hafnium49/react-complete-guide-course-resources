/**
 * ============================================================================
 * EVENTS PAGE COMPONENT (Lessons 361-368 - Loaders, useLoaderData, Browser APIs)
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
 * Lesson 368: What you CAN and CANNOT do in loaders (CURRENT)
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
   * useLoaderData HOOK (Lessons 362, 367):
   * ======================================
   * This hook returns whatever was returned by the loader function
   * defined for this route in App.jsx.
   *
   * INSTRUCTOR QUOTE (Lesson 362):
   * "This is a special hook which we can execute to get access to the
   * closest loader data."
   *
   * RESPONSE OBJECT SUPPORT (Lesson 367):
   * =====================================
   * INSTRUCTOR QUOTE:
   * "Whenever you return such a response in your loaders, the React Router
   * package will automatically extract the data from your response when
   * using useLoaderData."
   *
   * Since we now return the response directly from the loader (Lesson 367),
   * useLoaderData automatically extracts the JSON data from it.
   * The extracted data is an object with an `events` key: { events: [...] }
   *
   * INSTRUCTOR QUOTE:
   * "I just have to make sure that I do extract my events from that data
   * object which I get here because that is actually an object with an
   * events key."
   *
   * PROMISE HANDLING (Lesson 362):
   * ==============================
   * INSTRUCTOR QUOTE:
   * "But React Router will actually check if a promise is returned and
   * automatically get the resolved data from that promise for you."
   */
  const data = useLoaderData();

  /**
   * EXTRACTING EVENTS FROM DATA (Lesson 367):
   * =========================================
   * Since we now return the full Response object from our loader,
   * useLoaderData gives us the parsed JSON: { events: [...] }
   *
   * We extract the events array to pass to EventsList.
   *
   * INSTRUCTOR QUOTE:
   * "I just have to make sure that I do extract my events from that data
   * object which I get here because that is actually an object with an
   * events key, just as I extracted events from the response data in my
   * loader a couple of seconds ago."
   */
  return <EventsList events={data.events} />;
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
 * EXPORTED LOADER FUNCTION (Lessons 364, 367, 368):
 * ============================================
 * This is the loader function that was previously defined inline in App.jsx.
 *
 * INSTRUCTOR QUOTE (Lesson 364):
 * "In this case, that's the events.js file in the pages folder. And here we
 * can simply export a function which we could name loader for example."
 *
 * This function:
 * 1. Is executed by React Router BEFORE EventsPage renders
 * 2. Fetches events data from the backend API
 * 3. Returns the Response object directly (Lesson 367)
 *
 * BENEFITS OF THIS PATTERN:
 * =========================
 * 1. Keeps data fetching logic close to the component that uses it
 * 2. Makes App.jsx cleaner (just imports and route definitions)
 * 3. Easier to find and maintain loader code
 * 4. Each page can manage its own data requirements
 * 5. Less code by returning Response directly (Lesson 367)
 */
export async function loader() {
  /**
   * FETCH EVENTS FROM BACKEND:
   * ==========================
   * The fetch() function returns a Promise that resolves to a Response object.
   *
   * INSTRUCTOR QUOTE (Lesson 367):
   * "It's quite common that in this loader function, you reach out to some
   * backend with the browser's built-in fetch function. And this fetch function
   * actually returns a promise that resolves to a response."
   */
  const response = await fetch('http://localhost:8080/events');

  /**
   * ERROR HANDLING (placeholder):
   * =============================
   * INSTRUCTOR QUOTE (Lesson 367):
   * "You can return your response like this, with or without checking whether
   * it's okay, that is up to you and I'll get back to error handling in a
   * couple of minutes."
   *
   * Error handling will be covered in later lessons.
   */
  if (!response.ok) {
    // Error handling will be covered in later lessons
  }

  /**
   * RETURN RESPONSE DIRECTLY (Lesson 367):
   * ======================================
   * INSTRUCTOR QUOTE:
   * "Instead, you can return your response like this... and useLoaderData
   * will then automatically give us the data that's part of the response."
   *
   * INSTRUCTOR QUOTE:
   * "But with that, we can reduce our loader code and leverage this built-in
   * support for response objects."
   *
   * React Router will:
   * 1. Detect that we returned a Response object
   * 2. Automatically call .json() to extract the data
   * 3. Provide that data via useLoaderData()
   *
   * The component will receive: { events: [...] }
   */
  return response;
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
