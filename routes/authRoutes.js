const router = require('express').Router();
// const User = require('../models/User');
const AuthController = require('../controllers/auth.controllers');

//fetch user
router.post("/login", AuthController.Login);
router.post("/register", AuthController.registerUser);


module.exports = router;

