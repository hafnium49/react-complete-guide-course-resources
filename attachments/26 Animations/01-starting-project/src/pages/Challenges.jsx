/**
 * ============================================================================
 * src/pages/Challenges.jsx - LESSONS 519 & 520
 * ============================================================================
 *
 * The challenges management page at "/challenges". This is the page-level
 * component that composes the entire challenges UI:
 *
 *   ChallengesContextProvider    ← wraps everything with challenge state
 *     Header                     ← "Your Challenges" title + "Add Challenge" button
 *     Challenges                 ← tab bar + filtered challenge list
 *
 * ChallengesContextProvider sits at this level so that both Header (which
 * triggers the "add challenge" modal) and Challenges (which reads and
 * updates challenge data) can share the same context.
 *
 * ANIMATION OPPORTUNITIES (to be added in later lessons):
 *
 * This page has many interactive elements that benefit from animations:
 *   - The modal appearing/disappearing when adding a new challenge
 *   - Tab switching between Active, Completed, and Failed
 *   - Challenge items entering/leaving the list when status changes
 *   - Expanding/collapsing challenge details
 *
 * ============================================================================
 */

import Header from '../components/Header.jsx';
import Challenges from '../components/Challenges.jsx';
import ChallengesContextProvider from '../store/challenges-context.jsx';

export default function ChallengesPage() {
  return (
    <ChallengesContextProvider>
      <Header />
      <main>
        <Challenges />
      </main>
    </ChallengesContextProvider>
  );
}
