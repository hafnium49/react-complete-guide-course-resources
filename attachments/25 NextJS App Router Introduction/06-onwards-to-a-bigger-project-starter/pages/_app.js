/**
 * ============================================================================
 * _app.js - LESSON 485: A BIGGER PROJECT - THE MEETUP APPLICATION
 * ============================================================================
 *
 * From the instructor:
 * "We got a basic understanding of NextJS, how we can set up routes and how
 * we can navigate around. And all of that is nice, but I now want to move
 * to a bigger project which you'll find attached to this lecture."
 *
 * ============================================================================
 * 🎓 LESSON 485: PROJECT OVERVIEW - THE REACT MEETUPS APPLICATION
 * ============================================================================
 *
 * We're transitioning from the simple news site project to a more complete
 * meetup application. This project will demonstrate the full power of NextJS.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHAT WE'LL BUILD                                                        │
 * │                                                                          │
 * │  A "React Meetups" application where users can:                         │
 * │  • Browse a list of meetups on the starting page                        │
 * │  • Add new meetups via a form                                           │
 * │  • View meetup details by clicking on individual meetups                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "It's a simple application which will be about meetups. So I'll have some
 * React Meetups listed here on this starting page. We can add new meetups
 * and we'll also be able to view meetup details."
 *
 * ============================================================================
 * 📁 PROJECT STRUCTURE - WHAT'S INCLUDED
 * ============================================================================
 *
 * From the instructor:
 * "Attached you find a zip file with a starting project. If you have a look
 * at this starting project here you'll see that we already got a bit of
 * structure and code in there."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  /components/                                                            │
 * │  ├── /layout/                                                           │
 * │  │   ├── Layout.js              (wrapper with navigation)               │
 * │  │   ├── Layout.module.css                                              │
 * │  │   ├── MainNavigation.js      (header + nav links)                    │
 * │  │   └── MainNavigation.module.css                                      │
 * │  │                                                                       │
 * │  ├── /meetups/                                                          │
 * │  │   ├── MeetupDetail.js        (single meetup view)                    │
 * │  │   ├── MeetupDetail.module.css                                        │
 * │  │   ├── MeetupItem.js          (list item card)                        │
 * │  │   ├── MeetupItem.module.css                                          │
 * │  │   ├── MeetupList.js          (renders array of items)                │
 * │  │   ├── MeetupList.module.css                                          │
 * │  │   ├── NewMeetupForm.js       (form for adding meetups)               │
 * │  │   └── NewMeetupForm.module.css                                       │
 * │  │                                                                       │
 * │  └── /ui/                                                               │
 * │      ├── Card.js                (reusable card wrapper)                 │
 * │      └── Card.module.css                                                │
 * │                                                                          │
 * │  /pages/                                                                 │
 * │  └── _app.js                    (THIS FILE - empty pages folder!)       │
 * │                                                                          │
 * │  /styles/                                                                │
 * │  └── globals.css                (global styles)                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚛️ KEY INSIGHT: THESE ARE JUST REACT COMPONENTS
 * ============================================================================
 *
 * From the instructor:
 * "These are mostly just React components and standard React code.
 * There's nothing NextJS specific about those files... We get components
 * for showing meetups as a list, for showing details about a meetup,
 * for showing a form, for having a layout with a navigation,
 * and some UI components."
 *
 * IMPORTANT: The components in this project:
 * • Are written in plain React (no NextJS-specific features)
 * • Use CSS Modules for styling (Component.module.css)
 * • Follow standard React patterns (props, composition)
 * • Can be used in ANY React application
 *
 * ============================================================================
 * 📂 THE EMPTY PAGES FOLDER
 * ============================================================================
 *
 * From the instructor:
 * "You see in this pages folder there's only this app.js file which should
 * look familiar to you which is this root component which receives the
 * Component prop for the to be rendered page component."
 *
 * THE CHALLENGE: The pages folder is intentionally (almost) empty!
 *
 * Only _app.js exists. YOUR task in upcoming lessons will be to:
 * • Create index.js for the home page (list all meetups)
 * • Create new-meetup.js for the "Add Meetup" page
 * • Create [meetupId].js for dynamic meetup detail pages
 *
 * ============================================================================
 * 🎯 WHAT YOU'LL LEARN IN UPCOMING LESSONS
 * ============================================================================
 *
 * From the instructor:
 * "We'll then also learn about data fetching and pre-rendering. And we'll
 * also learn how we can blend the front end and the back end together,
 * which is also a key feature of NextJS."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  UPCOMING TOPICS                                                         │
 * │                                                                          │
 * │  1. File-based Routing                                                  │
 * │     • Create page components in the pages folder                        │
 * │     • Set up dynamic routes with [param].js                             │
 * │                                                                          │
 * │  2. Data Fetching                                                       │
 * │     • getStaticProps - fetch data at build time                         │
 * │     • getServerSideProps - fetch data on each request                   │
 * │     • getStaticPaths - define dynamic paths for static generation       │
 * │                                                                          │
 * │  3. Pre-rendering                                                       │
 * │     • Static Site Generation (SSG)                                      │
 * │     • Server-Side Rendering (SSR)                                       │
 * │                                                                          │
 * │  4. API Routes                                                          │
 * │     • Create backend endpoints within NextJS                            │
 * │     • Blend frontend and backend in one project                         │
 * │                                                                          │
 * │  5. Database Integration                                                │
 * │     • Connect to MongoDB                                                │
 * │     • Store and retrieve meetup data                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🚀 GETTING STARTED WITH THIS PROJECT
 * ============================================================================
 *
 * After extracting and entering this project directory:
 *
 * 1. Install dependencies:
 *    npm install
 *
 * 2. Start the development server:
 *    npm run dev
 *
 * 3. Open http://localhost:3000 in your browser
 *    (You'll see a blank page or 404 since no index.js exists yet!)
 *
 * ============================================================================
 * 📝 WHAT _app.js DOES (REFRESHER)
 * ============================================================================
 *
 * This is the root component that wraps ALL page components:
 *
 * • Receives `Component` - the active page component being rendered
 * • Receives `pageProps` - props fetched by getStaticProps/getServerSideProps
 * • Imports global CSS that applies to all pages
 * • Can be used to add persistent UI (like navigation) or providers
 *
 * ============================================================================
 */

import '../styles/globals.css';

/**
 * MyApp - The Root Application Component
 *
 * This component wraps every page in your NextJS application.
 * Whatever is returned here is rendered for EVERY page.
 *
 * @param {Object} props
 * @param {React.Component} props.Component - The active page component
 * @param {Object} props.pageProps - Props passed to the page
 *
 * From the instructor:
 * "This is this root component which receives the Component prop for
 * the to be rendered page component."
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
