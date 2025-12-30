/**
 * ============================================================================
 * LESSON 275: OPINIONS COMPONENT - REACT 19's use() HOOK
 * ============================================================================
 *
 * This component displays a list of all opinions fetched from the backend.
 * It demonstrates React 19's new 'use()' hook for consuming Context, which
 * is a more modern alternative to the useContext hook.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Using React 19's new 'use()' hook to consume Context
 * 2. Conditional rendering based on data loading state
 * 3. Rendering lists of components in React
 * 4. Proper use of the 'key' prop when mapping arrays
 *
 * REACT 19 FEATURE: use() HOOK
 * =============================
 * The 'use()' hook is a new React 19 feature that can:
 * - Consume Context (replacing useContext)
 * - Unwrap Promises (for async data fetching)
 * - Be called conditionally (unlike other hooks)
 *
 * In this component, we use it to consume the OpinionsContext.
 *
 * COMPARISON: use() vs useContext
 * ================================
 *
 * OLD WAY (React 18 with useContext):
 * -----------------------------------
 * import { useContext } from 'react';
 * const { opinions } = useContext(OpinionsContext);
 *
 * NEW WAY (React 19 with use):
 * ----------------------------
 * import { use } from 'react';
 * const { opinions } = use(OpinionsContext);
 *
 * Why use() is better:
 * - More flexible (can be used conditionally, inside loops, etc.)
 * - Can unwrap Promises directly
 * - Part of React's future direction
 * - Cleaner syntax for consuming multiple contexts
 *
 * COMPONENT ARCHITECTURE:
 * =======================
 * This component is a "presentational" component that:
 * - Gets data from Context (doesn't manage state itself)
 * - Renders the UI based on that data
 * - Delegates rendering of individual opinions to the Opinion component
 *
 * This separation of concerns makes the code easier to:
 * - Understand (each component has one clear purpose)
 * - Test (can test opinion display logic separately)
 * - Maintain (changes to individual opinion UI don't affect the list)
 */

import { use } from 'react';

import { Opinion } from './Opinion';
import { OpinionsContext } from '../store/opinions-context';

/**
 * OPINIONS COMPONENT
 * ==================
 * Displays the list of all opinions, or a message if no opinions exist.
 *
 * DATA FLOW:
 * ----------
 * 1. This component is wrapped by OpinionsContextProvider (in App.jsx)
 * 2. The provider fetches opinions from the backend on mount
 * 3. This component accesses that data via use(OpinionsContext)
 * 4. When the data updates, this component re-renders automatically
 *
 * RENDERING STATES:
 * -----------------
 * This component handles two states:
 * 1. opinions is truthy (array with data) → Show the list of opinions
 * 2. opinions is falsy (undefined/null) → Show "no opinions" message
 *
 * Note: We don't explicitly show a "loading" state here. The opinions start
 * as undefined and remain that way until the backend fetch completes. During
 * that time, the "No opinions found" message is shown, which serves as both
 * a loading indicator and an empty state message.
 */
export function Opinions() {
  /**
   * CONSUMING CONTEXT WITH use() HOOK
   * ==================================
   * Here we use React 19's new 'use()' hook to consume the OpinionsContext.
   *
   * WHAT HAPPENS HERE:
   * ------------------
   * 1. use(OpinionsContext) accesses the context value provided by
   *    OpinionsContextProvider in App.jsx
   *
   * 2. It returns the contextValue object from opinions-context.jsx:
   *    {
   *      opinions: array | undefined,
   *      addOpinion: function,
   *      upvoteOpinion: function,
   *      downvoteOpinion: function
   *    }
   *
   * 3. We destructure to extract only what we need: { opinions }
   *
   * 4. We ignore addOpinion, upvoteOpinion, and downvoteOpinion because
   *    this component only needs to DISPLAY opinions, not modify them.
   *
   * OBJECT DESTRUCTURING:
   * ---------------------
   * const { opinions } = use(OpinionsContext);
   *
   * This is shorthand for:
   * const contextValue = use(OpinionsContext);
   * const opinions = contextValue.opinions;
   *
   * Destructuring is cleaner and makes it clear what data we're using.
   *
   * RE-RENDERING BEHAVIOR:
   * ----------------------
   * This component will re-render whenever the opinions state in the
   * Context Provider changes:
   * - When opinions are initially loaded from backend
   * - When a new opinion is added
   * - When an opinion's vote count changes
   *
   * React automatically subscribes to context changes, so we don't need
   * to manually set up any listeners.
   *
   * WHY use() INSTEAD OF useContext?
   * --------------------------------
   * Both work, but use() is React 19's newer, more flexible API:
   * - Can be called conditionally (useContext cannot)
   * - Can unwrap Promises (useContext cannot)
   * - Aligns with React's future direction
   * - Syntax is slightly cleaner
   */
  const { opinions } = use(OpinionsContext);

  /**
   * COMPONENT RENDER
   * ================
   * We render different UI based on whether opinions data exists.
   */
  return (
    <div id="opinions">
      <h2>User Opinions</h2>

      {/*
        CONDITIONAL RENDERING: WHEN OPINIONS EXIST
        ===========================================
        This block renders when opinions is a truthy value (an array with data).

        TRUTHY CHECK:
        -------------
        opinions && (...)

        This works because:
        - undefined && (...) → false, so nothing renders
        - [] && (...) → renders (empty array is truthy)
        - [{ opinion1 }, ...] && (...) → renders

        If opinions is undefined (initial state, before backend fetch completes),
        this entire block is skipped and nothing from it is rendered.

        ALTERNATIVE APPROACHES:
        -----------------------
        We could also write this as:
        - opinions?.length > 0 && (...)  // Only render if array has items
        - opinions !== undefined && (...)  // Explicit undefined check
        - if (opinions) return <ul>...</ul>  // Early return pattern

        The current approach is clean and idiomatic React.
      */}
      {opinions && (
        <ul>
          {/*
            RENDERING A LIST: Array.map()
            ==============================
            We use the map() method to transform our array of opinion objects
            into an array of React elements.

            MAP EXPLANATION:
            ----------------
            opinions.map((o) => (...))

            For each opinion object 'o' in the opinions array, we return a
            <li> element containing an Opinion component.

            Example:
            If opinions = [
              { id: '1', title: 'React is great', ... },
              { id: '2', title: 'I love Vue', ... }
            ]

            Then map() produces:
            [
              <li key="1"><Opinion opinion={{ id: '1', ... }} /></li>,
              <li key="2"><Opinion opinion={{ id: '2', ... }} /></li>
            ]

            React then renders these elements in order.

            THE KEY PROP:
            =============
            key={o.id}

            The 'key' prop is CRUCIAL for React's rendering performance.

            Why keys are important:
            -----------------------
            1. IDENTITY: Keys tell React which items are which, even if they
               move positions in the array.

            2. PERFORMANCE: Without keys, React has to re-render every item
               when the array changes. With keys, React can reuse existing
               DOM elements for items that haven't changed.

            3. STATE PRESERVATION: If Opinion components had internal state,
               keys would ensure that state is maintained with the correct
               opinion, even if opinions are reordered.

            4. AVOIDING BUGS: Without keys (or with index as key), you can
               get subtle bugs where the wrong data is associated with the
               wrong component after array mutations.

            KEY REQUIREMENTS:
            -----------------
            - Must be unique among siblings (o.id is perfect - it's unique)
            - Should be stable (same opinion = same key every render)
            - Should not use array index (array index can change on reorder)

            GOOD KEY: key={o.id}  ✓
            BAD KEY: key={index}  ✗ (can cause bugs)
            BAD KEY: key={Math.random()}  ✗ (new key every render)

            OPINION PROP:
            =============
            <Opinion opinion={o} />

            We pass the entire opinion object as a prop to the Opinion component.
            The Opinion component will use this data to display:
            - Opinion title
            - Opinion body/content
            - Username of who shared it
            - Current vote count
            - Upvote/downvote buttons

            Passing the whole object (instead of individual props) is convenient
            when a component needs most/all properties of an object.
          */}
          {opinions.map((o) => (
            <li key={o.id}>
              <Opinion opinion={o} />
            </li>
          ))}
        </ul>
      )}

      {/*
        CONDITIONAL RENDERING: WHEN NO OPINIONS EXIST
        ==============================================
        This block renders when opinions is falsy (undefined, null, or empty).

        FALSY CHECK:
        ------------
        !opinions

        This evaluates to true when:
        - opinions is undefined (initial state, before fetch completes)
        - opinions is null (if we explicitly set it to null)
        - opinions is false (not used in our app)

        It does NOT render when:
        - opinions is [] (empty array is truthy in JavaScript)
        - opinions is [{ ... }] (array with items is truthy)

        EMPTY ARRAY CONSIDERATION:
        --------------------------
        Note: If the backend returns an empty array [], this message won't
        show. The ul will render but with no li items inside it.

        If you want to show this message for empty arrays too, you could write:
        {(!opinions || opinions.length === 0) && (
          <p>No opinions found...</p>
        )}

        DUAL PURPOSE MESSAGE:
        ---------------------
        This message serves two purposes:
        1. LOADING STATE: Shows while opinions are being fetched (opinions is undefined)
        2. EMPTY STATE: Shows if no opinions exist (though currently won't show
           for empty array)

        A more sophisticated app might distinguish these states:
        - Show "Loading..." while fetching
        - Show "No opinions yet" when loaded but empty
        - Show error message if fetch failed

        ENCOURAGING USER ACTION:
        ------------------------
        "Maybe share your opinion on something?"

        This message encourages users to submit their own opinion, making the
        app more interactive and helping to populate the empty state.
      */}
      {!opinions && (
        <p>No opinions found. Maybe share your opinion on something?</p>
      )}
    </div>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. REACT 19 use() HOOK: The new way to consume Context in React 19.
 *    More flexible than useContext and aligns with React's future.
 *
 * 2. LIST RENDERING: Use array.map() to transform data arrays into React
 *    elements. Always provide a unique, stable 'key' prop.
 *
 * 3. CONDITIONAL RENDERING: Use && operator for simple conditional rendering.
 *    {condition && <Element />} only renders when condition is truthy.
 *
 * 4. COMPONENT COMPOSITION: Break UI into smaller components (Opinion) that
 *    can be reused and tested independently.
 *
 * 5. DATA FLOW: Child components consume data from Context without prop
 *    drilling. Context updates cause automatic re-renders.
 *
 * KEY PROP IMPORTANCE:
 * ====================
 * Always use unique, stable keys when rendering lists:
 * ✓ DO: key={item.id} (unique identifier from data)
 * ✗ DON'T: key={index} (can cause bugs when array changes)
 * ✗ DON'T: key={Math.random()} (different every render)
 *
 * use() HOOK ADVANTAGES:
 * ======================
 * Compared to useContext:
 * - Can be called conditionally
 * - Can unwrap Promises
 * - More flexible placement in code
 * - Cleaner syntax for multiple contexts
 *
 * COMPONENT RESPONSIBILITY:
 * =========================
 * This component has ONE clear job: Display the list of opinions.
 * - It doesn't fetch data (Context Provider does that)
 * - It doesn't handle form submission (NewOpinion does that)
 * - It doesn't implement voting UI (Opinion does that)
 *
 * This single responsibility makes the component easy to understand,
 * test, and maintain.
 *
 * NEXT STEPS:
 * ===========
 * In future lessons, we'll:
 * - Add loading states to show progress while fetching
 * - Handle errors from failed backend requests
 * - Implement pagination for large lists of opinions
 * - Add filtering and sorting options
 */
