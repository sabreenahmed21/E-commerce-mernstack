import express from "express";
const router = express.Router();
import {
  protect,
  forgetPassword,
  login,
  resetPassword,
  signup,
  verifyCode,
  verifyEmail,
  logout,
  authorizeRoles,
} from "../controllers/authController.js";
import { deleteMe, getOneUser, getusers, updateProfile } from "../controllers/userControll.js";

router.get("/admin/users",protect, authorizeRoles("admin"), getusers);
router.get("/admin/:id",protect, authorizeRoles("admin"),  getOneUser);
router.get("/users", getusers)

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgetpassword", forgetPassword);
router.patch("/resetpassword/:token", resetPassword);
router.post("/verifycode", verifyCode);
router.get("/verify-email", verifyEmail);
router.delete("/delete-me", protect, deleteMe);
router.get("/logout", protect, logout);
router.put("/updateProfile", protect, updateProfile);

export default router;