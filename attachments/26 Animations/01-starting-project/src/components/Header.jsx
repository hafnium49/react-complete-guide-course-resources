/**
 * ============================================================================
 * src/components/Header.jsx - LESSONS 519, 520, 527 & 528
 * ============================================================================
 *
 * The header bar for the challenges page, showing the title and an
 * "Add Challenge" button. Clicking the button sets isCreatingNewChallenge
 * to true, which conditionally renders the NewChallenge modal.
 *
 * ============================================================================
 * 🎓 LESSON 527: AnimatePresence -- ENABLING EXIT ANIMATIONS
 * ============================================================================
 *
 * WHY THIS COMPONENT NEEDS AnimatePresence:
 *
 * This is the component that controls whether the modal is in the DOM
 * or not, via: {isCreatingNewChallenge && <NewChallenge />}
 *
 * When isCreatingNewChallenge becomes false, React instantly removes
 * <NewChallenge /> (and its child <Modal />) from the DOM. There is no
 * built-in way to delay removal for an animation.
 *
 * AnimatePresence from Framer Motion solves this. It wraps around the
 * conditional rendering and monitors its children. When a child is about
 * to be removed (because the condition becomes false), AnimatePresence
 * intercepts the removal:
 *   1. It keeps the element in the DOM
 *   2. It triggers the `exit` animation on any motion component inside
 *   3. After the exit animation completes, it actually removes the element
 *
 * IMPORTANT PLACEMENT: AnimatePresence must be placed in the component
 * that owns the conditional logic -- NOT inside the component being
 * conditionally rendered. It needs to be in the parent that decides
 * whether the child exists. In this case, Header.jsx controls the
 * isCreatingNewChallenge state, so AnimatePresence goes here, wrapping
 * the conditional expression.
 *
 * The exit animation itself (exit={{ opacity: 0, y: 30 }}) is defined
 * on the <motion.dialog> inside Modal.jsx. AnimatePresence and the
 * exit prop work together across component boundaries:
 *   - AnimatePresence (here) controls WHEN removal happens
 *   - exit prop (in Modal.jsx) controls WHAT the exit animation looks like
 *
 * ============================================================================
 * 🎓 LESSON 528: GESTURE ANIMATIONS -- whileHover & whileTap
 * ============================================================================
 *
 * GESTURE PROPS vs animate PROP:
 *
 * The `animate` prop is great for state-driven animations, but for common
 * user interactions like hovering or clicking, using `animate` would
 * require manually tracking mouse enter/leave events and toggling state.
 * That's a lot of boilerplate for something very common.
 *
 * Framer Motion provides dedicated gesture props that handle this
 * automatically:
 *
 *   whileHover  → animation state applied while the mouse is over the element
 *   whileTap    → animation state applied while the element is being clicked
 *   whileInView → animation state applied while the element is visible in
 *                  the viewport (useful for scroll-triggered animations)
 *
 * These props accept the same animation object format as `animate`.
 * Framer Motion automatically applies the animation when the gesture
 * starts and reverses it when the gesture ends -- no state management
 * needed.
 *
 * SPRING PHYSICS CONFIGURATION:
 *
 * By default, gesture animations may not use spring physics. To get a
 * bouncy, physically realistic feel, we add a `transition` prop with
 * spring configuration:
 *
 *   type: 'spring'       → use spring physics
 *   stiffness: number    → how "rigid" the spring is (higher = snappier,
 *                           lower = slower/softer). Default ~100.
 *   mass: number         → the "weight" of the element in the spring
 *                           simulation (higher = more inertia, slower to
 *                           start/stop). Default 1.
 *
 * stiffness and mass work together: high stiffness + low mass = quick
 * snappy bounce; low stiffness + high mass = slow heavy oscillation.
 * Experiment with different values to find the right feel.
 *
 * TRANSITION SCOPE: The transition prop on a motion component controls
 * ALL animations on that element -- animate, exit, whileHover, whileTap,
 * etc. You do not need separate transition configurations for each.
 *
 * ============================================================================
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {/* LESSON 527: AnimatePresence wraps the conditional rendering.
          When isCreatingNewChallenge becomes false, AnimatePresence delays
          removal of NewChallenge (and its Modal) until the exit animation
          on the motion.dialog inside Modal.jsx has finished playing. */}
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        {/* LESSON 528: <button> replaced with <motion.button> to enable
            gesture animations. whileHover scales the button up by 10% while
            the mouse is over it (and reverses on mouse leave). The spring
            transition with high stiffness produces a snappy bounce effect. */}
        <motion.button
          onClick={handleStartAddNewChallenge}
          className="button"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
