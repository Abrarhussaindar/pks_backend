const router = require('express').Router();
// const User = require('../models/User');
const AdminController = require('../controllers/admin/admin.controllers');

//fetch user
router.get("/:id", AdminController.Dashboard);


module.exports = router;

