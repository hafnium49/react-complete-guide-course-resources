/**
 * ============================================================================
 * src/components/Header.jsx - LESSONS 519 & 520
 * ============================================================================
 *
 * The header bar for the challenges page, showing the title and an
 * "Add Challenge" button. Clicking the button sets isCreatingNewChallenge
 * to true, which conditionally renders the NewChallenge modal.
 *
 * ANIMATION OPPORTUNITY: The modal currently appears and disappears
 * instantly (via conditional rendering with &&). Later in this section,
 * we will add enter/exit animations so the modal fades or slides in
 * and out smoothly rather than popping in and out abruptly.
 *
 * ============================================================================
 */

import { useState } from 'react';

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
      {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}

      <header id="main-header">
        <h1>Your Challenges</h1>
        <button onClick={handleStartAddNewChallenge} className="button">
          Add Challenge
        </button>
      </header>
    </>
  );
}
