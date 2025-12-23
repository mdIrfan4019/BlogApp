import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";
import api from "../services/api";

const CommentItem = ({ comment, refreshComments }) => {
  const { user } = useAuth();

  const canDelete =
    user &&
    (user.id === comment.user?._id || user.role === "admin");

  const handleDelete = async () => {
    try {
      await api.delete(`/comments/${comment._id}`);
      refreshComments();
    } catch (err) {
      alert("Failed to delete comment");
    }
  };

  return (
    <div className="border-b border-gray-200 py-3">
      <p className="text-sm text-gray-600 mb-1">
        <strong className="text-gray-800">
          {comment.user?.name}
        </strong>{" "}
        · {formatDate(comment.createdAt)}
      </p>

      <p className="text-gray-700 mb-1">{comment.text}</p>

      {canDelete && (
        <button
          onClick={handleDelete}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CommentItem;
