import { app } from 'electron';
import * as log from 'electron-log';

const isDev = !app.isPackaged;

const logger = log;
logger.transports.file.level = isDev ? 'silly' : 'info';
logger.transports.console.level = isDev ? 'silly' : false;

export default logger;
