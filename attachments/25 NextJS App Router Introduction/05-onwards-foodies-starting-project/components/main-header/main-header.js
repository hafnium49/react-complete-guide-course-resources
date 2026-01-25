/**
 * ============================================================================
 * MAIN HEADER COMPONENT - LESSONS 442-445: Header with Background Component
 * ============================================================================
 *
 * LESSON 445 - COMPONENT EXTRACTION AND FILE ORGANIZATION
 *
 * INSTRUCTOR QUOTE:
 * "Now, I mentioned that I also wanted to outsource this header background
 * here into a separate component, and that's what I'll do next."
 *
 * ============================================================================
 * FILE ORGANIZATION (LESSON 445)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, I also wanna group all these main-header related files together into
 * a separate subfolder inside of components so that we keep that components
 * folder manageable and easy to navigate."
 *
 * CURRENT FOLDER STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  components/                                                            │
 * │  └── main-header/                  ← Subfolder for header files         │
 * │      ├── main-header.js            ← THIS FILE                          │
 * │      ├── main-header.module.css    ← Header styles                      │
 * │      ├── main-header-background.js ← Background component               │
 * │      └── main-header-background.module.css ← Background styles          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And hence, I'll add a main-header folder in that components folder, and
 * move all these main-header related files into that main-header subfolder
 * inside of that components folder."
 *
 * ============================================================================
 * USING FRAGMENTS FOR MULTIPLE ELEMENTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "There we could return a fragment so that we can add a sibling element
 * next to the header, and that sibling is now that MainHeaderBackground,
 * which I guess makes a lot of sense if we look at it like this."
 *
 * WHY USE A FRAGMENT?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  React components must return a SINGLE element                          │
 * │                                                                          │
 * │  PROBLEM:                                                               │
 * │  return (                                                               │
 * │    <MainHeaderBackground />   ← Error! Two sibling elements             │
 * │    <header>...</header>                                                 │
 * │  );                                                                     │
 * │                                                                          │
 * │  SOLUTION: Use a Fragment (<>...</>)                                    │
 * │  return (                                                               │
 * │    <>                          ← Fragment wraps siblings                │
 * │      <MainHeaderBackground />                                           │
 * │      <header>...</header>                                               │
 * │    </>                                                                  │
 * │  );                                                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * LESSON 444 - OPTIMIZING IMAGES WITH NEXT.JS IMAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "Because at the moment, we're simply using the regular image element for
 * displaying this image. And that's not bad or a problem, but in NextJS, you
 * actually got a better element for outputting images than this default image
 * element."
 *
 * INSTRUCTOR QUOTE:
 * "Because in NextJS, you have a special built-in image component, which exists
 * to help you output images in a more optimized way."
 *
 * ============================================================================
 * NEXT.JS IMAGE COMPONENT BENEFITS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "For example, by lazy loading images under the hood so that they're only
 * displayed if they're really visible on the page. It does that automatically
 * for you without any extra configuration. It can also simplify the process
 * of setting up responsive images and so on."
 *
 * AUTOMATIC OPTIMIZATIONS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. LAZY LOADING                                                        │
 * │     - Images only load when visible on page                             │
 * │     - Adds loading="lazy" automatically                                 │
 * │                                                                          │
 * │  2. RESPONSIVE IMAGES                                                   │
 * │     - Generates srcset for different screen sizes                       │
 * │     - Serves appropriate size based on viewport                         │
 * │                                                                          │
 * │  3. FORMAT OPTIMIZATION                                                 │
 * │     - Automatically serves WebP for supported browsers                  │
 * │     - Falls back to original format when needed                         │
 * │                                                                          │
 * │  4. SIZE DETECTION                                                      │
 * │     - Automatically detects width/height from imported images           │
 * │     - Prevents Cumulative Layout Shift (CLS)                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * DOCUMENTATION:
 * See: https://nextjs.org/docs/app/api-reference/components/image
 *
 * INSTRUCTOR QUOTE:
 * "Now, this image component has a lot of props and configuration options,
 * and attached you find a link to the full article on this component. Though
 * I will say that many of those props and options are really for more advanced
 * use cases."
 *
 * ============================================================================
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
 * LESSON 444 - IMPORTING THE NEXT.JS IMAGE COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And all you have to do here in this main header component is to replace
 * the default IMG element here with the image element that can be imported
 * from next/image."
 *
 * The Image component is built into Next.js - no additional installation needed.
 */
import Image from 'next/image';

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
 * ============================================================================
 * LESSON 445 - IMPORTING THE HEADER BACKGROUND COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "...or since it, as the name suggests, belongs to the MainHeader, we can
 * actually not do that, get rid of the import and the usage in the root
 * layout.js file, and instead use it here in main-header.js."
 *
 * The background component is imported here because:
 * - It logically belongs with the header
 * - Both are in the same subfolder
 * - Keeps layout.js cleaner
 */
import MainHeaderBackground from './main-header-background';

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
     * ====================================================================
     * LESSON 445 - FRAGMENT FOR MULTIPLE SIBLING ELEMENTS
     * ====================================================================
     *
     * INSTRUCTOR QUOTE:
     * "There we could return a fragment so that we can add a sibling element
     * next to the header, and that sibling is now that MainHeaderBackground,
     * which I guess makes a lot of sense if we look at it like this."
     *
     * The fragment (<>...</>) allows us to return two sibling elements:
     * 1. MainHeaderBackground - The decorative SVG gradient
     * 2. header - The actual header with logo and navigation
     */
    <>
      {/**
       * LESSON 445 - HEADER BACKGROUND COMPONENT
       *
       * INSTRUCTOR QUOTE:
       * "...and instead use it here in main-header.js."
       *
       * The background component renders the decorative SVG gradient
       * that appears behind the header on all pages.
       */}
      <MainHeaderBackground />

      {/**
       * LESSON 443 - APPLYING CSS MODULE CLASSES
       *
       * INSTRUCTOR QUOTE:
       * "In addition, I also want to add a class name to the header itself,
       * and that would be classes.header."
       */}
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
         * ================================================================
         * LESSON 444 - OPTIMIZED IMAGE COMPONENT
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "And all you have to do here in this main header component is
         * to replace the default IMG element here with the image element
         * that can be imported from next/image."
         *
         * KEY CHANGES FROM <img> TO <Image>:
         *
         * INSTRUCTOR QUOTE:
         * "Then you need to set the source to such an imported image, but
         * now to that overall object and not just the src property value."
         *
         * ┌───────────────────────────────────────────────────────────────┐
         * │  BEFORE (regular <img>):                                      │
         * │  <img src={logoImg.src} alt="..." />                          │
         * │  ↑ Must use .src property                                     │
         * │                                                                │
         * │  AFTER (Next.js <Image>):                                     │
         * │  <Image src={logoImg} alt="..." priority />                   │
         * │  ↑ Use the FULL object (not .src)                             │
         * └───────────────────────────────────────────────────────────────┘
         *
         * INSTRUCTOR QUOTE:
         * "So I changed that src prop value therefore, because this object
         * that's generated by NextJS, when you import an image like this,
         * contains useful information that's used under the hood by this
         * image component to display it in an optimized way. For example,
         * it automatically detects the size of this image."
         *
         * THE priority PROP:
         *
         * INSTRUCTOR QUOTE:
         * "Now, one thing we should do here, about which we also learn here
         * in the console, the JavaScript console, is add the priority
         * property to this image since it will always be visible when this
         * page loads. So lazy loading doesn't make a lot of sense here, and
         * we want to tell NextJS and the browser that this image should
         * always be loaded as quickly as possible to make sure that we got
         * no unnecessary content shift or flickering when the page loads."
         *
         * WHEN TO USE priority:
         * - Images that are visible "above the fold" (on initial load)
         * - Logo images that are always present
         * - Hero images at the top of pages
         * - Any image that would benefit from preloading
         */}
        <Image src={logoImg} alt="A plate with food on it" priority />

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
    </>
  );
}

/**
 * ============================================================================
 * LESSONS 442-445 SUMMARY: HEADER WITH BACKGROUND COMPONENT
 * ============================================================================
 *
 * LESSON 442 - COMPONENT CREATION:
 * - Created component file outside app folder
 * - Built header with logo and navigation
 *
 * LESSON 443 - CSS MODULES:
 * - Scoped styles with *.module.css files
 *
 * LESSON 444 - NEXT.JS IMAGE COMPONENT:
 * - Optimized images with lazy loading and WebP
 * - Used priority prop for above-the-fold images
 *
 * ============================================================================
 * LESSON 445 - COMPONENT EXTRACTION AND ORGANIZATION
 * ============================================================================
 *
 * WHAT WE ACCOMPLISHED:
 *
 * 1. EXTRACTED HEADER BACKGROUND TO SEPARATE COMPONENT
 *    INSTRUCTOR QUOTE:
 *    "Now, I mentioned that I also wanted to outsource this header background
 *    here into a separate component, and that's what I'll do next."
 *
 * 2. MOVED CSS FROM globals.css TO CSS MODULE
 *    - header-background class → main-header-background.module.css
 *    - Changed svg selector to be scoped: .header-background svg
 *
 * 3. USED FRAGMENTS FOR MULTIPLE ELEMENTS
 *    INSTRUCTOR QUOTE:
 *    "There we could return a fragment so that we can add a sibling element
 *    next to the header, and that sibling is now that MainHeaderBackground."
 *
 * 4. ORGANIZED FILES INTO SUBFOLDER
 *    INSTRUCTOR QUOTE:
 *    "Now, I also wanna group all these main-header related files together
 *    into a separate subfolder inside of components so that we keep that
 *    components folder manageable and easy to navigate."
 *
 * CURRENT COMPONENT STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  MainHeader renders:                                                    │
 * │  <>                                                                     │
 * │    <MainHeaderBackground />    ← Decorative SVG gradient               │
 * │    <header className={classes.header}>                                  │
 * │      <Link className={classes.logo}>                                    │
 * │        <Image ... priority />   ← Optimized logo image                  │
 * │        NextLevel Food                                                   │
 * │      </Link>                                                            │
 * │      <nav className={classes.nav}>                                      │
 * │        <ul>                                                             │
 * │          <li><Link href="/meals">...</Link></li>                        │
 * │          <li><Link href="/community">...</Link></li>                    │
 * │        </ul>                                                            │
 * │      </nav>                                                             │
 * │    </header>                                                            │
 * │  </>                                                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And with that, if we save everything, we got the same result as before.
 * But now using another extra component, which you of course don't have to
 * do, but which I did want to add here for practice purposes."
 *
 * ============================================================================
 */
