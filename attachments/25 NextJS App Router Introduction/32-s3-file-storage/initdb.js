/**
 * ============================================================================
 * DATABASE INITIALIZATION - BONUS LESSON 473: Updated for S3 Image Storage
 * ============================================================================
 *
 * This file initializes the SQLite database with dummy meal data.
 *
 * KEY CHANGE FOR S3 INTEGRATION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE (Local Storage):        AFTER (S3 Storage):                    │
 * │  image: '/images/burger.jpg'    image: 'burger.jpg'                    │
 * │  image: '/images/curry.jpg'     image: 'curry.jpg'                     │
 * │  image: '/images/pizza.jpg'     image: 'pizza.jpg'                     │
 * │                                                                          │
 * │  The '/images/' prefix is REMOVED because:                              │
 * │  • Images are now stored in S3, not in public/images/                  │
 * │  • The S3 URL is constructed when displaying the image                 │
 * │  • We only store the filename (which becomes the S3 "Key")             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * HOW THE IMAGE VALUE IS USED:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Database stores: 'burger.jpg'                                          │
 * │                                                                          │
 * │  Component constructs full S3 URL:                                      │
 * │  `https://bucket-name.s3.amazonaws.com/${image}`                        │
 * │                                                                          │
 * │  Result: 'https://bucket-name.s3.amazonaws.com/burger.jpg'              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * IMPORTANT: Before running this script, you must:
 * 1. Upload these image files to your S3 bucket:
 *    - burger.jpg
 *    - curry.jpg
 *    - dumplings.jpg
 *    - macncheese.jpg
 *    - pizza.jpg
 *    - schnitzel.jpg
 *    - tomato-salad.jpg
 *
 * 2. Configure your S3 bucket for public read access (see lib/meals.js)
 *
 * USAGE:
 * node initdb.js
 *
 * ============================================================================
 */

const sql = require('better-sqlite3');
const db = sql('meals.db');

/**
 * ============================================================================
 * DUMMY MEALS DATA
 * ============================================================================
 *
 * NOTE: The `image` field contains JUST THE FILENAME, not a path.
 * This is because:
 * 1. Images are stored in AWS S3, not locally
 * 2. The filename serves as the S3 "Key" (object identifier)
 * 3. The full URL is constructed in the display components
 *
 * BEFORE S3 MIGRATION:
 *   image: '/images/burger.jpg'  (path to public/images/)
 *
 * AFTER S3 MIGRATION:
 *   image: 'burger.jpg'  (just the filename = S3 Key)
 */
const dummyMeals = [
  {
    title: 'Juicy Cheese Burger',
    slug: 'juicy-cheese-burger',
    /**
     * S3 Key: 'burger.jpg'
     * Full S3 URL (constructed in component):
     * https://{bucket}.s3.amazonaws.com/burger.jpg
     */
    image: 'burger.jpg',
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
    image: 'curry.jpg',
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
    image: 'dumplings.jpg',
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
    image: 'macncheese.jpg',
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
    image: 'pizza.jpg',
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
    image: 'schnitzel.jpg',
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
    image: 'tomato-salad.jpg',
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
 * The table schema is the same as the local storage version.
 * The `image` column stores JUST THE FILENAME (S3 Key).
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
 * INSERT DUMMY DATA
 * ============================================================================
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

  for (const meal of dummyMeals) {
    stmt.run(meal);
  }
}

initData();

/**
 * ============================================================================
 * LESSON 473 - DATABASE CHANGES SUMMARY
 * ============================================================================
 *
 * WHAT CHANGED FOR S3:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • image values changed from '/images/filename.jpg' to 'filename.jpg'  │
 * │  • No schema changes needed                                             │
 * │  • The image field now stores the S3 "Key" (object identifier)         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * TO RESET THE DATABASE:
 * 1. Delete meals.db file
 * 2. Run: node initdb.js
 *
 * PREREQUISITE:
 * Make sure these images are uploaded to your S3 bucket:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  burger.jpg       │  Must exist in S3 bucket                           │
 * │  curry.jpg        │  Must exist in S3 bucket                           │
 * │  dumplings.jpg    │  Must exist in S3 bucket                           │
 * │  macncheese.jpg   │  Must exist in S3 bucket                           │
 * │  pizza.jpg        │  Must exist in S3 bucket                           │
 * │  schnitzel.jpg    │  Must exist in S3 bucket                           │
 * │  tomato-salad.jpg │  Must exist in S3 bucket                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * You can find these images in the original project's public/images/ folder
 * or in the assets/ folder of this project.
 *
 * ============================================================================
 */
