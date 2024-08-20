const express = require("express");
const router = require("express").Router();
const authController = require('../controllers/AuthController');
const { verifySession } = require("../middleware/AuthUser");

router.post('/login', verifySession, authController.login);

module.exports = router;