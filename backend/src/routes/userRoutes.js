import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

import {
  getCurrentUser,
  updateProfile,
  uploadProfilePicture,
  getUserByUsername,
  followUser,
  unfollowUser,
  searchUsers,
} from "../controllers/userController.js";

const router = express.Router();

// ===============================
// Get Logged-in User
// ===============================
router.get("/me", authMiddleware, getCurrentUser);

// ===============================
// Search Users
// ===============================
router.get("/search", searchUsers);

// ===============================
// Get User by Username
// ===============================
router.get("/:username", getUserByUsername);

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

// ===============================
// Follow/Unfollow User
// ===============================
router.post("/:userId/follow", authMiddleware, followUser);
router.post("/:userId/unfollow", authMiddleware, unfollowUser);

export default router;