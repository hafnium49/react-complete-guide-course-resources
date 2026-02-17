/**
 * ============================================================================
 * index.tsx — LESSON 592
 * ============================================================================
 *
 * CLEANED-UP ENTRY POINT
 *
 * This file has been stripped down from the CRA default:
 *
 *   - Removed the reportWebVitals import and call (not needed for this app)
 *   - Removed React.StrictMode wrapper (simplifies the output for learning)
 *   - Kept the ReactDOM.createRoot call with the non-null assertion (!)
 *
 * THE CODE IS STILL PLAIN REACT:
 *
 * Notice that this file looks exactly the same as the index.js entry
 * point used throughout the rest of this course. There are no special
 * TypeScript annotations here — the types of ReactDOM.createRoot, the
 * App component, and the DOM element are all handled automatically by
 * TypeScript's type inference and the @types/react-dom definitions.
 *
 * ============================================================================
 */

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Render the App component into the DOM. No StrictMode wrapper is used
// here to keep the output straightforward for learning purposes.
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
