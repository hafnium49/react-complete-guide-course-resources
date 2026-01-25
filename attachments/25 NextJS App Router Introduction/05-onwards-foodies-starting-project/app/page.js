/**
 * ============================================================================
 * HOME PAGE - LESSONS 438-440, 446, 447 & 448: The Foodies Starting Page
 * ============================================================================
 *
 * ============================================================================
 * LESSON 448 - THIS PAGE IS A SERVER COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for example, by default, all those React components you have in your
 * NextJS project, no matter if they're pages, layouts or standard components
 * are only rendered on the Server. That's why they're called React Server
 * components."
 *
 * This page.js file is a SERVER COMPONENT because:
 * - It has NO 'use client' directive at the top
 * - It doesn't use useState, useEffect, or event handlers directly
 * - It CAN import and use Client Components (like ImageSlideshow)
 *
 * IMPORTANT: A Server Component CAN render Client Components as children.
 * The ImageSlideshow component has 'use client' in its own file, so it
 * works correctly even though this page is a Server Component.
 *
 * ============================================================================
 * LESSON 447 - ADDING THE IMAGE SLIDESHOW
 *
 * ============================================================================
 * LESSON 446 - STYLING THE STARTING PAGE
 *
 * INSTRUCTOR QUOTE:
 * "Now that we finished the header, let's continue working on this main page
 * content, on this starting page content. And that means that we need to work
 * on this page.js file inside of the app folder."
 *
 * ============================================================================
 * WHICH PAGE.JS FILE?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So not any nested page.js file, but this main root page.js file directly
 * in the app folder. Because that is that starting page we're seeing, that's
 * the page that's being rendered if we visit our address slash nothing, so if
 * we have no segment thereafter."
 *
 * FILE LOCATION MATTERS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/page.js           → /         (THIS FILE - starting page)         │
 * │  app/meals/page.js     → /meals    (meals listing)                     │
 * │  app/community/page.js → /community (community page)                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * PAGE STRUCTURE OVERVIEW
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And here on this page, I actually don't wanna have the content we currently
 * have there. Instead, my goal is to have some header here, so not the main
 * navigation header, but some nested page-specific header that introduces
 * users to this page, you could say. And then below that, the main section
 * of this page."
 *
 * PAGE LAYOUT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <> (Fragment - required for sibling JSX)                               │
 * │    <header>           ← Page-specific hero header                       │
 * │      ├── slideshow    ← Image carousel (placeholder for now)            │
 * │      └── content      ← Hero text + CTA buttons                         │
 * │    <main>             ← Main content sections                           │
 * │      ├── section      ← "How it works"                                  │
 * │      └── section      ← "Why NextLevel Food?"                           │
 * │  </>                                                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * CSS MODULES ON PAGES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I also prepared some styles which we can use here, and therefore, attached,
 * you'll find a page.module.css file. And yes, you can use CSS modules on
 * pages as well, because in the end, that's also just a regular component
 * file. Just treat it in a special way by Next.js."
 *
 * ============================================================================
 */

/**
 * IMPORTING THE LINK COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "In that cta area, I then wanna have two links that allow us to go to
 * different places, and I'm still importing that link component, so we
 * don't have to change anything there."
 */
import Link from 'next/link';

/**
 * IMPORTING CSS MODULE FOR PAGE-SPECIFIC STYLES
 *
 * INSTRUCTOR QUOTE:
 * "But with that, we can import our classes from this page.module.css file..."
 *
 * Just like with components, pages can have their own CSS modules.
 * The scoped class names prevent style conflicts with other pages.
 */
import classes from './page.module.css';

/**
 * ============================================================================
 * LESSONS 447 & 448 - IMPORTING THE IMAGE SLIDESHOW COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 448):
 * "And with that added, we can go back to that main page and bring back that
 * import and bring back that component here. And now you will see that if you
 * reload, this works, we no longer get an error and we now have that image
 * here which changes every five seconds."
 *
 * HOW THIS WORKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  page.js (this file)       = SERVER COMPONENT (no 'use client')        │
 * │  ImageSlideshow            = CLIENT COMPONENT (has 'use client')       │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  Server Components CAN import and render Client Components!            │
 * │  The Client Component handles its own client-side logic.               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ImageSlideshow works because it has 'use client' in its own file,
 * which tells Next.js to run that specific component on the client.
 */
import ImageSlideshow from '@/components/images/image-slideshow';

/**
 * HOME PAGE COMPONENT
 *
 * This is the starting page (/) of the NextLevel Food application.
 * It serves as a landing page with marketing content and navigation.
 *
 * @returns {JSX.Element} The home page with hero header and content sections
 */
export default function Home() {
  return (
    /**
     * ====================================================================
     * FRAGMENT FOR SIBLING JSX ELEMENTS
     * ====================================================================
     *
     * INSTRUCTOR QUOTE:
     * "Now, since sibling JSX content is not allowed like this, we have to
     * wrap that into a fragment in order to make this work."
     *
     * React requires a single root element. Fragments (<>...</>) let us
     * return multiple siblings without adding extra DOM elements.
     */
    <>
      {/**
       * ====================================================================
       * PAGE-SPECIFIC HEADER (Not the main navigation header)
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "...my goal is to have some header here, so not the main navigation
       * header, but some nested page-specific header that introduces users
       * to this page..."
       *
       * INSTRUCTOR QUOTE:
       * "...and then add a class to this header, for example, to be precise
       * at the header class here."
       *
       * This header contains the landing page hero content:
       * - An image slideshow (to be implemented later)
       * - Marketing headline and tagline
       * - Call-to-action buttons
       */}
      <header className={classes.header}>
        {/**
         * ====================================================================
         * LESSONS 447 & 448 - IMAGE SLIDESHOW COMPONENT
         * ====================================================================
         *
         * INSTRUCTOR QUOTE (Lesson 448):
         * "And now you will see that if you reload, this works, we no longer
         * get an error and we now have that image here which changes every
         * five seconds. And that's now the behavior I want here, now unlocked
         * with help of client components."
         *
         * The slideshow cycles through food images every 5 seconds.
         * It works because ImageSlideshow has 'use client' directive,
         * making it a Client Component that can use useState and useEffect.
         */}
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>

        {/**
         * CONTENT WRAPPER
         *
         * INSTRUCTOR QUOTE:
         * "In addition here, I'll add another div below that other div here,
         * which contains two more divs..."
         *
         * Contains the hero section and call-to-action section.
         */}
        <div>
          {/**
           * HERO SECTION - Marketing Text
           *
           * INSTRUCTOR QUOTE:
           * "...where the first inner div here will receive a class name of
           * hero..."
           *
           * INSTRUCTOR QUOTE:
           * "Now, in that hero div here, I wanna have my h1 title where I'll
           * say, NextLevel Food for NextLevel Foodies, or any other catchy
           * phrase of your choice. And below that, a paragraph where we could
           * say, taste and share food from all over the world. So this is
           * simply some marketing text here."
           */}
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>

          {/**
           * CALL-TO-ACTION SECTION
           *
           * INSTRUCTOR QUOTE:
           * "...and that second div inside of a div will receive a class name
           * of cta for call to action."
           *
           * INSTRUCTOR QUOTE:
           * "In that cta area, I then wanna have two links that allow us to
           * go to different places..."
           */}
          <div className={classes.cta}>
            {/**
             * COMMUNITY LINK
             *
             * INSTRUCTOR QUOTE:
             * "The first link should say, Join the Community, and the href
             * should point to that community page with slash community."
             */}
            <Link href="/community">Join the Community</Link>

            {/**
             * MEALS LINK
             *
             * INSTRUCTOR QUOTE:
             * "And the second link should point to the meals page and say,
             * Explore Meals, like this."
             */}
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>

      {/**
       * ====================================================================
       * MAIN CONTENT SECTIONS
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "Now, in that main area here, in that main section, I just wanna have
       * some dummy text, which I prepared for you. Attached, you'll find my
       * page.js file, which is the same file you see here, just also with
       * some extra sections added into this main block here..."
       */}
      <main>
        {/**
         * "HOW IT WORKS" SECTION
         *
         * Explains the platform's purpose and functionality to new visitors.
         */}
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        {/**
         * "WHY NEXTLEVEL FOOD?" SECTION
         *
         * Additional marketing content to encourage user engagement.
         */}
        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}

/**
 * ============================================================================
 * LESSONS 446, 447 & 448 SUMMARY
 * ============================================================================
 *
 * LESSON 446 - STYLING THE STARTING PAGE:
 * - Restructured the page layout with header and main sections
 * - Applied CSS Modules to a page component
 * - Used fragments for multiple root elements
 *
 * LESSON 447 - ADDING THE IMAGE SLIDESHOW:
 * - Created ImageSlideshow component with useState and useEffect
 * - Imported and used it in the slideshow container
 * - Encountered Server Component error (hooks don't work in Server Components)
 *
 * ============================================================================
 * LESSON 448 - SERVER VS CLIENT COMPONENTS (THE FIX)
 * ============================================================================
 *
 * THE SOLUTION:
 * Added 'use client' directive to ImageSlideshow component file.
 *
 * INSTRUCTOR QUOTE:
 * "So therefore here, in order to make this slideshow component work, we have
 * to add this use client directive at the top of this file."
 *
 * WHY THIS PAGE REMAINS A SERVER COMPONENT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  This page.js does NOT have 'use client' - it's a Server Component     │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  • It doesn't use useState, useEffect, or event handlers               │
 * │  • It CAN import Client Components (like ImageSlideshow)               │
 * │  • The Client Component handles its own client-side interactivity      │
 * │  • Server Components get better SEO and performance benefits           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * KEY LESSON 448 CONCEPTS:
 *
 * INSTRUCTOR QUOTE:
 * "And it's super important to know about this difference and to understand
 * that these two component types exist in general in React, but really only
 * work and can be used when using a framework like NextJS."
 *
 * SERVER COMPONENTS (default):
 * - Execute only on the server
 * - console.log appears in terminal (not browser)
 * - Cannot use hooks or event handlers
 * - Better for SEO and performance
 *
 * CLIENT COMPONENTS ('use client'):
 * - Pre-rendered on server, hydrated on client
 * - console.log appears in browser
 * - CAN use hooks and event handlers
 * - Required for interactivity
 *
 * CURRENT COMPONENT HIERARCHY:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  page.js (SERVER COMPONENT - this file)                                │
 * │    └── ImageSlideshow (CLIENT COMPONENT - has 'use client')            │
 * │          └── Uses useState, useEffect for image cycling                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
