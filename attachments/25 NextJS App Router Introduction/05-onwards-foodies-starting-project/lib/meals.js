/**
 * ============================================================================
 * MEALS DATA MODULE - LESSONS 452, 455, 457 & 465: Data Fetching & Storage
 * ============================================================================
 *
 * LESSON 452 - WHY WE DON'T NEED useEffect OR fetch()
 *
 * INSTRUCTOR QUOTE:
 * "Now when it comes to loading data in a NextJS application, we get a couple
 * of different options. We could fetch the data as we would do it in any
 * vanilla React application. We could, for example, use the useEffect hook
 * like this, and then in there use the fetch function to send a request to
 * a backend."
 *
 * INSTRUCTOR QUOTE:
 * "Now, in a NextJS application, we actually already have a backend. We have
 * backend and frontend combined, blended seamlessly together. So we don't
 * need a separate backend."
 *
 * ============================================================================
 * THE POWER OF SERVER COMPONENTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And as you also learned in NextJS, all your components are by default
 * server components that only execute on the server unless you're using a
 * feature that requires them to be a client component like useEffect."
 *
 * INSTRUCTOR QUOTE:
 * "But actually, because we have those server components as a default, we
 * don't need useEffect and we don't need to send a fetch request to get data.
 * Instead, since this component by default runs on the server and only there,
 * we can directly reach out to the database from here."
 *
 * TRADITIONAL REACT vs NEXT.JS SERVER COMPONENTS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TRADITIONAL REACT (Client Components):                                 │
 * │  ┌─────────────┐     fetch()      ┌─────────────┐     SQL      ┌────┐  │
 * │  │   Browser   │  ───────────────▶│   Backend   │────────────▶│ DB │  │
 * │  │  useEffect  │  ◀───────────────│     API     │◀────────────│    │  │
 * │  └─────────────┘     JSON         └─────────────┘     data    └────┘  │
 * │                                                                          │
 * │  NEXT.JS SERVER COMPONENTS:                                             │
 * │  ┌─────────────┐                                                        │
 * │  │   Server    │     Direct SQL query      ┌────┐                       │
 * │  │  Component  │  ────────────────────────▶│ DB │                       │
 * │  │   (runs on  │  ◀────────────────────────│    │                       │
 * │  │   server)   │        data               └────┘                       │
 * │  └─────────────┘                                                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And that's definitely not something you're used to from other React apps.
 * But that's absolutely fine in Next apps because this is a server component
 * that only runs on the server. So reaching out to a database is safe here."
 *
 * ============================================================================
 * WHY A SEPARATE lib/ FOLDER?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, in order to keep things separated, I'll not write my code in here
 * though. Instead, I'll add a new folder in my root project folder, which
 * I'll name lib, though that name is up to you and not some kind of reserved
 * name. But in there I'll add a new file, which I'll name meals.js."
 *
 * BENEFITS OF SEPARATING DATA LOGIC:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Keeps page components clean and focused on rendering                 │
 * │  ✓ Makes data fetching logic reusable across multiple pages             │
 * │  ✓ Easier to test and maintain                                          │
 * │  ✓ Follows the separation of concerns principle                         │
 * │  ✓ Database connection logic in one place                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * IMPORTING THE better-sqlite3 PACKAGE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "For that in here, I'll import SQL from this better SQLite three package."
 *
 * NOTE: We use ES Module syntax (import) here, not CommonJS (require),
 * because this file runs within the Next.js environment which supports
 * ES Modules. The initdb.js file used CommonJS because it runs directly
 * with Node.js.
 */
import sql from 'better-sqlite3';
/**
 * ============================================================================
 * LESSON 465 - PACKAGES FOR DATA PREPARATION AND SECURITY
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now to do that, I'll stop the development server and install a extra package,
 * a package called slugify that will do what its name implies, but that's not
 * the only package I'll install. Instead, I'll also install a package called
 * xss, which will help us protect against cross-site scripting attacks."
 *
 * WHY THESE PACKAGES ARE ESSENTIAL:
 *
 * 1. SLUGIFY - URL-FRIENDLY IDENTIFIERS
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  INPUT (title):  "Grandma's Delicious Apple Pie!!"                      │
 * │  OUTPUT (slug):  "grandmas-delicious-apple-pie"                         │
 * │                                                                          │
 * │  SLUG CHARACTERISTICS:                                                  │
 * │  • Lowercase letters only                                               │
 * │  • Spaces replaced with hyphens                                         │
 * │  • Special characters removed                                           │
 * │  • Safe for URLs and database lookups                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * 2. XSS - CROSS-SITE SCRIPTING PROTECTION
 *
 * INSTRUCTOR QUOTE:
 * "Because you must not forget that we're storing user-generated content
 * and I'm then outputting these instructions that are generated by the user
 * as HTML, here in that meal detail page, I'm outputting those instructions
 * as HTML. So we are vulnerable to cross-site scripting attacks and that's
 * why we should protect against them."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE DANGER OF UNSANITIZED USER INPUT:                                  │
 * │                                                                          │
 * │  User submits instructions containing:                                  │
 * │  "Mix ingredients <script>stealCookies()</script> and bake."           │
 * │                                                                          │
 * │  WITHOUT XSS PROTECTION:                                                │
 * │  → Script executes when page loads                                      │
 * │  → Can steal user cookies/sessions                                      │
 * │  → Can redirect to malicious sites                                      │
 * │  → Can modify page content                                              │
 * │                                                                          │
 * │  WITH XSS PROTECTION:                                                   │
 * │  → Malicious tags are removed/escaped                                   │
 * │  → Content safely displayed as text                                     │
 * │  → Users protected from attacks                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And that's why we should protect against them and why we should sanitize
 * the content that's sent by the user, which is exactly what we can do with
 * help of this xss package."
 *
 * INSTALLATION COMMAND:
 * npm install slugify xss
 */
import slugify from 'slugify';
import xss from 'xss';

/**
 * ============================================================================
 * DATABASE CONNECTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And I'll then establish the database connection by executing SQL as a
 * function and then passing the name of the database here as a string to
 * that function. And then we can work on this DB object to perform actions
 * on that database."
 *
 * This opens the meals.db file that was created by initdb.js.
 * The connection is established once when this module is first imported
 * and reused for all subsequent queries.
 */
const db = sql('meals.db');

/**
 * ============================================================================
 * ASYNC/AWAIT IN SERVER COMPONENTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But speaking of promises, it's worth knowing and understanding that even
 * though we're not working with promises here because the better SQLite
 * three package doesn't use them, even though we're not using them here,
 * we could use them in our component here with ease because server component
 * functions can actually be converted to async functions."
 *
 * INSTRUCTOR QUOTE:
 * "You can use the async keyword here, something you normally also can't do
 * on your React components, but you can do it on server components."
 *
 * WHY async EVEN THOUGH better-sqlite3 IS SYNCHRONOUS?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Consistency: Most real-world database operations are async          │
 * │  2. Future-proofing: Easy to swap to async database later               │
 * │  3. Demonstration: Shows that Server Components support async/await     │
 * │  4. Simulation: Allows us to add artificial delays for loading states   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * GET ALL MEALS FROM THE DATABASE
 *
 * INSTRUCTOR QUOTE:
 * "Now for that, I'll add a new exported function here, which I'll name
 * getMeals, which should do what the name implies. It should get all the
 * meals from that database."
 *
 * INSTRUCTOR QUOTE:
 * "And I'll actually go back to Meals.js and turn getMeals into async
 * function, and therefore, it will return a promise even though this code
 * here doesn't normally produce one, but now it will be wrapped into a
 * promise, that is what async does."
 *
 * @returns {Promise<Array>} Array of meal objects from the database
 */
export async function getMeals() {
  /**
   * SIMULATED DELAY FOR DEMONSTRATION
   *
   * INSTRUCTOR QUOTE:
   * "And I'll actually await another promise here, which simply adds an
   * arbitrary delay, just to simulate an action that takes a bit longer,
   * which is something that will help us later once we explore how we can
   * handle loading states and so on in Next applications."
   *
   * INSTRUCTOR QUOTE:
   * "And this is of course not code you would normally add because you
   * would not want to slow things down, but here for this demo app, I'll
   * add it to add this extra delay."
   *
   * NOTE: This 2-second delay is ONLY for demonstration purposes!
   * Remove this in production code.
   */
  await new Promise((resolve) => setTimeout(resolve, 2000));

  /**
   * ================================================================
   * LESSON 455 - SIMULATED ERROR FOR TESTING error.js
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And to simulate this, let's simply go to the lib folder in the
   * meals.js file and then here, let's throw an error, a new error
   * where we say loading meals failed."
   *
   * UNCOMMENT THE LINE BELOW TO TEST ERROR HANDLING:
   * This simulates a database failure (e.g., database offline,
   * connection timeout, remote server unavailable).
   *
   * INSTRUCTOR QUOTE:
   * "That of course could happen here if our database is offline,
   * which is unlikely for a SQLite database, but which could happen
   * if it would be a remote database server, or if anything else
   * goes wrong."
   *
   * After testing, comment it back out to restore normal operation.
   */
  // throw new Error('Loading meals failed.');

  /**
   * FETCHING ALL MEALS WITH SQL
   *
   * INSTRUCTOR QUOTE:
   * "And for that we can now use this DB object and then prepare a new
   * statement, a new SQL statement that should be executed. And here it's
   * a pretty simple statement. I want to select all columns from the
   * meals table."
   *
   * SQL BREAKDOWN:
   * - SELECT * : Get all columns (id, slug, title, image, etc.)
   * - FROM meals : From the meals table we created in initdb.js
   *
   * THE all() vs run() vs get() METHODS:
   *
   * INSTRUCTOR QUOTE:
   * "Then we just have to run this though, you actually don't do that with
   * the run method here, but with the all method. Run would be used if you
   * were inserting data, for example, if you were changing data, all is
   * used if you are fetching data and you want to get back all the rows
   * that are fetched by that statement. If you were looking for a single
   * row, you could use get instead."
   *
   * METHOD COMPARISON:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  METHOD   │  USE CASE                    │  RETURNS                 │
   * │  ─────────│──────────────────────────────│──────────────────────────│
   * │  .run()   │  INSERT, UPDATE, DELETE      │  { changes, lastID }     │
   * │  .all()   │  SELECT (multiple rows)      │  Array of row objects    │
   * │  .get()   │  SELECT (single row)         │  Single row object       │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  return db.prepare('SELECT * FROM meals').all();
}

/**
 * ============================================================================
 * LESSON 457 - GET A SINGLE MEAL BY SLUG
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, in order to have some data to output on that Meal Detail screen, we
 * should go back to the meals.js file in the lib folder, and there we can
 * export another async function that could be called getMeal."
 *
 * WHY NOT async FOR THIS FUNCTION?
 *
 * INSTRUCTOR QUOTE:
 * "Now the reason for that is that getMeal actually returns a promise because
 * I'm using this async keyword here and I added that so that we could add
 * such a delay again if we wanted to and if we wanted to set up a dedicated
 * loading page or handle loading in any other way. Now I actually won't do
 * that here, and therefore, we can simply get rid of the async keyword,
 * therefore getMeal will no longer return a promise, and therefore, now the
 * code should work."
 *
 * NOTE: This function is intentionally NOT async (unlike getMeals) because:
 * - We don't need loading states for individual meal pages
 * - The query is fast (single row lookup by indexed column)
 * - No artificial delay needed for demonstration
 *
 * @param {string} slug - The unique slug identifier for the meal
 * @returns {Object} A single meal object from the database
 */
export function getMeal(slug) {
  /**
   * SECURE SQL QUERY WITH PARAMETERIZED VALUES
   *
   * INSTRUCTOR QUOTE:
   * "Well, and then we simply wanna return db.prepare, and then SELECT all
   * columns FROM the meals table WHERE the slug field is equal to the slug
   * we're getting here."
   *
   * SQL INJECTION PROTECTION:
   *
   * INSTRUCTOR QUOTE:
   * "Now you could now add it like this, but that would be insecure. That
   * opens yourself up to SQL injection. Instead, you should use a question
   * mark as a placeholder here."
   *
   * UNSAFE (DO NOT DO THIS):
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  db.prepare(`SELECT * FROM meals WHERE slug = '${slug}'`).get()         │
   * │                                                                          │
   * │  DANGER: If slug = "'; DROP TABLE meals; --"                            │
   * │  This would execute: SELECT * FROM meals WHERE slug = '';               │
   * │                      DROP TABLE meals; --'                               │
   * │  Result: Your entire meals table is deleted!                            │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * SAFE (THIS IS WHAT WE DO):
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)             │
   * │                                                                          │
   * │  The ? is a placeholder that gets safely escaped by better-sqlite3      │
   * │  Any malicious input is treated as a literal string value               │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "Under the hood, this better-sqlite3 package we're using here will then
   * protect you against SQL injection attacks. That's why you should add
   * dynamic values into your statements like this."
   *
   * USING get() FOR SINGLE ROW:
   *
   * INSTRUCTOR QUOTE:
   * "And then call the get method here since I only want to get a single
   * record, and then you pass the value that should be inserted for that
   * placeholder to get."
   */
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

/**
 * ============================================================================
 * LESSON 465 - SAVE A NEW MEAL TO THE DATABASE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So let's now work on storing that data and to do that, I'll start in the
 * meals.js file. Here we have functions for getting meals and getting a
 * single meal. Now I want to export another function here, which is there
 * to save a meal and I expect a meal object as an input."
 *
 * EXPECTED MEAL OBJECT SHAPE (from Server Action formData):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  {                                                                       │
 * │    title: 'Grandma\'s Apple Pie',        // From form input             │
 * │    summary: 'A delicious classic...',    // From form input             │
 * │    instructions: 'Mix flour with...',    // From textarea               │
 * │    image: File { ... },                  // From ImagePicker            │
 * │    creator: 'John Doe',                  // From form input             │
 * │    creator_email: 'john@example.com'     // From form input             │
 * │  }                                                                       │
 * │                                                                          │
 * │  WHAT THIS FUNCTION ADDS:                                               │
 * │  • slug: 'grandmas-apple-pie' (generated from title)                    │
 * │  • instructions: sanitized version (XSS protection)                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} meal - The meal object to save
 */
export async function saveMeal(meal) {
  /**
   * ================================================================
   * STEP 1: GENERATE SLUG FROM TITLE
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now, inside of save meal we therefore have to do a couple of things.
   * For example, we'll need to generate a slug because in my database,
   * I wanna store a slug for every meal and we don't get that from the form.
   * Instead, I want to generate it based on the title."
   *
   * INSTRUCTOR QUOTE:
   * "Here, I'll create a new slug by calling slugify and passing meal.title
   * to it. In addition, I'll pass a configuration object to slug, where I
   * set lower to true so that it forces all characters to be lowercase."
   *
   * SLUGIFY TRANSFORMATION EXAMPLES:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  INPUT                           │  OUTPUT                          │
   * │  ───────────────────────────────│────────────────────────────────── │
   * │  "Spaghetti Carbonara"           │  "spaghetti-carbonara"           │
   * │  "Mom's BEST Cookies!"           │  "moms-best-cookies"             │
   * │  "Crème Brûlée"                  │  "creme-brulee"                  │
   * │  "Fish & Chips"                  │  "fish-and-chips"                │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * WHY SLUGS ARE IMPORTANT:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  1. URL-FRIENDLY: /meals/spaghetti-carbonara (not /meals/123)      │
   * │  2. SEO-FRIENDLY: Search engines prefer descriptive URLs          │
   * │  3. USER-FRIENDLY: Easy to read and remember                       │
   * │  4. DATABASE KEY: Used to look up specific meals (see getMeal)    │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  meal.slug = slugify(meal.title, { lower: true });

  /**
   * ================================================================
   * STEP 2: SANITIZE INSTRUCTIONS (XSS PROTECTION)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "As a next step, I wanna remove any harmful content from those
   * instructions and for that we can use this xss thing which we imported,
   * which turns out to be a function to call it on meal.instructions,
   * so that we sanitize and clean those instructions."
   *
   * WHAT THE XSS FUNCTION DOES:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  DANGEROUS INPUT:                                                   │
   * │  "Mix <script>alert('hacked!')</script> ingredients together"      │
   * │                                                                      │
   * │  SANITIZED OUTPUT:                                                  │
   * │  "Mix &lt;script&gt;alert('hacked!')&lt;/script&gt; ingredients"   │
   * │                                                                      │
   * │  The malicious script tag is escaped and becomes harmless text!    │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * WHY THIS IS CRITICAL FOR OUR APP:
   *
   * In the meal detail page ([mealSlug]/page.js), we render instructions
   * using dangerouslySetInnerHTML:
   *
   *   <p dangerouslySetInnerHTML={{ __html: meal.instructions }}></p>
   *
   * This renders the instructions as HTML (to preserve line breaks, etc.)
   * But this also means any <script> tags would execute!
   * By sanitizing BEFORE storing in the database, we ensure safety.
   *
   * INSTRUCTOR QUOTE:
   * "And actually, instead of using these extra constants or variables,
   * we can of course also add a slug property to meal on the fly like this,
   * and overwrite instructions with the sanitized instructions like this."
   */
  meal.instructions = xss(meal.instructions);

  /**
   * ================================================================
   * DATA PREPARED - IMAGE HANDLING COMING NEXT
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now with that done, we prepared all the data except for the image."
   *
   * AT THIS POINT, THE MEAL OBJECT HAS:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  {                                                                  │
   * │    title: 'Grandma\'s Apple Pie',        // Original               │
   * │    summary: 'A delicious classic...',    // Original               │
   * │    instructions: '<sanitized HTML>',     // XSS-protected!         │
   * │    image: File { ... },                  // Still a File object    │
   * │    creator: 'John Doe',                  // Original               │
   * │    creator_email: 'john@example.com',    // Original               │
   * │    slug: 'grandmas-apple-pie'            // NEW - Generated!       │
   * │  }                                                                  │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * NEXT STEPS (upcoming lessons):
   * • Process the image File object
   * • Save image to the file system
   * • Store image path (not file) in database
   * • Insert the meal record into SQLite database
   */

  // TODO: Handle image storage (next lesson)
  // TODO: Insert meal into database (next lesson)
}

/**
 * ============================================================================
 * LESSONS 452, 455, 457 & 465 - DATA MODULE SUMMARY
 * ============================================================================
 *
 * KEY CONCEPTS (LESSON 452):
 *
 * 1. SERVER COMPONENTS CAN ACCESS DATABASES DIRECTLY
 *    - No need for useEffect or fetch()
 *    - Code runs only on the server, never sent to client
 *    - Database credentials stay secure
 *
 * 2. ASYNC/AWAIT IN SERVER COMPONENTS
 *
 *    INSTRUCTOR QUOTE:
 *    "And this also allows me to show you that you can use async await here,
 *    of course, because it's a regular function, but you can also use it
 *    here in this component function. And that's not something you can
 *    normally do in React, but you can do it with server components."
 *
 * 3. SEPARATION OF CONCERNS
 *    - Data fetching logic in lib/meals.js
 *    - Page rendering logic in app/meals/page.js
 *    - Reusable across multiple components
 *
 * 4. better-sqlite3 QUERY METHODS
 *    - .prepare() creates a reusable SQL statement
 *    - .all() fetches multiple rows
 *    - .get() fetches a single row
 *    - .run() executes INSERT/UPDATE/DELETE
 *
 * KEY CONCEPTS (LESSON 455):
 *
 * 5. SIMULATING ERRORS FOR TESTING
 *
 *    INSTRUCTOR QUOTE:
 *    "And to simulate this, let's simply go to the lib folder in the
 *    meals.js file and then here, let's throw an error, a new error
 *    where we say loading meals failed."
 *
 *    - Uncomment `throw new Error(...)` to test error handling
 *    - Errors thrown here will be caught by error.js
 *    - Comment it back out after testing
 *
 * KEY CONCEPTS (LESSON 457):
 *
 * 6. FETCHING SINGLE RECORDS BY SLUG
 *
 *    INSTRUCTOR QUOTE:
 *    "And here I then expect to get the slug of the meal that identifies
 *    the meal that should be fetched."
 *
 *    - Use get() instead of all() for single records
 *    - Use parameterized queries (?) to prevent SQL injection
 *    - No async needed when loading states aren't required
 *
 * KEY CONCEPTS (LESSON 465):
 *
 * 7. SAVING MEALS TO THE DATABASE
 *
 *    INSTRUCTOR QUOTE:
 *    "Now I want to export another function here, which is there to save
 *    a meal and I expect a meal object as an input. A meal object that
 *    should have this shape here."
 *
 *    DATA PREPARATION STEPS:
 *    - Generate slug from title using slugify package
 *    - Sanitize instructions using xss package
 *    - Image handling (covered in next lesson)
 *
 * 8. URL-FRIENDLY SLUGS WITH slugify
 *
 *    INSTRUCTOR QUOTE:
 *    "For example, we'll need to generate a slug because in my database,
 *    I wanna store a slug for every meal and we don't get that from the form.
 *    Instead, I want to generate it based on the title."
 *
 *    slugify(meal.title, { lower: true })
 *    → Converts "Grandma's Apple Pie" to "grandmas-apple-pie"
 *
 * 9. XSS PROTECTION WITH xss PACKAGE
 *
 *    INSTRUCTOR QUOTE:
 *    "Because you must not forget that we're storing user-generated content
 *    and I'm then outputting these instructions that are generated by the
 *    user as HTML... So we are vulnerable to cross-site scripting attacks."
 *
 *    xss(meal.instructions)
 *    → Removes/escapes malicious <script> tags and other dangerous HTML
 *
 * WHAT THIS MODULE EXPORTS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  getMeals()     │  Returns all meals from the database                  │
 * │                 │  (with a 2-second simulated delay for demo purposes)  │
 * │                 │  Can throw error if database fails (see Lesson 455)   │
 * │  ───────────────│───────────────────────────────────────────────────────│
 * │  getMeal(slug)  │  Returns a single meal by its slug identifier         │
 * │                 │  Uses parameterized query for SQL injection safety    │
 * │                 │  Synchronous (no delay) - Lesson 457                  │
 * │  ───────────────│───────────────────────────────────────────────────────│
 * │  saveMeal(meal) │  Saves a new meal to the database - Lesson 465       │
 * │                 │  Generates slug, sanitizes instructions               │
 * │                 │  Image handling coming in next lesson                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * USAGE IN PAGE COMPONENTS:
 *   import { getMeals, getMeal, saveMeal } from '@/lib/meals';
 *
 *   // Get all meals (async)
 *   export default async function MealsPage() {
 *     const meals = await getMeals();
 *     return <MealsGrid meals={meals} />;
 *   }
 *
 *   // Get single meal (sync) - Lesson 457
 *   export default function MealDetailsPage({ params }) {
 *     const meal = getMeal(params.mealSlug);
 *     return <MealDetails meal={meal} />;
 *   }
 *
 *   // Save meal (in Server Action) - Lesson 465
 *   // Called from lib/actions.js shareMeal function
 *   await saveMeal(meal);
 *
 * COMING NEXT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • Process uploaded image File object                                  │
 * │  • Save image to the public file system                                │
 * │  • Store image path in database                                        │
 * │  • Insert complete meal record with INSERT INTO SQL                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
