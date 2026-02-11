/**
 * ============================================================================
 * src/components/Accordion/AccordionItem.jsx - LESSONS 542, 543 & 544
 * ============================================================================
 *
 * A COMPOUND COMPONENT PARTNER TO <Accordion>:
 *
 * This component represents a single collapsible section within the
 * accordion. It is designed to be used INSIDE <Accordion> tags, just
 * as <option> is used inside <select>. Using AccordionItem outside of
 * an Accordion would produce a list item with no accordion behavior.
 *
 * DESIGN CHOICES FOR MAXIMUM FLEXIBILITY:
 *
 * Rather than accepting the item's body content as a prop (e.g.,
 * content="some text"), AccordionItem uses the children prop to let
 * consumers pass arbitrary JSX between the opening and closing tags.
 * This means each item can have completely different markup — one
 * might contain an <article> with paragraphs, another a table, a
 * third an image gallery. The accordion doesn't dictate the shape
 * of its content.
 *
 * The title prop provides the clickable heading text, while className
 * allows per-item styling from the outside. Together with the
 * Accordion wrapper, this gives the consumer control over both the
 * container styling and the individual item styling.
 *
 * ============================================================================
 * LESSON 543: CONSUMING CONTEXT TO COORDINATE OPEN/CLOSE STATE
 * ============================================================================
 *
 * AccordionItem uses the useAccordionContext hook to access the shared
 * state managed by the parent Accordion. From the context it reads:
 *
 *   - openItemId: the id of the currently open item (or null)
 *   - toggleItem(id): function to open or close an item by id
 *
 * DERIVED STATE — isOpen:
 *
 * Each AccordionItem receives a unique `id` prop. By comparing its own
 * id against the context's openItemId, it derives whether THIS specific
 * instance is the one currently expanded. This is a simple equality
 * check, not additional state — it's recalculated on every render.
 *
 * TOGGLE BEHAVIOR:
 *
 * Clicking the title calls toggleItem(id). The toggle logic lives in
 * the parent Accordion — if the clicked item is already open, it
 * closes; otherwise it opens and any previously open item implicitly
 * closes because there is only a single openItemId slot.
 *
 * LESSON 544: The onClick handler is now an inline arrow function
 * calling toggleItem(id) directly, eliminating the need for a
 * separate handleClick wrapper function.
 *
 * CSS CLASS TOGGLING:
 *
 * The content wrapper div always has the "accordion-item-content" class
 * (which hides content by default via CSS). When isOpen is true, the
 * additional "open" class is appended, which overrides the hidden state
 * and reveals the content. This approach uses CSS to handle visibility
 * rather than conditionally rendering/removing the content from the DOM.
 *
 * ============================================================================
 */

import { useAccordionContext } from './Accordion.jsx';

export default function AccordionItem({ id, className, title, children }) {
  // LESSON 543: Read the shared accordion state via the custom hook.
  // This will throw if AccordionItem is used outside of <Accordion>.
  const { openItemId, toggleItem } = useAccordionContext();

  // LESSON 543: Derived state — compare this item's id against the
  // context's openItemId to determine if this instance is expanded.
  const isOpen = openItemId === id;

  return (
    <li className={className}>
      {/* LESSON 544: Inline arrow calling toggleItem(id) — no separate
          handler function needed since the logic lives in Accordion. */}
      <h3 onClick={() => toggleItem(id)}>{title}</h3>
      {/* LESSON 543: "accordion-item-content" hides content by default.
          The "open" class is appended when this item is expanded,
          overriding the CSS to reveal the children. */}
      <div className={isOpen ? 'accordion-item-content open' : 'accordion-item-content'}>
        {children}
      </div>
    </li>
  );
}
