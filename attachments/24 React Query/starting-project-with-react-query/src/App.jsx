/**
 * ============================================================================
 * APP COMPONENT - Lessons 412-413, 419, 428: QueryClientProvider & Routing
 * ============================================================================
 *
 * LESSON 412 - Installing & Using Tanstack Query
 * LESSON 413 - Understanding & Configuring Query Behavior (Caching)
 * LESSON 428 - Combining React Router with React Query (Loader & Action)
 *
 * This file demonstrates how to set up the QueryClientProvider,
 * which is REQUIRED for using Tanstack Query in your application.
 *
 * ============================================================================
 * LESSON 428: CONNECTING LOADER AND ACTION TO ROUTES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now in order to use this loader here in App JSX we have to import it
 * from that EditEvent file and register it as a loader for this edit
 * event route here."
 *
 * KEY CHANGES FOR LESSON 428:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Import loader and action from EditEvent.jsx                         │
 * │  2. Register loader on the /events/:id/edit route                       │
 * │  3. Register action on the /events/:id/edit route                       │
 * │                                                                          │
 * │  This enables:                                                           │
 * │    - Data pre-fetching before component renders (loader)                │
 * │    - Form submission handling via React Router (action)                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHY QueryClientProvider IS REQUIRED
 * ============================================================================
 *
 * If you try to use useQuery without setting up QueryClientProvider,
 * you'll get this error:
 *
 * INSTRUCTOR QUOTE:
 * "You should see an error message here on the screen. 'Unexpected application
 * error, no Query client set, use Query client provider to set one.'
 * So this error message actually already tells us what we need to do."
 *
 * INSTRUCTOR QUOTE:
 * "Because in order to use React Query and the useQuery hook, you must wrap
 * the components that do want to use these features with a special provider
 * component provided by Tanstack Query."
 *
 * ============================================================================
 * HOW IT WORKS
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                        QueryClientProvider                              │
 * │  ┌───────────────────────────────────────────────────────────────────┐ │
 * │  │                      RouterProvider                                │ │
 * │  │  ┌─────────────────────────────────────────────────────────────┐ │ │
 * │  │  │                     Components                               │ │ │
 * │  │  │         (can now use useQuery, useMutation, etc.)           │ │ │
 * │  │  └─────────────────────────────────────────────────────────────┘ │ │
 * │  └───────────────────────────────────────────────────────────────────┘ │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * The QueryClient stores:
 * - The query cache (cached responses)
 * - Default configuration options
 * - Query states (loading, error, success)
 *
 * ============================================================================
 */

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

/**
 * IMPORTING TANSTACK QUERY SETUP COMPONENTS
 *
 * INSTRUCTOR QUOTE:
 * "For this I'll again import from @tanstack/react-query
 * and I'll import the QueryClientProvider and also the QueryClient.
 * These two things must be imported here."
 *
 * NOTE (Lesson 419): We no longer import QueryClient here because we now
 * import the queryClient INSTANCE from http.js instead.
 *
 * - QueryClientProvider: React Context provider that makes QueryClient
 *   available to all child components
 */
import { QueryClientProvider } from '@tanstack/react-query';

import Events from './components/Events/Events.jsx';
import EventDetails from './components/Events/EventDetails.jsx';
import NewEvent from './components/Events/NewEvent.jsx';

/**
 * ============================================================================
 * LESSON 428: IMPORTING LOADER AND ACTION FROM EditEvent
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now in order to use this loader here in App JSX we have to import it
 * from that EditEvent file and register it as a loader for this edit
 * event route here."
 *
 * We import the component as default, and the loader/action as named exports:
 * - EditEvent: The component that renders the edit form
 * - loader: Function that pre-fetches event data (runs BEFORE component)
 * - action: Function that handles form submissions
 *
 * IMPORT PATTERN:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  import EditEvent, { loader, action } from '...EditEvent.jsx'           │
 * │                                                                          │
 * │  EditEvent  → default export (the component)                            │
 * │  loader     → named export (pre-fetch function)                         │
 * │  action     → named export (form submission handler)                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * However, when you have multiple loaders/actions from different files,
 * you need to rename them to avoid conflicts:
 *
 * INSTRUCTOR QUOTE:
 * "So here I'm using this as keyword, which is just a syntax supported by
 * JavaScript that allows us to give a different name to an imported value."
 */
import EditEvent, {
  loader as editEventLoader,
  action as editEventAction,
} from './components/Events/EditEvent.jsx';

/**
 * ============================================================================
 * LESSON 419: IMPORTING SHARED QueryClient FROM http.js
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now with that exported here in HTTP JS we should go back to App JSX and
 * import this QueryClient from this HTTP JS file, which we find in the UTIL
 * folder. Because we still need that QueryClient object here to pass it to
 * the QueryClientProvider."
 *
 * WHY WE MOVED queryClient TO http.js:
 *
 * INSTRUCTOR QUOTE:
 * "Therefore we should cut this from this file and remove this import and
 * instead add it to some other file from which we can then import it into
 * multiple files."
 *
 * Benefits of sharing queryClient:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. App.jsx uses it for QueryClientProvider                            │
 * │  2. NewEvent.jsx uses it for invalidateQueries() after mutations       │
 * │  3. EditEvent.jsx uses it in loader for fetchQuery()                   │
 * │  4. Any component can import it to manually interact with the cache    │
 * │  5. Same instance ensures cache operations work correctly              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * LESSON 413: GLOBAL CACHE CONFIGURATION (Reference)
 * ============================================================================
 *
 * The QueryClient can be configured with DEFAULT options that apply to
 * ALL queries in your application. This is useful when you want consistent
 * caching behavior everywhere.
 *
 * GLOBAL CONFIGURATION EXAMPLE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  const queryClient = new QueryClient({                                  │
 * │    defaultOptions: {                                                    │
 * │      queries: {                                                         │
 * │        staleTime: 5 * 60 * 1000,    // 5 minutes before refetch        │
 * │        gcTime: 10 * 60 * 1000,      // 10 minutes cache retention      │
 * │        refetchOnWindowFocus: true,  // Refetch when tab regains focus  │
 * │        retry: 3,                    // Retry failed requests 3 times   │
 * │      },                                                                 │
 * │    },                                                                   │
 * │  });                                                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * For now, we use defaults. Individual queries can override these settings.
 */
import { queryClient } from './util/http.js';

/**
 * ============================================================================
 * ROUTE CONFIGURATION WITH LOADER AND ACTION
 * ============================================================================
 *
 * LESSON 428: REGISTERING LOADER AND ACTION ON ROUTES
 *
 * INSTRUCTOR QUOTE:
 * "Now in order to use this loader here in App JSX we have to import it
 * from that EditEvent file and register it as a loader for this edit
 * event route here."
 *
 * Route configuration with loader and action:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  {                                                                      │
 * │    path: '/events/:id/edit',                                            │
 * │    element: <EditEvent />,                                              │
 * │    loader: editEventLoader,   ← Runs BEFORE component renders          │
 * │    action: editEventAction,   ← Runs when form is submitted            │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * EXECUTION ORDER:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. User navigates to /events/:id/edit                                  │
 * │  2. React Router calls editEventLoader({ params: { id } })              │
 * │  3. loader fetches data and stores in React Query cache                 │
 * │  4. React Router renders <EditEvent />                                  │
 * │  5. EditEvent's useQuery finds data in cache (no loading state!)       │
 * │  6. User edits and submits form                                         │
 * │  7. React Router calls editEventAction({ request, params })             │
 * │  8. action updates backend, invalidates cache, redirects                │
 * └─────────────────────────────────────────────────────────────────────────┘
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
        /**
         * LESSON 428: EDIT EVENT ROUTE WITH LOADER AND ACTION
         *
         * INSTRUCTOR QUOTE:
         * "Now in order to use this loader here in App JSX we have to import
         * it from that EditEvent file and register it as a loader for this
         * edit event route here."
         *
         * This route now has:
         * - loader: Pre-fetches event data using queryClient.fetchQuery()
         * - action: Handles form submissions and updates the event
         */
        path: '/events/:id/edit',
        element: <EditEvent />,
        loader: editEventLoader,
        action: editEventAction,
      },
    ],
  },
]);

/**
 * APP COMPONENT WITH QUERYCLIENTPROVIDER
 *
 * INSTRUCTOR QUOTE:
 * "As a next step, I'll then wrap RouterProvider with the
 * QueryClientProvider we imported. And on that QueryClientProvider,
 * we must set the client prop equal to this QueryClient we created here."
 *
 * INSTRUCTOR QUOTE:
 * "And with that we're now unlocking all these Tanstack Query features
 * and hence if we save that again and we go back and reload, we now
 * see our events here again. But now they're fetched with help of
 * Tanstack Query."
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
