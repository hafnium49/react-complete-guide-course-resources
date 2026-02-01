/**
 * ============================================================================
 * NEWS PAGE - LESSONS 481-484: Folder-Based Routing & Link Navigation
 * ============================================================================
 *
 * This file was MOVED from pages/news.js to pages/news/index.js
 * Both approaches result in the SAME route: /news
 *
 * ============================================================================
 * 🎓 LESSON 481: TWO WAYS TO CREATE THE SAME ROUTE
 * ============================================================================
 *
 * From the instructor:
 * "We always have an alternative to using such a named file name. So a file
 * named differently than index.js. We could also create a news sub-folder
 * in the pages folder, move news.js in there and then rename it to index.js
 * using that special index.js file name again."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TWO EQUIVALENT STRUCTURES FOR /news ROUTE                              │
 * │                                                                          │
 * │  OPTION A: Named File              │  OPTION B: Folder + index.js       │
 * │  ─────────────────────             │  ─────────────────────────────     │
 * │  pages/                            │  pages/                            │
 * │    news.js  ──────────────────────►│    news/                           │
 * │                                    │      index.js  ◄── THIS FILE       │
 * │                                    │                                    │
 * │  Both serve: yourdomain.com/news   │  Both serve: yourdomain.com/news   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Now, this page would still be loaded by visiting our-domain.com/news
 * because we're in the news folder. And that's important. Folders, which
 * you create in your pages folder also act as path segments."
 *
 * ============================================================================
 * WHY USE FOLDER STRUCTURE?
 * ============================================================================
 *
 * From the instructor:
 * "Now, it does matter though as soon as you start creating nested paths...
 * If we wanna have a path that is something like news/something-important
 * where something-important is the identifier of the specific news item you
 * wanna load, then you need to create a file in such a sub-folder because
 * otherwise, you can't create such a nested path."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHEN TO USE WHICH APPROACH                                             │
 * │                                                                          │
 * │  pages/news.js                     │  pages/news/index.js               │
 * │  ─────────────────                 │  ──────────────────────            │
 * │  ✓ Simple, single page             │  ✓ When you need nested routes    │
 * │  ✓ No nested routes needed         │  ✓ /news + /news/[slug]           │
 * │  ✗ Can't add /news/something       │  ✓ Better organization            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * FOLDERS AS PATH SEGMENTS
 * ============================================================================
 *
 * From the instructor:
 * "After all, we have two segments here and if we just create files directly
 * in the pages folder, we're limited to one segment, the file name. So
 * therefore, if we want to have such a nested path, so more than one segment,
 * we need to create a sub-folder."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PATH SEGMENTS VISUALIZATION                                            │
 * │                                                                          │
 * │  URL: yourdomain.com / news / something-important                       │
 * │                        ────   ───────────────────                       │
 * │                       segment 1    segment 2                            │
 * │                        (folder)     (file)                              │
 * │                                                                          │
 * │  FILE STRUCTURE:                                                         │
 * │  pages/                                                                  │
 * │    news/                    ← becomes /news                              │
 * │      index.js               ← /news (this file)                         │
 * │      something-important.js ← /news/something-important                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * CURRENT FOLDER STRUCTURE (Updated for Lesson 482)
 * ============================================================================
 *
 * pages/
 *   news/
 *     index.js               ← THIS FILE: /news
 *     [newsId].js            ← DYNAMIC: /news/:newsId (any value!)
 *     something-important.js ← STATIC: /news/something-important
 *
 * ============================================================================
 * 🎓 LESSON 482: CONNECTING LIST TO DETAIL PAGES
 * ============================================================================
 *
 * From the instructor:
 * "It would be very realistic that index.js and the news folder should output
 * a list of news items. And then we can click those individual items and then
 * take into the detailed pages with the concrete content for the news item
 * we selected."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TYPICAL NEWS SITE FLOW                                                  │
 * │                                                                          │
 * │  THIS PAGE (/news)              DETAIL PAGE (/news/[newsId])            │
 * │  ─────────────────              ─────────────────────────────           │
 * │                                                                          │
 * │  ┌─────────────────┐            ┌─────────────────────────┐             │
 * │  │  News List      │            │  Article: "Breaking..."  │             │
 * │  │                 │   click    │                          │             │
 * │  │  • Breaking...  │ ─────────► │  Full article content    │             │
 * │  │  • Sports...    │            │  fetched from database   │             │
 * │  │  • Weather...   │            │  using the newsId param  │             │
 * │  └─────────────────┘            └─────────────────────────┘             │
 * │                                                                          │
 * │  In future lessons, we'll add links from this list page to the         │
 * │  dynamic detail pages using Next.js Link component.                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 484: NAVIGATION WITH THE LINK COMPONENT
 * ============================================================================
 *
 * From the instructor:
 * "Currently, I, of course, always enter URLs in the URL bar manually and
 * that, of course, is not how users use our website. Instead, we have links
 * on our website that allow users to navigate around."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE GOAL: CLICKABLE NEWS LIST                                          │
 * │                                                                          │
 * │  Instead of just showing "The News Page", we want:                      │
 * │                                                                          │
 * │  ┌─────────────────────────────────┐                                    │
 * │  │  The News Page                   │                                    │
 * │  │                                  │                                    │
 * │  │  • NextJS Is A Great Framework  │  ← clickable!                      │
 * │  │  • Something Else               │  ← clickable!                      │
 * │  └─────────────────────────────────┘                                    │
 * │                                                                          │
 * │  Clicking should navigate to: /news/[newsId]                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 484: THE PROBLEM WITH REGULAR ANCHOR TAGS
 * ============================================================================
 *
 * From the instructor:
 * "Now, when we wanna build a link, we typically do this by using the anchor
 * tag. We can create an anchor element and wrap our text with that."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  USING REGULAR <a> TAGS (NOT RECOMMENDED)                               │
 * │                                                                          │
 * │  <a href="/news/my-article">My Article</a>                              │
 * │                                                                          │
 * │  This WORKS but has a major disadvantage:                               │
 * │                                                                          │
 * │  • Watch the browser refresh icon when clicking                         │
 * │  • It briefly turns to a ✕ (cross) then back to ↻ (refresh)            │
 * │  • This means: browser sends NEW request, gets NEW HTML page            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "This always signals that the browser sends a new request and gets back a
 * new HTML page. And that all works but it has a disadvantage. It means that
 * we don't have a single page application here."
 *
 * ============================================================================
 * 🎓 LESSON 484: WHY FULL PAGE RELOADS ARE BAD
 * ============================================================================
 *
 * From the instructor:
 * "It means instead that we're always sending a new request to the backend
 * to fetch a new HTML page whenever the user navigates around. And that's
 * not our goal here."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PROBLEMS WITH FULL PAGE RELOADS                                        │
 * │                                                                          │
 * │  1. LOST APPLICATION STATE                                               │
 * │     • Redux state = GONE                                                │
 * │     • React Context state = GONE                                        │
 * │     • Component state = GONE                                            │
 * │     • Form inputs = GONE                                                │
 * │                                                                          │
 * │  2. POOR USER EXPERIENCE                                                 │
 * │     • Slower navigation (network request each time)                     │
 * │     • Flash of white/loading between pages                              │
 * │     • Not "app-like" feel                                               │
 * │                                                                          │
 * │  3. DEFEATS PURPOSE OF REACT                                             │
 * │     • React is for interactive, dynamic UIs                             │
 * │     • We want to update screen with JavaScript, not reload              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "That, after all, is one of the reasons for using React, that we wanna
 * build an interactive UI where we never send a request for a new HTML page
 * but where we instead update what's on the screen with JavaScript, with
 * React in the end."
 *
 * ============================================================================
 * 🎓 LESSON 484: THE SOLUTION - next/link
 * ============================================================================
 *
 * From the instructor:
 * "Therefore, to stay in that single page application, we need to create
 * the link differently. We need to utilize a special component offered by
 * Next, to be precise, offered by next/link."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  IMPORTING THE LINK COMPONENT                                           │
 * │                                                                          │
 * │  import Link from 'next/link';                                          │
 * │                    ───────────                                          │
 * │                        │                                                 │
 * │                        └── Another sub-package of next                  │
 * │                            (like next/router)                           │
 * │                                                                          │
 * │  Link is exported as the DEFAULT export, so no curly braces needed.    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "That's another sub-package which is responsible for linking and from
 * there, we can import Link actually as a default export."
 *
 * ============================================================================
 * 🎓 LESSON 484: USING THE LINK COMPONENT
 * ============================================================================
 *
 * From the instructor:
 * "This imports the Link component from next/link and that's a special
 * component, which we can use in our JSX code to build links. Using it is
 * simple. You simply use it instead of the anchor tag here."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LINK COMPONENT SYNTAX                                                   │
 * │                                                                          │
 * │  BEFORE (regular anchor):                                                │
 * │  <a href="/news/my-article">My Article</a>                              │
 * │                                                                          │
 * │  AFTER (Next.js Link):                                                   │
 * │  <Link href="/news/my-article">My Article</Link>                        │
 * │        ────                                                             │
 * │         │                                                                │
 * │         └── Same attribute name! Just change the tag.                   │
 * │                                                                          │
 * │  Link expects an "href" prop for the destination URL.                   │
 * │  It will render an <a> tag in the DOM automatically.                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 484: HOW LINK ENABLES SPA BEHAVIOR
 * ============================================================================
 *
 * From the instructor:
 * "Yet, if I save and reload, if I now click this and you watch the refresh
 * icon, you see that now this never changes to a cross. Now we instantly go
 * to the second page and now we go there without fetching a new HTML page."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHAT LINK DOES BEHIND THE SCENES                                       │
 * │                                                                          │
 * │  1. Renders a regular <a> tag (for SEO and accessibility)              │
 * │                                                                          │
 * │  2. Attaches a click event listener                                     │
 * │                                                                          │
 * │  3. When clicked:                                                        │
 * │     a) PREVENTS default browser navigation                              │
 * │     b) Uses JavaScript to load the target component                     │
 * │     c) Updates the URL (using History API)                              │
 * │     d) Re-renders React with new component                              │
 * │                                                                          │
 * │  Result: URL changes, content updates, but NO page reload!              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Because Link, this special Link component renders an anchor tag but it
 * watches clicks on those anchor tags and if you click there, it prevents
 * the browser default of sending a request, of getting a new HTML page."
 *
 * ============================================================================
 * 🎓 LESSON 484: BEST OF BOTH WORLDS
 * ============================================================================
 *
 * From the instructor:
 * "And that is great because that allows us to combine the best of both
 * worlds. We have this highly interactive and reactive single page
 * application here where we can manage and store state across pages."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LINK GIVES YOU BOTH:                                                    │
 * │                                                                          │
 * │  ✓ SPA BENEFITS (when navigating within the app):                       │
 * │    • State preserved across pages                                       │
 * │    • Instant navigation (no network delay)                              │
 * │    • Smooth, app-like experience                                        │
 * │    • React manages all updates                                          │
 * │                                                                          │
 * │  ✓ SSR BENEFITS (when directly visiting a URL):                         │
 * │    • Pre-rendered HTML returned                                         │
 * │    • SEO-friendly                                                        │
 * │    • Fast initial page load                                             │
 * │    • Works without JavaScript                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "And yet, if a user would visit this page as an initial page by just
 * entering this URL and hitting Enter, we would also be able to return the
 * finished HTML page here. So search engines would also see that finished
 * page if they directly visit it."
 *
 * ============================================================================
 * 🎓 LESSON 484: WHEN TO USE LINK vs ANCHOR
 * ============================================================================
 *
 * From the instructor:
 * "And hence, for site internal links in a NextJS application, you wanna
 * use the Link component instead of the anchor tag component because with
 * that, you get the best of both worlds."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LINK vs ANCHOR DECISION GUIDE                                          │
 * │                                                                          │
 * │  USE <Link>:                        │  USE <a>:                         │
 * │  ───────────                        │  ────────                         │
 * │  • Internal navigation              │  • External websites              │
 * │  • /about, /news, /products         │  • https://google.com             │
 * │  • Same Next.js app                 │  • mailto: links                  │
 * │  • Want SPA behavior                │  • Download links                 │
 * │                                     │  • Links to other domains         │
 * │                                                                          │
 * │  EXAMPLES:                                                               │
 * │  <Link href="/about">About Us</Link>           ✓ Internal               │
 * │  <a href="https://github.com">GitHub</a>       ✓ External               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 484: USING FRAGMENT FOR MULTIPLE JSX ELEMENTS
 * ============================================================================
 *
 * From the instructor:
 * "And to do that, I'll wrap this here in a Fragment, which I import from
 * React so that we can have adjacent JSX elements."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHY WE NEED FRAGMENT                                                    │
 * │                                                                          │
 * │  React components must return a SINGLE root element.                    │
 * │                                                                          │
 * │  PROBLEM - Multiple elements at root:                                   │
 * │  return (                                                                │
 * │    <h1>Title</h1>          ← Error! Multiple roots                      │
 * │    <ul>...</ul>                                                          │
 * │  );                                                                      │
 * │                                                                          │
 * │  SOLUTION - Wrap in Fragment:                                           │
 * │  return (                                                                │
 * │    <Fragment>              ← Single root, no extra DOM element          │
 * │      <h1>Title</h1>                                                      │
 * │      <ul>...</ul>                                                        │
 * │    </Fragment>                                                           │
 * │  );                                                                      │
 * │                                                                          │
 * │  Or use shorthand: <> ... </>                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * TESTING NAVIGATION
 * ============================================================================
 *
 * 1. Run: npm run dev
 * 2. Visit: http://localhost:3000/news
 * 3. Click a news item link
 * 4. Watch the browser's refresh icon:
 *    • With <a>:    Icon briefly becomes ✕ (cross) - full reload
 *    • With <Link>: Icon stays ↻ (refresh) - SPA navigation
 *
 * ============================================================================
 */

// pages/news/index.js is served for: yourdomain.com/news

/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 */

/**
 * Fragment Import from React
 *
 * From the instructor:
 * "And to do that, I'll wrap this here in a Fragment, which I import from
 * React so that we can have adjacent JSX elements."
 *
 * Fragment allows returning multiple elements without adding extra DOM nodes.
 * Alternative shorthand syntax: <> ... </> (but can't pass key prop)
 */
import { Fragment } from 'react';

/**
 * Link Import from next/link
 *
 * From the instructor:
 * "We need to utilize a special component offered by Next, to be precise,
 * offered by next/link. That's another sub-package which is responsible
 * for linking and from there, we can import Link actually as a default export."
 *
 * Link is a DEFAULT export (no curly braces needed).
 * It enables client-side navigation without full page reloads.
 */
import Link from 'next/link';

/**
 * NewsPage Component
 *
 * This is the root page for the /news route.
 * Now displays a clickable list of news items using the Link component.
 *
 * From the instructor:
 * "Hence here on this index.js file in the news page, so on /news page,
 * we typically don't just wanna say The News Page but we might also want
 * to display a list of news items, which are then clickable."
 */
function NewsPage() {
  /**
   * We return a Fragment containing multiple elements:
   * - An h1 heading
   * - An unordered list of news items
   *
   * From the instructor:
   * "I'll wrap this here in a Fragment... so that we can have adjacent
   * JSX elements. And render an unordered list here."
   */
  return (
    <Fragment>
      <h1>The News Page</h1>

      {/**
       * News Items List
       *
       * From the instructor:
       * "And in that unordered list, we could have well, a list of dummy
       * news items. For example, the NextJS Is A Great Framework article
       * and then also the Something else article."
       *
       * In a real app, this list would be generated dynamically by mapping
       * over data fetched from a database or API. We're hard-coding it here
       * to focus on the navigation feature.
       */}
      <ul>
        {/**
         * First News Item - Using Link Component
         *
         * From the instructor:
         * "You simply use it instead of the anchor tag here. So I replace
         * 'a' with 'Link'. We leave the href attribute, the href prop
         * because Link expects a href prop."
         *
         * The href value becomes the dynamic segment in [newsId].js
         * When clicked, router.query.newsId = "nextjs-is-a-great-framework"
         */}
        <li>
          <Link href="/news/nextjs-is-a-great-framework">
            NextJS Is A Great Framework
          </Link>
        </li>

        {/**
         * Second News Item
         *
         * From the instructor:
         * "And of course, this list could also be generated dynamically
         * by mapping some array of data into JSX elements. I'm just hard
         * coding it here because for the moment, I wanna focus on the
         * navigation feature."
         */}
        <li>
          <Link href="/news/something-else">Something Else</Link>
        </li>
      </ul>

      {/**
       * COMPARISON: What NOT to do (using regular anchor tag)
       *
       * The commented code below shows how you might create links with
       * regular HTML anchor tags. This WORKS but causes full page reloads,
       * losing React state and breaking the SPA experience.
       *
       * From the instructor:
       * "It briefly turns to a cross and then goes back to the refresh icon.
       * This always signals that the browser sends a new request and gets
       * back a new HTML page."
       *
       * DON'T DO THIS for internal navigation:
       * <li>
       *   <a href="/news/nextjs-is-a-great-framework">
       *     NextJS Is A Great Framework
       *   </a>
       * </li>
       */}
    </Fragment>
  );
}

export default NewsPage;
