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
 * ============================================================================
 * ADDING THE AUTHENTICATION ROUTE (Lesson 389)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And I added a new AuthForm component and its styling here which we'll use
 * in this section and a new authentication page. Though I haven't added any
 * route configuration to lead to that page yet. We're going to do that together
 * instead."
 *
 * INSTRUCTOR QUOTE:
 * "As a first step, I want to make sure that we have a way of going to that
 * authentication page maybe for a '/auth' route."
 */
import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';

/**
 * ============================================================================
 * IMPORTING LOGOUT ACTION (Lesson 395)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Therefore, I'll import that action here and import action as logoutAction
 * from ./pages/Logout."
 *
 * NOTE: We only import the action, NOT a component, because the Logout.js
 * file doesn't export a component - just an action function.
 *
 * This is an "action-only" route - no element/component to render.
 */
import { action as logoutAction } from './pages/Logout';

/**
 * ============================================================================
 * IMPORTING tokenLoader FOR REACTIVE AUTH STATE (Lesson 396)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now back in App.js, I will import this loader as the tokenLoader from
 * /util/auth and use that here on that root route."
 *
 * This loader will be registered on the root route to make the token
 * available throughout the entire application via useRouteLoaderData.
 */
import { tokenLoader } from './util/auth';

/**
 * Router Configuration
 *
 * ROUTES (Updated in Lesson 389):
 * - /              → HomePage (public)
 * - /auth          → AuthenticationPage (login/signup) ← NEW!
 * - /events        → EventsPage with list (public - GET doesn't require auth)
 * - /events/:id    → EventDetailPage (public - GET doesn't require auth)
 * - /events/:id/edit → EditEventPage (NEEDS AUTH - PATCH requires token)
 * - /events/new    → NewEventPage (NEEDS AUTH - POST requires token)
 * - /newsletter    → NewsletterPage
 *
 * TODO (This Section):
 * - Protect routes that modify data (new, edit, delete)
 * - Add logout functionality
 * - Store and manage JWT token
 */
const router = createBrowserRouter([
  {
    /**
     * ========================================================================
     * ROOT ROUTE WITH tokenLoader (Lesson 396)
     * ========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "And we could, for example, go to our root route which in the end wraps
     * all other routes as you can see. And there we could add a loader, which
     * simply takes a look at local storage and extracts the token."
     *
     * INSTRUCTOR QUOTE:
     * "And that token would then be available through the loader data of that
     * root route in all other routes."
     *
     * WHY ADD AN ID?
     *
     * INSTRUCTOR QUOTE:
     * "In order to use data from that loader and easily get access to it,
     * I'll assign an ID to that route. Root sounds like a fitting id."
     *
     * HOW CHILD ROUTES ACCESS THE TOKEN:
     * - Any child route can call useRouteLoaderData('root')
     * - Returns the token (string if logged in, null if not)
     * - Automatically updates when navigation occurs (e.g., after logout)
     *
     * WHY THIS IS "REACTIVE":
     * React Router re-runs loaders on navigation. So when user logs out:
     * 1. Logout action removes token from localStorage
     * 2. Logout action redirects to '/'
     * 3. React Router re-runs tokenLoader
     * 4. tokenLoader returns null (no token)
     * 5. All components using useRouteLoaderData('root') re-render
     * 6. UI updates to show logged-out state
     */
    path: '/',
    id: 'root',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
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
      /**
       * ============================================================================
       * AUTHENTICATION ROUTE - /auth (Updated in Lesson 391)
       * ============================================================================
       *
       * INSTRUCTOR QUOTE (Lesson 389):
       * "The auth route should still be part of my route layout. I still want to
       * have that navigation on top of it and so on. So therefore, it will be a
       * sibling route to this homepage and to this entire route stack of my
       * events routes."
       *
       * INSTRUCTOR QUOTE (Lesson 389):
       * "We could add it here, maybe in front of the newsletter though the exact
       * position doesn't matter. The path will be 'auth'. You could also add
       * '/auth' as this doesn't clash with the parent path, but a relative path
       * will do."
       *
       * WHY AS A SIBLING ROUTE?
       * - Keeps the RootLayout (with MainNavigation) visible
       * - User can navigate away using the header navigation
       * - Consistent layout across the entire app
       *
       * ============================================================================
       * REGISTERING THE ACTION (Lesson 391)
       * ============================================================================
       *
       * INSTRUCTOR QUOTE:
       * "The last thing we have to do though, which is easy to forget, is that we
       * add this action to our route definition. We must register it there,
       * otherwise it won't be picked up by React router."
       *
       * INSTRUCTOR QUOTE:
       * "So here I'm importing this action as my authAction. And this authAction
       * is now set up as an action here on this route."
       *
       * HOW IT WORKS:
       * 1. AuthForm uses <Form method="post"> to submit
       * 2. React Router sees the POST request on this route
       * 3. React Router calls the registered action function
       * 4. Action sends request to backend and handles response
       */
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      /**
       * ========================================================================
       * LOGOUT ROUTE - ACTION ONLY, NO COMPONENT (Lesson 395)
       * ========================================================================
       *
       * INSTRUCTOR QUOTE:
       * "And now I can register a new route that only has that action and no
       * component. And we learned about such routes before in the Routing
       * section already, so that shouldn't be too surprising or new."
       *
       * INSTRUCTOR QUOTE:
       * "I'll add a new route here where the path is simply logout and where
       * the action is that logout action I just created."
       *
       * WHAT'S SPECIAL ABOUT THIS ROUTE:
       * - Has an ACTION but NO ELEMENT
       * - Users never "visit" this page visually
       * - Only triggered via form submission (POST request)
       * - Immediately redirects after action completes
       *
       * HOW IT WORKS:
       * 1. User clicks logout button (which is inside a <Form>)
       * 2. Form submits POST request to /logout
       * 3. React Router calls this action
       * 4. Action removes token and redirects to '/'
       *
       * WHY NO ELEMENT?
       * There's nothing to display - logout is just an action.
       * The user sees the redirect destination, not a "logout page".
       */
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
