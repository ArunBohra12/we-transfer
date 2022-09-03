const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const fileRouter = require('./routes/fileRoutes');
const downloadRouter = require('./routes/downloadsRoute');

const app = express();

// Development Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // To support json encoded bodies
app.use(express.urlencoded({ extended: true })); // To support url encoded bodies
app.use(cors());

// v1 API Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/file', fileRouter);

// Files Route
app.use('/file', downloadRouter);

// For deployment
// This block of code has to be here, at last in routes middleware stack
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static('frontend/dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't ${req.method} ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
