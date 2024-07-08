const express = require('express');
const router = express.Router();
const connection = require('../models/db');

router.get('/', (req, res) => {
    res.render('paginaInicialPac');
});

module.exports = router;