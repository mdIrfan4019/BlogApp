import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";
import CommentItem from "../components/CommentItem";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    const res = await api.get(`/blogs/${id}`);
    setBlog(res.data);
  };

  const fetchComments = async () => {
    const res = await api.get(`/comments/${id}`);
    setComments(res.data);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchBlog();
        await fetchComments();
      } catch (err) {
        console.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleLike = async () => {
    try {
      await api.put(`/blogs/${id}/like`);
      fetchBlog();
    } catch (err) {
      alert("Like failed");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await api.post("/comments", {
        text: commentText,
        blogId: id
      });
      setCommentText("");
      fetchComments();
    } catch (err) {
      alert("Failed to add comment");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        {blog.title}
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        By <strong>{blog.author?.name}</strong> ·{" "}
        {formatDate(blog.createdAt)}
      </p>

      {/* Blog Content */}
      <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
        {blog.content}
      </p>

      {/* Like Button */}
      <button
        onClick={handleLike}
        className="inline-flex items-center gap-2 px-4 py-2 border rounded text-sm hover:bg-gray-100 transition mb-8"
      >
        ❤️ {blog.likes?.length || 0}
      </button>

      <hr className="mb-8" />

      {/* Comments Section */}
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {user ? (
        <form onSubmit={handleAddComment} className="mb-6">
          <textarea
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Add Comment
          </button>
        </form>
      ) : (
        <p className="text-gray-500 mb-6">Login to comment</p>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              refreshComments={fetchComments}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
