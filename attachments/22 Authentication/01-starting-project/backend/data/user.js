/**
 * ============================================================================
 * USER DATA LAYER - USER STORAGE & RETRIEVAL (Lesson 388)
 * ============================================================================
 *
 * This file handles user data storage for the authentication system.
 * Users are stored in a JSON file (events.json) alongside events.
 *
 * IMPORTANT SECURITY FEATURE: Passwords are HASHED before storage!
 * We never store plain text passwords - only bcrypt hashes.
 *
 * ============================================================================
 * USER DATA STRUCTURE
 * ============================================================================
 *
 * Stored user object:
 * {
 *   "id": "uuid-string",
 *   "email": "user@example.com",
 *   "password": "$2a$12$..." // bcrypt hash, NOT plain text!
 * }
 *
 * ============================================================================
 */

const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

/**
 * ============================================================================
 * ADD NEW USER (Used by /signup route)
 * ============================================================================
 *
 * Creates a new user with:
 * 1. Unique ID (UUID)
 * 2. Email (from request)
 * 3. HASHED password (never store plain text!)
 *
 * SECURITY NOTE:
 * bcrypt's hash() function with cost factor 12 creates a secure hash.
 * Even if the database is compromised, passwords cannot be recovered.
 */
async function add(data) {
  const storedData = await readData();
  const userId = generateId();

  // CRITICAL: Hash the password before storing!
  // Cost factor 12 = 2^12 = 4096 iterations (good balance of security/speed)
  const hashedPw = await hash(data.password, 12);

  if (!storedData.users) {
    storedData.users = [];
  }

  // Store user with HASHED password (never plain text)
  storedData.users.push({ ...data, password: hashedPw, id: userId });
  await writeData(storedData);

  // Return user WITHOUT password hash for response
  return { id: userId, email: data.email };
}

/**
 * ============================================================================
 * GET USER BY EMAIL (Used by /login route)
 * ============================================================================
 *
 * Retrieves a user by email address for login validation.
 * The returned user object includes the password hash for comparison.
 */
async function get(email) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user = storedData.users.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError('Could not find user for email ' + email);
  }

  // Returns user WITH password hash (needed for login verification)
  return user;
}

exports.add = add;
exports.get = get;
