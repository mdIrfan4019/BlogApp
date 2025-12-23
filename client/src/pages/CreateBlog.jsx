import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/blogs", formData);
      navigate(`/blog/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>

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
          placeholder="Blog title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          name="content"
          placeholder="Write your blog content..."
          value={formData.content}
          onChange={handleChange}
          rows={8}
          required
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
