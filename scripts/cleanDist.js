const { existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync } = require('fs');
const { join } = require('path');

const deleteFolderRecursive = (folderPath) => {
  if (existsSync(folderPath)) {
    readdirSync(folderPath).forEach((file) => {
      const curPath = join(folderPath, file);
      if (lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        unlinkSync(curPath);
      }
    });
    rmdirSync(folderPath);
  }
};

const dist = join(__dirname, '../dist');
deleteFolderRecursive(dist);
