const router = require('express').Router();
// const User = require('../models/User');
const UserController = require('../controllers/user.controllers');
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

//fetch user

router.get("/find/:id", verifyTokenAndAdmin, UserController.GetUser);
router.get("/", verifyTokenAndAdmin, UserController.GetAllUsers);
router.put("/:id", verifyTokenAndAuth, UserController.Updateuser);
router.delete("/:id", verifyTokenAndAuth, UserController.DeleteUser)

module.exports = router;

