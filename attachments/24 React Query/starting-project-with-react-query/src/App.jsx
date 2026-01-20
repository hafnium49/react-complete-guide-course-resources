/**
 * ============================================================================
 * APP COMPONENT - Lessons 412-413, 419: QueryClientProvider & Caching
 * ============================================================================
 *
 * LESSON 412 - Installing & Using Tanstack Query
 * LESSON 413 - Understanding & Configuring Query Behavior (Caching)
 *
 * This file demonstrates how to set up the QueryClientProvider,
 * which is REQUIRED for using Tanstack Query in your application.
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
 * AUTOMATIC REFETCHING EXAMPLE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "If we take a look at the developer tools and we open the Network tab there
 * and I now go out of this page back to the code, let's say, and then come
 * back to it. Then you'll see this HTTP request being sent here and that's
 * being sent because of Tanstack Query which for example reacts to us going
 * away from this screen and coming back to it."
 *
 * INSTRUCTOR QUOTE:
 * "And the advantage of this, of course is that, if some data should change,
 * for example if in my backend, in the data folder and the events.json folder,
 * if in there, I add an exclamation mark here, so if data changed on the
 * backend, because it was changed in some database, let's say, if that's
 * the case, now if I come back that updated data is fetched."
 *
 * INSTRUCTOR QUOTE:
 * "And this happens automatically because we're using Tanstack Query.
 * And that's just one of the many reasons why this can be a very helpful library."
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
import EditEvent from './components/Events/EditEvent.jsx';

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
 * │  3. Any component can import it to manually interact with the cache    │
 * │  4. Same instance ensures cache operations work correctly              │
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
