/**
 * ============================================================================
 * ADVANCED ROUTING PROJECT - APP COMPONENT (Lesson 358)
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
 * PRACTICE CHALLENGE (Lesson 358)
 * ============================================================================
 *
 * This file contains a practice exercise to apply what you learned in
 * Lessons 346-357 about React Router. The challenge tasks are listed below.
 *
 * CONCEPTS TO PRACTICE:
 * =====================
 * From previous lessons:
 * - createBrowserRouter & RouterProvider (Lesson 346)
 * - Adding multiple routes (Lesson 347)
 * - Nested routes & layouts (Lesson 350)
 * - Error handling with errorElement (Lesson 351)
 * - NavLink for active link highlighting (Lesson 352)
 * - Programmatic navigation with useNavigate (Lesson 353)
 * - Dynamic routes with :paramName (Lesson 354)
 * - useParams hook to access parameters (Lesson 354)
 * - Building links for dynamic routes (Lesson 355)
 * - Relative vs absolute paths (Lesson 356)
 * - Index routes (Lesson 357)
 *
 * PRE-BUILT COMPONENTS PROVIDED:
 * ==============================
 * - MainNavigation: Main site navigation (needs Link/NavLink updates)
 * - EventsNavigation: Secondary nav for events section (for nested layout)
 * - EventsList: Displays list of events (needs Link updates)
 * - EventItem: Single event details display
 * - EventForm: Form for creating/editing events
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * CHALLENGE / EXERCISE TASKS
 * ============================================================================
 *
 * Complete these tasks to practice your React Router skills:
 *
 * TASK 1: Create Page Components
 * ==============================
 * Add five new (dummy) page components (content can be simple <h1> elements):
 *   - HomePage         → Main landing page
 *   - EventsPage       → List of all events
 *   - EventDetailPage  → Details of a specific event
 *   - NewEventPage     → Form to create new event
 *   - EditEventPage    → Form to edit existing event
 *
 * TASK 2: Add Route Definitions
 * =============================
 * Set up routing for these pages:
 *   - /                    → HomePage
 *   - /events              → EventsPage
 *   - /events/<some-id>    → EventDetailPage (dynamic route)
 *   - /events/new          → NewEventPage
 *   - /events/<some-id>/edit → EditEventPage (dynamic + nested)
 *
 * TASK 3: Root Layout
 * ===================
 * Add a root layout that includes <MainNavigation> above all pages.
 * Use nested routes with <Outlet /> (Lesson 350).
 *
 * TASK 4: Navigation Links
 * ========================
 * Update MainNavigation to use <Link> or <NavLink> instead of <a> tags.
 * This enables client-side routing (Lesson 349).
 *
 * TASK 5: Active Link Styling
 * ===========================
 * Use <NavLink> with className function to add "active" class.
 * Remember the `end` prop for the home route (Lesson 352).
 *
 * TASK 6: Events List
 * ===================
 * Display dummy events on EventsPage using the EventsList component.
 * Each event should link to its EventDetailPage (Lesson 355).
 *
 * TASK 7: Display Event ID
 * ========================
 * Use useParams() hook to get the event ID from the URL.
 * Display it on EventDetailPage (Lesson 354).
 *
 * BONUS: Nested Events Layout
 * ===========================
 * Add a nested layout for /events/* routes that includes <EventsNavigation>.
 * This demonstrates multiple layout routes (Lesson 350).
 *
 * ============================================================================
 */

function App() {
  /**
   * TODO: Replace this with RouterProvider
   *
   * Example structure:
   * const router = createBrowserRouter([
   *   {
   *     path: '/',
   *     element: <RootLayout />,
   *     errorElement: <ErrorPage />,
   *     children: [
   *       { index: true, element: <HomePage /> },
   *       {
   *         path: 'events',
   *         element: <EventsLayout />,  // Optional: for EventsNavigation
   *         children: [
   *           { index: true, element: <EventsPage /> },
   *           { path: ':eventId', element: <EventDetailPage /> },
   *           { path: 'new', element: <NewEventPage /> },
   *           { path: ':eventId/edit', element: <EditEventPage /> },
   *         ]
   *       }
   *     ]
   *   }
   * ]);
   *
   * return <RouterProvider router={router} />;
   */
  return <div></div>;
}

export default App;
