import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

import {
  createPost,
  getAllPosts,
  deletePost,
  toggleLike,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllPosts);

router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  createPost
);

router.put("/:id/like", authMiddleware, toggleLike);

router.delete("/:id", authMiddleware, deletePost);

export default router;