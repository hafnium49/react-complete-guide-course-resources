/**
 * ============================================================================
 * MEALS COMPONENT - FETCHING AND DISPLAYING MEALS (Lesson 286)
 * ============================================================================
 *
 * This component is responsible for fetching meal data from the backend
 * and displaying it in a responsive grid layout.
 *
 * LESSON 286 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Sending HTTP requests to a backend using fetch()
 * 2. Understanding why we need useState for data that arrives asynchronously
 * 3. Understanding why we need useEffect to avoid infinite loops
 * 4. Why component functions cannot be async
 * 5. Rendering lists with the map() method
 *
 * THE CHALLENGE:
 * ==============
 * As the instructor explains:
 * "The idea here of course is that in the end, we load that meal data
 * from that dummy backend. There will have that meals endpoint which
 * handles GET requests and which then will return us this dummy meal
 * data which lives on that dummy backend."
 *
 * BACKEND API:
 * ============
 * GET http://localhost:3000/meals
 *
 * Response (from backend's available-meals.json):
 * [
 *   {
 *     "id": "m1",
 *     "name": "Mac & Cheese",
 *     "price": "8.99",
 *     "description": "Creamy cheddar cheese...",
 *     "image": "images/mac-and-cheese.jpg"
 *   },
 *   ...
 * ]
 *
 * ============================================================================
 * LESSON 286: THE BASIC APPROACH (useState + useEffect + fetch)
 * ============================================================================
 *
 * The instructor initially teaches this fundamental pattern:
 *
 * ```javascript
 * import { useState, useEffect } from 'react';
 *
 * export default function Meals() {
 *   const [loadedMeals, setLoadedMeals] = useState([]);
 *
 *   useEffect(() => {
 *     async function fetchMeals() {
 *       const response = await fetch('http://localhost:3000/meals');
 *       const meals = await response.json();
 *       setLoadedMeals(meals);
 *     }
 *     fetchMeals();
 *   }, []);
 *
 *   return (
 *     <ul id="meals">
 *       {loadedMeals.map((meal) => (
 *         <li key={meal.id}>{meal.name}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 *
 * WHY useState?
 * -------------
 * The instructor explains: "Since we're awaiting a response and the
 * extraction of the data, it makes sense that the meals data will not
 * be available instantly when this component function is executed.
 * Instead, there will very likely be some delay even if it's just a
 * couple of milliseconds."
 *
 * "Therefore, the meals will not be there initially and therefore, we
 * should manage them as some state so that we initially have no meals
 * and we render a UI without meals data. And then once the meals data
 * arrived, we update the UI with that new data."
 *
 * WHY useEffect?
 * --------------
 * The instructor warns about a critical problem:
 *
 * "Now of course we could now call it here in the component function,
 * but you learned before in this course that this is not the best idea.
 * It's not a great idea because if we call this function here in the
 * component function, obviously this code here will be executed."
 *
 * "And the problem with that is that in this code, we're updating the
 * state. Now what happens if you update the state? The component
 * function to which this state belongs is executed again."
 *
 * "So therefore, the Meals component function would be executed again,
 * this line of code here would be executed again and therefore, of
 * course this code would run again, the state would be set again and
 * we'd end up in an infinite loop, which we definitely don't want
 * because that would crash our application."
 *
 * WHY CAN'T THE COMPONENT FUNCTION BE ASYNC?
 * ------------------------------------------
 * "You can use the then method to define a function that will be
 * executed when that promise resolves when you got back a response.
 * Alternatively, you could use async await, but you must not convert
 * your component function into an async function because that's not
 * allowed by React."
 *
 * "Therefore, in order to handle this request, we could use then or
 * wrap this into a separate function which we could name fetchMeals.
 * This can now be an async function because it's now a standard
 * function inside of the component function."
 *
 * WHY DEFINE fetchMeals INSIDE useEffect?
 * ---------------------------------------
 * "Now, we could also leave this fetchMeals function outside of this
 * effect function, but then we would have to add it as a dependency
 * because we're now using something in the effect that's defined
 * outside of the effect."
 *
 * "And we then might have to use useCallback here to avoid that it
 * changes every time the component function is re-executed. And it's
 * just a lot of unnecessary work since this fetchMeals function is
 * only used in this effect function anyways. So moving it into this
 * effect function is the simplest way of dealing with this."
 *
 * WHY EMPTY DEPENDENCIES ARRAY?
 * -----------------------------
 * "Now indeed here, we don't have to add any dependencies because
 * this effect function here is now not using any external props or
 * state or any other values that could change across renders."
 *
 * "The only external thing it's using is the setLoadedMeals function,
 * which is provided by the useState hook and which is guaranteed by
 * React to never change. Therefore, this should work like this and
 * we should successfully load our meals."
 *
 * ============================================================================
 * CURRENT IMPLEMENTATION (Using Custom Hook)
 * ============================================================================
 *
 * Note: This implementation uses a custom useHttp hook which abstracts
 * the useState + useEffect + fetch pattern into a reusable hook.
 * This is a more advanced pattern covered in later lessons, but the
 * underlying concepts from Lesson 286 still apply.
 */

/**
 * IMPORTS
 * =======
 * Note: The basic Lesson 286 approach imports useState and useEffect from React.
 * This implementation uses a custom hook that encapsulates those hooks.
 *
 * - useHttp: Custom hook for HTTP requests (handles loading/error/data states)
 * - MealItem: Component for rendering individual meal cards (Lesson 287)
 * - Error: Component for displaying error messages (added in later lesson)
 *
 * LESSON 287 - IMPORTING MealItem:
 * --------------------------------
 * The instructor says: "Now we can go back to Meals.jsx and use that meal
 * item there. Instead of outputting those list items here, I'll output my
 * meal items which I just added."
 *
 * "Of course, you also must make sure that the meal item is imported from
 * MealItem.jsx."
 */
import useHttp from '../hooks/useHttp.js';
import MealItem from './MealItem.jsx'; // Added in Lesson 287
import Error from './Error.jsx';

/**
 * REQUEST CONFIG
 * ==============
 * Configuration object for the HTTP request.
 *
 * WHY DEFINE THIS OUTSIDE THE COMPONENT?
 * --------------------------------------
 * This relates to the useEffect dependency discussion in Lesson 286:
 *
 * If we defined this inside the component, a new object would be created
 * on every render. This would cause the effect to run on every render
 * because objects are compared by reference, not value.
 *
 * By defining it outside, we use the SAME object reference every time,
 * preventing unnecessary re-fetches.
 *
 * BASIC FETCH (Lesson 286):
 * -------------------------
 * In the basic approach, we don't need this config because:
 * fetch('http://localhost:3000/meals')
 *
 * GET is the default method, so no configuration is needed.
 * The instructor says: "Now, you could configure this request and for
 * example change the request method, but GET is already the default
 * and we also don't need to send any other information."
 */
const requestConfig = {};

/**
 * MEALS COMPONENT
 * ===============
 * Fetches and displays all available meals from the backend.
 *
 * LESSON 286 VERSION (simplified for learning):
 * ----------------------------------------------
 * Just displayed meal names in a list:
 * <li key={meal.id}>{meal.name}</li>
 *
 * The instructor says: "And for now I'll just output the name. So back
 * here in Meals.jsx, between those list item tags I'll output meal.name
 * just so that we can see whether this works or not."
 *
 * This version includes MealItem components with full meal cards
 * (added in later lessons).
 */
export default function Meals() {
  /**
   * USING THE CUSTOM HTTP HOOK
   * ==========================
   * This hook encapsulates the useState + useEffect + fetch pattern
   * taught in Lesson 286.
   *
   * WHAT THE HOOK DOES INTERNALLY (similar to Lesson 286):
   * ------------------------------------------------------
   * 1. Creates state with useState: data, isLoading, error
   * 2. Uses useEffect to send the request when component mounts
   * 3. Calls fetch() with the URL
   * 4. Awaits response.json() to extract data
   * 5. Updates state with the result
   *
   * DESTRUCTURING WITH RENAME:
   * --------------------------
   * { data: loadedMeals } extracts 'data' and renames it to 'loadedMeals'.
   *
   * The instructor used 'loadedMeals' as the state name:
   * "And hence we should use the useState hook here in this Meals
   * component and import useState from React. And then here, start
   * with an empty array. Since this should be that Meals state or
   * that loadedMeals state to make it very clear that that meals
   * data will not be there initially."
   */
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  /**
   * LOADING STATE
   * =============
   * While the request is in progress, show a loading message.
   *
   * Note: The basic Lesson 286 version didn't handle loading state.
   * It would show an empty list briefly before the data arrived.
   * This is an enhancement added in later lessons.
   */
  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  /**
   * ERROR STATE
   * ===========
   * If the request failed, show an error message.
   *
   * The instructor mentioned this in Lesson 286 but deferred it:
   * "Now that response then might be an error response because maybe
   * the request failed, maybe something went wrong on the server and
   * therefore, we should check if the response is not OK... Though,
   * we'll do that a little bit later because for the moment, I want
   * to keep it simple."
   */
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  /**
   * SUCCESS STATE - RENDERING THE MEALS
   * ====================================
   * As the instructor explains:
   * "And I will return an unordered list. An unordered list with an
   * id of meals, because again, if you take a look at the index.css
   * file, in there you will find such a rule that's looking for meals
   * and that's indeed intended to be used on that list that will
   * display the meals."
   *
   * CSS STYLING (from index.css):
   * The #meals ID provides:
   * - display: grid
   * - grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))
   * - gap: 1rem
   *
   * This creates a responsive grid that adjusts columns based on screen width.
   */
  return (
    <ul id="meals">
      {/*
        MAPPING MEALS TO COMPONENTS (Lessons 286 & 287)
        ================================================

        LESSON 286 - Initial approach:
        ------------------------------
        The instructor explains: "I'll just use this loadedMeals state
        and map every meals item into a list item which gets a key
        that should be meal.id because every dummy meal I'm providing
        on the backend will have an ID which we can access."

        "And then every meal also has a name, a price, a description
        and an image. And for now I'll just output the name."

        {loadedMeals.map((meal) => (
          <li key={meal.id}>{meal.name}</li>
        ))}

        LESSON 287 - Using MealItem component:
        --------------------------------------
        The instructor says: "Now we can go back to Meals.jsx and use
        that meal item there. Instead of outputting those list items
        here, I'll output my meal items which I just added."

        "And every meal item should of course receive a key which still
        can be meal.id, and then, in my case, since I'm expecting that
        single meal prop here, every meal item should also get this meal
        prop which can be set equal to the meal we're getting here in
        that loop."

        KEY PROP:
        ---------
        key={meal.id}

        The key prop is CRUCIAL for React's performance:
        - Helps React identify which items changed/added/removed
        - Must be unique among siblings
        - Should be stable (same item = same key every render)

        Using meal.id (from backend) is perfect because:
        - It's unique (each meal has a different ID)
        - It's stable (same meal always has same ID)
        - It's from the data itself (not array index)
      */}
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS FROM LESSON 286
 * ============================================================================
 *
 * THE INFINITE LOOP PROBLEM:
 * ==========================
 * 1. Component function runs
 * 2. fetch() is called
 * 3. Data arrives, setState() is called
 * 4. setState triggers re-render
 * 5. Component function runs again
 * 6. fetch() is called again
 * 7. ... infinite loop!
 *
 * THE SOLUTION (useEffect):
 * =========================
 * useEffect runs AFTER the component renders, not during.
 * With an empty dependencies array [], it only runs once on mount.
 * This breaks the infinite loop.
 *
 * THE PATTERN:
 * ============
 * useEffect(() => {
 *   async function fetchData() {
 *     const response = await fetch(url);
 *     const data = await response.json();
 *     setData(data);
 *   }
 *   fetchData();
 * }, []);
 *
 * WHY ASYNC FUNCTION INSIDE useEffect:
 * ====================================
 * - Component functions can't be async (React doesn't allow it)
 * - useEffect callback can't be async (must return cleanup or undefined)
 * - Solution: Define async function inside, then call it
 *
 * ADDING TO APP.JSX:
 * ==================
 * The instructor says: "To now see this in action, we of course have to
 * go to the App component and in there, add our Meals component which
 * must be imported from the Meals.jsx file."
 *
 * "And if we then save this and reload our page, we should see that
 * meals data here. Obviously, at the moment, just the names because
 * at the moment we're not outputting anything else but this proves
 * that fetching this data works. And that's of course a huge step
 * into the right direction."
 */
