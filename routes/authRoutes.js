const router = require('express').Router();
// const User = require('../models/User');
const AuthController = require('../controllers/auth.controllers');

//fetch user
router.get("/", AuthController.Login);


module.exports = router;

