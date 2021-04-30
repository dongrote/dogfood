import express from 'express';
import DebugLogger from 'debug-logger';
import path from 'path';
import HttpError from 'http-error-constructor';
import morgan from 'morgan';
import CookieParser from 'cookie-parser';
import routes from './routes';

const log = DebugLogger('app');
const app = express();

app.use(morgan('dev'));
app.use(CookieParser());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '..', '..', 'webui', 'build')));
app.use('/api', routes);
app.use((req, res, next) => next(new HttpError(404)));
app.use((err, req, res, next) => {
  log.error(err);
  res.status(err.statusCode || 400).json({
    error: {name: err.name, message: err.message}
  });
});

export default app;
