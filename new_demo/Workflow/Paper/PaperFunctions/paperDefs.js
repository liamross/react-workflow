import {createSVGWithAttributes} from '../../utilities/domUtils';

/**
 * Builds out the complete defs element for paper component.
 * @param {number} gridSize - Size of grid pattern.
 * @param {string} gridColor - Color of grid.
 * @returns {Element} - Returns def SVG element for paper.
 */
export function setPaperDefs(gridSize, gridColor) {
    const defs = createSVGWithAttributes('defs');

    // Add grid if valid grid size is provided.
    if (gridSize > 0) {
        // Subgrid
        const subgrid = createSVGWithAttributes('pattern', {
            id: '_subgrid',
            width: gridSize / 2,
            height: gridSize / 2,
            patternUnits: 'userSpaceOnUse',
        });
        const subgridPath = createSVGWithAttributes('path', {
            d: `M ${gridSize / 2} 0 L 0 0 0 ${gridSize / 2}`,
            fill: 'none',
            stroke: gridColor,
            strokeWidth: '0.5',
        });
        subgrid.appendChild(subgridPath);
        defs.appendChild(subgrid);

        // Grid
        const grid = createSVGWithAttributes('pattern', {
            id: '_grid',
            width: gridSize,
            height: gridSize,
            patternUnits: 'userSpaceOnUse',
        });
        const gridRect = createSVGWithAttributes('rect', {
            width: '100%',
            height: '100%',
            fill: 'url(#_subgrid)',
        });
        const gridPath = createSVGWithAttributes('path', {
            d: `M ${gridSize} 0 L 0 0 0 ${gridSize}`,
            fill: 'none',
            stroke: gridColor,
            strokeWidth: '1',
        });
        grid.appendChild(gridRect);
        grid.appendChild(gridPath);
        defs.appendChild(grid);
    }

    // Arrowhead
    // TODO: eventually implement path without marker for dynamic colors.
    const arrowhead = createSVGWithAttributes('marker', {
        id: '_arrow',
        markerWidth: '10',
        markerHeight: '10',
        refX: '6',
        refY: '5',
        orient: 'auto',
        markerUnits: 'strokeWidth',
    });
    const arrowheadPath = createSVGWithAttributes('path', {
        d: 'M 0 0 L 0 10 L 10 5 Z',
        fill: '#333',
        className: 'WorkflowPath__arrowhead',
    });
    arrowhead.appendChild(arrowheadPath);
    defs.appendChild(arrowhead);

    return defs;
}