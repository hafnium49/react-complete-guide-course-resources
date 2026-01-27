/**
 * ============================================================================
 * MEALS DATA MODULE - LESSONS 452, 455, 457, 465 & 466: Data Fetching & Storage
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
 * LESSON 466 - NODE.JS FILE SYSTEM API
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now we need to write that to a file in that public folder. And we can do
 * that with help of an API provided by node JS. To be precise, the file
 * system API. And for that I'll import fs from node:fs."
 *
 * WHY 'node:fs' INSTEAD OF JUST 'fs'?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  The 'node:' prefix is the modern way to import Node.js built-in       │
 * │  modules. It clearly indicates this is a Node.js core module,          │
 * │  not an npm package. Both work, but 'node:fs' is more explicit.        │
 * │                                                                          │
 * │  import fs from 'fs';       // Classic way (still works)               │
 * │  import fs from 'node:fs';  // Modern explicit way (recommended)       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHAT THE fs MODULE PROVIDES:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • Read files: fs.readFile(), fs.readFileSync()                         │
 * │  • Write files: fs.writeFile(), fs.createWriteStream()                  │
 * │  • Delete files: fs.unlink(), fs.rm()                                   │
 * │  • Create directories: fs.mkdir()                                       │
 * │  • Check existence: fs.existsSync(), fs.access()                        │
 * │  • And much more...                                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NOTE: This module is ONLY available on the server (Node.js).
 * It will NOT work in client-side code (browser). This is fine because
 * saveMeal() is called from a Server Action which runs on the server.
 */
import fs from 'node:fs';

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
 * LESSONS 465 & 466 - SAVE A NEW MEAL TO THE DATABASE
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
 * │  WHAT THIS FUNCTION DOES:                                               │
 * │  1. Generate slug from title (Lesson 465)                               │
 * │  2. Sanitize instructions for XSS (Lesson 465)                          │
 * │  3. Save image to public/images folder (Lesson 466)                     │
 * │  4. Insert meal record into database (Lesson 466)                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} meal - The meal object to save
 */
export async function saveMeal(meal) {
  /**
   * ================================================================
   * STEP 1: GENERATE SLUG FROM TITLE (LESSON 465)
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
   */
  meal.slug = slugify(meal.title, { lower: true });

  /**
   * ================================================================
   * STEP 2: SANITIZE INSTRUCTIONS - XSS PROTECTION (LESSON 465)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "As a next step, I wanna remove any harmful content from those
   * instructions and for that we can use this xss thing which we imported,
   * which turns out to be a function to call it on meal.instructions,
   * so that we sanitize and clean those instructions."
   *
   * WHY THIS IS CRITICAL:
   * In the meal detail page, we render instructions using dangerouslySetInnerHTML.
   * Without sanitization, malicious <script> tags would execute!
   */
  meal.instructions = xss(meal.instructions);

  /**
   * ================================================================
   * STEP 3: GET FILE EXTENSION FROM UPLOADED IMAGE (LESSON 466)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "First, I'll start by getting the extension of the uploaded image
   * because it could be a JPEG or PNG file. So I'll dig into the meal image."
   *
   * INSTRUCTOR QUOTE:
   * "And then on that I'll call split to split it on the dot and pop the
   * last element, which will be the file extension."
   *
   * INSTRUCTOR QUOTE (bug fix):
   * "By the way, one other little error I just spotted is here where I split
   * my image name to get the extension. Here, we have to access meal.image.name.split
   * because meal.image is simply that image which we get from the form so that
   * image object that's automatically generated by the browser, and that object
   * will indeed have a couple of helpful properties. One of them is the name
   * property, which carries the name of the image file that was uploaded."
   *
   * HOW THIS WORKS:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  meal.image.name = "my-delicious-burger.jpg"                        │
   * │                                                                      │
   * │  .split('.')  → ["my-delicious-burger", "jpg"]                      │
   * │  .pop()       → "jpg"                                               │
   * │                                                                      │
   * │  For "photo.backup.png":                                            │
   * │  .split('.')  → ["photo", "backup", "png"]                          │
   * │  .pop()       → "png"  (always gets the last part!)                 │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  const extension = meal.image.name.split('.').pop();

  /**
   * ================================================================
   * STEP 4: GENERATE UNIQUE FILENAME (LESSON 466)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Next, I also want to generate a unique file name and not use the file
   * name of the user. So therefore here what I'll do is I'll generate a
   * string with those tactics using dot string template literal notation,
   * which we can use in JavaScript to create a file name that uses .slug
   * here. So meal.slug actually, and then a dot, and then the extension."
   *
   * WHY USE SLUG INSTEAD OF ORIGINAL FILENAME?
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  PROBLEMS WITH USER-PROVIDED FILENAMES:                             │
   * │  • May contain special characters or spaces                        │
   * │  • Could conflict with existing files                               │
   * │  • Could be used for path traversal attacks (../../etc/passwd)     │
   * │  • Inconsistent naming makes files hard to manage                  │
   * │                                                                      │
   * │  USING SLUG-BASED NAMES:                                            │
   * │  • Predictable, URL-safe characters                                 │
   * │  • Matches the meal's database slug                                 │
   * │  • Easy to associate image with its meal                            │
   * │  • Example: "grandmas-apple-pie.jpg"                               │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  const fileName = `${meal.slug}.${extension}`;

  /**
   * ================================================================
   * STEP 5: CREATE WRITE STREAM TO PUBLIC FOLDER (LESSON 466)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "We can then use this fs module to call createWriteStream, which will
   * create a stream that allows us to write data to a certain file."
   *
   * INSTRUCTOR QUOTE:
   * "Now createWriteStream then needs a path to default, which you wanna
   * write. And it'll then return a stream object which you can then use
   * to write to that path."
   *
   * WHY STORE IN PUBLIC FOLDER?
   *
   * INSTRUCTOR QUOTE:
   * "Now the image should be stored on the file system, not in the database
   * because storing files in databases is a bad idea. It's bad for performance
   * because databases simply aren't built for that. Instead, I wanna store
   * the uploaded files in that public folder because any images stored there
   * in that images folder will be publicly available so they can be rendered
   * on the screen without problems."
   *
   * FILE STORAGE ARCHITECTURE:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  PROJECT STRUCTURE:                                                 │
   * │  public/                                                            │
   * │  └── images/                                                        │
   * │      ├── burger.jpg        (existing)                               │
   * │      ├── curry.jpg         (existing)                               │
   * │      └── grandmas-apple-pie.jpg  ← NEW! (saved by this function)   │
   * │                                                                      │
   * │  The public/ folder is served at the root URL:                      │
   * │  /images/grandmas-apple-pie.jpg (NOT /public/images/...)           │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  const stream = fs.createWriteStream(`public/images/${fileName}`);

  /**
   * ================================================================
   * STEP 6: CONVERT IMAGE TO BUFFER AND WRITE (LESSON 466)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now we can write to that stream by calling the write method on it.
   * And this write method then wants a chunk."
   *
   * INSTRUCTOR QUOTE:
   * "In case of our image here, it means that we should convert the image
   * to a so-called buffer to a bufferedImage you could say... You can use
   * that image object, which we have here, which we're getting from our
   * form after all. And that object has an arrayBuffer method you can call,
   * which will give you such a buffer."
   *
   * INSTRUCTOR QUOTE:
   * "The only tricky thing here is that arrayBuffer actually will give you
   * a promise that eventually resolves to that buffer and therefore we
   * must await this here."
   *
   * INSTRUCTOR QUOTE:
   * "Now this is of type arrayBuffer and write actually wants a regular
   * buffer. So therefore here we have to call Buffer from and past this
   * arrayBuffer so this bufferedImage to it, like this."
   *
   * THE BUFFER CONVERSION CHAIN:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  meal.image                                                         │
   * │       │                                                             │
   * │       ▼                                                             │
   * │  meal.image.arrayBuffer()  → Returns Promise<ArrayBuffer>          │
   * │       │                                                             │
   * │       ▼  (await)                                                    │
   * │  bufferedImage             → ArrayBuffer (raw binary data)         │
   * │       │                                                             │
   * │       ▼                                                             │
   * │  Buffer.from(bufferedImage) → Node.js Buffer (writable format)     │
   * │       │                                                             │
   * │       ▼                                                             │
   * │  stream.write(buffer)      → Writes to file system                 │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  const bufferedImage = await meal.image.arrayBuffer();

  /**
   * WRITING THE BUFFER TO FILE
   *
   * INSTRUCTOR QUOTE:
   * "Well, and then we can call run on that statement and pass our meal
   * object to it. And thanks to this syntax we're using here, the data
   * for those fields will automatically be extracted."
   *
   * INSTRUCTOR QUOTE:
   * "This write method now also takes a second argument. The first argument
   * is the thing you wanna write. The second argument is a function that
   * will be executed once it's done writing. And here we get an error
   * argument, which is null if everything worked, but which will hold
   * some error information if something went wrong."
   *
   * ERROR HANDLING:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  stream.write(data, callback)                                       │
   * │                                                                      │
   * │  callback receives:                                                 │
   * │  • error = null  → Success! File was written                        │
   * │  • error = Error → Something went wrong (disk full, permissions)   │
   * │                                                                      │
   * │  If error exists, we throw to stop execution and report the issue   │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  /**
   * ================================================================
   * STEP 7: STORE IMAGE PATH (NOT FILE) IN DATABASE (LESSON 466)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now we just need to store the overall data in the database. And for
   * that I'll start by overriding the image that's stored in my meal object
   * with a path to the image where we stored it. Because I don't wanna store
   * the image file itself in a database, databases are not built for that,
   * instead I just wanna store the path."
   *
   * INSTRUCTOR QUOTE:
   * "Hence I'll override the image object in my meal with that path here,
   * though there you should actually remove this public segment because
   * all requests for images will be sent to the public folder automatically
   * anyways. Or put in other words, the content of the public folder will
   * be served as if it were served on the root level of your Server anyways
   * and therefore public shouldn't be included here."
   *
   * WHY NOT '/public/images/...'?
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  In Next.js, the public/ folder is special:                         │
   * │                                                                      │
   * │  FILE ON DISK:        public/images/burger.jpg                      │
   * │  URL TO ACCESS IT:    /images/burger.jpg                            │
   * │                                                                      │
   * │  The "public" part is NOT included in the URL!                      │
   * │  Next.js automatically serves public/ at the root.                  │
   * │                                                                      │
   * │  If we stored "/public/images/burger.jpg":                          │
   * │  → Browser would request /public/images/burger.jpg                  │
   * │  → 404 Not Found!                                                   │
   * │                                                                      │
   * │  By storing "/images/burger.jpg":                                   │
   * │  → Browser requests /images/burger.jpg                              │
   * │  → Next.js serves public/images/burger.jpg                         │
   * │  → Image displays correctly!                                        │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  meal.image = `/images/${fileName}`;

  /**
   * ================================================================
   * STEP 8: INSERT MEAL INTO DATABASE (LESSON 466)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And to save it, I'll use my db object and then prepare another statement.
   * And here I'll prepare a statement and I'll use this template literal
   * notation to split it across multiple lines where I wanna insert some
   * data into the meals table."
   *
   * INSTRUCTOR QUOTE:
   * "So basically into all fields that we configured when we created the
   * table except for the id, because that will be populated automatically."
   *
   * NAMED PLACEHOLDERS SYNTAX:
   *
   * INSTRUCTOR QUOTE:
   * "Now we must specify the values that should be inserted into those fields.
   * And here you could directly inject those values, but this is not recommended
   * because that approach would be vulnerable to SQL injection attacks. Instead,
   * you should use those placeholders... you can also use another syntax here
   * supported by better-sqlite, this syntax here. You can target specific
   * fields by their name, like this."
   *
   * NAMED PLACEHOLDERS vs POSITIONAL PLACEHOLDERS:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  POSITIONAL (? placeholders):                                       │
   * │  VALUES (?, ?, ?, ?, ?, ?, ?)                                      │
   * │  .run(val1, val2, val3, val4, val5, val6, val7)                    │
   * │  → Order matters! Easy to mix up values                             │
   * │                                                                      │
   * │  NAMED (@property placeholders):                                    │
   * │  VALUES (@title, @summary, @instructions, ...)                      │
   * │  .run(meal)  // Just pass the object!                               │
   * │  → better-sqlite3 extracts meal.title, meal.summary, etc.           │
   * │  → Order in VALUES must match order in column list                  │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "And then later just pass an object to the run function, which we will
   * call on this prepared statement and better-sqlite. The package we're
   * using to execute this command here will then look at those property
   * names in that object you're passing to it to extract the values stored
   * under those property names and it will then use those values to store
   * them in those fields."
   *
   * INSTRUCTOR QUOTE:
   * "However, you must make sure that the order you got here is the same
   * as you have it here."
   */
  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);
}

/**
 * ============================================================================
 * LESSONS 452, 455, 457, 465 & 466 - DATA MODULE SUMMARY
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
 *    - Server Components can be async functions
 *    - Not possible in traditional React components
 *
 * 3. SEPARATION OF CONCERNS
 *    - Data fetching logic in lib/meals.js
 *    - Page rendering logic in app/meals/page.js
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
 *    - Uncomment `throw new Error(...)` to test error handling
 *    - Errors thrown here will be caught by error.js
 *
 * KEY CONCEPTS (LESSON 457):
 *
 * 6. FETCHING SINGLE RECORDS BY SLUG
 *    - Use get() instead of all() for single records
 *    - Use parameterized queries (?) to prevent SQL injection
 *
 * KEY CONCEPTS (LESSON 465):
 *
 * 7. SLUG GENERATION WITH slugify
 *    - slugify(meal.title, { lower: true })
 *    - Converts "Grandma's Apple Pie" → "grandmas-apple-pie"
 *
 * 8. XSS PROTECTION WITH xss PACKAGE
 *    - xss(meal.instructions) sanitizes user input
 *    - Prevents malicious script injection
 *
 * KEY CONCEPTS (LESSON 466):
 *
 * 9. FILE SYSTEM OPERATIONS WITH fs
 *
 *    INSTRUCTOR QUOTE:
 *    "Now the image should be stored on the file system, not in the database
 *    because storing files in databases is a bad idea. It's bad for performance
 *    because databases simply aren't built for that."
 *
 *    - import fs from 'node:fs' for file operations
 *    - fs.createWriteStream() creates a stream for writing
 *    - stream.write() writes buffer data to file
 *
 * 10. IMAGE BUFFER CONVERSION
 *
 *    INSTRUCTOR QUOTE:
 *    "In case of our image here, it means that we should convert the image
 *    to a so-called buffer... that object has an arrayBuffer method you can
 *    call, which will give you such a buffer."
 *
 *    meal.image.arrayBuffer() → Promise<ArrayBuffer>
 *    Buffer.from(arrayBuffer) → Node.js Buffer (writable)
 *
 * 11. PUBLIC FOLDER PATH HANDLING
 *
 *    INSTRUCTOR QUOTE:
 *    "You should actually remove this public segment because all requests
 *    for images will be sent to the public folder automatically anyways."
 *
 *    FILE SAVED TO:     public/images/meal-slug.jpg
 *    PATH IN DATABASE:  /images/meal-slug.jpg  (no "public")
 *    URL TO ACCESS:     /images/meal-slug.jpg
 *
 * 12. NAMED PLACEHOLDERS IN SQL
 *
 *    INSTRUCTOR QUOTE:
 *    "You can target specific fields by their name, like this. And then
 *    later just pass an object to the run function... and better-sqlite
 *    will then look at those property names in that object."
 *
 *    VALUES (@title, @summary, @instructions, ...)
 *    .run(meal)  // Properties extracted automatically!
 *
 * WHAT THIS MODULE EXPORTS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  getMeals()     │  Returns all meals from the database                  │
 * │                 │  (with a 2-second simulated delay for demo purposes)  │
 * │  ───────────────│───────────────────────────────────────────────────────│
 * │  getMeal(slug)  │  Returns a single meal by its slug identifier         │
 * │                 │  Uses parameterized query for SQL injection safety    │
 * │  ───────────────│───────────────────────────────────────────────────────│
 * │  saveMeal(meal) │  Saves a new meal to the database - Lessons 465 & 466│
 * │                 │  1. Generates slug from title                         │
 * │                 │  2. Sanitizes instructions (XSS protection)           │
 * │                 │  3. Saves image to public/images folder               │
 * │                 │  4. Inserts meal record into database                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * saveMeal() DATA FLOW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  INPUT:                          OUTPUT:                                │
 * │  ┌──────────────────────┐        ┌──────────────────────┐              │
 * │  │ meal = {              │        │ meal = {              │              │
 * │  │   title: "..."        │   ▶▶   │   title: "..."        │              │
 * │  │   summary: "..."      │        │   summary: "..."      │              │
 * │  │   instructions: "..." │        │   instructions: "..." │ (sanitized) │
 * │  │   image: File {...}   │        │   image: "/images/..." │ (path!)    │
 * │  │   creator: "..."      │        │   creator: "..."      │              │
 * │  │   creator_email: "...│        │   creator_email: "..." │              │
 * │  │ }                     │        │   slug: "..."         │ (generated) │
 * │  └──────────────────────┘        └──────────────────────┘              │
 * │                                                                          │
 * │  SIDE EFFECTS:                                                          │
 * │  • File saved to: public/images/{slug}.{ext}                            │
 * │  • Row inserted into meals table                                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
