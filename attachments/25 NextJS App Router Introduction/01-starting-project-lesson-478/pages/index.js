/**
 * ============================================================================
 * HOME PAGE (index.js) - LESSON 478: Pages Router File-Based Routing
 * ============================================================================
 *
 * This file demonstrates the PAGES ROUTER approach to routing in Next.js.
 *
 * ============================================================================
 * FILE-BASED ROUTING IN PAGES ROUTER
 * ============================================================================
 *
 * In the Pages Router, the file structure directly maps to routes:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE LOCATION                  │  ROUTE                               │
 * │─────────────────────────────────┼──────────────────────────────────────│
 * │  pages/index.js (THIS FILE)     │  /                                   │
 * │  pages/about.js                 │  /about                              │
 * │  pages/blog/index.js            │  /blog                               │
 * │  pages/blog/[slug].js           │  /blog/:slug (dynamic)               │
 * │  pages/api/hello.js             │  /api/hello (API route)              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * COMPARISON WITH APP ROUTER:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PAGES ROUTER                   │  APP ROUTER                          │
 * │─────────────────────────────────┼──────────────────────────────────────│
 * │  pages/index.js → /             │  app/page.js → /                     │
 * │  pages/about.js → /about        │  app/about/page.js → /about          │
 * │  pages/blog/[slug].js           │  app/blog/[slug]/page.js             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Notice: In Pages Router, the file itself IS the page.
 * In App Router, you need a page.js file inside a folder.
 *
 * ============================================================================
 * METADATA IN PAGES ROUTER
 * ============================================================================
 *
 * In Pages Router, we use the <Head> component to add metadata.
 * In App Router, we export a `metadata` object or `generateMetadata` function.
 *
 * PAGES ROUTER (this file):
 *   import Head from 'next/head'
 *   <Head>
 *     <title>My Page</title>
 *   </Head>
 *
 * APP ROUTER:
 *   export const metadata = { title: 'My Page' }
 *
 * ============================================================================
 * CLIENT COMPONENTS BY DEFAULT
 * ============================================================================
 *
 * Unlike the App Router where components are SERVER components by default,
 * in Pages Router, components are CLIENT components by default.
 *
 * This means:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • You CAN use useState, useEffect, and other hooks directly           │
 * │  • You CAN handle browser events (onClick, onChange, etc.)             │
 * │  • You CANNOT fetch data directly in the component                     │
 * │  • You MUST use getServerSideProps/getStaticProps for server data      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * CSS MODULES
 * ============================================================================
 *
 * CSS Modules work the same in both routers:
 *   import styles from './Component.module.css'
 *   <div className={styles.container}>
 *
 * The .module.css extension enables CSS Modules (scoped class names).
 *
 * ============================================================================
 */

import Head from 'next/head'
import styles from '../styles/Home.module.css'

/**
 * Home Page Component
 *
 * In Pages Router, the default export of a file in /pages becomes a page.
 * This is different from App Router where you export default from page.js.
 */
export default function Home() {
  return (
    <div className={styles.container}>
      {/**
       * ================================================================
       * HEAD COMPONENT - Metadata in Pages Router
       * ================================================================
       *
       * The <Head> component from 'next/head' is how we add metadata
       * in the Pages Router. Every <Head> component's contents are
       * merged and injected into the <head> of the HTML document.
       *
       * APP ROUTER EQUIVALENT:
       *   export const metadata = {
       *     title: 'Create Next App',
       *     icons: { icon: '/favicon.ico' }
       *   };
       *
       * You can use <Head> in any component, and all Head contents
       * will be merged. Later definitions override earlier ones.
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
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
