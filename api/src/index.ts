#!/usr/bin/env node
import 'dotenv/config';
import DebugLogger from 'debug-logger';

import env from './env';
import app from './app';
import http from 'http';

const log = DebugLogger('dogfood:startup'),
  port = env.port();

http.createServer(app)
  .on('error', (err: Error): void => {
    log.error(err);
    throw err;
  })
  .on('listening', (): void => log.info(`listening on port ${port}`))
  .listen(port);
