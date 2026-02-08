/**
 * ============================================================================
 * src/components/ChallengeItem.jsx - LESSONS 519, 520, 521 & 525
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
    <li>
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
    </li>
  );
}
