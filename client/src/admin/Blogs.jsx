import { useEffect, useState } from "react";
import api from "../services/api";
import { formatDate } from "../utils/formatDate";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await api.get("/admin/blogs");
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    await api.delete(`/admin/blogs/${id}`);
    setBlogs(blogs.filter((b) => b._id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h3 className="text-2xl font-semibold mb-6">All Blogs</h3>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-start"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h4>
                <p className="text-sm text-gray-500">
                  By {blog.author?.name} · {formatDate(blog.createdAt)}
                </p>
              </div>

              <button
                onClick={() => handleDelete(blog._id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
