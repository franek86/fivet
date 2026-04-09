/**
 * Formats a number into a localized currency string.
 * Example:
 *  formatedPrice(1234.5)          -> "$1,234.50" (default en-US, USD)
 *  formatedPrice(1234.5, "de-DE", "EUR") -> "1.234,50 €"
 *
 * @param {number} amount - The numeric value to format
 * @param {string} [locale="en-US"] - Optional locale string (default "en-US")
 * @param {string} [currency="USD"] - Optional currency code (default "USD")
 * @returns {string} Localized currency string
 */

export function formatedPrice(amount, locale = "en-US", currency = "USD") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
