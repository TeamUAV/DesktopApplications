let count = 0;
const electron = require("electron");


/*
Susmit Starts here
*/
const PADDING = 0;
let touch = false;

let rect;
let viewport = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0
};
dragElement(document.getElementById("image"));
/*Susmit End here*/


const { ipcRenderer } = electron;
// document.addEventListener("keydown", (event) => {
//     const { key } = event;
//     // console.log(key);
//     ipcRenderer.send("event:keypress", key);
// });

// ipcRenderer.on("event:keypress:up", (event, arrow) => {

// });
// ipcRenderer.on("event:keypress:down", (event, arrow) => {

// });
// ipcRenderer.on("event:keypress:right", (event, arrow) => {

// });
// ipcRenderer.on("event:keypress:left", (event, arrow) => {

// });

let dronefeed = document.querySelector("#dronefeed img");
ipcRenderer.on("event:frame:drone", (event, data) => {
  dronefeed.src = `data:image/jpg;base64,${data}`;
})



let webcamfeed = document.querySelector("#webcam img");
ipcRenderer.on("event:frame:webcam", (event, data) => {
  webcamfeed.src = `data:image/jpg;base64,${data}`;
})

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
    viewport.bottom = window.innerHeight - PADDING;
    viewport.top = PADDING;
    viewport.left = PADDING;
    viewport.right = window.innerWidth - PADDING;

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
    ) { } else {
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

const keyCodes = [{
  CodeCap: 'A',
  CodeSmall: 'a',
  start: 0,
  end: 0
},
{
  CodeCap: 'S',
  CodeSmall: 's',
  start: 0,
  end: 0
},
{
  CodeCap: 'W',
  CodeSmall: 'w',
  start: 0,
  end: 0
},
{
  CodeCap: 'D',
  CodeSmall: 'd',
  start: 0,
  end: 0
},
{
  CodeCap: 'ArrowLeft',
  CodeSmall: 'ArrowLeft',
  start: 0,
  end: 0
},
{
  CodeCap: 'ArrowRight',
  CodeSmall: 'ArrowRight',
  start: 0,
  end: 0
},
{
  CodeCap: 'ArrowUp',
  CodeSmall: 'ArrowUp',
  start: 0,
  end: 0
},
{
  CodeCap: 'ArrowDown',
  CodeSmall: 'ArrowDown',
  start: 0,
  end: 0
}
];

window.addEventListener('keydown', (evt) => {
  let key = evt.key;
  for (let i = 0; i < keyCodes.length; i++) {
    if ((key == keyCodes[i].CodeCap || key == keyCodes[i].CodeSmall) && keyCodes[i].start == 0) {
      keyCodes[i].start = new Date();
    }
  }
})

let check = false;

window.addEventListener('keyup', (evt) => {
  let key = evt.key;
  for (let i = 0; i < keyCodes.length; i++) {
    if (key == keyCodes[i].CodeCap || key == keyCodes[i].CodeSmall) {
      keyCodes[i].end = new Date();
      if (keyCodes[i].end - keyCodes[i].start >= 500) {
        for (let j = 0; j < keyCodes.length; j++) {
          if (j != i && keyCodes[j].start != keyCodes[j].end) {
            check = true;
            for (let k = 0; k < 4; k++) {
              keyCodes[k].start = 0;
              keyCodes[k].end = 0;
            }
            return;
          }
        }
        if (!check) {
          if (key == 'a' || key == 'A') ipcRenderer.send('event:keypress:left', key);
          else if (key == 's' || key == 'S') ipcRenderer.send('event:keypress:back', key);
          else if (key == 'd' || key == 'D') ipcRenderer.send('event:keypress:right', key);
          else if (key == 'a' || key == 'A') ipcRenderer.send('event:keypress:forward', key);
          else if (key == 'ArrowLeft') ipcRenderer.send('event:keypress:yaw:left', key);
          else if (key == 'ArrowRight') ipcRenderer.send('event:keypress:yaw:right', key);
          else if (key == 'ArrowUp') ipcRenderer.send('event:keypress:thrust:up', key);
          else if (key == 'ArrowDown') ipcRenderer.send('event:keypress:thrust:down', key);
          else { }
        }
      } //500ms is the delay time
    }
  }
  for (let i = 0; i < keyCodes.length; i++) {
    keyCodes[i].start = 0;
    keyCodes[i].end = 0;
  }
  check = false;
})