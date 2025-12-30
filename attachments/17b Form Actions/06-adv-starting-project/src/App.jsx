/**
 * ============================================================================
 * LESSON 275: ASYNCHRONOUS FORM ACTIONS - APPLICATION STRUCTURE
 * ============================================================================
 *
 * This file is the main entry point for our Opinions Application, which
 * demonstrates asynchronous form actions - a powerful React 19 feature that
 * allows forms to communicate with backend servers seamlessly.
 *
 * APPLICATION PURPOSE:
 * ====================
 * This is an anonymous opinion sharing application where users can:
 * 1. Submit their opinions on any topic
 * 2. View all submitted opinions
 * 3. Upvote opinions they agree with
 * 4. Downvote opinions they disagree with
 *
 * All of these operations will communicate with a backend server, making them
 * asynchronous - meaning they take time to complete because they involve
 * network requests.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Understanding asynchronous form actions
 * 2. Handling backend communication in React forms
 * 3. Managing server state with Context API
 * 4. Implementing optimistic UI updates (in future lessons)
 * 5. Error handling for network requests
 *
 * BACKEND SETUP:
 * ==============
 * This application requires a separate backend server to be running.
 * The backend is a simple Node.js/Express server that:
 * - Stores opinions in a db.json file
 * - Provides REST API endpoints for CRUD operations
 * - Runs on http://localhost:3000
 *
 * To start the backend:
 * 1. Navigate to the 'backend' folder
 * 2. Run: npm install (first time only)
 * 3. Run: npm start
 *
 * ARCHITECTURE OVERVIEW:
 * ======================
 * This application uses the Context API for state management because:
 * - Multiple components need access to the opinions data
 * - The NewOpinion component needs to add new opinions
 * - The Opinions/Opinion components need to display and vote on opinions
 * - We want to avoid prop drilling (passing data through many component levels)
 *
 * The structure follows this pattern:
 * App (Context Provider)
 *   ├── Header (logo/title)
 *   └── Main
 *       ├── NewOpinion (form to submit new opinions)
 *       └── Opinions (list of all opinions)
 *           └── Opinion (single opinion with vote buttons)
 */

import { Header } from './components/Header';
import { Opinions } from './components/Opinions';
import { NewOpinion } from './components/NewOpinion';
import { OpinionsContextProvider } from './store/opinions-context';

/**
 * APP COMPONENT
 * =============
 * The root component that establishes the application structure and wraps
 * the necessary components with the Context Provider.
 */
function App() {
  return (
    <>
      {/*
        HEADER COMPONENT
        ================
        Displays the application logo and title. This component is
        independent and doesn't need access to the opinions state.
      */}
      <Header />

      <main>
        {/*
          OPINIONS CONTEXT PROVIDER
          =========================
          This is the KEY component for state management in this application.

          WHY USE CONTEXT HERE?
          ---------------------
          We're wrapping NewOpinion and Opinions with the Context Provider
          because:

          1. DATA SHARING: Both NewOpinion and Opinions need access to the
             opinions data and the functions to modify it (add, upvote,
             downvote).

          2. AVOIDING PROP DRILLING: Without Context, we would have to:
             - Store the opinions state in App
             - Pass opinions and all handler functions down as props
             - NewOpinion would need: addOpinion prop
             - Opinions would need: opinions, upvoteOpinion, downvoteOpinion
             - Opinion (child of Opinions) would need: upvoteOpinion,
               downvoteOpinion
             This creates a prop drilling problem where App manages everything.

          3. BACKEND COMMUNICATION: The Context Provider handles:
             - Initial data loading from the backend
             - Managing loading states
             - Updating state after backend operations
             - Error handling (in future lessons)

          4. SINGLE SOURCE OF TRUTH: All opinion data flows from one place,
             making it easier to keep the UI in sync with the backend.

          PROVIDER PLACEMENT
          ------------------
          Notice that we place the provider INSIDE <main>, not at the root.
          This is intentional:
          - Header doesn't need access to opinions data
          - Only components that need the data are wrapped
          - This is more efficient and follows best practices
          - It clearly shows which parts of the app use which state

          WHAT THE PROVIDER DOES
          ----------------------
          The OpinionsContextProvider component (defined in store/opinions-context.jsx):
          1. Fetches initial opinions from the backend when the app loads
          2. Stores opinions in state
          3. Provides functions to add, upvote, and downvote opinions
          4. Makes all of this available to child components via Context

          Any component inside this provider can access the opinions data
          using React's Context API (via useContext or the new 'use' hook).
        */}
        <OpinionsContextProvider>
          {/*
            NEW OPINION COMPONENT
            =====================
            A form where users can submit new opinions. This component will:
            - Use React 19 Form Actions to handle submission
            - Send the form data to the backend
            - Use the addOpinion function from Context to update the UI
            - Handle validation and error states

            In future lessons, we'll implement the form action here.
          */}
          <NewOpinion />

          {/*
            OPINIONS COMPONENT
            ==================
            Displays the list of all opinions. This component:
            - Accesses opinions data from Context using React 19's 'use' hook
            - Renders each opinion using the Opinion component
            - Shows a message if no opinions exist yet
            - Each Opinion component will have vote buttons (form actions)
          */}
          <Opinions />
        </OpinionsContextProvider>
      </main>
    </>
  );
}

export default App;

/**
 * ============================================================================
 * SUMMARY & NEXT STEPS
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. This application uses Context API for state management to avoid prop
 *    drilling and centralize backend communication logic.
 *
 * 2. The Context Provider wraps only the components that need access to the
 *    opinions data, following React best practices.
 *
 * 3. The application structure separates concerns:
 *    - Context handles data management and backend communication
 *    - Components handle UI rendering and user interactions
 *
 * WHAT'S COMING NEXT:
 * ===================
 * In the following lessons, we'll implement:
 * 1. Form actions in NewOpinion to submit new opinions to the backend
 * 2. Form actions in Opinion for the upvote/downvote buttons
 * 3. Error handling for failed backend requests
 * 4. Loading states while requests are in progress
 * 5. Optimistic UI updates to make the app feel faster
 *
 * DEVELOPMENT SETUP REMINDER:
 * ===========================
 * Remember to have BOTH servers running:
 * 1. Backend server: cd backend && npm start (port 3000)
 * 2. React dev server: npm run dev (port 5173)
 */
