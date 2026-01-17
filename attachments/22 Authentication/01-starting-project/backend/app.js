/**
 * ============================================================================
 * BACKEND API - EXPRESS SERVER WITH AUTHENTICATION (Lesson 388)
 * ============================================================================
 *
 * This is the main entry point for the backend API server.
 * This is NOT React code - it's Node.js/Express code running on the server.
 *
 * INSTRUCTOR QUOTE:
 * "This is the same application we already worked on in the Routing course
 * section, and therefore we are still dealing with those events you saw there."
 *
 * INSTRUCTOR QUOTE:
 * "This dummy backend API learns some new tricks and does now enforce user
 * authentication and support user creation and login."
 *
 * ============================================================================
 * PROJECT STRUCTURE (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now for that, you find the new project attached, and this project actually
 * includes two project folders: a backend-api and a react-frontend folder."
 *
 * | Folder          | Purpose                          | Technology     |
 * |-----------------|----------------------------------|----------------|
 * | backend/        | API server with auth             | Node + Express |
 * | frontend/       | React application                | React + Router |
 *
 * INSTRUCTOR QUOTE:
 * "But you won't have to write any code in this backend-API folder. This is
 * provided for you. It's not related to React. And you can, of course, explore
 * that code, but you don't have to understand it. It's Node/Express code not
 * related to React."
 *
 * ============================================================================
 * API ENDPOINTS OVERVIEW
 * ============================================================================
 *
 * Auth Routes (no prefix):
 * - POST /signup      - Create new user account, returns token
 * - POST /login       - Authenticate user, returns token
 *
 * Event Routes (/events prefix):
 * - GET  /events      - Get all events (PUBLIC)
 * - GET  /events/:id  - Get single event (PUBLIC)
 * - POST /events      - Create event (PROTECTED - requires token)
 * - PATCH /events/:id - Update event (PROTECTED - requires token)
 * - DELETE /events/:id - Delete event (PROTECTED - requires token)
 *
 * ============================================================================
 */

const bodyParser = require('body-parser');
const express = require('express');

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 *
 * These headers allow the React frontend (running on localhost:3000)
 * to make requests to this backend API (running on localhost:8080).
 *
 * IMPORTANT: 'Authorization' header must be allowed for JWT tokens!
 * Without this, the browser would block requests with auth tokens.
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  // Authorization header is crucial for sending JWT tokens from frontend
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

/**
 * Auth Routes - /signup and /login endpoints
 * No prefix - routes are directly at root level
 */
app.use(authRoutes);

/**
 * Event Routes - All routes prefixed with /events
 * Contains both public (GET) and protected (POST, PATCH, DELETE) routes
 */
app.use('/events', eventRoutes);

/**
 * Global Error Handler
 * Catches any errors thrown in route handlers or middleware
 */
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

// Start server on port 8080
app.listen(8080);
