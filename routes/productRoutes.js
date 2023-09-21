const router = require("express").Router()
const ProductsController = require('../controllers/products.controller');
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('../middlewares/verifyToken');


router.post("/", verifyTokenAndAdmin, ProductsController.uploadProduct);
router.put("/", verifyTokenAndAdmin, ProductsController.updateProduct);
router.delete("/", verifyTokenAndAdmin, ProductsController.deleteProduct);
router.get("/:id", ProductsController.getProduct);
router.get("/", ProductsController.getAllProducts);

module.exports = router;