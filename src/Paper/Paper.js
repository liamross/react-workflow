import {
    createElementWithAttributes,
    createSVGWithAttributes,
} from '../utilities/domUtils';
import { setPaperDefs } from './PaperDefs';

export class Paper {
    constructor({ width, height, plugins, attributes, initialConditions }) {
        // Workspace parameters.
        this.width = width;
        this.height = height;
        this.plugins = plugins;

        // Workspace IDs.
        const randomId = Math.round(Math.random() * 1000000);
        this.paperWrapperId = `paper-wrapper_${randomId}`;
        this.paperId = `paper_${randomId}`;

        // Additional parameters or defaults.
        this.gridSize = attributes.gridSize || 0;
        this.gridColor = attributes.gridColor || '#EEE';
        this.allowBlockOverlap = attributes.allowBlockOverlap || false;
        this.nodes = initialConditions.nodes || [];
        this.edges = initialConditions.edges || [];
        const paperWrapperClass = attributes.paperWrapperClass || '';
        const paperClass = attributes.paperClass || '';

        // Paper Wrapper set up.
        const PWAttributes = {};
        PWAttributes.id = this.paperWrapperId;
        // TODO: onmousedown listener.
        PWAttributes.style = `width:${this.width}; height:${this.height}`;
        if (paperWrapperClass) { PWAttributes.class = paperWrapperClass; }
        this.paperWrapper = createElementWithAttributes('div', PWAttributes);

        // Paper set up.
        const PAttributes = {};
        PAttributes.id = this.paperId;
        PAttributes.width = '100%';
        PAttributes.height = '100%';
        if (paperClass) { PAttributes.class = paperClass; }
        this.paper = createSVGWithAttributes('svg', PAttributes);

        // Add defs to paper.
        setPaperDefs(this.paper, this.gridSize, this.gridColor);

        // Append paper into wrapper.
        this.paperWrapper.appendChild(this.paper);

        // Add initial nodes and edges to paper.
        this.nodes.forEach(node => this.renderNode(node));
        this.edges.forEach(edge => this.renderNode(edge));
    }

    /**
     * Returns the paper wrapped in paper wrapper.
     * @returns {Element}
     */
    getPaperElement() {
        return this.paperWrapper;
    }

    renderNode(node) {
        // TODO: implement.
    }

    addNode(node) {
        // TODO: implement.
    }

    updateNode() {
        // TODO: implement.
    }

    removeNode(id) {
        // TODO: implement.
    }

    renderEdge(edge) {
        // TODO: implement.
    }

    addEdge(edge) {
        // TODO: implement.
    }

    updateEdge() {
        // TODO: implement.
    }

    removeEdge(id) {
        // TODO: implement.
    }
}