/**
 * ============================================================================
 * FORMATTING UTILITIES - CURRENCY AND NUMBER FORMATTING (Lesson 288)
 * ============================================================================
 *
 * This file contains utility functions for formatting data display,
 * specifically currency formatting for our food order application.
 *
 * LESSON 288 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Creating a dedicated utility folder for shared helper functions
 * 2. Using JavaScript's Intl.NumberFormat API for currency formatting
 * 3. Creating reusable formatting functions that can be imported anywhere
 * 4. Understanding internationalization basics
 *
 * FILE STRUCTURE (Lesson 288):
 * ============================
 * The instructor creates this file structure:
 * "I'll do that right away by adding a new folder in that source folder,
 * which I'll name util. And in there, I'll add my formatting.js file."
 *
 * src/
 * └── util/
 *     └── formatting.js  ← This file
 *
 * WHY CREATE A SEPARATE UTILITY FILE?
 * ====================================
 * The instructor explains the reasoning:
 * "And since I'll also need that price formatting in other components later,
 * I'll do that right away by adding a new folder in that source folder."
 *
 * Benefits:
 * - Consistent formatting across the entire app
 * - Easy to change format in one place
 * - Reusable in MealItem, Cart, Checkout, etc.
 * - Separates formatting logic from component logic
 *
 * MDN DOCUMENTATION:
 * ==================
 * For more details on Intl.NumberFormat, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */

/**
 * CURRENCY FORMATTER (Lesson 288)
 * ================================
 * An Intl.NumberFormat instance configured for US currency.
 *
 * THE SIMPLE APPROACH (What we could do):
 * ----------------------------------------
 * The instructor mentions: "Of course, we could simply add a dollar sign
 * in front of that price and it would already look good."
 *
 * Simple approach: `$${meal.price}` or `$${meal.price.toFixed(2)}`
 *
 * THE BETTER APPROACH (What we do instead):
 * -----------------------------------------
 * "But since we could theoretically also get price data that maybe is a
 * bit more complex or that contains a different amount of decimal places
 * for every price, I'll instead set up a more general formatter, which
 * will ensure that prices are always formatted in exactly the same way."
 *
 * THE Intl.NumberFormat API (Lesson 288):
 * ----------------------------------------
 * The instructor explains:
 * "And we can use a built-in JavaScript feature that is supported by
 * browsers where we instantiate a new internationalization object called
 * NumberFormat which allows us for which market we wanna format a price."
 *
 * Syntax: new Intl.NumberFormat(locale, options)
 *
 * CONSTRUCTOR PARAMETERS:
 * -----------------------
 * locale: 'en-US'
 *   "And here I'll simply pick en-US"
 *   - Specifies the locale (language and region)
 *   - 'en-US' = English, United States
 *   - Determines formatting conventions (decimal separator, currency symbol position)
 *
 * options: { style: 'currency', currency: 'USD' }
 *   "And where then as a second argument we can configure how currencies
 *   should be or how numbers in general should be formatted."
 *
 *   style: 'currency'
 *     "And here we could, for example, set up the style and set this to
 *     currency which is one available formatting style."
 *
 *   currency: 'USD'
 *     "And I'll then also add the currency key to make it clear that I'm
 *     targeting US dollars."
 *
 * EXPORTING THE FORMATTER (Lesson 288):
 * -------------------------------------
 * "And it's now in this formatting.js file where I wanna set up a currency
 * formatter. And I also wanna export this currency formatter so that it
 * can be used in our files."
 *
 * USAGE EXAMPLES:
 * ---------------
 * currencyFormatter.format(8.99)    → "$8.99"
 * currencyFormatter.format(12)      → "$12.00"
 * currencyFormatter.format(1234.5)  → "$1,234.50"
 * currencyFormatter.format("8.99")  → "$8.99" (handles string input too)
 *
 * WHAT IT HANDLES AUTOMATICALLY:
 * ------------------------------
 * - Adding currency symbol ($)
 * - Correct decimal places (2 for USD)
 * - Thousands separators (1,234.56)
 * - Rounding when needed
 * - Proper positioning based on locale
 *
 * WHY THIS IS "A BIT OVERKILL" BUT STILL GOOD:
 * --------------------------------------------
 * The instructor acknowledges:
 * "Which again here is a bit overkill, but something that's good to know
 * and something that can be helpful if you got numbers of different formats."
 *
 * Even if our prices are simple, this approach:
 * - Teaches a valuable JavaScript feature
 * - Handles edge cases automatically
 * - Is production-ready
 * - Can be easily adapted for other currencies/locales
 *
 * MDN DOCUMENTATION REFERENCE:
 * ============================
 * For complete API documentation, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 *
 * Key methods:
 * - format(number): Returns formatted string
 * - formatToParts(number): Returns array of parts for custom rendering
 * - resolvedOptions(): Returns the resolved options
 *
 * Additional options you could use:
 * - minimumFractionDigits: Minimum digits after decimal
 * - maximumFractionDigits: Maximum digits after decimal
 * - useGrouping: Whether to use grouping separators (e.g., commas)
 */
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS FROM LESSON 288
 * ============================================================================
 *
 * LESSON 288 WORKFLOW:
 * ====================
 * 1. Create util folder in src
 * 2. Create formatting.js file
 * 3. Set up currencyFormatter using Intl.NumberFormat
 * 4. Export it for use in components
 * 5. Import in MealItem.jsx
 * 6. Use format() method on meal.price
 *
 * THE Intl API:
 * =============
 * The Intl (Internationalization) API provides:
 * - Intl.NumberFormat: Format numbers (currency, percent, decimal)
 * - Intl.DateTimeFormat: Format dates and times
 * - Intl.Collator: Compare strings for sorting
 * - Intl.PluralRules: Handle singular/plural forms
 *
 * All support locale-specific formatting!
 *
 * COMMON CURRENCY CODES (ISO 4217):
 * =================================
 * 'USD' - US Dollar ($)
 * 'EUR' - Euro (€)
 * 'GBP' - British Pound (£)
 * 'JPY' - Japanese Yen (¥)
 * 'CNY' - Chinese Yuan (¥)
 *
 * COMMON LOCALES:
 * ===============
 * 'en-US' - English (US)      → $1,234.56
 * 'en-GB' - English (UK)      → £1,234.56
 * 'de-DE' - German (Germany)  → 1.234,56 €
 * 'fr-FR' - French (France)   → 1 234,56 €
 * 'ja-JP' - Japanese (Japan)  → ¥1,235
 *
 * IMPORTING IN COMPONENTS (Lesson 288):
 * =====================================
 * The instructor explains how to use it in MealItem:
 * "And now we can use this currencyFormatter here in the MealItem by
 * importing currencyFormatter from going up one level and then diving
 * into the util folder and importing from the formatting.js file."
 *
 * import { currencyFormatter } from '../util/formatting.js';
 *
 * USAGE IN COMPONENTS:
 * ====================
 * "And then here where we output the meal price we can output
 * currencyFormatter.format meal.price like this"
 *
 * <p className="meal-item-price">
 *   {currencyFormatter.format(meal.price)}
 * </p>
 *
 * USED IN THIS PROJECT:
 * =====================
 * - MealItem.jsx: Format individual meal prices (Lesson 288)
 * - Cart.jsx: Format cart total
 * - Checkout.jsx: Format order total
 *
 * WHAT'S NEXT (end of Lesson 288):
 * ================================
 * "And with that, we can now proceed with the buttons."
 * Next lesson will add the button styling.
 */
