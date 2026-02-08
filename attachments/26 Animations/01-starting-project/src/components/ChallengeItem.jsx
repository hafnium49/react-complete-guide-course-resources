/**
 * ============================================================================
 * src/components/ChallengeItem.jsx - LESSONS 519, 520, 521, 525, 534 & 535
 * ============================================================================
 *
 * LESSON 519 & 520: Project overview -- individual challenge card component
 * LESSON 521: CSS Transitions for animating the details toggle icon
 * LESSON 525: Replacing CSS transition with Framer Motion
 *
 * An individual challenge card. Each item shows the challenge image, title,
 * deadline, and action buttons to mark it as failed or completed. There is
 * also an expandable details section that reveals the full description.
 *
 * When "Mark as failed" or "Mark as completed" is clicked, the challenge
 * status is updated in context, which causes it to move to the
 * corresponding tab (failed/completed). Currently this transition is
 * instant -- the item disappears from the current list and appears in
 * the other tab with no visual feedback.
 *
 * ============================================================================
 * 🎓 LESSON 521: CSS TRANSITIONS (now superseded by Lesson 525)
 * ============================================================================
 *
 * Originally, the arrow icon rotation was animated using two CSS features:
 *   1. A dynamic "expanded" class on the parent div in JSX
 *   2. A CSS `transition: transform 0.3s ease-out` on the icon in index.css
 *
 * This approach worked but produced a simple ease-out animation -- the
 * icon rotated smoothly but without any physical character. The motion
 * felt mechanical: constant deceleration, no overshoot, no springiness.
 *
 * ============================================================================
 * 🎓 LESSON 525: REPLACING CSS TRANSITION WITH FRAMER MOTION
 * ============================================================================
 *
 * WHY SWITCH FROM CSS TO FRAMER MOTION FOR THIS ANIMATION?
 *
 * The CSS transition (Lesson 521) animated the icon rotation correctly,
 * but the result felt flat. Framer Motion's default spring-based physics
 * produce a subtle overshoot and settle that makes the rotation feel
 * like a physical object with mass -- more natural and satisfying.
 *
 * WHAT CHANGED:
 *
 * 1. REMOVED the dynamic "expanded" class from the parent div.
 *    Previously: className={`challenge-item-details${isExpanded ? ' expanded' : ''}`}
 *    Now:        className="challenge-item-details" (static, no toggling needed)
 *
 * 2. REMOVED the CSS transition and the .expanded rotation rule from
 *    index.css. Those are no longer needed since the animation is now
 *    handled entirely in JSX via Framer Motion.
 *
 * 3. REPLACED the <span> icon element with <motion.span>.
 *    This is a Framer Motion component that renders a normal <span>
 *    but accepts animation props like `animate`.
 *
 * 4. ADDED the `animate` prop to the <motion.span> with a conditional
 *    rotate value driven by the isExpanded prop:
 *
 *      animate={{ rotate: isExpanded ? 180 : 0 }}
 *
 *    When isExpanded is true, Framer Motion smoothly animates the icon
 *    from its current rotation to 180 degrees. When false, it animates
 *    back to 0. The default spring transition provides the natural,
 *    bouncy feel automatically -- no transition configuration needed.
 *
 * KEY INSIGHT: The animation is now entirely declarative in JSX. There
 * is no CSS class toggling, no CSS transition property, and no separate
 * CSS rule for the rotated state. Framer Motion handles the "how" of
 * the animation; the component just declares the target state.
 *
 * ============================================================================
 * 🎓 LESSON 534: LAYOUT ANIMATIONS -- SMOOTH LIST REORDERING
 * ============================================================================
 *
 * THE PROBLEM:
 *
 * When a challenge is marked as "failed" or "completed", it is removed
 * from the active list. Any remaining items below it instantly snap
 * upward to fill the gap -- no animation, just an abrupt jump. This
 * feels jarring, especially in a list with multiple items.
 *
 * THE SOLUTION: THE `layout` PROP
 *
 * Framer Motion provides a `layout` prop that can be added to any
 * motion component. When present, Framer Motion automatically detects
 * changes to the element's position or size in the DOM layout, and
 * smoothly ANIMATES the transition from the old position/size to the
 * new one.
 *
 * How it works under the hood:
 *   1. Before a React re-render, Framer Motion records the current
 *      position and dimensions of every motion component with `layout`
 *   2. After the re-render, it records the new positions/dimensions
 *   3. If any element moved or resized, it animates from old → new
 *
 * This is powerful because it works automatically -- you don't need to
 * calculate positions or define animate/initial values. Just add
 * `layout` and Framer Motion handles the rest.
 *
 * USE CASE HERE:
 *
 * The <li> element wrapping each challenge card is converted to
 * <motion.li layout>. When an item above is removed from the list,
 * the remaining items shift upward. Framer Motion detects this layout
 * change and smoothly animates the remaining items to their new
 * positions instead of letting them snap instantly.
 *
 * NOTE: The layout prop only animates items that REMAIN in the DOM
 * and change position. The removed item itself still disappears
 * instantly (unless exit animations are also configured with
 * AnimatePresence). The layout animation specifically targets the
 * surviving siblings that need to reflow.
 *
 * ============================================================================
 * 🎓 LESSON 535: EXIT ANIMATION FOR INDIVIDUAL CHALLENGE ITEMS
 * ============================================================================
 *
 * With the layout prop (Lesson 534), remaining items animate smoothly
 * to their new positions when a sibling is removed. But the removed
 * item itself still vanished instantly -- no visual indication of it
 * leaving.
 *
 * Adding an `exit` prop to the motion.li defines what animation plays
 * when this element is removed from the DOM. Here, the item slides
 * upward 30px and fades out:
 *
 *   exit={{ y: -30, opacity: 0 }}
 *
 * This exit animation is triggered by the AnimatePresence component
 * that wraps the list of ChallengeItem components in Challenges.jsx.
 * AnimatePresence detects when a child (identified by its key) is no
 * longer in the rendered output, intercepts the removal, plays the
 * exit animation, and only then removes the element from the DOM.
 *
 * The layout prop and exit prop work together: when an item exits,
 * it slides up and fades out via the exit animation, while the
 * remaining items smoothly shift to fill the gap via layout animation.
 *
 * ============================================================================
 */

import { useContext } from 'react';
import { motion } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';

export default function ChallengeItem({
  challenge,
  onViewDetails,
  isExpanded,
}) {
  const { updateChallengeStatus } = useContext(ChallengesContext);

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    'en-US',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  );

  function handleCancel() {
    updateChallengeStatus(challenge.id, 'failed');
  }

  function handleComplete() {
    updateChallengeStatus(challenge.id, 'completed');
  }

  return (
    // LESSON 534: <li> → <motion.li> with the layout prop. This tells
    // Framer Motion to animate this element's position whenever the DOM
    // layout changes (e.g., when a sibling item is removed from the list).
    // LESSON 535: exit prop added so the item slides up and fades out when
    // removed, instead of vanishing instantly. Requires AnimatePresence
    // in the parent (Challenges.jsx) to intercept DOM removal.
    <motion.li layout exit={{ y: -30, opacity: 0 }}>
      <article className="challenge-item">
        <header>
          <img {...challenge.image} />
          <div className="challenge-item-meta">
            <h2>{challenge.title}</h2>
            <p>Complete until {formattedDate}</p>
            <p className="challenge-item-actions">
              <button onClick={handleCancel} className="btn-negative">
                Mark as failed
              </button>
              <button onClick={handleComplete}>Mark as completed</button>
            </p>
          </div>
        </header>
        {/* LESSON 525: The dynamic "expanded" class is no longer needed.
            The rotation is now handled by Framer Motion on the icon itself,
            so the parent div goes back to a plain static className. */}
        <div className="challenge-item-details">
          <p>
            <button onClick={onViewDetails}>
              View Details{' '}
              {/* LESSON 525: <span> replaced with <motion.span> to enable
                  Framer Motion animation. The animate prop sets the target
                  rotation based on isExpanded: 180 degrees when open, 0 when
                  closed. Framer Motion's default spring transition gives
                  the rotation a natural, slightly bouncy feel. */}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="challenge-item-details-icon"
              >
                &#9650;
              </motion.span>
            </button>
          </p>

          {isExpanded && (
            <div>
              <p className="challenge-item-description">
                {challenge.description}
              </p>
            </div>
          )}
        </div>
      </article>
    </motion.li>
  );
}
