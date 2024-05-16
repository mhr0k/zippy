/**
 * Get a range based on the data and step provided.
 * @param {number} data - The data to calculate the range from.
 * @param {number} [step=10] - The step size for the range calculation.
 * @returns {string} The range in the format 'start-end'.
 */
export function getRange(data, step = 10) {
  if (data < 10) {
    return "0-10";
  }
  const rangeEnd = Math.ceil(data / step) * step;
  const rangeStart = rangeEnd - step;
  return `${rangeStart}-${rangeEnd}`;
}
