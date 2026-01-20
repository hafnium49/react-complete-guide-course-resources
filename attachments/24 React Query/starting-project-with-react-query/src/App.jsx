/**
 * ============================================================================
 * APP COMPONENT - Lesson 412: Setting Up QueryClientProvider
 * ============================================================================
 *
 * LESSON 412 - Installing & Using Tanstack Query
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
 * - QueryClient: Configuration object that manages the cache and settings
 * - QueryClientProvider: React Context provider that makes QueryClient
 *   available to all child components
 */
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Events from './components/Events/Events.jsx';
import EventDetails from './components/Events/EventDetails.jsx';
import NewEvent from './components/Events/NewEvent.jsx';
import EditEvent from './components/Events/EditEvent.jsx';

/**
 * CREATING THE QUERY CLIENT
 *
 * INSTRUCTOR QUOTE:
 * "Because with that we can now go down here and as a first step,
 * create a Query client by simply instantiating QueryClient like this.
 * This is a general configuration object, you could say, that will be
 * required by Tanstack Query."
 *
 * The QueryClient can be configured with default options:
 *
 * const queryClient = new QueryClient({
 *   defaultOptions: {
 *     queries: {
 *       staleTime: 5 * 60 * 1000,  // Data is fresh for 5 minutes
 *       cacheTime: 10 * 60 * 1000, // Cache persists for 10 minutes
 *       refetchOnWindowFocus: true, // Refetch when tab regains focus
 *       retry: 3,                   // Retry failed requests 3 times
 *     },
 *   },
 * });
 *
 * For now, we use defaults (which includes refetchOnWindowFocus: true)
 */
const queryClient = new QueryClient();

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
