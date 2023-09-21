const router = require("express").Router()
const CartControllers = require('../controllers/cart.controller');
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('../middlewares/verifyToken');


router.post("/", verifyToken, CartControllers.createCart);
router.put("/", verifyToken, CartControllers.updateCart);
router.delete("/", verifyToken, CartControllers.deleteCart);
router.get("/:userId", verifyTokenAndAuth, CartControllers.getCart);
router.get("/", verifyTokenAndAdmin, CartControllers.getAllCarts);

module.exports = router;