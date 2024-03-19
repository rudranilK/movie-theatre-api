const express = require('express');
const { addRow, getAll, getRow } = require('../service/row');
const router = express.Router();
const errorWrapper = require('../middlewares/errorWrapper');

router.get('/', errorWrapper(getAll));
router.get('/:id', errorWrapper(getRow));
router.post('/add', errorWrapper(addRow));

module.exports = router;