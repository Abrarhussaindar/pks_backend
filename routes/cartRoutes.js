const router = require("express").Router()
const CartControllers = require('../controllers/cart.controller');
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('../middlewares/verifyToken');


router.post("/:id", CartControllers.createCart);
router.put("/:id", CartControllers.updateCart);
router.delete("/:id", CartControllers.deleteCart);
router.get("/:userId", CartControllers.getCart);
router.get("/", CartControllers.getAllCarts);

module.exports = router;

