/**
 * ============================================================================
 * MAIN HEADER COMPONENT - LESSONS 442 & 443: Header with CSS Modules
 * ============================================================================
 *
 * LESSON 443 - STYLING WITH CSS MODULES
 *
 * INSTRUCTOR QUOTE:
 * "Instead, here in this section we'll use another solution that's supported
 * by NextJS and that would be CSS modules, which is in general standard CSS
 * code, but scoped to specific components by assigning special names to your
 * CSS files."
 *
 * ============================================================================
 * CSS MODULES IMPORT SYNTAX
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for that, we need a special way of importing this, not as we imported
 * CSS in the layout JSS file like this. That would simply add the CSS classes
 * as global classes that affect all pages and all components, but instead by
 * using import and then any name of your choice like classes from, and then
 * main header module CSS, in this case, a relative path to that file."
 *
 * GLOBAL CSS vs CSS MODULES:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  GLOBAL CSS (in layout.js):                                             │
 * │  import './globals.css';  ← Affects ALL pages/components                │
 * │                                                                          │
 * │  CSS MODULES (scoped):                                                  │
 * │  import classes from './main-header.module.css';                        │
 * │  ← Returns an object with class names as properties                     │
 * │  ← Classes are scoped to THIS component only                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * LESSON 442 - CREATING A SHARED HEADER COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "Now to add that header, I'll add a brand new component. We could of course
 * also just add it in here in this layout file. But in order to keep this a
 * bit leaner, I'll add a separate component."
 *
 * ============================================================================
 * WHERE TO STORE COMPONENT FILES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, as I also mentioned before, it is up to you where you store those
 * component files. If they don't have any reserved name like page or a layout,
 * NextJS doesn't care. You can add them like this or inside of a components
 * folder, in the app folder, wherever you want."
 *
 * INSTRUCTOR PREFERENCE:
 *
 * INSTRUCTOR QUOTE:
 * "But I personally prefer to keep them out of the app folder so that the app
 * folder is really only dealing with routing and not with those other components.
 * But that's just a personal preference."
 *
 * PROJECT STRUCTURE OPTIONS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  OPTION 1 (Instructor's choice - THIS PROJECT):                         │
 * │  project-root/                                                          │
 * │  ├── app/              ← Only routing files                             │
 * │  │   ├── page.js                                                        │
 * │  │   └── layout.js                                                      │
 * │  └── components/       ← Components outside app folder                  │
 * │      └── main-header.js (THIS FILE)                                     │
 * │                                                                          │
 * │  OPTION 2 (Also valid):                                                 │
 * │  project-root/                                                          │
 * │  └── app/                                                               │
 * │      ├── page.js                                                        │
 * │      ├── layout.js                                                      │
 * │      └── components/   ← Components inside app folder                   │
 * │          └── main-header.js                                             │
 * │                                                                          │
 * │  OPTION 3 (Colocated):                                                  │
 * │  project-root/                                                          │
 * │  └── app/                                                               │
 * │      ├── page.js                                                        │
 * │      ├── layout.js                                                      │
 * │      └── main-header.js  ← Component next to layout                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "There is this entire article in the NextJS documentation that discusses
 * different ways of structuring Next projects."
 *
 * See: https://nextjs.org/docs/app/building-your-application/routing/colocation
 *
 * ============================================================================
 * IMPORTING IMAGES IN NEXT.JS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now the great thing in NextJS projects, like in most React projects, is
 * that you can simply import such an image into your JavaScript files and
 * you'll then automatically get a path to those images."
 *
 * THE @ ALIAS:
 *
 * INSTRUCTOR QUOTE:
 * "So here I'll import my logo image from, and then I'll use this alias here
 * to refer to the root directory of my project, this at symbol, and I'll
 * therefore import that logo from at assets. And then there the logo.png file."
 *
 * HOW THE @ ALIAS WORKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  @ = project root directory                                             │
 * │                                                                          │
 * │  @/assets/logo.png → project-root/assets/logo.png                       │
 * │  @/components/...  → project-root/components/...                        │
 * │                                                                          │
 * │  This is configured in jsconfig.json:                                   │
 * │  {                                                                      │
 * │    "compilerOptions": {                                                 │
 * │      "paths": {                                                         │
 * │        "@/*": ["./*"]                                                   │
 * │      }                                                                  │
 * │    }                                                                    │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * IMPORTANT: IMAGE IMPORTS IN NEXT.JS vs OTHER REACT PROJECTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "What's important in Next projects, unlike in many other React projects,
 * is that you can't just assign it like this. It's that you have to access
 * the SRC property because this imported logo in Next projects will be an
 * object where the path to the image is then stored under that SRC property."
 *
 * COMPARISON:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REGULAR REACT (Vite/CRA):                                              │
 * │  import logo from './logo.png';                                         │
 * │  <img src={logo} />  ← logo IS the path string                          │
 * │                                                                          │
 * │  NEXT.JS:                                                               │
 * │  import logo from '@/assets/logo.png';                                  │
 * │  <img src={logo.src} />  ← logo is an OBJECT, need .src property        │
 * │                                                                          │
 * │  What logo contains in Next.js:                                         │
 * │  {                                                                      │
 * │    src: "/_next/static/media/logo.abc123.png",                          │
 * │    height: 200,                                                         │
 * │    width: 200,                                                          │
 * │    blurDataURL: "..."  // for placeholder                               │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * IMPORTING THE LOGO IMAGE
 *
 * INSTRUCTOR QUOTE:
 * "So here I'll import my logo image from, and then I'll use this alias here
 * to refer to the root directory of my project..."
 *
 * The @ alias is configured in jsconfig.json and points to the project root.
 * This makes imports cleaner than relative paths like '../../../assets/logo.png'
 */
import logoImg from '@/assets/logo.png';

/**
 * IMPORTING THE LINK COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "Now that logo should be clickable and therefore I'll start by adding a
 * link here, using the link component provided by NextJS so that we can wrap
 * that around the logo to make it clickable."
 *
 * Link provides SPA-style navigation (no full page reload).
 */
import Link from 'next/link';

/**
 * ============================================================================
 * LESSON 443 - IMPORTING CSS MODULES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for that, we need a special way of importing this, not as we imported
 * CSS in the layout JSS file like this... but instead by using import and then
 * any name of your choice like classes from, and then main header module CSS."
 *
 * KEY POINTS:
 * - Use "import X from" syntax (not just "import")
 * - The name (classes) is your choice
 * - The file MUST end with .module.css
 * - Returns an object where class names are properties
 *
 * INSTRUCTOR QUOTE:
 * "And with that added, you can now use this classes object, which it is to
 * access certain properties. And every class defined here in this main header
 * module CSS file will simply be available as a property on this imported object."
 */
import classes from './main-header.module.css';

/**
 * MAIN HEADER COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "And for that in here, I'll export another React component, which I'll name
 * MainHeader, a regular React component as you know and love it."
 *
 * This header will be:
 * - Visible on ALL pages (because it's in the root layout)
 * - Contain a clickable logo that links to home
 * - Contain navigation links to key pages
 *
 * @returns {JSX.Element} The main header with logo and navigation
 */
export default function MainHeader() {
  return (
    /**
     * HEADER ELEMENT
     *
     * INSTRUCTOR QUOTE:
     * "And then there I'll return a header element like this. And in that
     * header, I then wanna have a logo and the main navigation of this page."
     */
    /**
     * LESSON 443 - APPLYING CSS MODULE CLASSES
     *
     * INSTRUCTOR QUOTE:
     * "In addition, I also want to add a class name to the header itself,
     * and that would be classes.header."
     *
     * NOTE: We use className={classes.header} instead of className="header"
     * because CSS Modules transform class names to unique hashes.
     */
    <header className={classes.header}>
      {/**
       * ====================================================================
       * CLICKABLE LOGO WITH CSS MODULE CLASS
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "So for example, here on this logo, we can assign a class to this
       * link. And we now don't do this as a string like some class, but
       * instead as a dynamic value where we access this class's object.
       * And then here it's the logo class."
       *
       * INSTRUCTOR QUOTE:
       * "And this will apply this class here and all the other related
       * styles to this link and the nested elements. But it's doing that
       * such that the styles are scoped to this component and can't affect
       * any other component on the page, even if you would use a similar
       * class name there."
       */}
      <Link className={classes.logo} href="/">
        {/**
         * LOGO IMAGE
         *
         * INSTRUCTOR QUOTE:
         * "And I wanna set it to an image which I provided as part of the
         * starting project. There, I provided this assets folder to you.
         * And that assets folder then has a logo PNG file, which is that
         * logo I want to use."
         *
         * IMPORTANT - Using logo.src:
         *
         * INSTRUCTOR QUOTE:
         * "What's important in Next projects, unlike in many other React
         * projects, is that you can't just assign it like this. It's that
         * you have to access the SRC property because this imported logo
         * in Next projects will be an object where the path to the image
         * is then stored under that SRC property."
         */}
        <img src={logoImg.src} alt="A plate with food on it" />

        {/**
         * LOGO TEXT
         *
         * INSTRUCTOR QUOTE:
         * "Now, I also wanna have some text next to that image. And here
         * the name of this demo app is simply next level food."
         */}
        NextLevel Food
      </Link>

      {/**
       * ====================================================================
       * NAVIGATION WITH CSS MODULE CLASS
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "And then on the navigation, I want to add a class to this nav
       * element here with classes.nav."
       *
       * The .nav class in the CSS module also styles nested ul and a elements
       * using descendant selectors (.nav ul, .nav a).
       */}
      <nav className={classes.nav}>
        <ul>
          {/**
           * BROWSE MEALS LINK
           *
           * INSTRUCTOR QUOTE:
           * "And that list item should then contain another link leading to
           * a certain page. To be precise, a link that allows us to browse
           * the meals that have been shared by community members. So here,
           * it should lead to slash meals."
           */}
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>

          {/**
           * FOODIES COMMUNITY LINK
           *
           * INSTRUCTOR QUOTE:
           * "Now, that's not the only link though. Instead I'll also add
           * another link, which should allow us to go to the community, to
           * the Foodies Community. And hence here, it should lead to slash
           * community like that."
           */}
          <li>
            <Link href="/community">Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

/**
 * ============================================================================
 * LESSONS 442-443 SUMMARY: HEADER COMPONENT WITH CSS MODULES
 * ============================================================================
 *
 * LESSON 442 - WHAT WE ACCOMPLISHED:
 *
 * 1. Created a new component file outside the app folder
 *    - Keeps app folder clean (routing only)
 *    - Personal preference, but recommended organization
 *
 * 2. Learned about image imports in Next.js
 *    - Use @ alias for clean imports
 *    - Access .src property (unlike regular React)
 *
 * 3. Built a header with:
 *    - Clickable logo linking to home
 *    - Navigation with Link components
 *    - Links to /meals and /community
 *
 * ============================================================================
 * LESSON 443 - CSS MODULES STYLING
 * ============================================================================
 *
 * STYLING OPTIONS IN NEXT.JS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Global CSS   - Imported in layout.js, affects all pages             │
 * │  2. Tailwind CSS - Utility classes, popular but verbose                 │
 * │  3. CSS Modules  - Scoped styles, standard CSS (USED HERE)              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * HOW CSS MODULES WORK:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Create file: component-name.module.css                              │
 * │  2. Import: import classes from './component-name.module.css'           │
 * │  3. Use: className={classes.className}                                  │
 * │  4. Benefit: Styles are SCOPED to this component only!                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * CLASSES APPLIED IN THIS COMPONENT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ELEMENT      │  CLASS APPLIED         │  STYLES                        │
 * │  ─────────────│────────────────────────│────────────────────────────────│
 * │  <header>     │  classes.header        │  Flexbox layout, spacing       │
 * │  <Link> logo  │  classes.logo          │  Logo styling, uppercase text  │
 * │  <nav>        │  classes.nav           │  Nav links styling             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "With all that done, if you save that and you go back to your page, this
 * now looks much better. Now we got a properly styled header, a properly
 * styled logo, and these navigation links here, which also look better and
 * which of course also still work. But now all styled in a beautiful way
 * with help of CSS modules."
 *
 * ============================================================================
 */
