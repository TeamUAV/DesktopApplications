/*
Susmit Starts here
*/
const PADDING = 0;

let rect;
let viewport = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
};
dragElement(document.getElementById("image"));
/*Susmit End here*/

function dragElement(elmnt) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        rect = elmnt.getBoundingClientRect();
        viewport.bottom = window.innerHeight;
        viewport.top = 0;
        viewport.left = 0;
        viewport.right = window.innerWidth;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        let newLeft = elmnt.offsetLeft - pos1;
        let newTop = elmnt.offsetTop - pos2;

        if (newLeft < viewport.left ||
            newTop < viewport.top ||
            newLeft + rect.width > viewport.right ||
            newTop + rect.height > viewport.bottom
        ) {} else {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}