/**
 * ============================================================================
 * MAIN HEADER BACKGROUND COMPONENT - LESSON 445: Component Refactoring
 * ============================================================================
 *
 * LESSON 445 - EXTRACTING THE HEADER BACKGROUND INTO A SEPARATE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "Now, I mentioned that I also wanted to outsource this header background
 * here into a separate component, and that's what I'll do next."
 *
 * ============================================================================
 * WHY CREATE A SEPARATE COMPONENT?
 * ============================================================================
 *
 * 1. SEPARATION OF CONCERNS
 *    - The decorative SVG background is now its own component
 *    - The root layout stays cleaner and more focused
 *
 * 2. COMPONENT ORGANIZATION
 *    - Related header components are grouped together
 *    - Makes the codebase easier to navigate
 *
 * 3. PRACTICE
 *    INSTRUCTOR QUOTE:
 *    "...which you of course don't have to do, but which I did want to add
 *    here for practice purposes."
 *
 * ============================================================================
 * COMPONENT LOCATION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, I also wanna group all these main-header related files together into
 * a separate subfolder inside of components so that we keep that components
 * folder manageable and easy to navigate."
 *
 * FOLDER STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  components/                                                            │
 * │  └── main-header/                                                       │
 * │      ├── main-header.js                 ← Main header component         │
 * │      ├── main-header.module.css         ← Header styles                 │
 * │      ├── main-header-background.js      ← THIS FILE                     │
 * │      └── main-header-background.module.css ← Background styles          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * CSS MODULES PROPERTY ACCESS WITH DASHES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, that's a invalid JavaScript property name if used like this, and
 * therefore I'll use that square bracket notation and access the property
 * value like this."
 *
 * THE PROBLEM:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  CSS class name: .header-background                                     │
 * │                       ↑ The dash makes this an invalid JS property      │
 * │                                                                          │
 * │  WRONG: classes.header-background                                       │
 * │  ↑ JavaScript sees this as: classes.header MINUS background             │
 * │                                                                          │
 * │  CORRECT: classes['header-background']                                  │
 * │  ↑ Square bracket notation accesses the property correctly              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ALTERNATIVES:
 * 1. Use square brackets: classes['header-background']
 * 2. Use camelCase in CSS: .headerBackground → classes.headerBackground
 *
 * ============================================================================
 */

/**
 * IMPORTING CSS MODULES
 *
 * INSTRUCTOR QUOTE:
 * "With that done, back in the main-header-background-component file, we
 * should import classes from ./main-header-background.module.css like this."
 */
import classes from './main-header-background.module.css';

/**
 * MAIN HEADER BACKGROUND COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "For that, in that components folder, I'll add my main-header-background.js
 * file, and in there, export a component that's named MainHeaderBackground,
 * like this."
 *
 * This component renders the decorative SVG gradient that appears behind
 * the header on all pages.
 *
 * @returns {JSX.Element} The decorative header background SVG
 */
export default function MainHeaderBackground() {
  return (
    /**
     * ====================================================================
     * HEADER BACKGROUND CONTAINER
     * ====================================================================
     *
     * INSTRUCTOR QUOTE:
     * "And now I'll simply grab this div here from the root layout and
     * return that here in that MainHeaderBackground component."
     *
     * ACCESSING DASHED CLASS NAMES:
     *
     * INSTRUCTOR QUOTE:
     * "...and replace this here, this class name, with classes, and then
     * the class name here is header-background. Now, that's a invalid
     * JavaScript property name if used like this, and therefore I'll use
     * that square bracket notation and access the property value like this."
     */
    <div className={classes['header-background']}>
      {/**
       * DECORATIVE SVG GRADIENT
       *
       * This SVG creates the warm brown-to-orange gradient at the top of
       * all pages. It's purely decorative and positioned behind all content
       * using z-index: -1 in the CSS.
       *
       * SVG STRUCTURE:
       * - Uses linearGradient for horizontal color transition
       * - Path creates a curved/wavy bottom edge
       * - Colors: #59453c (brown) → #8f3a09 (orange)
       */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: '#59453c', stopOpacity: '1' }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#8f3a09', stopOpacity: '1' }}
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}

/**
 * ============================================================================
 * LESSON 445 SUMMARY: COMPONENT EXTRACTION AND ORGANIZATION
 * ============================================================================
 *
 * WHAT WE ACCOMPLISHED:
 *
 * 1. CREATED A NEW COMPONENT
 *    - Extracted the header background from layout.js
 *    - Now it's a reusable, isolated component
 *
 * 2. MOVED CSS TO A MODULE
 *    - Extracted styles from globals.css
 *    - Scoped styles to this component only
 *    - Changed svg selector to be scoped: .header-background svg
 *
 * 3. LEARNED ABOUT DASHED CLASS NAMES
 *    - Can't use classes.header-background (invalid JS)
 *    - Must use classes['header-background'] (bracket notation)
 *
 * 4. ORGANIZED FILES INTO SUBFOLDERS
 *    - All main-header files now in components/main-header/
 *    - Keeps components folder clean and organized
 *
 * WHERE IS THIS COMPONENT USED?
 *
 * INSTRUCTOR QUOTE:
 * "...or since it, as the name suggests, belongs to the MainHeader, we can
 * actually not do that, get rid of the import and the usage in the root
 * layout.js file, and instead use it here in main-header.js."
 *
 * The MainHeader component now wraps both:
 * 1. MainHeaderBackground (this component)
 * 2. The <header> element with logo and nav
 *
 * ============================================================================
 */
