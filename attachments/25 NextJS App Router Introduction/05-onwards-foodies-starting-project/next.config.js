/**
 * ============================================================================
 * NEXT.JS CONFIGURATION - Server Actions Body Size Limit
 * ============================================================================
 *
 * PROBLEM SOLVED:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ERROR: "Body exceeded 1 MB limit"                                      │
 * │                                                                          │
 * │  By default, Next.js limits Server Action request bodies to 1 MB.       │
 * │  This is too small for image uploads in the meal sharing form.          │
 * │                                                                          │
 * │  SOLUTION: Configure serverActions.bodySizeLimit to allow larger files. │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * DOCUMENTATION:
 * https://nextjs.org/docs/app/api-reference/next-config-js/serverActions#bodysizelimit
 *
 * ============================================================================
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * SERVER ACTIONS CONFIGURATION
   *
   * bodySizeLimit: Maximum allowed size for the request body sent to Server Actions.
   *
   * SUPPORTED FORMATS:
   * - '500kb' - 500 kilobytes
   * - '1mb'   - 1 megabyte (default)
   * - '5mb'   - 5 megabytes
   * - 1048576 - bytes as number (1 MB = 1048576 bytes)
   *
   * We're setting it to 5 MB to comfortably handle meal images.
   */
  serverActions: {
    bodySizeLimit: '5mb',
  },
};

module.exports = nextConfig;
