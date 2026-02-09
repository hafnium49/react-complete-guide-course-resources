/**
 * ============================================================================
 * src/components/Accordion/AccordionItem.jsx - LESSON 542
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
 * CURRENT STATE:
 *
 * Right now, both the title and body content are always visible.
 * The open/close toggling behavior and the "only one item open at a
 * time" constraint will be added in upcoming lessons, powered by
 * shared state in the parent Accordion component.
 *
 * ============================================================================
 */

export default function AccordionItem({ className, title, children }) {
  return (
    <li className={className}>
      <h3>{title}</h3>
      <div>{children}</div>
    </li>
  );
}
