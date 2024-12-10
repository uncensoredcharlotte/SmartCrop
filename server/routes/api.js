const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User registered successfully!' });
    });
});

module.exports = router;
