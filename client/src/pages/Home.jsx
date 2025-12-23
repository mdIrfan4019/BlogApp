import { useEffect, useState } from "react";
import api from "../services/api";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
  <h2 className="text-2xl font-semibold mb-6">All Blogs</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {blogs.map((blog) => (
      <BlogCard key={blog._id} blog={blog} />
    ))}
  </div>
</div>

  );
};

export default Home;
