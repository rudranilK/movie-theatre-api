require('dotenv').config();
const express = require('express');
const app = express();

process.on('uncaughtException', (reason, promise) => {
   console.error('Uncaught Exception at:', promise, 'reason:', reason);
   //Log the error in file
});

process.on('unhandledRejection', (reason, promise) => {
   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
   process.exit(-1);
});

require('./src/startup')(app);

const server = app.listen(process.env.PORT || 5000, () => {
   console.log(`Listning on port ${process.env.PORT || 5000}`);
});

module.exports = server;