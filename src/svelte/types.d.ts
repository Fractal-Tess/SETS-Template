/// <reference types="svelte" />

import { API } from '../electron/preload';

declare global {
  interface Window {
    api: typeof API;
  }
}
