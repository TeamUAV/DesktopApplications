let count = 0;
const electron = require("electron");
const { ipcRenderer } = electron;
document.addEventListener("keydown", (event) => {
  const { key } = event;
  console.log(key);
  ipcRenderer.send("key", key);
});
ipcRenderer.on("Up", (event, arrow) => {
  let h = document.createElement("h3");
  let t = document.createTextNode("Up");
  h.appendChild(t);
  if (count === 0) {
    image.appendChild(h);
    count++;
  } else {
    image.prepend(h);
  }
});
ipcRenderer.on("Down", (event, arrow) => {
  let h = document.createElement("h3");
  let t = document.createTextNode("Down");
  h.appendChild(t);
  if (count === 0) {
    image.appendChild(h);
    count++;
  } else {
    image.prepend(h);
  }
});
ipcRenderer.on("Right", (event, arrow) => {
  let h = document.createElement("h3");
  let t = document.createTextNode("Right");
  h.appendChild(t);
  if (count === 0) {
    image.appendChild(h);
    count++;
  } else {
    image.prepend(h);
  }
});
ipcRenderer.on("Left", (event, arrow) => {
  let h = document.createElement("h3");
  let t = document.createTextNode("Left");
  h.appendChild(t);
  if (count === 0) {
    image.appendChild(h);
    count++;
  } else {
    image.prepend(h);
  }
});
dragElement(document.getElementById("image"));


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
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
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

    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
