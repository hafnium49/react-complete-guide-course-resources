/**
 * ============================================================================
 * MainNavigation.js - LESSON 485: NAVIGATION HEADER COMPONENT
 * ============================================================================
 *
 * This is a standard React navigation component. Notice that it currently
 * uses React Router's `<Link to="...">` syntax, which you'll need to update
 * to NextJS's `<Link href="...">` syntax in upcoming lessons!
 *
 * From the instructor:
 * "These are mostly just React components and standard React code.
 * There's nothing NextJS specific about those files."
 *
 * ============================================================================
 * ⚠️ IMPORTANT: LINK SYNTAX NEEDS TO BE UPDATED!
 * ============================================================================
 *
 * CURRENT (React Router syntax - WON'T WORK IN NEXTJS):
 * <Link to='/'>All Meetups</Link>
 * <Link to='/new-meetup'>Add New Meetup</Link>
 *
 * NEEDS TO BE CHANGED TO (NextJS syntax):
 * import Link from 'next/link';
 * <Link href='/'>All Meetups</Link>
 * <Link href='/new-meetup'>Add New Meetup</Link>
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  KEY DIFFERENCE                                                          │
 * │                                                                          │
 * │  React Router:    <Link to="/path">...</Link>                           │
 * │  NextJS:          <Link href="/path">...</Link>                         │
 * │                                                                          │
 * │  Also, NextJS Link is imported from 'next/link'                         │
 * │  React Router Link is imported from 'react-router-dom'                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 COMPONENT PURPOSE
 * ============================================================================
 *
 * This navigation component provides:
 *
 * 1. LOGO/BRAND
 *    - "React Meetups" text logo
 *    - Styled distinctively in the header
 *
 * 2. NAVIGATION LINKS
 *    - "All Meetups" → Links to home page (/)
 *    - "Add New Meetup" → Links to new meetup form (/new-meetup)
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  React Meetups                    All Meetups | Add New Meetup   │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * │  ^-- Logo                                      ^-- Navigation Links     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🛤️ ROUTES THIS COMPONENT LINKS TO
 * ============================================================================
 *
 * You'll create these page files in upcoming lessons:
 *
 * 1. "/" (All Meetups)
 *    → pages/index.js (home page)
 *    → Will display MeetupList with all meetups
 *
 * 2. "/new-meetup" (Add New Meetup)
 *    → pages/new-meetup.js OR pages/new-meetup/index.js
 *    → Will display NewMeetupForm
 *
 * ============================================================================
 * 🎨 STYLING WITH CSS MODULES
 * ============================================================================
 *
 * Styles are imported from MainNavigation.module.css:
 *
 * • classes.header - Styles the header container (background, padding, etc.)
 * • classes.logo - Styles the brand/logo text
 *
 * CSS Modules automatically scope class names to avoid conflicts:
 * • .header in CSS becomes a unique hash like .MainNavigation_header__abc123
 *
 * ============================================================================
 * 📂 LOCATION IN PROJECT STRUCTURE
 * ============================================================================
 *
 * From the instructor:
 * "We get components for showing meetups as a list, for showing details
 * about a meetup, for showing a form, for having a layout with a navigation,
 * and some UI components."
 *
 *   /components/
 *   └── /layout/
 *       ├── Layout.js           (imports this component)
 *       ├── Layout.module.css
 *       ├── MainNavigation.js   ← THIS FILE
 *       └── MainNavigation.module.css
 *
 * ============================================================================
 * ⚛️ REACT CONCEPTS USED
 * ============================================================================
 *
 * 1. SEMANTIC HTML
 *    - <header> - Identifies this as the page header
 *    - <nav> - Identifies this as navigation
 *    - <ul>/<li> - Proper list structure for nav links
 *
 * 2. CSS MODULES
 *    - Scoped styling with classes object
 *    - Prevents global CSS conflicts
 *
 * 3. LINK COMPONENT (Currently React Router, needs NextJS update)
 *    - Client-side navigation (no full page reload)
 *    - Enables SPA-like behavior
 *
 * ============================================================================
 */

// TODO: Add this import when converting to NextJS:
// import Link from 'next/link';

import classes from './MainNavigation.module.css';

/**
 * MainNavigation Component - Header with Logo and Navigation Links
 *
 * Renders the top navigation bar of the application.
 *
 * NOTE: This component currently uses React Router's Link syntax!
 * You'll need to:
 * 1. Import Link from 'next/link'
 * 2. Change "to" props to "href" props
 *
 * The Link component in NextJS uses "href" instead of "to":
 *
 * BEFORE (React Router):
 *   <Link to="/path">Text</Link>
 *
 * AFTER (NextJS):
 *   <Link href="/path">Text</Link>
 */
function MainNavigation() {
  return (
    <header className={classes.header}>
      {/*
       * Logo/Brand Section
       * Just a styled div with the app name
       * Could be replaced with an actual logo image
       */}
      <div className={classes.logo}>React Meetups</div>

      {/*
       * Navigation Section
       * Contains links to the main pages of the application
       *
       * ⚠️ CURRENT CODE USES REACT ROUTER SYNTAX!
       * The <Link to="..."> syntax is from React Router.
       *
       * FOR NEXTJS, CHANGE TO:
       *
       * import Link from 'next/link';
       *
       * <Link href='/'>All Meetups</Link>
       * <Link href='/new-meetup'>Add New Meetup</Link>
       */}
      <nav>
        <ul>
          <li>
            {/*
             * Link to Home Page (All Meetups)
             *
             * Route: / (root)
             * File:  pages/index.js (to be created)
             *
             * ⚠️ Change "to" to "href" for NextJS!
             */}
            <Link to='/'>All Meetups</Link>
          </li>
          <li>
            {/*
             * Link to Add New Meetup Page
             *
             * Route: /new-meetup
             * File:  pages/new-meetup.js (to be created)
             *
             * ⚠️ Change "to" to "href" for NextJS!
             */}
            <Link to='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
