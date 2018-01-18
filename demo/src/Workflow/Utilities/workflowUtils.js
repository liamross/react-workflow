/**
 * Returns true if blocks are overlapping in the workspace, false otherwise.
 * Will return false if either block is an invalid value.
 * @param {Object} block1 - First block to compare.
 * @param {Object} block2 - Second block to compare.
 * @param {number} gridSize - Size of workspace grid.
 * @param {boolean} allowContact - If false, blocks have 1-gridSize buffer.
 * @returns {boolean} - Are these blocks overlapping in the workspace?
 */
export const isBlockColliding = (block1, block2, gridSize, allowContact) => (
  block1
  && block2
  && block1.x < block2.x + (allowContact ? 0 : gridSize / 2) + block2.width
  && block2.x < block1.x + (allowContact ? 0 : gridSize / 2) + block1.width
  && block1.y < block2.y + (allowContact ? 0 : gridSize / 2) + block2.height
  && block2.y < block1.y + (allowContact ? 0 : gridSize / 2) + block1.height
);

/**
 * Rounds number to nearest interval. Returns number if interval is 0.
 * @param {number} number - The number to round.
 * @param {number} interval - The interval to round the number to.
 */
export const roundToNearest = (number, interval) => (
  interval ? Math.round(number / interval) * interval : number
);

/**
 * Sets the block that has matching id to end of array, making it the top
 * element in the svg. Returns a new array with matching block as last item.
 * @param {string} id - The id to match.
 * @param {Array.<Object>} blocks - Unsorted array of blocks.
 * @returns {Array.<Object>} - Sorted array of blocks.
 */
export const blockToFront = (id, blocks) => {
  const sortBlocks = blocks.slice();
  return sortBlocks.sort((a, b) => {
    if (b.id === id) { return -1 }
    if (a.id === id) { return 1 }
    return 0;
  });
};