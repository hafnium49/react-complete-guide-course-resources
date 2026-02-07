/**
 * ============================================================================
 * app/layout.js - LESSONS 508 & 509: ROOT LAYOUT (NextJS App Router)
 * ============================================================================
 *
 * This is the root layout for the NextJS App Router project. Every page in
 * the app is rendered inside this layout. It imports global CSS and defines
 * metadata (title and description) that NextJS uses for the HTML <head>.
 *
 * In the App Router, layout.js files wrap their child routes automatically.
 * The {children} prop receives whatever page component matches the current
 * URL. This layout persists across route changes, so shared UI (like
 * navigation bars or footers) would go here.
 *
 * KEY DETAIL: In the NextJS App Router, all components are React Server
 * Components by default -- including this layout. Server components render
 * on the server and send finished HTML to the client. This is one of the
 * core topics explored throughout this section.
 *
 * LESSON 509 - NEXTJS AS A FULL-STACK FRAMEWORK:
 *
 * NextJS is described as a "full-stack React framework" because it handles
 * both the server side and the client side of your application. This layout
 * file, for example, executes on the server. NextJS automatically determines
 * which parts of your code belong in the server bundle and which belong in
 * the client bundle. You define pages using page.js files in the app/
 * directory, and compose UI with components -- some server-rendered, some
 * client-rendered -- all managed by the framework's code-splitting logic.
 *
 * ============================================================================
 */

import './globals.css';

export const metadata = {
  title: 'React RSC, Server Actions & More',
  description: 'A thorough demo of advanced React features.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
