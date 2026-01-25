/**
 * ============================================================================
 * HOME PAGE - LESSON 438: The Foodies Project Introduction
 * ============================================================================
 *
 * LESSON 438 - THE STARTING PAGE
 *
 * This is the starting home page for the Foodies/Meals app.
 * It's intentionally minimal as a placeholder that we'll build upon
 * throughout the rest of this section.
 *
 * INSTRUCTOR QUOTE:
 * "...and then also an updated layout and page JS file."
 *
 * ============================================================================
 * FILE LOCATION: app/page.js
 * ============================================================================
 *
 * This file is located at:
 *   05-onwards-foodies-starting-project/app/page.js
 *
 * According to Next.js file-based routing:
 *   app/page.js → URL: / (home page)
 *
 * ============================================================================
 * WHAT WE'LL BUILD
 * ============================================================================
 *
 * Throughout this section, we'll transform this simple placeholder into
 * a full-featured food-sharing application with:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  UPCOMING FEATURES:                                                      │
 * │  ─────────────────────────────────────────────────────────────────────── │
 * │  • Navigation header with logo and links                                 │
 * │  • Hero section with call-to-action                                      │
 * │  • Meals browsing page (/meals)                                          │
 * │  • Individual meal details (/meals/[slug])                               │
 * │  • Share a meal form (/meals/share)                                      │
 * │  • Community page (/community)                                           │
 * │  • Data fetching from database                                           │
 * │  • Image uploads                                                         │
 * │  • Server Actions for form handling                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * HOME PAGE COMPONENT
 *
 * This is a minimal placeholder page that displays a "Time to get started!"
 * message. The inline styles ensure the text is visible against the dark
 * background (set in globals.css).
 *
 * NOTE: This is a SERVER COMPONENT by default (no 'use client' directive).
 * The page is rendered on the server and sent to the client as HTML.
 *
 * @returns {JSX.Element} The home page content
 */
export default function Home() {
  return (
    <main>
      {/**
       * PLACEHOLDER HEADING
       *
       * Inline styles are used here for simplicity in the starting project.
       * In production, you'd typically use CSS modules or a styling solution.
       *
       * The white color ensures visibility against the dark gradient background
       * defined in globals.css (background: radial-gradient(#282c34, #282c34))
       */}
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 438 - WHAT'S INCLUDED IN THE PROJECT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, of course, the project we got here is pretty similar to what we have
 * before, but I removed all those pages we created, we got an extra assets
 * folder with some images that we need for this application we're building,
 * so that's important. In addition, the public folder also contains some
 * images that will be used..."
 *
 * ASSETS FOLDER (assets/):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  assets/                                                                │
 * │  ├── logo.png          ← App logo                                       │
 * │  ├── burger.jpg        ← Food images for the app                        │
 * │  ├── curry.jpg                                                          │
 * │  ├── dumplings.jpg                                                      │
 * │  ├── macncheese.jpg                                                     │
 * │  ├── pizza.jpg                                                          │
 * │  ├── schnitzel.jpg                                                      │
 * │  ├── tomato-salad.jpg                                                   │
 * │  └── icons/            ← Icon images                                    │
 * │      ├── community.png                                                  │
 * │      ├── events.png                                                     │
 * │      └── meal.png                                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * PUBLIC FOLDER (public/images/):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  public/images/         ← Served at /images/*                           │
 * │  ├── logo.png                                                           │
 * │  ├── burger.jpg                                                         │
 * │  ├── curry.jpg                                                          │
 * │  ├── dumplings.jpg                                                      │
 * │  ├── macncheese.jpg                                                     │
 * │  ├── pizza.jpg                                                          │
 * │  ├── schnitzel.jpg                                                      │
 * │  └── tomato-salad.jpg                                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * DIFFERENCE BETWEEN assets/ AND public/:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  assets/ folder:                                                        │
 * │    - Imported directly into components                                  │
 * │    - Processed by Next.js build system                                  │
 * │    - Can be optimized (resized, compressed)                             │
 * │    - Usage: import logo from '@/assets/logo.png'                        │
 * │                                                                          │
 * │  public/ folder:                                                        │
 * │    - Served statically as-is                                            │
 * │    - Accessible via URL path                                            │
 * │    - Not processed by build system                                      │
 * │    - Usage: <img src="/images/logo.png" />                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
