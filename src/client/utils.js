/**
 * Sets the focus to the end of the specified element.
 *
 * @param {HTMLElement} elem - The element to set the focus to.
 */
export function focusAtEnd(elem) {
  let selection = window.getSelection();
  selection.selectAllChildren(elem);
  selection.collapseToEnd();
}

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
