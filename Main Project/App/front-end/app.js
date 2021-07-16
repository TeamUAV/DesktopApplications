let count = 0;
const electron = require("electron");
const { ipcRenderer } = electron;
document.addEventListener("keydown", (event) => {
  const { key } = event;
  console.log(key);
  ipcRenderer.send("event:keypress", key);
});

ipcRenderer.on("event:keypress:up", (event, arrow) => {
  
});
ipcRenderer.on("event:keypress:down", (event, arrow) => {
  
});
ipcRenderer.on("event:keypress:right", (event, arrow) => {
  
});
ipcRenderer.on("event:keypress:left", (event, arrow) => {
  
});
dragElement(document.getElementById("image"));

let dronefeed = document.querySelector("#dronefeed img");
ipcRenderer.on("event:frame:drone", (event, data) => {
  dronefeed.src = `data:image/jpg;base64,${data}`;
})



let webcamfeed = document.querySelector("#webcam img");
ipcRenderer.on("event:frame:webcam", (event, data) => {
  webcamfeed.src = `data:image/jpg;base64,${data}`;
})

// window.addEventListener('resize', () => {
//   webcamfeed.
// })


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
