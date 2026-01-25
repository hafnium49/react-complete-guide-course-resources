/**
 * ============================================================================
 * ROOT LAYOUT - LESSON 438: The Foodies Project Introduction
 * ============================================================================
 *
 * LESSON 438 - INTRODUCTION TO THE FOODIES APP PROJECT
 *
 * INSTRUCTOR QUOTE:
 * "So I'm now in a brand new project, which you find attached both as a local
 * and a code sandbox version. And this is this foodies app, this meals app
 * project, on which we're going to work for the rest of this section."
 *
 * ============================================================================
 * PROJECT STRUCTURE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, of course, the project we got here is pretty similar to what we have
 * before, but I removed all those pages we created, we got an extra assets
 * folder with some images that we need for this application we're building,
 * so that's important."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  05-onwards-foodies-starting-project/                                   │
 * │  ├── app/                                                               │
 * │  │   ├── layout.js     ← Root layout (THIS FILE)                        │
 * │  │   ├── page.js       ← Home page                                      │
 * │  │   ├── globals.css   ← Updated global styles                          │
 * │  │   ├── icon.png      ← Favicon                                        │
 * │  │   └── meals/        ← Meals route folder (for future use)            │
 * │  ├── assets/           ← Images for the app (logo, food images)         │
 * │  │   ├── logo.png                                                       │
 * │  │   ├── burger.jpg, curry.jpg, pizza.jpg, etc.                        │
 * │  │   └── icons/        ← Icon images                                    │
 * │  ├── public/images/    ← Public images (served at /images/*)            │
 * │  │   ├── burger.jpg, curry.jpg, pizza.jpg, etc.                        │
 * │  │   └── logo.png                                                       │
 * │  ├── package.json                                                       │
 * │  ├── jsconfig.json     ← Path aliases (@/)                              │
 * │  └── next.config.js                                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "In addition, the public folder also contains some images that will be used,
 * and I also of course have updated styles and updated (indistinct), and then
 * also an updated layout and page JS file."
 *
 * ============================================================================
 */

/**
 * IMPORTING GLOBAL STYLES
 *
 * The globals.css file contains updated styles specifically for the Foodies app,
 * including gradient backgrounds, font imports, and styling for error/not-found pages.
 */
import './globals.css';

/**
 * ============================================================================
 * METADATA EXPORT
 * ============================================================================
 *
 * The metadata for this app reflects its purpose - a food-sharing community.
 * This metadata is applied to all pages wrapped by this layout.
 */
export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

/**
 * ============================================================================
 * ROOT LAYOUT COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And especially the layout JS file is also interesting because it's not an
 * empty shell as we had it before. Instead, we have a layout here where we
 * still set up that general HTML skeleton, but you would then also find an
 * SVG graphic in there, which is simply there for aesthetic reasons and which
 * will be rendered behind the header of this website in the end."
 *
 * KEY DIFFERENCES FROM THE BASIC PROJECT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BASIC PROJECT LAYOUT (01-starting-project):                            │
 * │    <html>                                                               │
 * │      <body>                                                             │
 * │        {children}  ← Just the page content                              │
 * │      </body>                                                            │
 * │    </html>                                                              │
 * │                                                                          │
 * │  FOODIES PROJECT LAYOUT (THIS FILE):                                    │
 * │    <html>                                                               │
 * │      <body>                                                             │
 * │        <div className="header-background">                              │
 * │          <svg>...</svg>  ← Decorative background gradient               │
 * │        </div>                                                           │
 * │        {children}  ← Page content                                       │
 * │      </body>                                                            │
 * │    </html>                                                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The current page content
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/**
         * ====================================================================
         * DECORATIVE SVG BACKGROUND
         * ====================================================================
         *
         * INSTRUCTOR QUOTE:
         * "You would then also find an SVG graphic in there, which is simply
         * there for aesthetic reasons and which will be rendered behind the
         * header of this website in the end."
         *
         * This div contains an SVG that creates a curved gradient background
         * at the top of the page. It's positioned absolutely (see globals.css)
         * with z-index: -1 so content appears on top of it.
         *
         * THE SVG EXPLAINED:
         * - Uses a linearGradient from brown (#59453c) to orange (#8f3a09)
         * - The path creates a curved/wavy shape at the bottom
         * - This creates the "food-themed" warm header background
         *
         * CSS in globals.css:
         *   .header-background {
         *     position: absolute;
         *     width: 100%;
         *     height: 320px;
         *     top: 0;
         *     z-index: -1;  ← Behind all content
         *   }
         */}
        <div className="header-background">
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

        {/**
         * PAGE CONTENT
         *
         * The children prop contains whatever page component matches
         * the current URL, just like in the basic project.
         *
         * The children will appear ON TOP of the SVG background
         * because the background has z-index: -1.
         */}
        {children}
      </body>
    </html>
  );
}

/**
 * ============================================================================
 * LESSON 438 SUMMARY: THE FOODIES PROJECT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And this is this foodies app, this meals app project, on which we're going
 * to work for the rest of this section."
 *
 * KEY POINTS:
 *
 * 1. This is a "meals/foodies" app for sharing recipes
 *
 * 2. Project includes:
 *    - assets/ folder with images for the app
 *    - public/images/ folder for publicly served images
 *    - Updated global styles (globals.css)
 *    - Updated layout with decorative SVG background
 *
 * 3. The layout is NOT an "empty shell" anymore:
 *    - Contains a decorative SVG gradient background
 *    - The SVG renders behind the header for visual appeal
 *
 * 4. We'll build on this project throughout the rest of the section:
 *    - Adding more routes
 *    - Fetching data
 *    - Handling forms
 *    - And more!
 *
 * INSTRUCTOR QUOTE:
 * "So that's the project I prepared. Again, as mentioned, you'll find it
 * attached and that's the project we'll work on now."
 *
 * ============================================================================
 */
