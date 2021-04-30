#!/usr/bin/env node
import 'dotenv/config';
import DebugLogger from 'debug-logger';

import env from './env';
import app from './app';
import Websocket from './core/Websocket';
import http from 'http';

const log = DebugLogger('inventory:startup'),
  port = env.port();

const httpServer = http.createServer(app);
Websocket.initialize();
Websocket.attach(httpServer);
httpServer
  .on('error', (err: Error): void => {
    log.error(err);
    throw err;
  })
  .on('listening', (): void => log.info(`listening on port ${port}`))
  .listen(port);
