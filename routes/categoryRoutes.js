const router = require('express').Router();
const CategoryControllers = require('../controllers/category.controllers');


router.post("/create", CategoryControllers.CreateCategory);
router.get("/:name", CategoryControllers.GetCategory);

module.exports = router;

