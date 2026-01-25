/**
 * ============================================================================
 * MEAL DETAILS PAGE - LESSON 440: Setting Up The Meals Routes
 * ============================================================================
 *
 * LESSON 440 - CREATING THE DYNAMIC /meals/[mealSlug] ROUTE
 *
 * INSTRUCTOR QUOTE:
 * "Now, there also was another task to also create a dynamic route that allows
 * users to go to slash meals slash some dynamic segment, some identifier of
 * the meal a user wants to view."
 *
 * ============================================================================
 * DYNAMIC ROUTE SETUP
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "For that, back in that app folder, back in that meals folder, since that
 * page that should be added is nested inside the meals path, it's slash meals
 * slash some dynamic element. And therefore inside of that meals folder, we
 * add another sub folder, which is a sibling to the share folder."
 *
 * FOLDER RELATIONSHIP:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/meals/                                                             │
 * │  ├── page.js           → /meals                                         │
 * │  ├── share/            ← SIBLING (static route)                         │
 * │  │   └── page.js       → /meals/share                                   │
 * │  └── [mealSlug]/       ← SIBLING (dynamic route) - THIS FOLDER          │
 * │      └── page.js       → /meals/* (THIS FILE)                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * SQUARE BRACKET SYNTAX
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And we turn that into a dynamic route here by adding square bracket to the
 * folder name. And then between those square bracket, as you learned, you put
 * any identifier of your choice, for example, meal slug, but again, this is
 * up to you."
 *
 * NAMING THE DYNAMIC SEGMENT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  [mealSlug]   → params.mealSlug   (instructor's choice)                 │
 * │  [slug]       → params.slug       (also valid)                          │
 * │  [id]         → params.id         (also valid)                          │
 * │  [anything]   → params.anything   (it's YOUR choice!)                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * STATIC vs DYNAMIC ROUTE PRIORITY
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And now this page here will become active whenever the user enters the
 * address slash meals slash something, which is not shared though because
 * NextJS is smart enough to understand that if you are visiting slash meals
 * slash share that it's this page that should become active and not this
 * dynamic page, even though theoretically share could be treated as a value
 * for this dynamic segment."
 *
 * NEXT.JS ROUTE MATCHING PRIORITY:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  URL                │  Matched Route        │  Why?                     │
 * │  ───────────────────│───────────────────────│───────────────────────────│
 * │  /meals/share       │  app/meals/share/     │  STATIC has precedence    │
 * │  /meals/something   │  app/meals/[mealSlug]/│  No static match → dynamic│
 * │  /meals/ABC         │  app/meals/[mealSlug]/│  No static match → dynamic│
 * │  /meals/my-meal     │  app/meals/[mealSlug]/│  No static match → dynamic│
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "But NextJS is smart enough to see and understand that there is a more
 * specifically named folder, which therefore has precedence over this dynamic
 * segment. But anything but share like something or ABC, or my dash meal will
 * be treated as a value for this dynamic segment and will lead to the
 * activation of this page.js file."
 *
 * ============================================================================
 */

/**
 * MEAL DETAILS PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "And therefore with that here we can export another component function,
 * which could be named meal details page where I want to output the title
 * here where I say meal details like this."
 *
 * This is placeholder content. Later in this section, we'll:
 * - Use params.mealSlug to fetch meal data from a database
 * - Display the meal's image, ingredients, and instructions
 * - Show information about who created the meal
 *
 * @returns {JSX.Element} The meal details page content
 */
export default function MealDetailsPage() {
  return (
    <h1>Meal Details</h1>
  );
}

/**
 * ============================================================================
 * LESSON 440 - DYNAMIC ROUTES SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. DYNAMIC ROUTE SYNTAX: [folderName]
 *    - Square brackets create a dynamic segment
 *    - The name inside becomes the key in params
 *
 * 2. STATIC ROUTES HAVE PRECEDENCE
 *    - /meals/share matches the static route first
 *    - Only non-matching paths go to the dynamic route
 *    - This is automatic - no configuration needed!
 *
 * 3. IDENTIFIER IS YOUR CHOICE
 *    - [mealSlug], [id], [slug] - all valid
 *    - Choose something descriptive for your use case
 *
 * 4. ONE FILE, MANY URLS
 *    - This single page.js handles ALL dynamic meal URLs
 *    - /meals/burger, /meals/pizza, /meals/any-meal-name
 *
 * PRACTICAL APPLICATION (coming in future lessons):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  // Access the dynamic value:                                           │
 * │  export default function MealDetailsPage({ params }) {                  │
 * │    const mealSlug = params.mealSlug;                                    │
 * │    // Use mealSlug to fetch data from database                          │
 * │    // const meal = await getMeal(mealSlug);                             │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * FINAL ROUTE STRUCTURE AFTER LESSON 440
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ROUTE              │  FILE                       │  TYPE               │
 * │  ───────────────────│─────────────────────────────│─────────────────────│
 * │  /                  │  app/page.js                │  Static             │
 * │  /meals             │  app/meals/page.js          │  Static             │
 * │  /meals/share       │  app/meals/share/page.js    │  Static (nested)    │
 * │  /meals/[mealSlug]  │  app/meals/[mealSlug]/page.js│ Dynamic            │
 * │  /community         │  app/community/page.js      │  Static             │
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
