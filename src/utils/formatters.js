/**
 * Format a number as currency with thousand separators
 * @param {number|string} amount - The amount to format
 * @param {string} currency - Currency symbol (default: 'KSh')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = "KSh") => {
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return `${currency} 0`;

  return `${currency} ${numAmount.toLocaleString("en-KE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format a number with thousand separators
 * @param {number|string} value - The value to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return "0";

  return numValue.toLocaleString("en-KE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
