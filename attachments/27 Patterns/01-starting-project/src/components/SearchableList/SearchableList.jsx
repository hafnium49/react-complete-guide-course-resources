/**
 * ============================================================================
 * src/components/SearchableList/SearchableList.jsx - LESSONS 547, 548 & 549
 * ============================================================================
 *
 * INTRODUCING THE RENDER PROPS PATTERN — MOTIVATION:
 *
 * The render props pattern addresses a common challenge: building a
 * component that encapsulates complex LOGIC (like searching, sorting,
 * pagination) without dictating how the RESULTS should be rendered.
 *
 * This SearchableList component is the perfect candidate. It:
 *   - Accepts an array of items via the `items` prop
 *   - Provides a search input for filtering those items
 *   - Contains the search/filtering logic
 *
 * But it should NOT decide what each item looks like when rendered.
 * The same SearchableList might be used to display place objects
 * (with images, titles, descriptions) or simple strings. Hardcoding
 * the rendering here would tie the logic to a specific data shape.
 *
 * THE RENDER PROPS CONCEPT:
 *
 * The pattern works by passing a FUNCTION as a prop (typically via
 * the children prop). This function:
 *   1. Receives an item as its argument
 *   2. Returns renderable JSX for that item
 *
 * The component calls this function for each item, getting back the
 * JSX to display. This way, the component owns the logic, and the
 * consumer owns the rendering.
 *
 * ============================================================================
 * LESSON 548: SEARCH LOGIC — STATE + FILTERING
 * ============================================================================
 *
 * SEARCH STATE:
 *
 * A searchTerm state (initially empty string) tracks what the user
 * has typed. The input's onChange handler updates this state on every
 * keystroke via event.target.value.
 *
 * DERIVED SEARCH RESULTS:
 *
 * Rather than storing filtered results in a separate state (which
 * would require syncing two states), the search results are DERIVED
 * on each render by filtering the items array. This is the standard
 * React pattern: compute values from existing state rather than
 * duplicating state.
 *
 * FILTERING APPROACH:
 *
 * The filter logic uses JSON.stringify(item) to convert each item
 * (whether a string, object, or anything else) into a searchable
 * text representation. Both the stringified item and the search term
 * are lowercased for case-insensitive matching, then tested with
 * .includes(). This is a simple but universal approach — it works
 * with any data shape without needing to know the object's structure.
 *
 * ============================================================================
 * LESSON 549: IMPLEMENTING THE RENDER PROPS PATTERN
 * ============================================================================
 *
 * CHILDREN AS A FUNCTION:
 *
 * The children prop is destructured from props, but instead of being
 * rendered as static JSX markup, it is CALLED AS A FUNCTION for each
 * item in the filtered results. This is the heart of render props:
 *   children(item) → JSX for that specific item
 *
 * This works because React can render whatever a function returns, as
 * long as the return value is valid JSX. The component iterates over
 * searchResults, and for each item it invokes children(item), which
 * produces the concrete markup the consumer defined.
 *
 * WHY A FUNCTION AND NOT PLAIN MARKUP:
 *
 * If children were plain JSX (e.g., <Place />), the same identical
 * markup would appear for every list item — no way to vary the content
 * per item. By making children a function that receives the current
 * item, each invocation can return different JSX tailored to that
 * item's data. The component controls WHEN and WITH WHAT the function
 * is called; the consumer controls WHAT it returns.
 *
 * THE CONSUMER'S RESPONSIBILITY:
 *
 * The consumer passes a function between the opening and closing
 * <SearchableList> tags. That function receives the item argument
 * (forwarded by this component) and returns the JSX to render —
 * for example, a <Place> component for objects, or a plain string
 * for simple text items. Different consumers can provide completely
 * different rendering functions for the same SearchableList.
 *
 * ============================================================================
 */

import { useState } from 'react';

// LESSON 549: children is destructured alongside items because it will be
// called as a function — not rendered as static markup. This is the
// "render prop" that the consumer provides to control item rendering.
export default function SearchableList({ items, children }) {
  // LESSON 548: State to track the current search input value.
  const [searchTerm, setSearchTerm] = useState('');

  // LESSON 548: Update state on every keystroke in the search input.
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  // LESSON 548: Derived data — filter items based on the search term.
  // JSON.stringify converts any item (string or object) into a searchable
  // text representation. Both sides are lowercased for case-insensitive
  // matching. This avoids needing to know the item's internal structure.
  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="searchable-list">
      {/* LESSON 548: Controlled-ish input — onChange fires handleChange
          on every keystroke, updating the searchTerm state which triggers
          a re-render with new filtered results. */}
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {/* LESSON 549: For each filtered result, children is invoked as
            a function with the current item. The consumer's function
            returns the JSX to display — this component never needs to
            know the item's shape or how it should look. */}
        {searchResults.map((item, index) => (
          <li key={index}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
