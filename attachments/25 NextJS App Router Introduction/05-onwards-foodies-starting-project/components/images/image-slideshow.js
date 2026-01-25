/**
 * ============================================================================
 * LESSON 448 - THE 'use client' DIRECTIVE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So therefore here, in order to make this slideshow component work, we have
 * to add this use client directive at the top of this file. And with that
 * added, we can go back to that main page and bring back that import and
 * bring back that component here."
 *
 * THE SOLUTION:
 * Adding 'use client' at the very top of the file tells Next.js this is a
 * Client Component that can use client-side features like useState, useEffect,
 * and event handlers (onClick, onChange, etc.).
 *
 * ============================================================================
 */
'use client';

/**
 * ============================================================================
 * IMAGE SLIDESHOW COMPONENT - LESSONS 447 & 448
 * ============================================================================
 *
 * LESSON 447: Creating the Image Slideshow
 * LESSON 448: Understanding Server vs Client Components
 *
 * ============================================================================
 * LESSON 448 - SERVER COMPONENTS VS CLIENT COMPONENTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "NextJS knows Server components, React Server components and Client
 * Components. And actually that's technically not just NextJS, instead, React
 * itself has this differentiation though in most React apps, in all those
 * vanilla React apps which you are building with help of create React app or
 * with help of Vite, you are using client components out of the box."
 *
 * WHY THE DIFFERENCE EXISTS:
 *
 * INSTRUCTOR QUOTE:
 * "With NextJS, that changes because NextJS is a full stack framework. It has
 * a backend, not just a front end, and therefore code also executes on that
 * backend when working with NextJS."
 *
 * ============================================================================
 * SERVER COMPONENTS (DEFAULT IN NEXT.JS APP ROUTER)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for example, by default, all those React components you have in your
 * NextJS project, no matter if they're pages, layouts or standard components
 * are only rendered on the Server. That's why they're called React Server
 * components."
 *
 * INSTRUCTOR QUOTE:
 * "So that means that this component and this layout component, but also the
 * slideshow component at the header component, all those components do not
 * execute in the browser. Those component functions don't execute there, but
 * instead on the Server."
 *
 * WHERE SERVER COMPONENTS RUN:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SERVER COMPONENTS:                                                     │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  • Execute on the SERVER (backend)                                     │
 * │  • console.log appears in TERMINAL (not browser console)               │
 * │  • Cannot use useState, useEffect, or event handlers                   │
 * │  • Provide better SEO (content is in page source)                      │
 * │  • Less JavaScript sent to browser (better performance)                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * CLIENT COMPONENTS (REQUIRES 'use client' DIRECTIVE)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Nonetheless, in NextJS projects, you can still also build client
 * components, and that would be components that are still technically
 * pre-rendered on the server, but then also potentially rendered on the
 * client. And most importantly, these are components that must be rendered
 * on the client because they contain some code or use some features that are
 * only available on the client."
 *
 * CLIENT-ONLY FEATURES:
 *
 * INSTRUCTOR QUOTE:
 * "Like for example here in this image slideshow JS file, they use state
 * hook, or the use fact hook. These hooks are not available on the Server
 * side, which kind of makes sense if you think about it because we're not
 * interested in setting this interval on the Server side, we wanna run this
 * in the browser so that the image swaps every five seconds after the page
 * has been loaded."
 *
 * INSTRUCTOR QUOTE:
 * "Another example for a feature that would only be available in client
 * components would be event handlers. So if you would use the on click prop
 * to trigger some function, obviously since you are waiting for some user
 * interaction here, that would require to be a client component because that
 * would require code that runs on the client."
 *
 * CLIENT COMPONENTS SUMMARY:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  CLIENT COMPONENTS (marked with 'use client'):                         │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  • Pre-rendered on server, then hydrated on client                     │
 * │  • console.log appears in BROWSER console                              │
 * │  • CAN use useState, useEffect, useReducer, etc.                       │
 * │  • CAN use event handlers (onClick, onChange, onSubmit, etc.)          │
 * │  • Required for any interactivity that runs in the browser             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHY SERVER COMPONENTS ARE BENEFICIAL
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And therefore NextJS embraces this concept of having those Server
 * components. Now that's an important concept and an important advantage of
 * NextJS projects, because with Server components you have potentially less
 * client side JavaScript code that must be downloaded, hence possibly
 * improving the performance of your website."
 *
 * INSTRUCTOR QUOTE:
 * "And it's also great for search engine optimization, because web search
 * crawlers now see pages that contain the complete finished content. Compare
 * that with a Vanilla JavaScript project where you are not using a framework
 * like NextJS. There, if you take a look at the source code of a page, you'll
 * see that it's essentially an empty page because all the content is created
 * and populated on the client side by client side code with help of those
 * client side components."
 *
 * INSTRUCTOR QUOTE:
 * "In NextJS, project stats different. If you take a look at the source code
 * there, you will see that all the content is in there. All that text that's
 * visible on the screen is part of the actual page source code, and that is
 * also what web search engine crawlers will see."
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * REACT HOOKS IMPORTS (REQUIRE CLIENT COMPONENT)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Like for example here in this image slideshow JS file, they use state
 * hook, or the use fact hook. These hooks are not available on the Server
 * side, which kind of makes sense if you think about it because we're not
 * interested in setting this interval on the Server side, we wanna run this
 * in the browser so that the image swaps every five seconds after the page
 * has been loaded."
 *
 * These hooks REQUIRE the 'use client' directive because:
 * - useState: Manages state that changes in the browser (user interaction)
 * - useEffect: Runs side effects AFTER the component renders in the browser
 *
 * Without 'use client', Next.js would try to run these on the server,
 * which would fail because the server doesn't have a concept of
 * "component lifecycle" or "state that persists between renders."
 */
import { useEffect, useState } from 'react';

/**
 * Next.js Image component for optimized image rendering.
 * (Covered in Lesson 444)
 */
import Image from 'next/image';

/**
 * ============================================================================
 * IMAGE IMPORTS FROM ASSETS FOLDER
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, those images are simply being imported from the assets folder, so
 * we're talking about the images stored in that assets folder. Not all of
 * them, but some of them, all those food images specifically."
 *
 * Using the @ alias for clean imports (configured in jsconfig.json).
 * Each image is imported as a static import, which Next.js optimizes.
 */
import burgerImg from '@/assets/burger.jpg';
import curryImg from '@/assets/curry.jpg';
import dumplingsImg from '@/assets/dumplings.jpg';
import macncheeseImg from '@/assets/macncheese.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import schnitzelImg from '@/assets/schnitzel.jpg';
import tomatoSaladImg from '@/assets/tomato-salad.jpg';

/**
 * CSS Module import for scoped styling.
 */
import classes from './image-slideshow.module.css';

/**
 * ============================================================================
 * IMAGES ARRAY - DATA STRUCTURE FOR SLIDESHOW
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And then I'm setting up this images array here, which contains all these
 * images and then some alt text for the images, and then I'm outputting them
 * here."
 *
 * Each object contains:
 * - image: The imported image module (used as src for Image component)
 * - alt: Descriptive text for accessibility
 *
 * This array is defined outside the component because it doesn't change -
 * no need to recreate it on every render.
 */
const images = [
  { image: burgerImg, alt: 'A delicious, juicy burger' },
  { image: curryImg, alt: 'A delicious, spicy curry' },
  { image: dumplingsImg, alt: 'Steamed dumplings' },
  { image: macncheeseImg, alt: 'Mac and cheese' },
  { image: pizzaImg, alt: 'A delicious pizza' },
  { image: schnitzelImg, alt: 'A delicious schnitzel' },
  { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

/**
 * IMAGE SLIDESHOW COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "Well, it's outputting some relatively simple markup where I have a div,
 * and in that div, I go through a bunch of images and output the NextJS
 * image component for every image."
 *
 * @returns {JSX.Element} A slideshow that cycles through food images
 */
export default function ImageSlideshow() {
  /**
   * ==========================================================================
   * STATE: CURRENT IMAGE INDEX
   * ==========================================================================
   *
   * INSTRUCTOR QUOTE:
   * "...I'm using use state, so the standard use state hook provided by React,
   * to control some state which changes over time."
   *
   * Tracks which image (0-6) is currently visible in the slideshow.
   * Starts at 0 (first image - burger).
   */
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * ==========================================================================
   * EFFECT: AUTO-ADVANCE SLIDESHOW
   * ==========================================================================
   *
   * INSTRUCTOR QUOTE:
   * "To be precise, it changes with help of use effect every five seconds
   * with help of set interval. And that interval is cleared whenever the
   * component unmounts by using this cleanup function of use effect."
   *
   * INSTRUCTOR QUOTE:
   * "And that's standard use effect and standard use state as you know it
   * from vanilla JavaScript. Nothing NextJS specific here."
   *
   * HOW IT WORKS:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  1. Component mounts → setInterval starts (runs every 5 seconds)       │
   * │  2. Every 5 seconds → currentImageIndex increments (or resets to 0)    │
   * │  3. Component unmounts → clearInterval stops the timer (cleanup)       │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  useEffect(() => {
    /**
     * INSTRUCTOR QUOTE:
     * "The logic inside of this interval code here inside of use effect is
     * simply that we change the index of the visible image every five seconds,
     * and we therefore cycle through all those images. That's all we're
     * doing here."
     *
     * The interval callback uses the functional form of setState to:
     * - Get the previous index
     * - If not at the end (< 6), go to next image (prevIndex + 1)
     * - If at the end (= 6), wrap around to first image (0)
     */
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000); // 5000ms = 5 seconds

    /**
     * CLEANUP FUNCTION
     *
     * INSTRUCTOR QUOTE:
     * "And that interval is cleared whenever the component unmounts by using
     * this cleanup function of use effect."
     *
     * This prevents memory leaks - if the component is removed from the DOM,
     * we don't want the interval to keep running.
     */
    return () => clearInterval(interval);
  }, []); // Empty dependency array = runs once on mount

  /**
   * ==========================================================================
   * JSX OUTPUT - SLIDESHOW CONTAINER WITH IMAGES
   * ==========================================================================
   *
   * All images are rendered but only one is visible at a time (via CSS).
   * The "active" class is applied to the current image based on index.
   *
   * RENDERING STRATEGY:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  All 7 images are in the DOM (stacked via position: absolute)          │
   * │  Only the image with .active class is visible (opacity: 1)             │
   * │  Smooth transitions handled by CSS (transition: all 0.5s)              │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        /**
         * Each image uses the Next.js Image component for optimization.
         *
         * Props:
         * - key: React's unique identifier for list items
         * - src: The imported image (Next.js handles optimization)
         * - className: Applies .active class to current image only
         * - alt: Accessibility text for screen readers
         */
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}

/**
 * ============================================================================
 * LESSONS 447 & 448 SUMMARY
 * ============================================================================
 *
 * LESSON 447 - BUILDING THE SLIDESHOW:
 * - Created ImageSlideshow component with useState and useEffect
 * - Cycles through 7 food images every 5 seconds
 * - Uses CSS transitions for smooth animations
 *
 * LESSON 448 - SERVER VS CLIENT COMPONENTS:
 *
 * INSTRUCTOR QUOTE:
 * "So therefore here, in order to make this slideshow component work, we have
 * to add this use client directive at the top of this file."
 *
 * THE FIX: Added 'use client' at the very top of this file.
 *
 * RESULT:
 *
 * INSTRUCTOR QUOTE:
 * "And now you will see that if you reload, this works, we no longer get an
 * error and we now have that image here which changes every five seconds.
 * And that's now the behavior I want here, now unlocked with help of client
 * components."
 *
 * WHEN TO USE 'use client':
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  USE 'use client' WHEN YOUR COMPONENT NEEDS:                           │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  ✓ useState, useEffect, useReducer, useContext, or other React hooks   │
 * │  ✓ Event handlers (onClick, onChange, onSubmit, etc.)                  │
 * │  ✓ Browser-only APIs (window, document, localStorage, etc.)            │
 * │  ✓ Any interactivity that must run in the browser                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * KEEP AS SERVER COMPONENT (NO 'use client') WHEN:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Component only displays data (no interactivity)                     │
 * │  ✓ Component fetches data from database or API                         │
 * │  ✓ Component doesn't need browser-specific features                    │
 * │  ✓ You want better SEO and performance                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And it's super important to know about this difference and to understand
 * that these two component types exist in general in React, but really only
 * work and can be used when using a framework like NextJS."
 *
 * ============================================================================
 */
