const { contextBridge } = require('electron');

// Expose a safe API to the renderer process
contextBridge.exposeInMainWorld('electron', {
    // Define safe methods to use in the renderer (React)
});
