/**
 * ============================================================================
 * LESSON 275: OPINION COMPONENT - DISPLAYING & VOTING ON OPINIONS
 * ============================================================================
 *
 * This component displays a single opinion along with voting buttons to
 * upvote or downvote it. It demonstrates component composition, props
 * destructuring, and sets up the structure for Form Actions on buttons.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Nested object destructuring in function parameters
 * 2. Semantic HTML for content structure (article, header, etc.)
 * 3. Using forms and buttons for actions (even single buttons)
 * 4. Displaying dynamic data from props
 * 5. SVG icons in React components
 *
 * CURRENT STATE (LESSON 275):
 * ===========================
 * In this introductory lesson, the vote buttons are non-functional:
 * - They don't have action handlers
 * - Clicking them does nothing (yet)
 * - The vote count is display-only
 *
 * WHAT'S COMING IN FUTURE LESSONS:
 * =================================
 * We'll enhance this component to:
 * 1. Use Form Actions on the vote buttons
 * 2. Call upvoteOpinion/downvoteOpinion from Context
 * 3. Show optimistic updates (instant vote count changes)
 * 4. Possibly show loading states during voting
 * 5. Handle vote persistence to backend
 *
 * COMPONENT ARCHITECTURE:
 * =======================
 * This is a "presentational" component that:
 * - Receives opinion data via props
 * - Displays that data in a structured format
 * - Provides UI for voting (buttons)
 * - Will integrate with Context for vote functionality
 *
 * SEMANTIC HTML:
 * ==============
 * This component uses semantic HTML elements:
 * - <article>: Independent, self-contained content
 * - <header>: Introductory content (title, author)
 * - <h3>: Section heading (opinion title)
 * - <form>: Groups related buttons (vote actions)
 *
 * Why semantic HTML matters:
 * - Screen readers can navigate by landmarks
 * - Search engines understand content structure
 * - Developers can understand code faster
 * - CSS can target elements more meaningfully
 */

/**
 * OPINION COMPONENT
 * =================
 * Displays a single opinion with its metadata and voting controls.
 *
 * PROPS:
 * ------
 * @param {Object} props
 * @param {Object} props.opinion - The opinion data object
 * @param {string} props.opinion.id - Unique identifier
 * @param {string} props.opinion.title - Opinion title
 * @param {string} props.opinion.body - Opinion content
 * @param {string} props.opinion.userName - Author's name
 * @param {number} props.opinion.votes - Current vote count
 *
 * NESTED DESTRUCTURING EXPLANATION:
 * ==================================
 * Look at the function parameter:
 * function Opinion({ opinion: { id, title, body, userName, votes } })
 *
 * This is "nested destructuring" - we're destructuring in two levels:
 *
 * LEVEL 1: Destructure props
 * { opinion } extracts the opinion prop from the props object
 *
 * LEVEL 2: Destructure opinion
 * { id, title, body, userName, votes } extracts these properties from opinion
 *
 * WITHOUT DESTRUCTURING:
 * ----------------------
 * function Opinion(props) {
 *   const opinion = props.opinion;
 *   const id = opinion.id;
 *   const title = opinion.title;
 *   const body = opinion.body;
 *   const userName = opinion.userName;
 *   const votes = opinion.votes;
 *   // ... use id, title, body, etc.
 * }
 *
 * WITH SINGLE-LEVEL DESTRUCTURING:
 * --------------------------------
 * function Opinion({ opinion }) {
 *   const { id, title, body, userName, votes } = opinion;
 *   // ... use id, title, body, etc.
 * }
 *
 * WITH NESTED DESTRUCTURING (what we have):
 * ------------------------------------------
 * function Opinion({ opinion: { id, title, body, userName, votes } }) {
 *   // Variables id, title, body, userName, votes are directly available
 * }
 *
 * BENEFITS OF NESTED DESTRUCTURING:
 * ----------------------------------
 * ✓ More concise (one line instead of multiple)
 * ✓ Makes it clear what data the component uses
 * ✓ No need to reference opinion.title, just use title
 * ✓ Self-documenting (shows the opinion object structure)
 *
 * POTENTIAL DRAWBACKS:
 * --------------------
 * ✗ Can be confusing for beginners
 * ✗ Deeply nested destructuring can be hard to read
 * ✗ Can't access the full opinion object if needed
 *
 * WHEN TO USE NESTED DESTRUCTURING:
 * ----------------------------------
 * - When you use most/all properties of the nested object
 * - When the nesting is only 1-2 levels deep
 * - When you don't need the parent object
 *
 * In our case, we use all 5 properties of opinion and don't need the
 * opinion object itself, so nested destructuring is a good choice.
 */
export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  /**
   * COMPONENT RENDER
   * ================
   * We render the opinion in a structured, semantic layout.
   */
  return (
    /**
     * ARTICLE ELEMENT
     * ===============
     * <article> is a semantic HTML element that represents a self-contained
     * composition that could be independently distributed or reused.
     *
     * Perfect for:
     * - Blog posts
     * - Forum posts
     * - News articles
     * - User comments
     * - Product cards
     * - Social media posts
     *
     * Our opinion fits this definition - it's a complete, standalone piece
     * of content that makes sense on its own.
     *
     * BENEFITS OF <article>:
     * ----------------------
     * - Screen readers can identify and navigate to articles
     * - Search engines understand this is main content (not navigation/ads)
     * - RSS readers can extract article elements
     * - Clear semantic meaning for developers
     *
     * ALTERNATIVE:
     * ------------
     * We could use <div>, but it has no semantic meaning:
     * <div> ← Just a container, no meaning
     * <article> ← "This is an independent piece of content"
     */
    <article>
      {/*
        HEADER ELEMENT
        ==============
        <header> represents introductory content for its parent (the article).

        NOT THE SAME AS <head>:
        -----------------------
        <head> ← Document metadata (in HTML, not React)
        <header> ← Section introduction (what we use here)

        Inside an article's header, we typically include:
        - Title or heading
        - Author information
        - Publication date
        - Category/tags
        - Metadata

        In our case, we show:
        - Opinion title
        - Author's name

        MULTIPLE HEADERS:
        -----------------
        You can have multiple <header> elements on a page:
        - One for the main page header (nav, logo)
        - One for each article
        - One for each section

        Each header provides context for its parent element.
      */}
      <header>
        {/*
          OPINION TITLE
          =============
          <h3> is a third-level heading.

          HEADING LEVELS:
          ---------------
          <h1> - Main page title (usually one per page)
          <h2> - Major section titles (like "User Opinions")
          <h3> - Subsection titles (like individual opinion titles)
          <h4-h6> - Further sub-levels (less common)

          WHY H3?
          -------
          In our app, the heading hierarchy is:
          <h1> - App title (in Header component)
          <h2> - Section titles ("User Opinions", "Share your opinion!")
          <h3> - Individual opinion titles (this)

          This creates a logical outline:
          1. App Title
             1.1. Share your opinion!
             1.2. User Opinions
                 1.2.1. Opinion 1 Title ← We are here
                 1.2.2. Opinion 2 Title
                 ...

          HEADING HIERARCHY IMPORTANCE:
          -----------------------------
          - Screen readers use headings for navigation
          - Users can jump between headings with shortcuts
          - Search engines use heading structure for SEO
          - Should not skip levels (h1→h3 without h2 is bad)

          DISPLAYING THE TITLE:
          ---------------------
          {title}

          This is a JSX expression that outputs the title variable.
          Remember, title came from destructuring the opinion prop.

          If title = "React is amazing", this renders:
          <h3>React is amazing</h3>
        */}
        <h3>{title}</h3>

        {/*
          AUTHOR INFORMATION
          ==================
          A paragraph showing who shared this opinion.

          TEXT WITH DYNAMIC DATA:
          -----------------------
          "Shared by {userName}"

          This combines static text ("Shared by ") with dynamic data (userName).

          Example:
          If userName = "Alice", this renders:
          <p>Shared by Alice</p>

          ALTERNATIVE APPROACHES:
          -----------------------
          Could also be written as:
          - <p>By {userName}</p> (shorter)
          - <p>Author: {userName}</p> (more formal)
          - <p className="author">{userName}</p> (just the name)

          The current approach is friendly and clear about the relationship
          (this person shared/created this opinion).
        */}
        <p>Shared by {userName}</p>
      </header>

      {/*
        OPINION BODY
        ============
        The main content of the opinion - the full text.

        {body}

        This outputs the body variable (from opinion prop destructuring).

        WHY A PARAGRAPH?
        ----------------
        <p> is the semantic element for paragraphs of text.
        Even if the body is multiple sentences or short, <p> is appropriate.

        If the body could contain multiple paragraphs, you might render it as:
        <div dangerouslySetInnerHTML={{ __html: body }} />
        or parse it and create multiple <p> elements.

        But for our simple case, a single <p> is fine.

        TEXT FORMATTING:
        ----------------
        Any text in body will be displayed as-is:
        - Line breaks in the text won't create <br> elements
        - HTML tags in the text won't be parsed (they'll show as text)
        - Whitespace will be collapsed

        If you need to preserve formatting, you could use:
        - <pre> element (preserves whitespace/line breaks)
        - CSS: white-space: pre-wrap
        - Markdown parser (convert markdown to HTML)
      */}
      <p>{body}</p>

      {/*
        VOTING FORM
        ===========
        A form that contains the upvote and downvote buttons.

        WHY A FORM FOR BUTTONS?
        -----------------------
        You might wonder: "Why wrap buttons in a <form>? Can't we just have
        buttons directly?"

        Yes, we could, but using a form provides benefits:

        1. SEMANTIC GROUPING: The form shows these buttons are related actions
        2. FORM ACTIONS: In future lessons, we can add action={handleVote}
        3. STYLING: Easy to style related buttons together
        4. ACCESSIBILITY: Screen readers understand this is an action group

        FORM WITHOUT ACTION:
        --------------------
        <form className="votes">

        Right now, this form has no action prop. The buttons inside won't
        submit the form because they don't have type="submit".

        WHAT'S COMING:
        --------------
        In future lessons, we might refactor this to use Form Actions:
        - Create separate forms for upvote/downvote, each with an action
        - Or use a single form with different button names/values
        - Connect to upvoteOpinion/downvoteOpinion from Context

        THE "votes" CLASS:
        ------------------
        className="votes"

        This CSS class likely styles the form to:
        - Display buttons horizontally (flexbox/grid)
        - Add spacing between buttons and vote count
        - Style the vote display area

        CSS might look like:
        .votes {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      */}
      <form className="votes">
        {/*
          UPVOTE BUTTON
          =============
          A button to increase the vote count for this opinion.

          BUTTON WITHOUT TYPE:
          --------------------
          <button>

          Notice we don't specify type="submit" or type="button".
          Inside a form:
          - Default type is "submit"
          - But we don't have a form action yet, so it does nothing

          This is OK for now since the button is non-functional in this lesson.
          In future lessons, we'll add proper type and functionality.

          ICON-ONLY BUTTON:
          -----------------
          This button contains only an SVG icon, no text.

          ACCESSIBILITY CONCERN:
          ----------------------
          Icon-only buttons can be problematic for accessibility:
          - Screen readers can't describe what the button does
          - Users might not understand the icon's meaning

          SOLUTIONS:
          ----------
          We should add one of these:
          1. aria-label="Upvote" (for screen readers)
          2. <span className="sr-only">Upvote</span> (visually hidden text)
          3. title="Upvote" (shows tooltip on hover)

          Example:
          <button type="button" aria-label="Upvote this opinion">
            <svg>...</svg>
          </button>

          We'll add this in future lessons when implementing functionality.

          SVG ICON:
          ---------
          The button contains an SVG (Scalable Vector Graphics) icon.
          SVGs are perfect for icons because:
          - They scale to any size without pixelation
          - Can be styled with CSS (color, stroke, etc.)
          - Small file size
          - Can be animated
        */}
        <button>
          {/*
            SVG ELEMENT - UPVOTE ICON
            =========================
            An SVG icon showing an upward arrow in a box.

            SVG ATTRIBUTES:
            ---------------
            xmlns="http://www.w3.org/2000/svg" - XML namespace (standard)
            width="24" height="24" - Size in pixels
            viewBox="0 0 24 24" - Coordinate system (0-24 on both axes)
            fill="none" - No fill color (just outlines)
            stroke="currentColor" - Outline color matches text color
            strokeWidth="2" - Line thickness
            strokeLinecap="round" - Rounded line ends
            strokeLinejoin="round" - Rounded corners

            WHY currentColor?
            -----------------
            stroke="currentColor"

            This is a special CSS value that means:
            "Use the current text color"

            Benefits:
            - Icon automatically matches surrounding text color
            - Easy to change color with CSS (just set color on button)
            - Responsive to themes (dark mode, etc.)
            - No need to hardcode colors

            Example:
            button { color: blue; } → Icon is blue
            button:hover { color: green; } → Icon turns green on hover

            SVG SHAPES:
            -----------
            This SVG contains two shapes:

            1. <rect> - The box/square
               width="18" height="18" - Size of the box
               x="3" y="3" - Position (centered in 24x24 viewBox)
               rx="2" - Rounded corners (radius of 2)

            2. <path> - The arrow
               "m16 12-4-4-4 4" - Downward V shape (arrow pointing up cap)
               "M12 16V8" - Vertical line (arrow shaft)

            PATH COMMANDS:
            --------------
            SVG paths use letter commands:
            M = Move to (absolute position)
            m = Move to (relative position)
            L = Line to
            V = Vertical line
            H = Horizontal line

            The arrow is drawn with:
            - Move to (16,12), line to (12,8), line to (8,12) - Makes ^
            - Move to (12,16), vertical line to (12,8) - Makes |

            Together: An up arrow ↑

            ICON SOURCE:
            ------------
            These icons appear to be from a popular icon set like:
            - Lucide Icons
            - Feather Icons
            - Heroicons

            Such icon sets provide consistent, well-designed icons for UIs.
          */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        {/*
          VOTE COUNT DISPLAY
          ==================
          Shows the current number of votes for this opinion.

          {votes}

          This outputs the votes variable (from opinion prop).

          VOTE COUNT BEHAVIOR:
          --------------------
          - Can be positive (more upvotes than downvotes)
          - Can be zero (equal votes or no votes)
          - Can be NEGATIVE (more downvotes than upvotes)

          Example values:
          - 5 → This opinion has 5 net upvotes
          - 0 → Neutral (or no votes yet)
          - -3 → This opinion has 3 net downvotes

          NEGATIVE VOTES:
          ---------------
          Showing negative votes is a design choice:

          Pros:
          - Clearly shows unpopular opinions
          - Full transparency of community sentiment
          - Simple to implement

          Cons:
          - Might discourage users from posting
          - Can create pile-on effects
          - Some platforms hide or floor at 0

          Alternatives:
          - Show separate up/down counts: "5 up, 8 down"
          - Show percentage: "38% upvoted"
          - Floor at 0: Math.max(0, votes)

          SPAN ELEMENT:
          -------------
          <span> is used because:
          - It's inline (doesn't break layout)
          - Neutral semantic meaning
          - Easy to style (color based on value)

          POTENTIAL ENHANCEMENT:
          ----------------------
          We could style based on value:
          <span className={votes > 0 ? 'positive' : votes < 0 ? 'negative' : 'neutral'}>
            {votes}
          </span>

          Then CSS:
          .positive { color: green; }
          .negative { color: red; }
          .neutral { color: gray; }
        */}
        <span>{votes}</span>

        {/*
          DOWNVOTE BUTTON
          ===============
          A button to decrease the vote count for this opinion.

          This follows the exact same structure as the upvote button:
          - <button> element (no type specified yet)
          - SVG icon inside
          - No text (icon-only)

          The only difference is the icon:
          - Upvote: Arrow pointing up ↑
          - Downvote: Arrow pointing down ↓

          SAME ACCESSIBILITY ISSUES:
          --------------------------
          This button also needs:
          - aria-label="Downvote"
          - or title="Downvote"
          - or hidden text explaining the action

          We'll add these in future lessons.
        */}
        <button>
          {/*
            SVG ELEMENT - DOWNVOTE ICON
            ===========================
            An SVG icon showing a downward arrow in a box.

            DIFFERENCES FROM UPVOTE ICON:
            -----------------------------
            Most attributes are the same. Only the <path> elements differ:

            UPVOTE PATH:
            <path d="m16 12-4-4-4 4" /> - ^ shape (cap pointing up)
            <path d="M12 16V8" /> - Vertical line going up

            DOWNVOTE PATH:
            <path d="M12 8v8" /> - Vertical line going down (notice lowercase v)
            <path d="m8 12 4 4 4-4" /> - v shape (cap pointing down)

            Together: A down arrow ↓

            PATH COMMAND DETAILS:
            ---------------------
            "M12 8v8" means:
            - M12 8: Move to absolute position (12, 8)
            - v8: Draw vertical line down by 8 units
            - Result: Line from (12,8) to (12,16)

            "m8 12 4 4 4-4" means:
            - m8 12: Move to relative position +8, +12 from current
            - 4 4: Line to relative position +4, +4
            - 4-4: Line to relative position +4, -4
            - Result: A v shape (downward cap)

            ICON CONSISTENCY:
            -----------------
            Using matching styles for both icons:
            - Same size (24x24)
            - Same stroke width (2)
            - Same box shape
            - Same stroke color (currentColor)

            This creates a cohesive, professional appearance.
          */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. NESTED DESTRUCTURING: We can destructure props in the function parameter,
 *    even nested objects. This makes code more concise when using many props.
 *
 * 2. SEMANTIC HTML: Using elements like <article>, <header>, <h3> provides
 *    meaning to our markup, helping accessibility and SEO.
 *
 * 3. SVG ICONS: SVGs are ideal for icons - scalable, styleable, and small.
 *    Using currentColor makes icons adapt to surrounding text color.
 *
 * 4. FORMS FOR BUTTON GROUPS: Even without submission, forms can semantically
 *    group related buttons and prepare for Form Actions.
 *
 * 5. COMPONENT COMPOSITION: This small, focused component receives data via
 *    props and displays it. It's easy to test and reuse.
 *
 * NESTED DESTRUCTURING PATTERN:
 * ==============================
 * function Component({ parent: { child1, child2 } }) {
 *   // Use child1, child2 directly
 * }
 *
 * Equivalent to:
 * function Component({ parent }) {
 *   const { child1, child2 } = parent;
 * }
 *
 * Or:
 * function Component(props) {
 *   const { child1, child2 } = props.parent;
 * }
 *
 * Use when:
 * ✓ You use most properties of the nested object
 * ✓ Nesting is only 1-2 levels deep
 * ✓ You don't need the parent object
 *
 * Avoid when:
 * ✗ You need the parent object itself
 * ✗ Nesting is very deep (hard to read)
 * ✗ You only use one property (just destructure that one)
 *
 * SVG BEST PRACTICES:
 * ===================
 * ✓ Use viewBox to define coordinate system
 * ✓ Use currentColor for flexible coloring
 * ✓ Set width/height for consistent sizing
 * ✓ Use fill="none" stroke="currentColor" for outline icons
 * ✓ Keep paths simple and readable
 * ✓ Add aria-label for accessibility
 * ✓ Consider using an icon library (Lucide, Heroicons, etc.)
 *
 * ACCESSIBILITY IMPROVEMENTS NEEDED:
 * ==================================
 * Current issues:
 * ✗ Buttons have no accessible labels (icon-only)
 * ✗ Buttons have no type attribute
 * ✗ Buttons have no functionality (non-functional in this lesson)
 *
 * Future improvements:
 * ✓ Add aria-label="Upvote this opinion" to upvote button
 * ✓ Add aria-label="Downvote this opinion" to downvote button
 * ✓ Add type="button" (or type="submit" with form action)
 * ✓ Add keyboard shortcuts (optional)
 * ✓ Add visual feedback on click
 * ✓ Show vote count change animation
 *
 * NEXT STEPS:
 * ===========
 * In upcoming lessons, we'll enhance this component with:
 * 1. Connect to OpinionsContext to access upvote/downvote functions
 * 2. Add click handlers to buttons (or use Form Actions)
 * 3. Add proper button types and aria-labels
 * 4. Implement optimistic updates (instant visual feedback)
 * 5. Add animations for vote changes
 * 6. Show loading states during votes
 * 7. Handle vote errors gracefully
 * 8. Possibly add "undo vote" functionality
 * 9. Prevent multiple votes on same opinion (optional)
 * 10. Add vote persistence to backend (optional)
 *
 * OPTIMISTIC UPDATES PREVIEW:
 * ===========================
 * In future lessons, when you click upvote:
 * 1. Vote count updates IMMEDIATELY (optimistic)
 * 2. Context sends update to backend (async)
 * 3. If backend succeeds: Update is confirmed
 * 4. If backend fails: Revert the vote count
 *
 * This makes the app feel faster and more responsive, since users don't
 * have to wait for the network request to see their action's result.
 *
 * CODE ORGANIZATION:
 * ==================
 * This component demonstrates good practices:
 * ✓ Single responsibility (display one opinion)
 * ✓ Receives data via props (no internal state management)
 * ✓ Small and focused (easy to understand)
 * ✓ Reusable (can render any opinion)
 * ✓ Testable (just pass different props)
 * ✓ Semantic HTML (meaningful structure)
 *
 * If this component grows too complex (e.g., with voting logic, animations,
 * etc.), we might split it further:
 * - Opinion (container)
 *   - OpinionHeader (title, author)
 *   - OpinionBody (content)
 *   - VoteButtons (voting UI and logic)
 */
