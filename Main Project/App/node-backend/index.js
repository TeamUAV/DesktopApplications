const electron = require('electron');
const child_process = require('child_process');
const { app, BrowserWindow, ipcMain } = electron;
let main;
app.on('ready', () => {
    main = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    main.loadURL(`file://${__dirname}/../front-end/index.html`);
});
ipcMain.on('event:keypress', (event, arrow) => {
    console.log(arrow);
    if (arrow === 'w') {
        console.log('up');
        main.webContents.send('event:keypress:up', arrow);
    }
    if (arrow === 'a') {
        console.log('left');
        main.webContents.send('event:keypress:left', arrow);
    }
    if (arrow === 'd') {
        console.log('right');
        main.webContents.send('event:keypress:right', arrow);
    }
    if (arrow === 's') {
        console.log('bottom');
        main.webContents.send('event:keypress:down', arrow);
    }
});

let webCamImage = '';
let webcam = child_process.spawn('python3', ['video-backend/webcam-feed.py']);
webcam.stdout.on('data', function(data) {
    if (data.toString().includes('<ENDER && SEPARATOR>')){
        let index = data.toString().indexOf('<ENDER && SEPARATOR>');
        webCamImage+= data.toString().slice(0, index);
        main.webContents.send('event:frame:webcam', webCamImage)
        webCamImage = '';
      }
      else{
       webCamImage += data.toString();
      }
});
