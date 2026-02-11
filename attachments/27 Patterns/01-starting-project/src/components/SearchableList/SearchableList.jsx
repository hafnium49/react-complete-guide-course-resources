/**
 * ============================================================================
 * src/components/SearchableList/SearchableList.jsx - LESSONS 547, 548, 549, 550 & 551
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
 * LESSON 550: DYNAMIC KEYS VIA A KEY FUNCTION PROP
 * ============================================================================
 *
 * THE INDEX KEY PROBLEM:
 *
 * Using the array index as a React key is fragile — it's not tied to
 * the data itself. If items are reordered, filtered, or removed, the
 * index no longer reliably identifies the same item across renders.
 * React may reuse DOM nodes incorrectly, leading to subtle UI bugs.
 *
 * WHY item.id WON'T WORK HERE:
 *
 * SearchableList is data-shape-agnostic: it works with objects that
 * have an id property AND with plain strings that have no properties
 * at all. Hardcoding item.id as the key would break for non-object
 * items. The component cannot assume any particular data structure.
 *
 * THE itemKeyFn PROP — A FUNCTION FOR KEY GENERATION:
 *
 * The same pattern used for rendering (children as a function) is
 * applied here for key generation. An itemKeyFn prop receives a
 * function from the consumer. SearchableList calls itemKeyFn(item)
 * for each item to get a unique, stable key. The consumer knows the
 * data shape, so it can return item.id for objects or the item
 * itself for strings. This extends the render props philosophy:
 * the component handles the iteration, the consumer handles the
 * data-specific logic.
 *
 * ============================================================================
 * LESSON 551: DEBOUNCING — DELAYING STATE UPDATES UNTIL TYPING PAUSES
 * ============================================================================
 *
 * WHAT IS DEBOUNCING:
 *
 * Debouncing is a general front-end technique (not React-specific) that
 * prevents a function from firing on every rapid event (like keystrokes).
 * Instead of updating state on every single character typed, debouncing
 * waits until the user STOPS typing for a defined threshold (e.g., 500ms)
 * before applying the update. This avoids redundant intermediate updates.
 *
 * WHY DEBOUNCE HERE:
 *
 * In this demo with simple local data, updating on every keystroke is
 * fine. But in real apps, each state update might trigger expensive
 * operations: complex filtering, HTTP requests, heavy re-renders. If
 * the user types "african" (7 characters), without debouncing that's
 * 7 separate filter operations. With debouncing, it's just one — after
 * the user finishes typing.
 *
 * IMPLEMENTATION WITH setTimeout + useRef:
 *
 * The approach uses two built-in browser/React tools:
 *
 *   1. setTimeout: Delays the state update by the threshold duration.
 *      It returns a timer ID that can be used to cancel it later.
 *
 *   2. useRef (lastChange): Stores the timer ID between renders without
 *      triggering re-renders. A ref is ideal here because:
 *        - State would cause unwanted re-renders when storing the timer
 *        - A plain variable would be lost on each render cycle
 *        - A ref persists across renders and is mutable via .current
 *
 * THE DEBOUNCE FLOW:
 *
 *   1. User types a character → handleChange fires
 *   2. If a previous timer exists (lastChange.current is truthy),
 *      cancel it with clearTimeout — the previous pending update is
 *      discarded because the user is still actively typing
 *   3. Start a new setTimeout with the latest input value, storing
 *      the new timer ID in lastChange.current
 *   4. If the user types again before 500ms, step 2 cancels this timer
 *      and step 3 creates a fresh one (the cycle repeats)
 *   5. Once the user stops typing and 500ms elapse, the timer callback
 *      finally executes: it updates searchTerm state and clears the
 *      ref (sets lastChange.current to null)
 *
 * CLEARING THE REF AFTER EXPIRY:
 *
 * Inside the setTimeout callback, lastChange.current is set to null
 * after the state update. This is necessary because the ref does not
 * automatically know the timer has expired — it would still hold the
 * old (now-irrelevant) timer ID. Without clearing it, the if check
 * at the top of handleChange would always find a truthy value and
 * call clearTimeout on an already-expired timer (harmless but wasteful
 * and semantically incorrect).
 *
 * ============================================================================
 */

import { useRef, useState } from 'react';

// LESSON 549: children is destructured alongside items because it will be
// called as a function — not rendered as static markup. This is the
// "render prop" that the consumer provides to control item rendering.
// LESSON 550: itemKeyFn is another function prop — called with each item to
// produce a unique, data-derived key. This replaces the fragile index key.
export default function SearchableList({ items, children, itemKeyFn }) {
  // LESSON 548: State to track the current search input value.
  const [searchTerm, setSearchTerm] = useState('');

  // LESSON 551: A ref to hold the currently scheduled timer ID. Using a ref
  // (not state) because changing the timer ID should NOT trigger a re-render.
  // A plain variable wouldn't work either — it would reset on every render.
  const lastChange = useRef();

  // LESSON 551: handleChange no longer updates state directly. Instead it
  // uses debouncing: cancel any pending timer, then schedule a new one.
  function handleChange(event) {
    // LESSON 551: If a timer from a previous keystroke is still pending,
    // cancel it — the user is still typing, so we discard that update.
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    // LESSON 551: Schedule a new state update after the debounce threshold.
    // The timer ID is stored in the ref so it can be canceled by the next
    // keystroke. 500ms means: "only update if the user pauses for half a second."
    lastChange.current = setTimeout(() => {
      // LESSON 551: Clear the ref after the timer expires. Without this,
      // the ref would still hold a stale timer ID, and the if-check above
      // would needlessly call clearTimeout on an already-expired timer.
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
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
        {/* LESSON 550: itemKeyFn(item) replaces the index key. The consumer
            provides this function, so it can return item.id for objects or
            the item itself for strings — whatever uniquely identifies each
            item in the consumer's specific data shape. */}
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
