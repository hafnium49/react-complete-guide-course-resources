/**
 * ============================================================================
 * HOME PAGE - LESSON 477: App Router Project Structure
 * ============================================================================
 *
 * This file demonstrates the APP ROUTER approach to Next.js routing.
 *
 * ============================================================================
 * THIS IS AN APP ROUTER PROJECT
 * ============================================================================
 *
 * From the instructor:
 * "In this section thus far, we used the so-called App Router, which is the
 * more modern and recommended way of building NextJS apps."
 *
 * HOW TO IDENTIFY THE ROUTER TYPE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │   APP ROUTER (This Project):                                            │
 * │   • Routes are in the /app folder                                       │
 * │   • Uses page.js for route components                                   │
 * │   • Server Components by default                                        │
 * │                                                                          │
 * │   PAGES ROUTER (Legacy):                                                │
 * │   • Routes are in the /pages folder                                     │
 * │   • Uses index.js or [param].js for routes                             │
 * │   • Client Components by default                                        │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * APP ROUTER: THIS FILE LOCATION
 * ============================================================================
 *
 *   Location: app/page.js
 *   Route:    / (home page)
 *
 *   In PAGES ROUTER, this would be:
 *   Location: pages/index.js
 *   Route:    / (home page)
 *
 * ============================================================================
 * SERVER COMPONENT (Default in App Router)
 * ============================================================================
 *
 * This component is a SERVER COMPONENT by default. Notice:
 * • No 'use client' directive at the top
 * • It could fetch data directly (no useEffect needed)
 * • It renders on the server, not in the browser
 *
 * The ImageSlideshow component IS a client component (has 'use client')
 * because it needs client-side interactivity for the slideshow animation.
 *
 * ============================================================================
 */

import Link from 'next/link';

import ImageSlideshow from '@/components/images/image-slideshow';
import classes from './page.module.css';

/**
 * Home Page Component
 *
 * This is the root page of the application, rendered at the "/" route.
 * It's a SERVER COMPONENT (App Router default) that renders:
 * - An image slideshow (client component for interactivity)
 * - Hero section with CTAs
 * - Information sections
 */
export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
