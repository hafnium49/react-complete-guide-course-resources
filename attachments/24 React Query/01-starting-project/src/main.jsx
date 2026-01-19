/**
 * ============================================================================
 * MAIN ENTRY POINT - Section 24: Tanstack Query
 * ============================================================================
 *
 * LESSON 410 - PROJECT SETUP
 *
 * This is the React frontend entry point. The project has two parts:
 *
 * TO RUN THIS PROJECT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Terminal 1 (Backend):                                                   │
 * │  cd backend && npm start                                                 │
 * │  → Starts Express server on http://localhost:3000                       │
 * │                                                                          │
 * │  Terminal 2 (Frontend):                                                  │
 * │  npm run dev                                                             │
 * │  → Starts Vite dev server on http://localhost:5173                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "You then need to start two development servers, one for the backend and
 * one for the frontend project."
 *
 * ============================================================================
 * WHAT WE'LL ADD HERE LATER
 * ============================================================================
 *
 * In upcoming lessons, we'll wrap <App /> with QueryClientProvider:
 *
 * ```jsx
 * import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 *
 * const queryClient = new QueryClient();
 *
 * ReactDOM.createRoot(document.getElementById('root')).render(
 *   <QueryClientProvider client={queryClient}>
 *     <App />
 *   </QueryClientProvider>
 * );
 * ```
 *
 * This provides Tanstack Query's functionality to all components in the app.
 *
 * ============================================================================
 */

import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
