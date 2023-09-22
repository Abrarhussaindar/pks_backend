const router = require('express').Router();
// const User = require('../models/User');
const UserController = require('../controllers/user.controllers');
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

//fetch user

router.get("/find/:id", verifyTokenAndAdmin, UserController.GetUser);
router.get("/", UserController.GetAllUsers);
router.put("/:id", UserController.Updateuser);
router.delete("/:id", verifyTokenAndAuth, UserController.DeleteUser)

module.exports = router;

