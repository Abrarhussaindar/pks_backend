const router = require('express').Router();
// const User = require('../models/User');
const UserController = require('../controllers/user.controllers');

//fetch user
router.post("/create", UserController.Createuser);
router.get("/:id", UserController.Getuser);
router.put("/:id", UserController.Updateuser);

module.exports = router;

