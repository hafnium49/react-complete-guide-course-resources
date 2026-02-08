/**
 * ============================================================================
 * src/store/challenges-context.jsx - LESSONS 519 & 520
 * ============================================================================
 *
 * The central state management for challenges, using React's Context API.
 *
 * STATE SHAPE: An array of challenge objects, each with:
 *   { id, title, description, deadline, image, status }
 *
 * The status field is one of: 'active', 'completed', or 'failed'.
 * New challenges start as 'active' and can be moved to other statuses.
 *
 * OPERATIONS PROVIDED VIA CONTEXT:
 *   - addChallenge: prepends a new challenge with a generated id
 *   - deleteChallenge: removes a challenge entirely by id
 *   - updateChallengeStatus: changes a challenge's status field
 *
 * The context default value (passed to createContext) provides the shape
 * for IDE autocompletion. The actual values come from the provider.
 *
 * ============================================================================
 */

import { createContext, useEffect, useState } from 'react';

export const ChallengesContext = createContext({
  challenges: [],
  addChallenge: () => {},
  updateChallengeStatus: () => {},
});

export default function ChallengesContextProvider({ children }) {
  // BUGFIX: Initialize from localStorage so challenges persist across
  // page refreshes. The lazy initializer function runs only once on mount.
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('challenges');
    return saved ? JSON.parse(saved) : [];
  });

  // BUGFIX: Sync challenges to localStorage whenever the array changes.
  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [challenges]);

  function addChallenge(challenge) {
    setChallenges((prevChallenges) => [
      { ...challenge, id: Math.random().toString(), status: 'active' },
      ...prevChallenges,
    ]);
  }

  function deleteChallenge(challengeId) {
    setChallenges((prevChallenges) =>
      prevChallenges.filter((challenge) => challenge.id !== challengeId)
    );
  }

  function updateChallengeStatus(challengeId, newStatus) {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return { ...challenge, status: newStatus };
        }
        return challenge;
      })
    );
  }

  const challengesContext = {
    challenges,
    addChallenge,
    deleteChallenge,
    updateChallengeStatus,
  };

  return (
    <ChallengesContext.Provider value={challengesContext}>
      {children}
    </ChallengesContext.Provider>
  );
}
