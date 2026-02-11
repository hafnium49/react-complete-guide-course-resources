/**
 * ============================================================================
 * src/components/Accordion/AccordionContent.jsx - LESSONS 545 & 546
 * ============================================================================
 *
 * THE CONTENT PANE OF AN ACCORDION ITEM:
 *
 * Like AccordionTitle, this component was extracted from AccordionItem
 * to give consumers fine-grained control over the content area's
 * styling and markup. It wraps its children in a <div> and manages
 * its own visibility based on the shared accordion context.
 *
 * VISIBILITY VIA CSS CLASSES (open / close):
 *
 * Instead of conditionally rendering or removing content from the DOM,
 * this component always renders the <div> and toggles between "open"
 * and "close" CSS classes. The "close" class sets display:none, while
 * "open" sets display:block. This keeps the DOM stable and lets CSS
 * handle the show/hide transition.
 *
 * The className prop from the consumer is combined with the open/close
 * class using template literal interpolation. To avoid printing the
 * literal string "undefined" when no className is provided, a
 * nullish coalescing check (className ?? '') is used.
 *
 * WHY DECOUPLE display:none FROM accordion-item-content:
 *
 * Previously, .accordion-item-content had display:none baked in, tying
 * the hiding behavior to a styling class. By moving display:none into
 * a separate .close class, the accordion-item-content class becomes
 * purely about visual styling (padding, background color), while the
 * open/close toggle is handled by dedicated utility classes. This
 * separation makes the component more reusable — consumers can apply
 * their own styling classes without inheriting the hide behavior.
 *
 * ============================================================================
 * LESSON 546: id FROM ITEM-LEVEL CONTEXT
 * ============================================================================
 *
 * Like AccordionTitle, this component no longer accepts id as a prop.
 * Instead it reads the id from AccordionItemContext (provided by the
 * parent <Accordion.Item>). Two contexts are consumed:
 *   - useAccordionContext → for openItemId (which item is open)
 *   - useAccordionItemContext → for id (which item this content belongs to)
 *
 * ============================================================================
 */

import { useAccordionContext } from './Accordion.jsx';
import { useAccordionItemContext } from './AccordionItem.jsx';

export default function AccordionContent({ className, children }) {
  const { openItemId } = useAccordionContext();
  // LESSON 546: id now comes from the item-level context, not from props.
  const id = useAccordionItemContext();

  const isOpen = openItemId === id;

  return (
    <div className={isOpen ? `${className ?? ''} open` : `${className ?? ''} close`}>
      {children}
    </div>
  );
}
