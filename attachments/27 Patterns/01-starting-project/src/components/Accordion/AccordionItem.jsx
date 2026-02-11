/**
 * ============================================================================
 * src/components/Accordion/AccordionItem.jsx - LESSONS 542 & 543
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
 *   - openItem(id): function to set a specific item as open
 *   - closeItem(): function to close the currently open item
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
 * Clicking the title heading triggers handleClick, which checks isOpen:
 *   - If this item is already open → call closeItem() to collapse it
 *   - If this item is closed → call openItem(id) to expand it
 *
 * Because openItem sets a single openItemId in the parent, opening one
 * item automatically "closes" any previously open item — no explicit
 * close call is needed for the other item. The mutual exclusion
 * constraint is inherent in the single-value state design.
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
  const { openItemId, openItem, closeItem } = useAccordionContext();

  // LESSON 543: Derived state — compare this item's id against the
  // context's openItemId to determine if this instance is expanded.
  const isOpen = openItemId === id;

  function handleClick() {
    if (isOpen) {
      closeItem();
    } else {
      openItem(id);
    }
  }

  return (
    <li className={className}>
      {/* LESSON 543: Clicking the title toggles this item open/closed. */}
      <h3 onClick={handleClick}>{title}</h3>
      {/* LESSON 543: "accordion-item-content" hides content by default.
          The "open" class is appended when this item is expanded,
          overriding the CSS to reveal the children. */}
      <div className={isOpen ? 'accordion-item-content open' : 'accordion-item-content'}>
        {children}
      </div>
    </li>
  );
}
