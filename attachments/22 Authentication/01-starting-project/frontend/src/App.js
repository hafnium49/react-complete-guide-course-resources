/**
 * ============================================================================
 * AUTHENTICATION SECTION - REACT FRONTEND APP (Lesson 388)
 * ============================================================================
 *
 * This is the main React application file that sets up routing.
 * This section builds on the Routing section we completed earlier.
 *
 * INSTRUCTOR QUOTE:
 * "This is the same application we already worked on in the Routing course
 * section, and therefore we are still dealing with those events you saw there."
 *
 * ============================================================================
 * WHAT IS AUTHENTICATION? (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now let's start by clarifying what exactly authentication means. In the
 * end it means that certain resources, certain backend routes, for example,
 * should be protected and should not be accessible by everyone."
 *
 * INSTRUCTOR QUOTE:
 * "So the front end application, the React application that wants to access
 * certain backend resources must authenticate before this access is granted.
 * It must get permission."
 *
 * ============================================================================
 * THE AUTHENTICATION FLOW (Lesson 388)
 * ============================================================================
 *
 * 1. User enters credentials (email + password)
 * 2. React app sends credentials to backend API
 * 3. Backend validates credentials
 * 4. Backend creates JWT token (signed with private key)
 * 5. Backend sends token back to React app
 * 6. React app STORES the token
 * 7. React app ATTACHES token to future protected requests
 * 8. Backend validates token and grants/denies access
 *
 * INSTRUCTOR QUOTE:
 * "On the client side, in the React app we have to store that token,
 * attach it to future outgoing requests, and use that token as an indicator
 * whether a user is logged in or not because we might want to update the UI
 * too, for example, show a logout button if we are logged in."
 *
 * ============================================================================
 * TOKEN-BASED AUTH VS SERVER-SIDE SESSIONS (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Server side sessions are a great way of solving authentication... but they
 * do require a tight coupling between backend and frontend because the backend
 * must store information about the client."
 *
 * INSTRUCTOR QUOTE:
 * "With React apps you are often talking to decoupled backend APIs which are
 * not closely coupled to a client and which don't store any client site
 * information. And that's where authentication tokens come into play."
 *
 * | Approach          | Storage             | Best For              |
 * |-------------------|---------------------|-----------------------|
 * | Server Sessions   | Server stores info  | Full-stack apps       |
 * | Auth Tokens (JWT) | Client stores token | Decoupled React + API |
 *
 * ============================================================================
 * CURRENT ROUTE STRUCTURE (TO BE ENHANCED)
 * ============================================================================
 *
 * Currently, this app has no authentication. Throughout this section, we'll:
 * 1. Add an Authentication page (/auth route)
 * 2. Implement login/signup functionality
 * 3. Store and manage the JWT token
 * 4. Protect routes that require authentication
 * 5. Attach tokens to protected API requests
 * 6. Update UI based on authentication state (show/hide buttons)
 *
 * ============================================================================
 */

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

/**
 * Router Configuration
 *
 * CURRENT ROUTES:
 * - /              → HomePage (public)
 * - /events        → EventsPage with list (public - GET doesn't require auth)
 * - /events/:id    → EventDetailPage (public - GET doesn't require auth)
 * - /events/:id/edit → EditEventPage (NEEDS AUTH - PATCH requires token)
 * - /events/new    → NewEventPage (NEEDS AUTH - POST requires token)
 * - /newsletter    → NewsletterPage
 *
 * TODO (This Section):
 * - Add /auth route for Authentication page
 * - Protect routes that modify data (new, edit, delete)
 * - Add logout functionality
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            // Events list - PUBLIC (GET /events doesn't require auth)
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            // Event detail - PUBLIC (GET /events/:id doesn't require auth)
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                // DELETE action - NEEDS AUTH (will need token)
                action: deleteEventAction,
              },
              {
                // Edit event - NEEDS AUTH (PATCH requires token)
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            // New event - NEEDS AUTH (POST requires token)
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      // TODO: Add authentication route here
      // {
      //   path: 'auth',
      //   element: <AuthenticationPage />,
      //   action: authAction,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
