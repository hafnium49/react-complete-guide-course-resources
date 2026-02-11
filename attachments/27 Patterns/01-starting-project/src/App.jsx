/**
 * ============================================================================
 * src/App.jsx - LESSONS 540, 541, 542, 543, 544, 545, 546 & 547
 * ============================================================================
 *
 * LESSON 541: PROJECT SETUP
 *
 * This is the starting project for Section 27: Patterns & Practices.
 *
 * This section revisits key React best practices already encountered
 * throughout the course, while introducing several advanced patterns
 * that are commonly used in real-world React projects:
 *
 *   - COMPOUND COMPONENTS: A pattern where a parent component and its
 *     child components work together as a unit, sharing implicit state.
 *     The parent manages the state, and children access it without the
 *     consumer needing to wire props manually between them.
 *
 *   - RENDER PROPS: A pattern where a component receives a function as
 *     a prop (or as children) and calls that function to determine what
 *     to render. This gives the consumer full control over the rendered
 *     output while the component handles the logic.
 *
 *   - Additional related concepts and patterns will be explored as the
 *     section progresses.
 *
 * All patterns will be applied to a demo project built incrementally
 * across the upcoming lessons, starting from this minimal scaffold.
 *
 * The initial folder structure is intentionally bare — just the standard
 * Vite entry point (main.jsx), global styles (index.css), an empty
 * components directory, and this App component. The files will be
 * populated with logic as the section progresses.
 *
 * ============================================================================
 * LESSON 542: COMPOUND COMPONENTS IN PRACTICE — THE CONSUMER SIDE
 * ============================================================================
 *
 * This file demonstrates how compound components are USED (consumed).
 * Notice the structure: <Accordion> wraps multiple <Accordion.Item>
 * children, mirroring the <select>/<option> relationship from HTML.
 *
 * Each AccordionItem receives a title prop for its heading and
 * arbitrary JSX children for its body content. The consumer (this
 * file) has full control over the content and markup inside each
 * item — one could contain paragraphs, another a table, a third
 * images. The Accordion components don't constrain what goes inside.
 *
 * The className props ("accordion" on the wrapper, "accordion-item"
 * on each item) reference CSS classes already prepared in index.css,
 * showing how compound components can be styled from the outside.
 *
 * At this stage, all items are always expanded. The open/close
 * behavior and the mutual exclusion constraint (only one item open
 * at a time) will be added in the next lesson.
 *
 * ============================================================================
 * LESSON 544: DOT-NOTATION SYNTAX FOR COMPOUND COMPONENTS
 * ============================================================================
 *
 * Instead of importing Accordion and AccordionItem separately, we now
 * import only Accordion. The AccordionItem component is attached as
 * Accordion.Item (set up in Accordion.jsx via Accordion.Item = ...).
 *
 * Using <Accordion.Item> in JSX makes it visually obvious that Item
 * is a sub-component designed to live inside <Accordion>. This is a
 * common convention in component libraries — a single import gives
 * access to the entire family of related compound components.
 *
 * ============================================================================
 * LESSON 545: FINE-GRAINED SUB-COMPONENTS — TITLE AND CONTENT
 * ============================================================================
 *
 * The compound family now has four members accessible via dot notation:
 *   - <Accordion>          — the <ul> wrapper + context provider
 *   - <Accordion.Item>     — a <li> shell (no longer handles toggling)
 *   - <Accordion.Title>    — the clickable heading (handles toggleItem)
 *   - <Accordion.Content>  — the collapsible body (handles open/close)
 *
 * Each Accordion.Item now explicitly contains an Accordion.Title and
 * Accordion.Content as children. The item's id must be passed to BOTH
 * Title and Content so each can independently interact with the context.
 *
 * The title prop is gone — the title text is now children of
 * Accordion.Title, which means consumers can render richer markup
 * (icons, badges, etc.) inside the title, not just a plain string.
 *
 * Each sub-component accepts its own className for independent styling.
 *
 * ============================================================================
 * LESSON 546: id SET ONCE ON ITEM, CONSUMED VIA CONTEXT
 * ============================================================================
 *
 * Previously, the id had to be duplicated on both <Accordion.Title>
 * and <Accordion.Content>. Now the id is set once on <Accordion.Item>,
 * which provides it to Title and Content through AccordionItemContext.
 * This eliminates redundancy and prevents mismatched id bugs.
 *
 * ============================================================================
 * LESSON 547: SEARCHABLE LIST — SETTING THE STAGE FOR RENDER PROPS
 * ============================================================================
 *
 * A new SearchableList component is introduced alongside the Accordion.
 * Its purpose is to encapsulate search/filter LOGIC while remaining
 * agnostic about HOW individual items should be rendered.
 *
 * The same SearchableList is used twice here with different data:
 *   1. PLACES — an array of objects (id, image, title, description)
 *   2. A plain array of strings
 *
 * This highlights the core problem that motivates the render props
 * pattern: the SearchableList needs to work with ANY data shape, so
 * it cannot hardcode the rendering for each item type. Currently it
 * uses a temporary toString() approach (objects show as [object Object]).
 * The render props pattern will solve this in the next lesson by
 * letting the consumer provide a rendering function.
 *
 * ============================================================================
 */

import Accordion from './components/Accordion/Accordion.jsx';
import SearchableList from './components/SearchableList/SearchableList.jsx';
import { PLACES } from './places.js';

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>

        {/* LESSON 542: The compound components pattern in action.
            Accordion provides the <ul> shell and will manage shared state.
            Accordion.Item provides individual <li> sections with custom
            titles and arbitrary body content via children. */}
        <Accordion className="accordion">
          {/* LESSON 546: id is set once on Accordion.Item and flows
              to Title and Content via AccordionItemContext. No need to
              repeat it on each sub-component. */}
          <Accordion.Item id="experience" className="accordion-item">
            <Accordion.Title className="accordion-item-title">
              We got 20 years of experience
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>You can&apos;t go wrong with us.</p>
                <p>
                  We are in the business of planning highly individualized
                  vacation trips for more than 20 years.
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="local-guides" className="accordion-item">
            <Accordion.Title className="accordion-item-title">
              We&apos;re working with local guides
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>We are not doing this alone from our office.</p>
                <p>
                  Instead, we are working with local guides to ensure a safe
                  and pleasant vacation.
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>

      {/* LESSON 547: Two SearchableList instances with different data
          shapes — PLACES (array of objects) and a plain string array.
          This demonstrates why we need render props: the component
          handles search logic but can't know how to render each type. */}
      <section>
        <SearchableList items={PLACES} />
        <SearchableList items={['city', 'beach', 'mountains', 'forest', 'desert']} />
      </section>
    </main>
  );
}

export default App;
