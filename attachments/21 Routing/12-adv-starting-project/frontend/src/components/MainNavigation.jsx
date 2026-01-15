/**
 * ============================================================================
 * MAIN NAVIGATION COMPONENT (Lessons 358-360, 380 - Tasks 4 & 5 + useFetcher)
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
 *
 * ============================================================================
 * TASK 4 SOLUTION - ADDING LINKS (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "The fourth step is that we should add properly working links to
 * MainNavigation, so to this MainNavigation.js file."
 *
 * INSTRUCTOR QUOTE:
 * "And here indeed at the moment, I just have some anchor elements that
 * don't do anything."
 *
 * IMPORTING LINK (Lesson 360):
 * ============================
 * INSTRUCTOR QUOTE:
 * "Now as you learned before, what we want to do instead is we want to
 * import the Link component from react-router-dom if you want to construct
 * a link instead of using the anchor element."
 *
 * REPLACING ANCHOR ELEMENTS (Lesson 360):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "So we wanna use that here instead of the anchor elements. And then on
 * those links, we have to add the to prop to define where those links
 * should lead to."
 *
 * WHY ABSOLUTE PATHS (Lesson 360):
 * ================================
 * INSTRUCTOR QUOTE:
 * "The whole link should lead to slash nothing. And I'm deliberately using
 * an absolute path here because it should always lead back to that starting
 * page and not add anything after the path of the currently active route,
 * that's not what should happen."
 *
 * INSTRUCTOR QUOTE:
 * "Instead, it should always go back to the starting page. And here for the
 * same reason, I always want to go to /events, not add anything after the
 * currently active path, but instead always go back to /events."
 *
 * ============================================================================
 * TASK 5 SOLUTION - ACTIVE LINK STYLING (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "The fifth step actually builds up on the fourth step because now we should
 * adjust those links in the MainNavigation such that they reflect whether a
 * link is currently active or not, so whether a link was responsible for the
 * currently active page or not."
 *
 * USING NavLink INSTEAD OF Link (Lesson 360):
 * ===========================================
 * INSTRUCTOR QUOTE:
 * "And we of course also learned how that works. We have to use the special
 * NavLink component instead of the regular link component."
 *
 * INSTRUCTOR QUOTE:
 * "NavLink is also imported from react-router-dom. And we still add the to
 * prop, but now we can add the className and we could have added that to
 * link as well."
 *
 * className FUNCTION (Lesson 360):
 * ================================
 * INSTRUCTOR QUOTE:
 * "But with NavLink, className receives a function which gets an object
 * automatically provided by React Router where we can get the isActive prop
 * with help of destructuring, which is what I'm doing here."
 *
 * INSTRUCTOR QUOTE:
 * "And then we can use this isActive prop to dynamically add the active class,
 * which is defined in this MainNavigation.module CSS file. And otherwise,
 * alternatively use undefined or render undefined."
 *
 * THE `end` PROP - CRITICAL FOR HOME LINK (Lesson 360):
 * =====================================================
 * INSTRUCTOR QUOTE:
 * "And with that, we actually do highlight the active link, but we have a
 * problem which we also encountered before already, that the Home link is
 * always active."
 *
 * INSTRUCTOR QUOTE:
 * "Now I explained before that this happens because actually React Router
 * checks for the start of the path and we can override that by adding end
 * here, the end prop on this Home NavLink."
 *
 * INSTRUCTOR QUOTE:
 * "This ensures that this link is only treated as active if the currently
 * active route ends with this path."
 *
 * RESULT (Lesson 360):
 * ====================
 * INSTRUCTOR QUOTE:
 * "With that, Home is active if we are on the HomePage but not if we are
 * on the EventsPage."
 *
 * ============================================================================
 * LESSON 380: NEWSLETTER LINK AND SHARED COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "You'll find an updated main navigation js file where I added a new link
 * and this new newsletter signup component."
 *
 * INSTRUCTOR QUOTE:
 * "And for that, it's important to understand that we have this newsletter
 * signup form, both on the newsletter page as well as on every other page
 * because it is included here in the main navigation."
 *
 * INSTRUCTOR QUOTE:
 * "So it's not just on one single page, but on all pages."
 *
 * WHY THIS MATTERS FOR useFetcher (Lesson 380):
 * =============================================
 * The NewsletterSignup form appears in this navigation, which means it's
 * visible on ALL pages. When a user submits the form, we want to:
 * - Trigger the /newsletter action
 * - Stay on the current page (NOT navigate to /newsletter)
 *
 * This is exactly what useFetcher solves!
 *
 * INSTRUCTOR QUOTE:
 * "The problem is however, that this form is included on all routes because
 * it's part of the main navigation. Therefore, we would have to add the action
 * to all routes and that would of course be a lot of code duplication and also
 * clash with other actions that we might need for our routes."
 *
 * ============================================================================
 */
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
/**
 * LESSON 380: IMPORTING NEWSLETTER SIGNUP COMPONENT
 * =================================================
 * INSTRUCTOR QUOTE:
 * "You'll find an updated main navigation js file where I added a new link
 * and this new newsletter signup component."
 *
 * This component uses useFetcher internally to:
 * - Submit to /newsletter action
 * - Stay on current page (no navigation)
 * - Show success feedback via alert
 */
import NewsletterSignup from './NewsletterSignup';

/**
 * MAIN NAVIGATION COMPONENT:
 * ==========================
 * Renders the main site header with navigation links.
 *
 * SOLUTION IMPLEMENTED:
 * - Uses <NavLink> instead of <a> tags
 * - className function for active styling
 * - `end` prop on home link to prevent it from always being active
 *
 * STRUCTURE:
 * ==========
 * <header>
 *   <nav>
 *     <ul>
 *       <li><NavLink to="/" end>Home</NavLink></li>
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
             * HOME LINK (Lesson 360):
             * =======================
             * ABSOLUTE PATH: to="/"
             * - Always navigates to root, regardless of current URL
             *
             * className FUNCTION:
             * - Receives { isActive } from React Router
             * - Returns classes.active when this is the active route
             * - Returns undefined otherwise (no class applied)
             *
             * end PROP - CRITICAL:
             * - Without this, "/" would match ALL routes (/, /events, etc.)
             * - With end, "/" only matches when URL is exactly "/"
             *
             * INSTRUCTOR QUOTE:
             * "This ensures that this link is only treated as active if
             * the currently active route ends with this path."
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
             * EVENTS LINK (Lesson 360):
             * =========================
             * ABSOLUTE PATH: to="/events"
             * - Always navigates to /events, regardless of current URL
             *
             * NO end PROP NEEDED:
             * - We want this to be active for /events AND /events/*
             * - So /events, /events/e1, /events/new all highlight this link
             *
             * INSTRUCTOR QUOTE:
             * "And then we can also add className here for my Events link."
             */}
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          {/**
           * ================================================================
           * LESSON 380: NEWSLETTER LINK
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "You'll find an updated main navigation js file where I added
           * a new link and this new newsletter signup component."
           *
           * This link navigates to the dedicated newsletter page at /newsletter.
           * The page shows the same form as in the navigation, but on its own page.
           */}
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      {/**
       * ================================================================
       * LESSON 380: NEWSLETTER SIGNUP COMPONENT IN NAVIGATION
       * ================================================================
       *
       * INSTRUCTOR QUOTE:
       * "And for that, it's important to understand that we have this
       * newsletter signup form, both on the newsletter page as well as
       * on every other page because it is included here in the main
       * navigation."
       *
       * INSTRUCTOR QUOTE:
       * "So it's not just on one single page, but on all pages."
       *
       * WHY useFetcher IS NECESSARY HERE:
       * =================================
       * INSTRUCTOR QUOTE:
       * "The problem is however, that this form is included on all routes
       * because it's part of the main navigation."
       *
       * INSTRUCTOR QUOTE:
       * "Therefore, we would have to add the action to all routes and
       * that would of course be a lot of code duplication and also clash
       * with other actions that we might need for our routes."
       *
       * SOLUTION:
       * =========
       * NewsletterSignup uses useFetcher internally, which:
       * - Triggers the /newsletter action regardless of current route
       * - Does NOT navigate away from the current page
       * - Provides feedback via alert when submission succeeds
       *
       * INSTRUCTOR QUOTE:
       * "Now this is such a common use case that React Router has a
       * solution for it. There is a special hook which you can import
       * from react-router-dom, and that is the useFetcher hook."
       */}
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
