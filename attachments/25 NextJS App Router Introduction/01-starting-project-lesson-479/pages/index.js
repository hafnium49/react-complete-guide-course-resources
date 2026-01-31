/**
 * ============================================================================
 * HOME PAGE - LESSON 479: NextJS Project Structure & File-Based Routing
 * ============================================================================
 *
 * This file is in the /pages folder - the MOST IMPORTANT folder in a NextJS
 * Pages Router project.
 *
 * ============================================================================
 * 🎓 LESSON 479: THE PAGES FOLDER
 * ============================================================================
 *
 * From the instructor:
 * "The pages folder will be the most important folder because that is where
 * we will set up that file based routing, and that is therefore the folder
 * which is important for us to define the different pages that should make
 * up our application here."
 *
 * ============================================================================
 * THE THREE IMPORTANT FOLDERS
 * ============================================================================
 *
 * From the instructor:
 * "The three important folders for us here are pages, public, and styles,
 * though pages is by far the most important one."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FOLDER   │  PURPOSE                        │  IMPORTANCE               │
 * │───────────┼─────────────────────────────────┼───────────────────────────│
 * │  /pages   │  File-based routing & pages     │  ⭐ MOST IMPORTANT        │
 * │  /public  │  Static assets (images, etc.)   │  Important                │
 * │  /styles  │  CSS style files                │  Important                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Styles, as you might guess, holds some style files. We can ignore that
 * for now. We'll work on that soon. And public simply holds public resources
 * our page might use. Something like images, for example."
 *
 * ============================================================================
 * FILE-BASED ROUTING
 * ============================================================================
 *
 * This file (pages/index.js) automatically becomes the "/" route.
 * No router configuration needed - Next.js handles it automatically.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE IN /pages           │  BECOMES ROUTE                             │
 * │───────────────────────────┼─────────────────────────────────────────────│
 * │  pages/index.js           │  /                                          │
 * │  pages/about.js           │  /about                                     │
 * │  pages/products/index.js  │  /products                                  │
 * │  pages/products/[id].js   │  /products/:id (dynamic)                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * PRE-RENDERING - Why No index.html?
 * ============================================================================
 *
 * From the instructor:
 * "One thing you might see here in public though, is that unlike in a
 * regular React app, which you, for example, created with create React app
 * with that extra tool, that there in a standard React app, you have a
 * index HTML file in the public folder. Here in the NextJS app, you don't
 * have that."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  CREATE REACT APP (CRA)        │  NEXT.JS                              │
 * │────────────────────────────────┼───────────────────────────────────────│
 * │  /public/index.html exists     │  No index.html needed                 │
 * │  Client-side rendering         │  Server-side pre-rendering            │
 * │  Empty HTML, JS fills content  │  HTML comes with content              │
 * │  SEO challenges                │  SEO-friendly out of the box          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHY NO INDEX.HTML?
 *
 * From the instructor:
 * "The reason for this is that NextJS has this built in pre-rendering.
 * And whilst it gives you a single page application, that single page is
 * dynamically pre-rendered when a request reaches the server so that you
 * do return an initial page with content. This server-side rendering and
 * the pre-rendering of pages."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  HOW NEXT.JS PRE-RENDERING WORKS                                        │
 * │                                                                          │
 * │  1. User requests a page (e.g., /)                                       │
 * │  2. Request reaches the Next.js server                                   │
 * │  3. Server DYNAMICALLY generates the HTML with content                   │
 * │  4. User receives a fully-rendered page immediately                      │
 * │  5. React then "hydrates" the page for interactivity                     │
 * │                                                                          │
 * │  Result: Fast initial load + Full SPA capabilities                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * BENEFITS OF PRE-RENDERING
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ SEO-friendly: Search engines see actual content                      │
 * │  ✓ Faster perceived load: Users see content immediately                 │
 * │  ✓ Better accessibility: Content available without JavaScript           │
 * │  ✓ Social sharing: Preview cards work correctly                         │
 * │  ✓ Still a SPA: Full React interactivity after hydration                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import Head from 'next/head'
import styles from '../styles/Home.module.css'

/**
 * Home Page Component
 *
 * The default export of pages/index.js becomes the "/" route.
 * This is the main entry point of the application.
 */
export default function Home() {
  return (
    <div className={styles.container}>
      {/**
       * The <Head> component manages the document <head>.
       * Content here appears in the HTML <head> for SEO and metadata.
       */}
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          {/**
           * Images in /public are served at the root path.
           * /public/vercel.svg → accessible at /vercel.svg
           */}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
