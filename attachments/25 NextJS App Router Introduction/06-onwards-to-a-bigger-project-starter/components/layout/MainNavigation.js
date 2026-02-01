/**
 * ============================================================================
 * MainNavigation.js - LESSON 485 & 489: NAVIGATION HEADER COMPONENT
 * ============================================================================
 *
 * LESSON 485: Created as standard React component with placeholder Link syntax
 * LESSON 489: Fixed Link import from 'next/link' and changed 'to' to 'href'
 *
 * ============================================================================
 * 🎓 LESSON 489: ADDING THE LAYOUT AND NAVIGATION
 * ============================================================================
 *
 * From the instructor:
 * "Now I did prepare some components here in the layout folder in the
 * Components folder that give our pages a general layout and also a main
 * navigation bar which holds some links, some list items with links.
 * We just need to use that."
 *
 * ============================================================================
 * 🔗 FIXING THE LINK COMPONENT
 * ============================================================================
 *
 * From the instructor:
 * "We get this error because in that main navigation component, I'm using
 * the link component but I'm not importing it deliberately because I wanted
 * to do this together with you again. We learned about this link component
 * and we import it from next/link."
 *
 * THE FIX (done in this lesson):
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE (React Router syntax - DOESN'T WORK):                           │
 * │                                                                          │
 * │  // No import                                                            │
 * │  <Link to='/'>All Meetups</Link>                                        │
 * │  <Link to='/new-meetup'>Add New Meetup</Link>                           │
 * │                                                                          │
 * │  AFTER (NextJS syntax - WORKS!):                                        │
 * │                                                                          │
 * │  import Link from 'next/link';                                          │
 * │  <Link href='/'>All Meetups</Link>                                      │
 * │  <Link href='/new-meetup'>Add New Meetup</Link>                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "However, the 'to' prop then should be changed to 'href' because the link
 * component offered by NextJS wants this 'href' prop where we define the
 * destination of that link."
 *
 * ============================================================================
 * 📍 KEY DIFFERENCE: React Router vs NextJS Link
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REACT ROUTER                        │  NEXTJS                          │
 * │  import { Link } from                │  import Link from                │
 * │    'react-router-dom';               │    'next/link';                  │
 * │                                       │                                  │
 * │  <Link to="/path">Text</Link>        │  <Link href="/path">Text</Link> │
 * │        ^^                             │        ^^^^                      │
 * │   Uses "to" prop                      │   Uses "href" prop              │
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
 * 1. "/" (All Meetups)
 *    → pages/index.js (home page)
 *    → Displays MeetupList with all meetups
 *
 * 2. "/new-meetup" (Add New Meetup)
 *    → pages/new-meetup/index.js
 *    → Displays NewMeetupForm
 *
 * ============================================================================
 * ⚡ NEXTJS LINK BENEFITS (SPA-LIKE NAVIGATION)
 * ============================================================================
 *
 * Using NextJS Link instead of regular <a> tags provides:
 *
 * 1. CLIENT-SIDE NAVIGATION
 *    - No full page reload when clicking links
 *    - JavaScript handles the navigation
 *    - Much faster user experience
 *
 * 2. AUTOMATIC PREFETCHING
 *    - NextJS prefetches linked pages in production
 *    - Pages load almost instantly when clicked
 *
 * 3. PRESERVES STATE
 *    - React state is maintained across navigations
 *    - No flash of white/blank page
 *
 * ============================================================================
 */

/**
 * Import Link from NextJS
 *
 * From the instructor:
 * "We learned about this link component and we import it from next/link."
 *
 * This is the NextJS Link component that enables:
 * - Client-side navigation (no page reload)
 * - Automatic prefetching in production
 * - SPA-like user experience
 */
import Link from 'next/link';

import classes from './MainNavigation.module.css';

/**
 * MainNavigation Component - Header with Logo and Navigation Links
 *
 * Renders the top navigation bar of the application.
 * Uses NextJS Link component for client-side navigation.
 *
 * From the instructor:
 * "With that link import added, if we now save everything and reload,
 * we got this nice navigation bar at the top here."
 */
function MainNavigation() {
  return (
    <header className={classes.header}>
      {/*
       * Logo/Brand Section
       * Just a styled div with the app name
       */}
      <div className={classes.logo}>React Meetups</div>

      {/*
       * Navigation Section
       * Contains links to the main pages of the application
       *
       * IMPORTANT: Using NextJS Link with "href" prop (not "to")
       *
       * From the instructor:
       * "The 'to' prop then should be changed to 'href' because the link
       * component offered by NextJS wants this 'href' prop where we define
       * the destination of that link."
       */}
      <nav>
        <ul>
          <li>
            {/*
             * Link to Home Page (All Meetups)
             *
             * Route: / (root)
             * File:  pages/index.js
             *
             * Uses href="/" (NextJS syntax, not to="/")
             */}
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            {/*
             * Link to Add New Meetup Page
             *
             * Route: /new-meetup
             * File:  pages/new-meetup/index.js
             *
             * Uses href="/new-meetup" (NextJS syntax, not to="/new-meetup")
             */}
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
