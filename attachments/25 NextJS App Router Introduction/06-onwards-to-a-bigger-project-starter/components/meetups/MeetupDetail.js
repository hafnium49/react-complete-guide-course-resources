/**
 * ============================================================================
 * MeetupDetail.js - LESSON 491: MEETUP DETAIL DISPLAY COMPONENT
 * ============================================================================
 *
 * LESSON 491: Creating a presentational component for meetup details
 *
 * ============================================================================
 * 🎓 LESSON 491: CREATING THE MEETUP DETAIL COMPONENT
 * ============================================================================
 *
 * From the instructor:
 * "Now for that, we can of course start outputting that content here in that
 * MeetupDetails function. But I actually wanna outsource that into a separate
 * component, because it is a good practice to keep your page component files
 * pretty lean and outsource the actual JSX code, the actual markup, into
 * separate standalone component files."
 *
 * KEY PRINCIPLE: Keep page components lean!
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PAGE COMPONENT RESPONSIBILITIES                                         │
 * │                                                                          │
 * │  ✅ What page components SHOULD do:                                     │
 * │     • Define data fetching (getStaticProps, getServerSideProps)         │
 * │     • Define paths (getStaticPaths)                                      │
 * │     • Pass data as props to presentational components                    │
 * │     • Handle routing logic                                               │
 * │                                                                          │
 * │  ❌ What page components should AVOID:                                  │
 * │     • Complex JSX markup                                                 │
 * │     • Detailed styling logic                                             │
 * │     • Being hundreds of lines long                                       │
 * │                                                                          │
 * │  → Outsource markup to separate component files!                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🏗️ COMPONENT ARCHITECTURE PATTERN
 * ============================================================================
 *
 * From the instructor:
 * "So therefore I will add a new component in the Meetups folder, and that
 * will be the MeetupDetail component. MeetupDetail.js, and there I'll create
 * my component function."
 *
 * This separation creates a clear architecture:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE STRUCTURE                                                          │
 * │                                                                          │
 * │  pages/[meetupId]/index.js    →  PAGE COMPONENT (lean)                  │
 * │     │                            - Fetches data                          │
 * │     │                            - Passes props                          │
 * │     │                            - Minimal JSX                           │
 * │     │                                                                    │
 * │     └──► uses ──►                                                       │
 * │                                                                          │
 * │  components/meetups/MeetupDetail.js  →  PRESENTATIONAL COMPONENT        │
 * │                                          - Contains the markup           │
 * │                                          - Receives props                │
 * │                                          - Uses CSS Modules              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎨 CSS MODULES IN NEXTJS
 * ============================================================================
 *
 * From the instructor:
 * "...and I will also use a CSS module for styling. Therefore, I will add a
 * MeetupDetail.module.css file next to this JavaScript file."
 *
 * CSS Modules provide:
 * • SCOPED STYLES: Class names are automatically made unique
 * • NO CONFLICTS: Styles won't leak to other components
 * • BUILT-IN SUPPORT: NextJS supports CSS Modules out of the box
 *
 * From the instructor:
 * "Now, we already saw in an earlier module that NextJS supports CSS modules
 * out of the box. We can create files with that .module.css extension without
 * any extra configuration, and then we can import them into our JavaScript
 * files and use the classes defined in them."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  HOW CSS MODULES WORK                                                    │
 * │                                                                          │
 * │  1. Create: MeetupDetail.module.css                                     │
 * │     .detail { ... }                                                      │
 * │     .image { ... }                                                       │
 * │                                                                          │
 * │  2. Import: import classes from './MeetupDetail.module.css';            │
 * │                                                                          │
 * │  3. Use: className={classes.detail}                                     │
 * │                                                                          │
 * │  4. Result in browser:                                                   │
 * │     class="MeetupDetail_detail__abc123"                                  │
 * │                                                                          │
 * │  The class name is automatically transformed to be unique!              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📋 COMPONENT STRUCTURE
 * ============================================================================
 *
 * From the instructor:
 * "And I will add an image section where I set up the image, the title,
 * the address with a special address HTML element, and a description."
 *
 * The component renders:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ┌─────────────────────────────────────────┐                           │
 * │  │                                          │                           │
 * │  │         [  IMAGE  ]                      │                           │
 * │  │                                          │                           │
 * │  ├─────────────────────────────────────────┤                           │
 * │  │                                          │                           │
 * │  │         Meetup Title (h1)               │                           │
 * │  │                                          │                           │
 * │  │         123 Street Name (address)       │                           │
 * │  │                                          │                           │
 * │  │         Description paragraph here...   │                           │
 * │  │                                          │                           │
 * │  └─────────────────────────────────────────┘                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔤 THE <address> HTML ELEMENT
 * ============================================================================
 *
 * From the instructor:
 * "...the address with a special address HTML element..."
 *
 * The <address> element is semantic HTML for contact/address information.
 *
 * Why use semantic HTML?
 * • ACCESSIBILITY: Screen readers understand it's an address
 * • SEO: Search engines recognize address content
 * • CLARITY: Code is self-documenting
 *
 * Note: By default, browsers render <address> in italics. We override this
 * in our CSS for custom styling.
 *
 * ============================================================================
 * 📋 PROPS THIS COMPONENT RECEIVES
 * ============================================================================
 *
 * ┌─────────────┬─────────────────────────────────────────────────────────┐
 * │ Prop        │ Description                                              │
 * ├─────────────┼─────────────────────────────────────────────────────────┤
 * │ image       │ URL of the meetup image                                 │
 * │ title       │ Name/title of the meetup                                │
 * │ address     │ Physical location of the meetup                         │
 * │ description │ Detailed description of what the meetup is about        │
 * └─────────────┴─────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 💡 WHY SEPARATE COMPONENTS?
 * ============================================================================
 *
 * Benefits of keeping page components lean:
 *
 * 1. READABILITY
 *    - Page files focus on data fetching and routing
 *    - Presentational logic is in dedicated files
 *
 * 2. REUSABILITY
 *    - MeetupDetail could be used in multiple places
 *    - e.g., in a modal, on a dashboard, etc.
 *
 * 3. TESTABILITY
 *    - Easier to unit test presentational components
 *    - Mock props without complex data fetching setup
 *
 * 4. MAINTAINABILITY
 *    - Changes to appearance don't touch page logic
 *    - Changes to data fetching don't touch markup
 *
 * 5. TEAM COLLABORATION
 *    - Designers can work on components
 *    - Backend developers can work on data fetching
 *
 * ============================================================================
 */

/**
 * Import the CSS module for scoped styling
 *
 * From the instructor:
 * "We can create files with that .module.css extension without any extra
 * configuration, and then we can import them into our JavaScript files
 * and use the classes defined in them."
 *
 * The 'classes' object contains all CSS class names from the module.
 * Each class name is transformed to be unique to this component.
 */
import classes from './MeetupDetail.module.css';

/**
 * MeetupDetail Component - Presentational Component for Meetup Details
 *
 * Displays a single meetup's full information including:
 * - Large image
 * - Title
 * - Address
 * - Description
 *
 * From the instructor:
 * "So therefore I will add a new component in the Meetups folder, and that
 * will be the MeetupDetail component. MeetupDetail.js, and there I'll create
 * my component function."
 *
 * @param {Object} props
 * @param {string} props.image - URL of the meetup image
 * @param {string} props.title - Title/name of the meetup
 * @param {string} props.address - Physical location address
 * @param {string} props.description - Detailed meetup description
 */
function MeetupDetail(props) {
  /**
   * RENDER THE MEETUP DETAIL LAYOUT
   *
   * From the instructor:
   * "And I will add an image section where I set up the image, the title,
   * the address with a special address HTML element, and a description."
   *
   * Structure:
   * - <section> wrapper with 'detail' class for overall styling
   *   - <img> for the meetup image
   *   - <h1> for the title
   *   - <address> for the location (semantic HTML)
   *   - <p> for the description
   */
  return (
    <section className={classes.detail}>
      {/*
       * MEETUP IMAGE
       *
       * Displays a large image of the meetup venue or event.
       * The image is constrained by CSS to maintain proper sizing.
       *
       * From the instructor:
       * "And I will add an image section where I set up the image..."
       *
       * props.image: URL string (e.g., "https://example.com/meetup.jpg")
       * props.title: Used as alt text for accessibility
       */}
      <img src={props.image} alt={props.title} />

      {/*
       * MEETUP TITLE
       *
       * Main heading showing the meetup name.
       * Displayed prominently below the image.
       *
       * From the instructor:
       * "...the title..."
       */}
      <h1>{props.title}</h1>

      {/*
       * MEETUP ADDRESS
       *
       * Uses the semantic <address> HTML element.
       * This helps with accessibility and SEO.
       *
       * From the instructor:
       * "...the address with a special address HTML element..."
       *
       * The <address> element:
       * - Is a semantic HTML5 element
       * - Indicates contact information or physical address
       * - Screen readers announce it appropriately
       * - Browsers render it in italics by default (we override with CSS)
       */}
      <address>{props.address}</address>

      {/*
       * MEETUP DESCRIPTION
       *
       * Detailed text describing what the meetup is about,
       * what attendees will learn or experience, etc.
       *
       * From the instructor:
       * "...and a description."
       */}
      <p>{props.description}</p>
    </section>
  );
}

/**
 * Export the component for use in page files
 *
 * This component will be imported by pages/[meetupId]/index.js
 * which passes the meetup data as props.
 *
 * Usage in page component:
 * ```javascript
 * import MeetupDetail from '../../components/meetups/MeetupDetail';
 *
 * function MeetupDetails(props) {
 *   return (
 *     <MeetupDetail
 *       image={props.meetupData.image}
 *       title={props.meetupData.title}
 *       address={props.meetupData.address}
 *       description={props.meetupData.description}
 *     />
 *   );
 * }
 * ```
 */
export default MeetupDetail;
