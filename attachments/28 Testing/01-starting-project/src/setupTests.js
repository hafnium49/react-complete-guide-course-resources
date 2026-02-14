/**
 * ============================================================================
 * src/setupTests.js - LESSON 567: TESTING SETUP
 * ============================================================================
 *
 * This file runs BEFORE every test file. CRA's Jest configuration
 * automatically looks for src/setupTests.js and executes it as part of
 * the test environment setup.
 *
 * The import below makes @testing-library/jest-dom's custom matchers
 * (toBeInTheDocument, toHaveTextContent, toBeVisible, toHaveClass, etc.)
 * available in EVERY test file globally. Without this import, calling
 * expect(element).toBeInTheDocument() would throw an error because Jest's
 * built-in expect() doesn't know about DOM-specific assertions.
 *
 * ============================================================================
 */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
