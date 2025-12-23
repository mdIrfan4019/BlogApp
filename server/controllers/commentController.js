import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

// ➕ Add Comment
export const addComment = async (req, res) => {
  const { text, blogId } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const comment = await Comment.create({
    text,
    blog: blogId,
    user: req.user._id
  });

  res.status(201).json(comment);
};

// 📥 Get comments for a blog
export const getCommentsByBlog = async (req, res) => {
  const { blogId } = req.params;

  const comments = await Comment.find({ blog: blogId })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  res.json(comments);
};



// ❌ Delete comment (OWNER or ADMIN)
export const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  // ✅ USER (owner) OR ADMIN can delete
  if (
    comment.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await comment.deleteOne();
  res.json({ message: "Comment deleted successfully" });
};
