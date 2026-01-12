/**
 * ============================================================================
 * EVENTS ROOT LAYOUT COMPONENT (Lesson 360 - Bonus Task Solution)
 * ============================================================================
 *
 * BONUS TASK SOLUTION (Lesson 360):
 * =================================
 * INSTRUCTOR QUOTE:
 * "Now the last task here is this bonus task where we can add a nested layout
 * route that adds the EventNavigation component, which already exists in the
 * component's folder, this component here, as a wrapper around all the routes
 * that start with /events in their paths."
 *
 * INSTRUCTOR QUOTE:
 * "So around all these routes in the end."
 *
 * CREATING THE NESTED LAYOUT (Lesson 360):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "Well, and even though we haven't done that yet, it's actually not too
 * difficult. We just add a new route definition where the path is events,
 * not /events, but events because it is nested in this root route and I want
 * to have a relative to this parent route path."
 *
 * INSTRUCTOR QUOTE:
 * "Then here, the element is a new page, which we have yet to add, which is
 * the EventsRoot. So here we have the EventsRootLayout component, that is
 * how we could name it."
 *
 * SIMILARITY TO ROOT LAYOUT (Lesson 360):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "And this component is very similar to the RootLayout component we created
 * before. It's actually almost exactly the same."
 *
 * STRUCTURE OF THE COMPONENT (Lesson 360):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "I just want to return to JSX elements. And the first one is the
 * EventsNavigation which is imported from the appropriate file. And below
 * that I have my Outlet."
 *
 * PURPOSE OF OUTLET (Lesson 360):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "And that Outlet component is imported from react-router-dom. And I'm
 * rendering the Outlet component here because I wanna use this
 * EventsRootLayout component as a wrapper around other pages, where the
 * content of those pages should be rendered in this place where I have
 * this Outlet component as a marker, so to say."
 *
 * ============================================================================
 * NESTED LAYOUT STRUCTURE
 * ============================================================================
 *
 * This creates a two-level layout nesting:
 *
 * ┌─────────────────────────────────────────┐
 * │ RootLayout                              │
 * │ ┌─────────────────────────────────────┐ │
 * │ │ MainNavigation                      │ │
 * │ │ [Home]  [Events]                    │ │
 * │ └─────────────────────────────────────┘ │
 * │ ┌─────────────────────────────────────┐ │
 * │ │ <main>                              │ │
 * │ │ ┌─────────────────────────────────┐ │ │
 * │ │ │ <Outlet /> → EventsRootLayout   │ │ │
 * │ │ │ ┌─────────────────────────────┐ │ │ │
 * │ │ │ │ EventsNavigation            │ │ │ │
 * │ │ │ │ [All Events]  [New Event]   │ │ │ │
 * │ │ │ └─────────────────────────────┘ │ │ │
 * │ │ │ ┌─────────────────────────────┐ │ │ │
 * │ │ │ │ <Outlet /> → Page content   │ │ │ │
 * │ │ │ │ (EventsPage, EventDetail,   │ │ │ │
 * │ │ │ │  NewEvent, EditEvent)       │ │ │ │
 * │ │ │ └─────────────────────────────┘ │ │ │
 * │ │ └─────────────────────────────────┘ │ │
 * │ └─────────────────────────────────────┘ │
 * └─────────────────────────────────────────┘
 *
 * ============================================================================
 * ROUTE CONFIGURATION
 * ============================================================================
 *
 * {
 *   path: '/',
 *   element: <RootLayout />,
 *   children: [
 *     { index: true, element: <HomePage /> },
 *     {
 *       path: 'events',
 *       element: <EventsRootLayout />,  // ← This component
 *       children: [
 *         { index: true, element: <EventsPage /> },
 *         { path: ':eventId', element: <EventDetailPage /> },
 *         { path: 'new', element: <NewEventPage /> },
 *         { path: ':eventId/edit', element: <EditEventPage /> },
 *       ]
 *     }
 *   ]
 * }
 *
 * ============================================================================
 */
import { Outlet } from 'react-router-dom';
import EventsNavigation from '../components/EventsNavigation';

/**
 * EVENTS ROOT LAYOUT COMPONENT:
 * =============================
 * A nested layout specifically for the /events/* routes.
 *
 * Provides:
 * - Secondary EventsNavigation (All Events / New Event)
 * - Outlet for rendering events-specific child routes
 *
 * This demonstrates NESTED LAYOUTS:
 * - RootLayout provides MainNavigation for ALL routes
 * - EventsRootLayout provides EventsNavigation for /events/* routes only
 *
 * When visiting /events/e1:
 * 1. RootLayout renders MainNavigation + Outlet
 * 2. Outlet renders EventsRootLayout
 * 3. EventsRootLayout renders EventsNavigation + its own Outlet
 * 4. Inner Outlet renders EventDetailPage
 */
function EventsRootLayout() {
  return (
    <>
      {/**
       * EVENTS NAVIGATION:
       * ==================
       * Secondary navigation specific to the events section.
       * Only appears on /events/* routes.
       *
       * Contains links to:
       * - All Events (/events)
       * - New Event (/events/new)
       */}
      <EventsNavigation />
      {/**
       * OUTLET FOR EVENTS PAGES (Lesson 360):
       * =====================================
       * INSTRUCTOR QUOTE:
       * "I'm rendering the Outlet component here because I wanna use this
       * EventsRootLayout component as a wrapper around other pages, where
       * the content of those pages should be rendered in this place where
       * I have this Outlet component as a marker, so to say."
       *
       * This Outlet renders:
       * - /events → EventsPage (index route)
       * - /events/:eventId → EventDetailPage
       * - /events/new → NewEventPage
       * - /events/:eventId/edit → EditEventPage
       */}
      <Outlet />
    </>
  );
}

export default EventsRootLayout;
