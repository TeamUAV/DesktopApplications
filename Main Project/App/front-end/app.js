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


let webcam = document.querySelector("#webcam img");
ipcRenderer.on("event:frame:webcam", (event, data) => {
  webcam.src = `data:image/jpg;base64,${data}`;
})

