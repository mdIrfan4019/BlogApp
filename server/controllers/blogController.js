import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

/**
 * @desc    Create a new blog
 * @route   POST /api/blogs
 * @access  Private
 */
export const createBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const blog = await Blog.create({
    title,
    content,
    author: req.user._id
  });

  res.status(201).json(blog);
};

/**
 * @desc    Get all blogs
 * @route   GET /api/blogs
 * @access  Public
 */
export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "name")
    .sort({ createdAt: -1 });

  res.json(blogs);
};

/**
 * @desc    Get single blog by ID
 * @route   GET /api/blogs/:id
 * @access  Public
 */
export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(
    "author",
    "name"
  );

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json(blog);
};

/**
 * @desc    Update blog (author only)
 * @route   PUT /api/blogs/:id
 * @access  Private
 */
export const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  blog.title = req.body.title || blog.title;
  blog.content = req.body.content || blog.content;

  const updatedBlog = await blog.save();
  res.json(updatedBlog);
};

/**
 * @desc    Delete blog (author only)
 * @route   DELETE /api/blogs/:id
 * @access  Private
 */
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // ✅ USER (owner) OR ADMIN can delete
  if (
    blog.author.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // delete related comments
  await Comment.deleteMany({ blog: blog._id });

  await blog.deleteOne();

  res.json({ message: "Blog deleted successfully" });
};


// ❤️ Like / Unlike Blog
export const toggleLikeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const userId = req.user._id.toString();

  const alreadyLiked = blog.likes
    .map(id => id.toString())
    .includes(userId);

  if (alreadyLiked) {
    // Unlike
    blog.likes = blog.likes.filter(
      id => id.toString() !== userId
    );
  } else {
    // Like
    blog.likes.push(req.user._id);
  }

  await blog.save();

  res.json({
    message: alreadyLiked ? "Blog unliked" : "Blog liked",
    likesCount: blog.likes.length
  });
};
