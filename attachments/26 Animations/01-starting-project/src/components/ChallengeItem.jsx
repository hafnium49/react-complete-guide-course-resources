/**
 * ============================================================================
 * src/components/ChallengeItem.jsx - LESSONS 519 & 520
 * ============================================================================
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
 * ANIMATION OPPORTUNITIES:
 *   - Exit animation when the item leaves the current tab's list
 *   - Enter animation when it appears in the new tab
 *   - The details section expanding/collapsing smoothly
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
        <div className="challenge-item-details">
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
