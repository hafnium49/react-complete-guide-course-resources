/**
 * ============================================================================
 * zz-playground/src/App.jsx - LESSONS 523-524
 * ============================================================================
 *
 * LESSON 523: Limitations of CSS animations and introduction to Framer Motion
 *
 * ============================================================================
 * 🎓 LESSON 523: WHY FRAMER MOTION?
 * ============================================================================
 *
 * CSS transitions (Lesson 521) and CSS animations (Lesson 522) are powerful,
 * but they have real limitations:
 *
 * 1. NO EXIT ANIMATIONS
 *    CSS can animate an element appearing in the DOM (via @keyframes), but
 *    it CANNOT animate an element being REMOVED from the DOM. When React
 *    conditionally renders a component (e.g., {show && <Modal />}), the
 *    element is removed instantly -- there is no opportunity for a CSS
 *    animation to play before removal. This is the single biggest
 *    limitation of CSS-only animations in React.
 *
 * 2. COMPLEX ANIMATIONS ARE DIFFICULT
 *    Some animations, like an active tab indicator sliding between tabs,
 *    are technically possible with pure CSS but require convoluted code
 *    that is hard to write, maintain, and understand.
 *
 * 3. PHYSICS-BASED FEEL
 *    CSS easing functions (ease-out, ease-in, cubic-bezier) can approximate
 *    realistic motion, but true spring-based physics animations -- where
 *    elements have mass, stiffness, and damping -- look more natural and
 *    are extremely difficult to achieve with CSS alone. Compare a simple
 *    ease-out rotation with a spring-based one: the spring version has a
 *    subtle overshoot and settle that feels physically correct.
 *
 * WHAT IS FRAMER MOTION?
 *
 * Framer Motion is a third-party animation library specifically designed
 * for React. It provides:
 *   - Declarative animation API (animate props, not imperative calls)
 *   - Enter AND exit animations (via AnimatePresence)
 *   - Spring physics out of the box
 *   - Layout animations (elements animate to new positions automatically)
 *   - Scroll-triggered animations
 *   - Gesture animations (drag, hover, tap)
 *
 * INSTALLATION:
 *
 * In the challenges project (01-starting-project), framer-motion was
 * installed by running:
 *
 *   npm install framer-motion
 *
 * In this playground project, it was already pre-installed as a dependency
 * (see package.json: "framer-motion": "^12.0.5").
 *
 * WHY THIS PLAYGROUND EXISTS:
 *
 * Rather than experimenting with Framer Motion directly in the challenges
 * app (which has many components and complex state), this minimal
 * playground provides a simple sandbox to learn the basics:
 *   - A colored box that can be moved and rotated
 *   - Three number inputs (X, Y, Rotate) that control the box's position
 *
 * The upcoming lessons will convert the plain <div id="box" /> to a
 * Framer Motion <motion.div> element and demonstrate how to use
 * the `animate` prop to create smooth, physics-based animations
 * driven by the x, y, and rotate state values.
 *
 * After learning the fundamentals here, we will switch back to the
 * challenges project and apply Framer Motion to real UI elements
 * (modal, list items, tab indicators, scroll effects, etc.).
 *
 * ============================================================================
 * 🎓 LESSON 524: FRAMER MOTION BASICS -- motion.div, animate, transition
 * ============================================================================
 *
 * MOTION COMPONENTS:
 *
 * Framer Motion works by providing special "motion" versions of standard
 * HTML elements. You import the `motion` object from 'framer-motion' and
 * then use it as a prefix: motion.div, motion.span, motion.button, etc.
 * Every HTML element has a corresponding motion component.
 *
 * A <motion.div> renders a normal <div> in the DOM, but it gains
 * animation superpowers through special props that regular divs don't
 * accept. You can still pass all normal div props (id, className, style,
 * onClick, etc.) -- they pass through unchanged.
 *
 * THE `animate` PROP:
 *
 * The `animate` prop accepts an object describing the TARGET state of the
 * animation. Framer Motion will smoothly animate the element from its
 * current state to the values specified in this object.
 *
 * Common animatable properties include:
 *   - x, y         → translate horizontally/vertically (in pixels)
 *   - rotate       → rotation (in degrees)
 *   - scale        → scale factor
 *   - opacity      → transparency (0 to 1)
 *
 * When ANY value inside the animate object changes (e.g., because state
 * updates), Framer Motion automatically re-triggers the animation to
 * smoothly transition to the new target values. This is fully declarative:
 * you just describe WHERE the element should be, and Framer Motion
 * figures out HOW to get there.
 *
 * JavaScript shorthand property syntax is used here: { x, y, rotate }
 * is equivalent to { x: x, y: y, rotate: rotate }. The state variable
 * names match the animation property names, so the shorthand works.
 *
 * THE `transition` PROP:
 *
 * The `transition` prop controls HOW the animation moves -- the timing,
 * easing, and physics model. It accepts an object with configuration:
 *
 *   type: 'spring' | 'tween'
 *     - 'spring' (default): Physics-based animation with mass, stiffness,
 *       and damping. Produces natural-feeling motion with possible
 *       overshoot. This is Framer Motion's default for most properties.
 *     - 'tween': Traditional duration-based animation (like CSS
 *       transitions). Moves from A to B over a fixed time.
 *
 *   bounce: number (0 to 1, spring only)
 *     Controls how much the spring overshoots and oscillates.
 *     - 0:   no bounce at all, smooth deceleration to the target
 *     - 0.5: moderate bounce (the element overshoots, then settles)
 *     - 1:   maximum bounce (very springy, lots of oscillation)
 *
 *   duration: number (in seconds, tween or spring)
 *     How long the animation takes. For spring animations, this
 *     influences the spring stiffness calculation.
 *
 * In this playground, we use { type: 'spring', bounce: 0 } to get a
 * smooth spring animation without any overshoot -- the box glides
 * to its target position and stops cleanly.
 *
 * ============================================================================
 * PLAYGROUND STATE AFTER THIS LESSON
 * ============================================================================
 *
 * The box now MOVES and ROTATES when you type numbers into the X, Y,
 * and Rotate inputs. Each input updates its corresponding state value,
 * which flows into the animate prop, causing Framer Motion to smoothly
 * animate the box to the new position/rotation.
 *
 * PROJECT STRUCTURE:
 *
 *   zz-playground/
 *   ├── src/
 *   │   ├── main.jsx      ← React entry point
 *   │   ├── App.jsx       ← THIS FILE: box + input controls
 *   │   └── index.css     ← styles for the demo layout
 *   ├── package.json      ← React 19 + framer-motion + react-router-dom
 *   └── vite.config.js
 *
 * ============================================================================
 */

import { useState } from 'react';
import { motion } from 'framer-motion';

// Three state values that will later drive the box's animation:
// x and y control horizontal/vertical translation (in pixels),
// rotate controls rotation (in degrees).
function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <div id="demo">
      {/* LESSON 524: The plain <div> is now a <motion.div> -- a Framer Motion
          component that renders a normal div but accepts animation props.
          The animate prop receives the current x, y, and rotate state values.
          Whenever any of these values change (via the inputs below), Framer
          Motion smoothly animates the box to the new position/rotation.
          The transition prop configures a spring animation with no bounce. */}
      <motion.div
        id="box"
        animate={{ x, y, rotate }}
        transition={{ type: 'spring', bounce: 0 }}
      />

      {/* Number inputs that update x, y, and rotate state.
          The + prefix in +event.target.value converts the string to a number. */}
      <div id="inputs">
        <p>
          <label htmlFor="x">X</label>
          <input
            type="number"
            id="x"
            onChange={(event) => setX(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="y">Y</label>
          <input
            type="number"
            id="y"
            onChange={(event) => setY(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="rotate">Rotate</label>
          <input
            type="number"
            id="rotate"
            onChange={(event) => setRotate(+event.target.value)}
          />
        </p>
      </div>
    </div>
  );
}

export default App;
