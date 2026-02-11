/**
 * ============================================================================
 * src/components/SearchableList/SearchableList.jsx - LESSON 547
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
 * CURRENT STATE (TEMPORARY):
 *
 * For now, items are rendered with a simple .map() that calls
 * item.toString(). This is a placeholder — the render props pattern
 * will replace this in an upcoming lesson so the consumer controls
 * how each item appears. The index is used as a temporary key (not
 * ideal, but sufficient until the rendering is refined).
 *
 * ============================================================================
 */

export default function SearchableList({ items }) {
  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" />
      <ul>
        {/* LESSON 547: Temporary rendering — toString() handles both
            strings and objects (though objects display as [object Object]).
            The index key is also temporary. Both will be replaced once
            the render props pattern is applied. */}
        {items.map((item, index) => (
          <li key={index}>{item.toString()}</li>
        ))}
      </ul>
    </div>
  );
}
