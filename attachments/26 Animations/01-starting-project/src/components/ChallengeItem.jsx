/**
 * ============================================================================
 * src/components/ChallengeItem.jsx - LESSONS 519, 520 & 521
 * ============================================================================
 *
 * LESSON 519 & 520: Project overview -- individual challenge card component
 * LESSON 521: CSS Transitions for animating the details toggle icon
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
 * 🎓 LESSON 521: CSS TRANSITIONS -- ANIMATING THE DETAILS ARROW ICON
 * ============================================================================
 *
 * STARTING WITH CSS BEFORE REACHING FOR A LIBRARY
 *
 * Before diving into Framer Motion, this lesson demonstrates that CSS
 * alone has powerful built-in animation features that may be sufficient
 * for many use cases. You do not always need an animation library.
 *
 * THE PROBLEM:
 *
 * The "View Details" button has a small arrow icon (▲) next to it. When
 * the details are expanded, the arrow should point downward (rotated
 * 180 degrees). When collapsed, it should point upward. The CSS already
 * has a rule for this rotation (see index.css), but it only activates
 * when the parent div has the class "expanded" alongside
 * "challenge-item-details". Without that class, the rotation never
 * happens.
 *
 * THE FIX (two parts):
 *
 * 1. DYNAMIC CLASS IN JSX (this file):
 *    The challenge-item-details div now gets the "expanded" class
 *    conditionally, based on the isExpanded prop. We use a template
 *    literal to build the className string dynamically:
 *
 *      className={`challenge-item-details${isExpanded ? ' expanded' : ''}`}
 *
 *    This is a common React pattern for conditionally appending CSS
 *    classes. When isExpanded is true, the div gets both classes:
 *    "challenge-item-details expanded". When false, just
 *    "challenge-item-details".
 *
 * 2. CSS TRANSITION (in index.css):
 *    Adding the class alone makes the rotation happen, but it would be
 *    instantaneous -- the arrow would just jump to its new position.
 *    To animate it smoothly, we add a CSS `transition` property to the
 *    base icon rule in index.css. This tells the browser to animate
 *    changes to the `transform` property over a duration (0.3s) with
 *    an easing function (ease-out).
 *
 * CSS TRANSITIONS IN BRIEF:
 *
 * The `transition` CSS property tells the browser: "whenever this
 * property changes, don't apply the change instantly -- instead,
 * animate from the old value to the new value." The syntax is:
 *
 *   transition: <property> <duration> <easing>;
 *
 * For example:
 *   transition: transform 0.3s ease-out;
 *
 * - property:  which CSS property to animate (e.g., transform, opacity,
 *              background-color, or "all" for everything)
 * - duration:  how long the animation takes (e.g., 0.3s or 300ms)
 * - easing:    the acceleration curve (ease-out starts fast and slows
 *              down; ease-in starts slow and speeds up; linear is
 *              constant speed)
 *
 * The transition must be placed on the BASE rule (the one that's always
 * active), not on the conditional rule. The browser watches for changes
 * to the specified property and animates them whenever they occur.
 *
 * ============================================================================
 */

import { useContext } from 'react';

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
        {/* LESSON 521: Dynamically add the "expanded" class when details
            are visible. This activates the CSS rule that rotates the arrow
            icon 180 degrees. Combined with the CSS transition on the icon,
            the rotation is smoothly animated instead of instant. */}
        <div className={`challenge-item-details${isExpanded ? ' expanded' : ''}`}>
          <p>
            <button onClick={onViewDetails}>
              View Details{' '}
              <span className="challenge-item-details-icon">&#9650;</span>
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
