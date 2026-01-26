/**
 * ============================================================================
 * MEAL DETAILS PAGE - LESSONS 440, 457 & 458: Dynamic Routes & Not Found
 * ============================================================================
 *
 * LESSON 457 - DISPLAYING MEAL DETAILS
 *
 * INSTRUCTOR QUOTE:
 * "So let's now work on that Meal Details page here. For that I'll go to
 * this meals folder and then there this dynamic segment folder, this
 * mealSlug folder, and then there this page.js file because that is the
 * component responsible for outputting the details about a meal."
 *
 * PAGE STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <Fragment>                                                             │
 * │    <header>                      ← Hero section                         │
 * │      ├── <div.image>             ← Meal image container                 │
 * │      │     └── <Image fill />    ← Next.js Image with fill prop         │
 * │      └── <div.headerText>        ← Text content                         │
 * │            ├── <h1>              ← Meal title                           │
 * │            ├── <p.creator>       ← "by <creator>" with mailto link      │
 * │            └── <p.summary>       ← Short description                    │
 * │    <main>                        ← Main content                         │
 * │      └── <p.instructions>        ← Cooking instructions (HTML)          │
 * │  </Fragment>                                                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import Image from 'next/image';
import { notFound } from 'next/navigation';

import classes from './page.module.css';
import { getMeal } from '@/lib/meals';

/**
 * ============================================================================
 * MEAL DETAILS PAGE COMPONENT
 * ============================================================================
 *
 * ACCESSING DYNAMIC ROUTE PARAMETERS:
 *
 * INSTRUCTOR QUOTE:
 * "With help of the props we are receiving on this page. I mentioned before
 * that NextJS is passing some special props to these special files or to
 * these components in those special files. And for example, every component
 * that's stored in a page.js file will receive a special params prop, which
 * you can, therefore, destructure."
 *
 * INSTRUCTOR QUOTE:
 * "And this params prop will then itself contain an object as a value where
 * any dynamic path segment that's configured for this route will be stored
 * as a key-value pair. And this name you chose here between those square
 * brackets will be used as a key and the actual value encoded in the URL
 * will be used as a value for that key."
 *
 * HOW params WORKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FOLDER NAME          URL VISITED           params OBJECT               │
 * │  ────────────────     ─────────────────     ─────────────────────────   │
 * │  [mealSlug]           /meals/burger         { mealSlug: 'burger' }      │
 * │  [mealSlug]           /meals/spicy-curry    { mealSlug: 'spicy-curry' } │
 * │  [id]                 /meals/123            { id: '123' }               │
 * │  [slug]               /meals/pizza          { slug: 'pizza' }           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} props - Props passed by Next.js
 * @param {Object} props.params - Dynamic route parameters
 * @param {string} props.params.mealSlug - The meal identifier from the URL
 * @returns {JSX.Element} The meal details page content
 */
export default function MealDetailsPage({ params }) {
  /**
   * FETCHING THE MEAL DATA
   *
   * INSTRUCTOR QUOTE:
   * "So therefore, we can now pass params.mealsSlug to getMeal, and that
   * will be that identifier that hopefully allows us to fetch a meal from
   * the database."
   *
   * INSTRUCTOR QUOTE:
   * "Now the reason for that is that getMeal actually returns a promise
   * because I'm using this async keyword here... Now I actually won't do
   * that here, and therefore, we can simply get rid of the async keyword,
   * therefore getMeal will no longer return a promise, and therefore, now
   * the code should work."
   *
   * NOTE: getMeal is NOT async, so we don't need to await it.
   * The function returns the meal object directly.
   */
  const meal = getMeal(params.mealSlug);

  /**
   * ================================================================
   * LESSON 458 - HANDLING MISSING MEALS WITH notFound()
   * ================================================================
   *
   * THE PROBLEM:
   *
   * INSTRUCTOR QUOTE:
   * "Now, it is possible that a user tries to look for a meal that doesn't
   * exist, like great bolo. And in that case, I get this 'An error occurred'
   * page. Now, I'm getting this error-occurred page because I'm trying to
   * access the instructions on undefined because I wasn't able to load a meal."
   *
   * WHAT HAPPENS WITHOUT THIS CHECK:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  User visits: /meals/great-bolo (doesn't exist)                    │
   * │                                                                      │
   * │  1. getMeal('great-bolo') returns undefined                        │
   * │  2. Code tries to access meal.instructions                         │
   * │  3. Cannot read property 'instructions' of undefined               │
   * │  4. Error is thrown → error.js page is shown                       │
   * │                                                                      │
   * │  PROBLEM: This is NOT really an "error" - the meal just doesn't    │
   * │  exist! A 404 "Not Found" page is more appropriate.                │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * THE SOLUTION: notFound() function
   *
   * INSTRUCTOR QUOTE:
   * "So a better way of handling this would be to go here and check if not
   * meal. So if meal is undefined, if we didn't find a meal. And then show
   * the closest not-found page available in this project."
   *
   * INSTRUCTOR QUOTE:
   * "And that can indeed be triggered by calling a special function that's
   * provided by NextJS, the notFound function, which is imported from
   * next/navigation."
   *
   * HOW notFound() WORKS:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  1. Calling notFound() immediately stops component execution        │
   * │  2. Next.js looks for the closest not-found.js file                │
   * │  3. If found, renders that not-found page                          │
   * │  4. If not found in current folder, bubbles up to parent folders   │
   * │  5. Returns a 404 HTTP status code                                 │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "Calling this function will stop this component from executing and will
   * show the closest not-found or error page."
   */
  if (!meal) {
    notFound();
  }

  /**
   * FORMATTING INSTRUCTIONS WITH LINE BREAKS
   *
   * INSTRUCTOR QUOTE:
   * "Now you'll also see that this content down there is not formatted
   * perfectly. And the reason for that is that the line breaks we got in
   * these instructions are ignored."
   *
   * INSTRUCTOR QUOTE:
   * "We can fix this by overriding meal.instructions with
   * meal.instructions.replace, hence replacing parts of that string. And
   * here we can then use our regular expression to look for all line breaks
   * which are identified by this special character. Look for all of them in
   * this string, and by then replacing them with the br tag, the line break
   * tag."
   *
   * REGEX BREAKDOWN:
   * - /\n/g : Regular expression to find all newline characters
   *   - \n  : Matches a newline character
   *   - g   : Global flag - find ALL matches, not just the first one
   *
   * EXAMPLE:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  INPUT (from database):                                             │
   * │  "Step 1: Preheat oven\nStep 2: Mix ingredients\nStep 3: Bake"      │
   * │                                                                      │
   * │  OUTPUT (after replace):                                            │
   * │  "Step 1: Preheat oven<br />Step 2: Mix ingredients<br />Step 3..." │
   * │                                                                      │
   * │  RENDERED (as HTML):                                                │
   * │  Step 1: Preheat oven                                               │
   * │  Step 2: Mix ingredients                                            │
   * │  Step 3: Bake                                                       │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      {/**
       * ================================================================
       * HEADER SECTION
       * ================================================================
       *
       * INSTRUCTOR QUOTE:
       * "Now here I again then want to output a fragment because I want
       * to have a header and next to that the main section as we had it
       * on many other pages as well."
       */}
      <header className={classes.header}>
        {/**
         * ================================================================
         * MEAL IMAGE
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "For example, I wanna have a div in there with a class of image,
         * which will then be responsible for outputting the meal image
         * that belongs to a meal. And we will output that image with help
         * of the image component, which is provided by NextJS imported
         * from the next/image package."
         *
         * INSTRUCTOR QUOTE:
         * "The only thing I want to add already is this fill prop here,
         * since again, I won't know the exact dimensions of the image
         * file yet, and therefore, I'll use this fill prop as a fallback
         * or as a solution."
         *
         * NOTE: When using fill, the parent container MUST have:
         * - position: relative (or absolute/fixed)
         * - defined width and height
         * The .image class in page.module.css provides these.
         */}
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>

        {/**
         * ================================================================
         * HEADER TEXT CONTENT
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "Then below that, I'll add another div with a class of headerText,
         * written like this, not with a dash, but instead camel case.
         * That's how the CSS class name in the CSS file is named."
         */}
        <div className={classes.headerText}>
          {/**
           * MEAL TITLE
           *
           * INSTRUCTOR QUOTE:
           * "In there, you should then add a h1 element, where we'll later
           * output the meal title."
           */}
          <h1>{meal.title}</h1>

          {/**
           * CREATOR ATTRIBUTION WITH MAILTO LINK
           *
           * INSTRUCTOR QUOTE:
           * "And below that a paragraph, which receives another CSS class,
           * a class of creator, where I want to output the text by and
           * then the name of the creator wrapped into a link."
           *
           * INSTRUCTOR QUOTE:
           * "And here I'll use the regular anchor element because this
           * should actually be a link that allows us to send an email to
           * that creator. Therefore, the actual href value will be a
           * dynamically generated string using this string literal syntax
           * with those backticks here, where I'll say mailto: and then
           * here I'll inject that email address once we have it later."
           *
           * INSTRUCTOR QUOTE:
           * "And that's how we can set up a link that will open the Mail
           * program, so that users can send an email to that person."
           *
           * DATABASE FIELD NAMES:
           *
           * INSTRUCTOR QUOTE:
           * "Here for the email address, we can use meal.creator_email
           * because that's the name I'm using in a database. You can see
           * those names if you take a look at this initdb.js file."
           */}
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>

          {/**
           * MEAL SUMMARY
           *
           * INSTRUCTOR QUOTE:
           * "Below that, we can add another paragraph, which also receives
           * a class, and here the class should be the summary class, where
           * I want to output the short summary text that summarizes a meal."
           */}
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      {/**
       * ================================================================
       * MAIN CONTENT - INSTRUCTIONS
       * ================================================================
       *
       * INSTRUCTOR QUOTE:
       * "Now in that main section, I simply wanna output one paragraph,
       * which receives a CSS class name called instructions. And then
       * here, I want to output the instructions that are stored for
       * every meal."
       */}
      <main>
        {/**
         * RENDERING HTML WITH dangerouslySetInnerHTML
         *
         * INSTRUCTOR QUOTE:
         * "And those should actually be output as HTML code, which can be
         * achieved in React by targeting the dangerouslySetInnerHTML prop
         * on an element."
         *
         * INSTRUCTOR QUOTE:
         * "And it's called like this because you open yourself up to
         * cross-site scripting attacks when outputting content as HTML
         * content, at least if you're not validating it."
         *
         * WHY "dangerously"?
         * ┌─────────────────────────────────────────────────────────────┐
         * │  RISK: Cross-Site Scripting (XSS)                          │
         * │                                                             │
         * │  If a malicious user submitted:                            │
         * │  "<script>stealCookies()</script>"                         │
         * │                                                             │
         * │  And we rendered it with dangerouslySetInnerHTML,          │
         * │  that script would EXECUTE in other users' browsers!       │
         * │                                                             │
         * │  MITIGATION:                                               │
         * │  - Only use with trusted/validated content                 │
         * │  - Sanitize user input before storing                      │
         * │  - In this demo, we control the database content           │
         * └─────────────────────────────────────────────────────────────┘
         *
         * INSTRUCTOR QUOTE:
         * "Now this prop then wants a object as a value, and that object
         * should have an __html property, which then contains the actual
         * HTML code that should be output on the screen."
         *
         * SYNTAX:
         * - dangerouslySetInnerHTML={{ __html: htmlString }}
         * - Double braces: outer for JSX expression, inner for object
         * - __html is a special property name (double underscore)
         */}
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}

/**
 * ============================================================================
 * LESSONS 457 & 458 - MEAL DETAILS PAGE SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. ACCESSING DYNAMIC ROUTE PARAMETERS
 *
 *    INSTRUCTOR QUOTE:
 *    "And for example, every component that's stored in a page.js file
 *    will receive a special params prop."
 *
 *    - params.mealSlug contains the URL segment value
 *    - The key name matches the folder name [mealSlug]
 *    - Used to fetch the correct meal from the database
 *
 * 2. FETCHING DATA WITH getMeal()
 *
 *    INSTRUCTOR QUOTE:
 *    "Now, in order to have some data to output on that Meal Detail screen,
 *    we should go back to the meals.js file in the lib folder."
 *
 *    - getMeal(slug) returns a single meal object
 *    - NOT async - returns directly (no await needed)
 *    - Uses parameterized queries for SQL injection safety
 *
 * 3. NEXT.JS IMAGE WITH fill PROP
 *
 *    INSTRUCTOR QUOTE:
 *    "The only thing I want to add already is this fill prop here, since
 *    again, I won't know the exact dimensions of the image file yet."
 *
 *    - Parent needs position:relative with defined dimensions
 *    - Image fills the container maintaining aspect ratio
 *
 * 4. mailto: LINKS FOR EMAIL
 *
 *    INSTRUCTOR QUOTE:
 *    "And that's how we can set up a link that will open the Mail program,
 *    so that users can send an email to that person."
 *
 *    - Uses regular <a> tag (not Link component)
 *    - href="mailto:email@example.com"
 *    - Opens user's default email client
 *
 * 5. dangerouslySetInnerHTML FOR HTML CONTENT
 *
 *    INSTRUCTOR QUOTE:
 *    "And it's called like this because you open yourself up to cross-site
 *    scripting attacks when outputting content as HTML content."
 *
 *    - Renders raw HTML strings
 *    - Use with caution - only trusted content!
 *    - Syntax: {{ __html: htmlString }}
 *
 * 6. REPLACING LINE BREAKS WITH <br />
 *
 *    INSTRUCTOR QUOTE:
 *    "We can fix this by overriding meal.instructions with
 *    meal.instructions.replace."
 *
 *    - /\n/g regex finds all newlines
 *    - Replace with <br /> for HTML line breaks
 *
 * KEY CONCEPTS (LESSON 458):
 *
 * 7. HANDLING MISSING DATA WITH notFound()
 *
 *    INSTRUCTOR QUOTE:
 *    "So a better way of handling this would be to go here and check if not
 *    meal... And then show the closest not-found page available."
 *
 *    - Import notFound from 'next/navigation'
 *    - Check if data is undefined before using it
 *    - Call notFound() to show the closest not-found.js page
 *    - Stops component execution immediately
 *
 * 8. GRANULAR NOT-FOUND PAGES
 *
 *    INSTRUCTOR QUOTE:
 *    "But we can work around that by also adding a not-found.js file here
 *    instead of the meals folder. And then we can also set up some
 *    meal-specific not-found message."
 *
 *    - Add not-found.js in specific folders for custom 404 messages
 *    - More specific not-found.js files override parent ones
 *    - Provides better user experience with contextual messages
 *
 * DATABASE FIELD MAPPING:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DATABASE FIELD    │  USAGE IN COMPONENT                                │
 * │  ──────────────────│────────────────────────────────────────────────────│
 * │  meal.title        │  <h1>{meal.title}</h1>                             │
 * │  meal.image        │  <Image src={meal.image} ... />                    │
 * │  meal.creator      │  {meal.creator} (creator's name)                   │
 * │  meal.creator_email│  mailto:{meal.creator_email}                       │
 * │  meal.summary      │  {meal.summary} (short description)                │
 * │  meal.instructions │  dangerouslySetInnerHTML (with \n → <br />)        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
