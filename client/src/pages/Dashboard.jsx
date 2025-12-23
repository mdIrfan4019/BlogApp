import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";

const Dashboard = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyBlogs = async () => {
    try {
      const res = await api.get("/blogs");

      const myBlogs = res.data.filter(
        (blog) => blog.author?._id === user.id
      );

      setBlogs(myBlogs);
    } catch (err) {
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading dashboard...</p>;

  if (error)
    return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">My Blogs</h2>

      {blogs.length === 0 ? (
        <p className="text-gray-500">
          You haven’t created any blogs yet.
        </p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDate(blog.createdAt)}
                </p>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  View
                </Link>

                <Link
                  to={`/edit/${blog._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
