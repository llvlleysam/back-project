const router = require("express").Router();
const { asyncHandler } = require("../utils/async-handler");
const { validator } = require("../validations/validator");
const {
  addCategoryValidationSchema,
  editCategoryValidationSchema,
} = require("../validations/category-validation");
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  editCategoryById,
  removeCategoryById,
  uploadCategoryIcon,
} = require("../controllers/category-controller");
const { protect, restrictTo } = require("../controllers/auth-controller");
router.get("/", protect, restrictTo("ADMIN"), asyncHandler(getAllCategories));

router.post(
  "/",
  protect,
  restrictTo("ADMIN"),
  uploadCategoryIcon,
  validator(addCategoryValidationSchema),
  asyncHandler(addCategory)
);

router.get("/:id", protect, restrictTo("ADMIN"), asyncHandler(getCategoryById));

router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  uploadCategoryIcon,
  validator(editCategoryValidationSchema),
  asyncHandler(editCategoryById)
);

router.delete(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  asyncHandler(removeCategoryById)
);

module.exports = router;
