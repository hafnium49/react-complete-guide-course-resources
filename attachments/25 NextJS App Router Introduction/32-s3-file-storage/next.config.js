/**
 * ============================================================================
 * NEXT.JS CONFIGURATION - BONUS LESSON 473: Allowing External Image Sources
 * ============================================================================
 *
 * WHY THIS CONFIGURATION IS NEEDED:
 *
 * By default, Next.js's <Image> component only allows images from:
 * 1. Local files in your project (e.g., /public/images/...)
 * 2. Data URLs (base64 encoded images)
 *
 * When you try to use an external URL (like AWS S3), you get this error:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Error: Invalid src prop                                                │
 * │  (https://bucket-name.s3.amazonaws.com/image.jpg) on `next/image`,     │
 * │  hostname "bucket-name.s3.amazonaws.com" is not configured under       │
 * │  images in your `next.config.js`                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHY DOES NEXT.JS BLOCK EXTERNAL IMAGES?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SECURITY: Next.js optimizes images through its own server. Allowing   │
 * │  any external URL could:                                                │
 * │  • Let attackers abuse your server for image processing                │
 * │  • Expose your users to malicious content                              │
 * │  • Increase your hosting costs unexpectedly                            │
 * │                                                                          │
 * │  By requiring explicit configuration, you consciously approve each     │
 * │  external source you trust.                                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * ================================================================
   * IMAGE CONFIGURATION
   * ================================================================
   *
   * The `images` key configures Next.js's built-in Image Optimization.
   */
  images: {
    /**
     * ================================================================
     * REMOTE PATTERNS - Allowlist for External Image Sources
     * ================================================================
     *
     * remotePatterns lets you specify which external domains are allowed
     * as image sources for the <Image> component.
     *
     * EACH PATTERN OBJECT HAS THESE PROPERTIES:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  protocol:  'http' or 'https' (required for security)              │
     * │             Always use 'https' for production!                      │
     * │                                                                      │
     * │  hostname:  The exact domain name (no wildcards by default)        │
     * │             Example: 'my-bucket.s3.amazonaws.com'                   │
     * │             Use '**' for subdomain wildcards                       │
     * │                                                                      │
     * │  port:      Port number (usually '' for default 443/80)            │
     * │             Leave empty string for standard ports                   │
     * │                                                                      │
     * │  pathname:  URL path pattern                                        │
     * │             '/**' means all paths                                   │
     * │             '/images/**' would only allow paths starting with      │
     * │             /images/                                                 │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * S3 URL FORMAT:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  https://{bucket-name}.s3.amazonaws.com/{object-key}               │
     * │  ─────── ───────────────────────────────  ──────────               │
     * │  protocol       hostname                    pathname               │
     * │                                                                      │
     * │  Example:                                                           │
     * │  https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com│
     * │         /burger.jpg                                                │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * ⚠️  IMPORTANT: Replace the hostname with YOUR S3 bucket URL!
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextjs-foodies-dev-meals-images-960231572557.s3.ap-northeast-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

/**
 * ============================================================================
 * ALTERNATIVE CONFIGURATION OPTIONS
 * ============================================================================
 *
 * MULTIPLE SOURCES:
 * You can add multiple patterns to allow images from different sources:
 *
 * remotePatterns: [
 *   {
 *     protocol: 'https',
 *     hostname: 'my-bucket.s3.amazonaws.com',
 *     pathname: '/**',
 *   },
 *   {
 *     protocol: 'https',
 *     hostname: 'images.unsplash.com',
 *     pathname: '/**',
 *   },
 * ],
 *
 * WILDCARD SUBDOMAINS:
 * Use ** to match any subdomain:
 *
 * {
 *   hostname: '**.s3.amazonaws.com',  // Any S3 bucket
 * }
 *
 * ⚠️  Be careful with wildcards - they can be a security risk!
 *
 * DEPRECATED: domains (old way)
 * The `domains` option is deprecated. Use `remotePatterns` instead:
 *
 * // OLD (deprecated):
 * images: {
 *   domains: ['my-bucket.s3.amazonaws.com'],
 * }
 *
 * // NEW (recommended):
 * images: {
 *   remotePatterns: [{ hostname: 'my-bucket.s3.amazonaws.com', ... }],
 * }
 *
 * ============================================================================
 */

module.exports = nextConfig;
