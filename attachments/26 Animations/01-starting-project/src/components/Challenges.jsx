/**
 * ============================================================================
 * src/components/Challenges.jsx - LESSONS 519, 520, 535 & 537
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
 * ============================================================================
 * 🎓 LESSON 535: AnimatePresence FOR LIST EXIT ANIMATIONS & mode="wait"
 * ============================================================================
 *
 * TWO SEPARATE AnimatePresence WRAPPERS ARE NEEDED HERE, EACH SOLVING A
 * DIFFERENT ANIMATION PROBLEM:
 *
 * ── INNER AnimatePresence (around the challenge items) ──
 *
 * When a challenge is marked as failed or completed, it is removed from the
 * filtered list for the current tab. Without AnimatePresence, the item
 * vanishes instantly from the DOM. With AnimatePresence wrapping the mapped
 * list of ChallengeItem components, Framer Motion can intercept the removal
 * and play the exit animation defined on each ChallengeItem's motion.li
 * (exit={{ y: -30, opacity: 0 }}) before actually removing it.
 *
 * This AnimatePresence does NOT wrap the <ol> itself -- it wraps the
 * individual ChallengeItem children INSIDE the <ol>. Each ChallengeItem
 * already has a unique `key` (challenge.id), which is how AnimatePresence
 * tracks which children are entering, present, or exiting.
 *
 * ── OUTER AnimatePresence with mode="wait" (around list + fallback) ──
 *
 * When the last item in a tab is removed, the list disappears and a
 * fallback "No challenges found." message should appear. Without
 * coordination, both could animate simultaneously -- the list sliding
 * out while the fallback fades in at the same time, which looks messy.
 *
 * The mode="wait" prop on AnimatePresence solves this by enforcing
 * sequential animation: the EXITING element must complete its exit
 * animation before the ENTERING element begins its entry animation.
 * This creates a clean handoff: the list slides out and fades away,
 * then after it's gone, the fallback message fades in.
 *
 * For mode="wait" to work, the two elements being swapped (the list
 * and the fallback) must have distinct `key` props so AnimatePresence
 * can detect when one leaves and another enters. We use key="list" on
 * the <motion.ol> and key="fallback" on the <motion.p>.
 *
 * IMPORTANT: Only ONE child of the outer AnimatePresence should be
 * present at a time. The conditional rendering ({length > 0 ? list :
 * fallback}) ensures this -- either the list OR the fallback is
 * rendered, never both. This is required for mode="wait" to work
 * correctly, so we use a ternary operator instead of two separate
 * && conditions.
 *
 * WHY CONVERT <ol> AND <p> TO MOTION COMPONENTS?
 *
 * AnimatePresence triggers exit animations only on motion components
 * that have an `exit` prop. The <ol> is converted to <motion.ol> with
 * exit={{ y: -30, opacity: 0 }} so it animates out when the list
 * empties. The fallback <p> is converted to <motion.p> with initial,
 * animate, and exit props so it fades in smoothly when it appears and
 * can animate out if items are added back.
 *
 * ============================================================================
 * 🎓 LESSON 537: ENTRY ANIMATION FOR THE CHALLENGE LIST
 * ============================================================================
 *
 * When switching from a tab with no items (showing the fallback message)
 * to a tab that has items, the list just pops in abruptly with no
 * animation. This is because the motion.ol only had an exit prop -- it
 * knew how to animate OUT, but had no entry animation defined.
 *
 * The fix is to add initial and animate props to the motion.ol, using
 * the same values as the fallback paragraph. This gives the list a
 * matching fade-in + slide-up animation when it appears, creating a
 * symmetrical transition: the fallback slides out, then the list slides
 * in using the same motion pattern.
 *
 * ============================================================================
 */

import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
        {/* LESSON 535: Outer AnimatePresence with mode="wait" coordinates the
            transition between the list and the fallback message. When the last
            item is removed, the list's exit animation plays FIRST, then the
            fallback's entry animation starts. Without mode="wait", both would
            animate simultaneously. A ternary is used (not two && conditions)
            so that only one child is present at a time. */}
        <AnimatePresence mode="wait">
          {displayedChallenges.length > 0 ? (
            // LESSON 535: <ol> → <motion.ol> with exit animation. The key="list"
            // lets AnimatePresence distinguish this element from the fallback.
            // LESSON 537: initial and animate added so the list fades in and
            // slides up when appearing (e.g., switching from an empty tab to
            // a tab with items), matching the fallback paragraph's animation.
            <motion.ol
              key="list"
              className="challenge-items"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ y: -30, opacity: 0 }}
            >
              {/* LESSON 535: Inner AnimatePresence wraps the individual items.
                  When a challenge is removed from the filtered list (e.g., marked
                  as failed), AnimatePresence intercepts the removal and plays the
                  exit animation on the ChallengeItem's motion.li before removing
                  it from the DOM. */}
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          ) : (
            // LESSON 535: Fallback <p> → <motion.p> with entry and exit
            // animations. It fades in and slides up when appearing (after
            // the list exits), and can animate out if new items are added.
            <motion.p
              key="fallback"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              No challenges found.
            </motion.p>
          )}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
