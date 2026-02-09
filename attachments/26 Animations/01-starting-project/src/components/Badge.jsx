/**
 * ============================================================================
 * src/components/Badge.jsx - LESSON 538
 * ============================================================================
 *
 * A small pill-shaped counter badge displayed next to each tab label,
 * showing the number of challenges in that category.
 *
 * ============================================================================
 * 🎓 LESSON 538: RE-TRIGGERING ANIMATIONS WITH React's key PROP
 * ============================================================================
 *
 * GOAL: Make the badge "bump" (briefly scale up and back down) whenever
 * the count changes -- e.g., when a challenge moves between tabs.
 *
 * STEP 1: ADD AN ENTRY ANIMATION
 *
 * Convert <span> to <motion.span> and add a scale keyframe animation
 * that plays when the component mounts:
 *
 *   animate={{ scale: [1, 1.2, 1] }}
 *   transition={{ duration: 0.3 }}
 *
 * The keyframe array [1, 1.2, 1] defines three steps: start at normal
 * size, grow to 120%, then shrink back to normal. No `initial` prop is
 * needed because keyframe arrays already define the starting value as
 * the first element in the array. This is an alternative to the
 * initial + animate pair used in earlier lessons.
 *
 * By itself, this animation only plays ONCE when the component first
 * mounts. After that, even if the caption prop changes, the animation
 * does not replay -- because React reuses the existing component
 * instance (updating its props) rather than creating a new one.
 *
 * STEP 2: USE React's key PROP TO FORCE RE-CREATION (in ChallengeTabs.jsx)
 *
 * React's `key` prop is most commonly associated with list rendering,
 * but it has a deeper purpose: when the key value on a component
 * changes, React DESTROYS the old instance and creates a brand new
 * one. This resets all internal state and re-runs mount effects --
 * including Framer Motion's entry animations.
 *
 * In ChallengeTabs.jsx, the Badge receives key={badgeCaption}. Since
 * badgeCaption is the item count for that tab, it changes whenever a
 * challenge is added, removed, or moved between tabs. The changed key
 * causes React to unmount the old Badge and mount a fresh one, which
 * triggers the scale keyframe animation again -- producing the "bump."
 *
 * This pattern (key change → component re-creation → animation replay)
 * is a general React technique, not specific to Framer Motion. It can
 * be used with any library or effect that should re-run on mount.
 *
 * ============================================================================
 */

import { motion } from 'framer-motion';

export default function Badge({ caption }) {
  // LESSON 538: <span> → <motion.span> with a scale keyframe animation.
  // The array [1, 1.2, 1] creates a brief "bump" on mount: normal size
  // → 20% bigger → back to normal, over 300ms. The animation replays
  // each time the component is recreated via a key change in the parent.
  return (
    <motion.span
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.3 }}
      className="badge"
    >
      {caption}
    </motion.span>
  );
}
