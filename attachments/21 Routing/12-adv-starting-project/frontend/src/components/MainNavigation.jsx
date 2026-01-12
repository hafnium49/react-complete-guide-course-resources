/**
 * ============================================================================
 * MAIN NAVIGATION COMPONENT (Lesson 358 - Pre-built Component)
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
 * This component provides the main site navigation header.
 * It currently uses plain <a> tags which need to be updated.
 *
 * ============================================================================
 * CHALLENGE TASKS FOR THIS COMPONENT (Tasks 3, 4, 5)
 * ============================================================================
 *
 * TASK 3: Use in Root Layout
 * ==========================
 * Include this component in your RootLayout so it appears above all pages.
 *
 * TASK 4: Replace <a> with <NavLink>
 * ==================================
 * Current: <a>Home</a>
 * Should be: <NavLink to="/">Home</NavLink>
 *
 * Remember from Lesson 349:
 * - <a> tags cause full page reloads (bad for SPA)
 * - <Link> enables client-side navigation
 * - <NavLink> is like <Link> but supports active styling
 *
 * TASK 5: Add Active Link Styling
 * ===============================
 * Use NavLink's className function to add 'active' class:
 *
 * <NavLink
 *   to="/"
 *   className={({ isActive }) => isActive ? classes.active : undefined}
 *   end  // Required for home route to prevent always being active!
 * >
 *   Home
 * </NavLink>
 *
 * Note: The CSS module already has an .active class defined.
 *
 * IMPORTS NEEDED:
 * ===============
 * import { NavLink } from 'react-router-dom';
 */
import classes from './MainNavigation.module.css';

/**
 * MAIN NAVIGATION COMPONENT:
 * ==========================
 * Renders the main site header with navigation links.
 *
 * CURRENT STATE: Uses plain <a> tags (no href, no routing)
 * TARGET STATE: Use <NavLink> with active styling
 *
 * STRUCTURE:
 * ==========
 * <header>
 *   <nav>
 *     <ul>
 *       <li><NavLink to="/">Home</NavLink></li>
 *       <li><NavLink to="/events">Events</NavLink></li>
 *     </ul>
 *   </nav>
 * </header>
 */
function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/**
             * TODO: Replace with NavLink
             *
             * <NavLink
             *   to="/"
             *   className={({ isActive }) =>
             *     isActive ? classes.active : undefined
             *   }
             *   end  // Important! Prevents "/" from matching all routes
             * >
             *   Home
             * </NavLink>
             */}
            <a>Home</a>
          </li>
          <li>
            {/**
             * TODO: Replace with NavLink
             *
             * <NavLink
             *   to="/events"
             *   className={({ isActive }) =>
             *     isActive ? classes.active : undefined
             *   }
             * >
             *   Events
             * </NavLink>
             */}
            <a>Events</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
