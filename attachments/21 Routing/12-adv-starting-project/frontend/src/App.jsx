/**
 * ============================================================================
 * ADVANCED ROUTING PROJECT - APP COMPONENT (Lessons 358-375)
 * ============================================================================
 *
 * PROJECT OVERVIEW (Lesson 358):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "At this point, you already learned a lot about routing, and we had a thorough
 * look at all the key routing features you must know. Now, over the next lectures,
 * we're going to dive deeper into routing and explore more advanced routing
 * features, especially related to data fetching and submission."
 *
 * INSTRUCTOR QUOTE:
 * "But before we do so, it's time to practice what you learned."
 *
 * ============================================================================
 * PRACTICE CHALLENGE - TRY IT YOURSELF (Lesson 359)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, before we're actually going to dive into advanced features I want you
 * to practice what you learned up to this point, because it is super important
 * that you understand all these routing basics."
 *
 * INSTRUCTOR QUOTE:
 * "Therefore, in this 'react-frontend' folder in the 'src' folder, in the
 * 'App.js' file you'll find an exercise, a challenge with multiple steps,
 * with multiple tasks that you should complete."
 *
 * INSTRUCTOR QUOTE:
 * "And of course, these steps here will require you to use the knowledge you
 * gained over the previous lectures. You will need to install the react routers,
 * set up routing, set up some route definitions, add links, and much more."
 *
 * WHY PRACTICE? (Lesson 359):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "So, definitely go through these tasks, these instructions and then try to
 * solve all these tasks, all these challenges on your own."
 *
 * INSTRUCTOR QUOTE:
 * "In the next lecture, we'll of course solve them together but you definitely
 * should try it on your own first so that you get the most out of this course."
 *
 * ABOUT THE BONUS TASK (Lesson 359):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "By the way, the last step is a bonus task which you can theoretically solve,
 * but which requires you to do something we haven't done before. So, don't
 * worry if you're not able to complete this task."
 *
 * INSTRUCTOR QUOTE:
 * "You will of course also see the solution for that in the next lecture.
 * But definitely feel free to give it a try on your own first."
 *
 * ============================================================================
 * SOLUTION WALKTHROUGH (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So did you succeed? Let's now solve all these tasks together."
 *
 * ============================================================================
 * PROJECT STRUCTURE (Lesson 358)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now for that, you find the new project attached, and this project actually
 * includes two project folders: a backend-api and a react-frontend folder."
 *
 * PROJECT FOLDERS:
 * ================
 * | Folder     | Purpose                            | Technology      |
 * |------------|------------------------------------| --------------- |
 * | backend/   | Dummy API for data                 | Express.js      |
 * | frontend/  | React application (our focus)      | React + Vite    |
 *
 * ABOUT THE BACKEND (Lesson 358):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "This backend-api folder simply includes a dummy backend application that
 * does not contain any React code that will be used throughout this course
 * section so that we have a dummy backend to work with."
 *
 * INSTRUCTOR QUOTE:
 * "But you won't have to write any code in this backend-API folder. This is
 * provided for you. It's not related to React. And you can, of course, explore
 * that code, but you don't have to understand it. It's Node/Express code not
 * related to React."
 *
 * INSTRUCTOR QUOTE:
 * "But we will be able to send requests to that backend-api from inside our
 * React app."
 *
 * ABOUT THE FRONTEND (Lesson 358):
 * ================================
 * INSTRUCTOR QUOTE:
 * "Now, very important, in the react-frontend folder, you then find the React
 * app on which we'll work throughout this course section. You will see that
 * there I already added some components, which we'll use throughout this
 * section, in which you, of course, can explore."
 *
 * INSTRUCTOR QUOTE:
 * "In the end, these are all relatively straightforward components with some
 * default styling provided."
 *
 * ============================================================================
 * RUNNING THE PROJECT (Lesson 358)
 * ============================================================================
 *
 * IMPORTANT SETUP REQUIREMENTS (Lesson 358):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "Now, one important note right away, you will need to start this backend
 * server and this frontend server independent from each other."
 *
 * STEP 1 - BACKEND SETUP:
 * =======================
 * INSTRUCTOR QUOTE:
 * "So you will need to open your terminal and navigate into the backend-api
 * folder, initially run npm install there. And then run npm start to start
 * that backend server and keep that process running as long as you are
 * working on this overall project."
 *
 * Commands for backend (in terminal 1):
 * cd backend
 * npm install
 * npm start
 *
 * INSTRUCTOR QUOTE:
 * "You can, of course, then quit it thereafter with Control + C, but you
 * should always restart that backend server in the backend-api folder
 * whenever you wanna go back to working on that react-frontend, because
 * that frontend later must be able to talk to that backend. And for that,
 * the backend server must be up and running."
 *
 * STEP 2 - FRONTEND SETUP:
 * ========================
 * INSTRUCTOR QUOTE:
 * "And in a separate terminal window, you also must install all the
 * dependencies for the react-frontend application initially. And you,
 * of course, also must start the react-frontend dev server in order to
 * work on this React application."
 *
 * Commands for frontend (in terminal 2):
 * cd frontend
 * npm install
 * npm run dev
 *
 * BOTH SERVERS MUST RUN:
 * ======================
 * INSTRUCTOR QUOTE:
 * "So both servers, backend and frontend, should be up and running for
 * this course section."
 *
 * ============================================================================
 * COMPLETED TASKS SUMMARY (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that, we now did solve it together. We got all these challenges,
 * all these tasks here completed and solved. And now we're ready to dive
 * into some brand new, more advanced features."
 *
 * ============================================================================
 * ADVANCED ROUTING - DATA FETCHING WITH LOADERS (Lesson 361)
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
 * THE loader PROPERTY:
 * ====================
 * React Router 6+ introduces the `loader` property on route definitions.
 * This allows data fetching to happen BEFORE the component renders.
 *
 * BENEFITS OF LOADERS:
 * ====================
 * 1. No boilerplate state management (isLoading, error, data)
 * 2. Data fetching starts as soon as navigation begins
 * 3. Component renders WITH data already available
 * 4. Cleaner component code - no useEffect for data fetching
 *
 * INSTRUCTOR QUOTE:
 * "With React router at least if you're using version six or higher you don't
 * have to write all that code for fetching data and for handling these different
 * states. Instead, React router helps you with all of that."
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * TASK 2 SOLUTION - IMPORTING ROUTER COMPONENTS (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for that, I will now import something from react-router-dom. I will
 * import from react-router-dom, and I will import two things."
 *
 * RouterProvider (Lesson 360):
 * ============================
 * INSTRUCTOR QUOTE:
 * "The first thing is the RouterProvider component which will be needed to
 * apply and activate our route definitions."
 *
 * createBrowserRouter (Lesson 360):
 * =================================
 * INSTRUCTOR QUOTE:
 * "But that's then of course the other thing that must be imported, the
 * function that allows us to create these route definitions, and that's
 * the createBrowserRouter function."
 */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**
 * ============================================================================
 * TASK 1 SOLUTION - PAGE COMPONENT IMPORTS (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I will of course start with task number one which requires me to add a
 * couple of pages here. And for that, I'll add a brand new folder, the
 * pages folder."
 *
 * FILE NAMING (Lesson 360):
 * =========================
 * INSTRUCTOR QUOTE:
 * "And actually, I'll remove the word page from the file names. We could
 * also leave it there, but since the folder is already named pages, I'll
 * omit page from the file name."
 */
import HomePage from './pages/Home';
/**
 * ============================================================================
 * LESSON 364: IMPORTING LOADER FROM COMPONENT FILE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Then back in app.js, we can simply import that loader here and give it an
 * LES like events loader from that file where I define this loader function."
 *
 * INSTRUCTOR QUOTE:
 * "So I import it from dot slash pages slash events, and then we just use
 * events loader which is that pointer at that function and use that as a
 * value for this loader property here."
 *
 * WHY USE AN ALIAS (eventsLoader)?
 * ================================
 * INSTRUCTOR QUOTE:
 * "You're not forced to use an alias, but as your application grows, you might
 * have loaders in different files, and different files might export something
 * named loader. Hence assigning unique aliases helps you differentiate between
 * these different loaders."
 *
 * Import pattern: { loader as eventsLoader }
 * - `loader` is what's exported from Events.jsx
 * - `eventsLoader` is the alias we use here to avoid conflicts
 */
import EventsPage, { loader as eventsLoader } from './pages/Events';
/**
 * ============================================================================
 * LESSONS 372, 376: IMPORTING EVENT DETAIL LOADER AND ACTION
 * ============================================================================
 *
 * LESSON 372 - LOADER IMPORT:
 * ===========================
 * INSTRUCTOR QUOTE:
 * "We have to add the loader property to the event detail page route, and then
 * import the loader here from event detail."
 *
 * INSTRUCTOR QUOTE:
 * "And I will again give it an alias, so that we don't have any name clashes.
 * And here it's the 'eventDetailLoader,' like that."
 *
 * LESSON 376 - ACTION IMPORT:
 * ===========================
 * INSTRUCTOR QUOTE:
 * "Now we gotta register this action here in App JS. And in App JS, I'll
 * import this action here from event detail."
 *
 * INSTRUCTOR QUOTE:
 * "I'll give it an alias of delete event action."
 *
 * Following the same pattern as other imports:
 * - Import both loader and action from the component file
 * - Give unique aliases to avoid naming conflicts
 *
 * | Import    | Alias              | Purpose                    |
 * |-----------|--------------------| ---------------------------|
 * | loader    | eventDetailLoader  | GET single event data      |
 * | action    | deleteEventAction  | DELETE event               |
 */
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
/**
 * ============================================================================
 * LESSON 375: IMPORTING ACTION FROM COMPONENT FILE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that action defined, we can go back to app JS and there we can now
 * import this action from new event. Here, action as new event action."
 *
 * INSTRUCTOR QUOTE:
 * "We can import this and then use this new event action down here as a value
 * for this action property on this route definition."
 *
 * SAME PATTERN AS LOADERS:
 * ========================
 * Just like we import loaders from component files and give them aliases,
 * we do the same with actions:
 *
 * | Import Type | From File     | Alias            | Used For              |
 * |-------------|---------------|------------------|-----------------------|
 * | loader      | Events.jsx    | eventsLoader     | GET events list       |
 * | loader      | EventDetail   | eventDetailLoader| GET single event      |
 * | action      | NewEvent.jsx  | newEventAction   | POST new event        |
 *
 * WHY USE AN ALIAS (newEventAction)?
 * ==================================
 * - Multiple files may export functions named 'action'
 * - Aliases prevent naming conflicts
 * - Makes it clear which action belongs to which route
 */
import NewEventPage, { action as newEventAction } from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';

/**
 * TASK 3 & BONUS - LAYOUT IMPORTS (Lesson 360):
 * =============================================
 * RootLayout wraps all routes with MainNavigation.
 * EventsRootLayout wraps /events/* routes with EventsNavigation.
 */
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';

/**
 * ============================================================================
 * LESSON 369: ERROR PAGE IMPORT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Therefore what we can do is we can add an error page again here with pages
 * and create our error page component in there and export this."
 *
 * INSTRUCTOR QUOTE:
 * "Then it's added here with error element on that Root path."
 *
 * This page is displayed when:
 * 1. User navigates to an invalid/unsupported path (404)
 * 2. A loader throws an error (e.g., failed fetch)
 * 3. Any route-related error occurs
 */
import ErrorPage from './pages/Error';

/**
 * ============================================================================
 * TASK 2 SOLUTION - CREATING THE ROUTER (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With these two imports added, we can create our router here by calling
 * createBrowserRouter."
 *
 * ROUTE DEFINITION STYLES (Lesson 360):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "And now it's up to you whether you also want to use the
 * createRoutesFromElements function and use these JSX elements to define
 * your routes or if you want to pass an array to createBrowserRouter and
 * then use these objects here to define the routes. I'll do the latter."
 *
 * ============================================================================
 * NESTING ROUTES UNDER ROOT LAYOUT (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And now all the other routes should become children of this root route.
 * So we can move all these routes into this root route so that they will
 * benefit from this root layout."
 *
 * ABSOLUTE VS RELATIVE PATHS (Lesson 360):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "Now a quick note about these paths, as you learned, it could matter
 * whether they are absolute or relative. And therefore here, I'll actually
 * convert them all to relative paths so that they are relative to the path
 * defined in the parent route here in the route definitions."
 *
 * INDEX ROUTE (Lesson 360):
 * =========================
 * INSTRUCTOR QUOTE:
 * "And I'll actually turn this first route here, for the HomePage, into my
 * index route instead of defining this empty path, which is also something
 * you learned about in the previous lectures."
 */
const router = createBrowserRouter([
  {
    /**
     * ROOT ROUTE (Lesson 360):
     * ========================
     * INSTRUCTOR QUOTE:
     * "And I will start with a route for my root route for slash nothing
     * where the element is the HomePage because that is the page that
     * should be loaded if we are on our domain slash nothing."
     *
     * After Task 3, this becomes a layout route:
     * INSTRUCTOR QUOTE:
     * "And that can be done by adding a special new route, which will be
     * a parent route for all other routes."
     */
    path: '/',
    element: <RootLayout />,
    /**
     * ================================================================
     * LESSON 369: errorElement - ERROR HANDLING FOR ALL ROUTES
     * ================================================================
     *
     * INSTRUCTOR QUOTE:
     * "We can go back to App.js and add error element here on this Root
     * route and render our error page like that."
     *
     * WHY ON THE ROOT ROUTE? (Lesson 369):
     * ====================================
     * INSTRUCTOR QUOTE:
     * "With that, this page, this error page, will be displayed whenever
     * we basically have any kind of error anywhere in our routes because
     * even though I'm throwing an error here in the loader of the events
     * page. So in this route here, which is a deeply nested route, errors
     * will bubble up."
     *
     * TWO USE CASES FOR errorElement (Lesson 369):
     * ============================================
     * INSTRUCTOR QUOTE:
     * "Well, turns out that error element is not just there to show a
     * fallback page in case of invalid route paths. That is one use case
     * but not the only one. Instead, the error element will be shown to
     * the screen whenever an error is generated in any route related code,
     * including loaders."
     *
     * | Use Case              | When It's Triggered                        |
     * |-----------------------|--------------------------------------------|
     * | 404 Not Found         | User navigates to invalid path             |
     * | Loader Error          | Loader throws an error (e.g., fetch fails) |
     * | Action Error (future) | Action throws an error during form submit  |
     *
     * ERROR BUBBLING (Lesson 369):
     * ============================
     * INSTRUCTOR QUOTE:
     * "We could add error element to this route as well. And in that case,
     * this error element would be rendered if this loader threw an error.
     * But we can also just have this Root level error element and the error
     * would bubble up until it reaches that route."
     *
     * Route hierarchy showing error bubbling:
     * =======================================
     * / (Root - HAS errorElement)        ← Catches all bubbled errors
     *   └── /events (EventsRootLayout)
     *         └── /events (index)        ← Loader can throw error here
     *               ↑
     *         Error bubbles UP to root errorElement
     */
    errorElement: <ErrorPage />,
    children: [
      /**
       * INDEX ROUTE - HOME PAGE (Lesson 360):
       * =====================================
       * INSTRUCTOR QUOTE:
       * "I'll actually turn this first route here, for the HomePage, into
       * my index route instead of defining this empty path."
       *
       * Using { index: true } instead of { path: '' }
       */
      { index: true, element: <HomePage /> },
      {
        /**
         * EVENTS LAYOUT ROUTE - BONUS TASK (Lesson 360):
         * ==============================================
         * INSTRUCTOR QUOTE:
         * "We just add a new route definition where the path is events,
         * not /events, but events because it is nested in this root route
         * and I want to have a relative to this parent route path."
         *
         * INSTRUCTOR QUOTE:
         * "Then here, the element is a new page, which we have yet to add,
         * which is the EventsRoot. So here we have the EventsRootLayout
         * component, that is how we could name it."
         */
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          /**
           * EVENTS INDEX ROUTE (Lessons 360-361):
           * =====================================
           * INSTRUCTOR QUOTE (Lesson 360):
           * "And of course this first route here can again be turned into
           * a index route, now an index route for this events parent route."
           *
           * ================================================================
           * LESSON 361: THE LOADER PROPERTY - DATA FETCHING
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "And it helps you with all of that by giving you an extra property
           * which you can add to your route definitions. Now we're currently
           * talking about this events page. That's this page where we're
           * fetching data, and in our route definitions we can add an extra
           * property to that route definition of that page. We can add the
           * extra loader property."
           *
           * WHAT IS A LOADER? (Lesson 361):
           * ===============================
           * INSTRUCTOR QUOTE:
           * "Now, loader is a property that wants a function as a value, a
           * regular function or an error function that does not matter. And
           * this function will be executed by a React router whenever you are
           * about to visit this route."
           *
           * WHEN DOES IT RUN? (Lesson 361):
           * ===============================
           * INSTRUCTOR QUOTE:
           * "So just before this route gets rendered, just before this JSX code
           * gets rendered, this loader function will be triggered and executed
           * by a React router."
           *
           * WHY USE LOADERS? (Lesson 361):
           * ==============================
           * INSTRUCTOR QUOTE:
           * "And it's in this loader function where you can therefore load and
           * fetch your data."
           *
           * RETURNING DATA FROM LOADER (Lesson 361):
           * ========================================
           * INSTRUCTOR QUOTE:
           * "Well, the great thing is that when you define such a loader function,
           * React router will automatically take any value you return in that
           * function, for example, the response data and will make that data
           * available in that page that's being rendered here as well as any
           * other components where you need it."
           *
           * USING async/await (Lesson 361):
           * ===============================
           * INSTRUCTOR QUOTE:
           * "For example, we should add the async keyword here so that we can
           * use the await keyword. Alternatively, we could of course add the
           * then method here since Thatcher returns a promise but async await
           * is a bit easier to read."
           *
           * ================================================================
           * LESSON 362: ACCESSING LOADER DATA WITH useLoaderData
           * ================================================================
           *
           * The component accesses this loader's data using useLoaderData():
           *
           * import { useLoaderData } from 'react-router-dom';
           *
           * function EventsPage() {
           *   const events = useLoaderData();  // Gets data returned by loader
           *   return <EventsList events={events} />;
           * }
           *
           * INSTRUCTOR QUOTE (Lesson 362):
           * "This is a special hook which we can execute to get access to the
           * closest loader data."
           *
           * PROMISE HANDLING (Lesson 362):
           * INSTRUCTOR QUOTE:
           * "But React Router will actually check if a promise is returned and
           * automatically get the resolved data from that promise for you."
           *
           * See Events.jsx for the full useLoaderData implementation.
           */
          {
            index: true,
            element: <EventsPage />,
            /**
             * ================================================================
             * LOADER PROPERTY (Lessons 361-364)
             * ================================================================
             *
             * LESSON 361 - WHAT IS A LOADER:
             * ==============================
             * INSTRUCTOR QUOTE:
             * "Now, loader is a property that wants a function as a value, a
             * regular function or an error function that does not matter. And
             * this function will be executed by a React router whenever you are
             * about to visit this route."
             *
             * Timeline comparison:
             * - WITHOUT loader: Navigate → Render → useEffect → Fetch → Re-render
             * - WITH loader: Navigate → Fetch (loader) → Render (with data)
             *
             * ================================================================
             * LESSON 364 - REFACTORING TO EXTERNAL FILE
             * ================================================================
             *
             * INSTRUCTOR QUOTE:
             * "Now there's nothing wrong with putting this code here, by the way,
             * but a common pattern and a recommendation if you wanna call it like
             * that, is that you do actually put that loader code here into your
             * component file where you need it."
             *
             * INSTRUCTOR QUOTE:
             * "So I import it from dot slash pages slash events, and then we just
             * use events loader which is that pointer at that function and use
             * that as a value for this loader property here."
             *
             * BEFORE (inline loader - Lessons 361-363):
             * ========================================
             * loader: async () => {
             *   const response = await fetch('http://localhost:8080/events');
             *   if (!response.ok) { ... }
             *   const resData = await response.json();
             *   return resData.events;
             * },
             *
             * AFTER (imported loader - Lesson 364):
             * ====================================
             * loader: eventsLoader,
             *
             * The loader function is now defined in Events.jsx and imported here.
             * See Events.jsx for the full loader implementation.
             */
            loader: eventsLoader,
          },
          /**
           * NEW EVENT ROUTE - ROUTE SPECIFICITY (Lesson 360):
           * =================================================
           * INSTRUCTOR QUOTE:
           * "Now the next path which I want to add is /events/new. So therefore
           * here, I add /events/new. And the element is NewEventPage."
           *
           * WHY THIS WORKS (doesn't conflict with :eventId):
           * INSTRUCTOR QUOTE:
           * "This could happen in theory, but actually React Router is smart
           * and understands that this route path is more specific than this
           * route path. So indeed, if you would visit /events/new, it would
           * prefer this route definition over this route definition."
           *
           * INSTRUCTOR QUOTE:
           * "And that's just something to be aware of that you don't need to
           * worry about accidentally overriding this route definition and that
           * you don't need to worry about the order of route definitions. This
           * route here, /events/new, will win over this route."
           *
           * ================================================================
           * LESSON 375: ADDING THE ACTION PROPERTY
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "So to add an action to this new route here we add the special
           * action property here. And just like loader, action wants a function
           * an arrow function, or a regular function that does not matter."
           *
           * INSTRUCTOR QUOTE:
           * "We can import this and then use this new event action down here
           * as a value for this action property on this route definition."
           *
           * LOADERS VS ACTIONS IN ROUTE DEFINITIONS:
           * ========================================
           * | Property | Purpose         | Triggered by               |
           * |----------|-----------------|----------------------------|
           * | loader   | Fetch data      | Navigation to route        |
           * | action   | Submit data     | <Form> submission on route |
           *
           * This route now has:
           * - element: The component to render (NewEventPage)
           * - action: The function to call on form submission (newEventAction)
           */
          { path: 'new', element: <NewEventPage />, action: newEventAction },
          /**
           * ================================================================
           * LESSON 373: WRAPPER ROUTE FOR SHARING LOADER DATA
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "And that's what the ID property here is for. With the ID
           * property we can assign a string identifier, any identifier of
           * our choice, for example event-detail, to this route definition."
           *
           * INSTRUCTOR QUOTE:
           * "And with such an ID defined, we can use a special hook called
           * use route loader data to get access to a higher level loader
           * from a child route."
           *
           * ================================================================
           * WHY WE NEED A WRAPPER ROUTE (Lesson 373):
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "So I need access to this loader here, not just in the event
           * detail page, but also in the edit event page because the edit
           * event page should also display the event data, but we got one
           * loader which we wanna use for both pages."
           *
           * PROBLEM: Both EventDetail and EditEvent need the same event data
           * SOLUTION: Create a wrapper route that holds the loader, with both
           * pages as children
           *
           * ================================================================
           * USING ROUTES WITHOUT element PROPERTY (Lesson 373):
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "Instead, here I'll again set up another wrapping route. You
           * might remember that we can have such wrapping routes without
           * an element. This wrapper route will then simply add some children
           * routes inside of it, and the loader that's added to this wrapping
           * route will be shared to all child routes."
           *
           * INSTRUCTOR QUOTE:
           * "But this wrapper route, this parent route, doesn't necessarily
           * need a element. Instead, if you add children but don't define
           * an element, React Router will simply render the child element
           * that matches the path without wrapping that around another
           * component."
           *
           * INSTRUCTOR QUOTE:
           * "So we can use this as a way of sharing loaders without having
           * to add wrapper components that add layouts or anything like that."
           *
           * ================================================================
           * ROUTE STRUCTURE BEFORE (Lessons 360-372):
           * ================================================================
           *
           * children: [
           *   { index: true, element: <EventsPage />, loader: eventsLoader },
           *   { path: ':eventId', element: <EventDetailPage />, loader: eventDetailLoader },
           *   { path: 'new', element: <NewEventPage /> },
           *   { path: ':eventId/edit', element: <EditEventPage /> },
           * ]
           *
           * ================================================================
           * ROUTE STRUCTURE AFTER (Lesson 373):
           * ================================================================
           *
           * children: [
           *   { index: true, element: <EventsPage />, loader: eventsLoader },
           *   { path: 'new', element: <NewEventPage /> },
           *   {
           *     path: ':eventId',
           *     id: 'event-detail',           // ← Route ID for useRouteLoaderData
           *     loader: eventDetailLoader,    // ← Shared loader
           *     children: [
           *       { index: true, element: <EventDetailPage /> },  // /events/:eventId
           *       { path: 'edit', element: <EditEventPage /> },   // /events/:eventId/edit
           *     ]
           *   }
           * ]
           *
           * ================================================================
           * HOW THE id PROPERTY WORKS (Lesson 373):
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "And we then can use this ID in use route loader data to tell
           * React router that we wanna use the data from the loader that
           * belongs to a route with this specific ID."
           *
           * | Property | Value          | Purpose                               |
           * |----------|----------------|---------------------------------------|
           * | path     | ':eventId'     | Dynamic segment for event ID          |
           * | id       | 'event-detail' | Identifier for useRouteLoaderData     |
           * | loader   | eventDetailLoader | Fetches event data from backend   |
           * | children | [...]          | Child routes that share the loader    |
           *
           * ================================================================
           * CHILD ROUTE PATHS (Lesson 373):
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "And on the Edit Event page path should be edit relative to
           * the parent path."
           *
           * Children paths are relative to parent:
           * - Parent path: ':eventId'
           * - Child index route: '' (matches /events/:eventId)
           * - Child 'edit' route: 'edit' (matches /events/:eventId/edit)
           *
           * ================================================================
           */
          {
            path: ':eventId',
            /**
             * ROUTE ID FOR useRouteLoaderData (Lesson 373):
             * =============================================
             * INSTRUCTOR QUOTE:
             * "And that's what the ID property here is for. With the ID
             * property we can assign a string identifier, any identifier
             * of our choice, for example event-detail, to this route
             * definition."
             *
             * This ID is used by:
             * - EventDetailPage: useRouteLoaderData('event-detail')
             * - EditEventPage: useRouteLoaderData('event-detail')
             */
            id: 'event-detail',
            /**
             * SHARED LOADER (Lesson 373):
             * ===========================
             * INSTRUCTOR QUOTE:
             * "The loader that's added to this wrapping route will be
             * shared to all child routes."
             *
             * Both EventDetailPage and EditEventPage can now access
             * this loader's data without triggering separate fetches.
             */
            loader: eventDetailLoader,
            /**
             * ================================================================
             * LESSON 376: ACTION FOR DELETING EVENTS
             * ================================================================
             *
             * INSTRUCTOR QUOTE:
             * "And this must be added to this wrapper route because that's
             * the route where we can get access to this event ID in params."
             *
             * WHY ON THE WRAPPER ROUTE:
             * =========================
             * INSTRUCTOR QUOTE:
             * "Because this action will ultimately be registered on the event
             * detail route, on that wrapper route where we also have the
             * loader. So where we also need this event ID."
             *
             * The action needs params.eventId to know which event to delete.
             * By placing it on the wrapper route (same as the loader):
             * - params.eventId is available in the action
             * - The action is accessible from any child route
             * - EventItem can trigger it via useSubmit without specifying path
             *
             * HOW THE DELETE FLOW WORKS:
             * ==========================
             * 1. EventItem calls: submit(null, { method: 'delete' })
             * 2. React Router looks for action on the current route
             * 3. Current route is the index child of this wrapper
             * 4. Action bubbles up to wrapper route (which has the action)
             * 5. deleteEventAction is executed with { request, params }
             * 6. Event is deleted and user is redirected to /events
             *
             * LOADERS VS ACTIONS ON THE SAME ROUTE:
             * =====================================
             * | Property | Triggered By            | Purpose              |
             * |----------|-------------------------|----------------------|
             * | loader   | Navigation/Page load    | GET event data       |
             * | action   | Form/useSubmit          | DELETE event         |
             */
            action: deleteEventAction,
            children: [
              /**
               * EVENT DETAIL PAGE - INDEX ROUTE (Lesson 373):
               * =============================================
               * INSTRUCTOR QUOTE:
               * "Because if you have multiple children here, one of them
               * could be this event detail page. But then it should be
               * loaded for this parent path."
               *
               * INSTRUCTOR QUOTE:
               * "And if you wanna load a child component for a parent
               * path, you need to use the index property."
               *
               * URL: /events/e1 → Renders EventDetailPage
               */
              {
                index: true,
                element: <EventDetailPage />,
              },
              /**
               * EDIT EVENT PAGE - CHILD ROUTE (Lesson 373):
               * ===========================================
               * INSTRUCTOR QUOTE:
               * "And on the Edit Event page path should be edit relative
               * to the parent path."
               *
               * URL: /events/e1/edit → Renders EditEventPage
               *
               * Since this is a child of the wrapper route with the loader,
               * EditEventPage can access the event data via:
               * useRouteLoaderData('event-detail')
               */
              {
                path: 'edit',
                element: <EditEventPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

/**
 * ============================================================================
 * APP COMPONENT - RENDERING THE ROUTER (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now we can render the RouterProvider component and set the router prop
 * to our router object that contains these route definitions."
 *
 * TESTING THE ROUTES (Lesson 360):
 * ================================
 * INSTRUCTOR QUOTE:
 * "And with that, we should be able to visit these different pages. If we
 * go back, we start on the HomePage. If we type in /events, we see the
 * EventsPage. If I type in events/e1, for example, which could be an eventId,
 * I see the EventDetailPage. If I add /edit thereafter, I see the
 * EditEventPage. And if I replace e1 with new, I see the NewEventPage."
 *
 * INSTRUCTOR QUOTE:
 * "So this is all working and we are able to reach all these different pages."
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
