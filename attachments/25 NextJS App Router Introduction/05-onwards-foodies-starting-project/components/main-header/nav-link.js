/**
 * ============================================================================
 * LESSON 449 - THE 'use client' DIRECTIVE FOR NAVLINK
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So therefore here in this NavLink component, at the top of this file, I'll
 * add use client because in this component I want to use a certain hook."
 *
 * WHY 'use client' IS NEEDED HERE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  This component uses usePathname hook to determine the current path     │
 * │  Hooks require client-side execution                                    │
 * │  Therefore, we need the 'use client' directive                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * KEEPING 'use client' AS LOW AS POSSIBLE IN THE COMPONENT TREE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So here we made sure that we still keep use client as far down as possible
 * by extracting it into an extra component instead of adding it to the main
 * header or, even worse, the entire layout component."
 *
 * COMPONENT TREE STRATEGY:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  layout.js           (SERVER COMPONENT - no 'use client')               │
 * │    └── MainHeader    (SERVER COMPONENT - no 'use client')               │
 * │         └── NavLink  (CLIENT COMPONENT - HAS 'use client') ← Only here! │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "It would, by the way, be pretty bad to add use client to the entire layout
 * component because that would then convert all components that are part of
 * that layout to client components, even all pages, because of course pages
 * are rendered as part of the layout."
 *
 * ============================================================================
 */
'use client';

/**
 * ============================================================================
 * NAV LINK COMPONENT - LESSON 449: Active Link Highlighting
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But that's not all I wanna do here. Instead, I also wanna make sure that
 * we can tell in the header which page we're on. So I want these links here
 * to receive some special highlighting if we are on the respective page."
 *
 * PURPOSE:
 * This component wraps the Next.js Link component to add active state
 * highlighting when the current path matches the link's href.
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * IMPORTING THE LINK COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "...the idea in this JavaScript file now is to export a component function
 * that can be called NavLink that should simply output that NavLink."
 *
 * INSTRUCTOR QUOTE:
 * "So that link component imported from next/link, which we're also already
 * using. But here in this NavLink component, I want to set some props on
 * that link based on some conditions."
 */
import Link from 'next/link';

/**
 * ============================================================================
 * IMPORTING usePathname HOOK FROM NEXT.JS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And the great thing is that we can find out which path the user is on
 * with help of a hook provided by NextJS. And that's the usePathname hook,
 * which can be imported from next/navigation."
 *
 * WHAT usePathname RETURNS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  usePathname() returns the current URL pathname as a string             │
 * │                                                                          │
 * │  EXAMPLES:                                                              │
 * │  - URL: http://localhost:3000/meals     → "/meals"                      │
 * │  - URL: http://localhost:3000/community → "/community"                  │
 * │  - URL: http://localhost:3000/          → "/"                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "So this hook gives us access to the path we're currently on."
 */
import { usePathname } from 'next/navigation';

/**
 * CSS Module import for NavLink-specific styles.
 * Contains the .link and .active classes.
 */
import classes from './nav-link.module.css';

/**
 * NAV LINK COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "...the idea in this JavaScript file now is to export a component function
 * that can be called NavLink that should simply output that NavLink."
 *
 * INSTRUCTOR QUOTE:
 * "And this is then a component we can use anywhere in our project where we
 * want to output a navigation link, a link that should receive a certain
 * class when the page we're currently on is matching the path the link is
 * pointing at."
 *
 * @param {Object} props - Component props
 * @param {string} props.href - The destination path for the link
 * @param {React.ReactNode} props.children - The link content (text)
 * @returns {JSX.Element} A Link component with active state highlighting
 */
export default function NavLink({ href, children }) {
  /**
   * GET CURRENT PATH WITH usePathname HOOK
   *
   * INSTRUCTOR QUOTE:
   * "And in this component, I want to get access to the current path, which
   * I can do with usePathname here by calling this hook."
   *
   * This hook:
   * - Returns the current URL pathname
   * - Updates automatically when the route changes
   * - Requires 'use client' directive (hooks don't work in Server Components)
   */
  const path = usePathname();

  /**
   * RENDER THE LINK WITH CONDITIONAL ACTIVE CLASS
   *
   * INSTRUCTOR QUOTE:
   * "So here we got our link, and I wanna set the class name to some class
   * conditionally. So I wanna check if the path starts with the href of
   * this link."
   *
   * INSTRUCTOR QUOTE:
   * "And if that's the case, I want to output classes.link, because I'm
   * importing that CSS module here, and then classes.active, so that we
   * assign both of these CSS classes if the path starts with the target
   * destination. Otherwise, I just wanna assign classes.link."
   *
   * USING startsWith() FOR PATH MATCHING:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  path.startsWith(href) checks if the current path begins with href     │
   * │                                                                          │
   * │  WHY startsWith() INSTEAD OF EXACT MATCH?                              │
   * │  - /meals matches /meals (exact)                                        │
   * │  - /meals matches /meals/some-meal-slug (nested routes)                │
   * │  - This means "Browse Meals" stays highlighted on meal detail pages    │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}

/**
 * ============================================================================
 * LESSON 449 NAV LINK SUMMARY
 * ============================================================================
 *
 * WHAT THIS COMPONENT DOES:
 *
 * INSTRUCTOR QUOTE:
 * "And this is then a component we can use anywhere in our project where we
 * want to output a navigation link, a link that should receive a certain
 * class when the page we're currently on is matching the path the link is
 * pointing at."
 *
 * KEY CONCEPTS DEMONSTRATED:
 *
 * 1. 'use client' DIRECTIVE
 *    - Required because we use the usePathname hook
 *    - Kept as low as possible in the component tree
 *
 * 2. usePathname HOOK
 *    - From 'next/navigation'
 *    - Returns the current URL pathname
 *    - Enables us to know which page we're on
 *
 * 3. CONDITIONAL CLASS ASSIGNMENT
 *    - Uses path.startsWith(href) to check if link matches current path
 *    - Assigns .active class in addition to .link class when matched
 *    - Template literals combine multiple classes: `${classes.link} ${classes.active}`
 *
 * 4. COMPONENT TREE OPTIMIZATION
 *
 *    INSTRUCTOR QUOTE:
 *    "So here we made sure that we still keep use client as far down as possible
 *    by extracting it into an extra component instead of adding it to the main
 *    header or, even worse, the entire layout component."
 *
 * ============================================================================
 */
