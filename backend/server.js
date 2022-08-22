const dotenv = require('dotenv');
const mongoose = require('mongoose');
require('colors');

process.on('uncaughtException', err => {
  console.log(`UNHANDLED EXCEPTION! 🔥🔥 Shutting down...`.bgRed.white.bold);
  console.log(`${err.name}, ${err.message}`.red.bold);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE_CONNECTION_STRING;

mongoose.connect(DB).then(() => console.log('Connected to DB!!'.green.bold));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Server is up and running on port ${port}`));

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 🔥🔥 Shutting down...'.bgRed.white.bold);
  console.log(`${err.name}, ${err.message}`.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
