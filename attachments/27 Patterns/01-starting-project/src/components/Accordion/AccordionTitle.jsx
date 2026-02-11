/**
 * ============================================================================
 * src/components/Accordion/AccordionTitle.jsx - LESSON 545
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
 * also needs the item's id (received via props) so that clicking the
 * title can tell the accordion which item was toggled. The id must be
 * passed explicitly because context only knows the CURRENTLY open id,
 * not which specific title instance was rendered.
 *
 * ============================================================================
 */

import { useAccordionContext } from './Accordion.jsx';

export default function AccordionTitle({ id, className, children }) {
  const { toggleItem } = useAccordionContext();

  return (
    <h3 className={className} onClick={() => toggleItem(id)}>
      {children}
    </h3>
  );
}
