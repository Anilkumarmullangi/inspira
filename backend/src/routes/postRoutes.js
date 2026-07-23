import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

import {
  createPost,
  getAllPosts,
  deletePost,
  toggleLike,
  getMyPosts,
  addComment,
  deleteComment,
  getPostById,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllPosts);
router.get("/me", authMiddleware, getMyPosts);
router.get("/:id", authMiddleware, getPostById);

router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  createPost
);

router.put("/:id/like", authMiddleware, toggleLike);

router.post("/:id/comments", authMiddleware, addComment);
router.delete("/:postId/comments/:commentId", authMiddleware, deleteComment);

router.delete("/:id", authMiddleware, deletePost);

export default router;