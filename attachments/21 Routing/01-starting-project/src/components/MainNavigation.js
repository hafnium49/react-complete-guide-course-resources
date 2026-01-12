/**
 * ============================================================================
 * MAIN NAVIGATION COMPONENT (Lessons 350, 352)
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
 *
 * ============================================================================
 * NAVLINK FOR ACTIVE LINK HIGHLIGHTING (Lesson 352)
 * ============================================================================
 *
 * THE PROBLEM (Lesson 352):
 * =========================
 * INSTRUCTOR QUOTE:
 * "At the moment you might notice that we got no real feedback when we're
 * hovering over these links. And you might also of course see that we can't
 * tell which link is currently active when we're on a page."
 *
 * THE SOLUTION - NAVLINK (Lesson 352):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "To support links that should show us whether they led to the currently
 * active page or not, react-router-dom has an alternative to the link
 * component, the NavLink component."
 *
 * INSTRUCTOR QUOTE:
 * "Now NavLink is used just like link. You can use it as a replacement for
 * link but NavLink has one special behavior."
 *
 * LINK vs NAVLINK:
 * ================
 * | Feature              | Link          | NavLink                          |
 * |----------------------|---------------|----------------------------------|
 * | Client-side routing  | Yes           | Yes                              |
 * | className prop       | String only   | String OR Function               |
 * | style prop           | Object only   | Object OR Function               |
 * | isActive detection   | No            | Yes (via className/style func)   |
 * | end prop             | No            | Yes (exact path matching)        |
 */

/**
 * NAVLINK IMPORT (Lesson 352):
 * ============================
 * INSTRUCTOR QUOTE (Lesson 352):
 * "To support links that should show us whether they led to the currently
 * active page or not, react-router-dom has an alternative to the link
 * component, the NavLink component."
 *
 * We replaced Link with NavLink to get active state detection.
 */
import { NavLink } from 'react-router-dom';

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
           * ================================================================
           * NAVIGATION LINKS WITH NAVLINK (Lessons 350, 352)
           * ================================================================
           *
           * INSTRUCTOR QUOTE (Lesson 350):
           * "And then here, we could have a home link and another list item
           * with the products link. And of course, we wanna set the appropriate
           * paths here, as well, and go to slash nothing and slash products."
           *
           * UPDATED TO NAVLINK (Lesson 352):
           * ================================
           * INSTRUCTOR QUOTE:
           * "Now NavLink is used just like link. You can use it as a
           * replacement for link but NavLink has one special behavior."
           */}
          <li>
            {/**
             * HOME NAVLINK WITH end PROP (Lesson 352):
             * ========================================
             * THE className FUNCTION (Lesson 352):
             * ------------------------------------
             * INSTRUCTOR QUOTE:
             * "If you add the class name prop to it, it's actually not the
             * regular class name prop, which takes a string, but instead it's
             * a prop that takes a function. And that function should return
             * the class name, the CSS class name that should be added to the
             * anchor tag."
             *
             * THE isActive PROPERTY (Lesson 352):
             * -----------------------------------
             * INSTRUCTOR QUOTE:
             * "Now that function also automatically receives an object from
             * which we can de-structure the isActive property. And this object
             * with the isActive property is provided by a react-router-dom and
             * is active as a Boolean, that's true if this link is currently
             * active."
             *
             * CONDITIONAL CLASS RETURN (Lesson 352):
             * --------------------------------------
             * INSTRUCTOR QUOTE:
             * "So therefore here we can use is active to conditionally return
             * CSS class a if this link is active and b, otherwise, or in our
             * case, we wanna add the active class from our imported CSS classes
             * up here if the link is active and otherwise return undefined."
             *
             * THE end PROP (Lesson 352):
             * ==========================
             * INSTRUCTOR QUOTE:
             * "And that's why react-router-dom also gives us another prop we
             * can set here and that's the end prop which we can set to true
             * or false but we can also just add it like this to set it to true."
             *
             * INSTRUCTOR QUOTE:
             * "This indicates that this link should only be considered active
             * if the currently active route ends with this path after the URL."
             *
             * WHY end IS NEEDED FOR HOME (Lesson 352):
             * ----------------------------------------
             * INSTRUCTOR QUOTE:
             * "That behavior exists so that a link could be treated as active
             * even if you're on some nested child route. That's nice to have
             * but not what we want here for the slash route since every route
             * starts with slash in the end. So this would always be active
             * for all routes."
             *
             * Without end: "/" matches "/", "/products", "/anything"
             * With end:    "/" only matches exactly "/"
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
             * PRODUCTS NAVLINK (Lesson 352):
             * ==============================
             * INSTRUCTOR QUOTE:
             * "And we'll do that for the other NavLink as well. Add the same
             * class name prop, which takes disfunction which gets the isActive
             * property on the object that's passed to the function automatically
             * by react-router-dom."
             *
             * WHY NO end PROP HERE? (Lesson 352):
             * ===================================
             * INSTRUCTOR QUOTE:
             * "We don't have to add end to this other link because we have no
             * other routes that would start with slash products."
             *
             * "/products" won't accidentally match other routes, so end
             * is not needed.
             */}
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

/**
 * ============================================================================
 * BONUS: INLINE STYLES WITH NAVLINK (Lesson 352)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 352):
 * "By the way, if you prefer inline styles, you can also use that. You get
 * the same function with isActive for inline styles. So here you could then
 * also return some conditional inline style that depends on whether this
 * route or this link is currently active or not."
 *
 * INLINE STYLE EXAMPLE:
 * =====================
 * <NavLink
 *   to="/"
 *   style={({ isActive }) => ({
 *     textDecoration: isActive ? 'underline' : 'none',
 *     color: isActive ? 'var(--color-primary-800)' : 'var(--color-primary-400)',
 *   })}
 *   end
 * >
 *   Home
 * </NavLink>
 *
 * Both className and style support the function form with NavLink!
 */
