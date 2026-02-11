/**
 * ============================================================================
 * src/components/Accordion/AccordionItem.jsx - LESSONS 542, 543, 544, 545 & 546
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
 * LESSON 546: ITEM-LEVEL CONTEXT — ELIMINATING DUPLICATE id PROPS
 * ============================================================================
 *
 * PROBLEM: Previously, the consumer had to pass the same id to both
 * <Accordion.Title> and <Accordion.Content>. This was repetitive and
 * error-prone — a typo in one but not the other would silently break.
 *
 * SOLUTION: A second context (AccordionItemContext) is introduced at
 * the item level. AccordionItem accepts the id via props and provides
 * it to all descendants through this context. Title and Content then
 * read the id from context instead of props, so the consumer only
 * sets the id once on <Accordion.Item>.
 *
 * This mirrors the two-layer context architecture:
 *   - AccordionContext (from Accordion.jsx): manages WHICH item is open
 *   - AccordionItemContext (here): tells sub-components WHICH item
 *     they belong to
 *
 * DEFENSIVE CUSTOM HOOK — useAccordionItemContext:
 *
 * Just like useAccordionContext, this hook includes a safety check
 * that throws if a sub-component (Title, Content) is used outside of
 * an <Accordion.Item> wrapper. This catches accidental misuse early.
 *
 * NOTE ON SINGLE-FILE CONSOLIDATION:
 *
 * Since all Accordion sub-components are already grouped via dot
 * notation (Accordion.Item, Accordion.Title, etc.), it's technically
 * possible to merge them all into one file so the individual components
 * can't be imported directly. This would enforce that they're only
 * accessed through the Accordion object. However, keeping them in
 * separate files improves readability and is the approach used here.
 *
 * ============================================================================
 */

import { createContext, useContext } from 'react';

// LESSON 546: Item-level context — a simple context that holds just the
// id of this specific accordion item. Not dynamic (no state), just a
// static value passed once when the item renders.
const AccordionItemContext = createContext();

// LESSON 546: Safety hook matching the pattern from useAccordionContext.
// Throws if Title or Content is rendered outside of an Accordion.Item.
export function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      'AccordionItem-related components must be wrapped by <Accordion.Item>'
    );
  }

  return context;
}

export default function AccordionItem({ id, className, children }) {
  // LESSON 546: Wrap children with the item-level context provider,
  // passing the id so that Title and Content can access it without
  // the consumer having to set it on each sub-component individually.
  return (
    <AccordionItemContext.Provider value={id}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
}
