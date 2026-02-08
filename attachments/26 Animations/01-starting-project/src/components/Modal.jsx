/**
 * ============================================================================
 * src/components/Modal.jsx - LESSONS 519, 520, 526 & 527
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
 * ============================================================================
 * 🎓 LESSON 527: EXIT ANIMATIONS WITH THE `exit` PROP & AnimatePresence
 * ============================================================================
 *
 * THE PATTERN: initial → animate → exit
 *
 * Framer Motion motion components accept three complementary props that
 * define the full animation lifecycle of an element:
 *
 *   initial  → the starting state when the element APPEARS in the DOM
 *   animate  → the target state to animate TO after appearing
 *   exit     → the target state to animate TO when the element is REMOVED
 *
 * The exit prop takes the same kind of configuration object as initial
 * and animate. You can reuse the same values as initial (to reverse the
 * entry animation) or define a completely different exit animation.
 *
 * WHY `exit` ALONE IS NOT ENOUGH:
 *
 * Adding exit={{ opacity: 0, y: 30 }} to the motion.dialog tells Framer
 * Motion WHAT to animate to on removal -- but it does not prevent React
 * from instantly removing the element. React's conditional rendering
 * (e.g., {show && <Component />}) removes elements from the DOM the
 * moment the condition becomes false, with no delay. There is no built-in
 * mechanism to say "wait for an animation before removing."
 *
 * THE SOLUTION: AnimatePresence
 *
 * AnimatePresence is a component provided by Framer Motion that wraps
 * around conditionally rendered content. It intercepts React's removal
 * process: when a child element is about to be removed, AnimatePresence
 * keeps it in the DOM long enough for its exit animation to play, then
 * removes it after the animation completes.
 *
 * AnimatePresence must be used in the PARENT component -- the one that
 * controls the conditional rendering. In this app, that is Header.jsx,
 * which renders {isCreatingNewChallenge && <NewChallenge />}. The
 * AnimatePresence wrapper goes around that conditional expression.
 *
 * HOW IT WORKS TOGETHER:
 *   1. User clicks "Add Challenge" → isCreatingNewChallenge becomes true
 *   2. NewChallenge (which includes Modal) mounts in the DOM
 *   3. motion.dialog plays initial → animate (slide up + fade in)
 *   4. User closes modal → isCreatingNewChallenge becomes false
 *   5. AnimatePresence intercepts removal, finds exit prop on motion.dialog
 *   6. motion.dialog plays animate → exit (slide down + fade out)
 *   7. After exit animation completes, element is actually removed from DOM
 *
 * ============================================================================
 */

import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      {/* LESSON 526: <dialog> replaced with <motion.dialog>.
          initial → animate plays a spring slide-up + fade-in on mount.
          LESSON 527: exit prop added -- mirrors the initial state so
          the modal slides back down and fades out when removed. This
          exit animation only plays if AnimatePresence wraps the
          conditional rendering in the parent (Header.jsx). */}
      <motion.dialog
        open
        className="modal"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
