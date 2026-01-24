/**
 * ============================================================================
 * NEXT.JS CONFIGURATION - LESSONS 429-430
 * ============================================================================
 *
 * This file configures Next.js behavior for your application.
 * It's created automatically when you run `npx create-next-app`.
 *
 * WHAT CAN BE CONFIGURED HERE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  - Environment variables                                                │
 * │  - Image optimization domains                                           │
 * │  - Redirects and rewrites                                               │
 * │  - Headers (CORS, security, etc.)                                       │
 * │  - Webpack customization                                                │
 * │  - Internationalization (i18n)                                          │
 * │  - Experimental features                                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * PROJECT STRUCTURE OVERVIEW
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And now we can take a closer look at that folder and how that all works."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  01-starting-project/                                                   │
 * │  ├── app/                    ← App Router folder (your pages & routes)  │
 * │  │   ├── globals.css         ← Global styles                            │
 * │  │   ├── icon.png            ← Favicon (automatic)                      │
 * │  │   ├── layout.js           ← Root layout (required)                   │
 * │  │   └── page.js             ← Home page (route: /)                     │
 * │  ├── public/                 ← Static assets (images, fonts, etc.)      │
 * │  │   └── logo.png            ← Accessible at /logo.png                  │
 * │  ├── .eslintrc.json          ← ESLint configuration                     │
 * │  ├── .gitignore              ← Git ignore patterns                      │
 * │  ├── jsconfig.json           ← JavaScript configuration                 │
 * │  ├── next.config.js          ← This file - Next.js configuration        │
 * │  └── package.json            ← Dependencies and scripts                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * DIFFERENCES FROM STANDARD REACT PROJECTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We need a project that comes with NextJS pre-installed and that has a
 * certain structure and setup that's needed by NextJS."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STANDARD REACT (CRA/Vite):        NEXT.JS:                             │
 * │  ─────────────────────────────     ─────────────────────────────────    │
 * │  src/                              app/                                 │
 * │  src/App.js                        app/layout.js + app/page.js          │
 * │  src/index.js                      (Not needed - Next.js handles this)  │
 * │  public/index.html                 (Not needed - layout.js has HTML)    │
 * │  vite.config.js or N/A             next.config.js                       │
 * │  React Router for routing          File-based routing (automatic)       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * TYPE ANNOTATION FOR INTELLISENSE
 *
 * This JSDoc comment enables TypeScript-like autocompletion in VS Code,
 * even in JavaScript files. It tells the editor what type `nextConfig` should be.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /**
   * CONFIGURATION OPTIONS (empty for now)
   *
   * This is the default empty configuration. As the course progresses,
   * we may add options here such as:
   *
   * EXAMPLE OPTIONS:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  images: {                                                              │
   * │    remotePatterns: [{ hostname: 'example.com' }]  // Allow remote images│
   * │  },                                                                     │
   * │                                                                          │
   * │  experimental: {                                                        │
   * │    serverActions: true  // Enable server actions (if needed)            │
   * │  },                                                                     │
   * │                                                                          │
   * │  async redirects() {                                                    │
   * │    return [{ source: '/old', destination: '/new', permanent: true }]    │
   * │  }                                                                      │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
};

/**
 * EXPORT CONFIGURATION
 *
 * Next.js reads this configuration when:
 * - Starting the dev server (npm run dev)
 * - Building for production (npm run build)
 * - Running production server (npm start)
 *
 * Note: Uses CommonJS export (module.exports) not ES modules (export default)
 * because this file runs in Node.js, not the browser.
 */
module.exports = nextConfig;

/**
 * ============================================================================
 * NEXT.JS BUILD & DEVELOPMENT
 * ============================================================================
 *
 * DEVELOPMENT (npm run dev):
 * - Hot Module Replacement (HMR) - changes appear instantly
 * - Error overlay - shows errors in browser
 * - Fast Refresh - preserves component state
 *
 * PRODUCTION (npm run build + npm start):
 * - Optimized bundle (minified, tree-shaken)
 * - Static pages pre-rendered at build time
 * - Server-side rendering for dynamic pages
 * - Automatic code splitting
 *
 * INSTRUCTOR QUOTE:
 * "Make sure that you run npm install once to ensure that all dependencies
 * are installed. And thereafter, run npm run dev to start the development
 * server, which allows you to preview the application."
 *
 * ============================================================================
 */
