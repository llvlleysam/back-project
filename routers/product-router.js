const router = require("express").Router();
const { asyncHandler } = require("../utils/async-handler");
const { validator } = require("../validations/validator");
const {
  addProduct,
  getAllProducts,
  getProductById,
  editProductById,
  removeProductById,
  uploadProductImages,
} = require("../controllers/product-controller");
const {
  addProductValidationSchema,
  editProductValidationSchema,
} = require("../validations/product-validation");
const { protect, restrictTo } = require("../controllers/auth-controller");
router.get(
  "/",
  protect,
  restrictTo("ADMIN", "USER"),
  asyncHandler(getAllProducts)
);

router.post(
  "/",
  protect,
  restrictTo("ADMIN"),
  uploadProductImages,
  validator(addProductValidationSchema),
  asyncHandler(addProduct)
);

router.get("/:id", protect, restrictTo("ADMIN"), asyncHandler(getProductById));

router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  uploadProductImages,
  validator(editProductValidationSchema),
  asyncHandler(editProductById)
);

router.delete(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  asyncHandler(removeProductById)
);

module.exports = router;
