/**
 * ============================================================================
 * SECTION 24: DATA FETCHING WITH TANSTACK QUERY (formerly React Query)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 409):
 * "In this section, we're going to work on yet another new project, and whilst
 * working on this project, you will learn how to use Tanstack Query, a
 * third-party React library, formerly known as React Query."
 *
 * ============================================================================
 * LESSON 409 - MODULE INTRODUCTION: What is Tanstack Query?
 * ============================================================================
 *
 * Tanstack Query is a powerful library for:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • Fetching data (GET requests)                                         │
 * │  • Mutating data (POST, PUT, DELETE requests)                           │
 * │  • Caching server data                                                  │
 * │  • Synchronizing server state with UI                                   │
 * │  • Background refetching                                                │
 * │  • Optimistic updates                                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "It is a library that helps you with sending HTTP requests from inside your
 * React app. So it helps you with connecting your React frontend to a backend."
 *
 * ============================================================================
 * WHY USE TANSTACK QUERY INSTEAD OF useEffect + fetch?
 * ============================================================================
 *
 * We already know how to fetch data with useEffect:
 *
 * ```javascript
 * useEffect(() => {
 *   async function fetchData() {
 *     setIsLoading(true);
 *     const response = await fetch('http://localhost:3000/events');
 *     const data = await response.json();
 *     setData(data);
 *     setIsLoading(false);
 *   }
 *   fetchData();
 * }, []);
 * ```
 *
 * INSTRUCTOR QUOTE:
 * "Of course, in this course, you already learned how to do that, for example,
 * with useEffect and using the built-in fetch function that's provided by the
 * browser, but in this section here, you will learn what exactly Tanstack Query
 * is, and most importantly, why you would use it instead of using useEffect
 * and fetch."
 *
 * PROBLEMS WITH useEffect + fetch:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. MANUAL STATE MANAGEMENT                                             │
 * │     - Must create useState for: data, isLoading, error                  │
 * │     - Must manually update these states                                 │
 * │                                                                          │
 * │  2. NO CACHING                                                           │
 * │     - Every component mount = new request                                │
 * │     - Same data fetched multiple times                                   │
 * │     - Wastes bandwidth and slows the app                                │
 * │                                                                          │
 * │  3. NO BACKGROUND REFETCHING                                            │
 * │     - Data can become stale                                              │
 * │     - No automatic updates when user returns to tab                     │
 * │                                                                          │
 * │  4. NO REQUEST DEDUPLICATION                                            │
 * │     - Multiple components fetching same data = multiple requests        │
 * │                                                                          │
 * │  5. COMPLEX ERROR HANDLING                                              │
 * │     - Must manually implement retry logic                               │
 * │     - Must handle different error scenarios                             │
 * │                                                                          │
 * │  6. NO OPTIMISTIC UPDATES                                               │
 * │     - UI waits for server response before updating                      │
 * │     - Feels slow to users                                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * TANSTACK QUERY SOLVES ALL OF THIS with minimal code!
 *
 * ============================================================================
 * WHAT WE'LL LEARN IN THIS SECTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "You will then learn how to use this Tanstack Query library to fetch data
 * and to mutate data, so how to send GET, POST, PUT, and DELETE requests.
 * You will learn how to configure and efficiently use this library, and we
 * will also explore many more advanced concepts like working with the cache
 * that's provided by that library, how it works, and how you can invalidate
 * and change it. We'll explore the topic of optimistic updating, what that is,
 * and how you would implement it with Tanstack Query, and much more."
 *
 * TOPICS COVERED:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Fetching data with useQuery                                         │
 * │  2. Mutating data with useMutation                                      │
 * │  3. Configuring query options (staleTime, cacheTime, refetchInterval)  │
 * │  4. Cache invalidation (queryClient.invalidateQueries)                  │
 * │  5. Optimistic updates (for instant UI feedback)                        │
 * │  6. Dependent queries                                                   │
 * │  7. Pagination and infinite queries                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * LESSON 410 - PROJECT SETUP & OVERVIEW
 * ============================================================================
 *
 * This project has TWO parts:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FRONTEND (React + Vite)                                                │
 * │  Location: /src                                                          │
 * │  Port: 5173                                                              │
 * │  Start: npm run dev                                                      │
 * │                                                                          │
 * │  Components provided:                                                    │
 * │  - Events.jsx        → Main events page                                 │
 * │  - EventDetails.jsx  → Single event details                             │
 * │  - NewEvent.jsx      → Create new event form                            │
 * │  - EditEvent.jsx     → Edit existing event                              │
 * │  - NewEventsSection.jsx → Shows recent events (uses useEffect+fetch)   │
 * │  - FindEventSection.jsx → Search events                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BACKEND (Node.js + Express)                                            │
 * │  Location: /backend                                                      │
 * │  Port: 3000                                                              │
 * │  Start: npm start (in backend folder)                                   │
 * │                                                                          │
 * │  API Endpoints:                                                          │
 * │  - GET    /events         → List all events                             │
 * │  - GET    /events/:id     → Get single event                            │
 * │  - POST   /events         → Create new event                            │
 * │  - PUT    /events/:id     → Update event                                │
 * │  - DELETE /events/:id     → Delete event                                │
 * │  - GET    /events/images  → Get available images                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Besides this React project, you'll also notice that there is a backend
 * folder in this project. And this backend folder contains a separate
 * non-React project that will provide us a dummy backend to talk to."
 *
 * INSTRUCTOR QUOTE:
 * "This is written with Node and ExpressJS... But you don't need to know
 * NodeJS and ExpressJS, because that's why I am providing this starting
 * project to you so that you don't have to write all this code on your own."
 *
 * ============================================================================
 * OFFICIAL DOCUMENTATION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It's also a good idea to consult the official documentation which you can
 * find if you search for Tanstack Query, because Tanstack Query is an
 * extremely powerful package with lots of features."
 *
 * Documentation: https://tanstack.com/query/latest/docs/framework/react/overview
 *
 * ============================================================================
 */

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import Events from './components/Events/Events.jsx';
import EventDetails from './components/Events/EventDetails.jsx';
import NewEvent from './components/Events/NewEvent.jsx';
import EditEvent from './components/Events/EditEvent.jsx';

/**
 * ROUTER CONFIGURATION
 *
 * This app uses React Router for navigation between:
 * - /events          → Events list page
 * - /events/new      → Create new event (modal)
 * - /events/:id      → Event details page
 * - /events/:id/edit → Edit event (modal)
 *
 * Throughout this section, we'll add Tanstack Query to handle
 * all the data fetching and mutations for these routes.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/events" />,
  },
  {
    path: '/events',
    element: <Events />,

    children: [
      {
        path: '/events/new',
        element: <NewEvent />,
      },
    ],
  },
  {
    path: '/events/:id',
    element: <EventDetails />,
    children: [
      {
        path: '/events/:id/edit',
        element: <EditEvent />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
