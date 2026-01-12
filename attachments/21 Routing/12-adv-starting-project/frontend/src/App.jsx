/**
 * ============================================================================
 * ADVANCED ROUTING PROJECT - APP COMPONENT (Lessons 358-360)
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
import EventsPage from './pages/Events';
import EventDetailPage from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
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
           * EVENTS INDEX ROUTE (Lesson 360):
           * ================================
           * INSTRUCTOR QUOTE:
           * "And of course this first route here can again be turned into
           * a index route, now an index route for this events parent route."
           */
          { index: true, element: <EventsPage /> },
          /**
           * DYNAMIC EVENT ROUTE (Lesson 360):
           * =================================
           * INSTRUCTOR QUOTE:
           * "And then we wanna have a route that supports basically all kinds
           * of IDs and should then load the EventDetailPage for these different
           * IDs. So we need a route where the path contains a parameter, where
           * we have a dynamic path segment."
           *
           * INSTRUCTOR QUOTE:
           * "And you learned how that can be defined. We add a colon and then
           * any identifier of our choice, like, for example, eventId."
           */
          { path: ':eventId', element: <EventDetailPage /> },
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
           */
          { path: 'new', element: <NewEventPage /> },
          /**
           * EDIT EVENT ROUTE - DYNAMIC + STATIC (Lesson 360):
           * =================================================
           * INSTRUCTOR QUOTE:
           * "So now the last route definition which I want to add is this
           * definition where we wanna load the EditEventPage if we are on
           * /events, then, some-id/edit."
           *
           * INSTRUCTOR QUOTE:
           * "The path therefore is /events. Then, again, my dynamic segment
           * and then edit. This is something we didn't do before, but it is
           * absolutely a path you can add to your route definitions."
           *
           * INSTRUCTOR QUOTE:
           * "You can have another hard-coded segment after a dynamic segment,
           * that is allowed and possible."
           */
          { path: ':eventId/edit', element: <EditEventPage /> },
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
