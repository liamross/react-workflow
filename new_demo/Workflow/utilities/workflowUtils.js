import {ShapeParameters} from '../Block/Shapes';

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
    const {width: firstWidth, height: firstHeight} = getWidthHeight(block1);
    const {width: secondWidth, height: secondHeight} = getWidthHeight(block2);
    return (
        block1 && block2
        && block1.x < block2.x + (allowContact ? 0 : gridSize / 2) + secondWidth
        && block2.x < block1.x + (allowContact ? 0 : gridSize / 2) + firstWidth
        && block1.y < block2.y + (allowContact ? 0 : gridSize / 2) + secondHeight
        && block2.y < block1.y + (allowContact ? 0 : gridSize / 2) + firstHeight
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
    return sortBlocks.sort((a, b) => a.id === id ? 1 : b.id === id ? -1 : 0);
};

/**
 * Find the coordinates of a block's midpoint.
 * @param {Object} block - Block to find midpoint of.
 * @param {number} gridSize - Grid size for rounding, no rounding if none given.
 * @returns {{x: number, y: number}} - Coordinates of block's midpoint.
 */
export const getBlockMidpoint = (block, gridSize = 0) => {
    const {width, height} = getWidthHeight(block);
    return {
        x: roundToNearest(block.x + width / 2, gridSize),
        y: roundToNearest(block.y + height / 2, gridSize),
    };
};

/**
 * Finds the point along the side of the block to trip path to.
 * @param {Object} intersectPoint - Point suspected of being within a block.
 * @param {Object} nextPoint - Next-closest path point.
 * @param {Object} block - Block to find side-point of.
 * @returns {{x: number, y: number}} - Intersect, or center if none found.
 */
export const getPathBlockIntersection = (intersectPoint, nextPoint, block) => {
    const p = [intersectPoint.x, intersectPoint.y, nextPoint.x, nextPoint.y];
    const {x: bx, y: by} = block;
    const {width: bw, height: bh} = getWidthHeight(block);
    return (lineIntersect(...p, bx, by, bx, by + bh)            // Left edge.
        || lineIntersect(...p, bx + bw, by, bx + bw, by + bh)   // Right edge.
        || lineIntersect(...p, bx, by, bx + bw, by)             // Top edge.
        || lineIntersect(...p, bx, by + bh, bx + bw, by + bh)   // Bottom edge.
        || {x: intersectPoint.x, y: intersectPoint.y}           // Default (midpoint).
    );
};

/**
 * If block has shape property, returns width and height of shape. Else returns
 * block's width and height.
 * @todo This will actually reference the type of the block for width and height.
 * @param {Object} block
 * @returns {{width, height}}
 */
export const getWidthHeight = block => {
    const {width, height} = block.hasOwnProperty('shape')
        ? ShapeParameters[block.shape]
        : block;
    return {width, height};
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
 * @returns {{x: number, y: number}|null} - Return intersect or null if none.
 */
export const lineIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom) {
        const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
        const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
        return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1
            ? {x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1)}
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