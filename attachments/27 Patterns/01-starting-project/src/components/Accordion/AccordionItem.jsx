/**
 * ============================================================================
 * src/components/Accordion/AccordionItem.jsx - LESSONS 542, 543, 544 & 545
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
 * ============================================================================
 * LESSON 545: SIMPLIFIED TO A PURE SHELL
 * ============================================================================
 *
 * Previously, AccordionItem handled the title rendering, click handler,
 * isOpen derived state, and content visibility toggling. All of that
 * logic has now been extracted into dedicated sub-components:
 *
 *   - <Accordion.Title> handles the clickable heading and toggleItem
 *   - <Accordion.Content> handles visibility (open/close classes)
 *
 * AccordionItem is now a thin wrapper that renders a <li> with an
 * optional className and forwards its children. It no longer needs
 * to consume the accordion context at all — that responsibility has
 * moved to the more granular Title and Content components.
 *
 * This further decomposition means consumers can arrange, style, and
 * extend the title and content areas independently, or even add
 * custom elements between them (e.g., a subtitle, an icon row).
 *
 * ============================================================================
 */

export default function AccordionItem({ className, children }) {
  return <li className={className}>{children}</li>;
}
