/**
 * ============================================================================
 * MAIN HEADER COMPONENT - LESSON 442: Adding a Custom Component (Header)
 * ============================================================================
 *
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
    <header>
      {/**
       * ====================================================================
       * CLICKABLE LOGO
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "Now that logo should be clickable and therefore I'll start by
       * adding a link here, using the link component provided by NextJS
       * so that we can wrap that around the logo to make it clickable.
       * And the idea is that clicking the logo simply takes us back to the
       * starting page, so to this path here."
       *
       * The logo is wrapped in a Link component pointing to "/" (home).
       * This is a common UX pattern - clicking the logo returns to home.
       */}
      <Link href="/">
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
       * NAVIGATION
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "Now, that's not everything though. Instead I also want to have my
       * navigation here, hence I'll add a nav element and in there an
       * unordered list and in there a list item."
       *
       * The navigation contains links to:
       * - /meals - Browse meals shared by community
       * - /community - View the foodies community
       */}
      <nav>
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
 * LESSON 442 SUMMARY: CREATING A HEADER COMPONENT
 * ============================================================================
 *
 * WHAT WE ACCOMPLISHED:
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
 * INSTRUCTOR QUOTE:
 * "If you do that and you save everything, you should see something like this
 * if you revisit the page, a total mess, but at least the header is there,
 * it's there and it's working, and it's there on every page, which is amazing."
 *
 * NEXT STEP:
 *
 * INSTRUCTOR QUOTE:
 * "And we can also go back to the starting page, but of course it's totally
 * unstyled and doesn't look good. And that's therefore what we'll change next."
 *
 * The next lesson will add styling to make this header look good!
 *
 * ============================================================================
 */
