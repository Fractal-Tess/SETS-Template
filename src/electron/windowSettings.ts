import ElectronStore from 'electron-store';
import { screen } from 'electron';
const storage = new ElectronStore();

/**
 * Storage for Window size & possition
 */

// Window size

const defaultSize: Size = {
  width: 1280,
  height: 720
};

function GetSize(): Size {
  const size = (storage.get('win-size') as Size | null) ?? defaultSize;
  SaveSize(size);
  return size;
}

function SaveSize(size: Size): void {
  storage.set('win-size', size);
}

// Window possition

function GetPosition(): Position {
  let { width: x, height: y } = screen.getPrimaryDisplay().workAreaSize;
  x /= 8;
  y /= 8;
  return (storage.get('position') as Position | null) ?? { x, y };
}

function SavePosition(position: Position): void {
  storage.set('position', position);
}

const win = {
  getPos: GetPosition,
  savePos: SavePosition,
  getSize: GetSize,
  saveSize: SaveSize
};

export default win;
