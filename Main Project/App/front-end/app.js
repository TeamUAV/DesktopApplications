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


let dronefeed = document.querySelector("#dronefeed img");
ipcRenderer.on("event:frame:drone", (event, data) => {
  dronefeed.src = `data:image/jpg;base64,${data}`;
})



let webcamfeed = document.querySelector("#webcam img");
ipcRenderer.on("event:frame:webcam", (event, data) => {
  webcamfeed.src = `data:image/jpg;base64,${data}`;
})

