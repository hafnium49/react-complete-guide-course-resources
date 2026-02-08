/**
 * ============================================================================
 * src/components/Header.jsx - LESSONS 519, 520 & 527
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
 */

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

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
        <button onClick={handleStartAddNewChallenge} className="button">
          Add Challenge
        </button>
      </header>
    </>
  );
}
