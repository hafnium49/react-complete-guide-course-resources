/**
 * ============================================================================
 * COMMUNITY PAGE - LESSONS 440 & 449: Community Page Content
 * ============================================================================
 *
 * LESSON 449 - UPDATING THE COMMUNITY PAGE
 *
 * INSTRUCTOR QUOTE:
 * "But that's not all I wanna do here. Instead, I also wanna make sure that
 * we can tell in the header which page we're on. So I want these links here
 * to receive some special highlighting if we are on the respective page."
 *
 * While the main focus of Lesson 449 is on creating the NavLink component
 * for active link highlighting, we also update the community page with
 * proper content including icons showing community perks.
 *
 * ============================================================================
 * LESSON 440 - CREATING THE /community ROUTE (SIBLING ROUTE)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But there also is another route, not nested into the meals folder, but
 * instead a sibling to the meals folder. And that is the community route."
 *
 * SIBLING ROUTE STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/                                                                   │
 * │  ├── meals/           ← One top-level route                             │
 * │  │   └── page.js      → /meals                                          │
 * │  └── community/       ← SIBLING (same level as meals)                   │
 * │      └── page.js      → /community (THIS FILE)                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * Next.js Image component for optimized image rendering.
 * Used here for the community perk icons.
 */
import Image from 'next/image';

/**
 * ============================================================================
 * ICON IMPORTS FROM ASSETS FOLDER
 * ============================================================================
 *
 * These icons represent the three main benefits of joining the community.
 * Using the @ alias (configured in jsconfig.json) for clean import paths.
 */
import mealIcon from '@/assets/icons/meal.png';
import communityIcon from '@/assets/icons/community.png';
import eventsIcon from '@/assets/icons/events.png';

/**
 * CSS Module import for community page styles.
 * Creates scoped class names to prevent style conflicts.
 */
import classes from './page.module.css';

/**
 * COMMUNITY PAGE COMPONENT
 *
 * Displays information about the NextLevel Food community and its benefits.
 * This page encourages users to join and participate in the community.
 *
 * PAGE STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <> (Fragment)                                                          │
 * │    <header>          ← Hero section with tagline                        │
 * │      ├── h1          ← "One shared passion: Food"                       │
 * │      └── p           ← Call to action text                              │
 * │    <main>            ← Community perks section                          │
 * │      ├── h2          ← "Community Perks"                                │
 * │      └── ul          ← List of three benefits with icons                │
 * │  </>                                                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @returns {JSX.Element} The community page content
 */
export default function CommunityPage() {
  return (
    <>
      {/**
       * HEADER SECTION - Community Hero
       *
       * Introduces the community with an engaging tagline that
       * emphasizes the shared passion for food.
       */}
      <header className={classes.header}>
        <h1>
          One shared passion: <span className={classes.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>

      {/**
       * MAIN SECTION - Community Perks
       *
       * Showcases the three main benefits of joining the community.
       * Each perk has an icon and descriptive text.
       */}
      <main className={classes.main}>
        <h2>Community Perks</h2>

        {/**
         * PERKS LIST
         *
         * Each list item contains:
         * - An Image component with an icon
         * - A paragraph describing the benefit
         *
         * The three perks highlight:
         * 1. Recipe sharing and discovery
         * 2. Social connections with like-minded people
         * 3. Exclusive community events
         */}
        <ul className={classes.perks}>
          <li>
            <Image src={mealIcon} alt="A delicious meal" />
            <p>Share & discover recipes</p>
          </li>
          <li>
            <Image src={communityIcon} alt="A crowd of people, cooking" />
            <p>Find new friends & like-minded people</p>
          </li>
          <li>
            <Image src={eventsIcon} alt="A crowd of people at a cooking event" />
            <p>Participate in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
}

/**
 * ============================================================================
 * LESSON 449 COMMUNITY PAGE SUMMARY
 * ============================================================================
 *
 * WHAT WE UPDATED:
 *
 * 1. ADDED ICON IMPORTS
 *    - meal.png, community.png, events.png from assets/icons
 *
 * 2. ADDED CSS MODULE
 *    - page.module.css for scoped styling
 *
 * 3. RESTRUCTURED JSX
 *    - Header with highlighted tagline
 *    - Main section with community perks list
 *
 * THIS PAGE REMAINS A SERVER COMPONENT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • No 'use client' directive                                            │
 * │  • No useState, useEffect, or event handlers                            │
 * │  • Just renders static content with images                              │
 * │  • Better SEO and performance                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
