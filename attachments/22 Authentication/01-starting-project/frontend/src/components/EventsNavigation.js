/**
 * ============================================================================
 * EVENTS NAVIGATION COMPONENT (Updated in Lesson 396)
 * ============================================================================
 *
 * This component provides the sub-navigation for the Events section.
 * Shows "All Events" link to everyone, but "New Event" only to logged-in users.
 *
 * ============================================================================
 * CONDITIONAL "NEW EVENT" BUTTON (Lesson 396)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And we can use the same approach here for conditionally showing these edit
 * and delete buttons or this new event button."
 *
 * INSTRUCTOR QUOTE:
 * "For that, we can, for example, go to events navigation, which is where I
 * have this new event button and use the exact same approach as before."
 *
 * WHY HIDE "NEW EVENT" WHEN NOT LOGGED IN?
 * - Creating events requires authentication (POST /events is protected)
 * - Showing the link to unauthenticated users would lead to an error
 * - Better UX to hide options that won't work anyway
 *
 * ============================================================================
 */

/**
 * IMPORT CHANGES (Lesson 396):
 * - ADDED: useRouteLoaderData (for reactive token access)
 *
 * INSTRUCTOR QUOTE:
 * "Use the RouteLoaderData hook, which is imported from react-router-dom, to
 * get our token by getting the loader data from the root route."
 */
import { NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './EventsNavigation.module.css';

function EventsNavigation() {
  /**
   * ============================================================================
   * GETTING TOKEN FROM ROOT ROUTE LOADER (Lesson 396)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Use the RouteLoaderData hook, which is imported from react-router-dom, to
   * get our token by getting the loader data from the root route."
   *
   * Same pattern as MainNavigation - access the token from the root route's
   * loader to determine if we should show the "New Event" link.
   */
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
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
          {/*
           * ================================================================
           * NEW EVENT LINK - CONDITIONAL (Lesson 396)
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "And then we only show this new event link here if we have a token
           * and not otherwise, because if we're not logged in, it makes no
           * sense to show this."
           *
           * LOGIC: token means "show when logged in"
           * - token exists (truthy) → DO show "New Event"
           * - token is null (falsy) → DON'T show "New Event"
           */}
          {token && (
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New Event
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
