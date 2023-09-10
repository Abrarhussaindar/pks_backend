const router = require('express').Router();
// const User = require('../models/User');
const UserController = require('../controllers/user.controllers');

//fetch user
router.get("/", UserController.Login);


module.exports = router;

