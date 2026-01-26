/**
 * ============================================================================
 * MEALS PAGE - LESSONS 440, 450 & 452: Fetching Data in Server Components
 * ============================================================================
 *
 * LESSON 452 - FETCHING DATA WITHOUT useEffect OR fetch()
 *
 * INSTRUCTOR QUOTE:
 * "Now when it comes to loading data in a NextJS application, we get a couple
 * of different options. We could fetch the data as we would do it in any
 * vanilla React application. We could, for example, use the useEffect hook
 * like this, and then in there use the fetch function to send a request to
 * a backend."
 *
 * INSTRUCTOR QUOTE:
 * "But actually, because we have those server components as a default, we
 * don't need useEffect and we don't need to send a fetch request to get data.
 * Instead, since this component by default runs on the server and only there,
 * we can directly reach out to the database from here."
 *
 * ============================================================================
 * WHY THIS APPROACH IS DIFFERENT FROM TRADITIONAL REACT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And that's definitely not something you're used to from other React apps.
 * But that's absolutely fine in Next apps because this is a server component
 * that only runs on the server. So reaching out to a database is safe here."
 *
 * TRADITIONAL REACT DATA FETCHING:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  function MealsPage() {                                                 │
 * │    const [meals, setMeals] = useState([]);                              │
 * │                                                                          │
 * │    useEffect(() => {                                                    │
 * │      fetch('/api/meals')                                                │
 * │        .then(res => res.json())                                         │
 * │        .then(data => setMeals(data));                                   │
 * │    }, []);                                                              │
 * │                                                                          │
 * │    return <MealsGrid meals={meals} />;                                  │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NEXT.JS SERVER COMPONENT DATA FETCHING (THIS FILE):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  async function MealsPage() {                                           │
 * │    const meals = await getMeals();  // Direct database access!          │
 * │    return <MealsGrid meals={meals} />;                                  │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * PAGE STRUCTURE OVERVIEW (Lesson 450)
 * ============================================================================
 *
 * PAGE LAYOUT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <> (Fragment)                                                          │
 * │    <header>          ← Hero section with title and CTA                  │
 * │      ├── h1          ← "Delicious meals, created by you"                │
 * │      ├── p           ← Description text                                 │
 * │      └── p.cta       ← Link to share meals page                         │
 * │    <main>            ← Main content area                                │
 * │      └── MealsGrid   ← Grid of meal cards (now with real data!)         │
 * │  </>                                                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import Link from 'next/link';

import classes from './page.module.css';

import MealsGrid from '@/components/meals/meals-grid';

/**
 * ============================================================================
 * IMPORTING THE DATA FETCHING FUNCTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, in order to keep things separated, I'll not write my code in here
 * though. Instead, I'll add a new folder in my root project folder, which
 * I'll name lib... But in there I'll add a new file, which I'll name meals.js.
 * And in here I wanna write the code that reaches out to a database and gets
 * data from that database."
 *
 * The getMeals function:
 * - Connects to the SQLite database
 * - Executes a SELECT query
 * - Returns an array of meal objects
 * - Includes a 2-second simulated delay (for demo purposes)
 */
import { getMeals } from '@/lib/meals';

/**
 * ============================================================================
 * ASYNC SERVER COMPONENT - MEALS PAGE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And if you then had some code that would use a promise, you could use
 * await here. And this also allows me to show you that you can use async
 * await here, of course, because it's a regular function, but you can also
 * use it here in this component function. And that's not something you can
 * normally do in React, but you can do it with server components."
 *
 * KEY INSIGHT: This component is marked as `async`!
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • In traditional React, component functions CANNOT be async            │
 * │  • In Next.js Server Components, they CAN be async                      │
 * │  • This allows direct await usage without useEffect or .then()          │
 * │  • The component waits for data before rendering                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @returns {Promise<JSX.Element>} The meals listing page with fetched data
 */
export default async function MealsPage() {
  /**
   * FETCHING MEALS DATA DIRECTLY IN THE COMPONENT
   *
   * INSTRUCTOR QUOTE:
   * "So here we can then await the call to get meals, to get the meals data,
   * and we'll get back our meals here just like that without useEffect,
   * without any unnecessary fetch request being sent."
   *
   * DATA FLOW:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  1. MealsPage component renders on the server                       │
   * │  2. getMeals() is called (with 2-second simulated delay)            │
   * │  3. Database query executes: SELECT * FROM meals                    │
   * │  4. Meals array is returned                                         │
   * │  5. Component continues rendering with the data                     │
   * │  6. HTML is sent to the client (no JavaScript needed for data)      │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * NOTE: Because of the simulated delay in getMeals(), this page will
   * take ~2 seconds to load. In a future lesson, we'll learn how to
   * handle loading states with Suspense.
   */
  const meals = await getMeals();

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h1>

        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>

        <p className={classes.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>

      <main>
        {/**
         * ================================================================
         * PASSING FETCHED MEALS TO THE GRID
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "And with that done, we can therefore then use these meals down
         * here where we have that MealsGrid. We can simply pass meals to
         * MealsGrid."
         *
         * The meals variable now contains actual data from the database:
         * [
         *   { id: 1, title: 'Juicy Cheese Burger', slug: '...', ... },
         *   { id: 2, title: 'Spicy Curry', slug: '...', ... },
         *   ...
         * ]
         */}
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}

/**
 * ============================================================================
 * LESSON 452 - DATA FETCHING IN SERVER COMPONENTS SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. SERVER COMPONENTS CAN BE ASYNC
 *    - Add the `async` keyword to the component function
 *    - Use `await` directly in the component body
 *    - No useEffect, no useState, no fetch() needed
 *
 * 2. DIRECT DATABASE ACCESS
 *    - Server Components run only on the server
 *    - Safe to access databases, file systems, etc.
 *    - No API endpoints needed for data fetching
 *
 * 3. SEPARATION OF CONCERNS
 *    - Data fetching logic in lib/meals.js
 *    - Rendering logic in page component
 *    - Clean, maintainable code
 *
 * INSTRUCTOR QUOTE:
 * "And with all that done, if you save everything and you restart that
 * development server, you should be able to reload this meals page and see
 * all those meals here."
 *
 * INSTRUCTOR QUOTE:
 * "But you can see those meals here, and that's now data being fetched from
 * the databases and images being fetched from that public folder because
 * that's where we're storing them."
 *
 * CURRENT STATE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Database set up with 7 dummy meals (Lesson 451)                      │
 * │  ✓ getMeals() function fetches all meals (Lesson 452)                   │
 * │  ✓ MealsPage displays meals from database (Lesson 452)                  │
 * │  ✓ MealItem links to /meals/[slug] (works, but no detail page yet)      │
 * │  ⏳ Loading state handling (future lesson with Suspense)                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
