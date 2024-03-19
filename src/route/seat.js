const express = require('express');
const errorWrapper = require('../middlewares/errorWrapper');
const { getSeatInfo, bookSeat } = require('../service/seat');
const router = express.Router();

router.get('/:rowNo/:seatNo', errorWrapper(getSeatInfo));
router.post('/:rowNo/:seatNo', errorWrapper(bookSeat));

module.exports = router;