import {
    createElementWithAttributes,
    createSVGWithAttributes,
} from '../utilities/domUtils';
import {setPaperDefs} from './PaperFunctions/paperDefs';

export class Paper {
    constructor ({width, height, plugins, ...params}) {
        // Workspace parameters.
        this.width = width;
        this.height = height;
        this.plugins = plugins;

        // Workspace IDs.
        const randomId = Math.round(Math.random() * 1000000);
        this.paperWrapperId = `paper-wrapper_${randomId}`;
        this.paperId = `paper_${randomId}`;

        // Additional parameters or defaults.
        this.gridSize = params.gridSize || 0;
        this.gridColor = params.gridColor || '#EEE';
        this.allowBlockOverlap = params.allowBlockOverlap || false;
        const paperWrapperClass = params.paperWrapperClass || '';
        const paperClass = params.paperClass || '';

        // Paper Wrapper set up.
        const PWAttributes = {};
        PWAttributes.id = this.paperWrapperId;
        // TODO: set mousedown function.
        PWAttributes.onmousedown = (evt) => {
            console.warn('IMPLEMENT onmousedown:\n', evt);
        };
        PWAttributes.style = `width:${this.width}; height:${this.height}`;
        if (paperWrapperClass) { PWAttributes.class = paperWrapperClass; }
        this.paperWrapper = createElementWithAttributes('div', PWAttributes);

        // Paper set up.
        const PAttributes = {};
        PAttributes.id = this.paperId;
        if (paperClass) { PAttributes.class = paperClass; }
        this.paper = createSVGWithAttributes('svg', PAttributes);

        // Add defs to paper.
        this.paper.appendChild(setPaperDefs(this.gridSize, this.gridColor));

        // Append paper into wrapper.
        this.paperWrapper.appendChild(this.paper);

        // TODO: if provided initial nodes + edges, call add for each.
    }

    /**
     * Returns the paper wrapped in paper wrapper.
     * @returns {Element}
     */
    getPaperElement() {
        return this.paperWrapper;
    }

    addNode (node) {
        // TODO: implement.
    }

    updateNode () {
        // TODO: implement.
    }

    removeNode (id) {
        // TODO: implement.
    }

    addEdge (edge) {
        // TODO: implement.
    }

    updateEdge () {
        // TODO: implement.
    }

    removeEdge(id) {
        // TODO: implement.
    }
}