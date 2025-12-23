import { useEffect, useState } from "react";
import api from "../services/api";
import { formatDate } from "../utils/formatDate";

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await api.get("/admin/comments");
      setComments(res.data);
    };
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;

    await api.delete(`/admin/comments/${id}`);
    setComments(comments.filter((c) => c._id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h3 className="text-2xl font-semibold mb-6">All Comments</h3>

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments found.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <p className="text-sm text-gray-600 mb-1">
                <strong className="text-gray-800">
                  {comment.user?.name}
                </strong>{" "}
                on{" "}
                <em className="text-gray-700">
                  {comment.blog?.title}
                </em>
              </p>

              <p className="text-gray-700 mb-2">
                {comment.text}
              </p>

              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </p>

                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-sm text-red-600 hover:underline"
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

export default Comments;
