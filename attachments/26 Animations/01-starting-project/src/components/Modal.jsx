/**
 * ============================================================================
 * src/components/Modal.jsx - LESSONS 519, 520 & 526
 * ============================================================================
 *
 * A portal-based modal dialog. It renders a backdrop overlay and a <dialog>
 * element into the #modal div (defined in index.html, separate from #root).
 * Using createPortal ensures the modal overlays the entire page regardless
 * of where it is rendered in the component tree.
 *
 * ============================================================================
 * 🎓 LESSON 526: ANIMATING THE MODAL WITH FRAMER MOTION -- THE `initial` PROP
 * ============================================================================
 *
 * WHY MIGRATE FROM CSS TO FRAMER MOTION?
 *
 * In Lesson 522, the modal's entry animation was a CSS @keyframes animation
 * (slide-up-fade-in). That produced a working slide-up + fade-in effect,
 * but it had two limitations:
 *   1. The animation used a simple ease-out curve with no spring physics
 *   2. CSS cannot animate an element being REMOVED from the DOM -- so
 *      there was no way to add an exit animation when the modal closes
 *
 * Migrating to Framer Motion solves both: it provides spring physics by
 * default for the entry animation, and (in a future lesson) will enable
 * exit animations via AnimatePresence.
 *
 * THE CHALLENGE: NO STATE CHANGE INSIDE THIS COMPONENT
 *
 * In ChallengeItem (Lesson 525), the `animate` prop was driven by the
 * isExpanded prop, which changes between true and false. Framer Motion
 * animates whenever the animate values change.
 *
 * The Modal component is different. It is either in the DOM or not --
 * there is no internal state or prop that toggles after mount. The
 * component is conditionally rendered in Header.jsx:
 *   {isCreatingNewChallenge && <NewChallenge />}
 *
 * So when Modal mounts, the animate values are immediately at their
 * final state (opacity: 1, y: 0). Without a starting point, there is
 * nothing to animate FROM.
 *
 * THE SOLUTION: THE `initial` PROP
 *
 * The `initial` prop defines the STARTING state of the element when it
 * is first added to the DOM. If the initial values differ from the
 * animate values, Framer Motion automatically plays an animation from
 * initial → animate on mount.
 *
 * This is the Framer Motion equivalent of CSS @keyframes for entry
 * animations, but with two advantages:
 *   - Spring physics are applied by default (subtle overshoot/settle)
 *   - The same pattern sets up for exit animations later
 *
 * In this component:
 *   initial={{ opacity: 0, y: 30 }}   → invisible, pushed 30px down
 *   animate={{ opacity: 1, y: 0 }}    → fully visible, normal position
 *
 * When the modal mounts, it fades in and slides up from 30px below
 * its final position, with a spring-based feel.
 *
 * NOTE: The y value is positive 30 (not negative) because Framer
 * Motion's y property works like CSS translateY -- positive values
 * push the element downward. Starting at y: 30 and animating to y: 0
 * creates the "slide up" effect.
 *
 * WHAT WAS REMOVED FROM CSS (index.css):
 *   - The @keyframes slide-up-fade-in rule
 *   - The `animation` property from the .modal CSS rule
 *
 * NEXT STEP: The entry animation is now handled by Framer Motion, but
 * the modal still disappears instantly when closed. A future lesson
 * will add exit animations using AnimatePresence.
 *
 * ============================================================================
 */

import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      {/* LESSON 526: <dialog> replaced with <motion.dialog> to enable
          Framer Motion animation. The initial prop sets the starting state
          (invisible, 30px below final position). The animate prop sets the
          target state (fully visible, normal position). Framer Motion
          automatically plays a spring animation from initial → animate
          when this element mounts. */}
      <motion.dialog
        open
        className="modal"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
