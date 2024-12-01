const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { fork } = require('child_process');

// Create the Electron window
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true, // Allow node integration in the renderer process
            contextIsolation: false, // Allow full access to Node.js in the renderer process
        },

    });

    // Load the Vite app
    mainWindow.loadURL('http://localhost:5173'); // Vite default port
}

app.whenReady().then(() => {
    // Create the window and start the dev server
    createWindow();

    // Open DevTools if needed
    mainWindow.webContents.openDevTools();

    // Quit the app when all windows are closed
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
});

// Handle the app window close
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
