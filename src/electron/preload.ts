import { ipcRenderer, contextBridge } from 'electron';

export const API = {
  // Example
  GetVersion: () => ipcRenderer.invoke('get/version'),
};

contextBridge.exposeInMainWorld('api', API);
