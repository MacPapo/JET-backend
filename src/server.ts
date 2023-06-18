import Logger from './core/Logger';
import { port } from './config';
import app from './app';
import SocketManager from './socket/SocketManager';

app
  .listen(port, () => {
    Logger.info(`server running on port : ${port}`);
  })
  .on('error', (e) => Logger.error(e));

SocketManager.handleConnection()
