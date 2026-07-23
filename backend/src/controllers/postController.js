import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import Post from "../models/Post.js";

/* ===========================
   CREATE POST
=========================== */

export const createPost = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "inspira/posts",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // Save post in MongoDB
    const post = await Post.create({
      author: req.userId,
      caption,
      image: result.secure_url,
    });

    // Populate author details
    const populatedPost = await Post.findById(post._id)
      .populate("author", "fullName username profilePic")
      .populate("comments.user", "username profilePic");

    return res.status(201).json({
      success: true,
      message: "Post created successfully.",
      post: populatedPost,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   GET ALL POSTS
=========================== */

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "fullName username profilePic")
      .populate("comments.user", "username profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   GET POST BY ID
=========================== */

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "fullName username profilePic")
      .populate("comments.user", "username profilePic");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   DELETE POST
=========================== */

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   TOGGLE LIKE
=========================== */

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }



    const userId = req.userId;

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      likes: post.likes.length,
      message: alreadyLiked
        ? "Post unliked successfully."
        : "Post liked successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   GET LOGGED IN USER POSTS
=========================== */

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.userId,
    })
      .populate("author", "fullName username profilePic")
      .populate("comments.user", "username profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   ADD COMMENT
=========================== */

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.userId,
      text,
      createdAt: Date.now(),
    });

    await post.save();

    const populatedPost = await Post.findById(postId)
      .populate("author", "fullName username profilePic")
      .populate("comments.user", "username profilePic");

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      post: populatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   DELETE COMMENT
=========================== */

export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    post.comments.pull(commentId);
    await post.save();

    const populatedPost = await Post.findById(postId)
      .populate("author", "fullName username profilePic")
      .populate("comments.user", "username profilePic");

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      post: populatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};