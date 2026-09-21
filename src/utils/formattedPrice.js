/**
 * Formats a number into a localized currency string.
 * Example:
 *  formatedPrice(1234.5)          -> "$1,234.50" (default en-US, USD)
 *  formatedPrice(1234.5, "de-DE", "EUR") -> "1.234,50 €"
 *
 * @param {number} amount - The numeric value to format
 * @param {string} [currency="USD"] - Optional currency code (default "USD")
 * @returns {string} Localized currency string
 */

export function formatedPrice(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
