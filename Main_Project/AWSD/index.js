const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
let main;
app.on('ready', () => {
    main = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    main.loadURL(`file://${__dirname}/Image.html`);
});
ipcMain.on('key', (event, arrow) => {
    if (arrow === 'w') {
        main.webContents.send('Up', arrow);
    }
    if (arrow === 'a') {
        main.webContents.send('Left', arrow);
    }
    if (arrow === 'd') {
        main.webContents.send('Right', arrow);
    }
    if (arrow === 's') {
        main.webContents.send('Down', arrow);
    }
});
