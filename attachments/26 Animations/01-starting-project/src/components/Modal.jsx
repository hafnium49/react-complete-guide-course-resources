/**
 * ============================================================================
 * src/components/Modal.jsx - LESSONS 519, 520, 526, 527, 529 & BUGFIX
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
 * IMPORTANT -- AnimatePresence AND createPortal:
 *
 * Originally (Lesson 527), AnimatePresence was placed in Header.jsx
 * (the parent that controls conditional rendering). This works for
 * non-portalled content, but creates a problem with createPortal:
 * the motion components (motion.dialog) are rendered into a separate
 * DOM subtree (#modal), disconnected from where AnimatePresence lives
 * in the React tree. AnimatePresence may fail to detect when portalled
 * exit animations complete, leaving the backdrop stuck in the DOM and
 * blocking all interaction with the page.
 *
 * The fix is to place AnimatePresence INSIDE the portal, wrapping
 * the conditionally rendered content at the same DOM level as the
 * animated elements. The modal's visibility is then driven by an
 * `open` prop rather than conditional rendering from the parent.
 *
 * ============================================================================
 * 🎓 LESSON 529: VARIANTS -- NAMED, REUSABLE ANIMATION STATES
 * ============================================================================
 *
 * THE DUPLICATION PROBLEM:
 *
 * In the previous lesson, the initial and exit props both received the
 * same inline object: { opacity: 0, y: 30 }. If we ever need to change
 * the hidden state (e.g., adjust the y offset), we'd have to update it
 * in two places. One quick fix is extracting the object into a constant
 * and referencing it in both props. But Framer Motion offers a more
 * structured approach: variants.
 *
 * WHAT ARE VARIANTS?
 *
 * The `variants` prop accepts an object whose keys are custom identifiers
 * (any names you choose) and whose values are animation state objects:
 *
 *   variants={{
 *     hidden:  { opacity: 0, y: 30 },
 *     visible: { opacity: 1, y: 0 },
 *   }}
 *
 * Once defined, you reference these variants BY NAME (as strings) in the
 * `initial`, `animate`, `exit`, `whileHover`, `whileTap`, etc. props:
 *
 *   initial="hidden"    → applies the "hidden" variant on mount
 *   animate="visible"   → animates to the "visible" variant
 *   exit="hidden"       → animates to "hidden" on removal
 *
 * BENEFITS OF VARIANTS:
 *
 * 1. SINGLE SOURCE OF TRUTH: Each animation state is defined once in
 *    the variants object. Changing { opacity: 0, y: 30 } to
 *    { opacity: 0, y: 50 } only requires one edit.
 *
 * 2. SEMANTIC NAMING: "hidden" and "visible" communicate intent more
 *    clearly than inline objects. The animation lifecycle reads like
 *    a sentence: starts "hidden", animates to "visible", exits to "hidden".
 *
 * 3. REUSABILITY ACROSS PROPS: The same variant name can be used for
 *    initial, exit, whileHover, or any other animation prop, without
 *    duplicating the animation object.
 *
 * 4. PROPAGATION (next lesson): Variants have a powerful feature where
 *    parent variant names automatically propagate to child motion
 *    components, enabling coordinated multi-element animations. This
 *    is explored in the next lesson.
 *
 * NOTE: The variant names ("hidden", "visible") are entirely up to you.
 * You could use "start"/"end", "closed"/"open", "inactive"/"active",
 * etc. Just make sure the string values in initial/animate/exit match
 * the keys in the variants object exactly (typos cause silent failures).
 *
 * ============================================================================
 */

import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ title, children, onClose, open }) {
  // BUGFIX: Two SEPARATE AnimatePresence wrappers, each with a single
  // keyed motion component. A fragment inside AnimatePresence can cause
  // exit tracking to fail (AnimatePresence may not detect when the exit
  // animations complete, leaving invisible elements in the DOM). Splitting
  // into two wrappers ensures each AnimatePresence tracks exactly one
  // child. The backdrop's exit is independent of the dialog's — if the
  // dialog's variant propagation causes any delay, the backdrop still
  // gets removed promptly, preventing it from blocking pointer events.
  return createPortal(
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          // LESSONS 526-527: <dialog> → <motion.dialog> with entry/exit
          // animations. LESSON 529: Named variants for "hidden"/"visible".
          <motion.dialog
            key="dialog"
            open
            className="modal"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <h2>{title}</h2>
            {children}
          </motion.dialog>
        )}
      </AnimatePresence>
    </>,
    document.getElementById('modal')
  );
}
