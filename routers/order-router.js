const router = require("express").Router();
const { asyncHandler } = require("../utils/async-handler");
const { validator } = require("../validations/validator");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  editOrderById,
  removeOrderById,
} = require("../controllers/odrer-controller");
const {
  createOrderValidationSchema,
  editOrderValidationSchema,
} = require("../validations/order-validation");
const { protect, restrictTo } = require("../controllers/auth-controller");
router.get("/", protect, restrictTo("ADMIN"), asyncHandler(getAllOrders));

router.post(
  "/",
  validator(createOrderValidationSchema),
  asyncHandler(createOrder)
);

router.get("/:id", protect, restrictTo("ADMIN"), asyncHandler(getOrderById));

router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  validator(editOrderValidationSchema),
  asyncHandler(editOrderById)
);

router.delete(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  asyncHandler(removeOrderById)
);

module.exports = router;
