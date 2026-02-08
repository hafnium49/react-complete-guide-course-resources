/**
 * ============================================================================
 * src/App.jsx - LESSONS 519 & 520
 * ============================================================================
 *
 * LESSON 519: Module introduction -- Animating React Apps
 * LESSON 520: Project setup and overview
 *
 * ============================================================================
 * 🎓 LESSON 519: WHY ANIMATIONS MATTER IN REACT APPS
 * ============================================================================
 *
 * This course section is about adding animations to React applications.
 * Static apps without animations work fine, but animated apps tend to
 * look and feel more polished, which can encourage users to spend more
 * time engaging with the website.
 *
 * WHAT THIS SECTION COVERS:
 *
 * 1. CSS ANIMATIONS AND TRANSITIONS
 *    CSS itself has powerful built-in features for animating elements.
 *    The section starts by exploring what pure CSS can do, since many
 *    developers are not fully aware of these capabilities.
 *
 * 2. LIMITATIONS OF CSS-ONLY ANIMATIONS
 *    While CSS animations cover many basic use cases, they have certain
 *    limitations when it comes to more complex, dynamic animations in
 *    React -- especially for things like animating elements in and out
 *    of the DOM, list animations, and scroll-based effects.
 *
 * 3. FRAMER MOTION (third-party package)
 *    For the majority of this section, we will use Framer Motion, a
 *    popular animation library for React. It provides a declarative API
 *    for building and controlling complex animations, including:
 *      - Animating elements entering and leaving the screen
 *      - Animating lists (items added/removed)
 *      - Scroll-based animations (effects triggered by scrolling)
 *      - Layout animations and shared layout transitions
 *
 * ============================================================================
 * 🎓 LESSON 520: THIS STARTING PROJECT
 * ============================================================================
 *
 * This is a "Challenges" web app where users can:
 *   - View a welcome/landing page with a hero section
 *   - Navigate to a challenges page
 *   - Create new challenges (with title, description, deadline, and image)
 *   - View challenges organized by tabs: Active, Completed, Failed
 *   - Mark challenges as completed or failed
 *   - Expand/collapse challenge details
 *
 * The app is fully functional right now -- everything works, you can
 * interact with it, create challenges, switch tabs, etc. But it has
 * NO animations. Throughout this section, we will progressively add
 * animations to make the user experience smoother and more engaging.
 *
 * PROJECT STACK:
 *   - React 19 (Vite-based project, NOT NextJS)
 *   - React Router DOM for client-side routing (two pages)
 *   - Context API for challenge state management
 *   - No animation libraries yet (Framer Motion will be added later)
 *
 * PROJECT STRUCTURE:
 *
 *   01-starting-project/
 *   ├── src/
 *   │   ├── main.jsx                  ← React entry point
 *   │   ├── App.jsx                   ← THIS FILE: router setup
 *   │   ├── index.css                 ← all global styles
 *   │   ├── assets/                   ← images and image data
 *   │   │   ├── images.js             ← image imports/metadata array
 *   │   │   ├── hero.png, city.jpg    ← welcome page images
 *   │   │   └── *.png                 ← challenge category images
 *   │   ├── pages/
 *   │   │   ├── Welcome.jsx           ← landing page ("/")
 *   │   │   └── Challenges.jsx        ← challenges page ("/challenges")
 *   │   ├── components/
 *   │   │   ├── Header.jsx            ← page header with "Add Challenge" button
 *   │   │   ├── Modal.jsx             ← portal-based modal dialog
 *   │   │   ├── NewChallenge.jsx      ← form for creating challenges
 *   │   │   ├── Challenges.jsx        ← challenge list with tab filtering
 *   │   │   ├── ChallengeTabs.jsx     ← Active/Completed/Failed tab bar
 *   │   │   ├── ChallengeItem.jsx     ← individual challenge card
 *   │   │   └── Badge.jsx             ← count badge shown on tabs
 *   │   └── store/
 *   │       └── challenges-context.jsx ← Context API provider + state logic
 *   ├── index.html                    ← HTML shell with #modal and #root divs
 *   ├── package.json                  ← React 19, react-router-dom 6
 *   └── vite.config.js
 *
 * ROUTING:
 *
 * The app has two routes defined below using React Router's
 * createBrowserRouter (data router API from v6.4+):
 *   - "/" renders the WelcomePage (landing/hero page)
 *   - "/challenges" renders the ChallengesPage (challenge management)
 *
 * GETTING STARTED:
 *   1. Run `npm install` to install all dependencies
 *   2. Run `npm run dev` to start the Vite development server
 *   3. Open the URL shown in the terminal (usually http://localhost:5173)
 *
 * ============================================================================
 */

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import WelcomePage from './pages/Welcome.jsx';
import ChallengesPage from './pages/Challenges.jsx';

const router = createBrowserRouter([
  { path: '/', element: <WelcomePage /> },
  { path: '/challenges', element: <ChallengesPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
