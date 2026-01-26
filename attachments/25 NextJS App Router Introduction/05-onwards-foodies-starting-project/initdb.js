/**
 * ============================================================================
 * DATABASE INITIALIZATION SCRIPT - LESSON 451: Setting Up SQLite Database
 * ============================================================================
 *
 * LESSON 451 - SETTING UP A DATABASE FOR MEALS
 *
 * INSTRUCTOR QUOTE:
 * "So in order for this meals grid component to be useful and in order to see
 * something on the screen here, we need meals. And for that I wanna set up a
 * basic database that will store some dummy meals and that will later also
 * store meals shared by users."
 *
 * ============================================================================
 * WHY SQLITE?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And I'll use a SQL light database here because it's an amazing SQL database
 * that can be used locally without setting up any extra database server or any
 * other complex setup needed."
 *
 * SQLITE BENEFITS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ No separate database server needed                                   │
 * │  ✓ Database stored as a single file (meals.db)                          │
 * │  ✓ Perfect for development and small-to-medium applications             │
 * │  ✓ Full SQL support                                                     │
 * │  ✓ Zero configuration required                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * HOW TO RUN THIS SCRIPT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So here in my root project folder, I'll execute this initdb.js file with
 * node and it should work. And you should have such a meals DB file thereafter.
 * That is that SQL Light database that we'll use now."
 *
 * COMMAND:
 *   node initdb.js
 *
 * After running, you'll see a meals.db file in your project root.
 *
 * ============================================================================
 * INSTALLATION REQUIRED
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for that, I'll stop my development server here with Ctrl + C, and I'll
 * install a new dependency with NPM install. And that dependency is the
 * better-sql light three package. And this is a package that will allow us
 * to work with a SQL light database."
 *
 * COMMAND:
 *   npm install better-sqlite3
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * IMPORTING THE BETTER-SQLITE3 PACKAGE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "This file uses the package we just installed to create a new database file
 * if it doesn't exist yet otherwise it'll use the existing one."
 *
 * NOTE: This script uses CommonJS (require) syntax, not ES Modules (import).
 * This is because it runs directly with Node.js, not through Next.js.
 */
const sql = require('better-sqlite3');

/**
 * ============================================================================
 * DATABASE CONNECTION
 * ============================================================================
 *
 * Creates or opens the meals.db database file.
 * - If the file doesn't exist, it will be created
 * - If the file exists, it will be opened
 *
 * The database file will be created in the same directory as this script.
 */
const db = sql('meals.db');

/**
 * ============================================================================
 * DUMMY MEALS DATA
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And it then contains a bunch of dummy meals data so that we have some
 * meals to get started, which are then written into that database."
 *
 * Each meal object contains all the fields that will be stored in the database:
 *
 * MEAL OBJECT STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FIELD          │  TYPE    │  DESCRIPTION                               │
 * │  ───────────────│──────────│────────────────────────────────────────────│
 * │  title          │  string  │  Display name of the meal                  │
 * │  slug           │  string  │  URL-friendly identifier (unique)          │
 * │  image          │  string  │  Path to image in public folder            │
 * │  summary        │  string  │  Brief description                         │
 * │  instructions   │  string  │  Step-by-step cooking instructions         │
 * │  creator        │  string  │  Name of person who shared the meal        │
 * │  creator_email  │  string  │  Email of the creator                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And that's all data I have here in that dummy data. And that's all data
 * we'll later collect from the website visitors."
 */
const dummyMeals = [
  {
    title: 'Juicy Cheese Burger',
    slug: 'juicy-cheese-burger',
    image: '/images/burger.jpg',
    summary:
      'A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.',
    instructions: `
      1. Prepare the patty:
         Mix 200g of ground beef with salt and pepper. Form into a patty.

      2. Cook the patty:
         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.

      3. Assemble the burger:
         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.

      4. Serve:
         Complete the assembly with the top bun and serve hot.
    `,
    creator: 'John Doe',
    creator_email: 'johndoe@example.com',
  },
  {
    title: 'Spicy Curry',
    slug: 'spicy-curry',
    image: '/images/curry.jpg',
    summary:
      'A rich and spicy curry, infused with exotic spices and creamy coconut milk.',
    instructions: `
      1. Chop vegetables:
         Cut your choice of vegetables into bite-sized pieces.

      2. Sauté vegetables:
         In a pan with oil, sauté the vegetables until they start to soften.

      3. Add curry paste:
         Stir in 2 tablespoons of curry paste and cook for another minute.

      4. Simmer with coconut milk:
         Pour in 500ml of coconut milk and bring to a simmer. Let it cook for about 15 minutes.

      5. Serve:
         Enjoy this creamy curry with rice or bread.
    `,
    creator: 'Max Schwarz',
    creator_email: 'max@example.com',
  },
  {
    title: 'Homemade Dumplings',
    slug: 'homemade-dumplings',
    image: '/images/dumplings.jpg',
    summary:
      'Tender dumplings filled with savory meat and vegetables, steamed to perfection.',
    instructions: `
      1. Prepare the filling:
         Mix minced meat, shredded vegetables, and spices.

      2. Fill the dumplings:
         Place a spoonful of filling in the center of each dumpling wrapper. Wet the edges and fold to seal.

      3. Steam the dumplings:
         Arrange dumplings in a steamer. Steam for about 10 minutes.

      4. Serve:
         Enjoy these dumplings hot, with a dipping sauce of your choice.
    `,
    creator: 'Emily Chen',
    creator_email: 'emilychen@example.com',
  },
  {
    title: 'Classic Mac n Cheese',
    slug: 'classic-mac-n-cheese',
    image: '/images/macncheese.jpg',
    summary:
      "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
    instructions: `
      1. Cook the macaroni:
         Boil macaroni according to package instructions until al dente.

      2. Prepare cheese sauce:
         In a saucepan, melt butter, add flour, and gradually whisk in milk until thickened. Stir in grated cheese until melted.

      3. Combine:
         Mix the cheese sauce with the drained macaroni.

      4. Bake:
         Transfer to a baking dish, top with breadcrumbs, and bake until golden.

      5. Serve:
         Serve hot, garnished with parsley if desired.
    `,
    creator: 'Laura Smith',
    creator_email: 'laurasmith@example.com',
  },
  {
    title: 'Authentic Pizza',
    slug: 'authentic-pizza',
    image: '/images/pizza.jpg',
    summary:
      'Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.',
    instructions: `
      1. Prepare the dough:
         Knead pizza dough and let it rise until doubled in size.

      2. Shape and add toppings:
         Roll out the dough, spread tomato sauce, and add your favorite toppings and cheese.

      3. Bake the pizza:
         Bake in a preheated oven at 220°C for about 15-20 minutes.

      4. Serve:
         Slice hot and enjoy with a sprinkle of basil leaves.
    `,
    creator: 'Mario Rossi',
    creator_email: 'mariorossi@example.com',
  },
  {
    title: 'Wiener Schnitzel',
    slug: 'wiener-schnitzel',
    image: '/images/schnitzel.jpg',
    summary:
      'Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.',
    instructions: `
      1. Prepare the veal:
         Pound veal cutlets to an even thickness.

      2. Bread the veal:
         Coat each cutlet in flour, dip in beaten eggs, and then in breadcrumbs.

      3. Fry the schnitzel:
      Heat oil in a pan and fry each schnitzel until golden brown on both sides.

      4. Serve:
      Serve hot with a slice of lemon and a side of potato salad or greens.
 `,
    creator: 'Franz Huber',
    creator_email: 'franzhuber@example.com',
  },
  {
    title: 'Fresh Tomato Salad',
    slug: 'fresh-tomato-salad',
    image: '/images/tomato-salad.jpg',
    summary:
      'A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.',
    instructions: `
      1. Prepare the tomatoes:
        Slice fresh tomatoes and arrange them on a plate.

      2. Add herbs and seasoning:
         Sprinkle chopped basil, salt, and pepper over the tomatoes.

      3. Dress the salad:
         Drizzle with olive oil and balsamic vinegar.

      4. Serve:
         Enjoy this simple, flavorful salad as a side dish or light meal.
    `,
    creator: 'Sophia Green',
    creator_email: 'sophiagreen@example.com',
  },
];

/**
 * ============================================================================
 * CREATE THE MEALS TABLE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "First, a new table is created if it doesn't exist yet, and the columns of
 * that table are configured."
 *
 * TABLE SCHEMA:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  COLUMN         │  TYPE     │  CONSTRAINTS                              │
 * │  ───────────────│───────────│───────────────────────────────────────────│
 * │  id             │  INTEGER  │  PRIMARY KEY, AUTO-INCREMENT              │
 * │  slug           │  TEXT     │  NOT NULL, UNIQUE                         │
 * │  title          │  TEXT     │  NOT NULL                                 │
 * │  image          │  TEXT     │  NOT NULL                                 │
 * │  summary        │  TEXT     │  NOT NULL                                 │
 * │  instructions   │  TEXT     │  NOT NULL                                 │
 * │  creator        │  TEXT     │  NOT NULL                                 │
 * │  creator_email  │  TEXT     │  NOT NULL                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "So every meal has an ID, which is created automatically. Every meal has a
 * unique slug. Every meal has a title, an image, though that will be the path
 * to an image, not the file itself. And then also a summary instructions, the
 * name of the creator and the email of the creator."
 *
 * SQL EXPLANATION:
 * - CREATE TABLE IF NOT EXISTS: Creates table only if it doesn't already exist
 * - PRIMARY KEY AUTOINCREMENT: id is auto-generated and unique
 * - NOT NULL: Field cannot be empty
 * - UNIQUE: slug must be different for each meal (used in URLs)
 */
db.prepare(`
   CREATE TABLE IF NOT EXISTS meals (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
    )
`).run();

/**
 * ============================================================================
 * INSERT DUMMY DATA INTO THE DATABASE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And then with that table created, I have this init data function, which is
 * then executed to write some data into that database. I'm simply writing all
 * those dummy meals into the database."
 *
 * INSTRUCTOR QUOTE:
 * "And this prepare function, which you see here, is provided by that better
 * SQL light free package. So that's how I'm preparing the database."
 *
 * HOW THE INSERT WORKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. db.prepare() creates a prepared statement (SQL template)            │
 * │  2. The @fieldName syntax creates named parameters                      │
 * │  3. stmt.run(meal) executes the statement with the meal object          │
 * │  4. Named parameters are matched to object properties automatically     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * EXAMPLE:
 *   meal = { slug: 'burger', title: 'Burger', ... }
 *   @slug gets value 'burger'
 *   @title gets value 'Burger'
 *   etc.
 *
 * NOTE: We pass 'null' for id because it's auto-generated by SQLite.
 */
async function initData() {
  const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `);

  /**
   * Loop through all dummy meals and insert each one into the database.
   * The stmt.run(meal) automatically maps the meal object properties
   * to the @parameterName placeholders in the SQL statement.
   */
  for (const meal of dummyMeals) {
    stmt.run(meal);
  }
}

/**
 * Execute the initialization function to populate the database.
 *
 * INSTRUCTOR QUOTE:
 * "And with that done, once you run this initdb.js file, you should have
 * some meals available."
 */
initData();

/**
 * ============================================================================
 * LESSON 451 - DATABASE INITIALIZATION SUMMARY
 * ============================================================================
 *
 * WHAT THIS SCRIPT DOES:
 *
 * 1. IMPORTS better-sqlite3
 *    - A synchronous SQLite library for Node.js
 *
 * 2. CREATES/OPENS DATABASE
 *    - Creates meals.db file if it doesn't exist
 *    - Opens it if it already exists
 *
 * 3. CREATES MEALS TABLE
 *    - Defines the schema for storing meal data
 *    - Uses "IF NOT EXISTS" to avoid errors on re-run
 *
 * 4. INSERTS DUMMY DATA
 *    - Populates the table with 7 sample meals
 *    - Each meal has title, slug, image, summary, instructions, creator info
 *
 * AFTER RUNNING:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  You'll have a meals.db file containing:                                │
 * │                                                                          │
 * │  1. Juicy Cheese Burger                                                 │
 * │  2. Spicy Curry                                                         │
 * │  3. Homemade Dumplings                                                  │
 * │  4. Classic Mac n Cheese                                                │
 * │  5. Authentic Pizza                                                     │
 * │  6. Wiener Schnitzel                                                    │
 * │  7. Fresh Tomato Salad                                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Now with that done, we can go back to our meals page and start loading
 * meals from that database. And the question now, of course, is how we do that?"
 *
 * NEXT STEPS (Future Lessons):
 * - Create a lib/meals.js file to fetch meals from the database
 * - Load meals in the MealsPage component
 * - Display them using the MealsGrid component
 *
 * ============================================================================
 */
