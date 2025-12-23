import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  getAllUsers,
  getAllBlogsAdmin,
  getAllCommentsAdmin,
  adminDeleteBlog,
  adminDeleteComment
} from "../controllers/adminController.js";

const router = express.Router();

// All routes below are ADMIN ONLY
router.use(protect, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.get("/blogs", getAllBlogsAdmin);
router.get("/comments", getAllCommentsAdmin);

router.delete("/blogs/:id", adminDeleteBlog);
router.delete("/comments/:id", adminDeleteComment);

export default router;
