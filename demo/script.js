import {Paper} from '../src';

function loadPaper() {
    console.log('load paper');
    const myPaper = new Paper({
        width: '1300px',
        height: '900px',
        attributes: {
            gridSize: 20,
        },
        initialConditions: {},
    });
    const target = document.getElementById('_target');
    target.appendChild(myPaper.getPaperElement());
}

document.addEventListener('DOMContentLoaded', () => loadPaper());