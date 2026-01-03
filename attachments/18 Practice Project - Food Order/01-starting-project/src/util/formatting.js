/**
 * ============================================================================
 * FORMATTING UTILITIES - CURRENCY AND NUMBER FORMATTING
 * ============================================================================
 *
 * This file contains utility functions for formatting data display,
 * specifically currency formatting for our food order application.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Using JavaScript's Intl.NumberFormat API
 * 2. Creating reusable utility functions
 * 3. Separating formatting logic from components
 * 4. Understanding internationalization basics
 *
 * WHY SEPARATE FORMATTING UTILITIES?
 * ==================================
 * Instead of formatting prices directly in components:
 *   <p>${price.toFixed(2)}</p>
 *
 * We use a centralized formatter:
 *   <p>{currencyFormatter.format(price)}</p>
 *
 * Benefits:
 * - Consistent formatting across the entire app
 * - Easy to change format in one place
 * - Handles edge cases (rounding, locale differences)
 * - More professional and maintainable
 */

/**
 * CURRENCY FORMATTER
 * ==================
 * An Intl.NumberFormat instance configured for US currency.
 *
 * THE Intl.NumberFormat API:
 * --------------------------
 * Intl.NumberFormat is a built-in JavaScript API for formatting numbers
 * according to locale-specific conventions.
 *
 * Constructor: new Intl.NumberFormat(locale, options)
 *
 * PARAMETERS:
 * -----------
 * locale: 'en-US'
 *   - Specifies the locale (language and region)
 *   - 'en-US' = English, United States
 *   - Determines formatting conventions (decimal separator, etc.)
 *   - Other examples: 'de-DE' (German), 'ja-JP' (Japanese)
 *
 * options: { style: 'currency', currency: 'USD' }
 *   - style: 'currency' = Format as currency (vs 'decimal', 'percent')
 *   - currency: 'USD' = US Dollars (follows ISO 4217 currency codes)
 *
 * USAGE:
 * ------
 * currencyFormatter.format(8.99)    → "$8.99"
 * currencyFormatter.format(12)      → "$12.00"
 * currencyFormatter.format(1234.5)  → "$1,234.50"
 *
 * WHAT IT HANDLES AUTOMATICALLY:
 * ------------------------------
 * - Adding currency symbol ($)
 * - Correct decimal places (2 for USD)
 * - Thousands separators (1,234.56)
 * - Rounding when needed
 * - Proper positioning based on locale
 *
 * WHY USE Intl.NumberFormat INSTEAD OF toFixed()?
 * ------------------------------------------------
 * Manual approach:
 *   `$${price.toFixed(2)}`
 *
 * Problems with manual:
 * - Hard-coded $ symbol
 * - No thousands separator for large numbers
 * - Locale changes require code changes
 * - Easy to forget or be inconsistent
 *
 * Intl.NumberFormat approach:
 *   currencyFormatter.format(price)
 *
 * Benefits:
 * - Locale-aware formatting
 * - All formatting rules applied consistently
 * - Easy to change currency/locale
 * - Handles edge cases properly
 *
 * EXAMPLE COMPARISONS:
 * --------------------
 * Price: 1234.567
 *
 * Manual: `$${(1234.567).toFixed(2)}` → "$1234.57"
 * Intl:   currencyFormatter.format(1234.567) → "$1,234.57"
 *
 * Notice the Intl version adds the thousands separator!
 */
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * INTL API OVERVIEW:
 * ==================
 * The Intl (Internationalization) API provides:
 * - Intl.NumberFormat: Format numbers (currency, percent, decimal)
 * - Intl.DateTimeFormat: Format dates and times
 * - Intl.Collator: Compare strings for sorting
 * - Intl.PluralRules: Handle singular/plural forms
 *
 * All support locale-specific formatting!
 *
 * COMMON CURRENCY CODES:
 * ======================
 * 'USD' - US Dollar ($)
 * 'EUR' - Euro (€)
 * 'GBP' - British Pound (£)
 * 'JPY' - Japanese Yen (¥)
 * 'CNY' - Chinese Yuan (¥)
 *
 * COMMON LOCALES:
 * ===============
 * 'en-US' - English (US)
 * 'en-GB' - English (UK)
 * 'de-DE' - German (Germany)
 * 'fr-FR' - French (France)
 * 'ja-JP' - Japanese (Japan)
 *
 * REUSABILITY PATTERN:
 * ====================
 * By creating the formatter once and exporting it:
 *
 * export const currencyFormatter = new Intl.NumberFormat(...);
 *
 * All components can import and use the same instance:
 *
 * import { currencyFormatter } from '../util/formatting.js';
 * currencyFormatter.format(price);
 *
 * This ensures consistent formatting everywhere.
 *
 * EXTENDING THIS FILE:
 * ====================
 * You could add more formatters for different use cases:
 *
 * // Percentage formatter
 * export const percentFormatter = new Intl.NumberFormat('en-US', {
 *   style: 'percent',
 *   minimumFractionDigits: 1,
 * });
 *
 * // Date formatter
 * export const dateFormatter = new Intl.DateTimeFormat('en-US', {
 *   year: 'numeric',
 *   month: 'long',
 *   day: 'numeric',
 * });
 *
 * USED IN THIS PROJECT:
 * =====================
 * - MealItem.jsx: Format individual meal prices
 * - Cart.jsx: Format cart total
 * - Checkout.jsx: Format order total
 */
