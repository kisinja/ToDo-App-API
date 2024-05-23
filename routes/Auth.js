const express = require('express');
const router = express.Router();

const { register } = require('../auth/Register');
const {login} = require('../auth/Login');

router.post("/register", register);
router.post("/login", login);

module.exports = router;