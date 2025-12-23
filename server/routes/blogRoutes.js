import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";
import { toggleLikeBlog } from "../controllers/blogController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected routes
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

// ❤️ Like / Unlike
router.put("/:id/like", protect, toggleLikeBlog);

export default router;
