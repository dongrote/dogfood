import express from 'express';
import HttpError from 'http-error-constructor';
import morgan from 'morgan';
import CookieParser from 'cookie-parser';

const app = express();

app.use(morgan('dev'));
app.use(CookieParser());
app.use((req, res, next) => next(new HttpError(404)));
app.use((err, req, res, next) => {
  res.status(err.statusCode || 400).json({
    error: {name: err.name, message: err.message}
  });
});

export default app;
