/**
 * ============================================================================
 * src/components/Accordion/Accordion.jsx - LESSON 542
 * ============================================================================
 *
 * THE COMPOUND COMPONENTS PATTERN:
 *
 * Compound components are React components that are designed to work
 * TOGETHER rather than standalone. Individually, each component does
 * very little; their value comes from being combined as a group.
 *
 * A helpful analogy is the built-in HTML <select> and <option> elements.
 * Neither is useful on its own — <select> without <option> is an empty
 * dropdown, and <option> without <select> is meaningless. But used
 * together, they form a functional dropdown. We can build the same kind
 * of relationship between our own React components.
 *
 * WHY USE COMPOUND COMPONENTS FOR AN ACCORDION?
 *
 * An accordion is a UI where multiple collapsible sections share a
 * constraint: opening one section closes all others. This means the
 * items need to know about each other to coordinate their open/close
 * state. At the same time, each item should be independently
 * configurable — different titles, different content, different styling.
 *
 * One approach would be to pass an array of items as a prop and have
 * the Accordion component map over them internally. But that makes
 * it difficult for consumers to control the content and markup of
 * each individual item. Hard-coding the rendering logic inside one
 * component limits flexibility.
 *
 * The compound components approach splits the accordion into multiple
 * components (Accordion, AccordionItem, etc.) that are designed to
 * be composed together. The consumer retains full control over what
 * goes inside each item by using JSX children, while the shared
 * coordination logic will live in the parent component.
 *
 * THIS COMPONENT — THE ACCORDION SHELL:
 *
 * For now, Accordion is a simple wrapper that renders an unordered
 * list (<ul>) around whatever children are passed to it. It accepts
 * a className prop so the consumer can apply custom styling from
 * outside. In upcoming lessons, this component will gain the shared
 * state logic that coordinates which item is open.
 *
 * ============================================================================
 */

export default function Accordion({ children, className }) {
  return <ul className={className}>{children}</ul>;
}
