import { ShapeParameters } from '../Block/Shapes';

/**
 * Returns true if blocks are overlapping in the workspace, false otherwise.
 * Will return false if either block is an invalid value.
 * @param {Object} block1 - First block to compare.
 * @param {Object} block2 - Second block to compare.
 * @param {number} gridSize - Size of workspace grid.
 * @param {boolean} allowContact - If false, blocks have 1-gridSize buffer.
 * @returns {boolean} - True if blocks overlap, false if they do not.
 */
export const isBlockColliding = (block1, block2, gridSize, allowContact) => {
  const { width: firstW, height: firstH } = getWidthHeight(block1);
  const { width: secondW, height: secondH } = getWidthHeight(block2);
  return (
    block1
    && block2
    && block1.x < block2.x + (allowContact ? 0 : gridSize / 2) + secondW
    && block2.x < block1.x + (allowContact ? 0 : gridSize / 2) + firstW
    && block1.y < block2.y + (allowContact ? 0 : gridSize / 2) + secondH
    && block2.y < block1.y + (allowContact ? 0 : gridSize / 2) + firstH
  );
};

/**
 * Rounds number to nearest interval. Returns number if interval is 0.
 * @param {number} number - The number to round.
 * @param {number} interval - The interval to round the number to.
 * @returns {number} - The rounded number, or the number if interval is 0.
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
    if (b.id === id) {
      return -1;
    }
    if (a.id === id) {
      return 1;
    }
    return 0;
  });
};

/**
 * Find the coordinates of a block's midpoint.
 * @param {Object} block - Block to find midpoint of.
 * @param {number} gridSize - Grid size for rounding, no rounding if none given.
 * @returns {Object} - Object with keys x, y of block midpoint.
 */
export const getBlockMidpoint = (block, gridSize = 0) => {
  const { width, height } = getWidthHeight(block);
  const x = roundToNearest(block.x + width / 2, gridSize);
  const y = roundToNearest(block.y + height / 2, gridSize);
  return { x, y };
};

/**
 * Finds the point along the side of the block to trip path to.
 * @param {Object} intersectPoint - Point suspected of being within a block.
 * @param {Object} nextPoint - Next-closest path point.
 * @param {Object} block - Object to find side-point of.
 * @returns {Object} - Intersect with block edge, or center if no intersect.
 */
export const getPathBlockIntersection = (intersectPoint, nextPoint, block) => {
  if (intersectPoint && nextPoint && block) {
    const { width: bw, height: bh } = getWidthHeight(block);
    // Set path points (same for every function call).
    const p = [intersectPoint.x, intersectPoint.y, nextPoint.x, nextPoint.y];

    // Set constants for block parameters.
    const bx = block.x;
    const by = block.y;

    return (
      lineIntersect(...p, bx, by, bx, by + bh)              // Left edge.
      || lineIntersect(...p, bx + bw, by, bx + bw, by + bh) // Right edge.
      || lineIntersect(...p, bx, by, bx + bw, by)           // Top edge.
      || lineIntersect(...p, bx, by + bh, bx + bw, by + bh) // Bottom edge.
      || { x: intersectPoint.x, y: intersectPoint.y }       // Default
    );
  }
};

export const getWidthHeight = block => {
  const { width, height } = block.hasOwnProperty('shape')
    ? ShapeParameters[block.shape]
    : block;
  return { width, height };
};

/**
 * Find intersect between two lines if it exists.
 * Line 1:
 * @param {number} x1 - Point A, X-coordinate.
 * @param {number} y1 - Point A, Y-coordinate.
 * @param {number} x2 - Point B, X-coordinate.
 * @param {number} y2 - Point B, Y-coordinate.
 * Line 2:
 * @param {number} x3 - Point A, X-coordinate.
 * @param {number} y3 - Point A, Y-coordinate.
 * @param {number} x4 - Point B, X-coordinate.
 * @param {number} y4 - Point B, Y-coordinate.
 * @returns {Object | null} - If lines intersect, return intersect, else null.
 */
export const lineIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom) {
    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1
      ? { x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1) }
      : null;
  }
  return null;
};

/**
 * Creates sequential IDs with a given prefix.
 * @param {string} prefix - Prefix for IDs returned from iterator.
 * @returns {function(): string} - The ID iterator.
 */
const nextIdIterator = prefix => {
  let nextId = 1;
  return () => `${prefix}-${nextId++}`;
};
// export const getNextBlockId = nextIdIterator('block');
export const getNextPathId = nextIdIterator('path');