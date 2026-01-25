/**
 * ============================================================================
 * HOME PAGE - LESSONS 438-440 & 446: The Foodies Starting Page
 * ============================================================================
 *
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
         * SLIDESHOW CONTAINER
         *
         * INSTRUCTOR QUOTE:
         * "Now in that header, I then later wanna have a div, which should
         * receive a class of slideshow, because here, we'll soon have a
         * image slideshow, or a couple of images that change automatically,
         * that simply show different food images. So that's one thing."
         *
         * This is currently empty - the slideshow component will be added
         * in a future lesson.
         */}
        <div className={classes.slideshow}></div>

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
 * LESSON 446 SUMMARY: STYLING THE STARTING PAGE
 * ============================================================================
 *
 * WHAT WE ACCOMPLISHED:
 *
 * 1. RESTRUCTURED THE PAGE LAYOUT
 *    - Added a page-specific header (different from main navigation)
 *    - Created slideshow placeholder for future image carousel
 *    - Built hero section with headline and tagline
 *    - Added call-to-action links
 *
 * 2. APPLIED CSS MODULES TO A PAGE
 *    INSTRUCTOR QUOTE:
 *    "And yes, you can use CSS modules on pages as well, because in the end,
 *    that's also just a regular component file."
 *
 * 3. USED FRAGMENTS FOR MULTIPLE ROOT ELEMENTS
 *    INSTRUCTOR QUOTE:
 *    "Now, since sibling JSX content is not allowed like this, we have to
 *    wrap that into a fragment in order to make this work."
 *
 * RESULT:
 *
 * INSTRUCTOR QUOTE:
 * "With that done, you should see something like this on the screen, which I
 * would say looks a lot better than what we had before."
 *
 * NEXT STEP (Slideshow):
 *
 * INSTRUCTOR QUOTE:
 * "But of course here, we also have this blank space where I wanna add that
 * image slideshow, and that is there for what we'll work on next."
 *
 * CURRENT PAGE STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <>                                                                     │
 * │    <header className={classes.header}>                                  │
 * │      <div className={classes.slideshow}></div>  ← Empty (slideshow)    │
 * │      <div>                                                              │
 * │        <div className={classes.hero}>                                   │
 * │          <h1>NextLevel Food for NextLevel Foodies</h1>                  │
 * │          <p>Taste & share food from all over the world.</p>             │
 * │        </div>                                                           │
 * │        <div className={classes.cta}>                                    │
 * │          <Link href="/community">Join the Community</Link>              │
 * │          <Link href="/meals">Explore Meals</Link>                       │
 * │        </div>                                                           │
 * │      </div>                                                             │
 * │    </header>                                                            │
 * │    <main>                                                               │
 * │      <section className={classes.section}>How it works...</section>     │
 * │      <section className={classes.section}>Why NextLevel Food?...</section>│
 * │    </main>                                                              │
 * │  </>                                                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
