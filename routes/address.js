const router = require('express').Router();
// const User = require('../models/User');
const addressController = require('../controllers/userAddress.controllers');


router.post("/add", addressController.createAddress)
router.get("/find/:id", addressController.GetUserAddress);

module.exports = router;

