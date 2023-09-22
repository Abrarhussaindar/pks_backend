const router = require("express").Router()
const OrderControllers = require('../controllers/order.controllers');
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('../middlewares/verifyToken');


router.post("/", verifyToken, OrderControllers.addOrder);
router.put("/", verifyTokenAndAdmin, OrderControllers.updateOrder);
router.delete("/", verifyTokenAndAdmin, OrderControllers.deleteOrder);
router.get("/:userId", verifyTokenAndAuth, OrderControllers.getOrder);
router.get("/", OrderControllers.getAllOrders);

module.exports = router;