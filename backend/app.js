const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const path = require('node:path');

const userRouter = require('./routes/userRoutes');
const fileRouter = require('./routes/fileRoutes');

const app = express();

// Development Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cors());

// v1 API Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/file', fileRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't ${req.method} ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
