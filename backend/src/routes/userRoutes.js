import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

import {
  getCurrentUser,
  updateProfile,
  uploadProfilePicture,
} from "../controllers/userController.js";

const router = express.Router();

// ===============================
// Get Logged-in User
// ===============================
router.get("/me", authMiddleware, getCurrentUser);

// ===============================
// Update Profile
// ===============================
router.put("/update", authMiddleware, updateProfile);

// ===============================
// Upload Profile Picture
// ===============================
router.put(
  "/profile-picture",
  authMiddleware,
  upload.single("profilePic"),
  uploadProfilePicture
);

export default router;