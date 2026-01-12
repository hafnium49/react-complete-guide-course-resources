/**
 * ============================================================================
 * EVENTS NAVIGATION COMPONENT (Lessons 358-359 - Pre-built Component)
 * ============================================================================
 *
 * PRE-BUILT COMPONENT (Lesson 358):
 * =================================
 * INSTRUCTOR QUOTE:
 * "You will see that there I already added some components, which we'll use
 * throughout this section, in which you, of course, can explore. In the end,
 * these are all relatively straightforward components with some default
 * styling provided."
 *
 * This is a secondary navigation component specifically for the events section.
 * It provides links to view all events or create a new event.
 *
 * ============================================================================
 * BONUS CHALLENGE: Nested Events Layout (Lesson 359)
 * ============================================================================
 *
 * ABOUT THIS BONUS TASK (Lesson 359):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "By the way, the last step is a bonus task which you can theoretically solve,
 * but which requires you to do something we haven't done before. So, don't
 * worry if you're not able to complete this task."
 *
 * INSTRUCTOR QUOTE:
 * "You will of course also see the solution for that in the next lecture.
 * But definitely feel free to give it a try on your own first."
 *
 * Use this component in a nested layout route that wraps all /events/* routes.
 *
 * IMPLEMENTATION HINT:
 * ====================
 * Create an EventsLayout component:
 *
 * function EventsLayout() {
 *   return (
 *     <>
 *       <EventsNavigation />
 *       <Outlet />
 *     </>
 *   );
 * }
 *
 * Then in your route definitions:
 * {
 *   path: 'events',
 *   element: <EventsLayout />,
 *   children: [
 *     { index: true, element: <EventsPage /> },
 *     { path: ':eventId', element: <EventDetailPage /> },
 *     { path: 'new', element: <NewEventPage /> },
 *     { path: ':eventId/edit', element: <EditEventPage /> },
 *   ]
 * }
 *
 * This creates a nested layout:
 * ┌─────────────────────────────────┐
 * │       RootLayout                │
 * │  ┌───────────────────────────┐  │
 * │  │    MainNavigation         │  │
 * │  │  [Home]  [Events]         │  │
 * │  └───────────────────────────┘  │
 * │  ┌───────────────────────────┐  │
 * │  │    <Outlet />             │  │
 * │  │  ┌─────────────────────┐  │  │
 * │  │  │  EventsLayout       │  │  │
 * │  │  │  [All Events] [New] │  │  │
 * │  │  │  ┌───────────────┐  │  │  │
 * │  │  │  │ <Outlet />    │  │  │  │
 * │  │  │  │ (Events Page) │  │  │  │
 * │  │  │  └───────────────┘  │  │  │
 * │  │  └─────────────────────┘  │  │
 * │  └───────────────────────────┘  │
 * └─────────────────────────────────┘
 *
 * IMPORTS NEEDED (after updating):
 * ================================
 * import { NavLink } from 'react-router-dom';
 */
import classes from './EventsNavigation.module.css';

/**
 * EVENTS NAVIGATION COMPONENT:
 * ============================
 * Secondary navigation for the events section.
 *
 * CURRENT STATE: Uses plain <a> tags with href
 * TARGET STATE: Use <NavLink> with active styling
 *
 * Note: Currently uses regular <a href="..."> which causes full page reloads.
 * Should be updated to use <NavLink> for proper SPA behavior.
 */
function EventsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/**
             * TODO: Replace with NavLink
             *
             * <NavLink
             *   to="/events"
             *   className={({ isActive }) =>
             *     isActive ? classes.active : undefined
             *   }
             *   end  // Only active on exactly /events, not /events/new etc.
             * >
             *   All Events
             * </NavLink>
             */}
            <a href="/events">All Events</a>
          </li>
          <li>
            {/**
             * TODO: Replace with NavLink
             *
             * <NavLink
             *   to="/events/new"
             *   className={({ isActive }) =>
             *     isActive ? classes.active : undefined
             *   }
             * >
             *   New Event
             * </NavLink>
             */}
            <a href="/events/new">New Event</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
