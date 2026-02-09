/**
 * ============================================================================
 * src/components/ChallengeTabs.jsx - LESSON 537
 * ============================================================================
 *
 * The tab bar component for switching between Active, Completed, and Failed
 * challenge lists. Each tab shows a badge with the item count for that
 * category. The currently selected tab has a visual indicator bar below it.
 *
 * ============================================================================
 * 🎓 LESSON 537: SHARED LAYOUT ANIMATION WITH layoutId
 * ============================================================================
 *
 * THE PROBLEM:
 *
 * Each tab renders its own indicator bar conditionally: only the selected
 * tab shows the bar ({isSelected && <div className="active-tab-indicator" />}).
 * When switching tabs, the bar in the old tab is removed from the DOM and
 * a new bar appears in the new tab. This makes the bar seem to "jump"
 * instantly between tabs -- there is no sliding animation.
 *
 * Technically there are THREE separate DOM elements (one per tab), not
 * one element that moves. This makes manual animation difficult because
 * you'd need to calculate positions and animate between them yourself.
 *
 * THE SOLUTION: layoutId
 *
 * Framer Motion provides the `layoutId` prop specifically for this use
 * case. When multiple motion components across the page share the same
 * layoutId string, Framer Motion treats them as the SAME logical element.
 * When one instance is removed and another with the same layoutId appears
 * elsewhere, Framer Motion automatically plays a smooth animation from
 * the old position to the new one.
 *
 * Under the hood:
 *   1. Framer Motion records the position of the element with layoutId
 *      "tab-indicator" before the re-render
 *   2. After the re-render, it finds the new element with the same
 *      layoutId in a different position (under a different tab)
 *   3. It animates from the old position/size to the new one
 *
 * This is similar to the `layout` prop (Lesson 534), but works ACROSS
 * different component instances rather than tracking a single element.
 * The `layout` prop animates one element's own position changes; the
 * `layoutId` prop links separate elements as one shared animated entity.
 *
 * IMPLEMENTATION:
 *
 * 1. Convert the indicator <div> to <motion.div>
 * 2. Add layoutId="tab-indicator" to give all three indicators the
 *    same identity
 *
 * That's all that's needed. No position calculations, no manual
 * animation values. Framer Motion handles the sliding animation
 * between tabs automatically.
 *
 * ============================================================================
 */

import { motion } from 'framer-motion';

import Badge from './Badge.jsx';

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect}
      >
        {children}
        <Badge caption={badgeCaption}></Badge>
      </button>
      {/* LESSON 537: <div> → <motion.div> with layoutId="tab-indicator".
          All three tabs render this element conditionally, but they share
          the same layoutId. Framer Motion detects when the indicator
          disappears from one tab and appears in another, and automatically
          plays a smooth sliding animation between the two positions. */}
      {isSelected && (
        <motion.div layoutId="tab-indicator" className="active-tab-indicator" />
      )}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === 'failed'}
          onSelect={() => onSelectType('failed')}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
