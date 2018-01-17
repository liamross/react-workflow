var workflow = null;
var clickedNode = null;
var mouseX = 0;
var mouseY = 0;
var elementX = 0;
var elementY = 0;

/**
 *
 * @param evt
 * @param workflowRef
 */
function onWorkflowClick(evt, workflowRef) {
  workflow = workflowRef;
  var target = evt.target;
  var targetClass = target.getAttributeNS(null, 'class');
  if (targetClass && targetClass.includes("draggable")) {
    if (clickedNode !== evt.target) {
      clickedNode = evt.target
    }
    if (!targetClass.includes("selected")) {
      clearSelected();
      clickedNode.setAttributeNS(null, 'class', 'draggable selected');
    }
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    var coordinates = clickedNode.getAttributeNS(null, 'transform')
      .match(/\(([^)]+)\)/)[1]
      .split(' ');

    elementX = Number(coordinates[0]);
    elementY = Number(coordinates[1]);

    workflow.setAttributeNS(null, "onmousemove", "moveNode(evt)");
    workflow.setAttributeNS(null, "onmouseup", "dropNode()");
  } else {
    clearSelected();
  }
}

function moveNode(evt) {
  var dx = evt.clientX - mouseX;
  var dy = evt.clientY - mouseY;
  elementX += dx;
  elementY += dy;

  clickedNode.setAttributeNS(
    null,
    'transform',
    'translate(' + elementX + ' ' + elementY + ')'
  );
  mouseX = evt.clientX;
  mouseY = evt.clientY;
}

function dropNode(evt){
  if(clickedNode){
    workflow.removeAttributeNS(null, "onmousemove");
    workflow.removeAttributeNS(null, "onmouseup");
    clickedNode = null;
  }
}

function clearSelected() {
  var unselectNode = document.getElementsByClassName('selected')[0];
  if (unselectNode) {
    unselectNode.setAttributeNS(null, 'class', 'draggable');
  }
}