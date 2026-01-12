/**
 * ============================================================================
 * EVENTS NAVIGATION COMPONENT (Lessons 358-360 - Bonus Task Solution)
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
 * BONUS TASK SOLUTION - EVENTS NAVIGATION (Lesson 360)
 * ============================================================================
 *
 * ABOUT THIS BONUS TASK (Lesson 359):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "By the way, the last step is a bonus task which you can theoretically solve,
 * but which requires you to do something we haven't done before. So, don't
 * worry if you're not able to complete this task."
 *
 * FIXING THE LINKS (Lesson 360):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "So now with this events navigation added in this EventsRootLayout as a
 * nested layout route that wraps all these events specific routes, I just
 * wanna fix the links in the EventsNavigation.js file."
 *
 * USING NavLink (Lesson 360):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "And I will again do this by importing NavLink from react-router-dom and
 * replace this anchor element with NavLink. Also here for the closing tag,
 * of course."
 *
 * INSTRUCTOR QUOTE:
 * "And then here, we have to /events and to /events new."
 *
 * ADDING className AND end PROP (Lesson 360):
 * ===========================================
 * INSTRUCTOR QUOTE:
 * "And now I just also want to add my className here, where I get this
 * isActive prop with destructuring and where I will check if it's true.
 * And if it is, I will add classes.active and otherwise, undefined."
 *
 * INSTRUCTOR QUOTE:
 * "And I will do the same here for the New Event."
 *
 * INSTRUCTOR QUOTE:
 * "I will also add the end prop here to the first NavLink so that this is
 * not active if we are on /events new, but only if we are on just /events."
 *
 * RESULT (Lesson 360):
 * ====================
 * INSTRUCTOR QUOTE:
 * "With that, we also get some active styling here and we can navigate
 * between these pages."
 *
 * ============================================================================
 * NESTED LAYOUT STRUCTURE
 * ============================================================================
 *
 * This component is used inside EventsRootLayout:
 *
 * function EventsRootLayout() {
 *   return (
 *     <>
 *       <EventsNavigation />  ← This component
 *       <Outlet />
 *     </>
 *   );
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
 * │  │  │  EventsRootLayout   │  │  │
 * │  │  │  ┌───────────────┐  │  │  │
 * │  │  │  │EventsNavigation│ │  │  │
 * │  │  │  │[All Events][New]│ │  │  │
 * │  │  │  └───────────────┘  │  │  │
 * │  │  │  ┌───────────────┐  │  │  │
 * │  │  │  │ <Outlet />    │  │  │  │
 * │  │  │  │ (Events Page) │  │  │  │
 * │  │  │  └───────────────┘  │  │  │
 * │  │  └─────────────────────┘  │  │
 * │  └───────────────────────────┘  │
 * └─────────────────────────────────┘
 *
 * ============================================================================
 */
import { NavLink } from 'react-router-dom';

import classes from './EventsNavigation.module.css';

/**
 * EVENTS NAVIGATION COMPONENT:
 * ============================
 * Secondary navigation for the events section.
 *
 * SOLUTION IMPLEMENTED:
 * - Uses <NavLink> instead of <a> tags
 * - className function for active styling
 * - `end` prop on "All Events" link
 *
 * This navigation appears on ALL /events/* pages due to
 * the nested layout route structure.
 */
function EventsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/**
             * ALL EVENTS LINK (Lesson 360):
             * =============================
             * ABSOLUTE PATH: to="/events"
             * - Navigates to the events index page
             *
             * end PROP - IMPORTANT:
             * - Without this, "/events" would match /events/new, /events/e1, etc.
             * - With end, "/events" only matches when URL is exactly "/events"
             *
             * INSTRUCTOR QUOTE:
             * "I will also add the end prop here to the first NavLink so that
             * this is not active if we are on /events new, but only if we are
             * on just /events."
             */}
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Events
            </NavLink>
          </li>
          <li>
            {/**
             * NEW EVENT LINK (Lesson 360):
             * ============================
             * ABSOLUTE PATH: to="/events/new"
             * - Navigates to the new event form page
             *
             * NO end PROP NEEDED:
             * - This is a terminal route (no child routes)
             * - Will only be active when URL is exactly "/events/new"
             */}
            <NavLink
              to="/events/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Event
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
