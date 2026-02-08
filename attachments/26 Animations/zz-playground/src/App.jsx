/**
 * ============================================================================
 * zz-playground/src/App.jsx - LESSON 523
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
 * THIS PLAYGROUND'S CURRENT STATE
 * ============================================================================
 *
 * Right now, the box does NOT move or rotate when you type numbers into
 * the inputs. The x, y, and rotate state values are updated by the
 * onChange handlers, but nothing connects them to the box's visual
 * appearance. The next lessons will bridge that gap with Framer Motion.
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

// Three state values that will later drive the box's animation:
// x and y control horizontal/vertical translation (in pixels),
// rotate controls rotation (in degrees).
function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <div id="demo">
      {/* This box will be converted to a <motion.div> in later lessons
          to make it respond to the x, y, and rotate state values with
          smooth, physics-based animations. */}
      <div id="box" />

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
