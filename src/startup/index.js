const { mongoose } = require("mongoose");
const errorHandler = require('../middlewares/error');
const successHandler = require('../middlewares/success');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rowController = require('../route/row');

module.exports = function (app) {

   mongoose.connect(process.env.DB_STRING)
      .then(() => console.log(`DB connected`))
      .catch((err) => {
         console.error(`Error connecting to DB: ${err.message}`);
         throw new Error(err.message || `Error connecting to DB`);
      });

   app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
   app.use(express.json());  // to support JSON-encoded bodies
   app.use(cors());
   app.use(helmet());

   app.use('/api/rows', rowController);
   // app.use('/api/seats', seatController);


   // app.use(successHandler); WIP
   app.use(errorHandler);
}