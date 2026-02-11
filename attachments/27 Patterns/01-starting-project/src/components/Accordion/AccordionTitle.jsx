/**
 * ============================================================================
 * src/components/Accordion/AccordionTitle.jsx - LESSONS 545 & 546
 * ============================================================================
 *
 * FURTHER DECOMPOSING THE COMPOUND COMPONENT FAMILY:
 *
 * Previously, the <h3> title element with its onClick handler lived
 * inside AccordionItem. That worked, but it meant the title's markup
 * was hard-coded — consumers couldn't change its element type, add
 * icons, or apply custom styling to just the title portion.
 *
 * By extracting the title into its own component, we gain:
 *   - The ability to pass arbitrary children (not just a string)
 *     between <Accordion.Title> tags, enabling richer title markup
 *   - A dedicated className prop for per-title styling
 *   - Full separation of concerns: the title handles the click,
 *     the content handles visibility, and the item is just a shell
 *
 * CONTEXT ACCESS:
 *
 * AccordionTitle consumes useAccordionContext to get toggleItem. It
 * also needs the item's id so that clicking the title can tell the
 * accordion which item was toggled.
 *
 * ============================================================================
 * LESSON 546: id FROM ITEM-LEVEL CONTEXT
 * ============================================================================
 *
 * Previously, the id had to be passed as a prop directly on
 * <Accordion.Title>. Now it comes from AccordionItemContext, which
 * is provided by the parent <Accordion.Item>. This means the consumer
 * only sets the id once (on Item), and Title reads it automatically.
 *
 * Two contexts are consumed here:
 *   - useAccordionContext → for toggleItem (the action)
 *   - useAccordionItemContext → for id (which item this title belongs to)
 *
 * ============================================================================
 */

import { useAccordionContext } from './Accordion.jsx';
import { useAccordionItemContext } from './AccordionItem.jsx';

export default function AccordionTitle({ className, children }) {
  const { toggleItem } = useAccordionContext();
  // LESSON 546: id now comes from the item-level context, not from props.
  const id = useAccordionItemContext();

  return (
    <h3 className={className} onClick={() => toggleItem(id)}>
      {children}
    </h3>
  );
}
