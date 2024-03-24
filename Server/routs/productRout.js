import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productControll.js";
import { authorizeRoles, protect } from "../controllers/authController.js";
const router = express.Router();

router.get("/products", getAllProducts);
router.post("/admin/create_product", protect, authorizeRoles("admin"),createProduct);
router
  .route("/product/:id")
  .put(protect, authorizeRoles("admin"), updateProduct)
  .delete(protect, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);

export default router;
