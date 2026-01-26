/**
 * ============================================================================
 * MEALS PAGE - LESSONS 440 & 450: Meals Listing with Grid Layout
 * ============================================================================
 *
 * LESSON 450 - OUTPUTTING MEALS DATA & IMAGES
 *
 * INSTRUCTOR QUOTE:
 * "Now that we worked on the starting page and the community page and improved
 * the header, it's finally time to work on that meals page and it's time to
 * output some meals there before we then thereafter, will make sure that users
 * can also share meals."
 *
 * INSTRUCTOR QUOTE:
 * "Now for that, it's this page.js file in the meals folder on which we'll
 * work. And there, I wanna output a bunch of meals, a bunch of meals which
 * we'll soon store in a database."
 *
 * ============================================================================
 * PAGE STRUCTURE OVERVIEW
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But before we'll do that, let's set up the base markup of this page, the
 * base structure of this page, you could say. And here I again wanna have a
 * header section, and then below that, the main section of this page."
 *
 * PAGE LAYOUT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <> (Fragment)                                                          │
 * │    <header>          ← Hero section with title and CTA                  │
 * │      ├── h1          ← "Delicious meals, created by you"                │
 * │      ├── p           ← Description text                                 │
 * │      └── p.cta       ← Link to share meals page                         │
 * │    <main>            ← Main content area                                │
 * │      └── MealsGrid   ← Grid of meal cards                               │
 * │  </>                                                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * LESSON 440 - CREATING THE /meals ROUTE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And in there we can set up a new route and a new path segment that can be
 * entered in the URL by simply adding a folder with that intended path segment
 * as a name. So for example, meals if we want to be able to go to our domain
 * slash meals."
 *
 * ============================================================================
 */

/**
 * IMPORTING THE LINK COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "...because in there, I then wanna have a link using the next/link component,
 * which therefore, of course, also is imported as it always is."
 */
import Link from 'next/link';

/**
 * ============================================================================
 * CSS MODULES IMPORT FOR PAGE STYLES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I also again prepared some styles and therefore, attached, you'll find
 * another page.module.css file, the page.module.css file for this meals page.
 * And we can and should then import this page.module.css file, again using
 * this special CSS modules import syntax so that we can access the CSS classes
 * set up in that file."
 */
import classes from './page.module.css';

/**
 * ============================================================================
 * IMPORTING THE MEALSGRID COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I will add a separate component for outputting the meals though, and
 * therefore, for that, back in my root components folder, I'll add a meals
 * subfolder to store any meal-related components."
 *
 * COMPONENT ORGANIZATION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  components/                                                            │
 * │  └── meals/                                                             │
 * │      ├── meals-grid.js       ← Displays meals in a grid                 │
 * │      └── meal-item.js        ← Individual meal card                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
import MealsGrid from '@/components/meals/meals-grid';

/**
 * MEALS PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "And then in this page.js file, you should export a component, a React
 * component, a functional component to be precise. In this case, you could
 * name it MealsPage, though this name here, as I mentioned, doesn't matter,
 * it's totally up to you, but you must export a component, that's important."
 *
 * @returns {JSX.Element} The meals listing page with header and grid
 */
export default function MealsPage() {
  return (
    <>
      {/**
       * ====================================================================
       * PAGE HEADER SECTION
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "Because there, for example, should be a class added to this header,
       * the header class like this."
       */}
      <header className={classes.header}>
        {/**
         * PAGE TITLE WITH HIGHLIGHTED TEXT
         *
         * INSTRUCTOR QUOTE:
         * "Now inside of that header, I then wanna have an h1 element where I
         * say, delicious meals, created, and then a span, by you. And I'm using
         * that span for some extra styling because to that span, I wanna assign
         * a class. To be precise, the highlight class like this."
         */}
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h1>

        {/**
         * DESCRIPTION PARAGRAPH
         *
         * INSTRUCTOR QUOTE:
         * "Below this h1 element, we can then add a paragraph which simply
         * outputs some dummy text, like choose your favorite recipe and cook
         * it yourself. It is easy and fun."
         */}
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>

        {/**
         * CALL-TO-ACTION LINK
         *
         * INSTRUCTOR QUOTE:
         * "Now below that paragraph, I wanna have yet another paragraph which
         * should receive a className of cta for call to action, because in
         * there, I then wanna have a link using the next/link component..."
         *
         * INSTRUCTOR QUOTE:
         * "And I'm using that Link component to link to that share page, so to
         * /meals/share, which will be the page that can be used by users later
         * to share their own meals with the community. And therefore, I'll say,
         * share your favorite recipe."
         */}
        <p className={classes.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>

      {/**
       * ====================================================================
       * MAIN CONTENT - MEALS GRID
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "I also wanna add a class to the main section, and that is the main
       * class that's added here."
       *
       * NOTE: The main class is available in the CSS module but not currently
       * used. It can be added for additional styling if needed.
       */}
      <main>
        {/**
         * MEALS GRID COMPONENT
         *
         * INSTRUCTOR QUOTE:
         * "Now, of course, at the moment we have no data source yet, so at the
         * moment, we won't see anything on the screen. Nonetheless, we can
         * already take this MealsGrid component here and go to this page.js
         * file in the meals folder and output it here. But at the moment, I'll
         * set meals to an empty array because, as mentioned, we have no meals yet."
         *
         * DATA FLOW:
         * ┌─────────────────────────────────────────────────────────────────┐
         * │  Currently: meals = []  (empty, no data yet)                    │
         * │  Future: meals will come from database                          │
         * │                                                                  │
         * │  MealsPage passes meals → MealsGrid maps over them →            │
         * │  MealItem displays each meal card                               │
         * └─────────────────────────────────────────────────────────────────┘
         */}
        <MealsGrid meals={[]} />
      </main>
    </>
  );
}

/**
 * ============================================================================
 * LESSON 450 - MEALS PAGE SUMMARY
 * ============================================================================
 *
 * WHAT WE BUILT:
 *
 * 1. PAGE STRUCTURE
 *    - Header with title, description, and CTA link
 *    - Main section with MealsGrid component
 *
 * 2. COMPONENT HIERARCHY
 *    ┌─────────────────────────────────────────────────────────────────────────┐
 *    │  MealsPage (this file)                                                  │
 *    │    └── MealsGrid                                                        │
 *    │          └── MealItem (for each meal)                                   │
 *    │                ├── Image (with fill prop)                               │
 *    │                └── Link (dynamic path to meal details)                  │
 *    └─────────────────────────────────────────────────────────────────────────┘
 *
 * 3. STYLING
 *    - CSS Modules for scoped page styles
 *    - Gradient highlight effect on "by you" text
 *    - CTA button styled link
 *
 * 4. CURRENT STATE
 *
 *    INSTRUCTOR QUOTE:
 *    "So if we save that and we go to the Browse Meals page, we see our header,
 *    which allows us to go to that share meal page, but we see no meals yet,
 *    but that's what we'll add next."
 *
 * NEXT STEPS (Future Lessons):
 * - Set up a database to store meals
 * - Fetch meals data and pass to MealsGrid
 * - Implement the share meals functionality
 *
 * ============================================================================
 */
