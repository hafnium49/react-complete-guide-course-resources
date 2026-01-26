/**
 * ============================================================================
 * MEALS GRID COMPONENT - LESSON 450: Displaying Meals in a Grid Layout
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I will add a separate component for outputting the meals though, and
 * therefore, for that, back in my root components folder, I'll add a meals
 * subfolder to store any meal-related components. And there, I'll add a
 * meals-grid.js file."
 *
 * ============================================================================
 * COMPONENT ORGANIZATION
 * ============================================================================
 *
 * This component lives in the components/meals folder:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  components/                                                            │
 * │  └── meals/                  ← Meal-related components                  │
 * │      ├── meals-grid.js       ← THIS FILE                                │
 * │      ├── meals-grid.module.css                                          │
 * │      ├── meal-item.js        ← Individual meal card                     │
 * │      └── meal-item.module.css                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * PURPOSE:
 * Renders an array of meals in a responsive grid layout.
 * Each meal is displayed using the MealItem component.
 *
 * ============================================================================
 */

/**
 * IMPORTING THE MEAL ITEM COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "And with that added, we can output it here in the MealsGrid component.
 * So here between those li tags, I'll output the MealItem like this."
 */
import MealItem from './meal-item';

/**
 * CSS Module import for grid layout styles.
 *
 * INSTRUCTOR QUOTE:
 * "I also prepared a CSS file, meals-grid.module, which you'll find attached,
 * which you should then import into this meals-grid.js file just as we always
 * did it with all those .module.css files."
 */
import classes from './meals-grid.module.css';

/**
 * MEALS GRID COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "Now the job of this meals-grid.js file will be to output a bunch of meal
 * items in a grid. So therefore, of course, we start by exporting a component
 * function. I'll name it MealsGrid. And I expect to get the meals that should
 * be output here as a prop."
 *
 * @param {Object} props - Component props
 * @param {Array} props.meals - Array of meal objects to display
 * @returns {JSX.Element} A grid of meal cards
 */
export default function MealsGrid({ meals }) {
  return (
    /**
     * UNORDERED LIST AS GRID CONTAINER
     *
     * INSTRUCTOR QUOTE:
     * "And then I'll output an unordered list. And in that list, I'll map
     * through all meals so that for every meal, we can output a list item."
     *
     * INSTRUCTOR QUOTE:
     * "...so that we can add a class here to the unordered list, a class
     * called meals like this."
     *
     * The .meals class uses CSS Grid for responsive layout:
     * - grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr))
     * - This creates a flexible grid that adapts to screen width
     */
    <ul className={classes.meals}>
      {meals.map((meal) => (
        /**
         * LIST ITEM WITH UNIQUE KEY
         *
         * INSTRUCTOR QUOTE:
         * "Now every list item here needs a key, and the key can be meal.id
         * because every meal will have an id."
         *
         * React requires unique keys for list items to:
         * - Efficiently update the DOM when items change
         * - Maintain component state correctly
         * - Avoid unnecessary re-renders
         */
        <li key={meal.id}>
          {/**
           * SPREADING MEAL PROPERTIES AS PROPS
           *
           * INSTRUCTOR QUOTE:
           * "And I'll simply forward all those meal properties from that meal
           * we have here to that MealItem. So I use this syntax to pull out
           * all the properties of that meal object and spread them as
           * key-value pairs, so as props in the end, onto this MealItem."
           *
           * HOW THE SPREAD OPERATOR WORKS HERE:
           * ┌─────────────────────────────────────────────────────────────┐
           * │  meal = { id: 1, title: "Burger", slug: "burger", ... }     │
           * │                                                              │
           * │  {...meal} is equivalent to:                                │
           * │  id={meal.id}                                               │
           * │  title={meal.title}                                         │
           * │  slug={meal.slug}                                           │
           * │  image={meal.image}                                         │
           * │  summary={meal.summary}                                     │
           * │  creator={meal.creator}                                     │
           * └─────────────────────────────────────────────────────────────┘
           *
           * INSTRUCTOR QUOTE:
           * "And since the meal I get here, since the meals I'll have in
           * this meals array eventually will have all those properties that
           * are expected as props here, this approach will work just fine."
           */}
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}

/**
 * ============================================================================
 * LESSON 450 - MEALS GRID SUMMARY
 * ============================================================================
 *
 * WHAT THIS COMPONENT DOES:
 *
 * 1. RECEIVES meals ARRAY AS A PROP
 *    - Each meal object contains: id, title, slug, image, summary, creator
 *
 * 2. MAPS THROUGH THE ARRAY
 *    - Creates a list item for each meal
 *    - Uses meal.id as the React key
 *
 * 3. RENDERS MEALITEM COMPONENTS
 *    - Spreads all meal properties as props
 *    - Each MealItem displays a single meal card
 *
 * DATA FLOW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  MealsPage (page.js)                                                    │
 * │       ↓ passes meals array                                              │
 * │  MealsGrid (this file)                                                  │
 * │       ↓ maps and spreads props                                          │
 * │  MealItem (meal-item.js)                                                │
 * │       ↓ renders individual card                                         │
 * │  User sees meal grid                                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
