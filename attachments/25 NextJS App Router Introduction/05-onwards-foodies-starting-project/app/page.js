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
 *
 * LESSON 439 - EXERCISE: ADDING NAVIGATION LINKS
 *
 * INSTRUCTOR QUOTE:
 * "And of course as an optional exercise, you can also try adding some links
 * that lead from one page to another."
 *
 * We've added navigation links to all the routes created in the exercise:
 * - /meals - Browse all meals
 * - /meals/share - Share your own meal
 * - /community - Join the community
 *
 * ============================================================================
 */

import Link from 'next/link';

/**
 * HOME PAGE COMPONENT
 *
 * UPDATED FOR LESSON 439 EXERCISE:
 * - Added Link import from 'next/link'
 * - Added navigation links to all new routes
 *
 * NOTE: This is a SERVER COMPONENT by default (no 'use client' directive).
 * The page is rendered on the server and sent to the client as HTML.
 *
 * @returns {JSX.Element} The home page content
 */
export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>

      {/**
       * NAVIGATION LINKS - LESSON 439 EXERCISE
       *
       * INSTRUCTOR QUOTE:
       * "And of course as an optional exercise, you can also try adding some
       * links that lead from one page to another."
       *
       * These links use the Next.js Link component for SPA-style navigation.
       * Clicking a link navigates without a full page reload.
       */}
      <nav style={{ textAlign: 'center', marginTop: '2rem' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/meals" style={{ color: '#f9572a', fontSize: '1.2rem' }}>
              Browse Meals
            </Link>
          </li>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/meals/share" style={{ color: '#f9572a', fontSize: '1.2rem' }}>
              Share a Meal
            </Link>
          </li>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/community" style={{ color: '#f9572a', fontSize: '1.2rem' }}>
              Join the Community
            </Link>
          </li>
        </ul>
      </nav>

      {/**
       * EXAMPLE DYNAMIC ROUTE LINKS
       *
       * These demonstrate the dynamic [slug] route.
       * Each link goes to a different meal detail page.
       */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: '#ddd8d8' }}>Example meal links (dynamic routes):</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/meals/burger" style={{ color: '#ffc905' }}>Burger</Link>
          <Link href="/meals/pizza" style={{ color: '#ffc905' }}>Pizza</Link>
          <Link href="/meals/curry" style={{ color: '#ffc905' }}>Curry</Link>
        </div>
      </div>
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
