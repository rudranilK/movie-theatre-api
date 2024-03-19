const express = require('express');
const { addRow, getAll } = require('../service/row');
const router = express.Router();
const errorWrapper = require('../middlewares/errorWrapper');

router.get('/', errorWrapper(getAll));
router.post('/add', errorWrapper(addRow));

module.exports = router;