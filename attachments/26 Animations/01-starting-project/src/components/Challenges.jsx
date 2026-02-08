/**
 * ============================================================================
 * src/components/Challenges.jsx - LESSONS 519 & 520
 * ============================================================================
 *
 * The main challenge list component. It reads all challenges from context,
 * filters them into three categories (active, completed, failed), and
 * displays the currently selected category via ChallengeTabs.
 *
 * The selectedType state controls which tab is active. The expanded state
 * tracks which challenge (if any) has its details expanded (only one at
 * a time -- clicking the same one again collapses it).
 *
 * The challenge list is passed as {children} to ChallengeTabs, which
 * renders the tab bar above and the children below.
 *
 * ANIMATION OPPORTUNITIES:
 *   - Challenge items appearing when added and disappearing when their
 *     status changes (moving between tabs) -- list animations
 *   - The details section expanding/collapsing with a smooth height
 *     transition instead of an abrupt show/hide
 *   - Tab indicator animating between tabs (sliding underline)
 *
 * ============================================================================
 */

import { useContext, useState } from 'react';

import { ChallengesContext } from '../store/challenges-context.jsx';
import ChallengeItem from './ChallengeItem.jsx';
import ChallengeTabs from './ChallengeTabs.jsx';

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === 'active'),
    completed: challenges.filter(
      (challenge) => challenge.status === 'completed'
    ),
    failed: challenges.filter((challenge) => challenge.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {displayedChallenges.length > 0 && (
          <ol className="challenge-items">
            {displayedChallenges.map((challenge) => (
              <ChallengeItem
                key={challenge.id}
                challenge={challenge}
                onViewDetails={() => handleViewDetails(challenge.id)}
                isExpanded={expanded === challenge.id}
              />
            ))}
          </ol>
        )}
        {displayedChallenges.length === 0 && <p>No challenges found.</p>}
      </ChallengeTabs>
    </div>
  );
}
