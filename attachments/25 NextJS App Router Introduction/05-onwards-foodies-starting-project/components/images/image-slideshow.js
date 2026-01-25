/**
 * ============================================================================
 * IMAGE SLIDESHOW COMPONENT - LESSON 447: Creating the Image Slideshow
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So I wanna add a little image slideshow here, which basically automatically
 * goes through some food images that should show up here."
 *
 * ============================================================================
 * FILE ORGANIZATION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for that, we'll build a new component. We could also build it in here,
 * but to keep that file relatively lean, I will add a new component, and I'll
 * do that here in my root components folder. There, I'll add a subfolder
 * called images, and in there, I'll add a image-slideshow.js file."
 *
 * FOLDER STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  components/                                                            │
 * │  ├── main-header/          ← Header-related components                  │
 * │  │   ├── main-header.js                                                │
 * │  │   └── ...                                                           │
 * │  └── images/               ← Image-related components (NEW)            │
 * │      ├── image-slideshow.js        ← THIS FILE                         │
 * │      └── image-slideshow.module.css                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * IMPORTANT: REACT HOOKS AND SERVER COMPONENTS
 * ============================================================================
 *
 * This component uses useState and useEffect, which are React hooks.
 * In Next.js App Router, components are SERVER COMPONENTS by default.
 *
 * INSTRUCTOR QUOTE:
 * "But if you try to do that, you'll notice that you get an error if you
 * wanna preview the site. There in that error, you're learning that we're
 * importing a component that needs use state and that that only works in a
 * client component, but that none of its parents are marked with use client,
 * so they're in a server component."
 *
 * This error will be addressed in the NEXT LESSON (448) by adding 'use client'.
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * REACT HOOKS IMPORTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "...because here, I'm using use state, so the standard use state hook
 * provided by React, to control some state which changes over time. To be
 * precise, it changes with help of use effect every five seconds with help
 * of set interval."
 *
 * These are standard React hooks - nothing Next.js specific:
 * - useEffect: For side effects (setting up the interval)
 * - useState: For tracking which image is currently visible
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
 * LESSON 447 SUMMARY: IMAGE SLIDESHOW COMPONENT
 * ============================================================================
 *
 * WHAT WE BUILT:
 *
 * 1. A self-cycling image slideshow that changes every 5 seconds
 * 2. Uses standard React hooks (useState, useEffect) - nothing Next.js specific
 * 3. Imports and displays 7 food images from the assets folder
 * 4. Uses CSS for smooth transitions between images
 *
 * IMPORTANT - UPCOMING ERROR:
 *
 * INSTRUCTOR QUOTE:
 * "But if you try to do that, you'll notice that you get an error if you
 * wanna preview the site. There in that error, you're learning that we're
 * importing a component that needs use state and that that only works in a
 * client component, but that none of its parents are marked with use client,
 * so they're in a server component. And what does that now mean?"
 *
 * This sets up the NEXT LESSON about Server Components vs Client Components.
 *
 * THE PROBLEM:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Next.js App Router = Server Components by default                      │
 * │  useState/useEffect = Client-side React features                        │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  These are INCOMPATIBLE without 'use client' directive!                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
