import express from "express";
import {
  addComment,
  getCommentsByBlog,
  deleteComment
} from "../controllers/commentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/check", (req, res) => {
  res.json({ message: "comments route is active" });
});


router.post("/", protect, addComment);
router.get("/:blogId", getCommentsByBlog);
router.delete("/:id", protect, deleteComment);

export default router;
