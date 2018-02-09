import {Paper} from './Workflow/Paper/Paper';

function loadPaper() {
    console.log('load paper');
    const myPaper = new Paper({
        width: '1300px',
        height: '900px',
        attributes: {
            gridSize: 20,
        },
    });
    const target = document.getElementById('_target');
    target.appendChild(myPaper.getPaperElement());
}