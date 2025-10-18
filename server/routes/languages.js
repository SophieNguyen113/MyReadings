const express = require('express');
const { getLanguageNameByCode } = require('../controllers/languages.js');

const router = express.Router();

router.get('/:code', getLanguageNameByCode);

module.exports = router;
