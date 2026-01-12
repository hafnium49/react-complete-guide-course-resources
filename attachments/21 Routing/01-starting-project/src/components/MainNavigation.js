/**
 * ============================================================================
 * MAIN NAVIGATION COMPONENT (Lesson 350)
 * ============================================================================
 *
 * WHY A NAVIGATION BAR? (Lesson 350):
 * ===================================
 * INSTRUCTOR QUOTE (Lesson 350):
 * "For example, we might want to add a navigation bar at the top, which
 * actually lets us navigate between the homepage and the products page.
 * That would be something you find on most websites, after all."
 *
 * WHY IN COMPONENTS FOLDER? (Lesson 350):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "Now for that, we could add a new component, which I'll add in a components
 * folder because I won't load it as a page. Instead, I want to include it
 * in other components."
 *
 * FOLDER ORGANIZATION:
 * ====================
 * | Folder      | Purpose                              | Loaded By         |
 * |-------------|--------------------------------------|-------------------|
 * | /pages      | Page-level components                | React Router      |
 * | /components | Reusable components (like navigation)| Other components  |
 *
 * WHY NOT ADD TO EACH PAGE? (Lesson 350):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "Now, this main navigation should, now, be visible on all our pages. So
 * therefore, of course, one thing we can do, is we can go to home JS and
 * import the main navigation there and then add it here. And do the same
 * in the products JS file. But of course, the more pages we're going to add
 * the more we must repeat that step. And whilst it would be possible to do
 * that, it would also be a bit annoying."
 *
 * THE SOLUTION:
 * =============
 * Instead of adding navigation to every page, we use a LAYOUT component
 * (RootLayout) that wraps all pages. See Root.js for implementation.
 */

import { Link } from 'react-router-dom';

/**
 * CSS MODULE IMPORT (Lesson 350):
 * ================================
 * INSTRUCTOR QUOTE:
 * "And for main navigation, I actually created a styling file which you find
 * attached to this lecture. The main navigation dot module dot CSS file.
 * And we can, then, import classes from that file."
 */
import classes from './MainNavigation.module.css';

/**
 * MAIN NAVIGATION COMPONENT:
 * ==========================
 * INSTRUCTOR QUOTE (Lesson 350):
 * "So here, we can add a main navigation component function and, of course,
 * also export it. And then here, we could return a header, which contains
 * a nav element, which contains an unordered list, where in every list item
 * we have a link."
 *
 * STRUCTURE:
 * ==========
 * <header>
 *   <nav>
 *     <ul>
 *       <li><Link to="/">Home</Link></li>
 *       <li><Link to="/products">Products</Link></li>
 *     </ul>
 *   </nav>
 * </header>
 *
 * SEMANTIC HTML:
 * ==============
 * - <header>: Marks the header section of the page
 * - <nav>: Indicates navigation section (good for accessibility)
 * - <ul>/<li>: List structure for navigation items
 * - <Link>: React Router's client-side navigation (not <a>!)
 */
function MainNavigation() {
  return (
    /**
     * APPLYING CSS MODULE CLASSES (Lesson 350):
     * =========================================
     * INSTRUCTOR QUOTE:
     * "And then, add a special class to the header element, the header class.
     * And add a special class to the unordered list, the list class."
     */
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {/**
           * NAVIGATION LINKS (Lesson 350):
           * ==============================
           * INSTRUCTOR QUOTE:
           * "And then here, we could have a home link and another list item
           * with the products link. And of course, we wanna set the appropriate
           * paths here, as well, and go to slash nothing and slash products."
           *
           * Using Link component (not <a>) for:
           * - Client-side routing (no page reload)
           * - Preserves application state
           * - Better performance
           */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
