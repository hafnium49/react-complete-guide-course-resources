/**
 * ============================================================================
 * API ROUTE: /api/hello - LESSON 479: Project Structure Reference
 * ============================================================================
 *
 * This file is in /pages/api - a special folder for API routes.
 *
 * ============================================================================
 * THE PAGES FOLDER STRUCTURE
 * ============================================================================
 *
 * From the instructor (Lesson 479):
 * "The pages folder will be the most important folder because that is where
 * we will set up that file based routing."
 *
 * The /pages folder contains:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE/FOLDER              │  PURPOSE                                    │
 * │───────────────────────────┼─────────────────────────────────────────────│
 * │  pages/index.js           │  Home page (/)                              │
 * │  pages/_app.js            │  Root wrapper component                     │
 * │  pages/api/               │  API routes (backend endpoints)             │
 * │  pages/[any].js           │  Any other page route                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * API ROUTES IN NEXT.JS
 * ============================================================================
 *
 * Files in /pages/api become serverless API endpoints.
 * They run on the server, never exposed to the client.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE                      │  ENDPOINT                                  │
 * │────────────────────────────┼────────────────────────────────────────────│
 * │  pages/api/hello.js        │  /api/hello                                │
 * │  pages/api/users/index.js  │  /api/users                                │
 * │  pages/api/users/[id].js   │  /api/users/:id                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * CONNECTION TO PRE-RENDERING
 * ============================================================================
 *
 * From the instructor:
 * "NextJS has this built in pre-rendering. And whilst it gives you a single
 * page application, that single page is dynamically pre-rendered when a
 * request reaches the server."
 *
 * API routes are part of this server-side capability:
 * • Pages are pre-rendered on the server
 * • API routes handle data/logic on the server
 * • Both contribute to Next.js's full-stack nature
 *
 * ============================================================================
 */

/**
 * API Handler for /api/hello
 *
 * This runs on the server, not in the browser.
 * Safe for database queries, API keys, and secrets.
 *
 * @param {import('next').NextApiRequest} req - The incoming request
 * @param {import('next').NextApiResponse} res - The response object
 */
export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}
