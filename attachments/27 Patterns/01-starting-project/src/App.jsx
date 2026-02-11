/**
 * ============================================================================
 * src/App.jsx - LESSONS 540, 541, 542 & 543
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
 * Notice the structure: <Accordion> wraps multiple <AccordionItem>
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
 */

import Accordion from './components/Accordion/Accordion.jsx';
import AccordionItem from './components/Accordion/AccordionItem.jsx';

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>

        {/* LESSON 542: The compound components pattern in action.
            Accordion provides the <ul> shell and will manage shared state.
            AccordionItem provides individual <li> sections with custom
            titles and arbitrary body content via children. */}
        <Accordion className="accordion">
          {/* LESSON 543: Each AccordionItem needs a unique id so the
              context can track which one is open. The id is compared
              against openItemId in the shared context. */}
          <AccordionItem
            id="experience"
            className="accordion-item"
            title="We got 20 years of experience"
          >
            <article>
              <p>You can&apos;t go wrong with us.</p>
              <p>
                We are in the business of planning highly individualized
                vacation trips for more than 20 years.
              </p>
            </article>
          </AccordionItem>

          <AccordionItem
            id="local-guides"
            className="accordion-item"
            title="We're working with local guides"
          >
            <article>
              <p>We are not doing this alone from our office.</p>
              <p>
                Instead, we are working with local guides to ensure a safe
                and pleasant vacation.
              </p>
            </article>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}

export default App;
