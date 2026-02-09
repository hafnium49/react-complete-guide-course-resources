/**
 * ============================================================================
 * src/pages/Welcome.jsx - LESSONS 519, 520 & 539
 * ============================================================================
 *
 * The landing page at the root URL ("/"). It contains a full-viewport hero
 * header with a city background image, a superhero image, and a call-to-action
 * link that navigates to the "/challenges" route.
 *
 * Below the hero header, there are several content sections describing the
 * app's purpose, features, and testimonials.
 *
 * ============================================================================
 * 🎓 LESSON 539: SCROLL-BASED PARALLAX WITH useScroll & useTransform
 * ============================================================================
 *
 * GOAL: Create a parallax effect where the city background, superhero image,
 * and heading text all move at different speeds as the user scrolls down,
 * producing a layered, immersive visual effect.
 *
 * TWO HOOKS POWER THIS FEATURE:
 *
 * ── useScroll ──
 *
 * Returns an object with reactive scroll position values:
 *   - scrollY:     absolute vertical scroll position in pixels
 *   - scrollX:     absolute horizontal scroll position in pixels
 *   - scrollYProgress:  relative value between 0 (top) and 1 (bottom)
 *   - scrollXProgress:  same but for horizontal scrolling
 *
 * We use scrollY here since we want pixel-based breakpoints for the
 * parallax ranges.
 *
 * ── useTransform ──
 *
 * Transforms one value into another using input/output range mapping:
 *
 *   useTransform(inputValue, inputRange, outputRange)
 *
 *   - inputValue:  the value to transform (e.g., scrollY)
 *   - inputRange:  array of breakpoints for the input (pixel values)
 *   - outputRange: array of corresponding output values
 *
 * Framer Motion interpolates between the output values as the input
 * moves through the breakpoints. For example:
 *
 *   useTransform(scrollY, [0, 200], [1, 0.5])
 *
 * When scrollY is 0, the output is 1. When scrollY is 200, it's 0.5.
 * At scrollY 100, it's interpolated to 0.75. Values beyond the range
 * are clamped to the nearest endpoint.
 *
 * The input and output arrays can have more than 2 entries to create
 * multi-segment transformations. For example:
 *
 *   useTransform(scrollY, [0, 200, 300, 500], [1, 0.5, 0.5, 0])
 *
 * This holds the output at 0.5 between 200-300px of scroll (a
 * "plateau"), then fades to 0 between 300-500px.
 *
 * PERFORMANCE -- MOTION VALUES (NO RE-RENDERS):
 *
 * Both useScroll and useTransform return "motion values" — special
 * objects managed by Framer Motion that update WITHOUT triggering
 * React re-renders. The component function does NOT re-execute on
 * every scroll event. This is critical for smooth 60fps animation.
 *
 * Because motion values bypass React's render cycle, they CANNOT be
 * used with the `animate` prop (which requires React re-renders to
 * detect changes). Instead, they are applied via the `style` prop on
 * motion components. Framer Motion's enhanced `style` prop watches
 * motion values and applies changes directly to the DOM, keeping
 * animations performant.
 *
 * PARALLAX STRUCTURE:
 *
 * Three elements are animated with different scroll ranges, creating
 * the illusion of depth:
 *
 *   - City image (background): moves up slowly, fades gradually
 *   - Hero image (midground):  moves up faster, fades later
 *   - Header text (foreground): scales up, moves down (pushed away)
 *
 * Because each layer maps the same scroll position to different y
 * offsets, they appear to move at different speeds — the core
 * principle of parallax scrolling.
 *
 * ============================================================================
 */

import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

import cityImg from '../assets/city.jpg';
import heroImg from '../assets/hero.png';

export default function WelcomePage() {
  // LESSON 539: useScroll returns reactive scroll position values.
  // scrollY is the absolute vertical scroll in pixels, as a motion value
  // (updates without causing re-renders).
  const { scrollY } = useScroll();

  // LESSON 539: useTransform maps scrollY pixel values to animation values.
  // Each call creates a derived motion value that automatically updates
  // as the user scrolls — no state, no re-renders.

  // City image: fades from fully visible → 50% opacity (0-200px scroll),
  // holds at 50% (200-300px), then fades to invisible (300-500px).
  const opacityCity = useTransform(scrollY, [0, 200, 300, 500], [1, 0.5, 0.5, 0]);

  // City image: slides upward by 100px as user scrolls the first 200px.
  const yCity = useTransform(scrollY, [0, 200], [0, -100]);

  // Hero image: stays fully visible until 300px scroll, then fades to
  // invisible by 500px.
  const opacityHero = useTransform(scrollY, [0, 300, 500], [1, 1, 0]);

  // Hero image: slides upward by 150px over the first 200px of scroll
  // (faster than the city → different "layer speed" for parallax).
  const yHero = useTransform(scrollY, [0, 200], [0, -150]);

  // Header text: scales from 100% to 150% over the first 300px of scroll.
  const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);

  // Header text: stays in place (0-200px), pushes down to 50px (200-300px),
  // holds at 50px (300px), then pushes down further to 300px (300-500px).
  const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);

  return (
    <>
      <header id="welcome-header">
        {/* LESSON 539: <div> → <motion.div> so the enhanced style prop
            can accept motion values from useTransform. The scale and y
            values change as the user scrolls, making the text grow
            and shift downward — the "foreground" layer of the parallax. */}
        <motion.div id="welcome-header-content" style={{ scale: scaleText, y: yText }}>
          <h1>Ready for a challenge?</h1>
          <Link id="cta-link" to="/challenges">
            Get Started
          </Link>
        </motion.div>
        {/* LESSON 539: <img> → <motion.img> to enable scroll-driven
            parallax. The city image is the "background" layer: it moves
            up slowly (yCity) and gradually fades out (opacityCity) as the
            user scrolls, creating depth behind the hero and text. */}
        <motion.img
          style={{ opacity: opacityCity, y: yCity }}
          src={cityImg}
          alt="A city skyline touched by sunlight"
          id="city-image"
        />
        {/* LESSON 539: Hero image is the "midground" layer — it moves up
            faster than the city (yHero: -150 vs -100) but fades out later
            (stays at full opacity until 300px scroll). The different speeds
            between layers produce the parallax illusion. */}
        <motion.img
          style={{ opacity: opacityHero, y: yHero }}
          src={heroImg}
          alt="A superhero wearing a cape"
          id="hero-image"
        />
      </header>
      <main id="welcome-content">
        <section>
          <h2>There&apos;s never been a better time.</h2>
          <p>
            With our platform, you can set, track, and conquer challenges at
            your own pace. Whether it&apos;s personal growth, professional
            achievements, or just for fun, we&apos;ve got you covered.
          </p>
        </section>

        <section>
          <h2>Why Challenge Yourself?</h2>
          <p>
            Challenges provide a framework for growth. They push boundaries,
            test limits, and result in genuine progress. Here, we believe
            everyone has untapped potential, waiting to be unlocked.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Custom challenge creation: Set the rules, define your pace.</li>
            <li>
              Track your progress: See your growth over time with our analytics
              tools.
            </li>
            <li>
              Community Support: Join our community and get motivated by peers.
            </li>
          </ul>
        </section>

        <section>
          <h2>Join Thousands Embracing The Challenge</h2>
          <p>
            "I never realized what I was capable of until I set my first
            challenge here. It&apos;s been a transformative experience!" - Alex
            P.
          </p>
        </section>
      </main>
    </>
  );
}
