import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

// 👥 Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// 📝 Get all blogs
export const getAllBlogsAdmin = async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  res.json(blogs);
};

// 💬 Get all comments
export const getAllCommentsAdmin = async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "name email")
    .populate("blog", "title")
    .sort({ createdAt: -1 });

  res.json(comments);
};

// ❌ Delete any blog
export const adminDeleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  await Comment.deleteMany({ blog: blog._id });
  await blog.deleteOne();

  res.json({ message: "Blog deleted by admin" });
};

// ❌ Delete any comment
export const adminDeleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  await comment.deleteOne();

  res.json({ message: "Comment deleted by admin" });
};
