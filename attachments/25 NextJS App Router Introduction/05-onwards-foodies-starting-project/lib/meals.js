/**
 * ============================================================================
 * MEALS DATA MODULE - LESSONS 452 & 455: Data Fetching & Error Handling
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
 * LESSONS 452 & 455 - DATA FETCHING & ERROR HANDLING SUMMARY
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
 * WHAT THIS MODULE EXPORTS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  getMeals()   │  Returns all meals from the database                    │
 * │               │  (with a 2-second simulated delay for demo purposes)    │
 * │               │  Can throw error if database fails (see Lesson 455)     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * USAGE IN PAGE COMPONENTS:
 *   import { getMeals } from '@/lib/meals';
 *
 *   export default async function MealsPage() {
 *     const meals = await getMeals();
 *     return <MealsGrid meals={meals} />;
 *   }
 *
 * ============================================================================
 */
