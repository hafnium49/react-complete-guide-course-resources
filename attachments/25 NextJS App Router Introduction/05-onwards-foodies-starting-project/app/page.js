/**
 * ============================================================================
 * HOME PAGE - LESSONS 438-440: The Foodies Project
 * ============================================================================
 *
 * LESSON 438 - THE STARTING PAGE
 *
 * This is the home page for the Foodies/Meals app.
 * It was updated in Lesson 440 to include navigation links.
 *
 * ============================================================================
 * LESSON 440 - ADDING NAVIGATION LINKS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now with that, we got those three routes set up, but I also told you to
 * add some links that allow users to navigate between those routes. And
 * therefore that's exactly what I'll do here. And I'll start on the homepage
 * actually."
 *
 * ============================================================================
 * THE LINK COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "There, below this H1 element, I'll add a paragraph that should display a
 * link to the meals page. And for that, as you learned, you should use the
 * link component provided by NextJS."
 *
 * WHY USE <Link> INSTEAD OF <a>?
 *
 * INSTRUCTOR QUOTE:
 * "This is a component that renders an anchor element, but that also allows
 * NextJS to gain control of the ongoing navigation and keep you in that
 * single page application."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <a href="/meals">            │  <Link href="/meals">                   │
 * │  ─────────────────────────────│─────────────────────────────────────────│
 * │  Full page reload             │  Client-side navigation (SPA)           │
 * │  Slower user experience       │  Faster, smoother transitions           │
 * │  Loses React state            │  Preserves React state                  │
 * │  Browser requests new HTML    │  Next.js handles navigation             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * PATHS MAP TO FOLDER STRUCTURE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And of course, these paths, which I'm setting up here, do map to the paths
 * I set up in my folder structure. So slash meals goes to this page, meals
 * share goes to this page or this folder and community goes to this folder.
 * And then of course, the respective page JS files become active."
 *
 * LINK href TO FOLDER MAPPING:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Link href          │  Folder                    │  File activated      │
 * │  ───────────────────│────────────────────────────│──────────────────────│
 * │  /meals             │  app/meals/                │  page.js             │
 * │  /meals/share       │  app/meals/share/          │  page.js             │
 * │  /community         │  app/community/            │  page.js             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * IMPORTING THE LINK COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "So here, if I want a link that takes me to the meals page, we can use the
 * link component..."
 *
 * The Link component is provided by Next.js - no installation needed!
 * It's part of the 'next/link' module.
 */
import Link from 'next/link';

/**
 * HOME PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "There, below this H1 element, I'll add a paragraph that should display a
 * link to the meals page."
 *
 * @returns {JSX.Element} The home page content with navigation links
 */
export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>

      {/**
       * ====================================================================
       * NAVIGATION LINKS - LESSON 440
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "And then simply set the href attribute or the href prop to slash
       * meals. And of course, now we can also add extra links now, for
       * example, one that leads to slash meals slash share like this.
       * And then I'll add one last link that takes me to the community
       * page by pointing at slash community."
       *
       * Each link uses the Link component for SPA navigation.
       * The href values match our folder structure in app/.
       */}
      <p>
        <Link href="/meals">Meals</Link>
      </p>
      <p>
        <Link href="/meals/share">Share a meal</Link>
      </p>
      <p>
        <Link href="/community">Community</Link>
      </p>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 440 - TESTING THE ROUTES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And if you now save that and you then make sure that the development server
 * is up and running, which is the case on Code Sandbox, but which you have to
 * start manually locally, by the way, locally in order to start it, you also
 * have to run npm install first and then you should be able to start it."
 *
 * TO TEST LOCALLY:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. cd into the project folder                                          │
 * │  2. npm install (if not done already)                                   │
 * │  3. npm run dev                                                         │
 * │  4. Open http://localhost:3000 (or the shown port)                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And you should be able to see that starting page. Now those links here are
 * a bit hard to read. This is of course not the final styling, we'll make
 * this app look better throughout this section. But we have these links at
 * least, and we can click them."
 *
 * TESTING THE LINKS:
 *
 * INSTRUCTOR QUOTE:
 * "And if I click the meals link, I'm taken to the meals page. So that works.
 * If I click the share meal link, I'm taken to slash meals slash share, and
 * that also works. And if I click the community link, I'm unsurprisingly
 * taken to slash community and that community page."
 *
 * ============================================================================
 * LESSON 440 SUMMARY
 * ============================================================================
 *
 * WHAT WE ACCOMPLISHED:
 *
 * 1. Created /meals route (app/meals/page.js)
 * 2. Created /meals/share nested route (app/meals/share/page.js)
 * 3. Created /community sibling route (app/community/page.js)
 * 4. Created /meals/[mealSlug] dynamic route (app/meals/[mealSlug]/page.js)
 * 5. Added navigation links on the home page
 *
 * KEY CONCEPTS REINFORCED:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  CONCEPT              │  EXAMPLE                                        │
 * │  ─────────────────────│─────────────────────────────────────────────────│
 * │  Folder = URL segment │  app/meals/ → /meals                            │
 * │  Nested folder        │  app/meals/share/ → /meals/share                │
 * │  Sibling folder       │  app/community/ → /community                    │
 * │  Dynamic segment      │  app/meals/[mealSlug]/ → /meals/:mealSlug       │
 * │  Static precedence    │  /meals/share matches static before dynamic     │
 * │  Link component       │  SPA navigation, no full page reload            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And with that, we repeated what we learned and you got more practice with
 * this file-based router that's provided by NextJS. And we're therefore now
 * ready to finally start working on the contents of those pages and on making
 * this website more useful and beautiful."
 *
 * ============================================================================
 */
