/**
 * ============================================================================
 * src/components/SearchableList/SearchableList.jsx - LESSONS 547 & 548
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
 * STILL TEMPORARY — RENDERING:
 *
 * The items are still rendered with toString() and index keys. The
 * search logic works (filtering is correct), but the output is still
 * not useful for complex objects. The render props pattern in the
 * next lesson will solve this by letting the consumer control
 * how each filtered item is displayed.
 *
 * ============================================================================
 */

import { useState } from 'react';

export default function SearchableList({ items }) {
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
        {/* LESSON 548: Now mapping over searchResults (filtered) instead
            of the raw items array. Rendering is still temporary —
            toString() and index keys will be replaced by render props. */}
        {searchResults.map((item, index) => (
          <li key={index}>{item.toString()}</li>
        ))}
      </ul>
    </div>
  );
}
