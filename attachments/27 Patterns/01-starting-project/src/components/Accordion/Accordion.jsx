/**
 * ============================================================================
 * src/components/Accordion/Accordion.jsx - LESSONS 542, 543 & 544
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
 * ============================================================================
 * LESSON 543: CONTEXT AS THE GLUE BETWEEN COMPOUND COMPONENTS
 * ============================================================================
 *
 * THE PROBLEM — CHILDREN ARE OPAQUE:
 *
 * The Accordion component receives its items via children, which can
 * be anything. It cannot directly interact with or pass props to those
 * children because it simply forwards them between <ul> tags. There is
 * no .map() over items and no way to inject props into arbitrary JSX.
 *
 * THE SOLUTION — REACT CONTEXT:
 *
 * Context provides an implicit communication channel. The Accordion
 * component becomes a context PROVIDER, making shared state available
 * to any descendant that subscribes. The AccordionItem components
 * (descendants) consume that context to read and update the state.
 *
 * KEY DESIGN DECISIONS:
 *
 * 1. CONTEXT DEFINED IN THE SAME FILE as the Accordion component,
 *    because it is not a general-purpose app-wide context — it exists
 *    solely to serve the accordion's compound components. Co-locating
 *    the context with the component that provides it keeps the
 *    relationship explicit.
 *
 * 2. ACCORDION IS BOTH COMPONENT AND PROVIDER. Rather than having a
 *    separate provider component, the Accordion component itself wraps
 *    its children with AccordionContext.Provider. This means using
 *    <Accordion> automatically sets up the context — the consumer
 *    doesn't need to know about the provider at all.
 *
 * 3. STATE MANAGED VIA useState: The openItemId tracks which item is
 *    currently expanded (by its id). Only one item can be open at a
 *    time, so a single value (not an array) suffices. null means no
 *    item is open.
 *
 * 4. CONTEXT VALUE CONTAINS BOTH STATE AND ACTIONS: The context object
 *    exposes openItemId (read) and toggleItem (toggle by id). This
 *    gives consuming components everything they need to both display
 *    and control the accordion.
 *
 * CUSTOM HOOK — useAccordionContext:
 *
 * A custom hook is exported alongside the component to simplify context
 * consumption and add a safety check. If a component tries to use
 * useAccordionContext without being wrapped by <Accordion> (and thus
 * without a provider), the hook throws a descriptive error instead of
 * silently returning undefined. This is a defensive pattern that
 * catches misuse early and provides a clear message to the developer.
 *
 * ============================================================================
 * LESSON 544: REFINING STATE LOGIC + DOT-NOTATION COMPOUND IDENTIFIERS
 * ============================================================================
 *
 * MERGING openItem/closeItem INTO toggleItem:
 *
 * The previous two-function approach (openItem + closeItem) worked but
 * was redundant. A single toggleItem function handles both cases:
 *   - If the clicked item is already open → close it (set null)
 *   - If a different item (or none) is open → open the clicked one
 *
 * The function form of setState is used (prevOpenItemId => ...) because
 * the new state depends on the previous state. This is a React best
 * practice: when deriving new state from old state, always use the
 * updater function form to avoid stale closure issues.
 *
 * ATTACHING SUB-COMPONENTS VIA DOT NOTATION:
 *
 * In JavaScript, functions are objects — you can add properties to them.
 * The pattern Accordion.Item = AccordionItem attaches the child component
 * as a property of the parent component function. This lets consumers
 * write <Accordion.Item> instead of importing AccordionItem separately.
 *
 * Benefits of this pattern:
 *   - Makes the compound relationship EXPLICIT in the consumer's JSX:
 *     <Accordion.Item> clearly belongs to <Accordion>
 *   - Reduces import clutter — one import covers all related components
 *   - Follows conventions used by popular libraries (e.g., Tabs.Panel,
 *     Form.Field, Menu.Item)
 *
 * ============================================================================
 */

import { createContext, useContext, useState } from 'react';

import AccordionItem from './AccordionItem.jsx';

// LESSON 543: Context created in the same file as Accordion because it's
// tightly coupled to this component family, not a general app-wide context.
const AccordionContext = createContext();

// LESSON 543: Custom hook with a safety check. If useContext returns a
// falsy value, it means this hook was called outside of an <Accordion>
// provider — throw an error to alert the developer immediately.
export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      'Accordion-related components must be wrapped by <Accordion>'
    );
  }

  return context;
}

export default function Accordion({ children, className }) {
  // LESSON 543: Single piece of state tracking the id of the currently
  // open item. null means no item is expanded. Only one item can be
  // open at a time, so a single value (not an array) is sufficient.
  const [openItemId, setOpenItemId] = useState(null);

  // LESSON 544: Single toggleItem function replaces the previous separate
  // openItem/closeItem pair. Uses the updater function form of setState
  // (prevOpenItemId => ...) because the new value depends on the old one.
  // If the clicked item is already open, close it (null); otherwise open it.
  function toggleItem(id) {
    setOpenItemId((prevOpenItemId) =>
      prevOpenItemId === id ? null : id
    );
  }

  const contextValue = { openItemId, toggleItem };

  return (
    // LESSON 543: Accordion acts as both the UI wrapper (<ul>) and the
    // context provider. Using <Accordion> automatically makes the shared
    // state available to all descendant compound components.
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

// LESSON 544: Attach AccordionItem as a property on the Accordion function
// object. In JavaScript, functions are objects, so we can add properties to
// them. This enables the <Accordion.Item> syntax in consumer code, making the
// compound relationship explicit without requiring a separate import.
Accordion.Item = AccordionItem;
