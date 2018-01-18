/**
 *
 * @param {Object} block1 -
 * @param {Object} block2 -
 * @param {number} interval -
 * @param {boolean} allowAdjacentBlocks -
 * @returns {boolean}
 */
export const isBlockColliding = (
  block1,
  block2,
  interval = 0,
  allowAdjacentBlocks = false,
) => {
  if (block1 && block2) {
    return (
      block1
      && block2
      && block1.x < roundToNearest(block2.width, interval) + block2.x + (allowAdjacentBlocks ? 0 : interval / 2)
      && block1.y < roundToNearest(block2.height, interval) + block2.y + (allowAdjacentBlocks ? 0 : interval / 2)
      && block2.x < roundToNearest(block1.width, interval) + block1.x + (allowAdjacentBlocks ? 0 : interval / 2)
      && block2.y < roundToNearest(block1.height, interval) + block1.y + (allowAdjacentBlocks ? 0 : interval / 2)
    );
  } else {
    console.error(
      'Block undefined:'
      + '\nBlock 1: ' + block1
      + '\nBlock 2: ' + block2
    );
    // Say colliding == true... is this the right thing to do?
    return true;
  }
};

/**
 *
 * @param {number} number -
 * @param {number} interval -
 */
export const roundToNearest = (number, interval) => (
  Math.round(number / interval) * interval
);

/**
 *
 * @param {string} id -
 * @param {Array.<Object>} blocks -
 * @returns {Array.<Object>} -
 */
export const setIdToTop = (id, blocks) => {
  const sortBlocks = blocks.slice();
  return sortBlocks.sort((a, b) => {
    if (b.id === id) { return -1 }
    if (a.id === id) { return 1 }
    return 0;
  });
};