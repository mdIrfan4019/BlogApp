import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);

        if (
          user &&
          res.data.author._id !== user.id &&
          user.role !== "admin"
        ) {
          navigate("/");
          return;
        }

        setFormData({
          title: res.data.title,
          content: res.data.content
        });
      } catch (err) {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.put(`/blogs/${id}`, formData);
      navigate(`/blog/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>

      {error && (
        <p className="text-red-600 mb-3">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          name="content"
          rows={8}
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
