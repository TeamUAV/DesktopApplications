const electron = require("electron");
const child_process = require('child_process');

const { app, BrowserWindow } = electron;

let mainWindow, mainWindow2;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
      width: 1600,
      height: 925,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
    let strImage = '';
    let py = child_process.spawn('python3', ['client.py']);
    py.stdout.on('data', function(data){
      if (data.toString().includes('<ENDER && SEPARATOR>')){
        let index = data.toString().indexOf('<ENDER && SEPARATOR>');
        strImage+= data.toString().slice(0, index);
        mainWindow.webContents.send('newframe', strImage)
        strImage = '';
      }
      else{
       strImage += data.toString();
      }
    });

    mainWindow2 = new BrowserWindow({
      width: 1600,
      height: 925,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow2.loadURL(`file://${__dirname}/main.html`);

  let strImageDrone = '';
    let pyDrone = child_process.spawn('python3', ['drone_feed.py']);
    pyDrone.stdout.on('data', function(data){
      if (data.toString().includes('<ENDER && SEPARATOR>')){
        let index = data.toString().indexOf('<ENDER && SEPARATOR>');
        strImageDrone+= data.toString().slice(0, index);
        mainWindow2.webContents.send('newframe', strImageDrone)
        strImageDrone = '';
      }
      else{
       strImageDrone += data.toString();
      }
    });

});
