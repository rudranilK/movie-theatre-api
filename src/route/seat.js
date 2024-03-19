const express = require('express');
const errorWrapper = require('../middlewares/errorWrapper');
const { getSeatInfo } = require('../service/seat');
const router = express.Router();

router.get('/:rowNo/:seatNo', errorWrapper(getSeatInfo));

module.exports = router;