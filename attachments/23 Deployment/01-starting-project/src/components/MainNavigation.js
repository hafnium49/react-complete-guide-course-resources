/**
 * ============================================================================
 * MAIN NAVIGATION COMPONENT (Lesson 408 - Client-Side Routing)
 * ============================================================================
 *
 * This navigation demonstrates CLIENT-SIDE ROUTING with React Router.
 *
 * ============================================================================
 * HOW NAVLINK ENABLES CLIENT-SIDE NAVIGATION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 408):
 * "When we click blog here, the logic for moving to the blog component is
 * executed in the browser, not on the server."
 *
 * When users click these <NavLink> elements:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 1. React Router intercepts the click event                              │
 * │ 2. Prevents the default browser behavior (no page reload!)             │
 * │ 3. Uses History API to update the URL in the address bar               │
 * │ 4. React Router matches the new URL to a route                         │
 * │ 5. Renders the appropriate component (BlogPage, HomePage, etc.)        │
 * │                                                                          │
 * │ Result: Instant navigation with NO server request! ✅                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "This navigation is provided by a React Router, so by a package that's
 * part of our React project. And that code for evaluating the URL and
 * loading different components executes in the browser."
 *
 * ============================================================================
 * WHY THIS MATTERS FOR DEPLOYMENT
 * ============================================================================
 *
 * Clicking links vs. typing URLs:
 *
 * CLICKING LINKS (what these NavLinks do):
 * - Navigation handled entirely by JavaScript in the browser
 * - No server request needed
 * - Works automatically, no special server config required
 *
 * TYPING URL DIRECTLY (e.g., user types yoursite.com/posts):
 * - Browser MUST send request to server
 * - Server must be configured to return index.html for ALL routes
 * - Otherwise: 404 error (server can't find /posts folder)
 *
 * INSTRUCTOR QUOTE:
 * "It's even called react-router-dom. So it's a client side package.
 * It's not executing on a server."
 *
 * ============================================================================
 */

import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

/**
 * MainNavigation Component
 *
 * Uses <NavLink> from react-router-dom for client-side navigation.
 * NavLink is identical to Link but adds styling capabilities for active state.
 *
 * KEY DIFFERENCE FROM <a> TAGS:
 * - Regular <a href="/posts"> would cause full page reload (server request)
 * - <NavLink to="/posts"> intercepts click and uses History API (no reload)
 */
function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            {/**
             * NavLink uses client-side routing:
             * - Clicking this does NOT send a request to the server
             * - JavaScript updates the URL and renders HomePage
             * - The `end` prop ensures exact matching for "/" path
             */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            {/**
             * Clicking "Blog" triggers client-side navigation:
             * - React Router changes URL to /posts
             * - Matches the route and renders BlogPage
             * - If BlogPage is lazy-loaded, downloads the chunk first
             * - No server involved in this navigation!
             */}
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Blog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
