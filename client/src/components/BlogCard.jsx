// import { Link } from "react-router-dom";
// import { formatDate } from "../utils/formatDate";

// const BlogCard = ({ blog }) => {
//   return (
//     <div className="bg-white border rounded-lg p-5 mb-5 shadow-sm hover:shadow-md transition">
//       <h3 className="text-xl font-semibold text-gray-800 mb-1">
//         {blog.title}
//       </h3>

//       <p className="text-sm text-gray-500 mb-2">
//         By <strong>{blog.author?.name}</strong> ·{" "}
//         {formatDate(blog.createdAt)}
//       </p>

//       <p className="text-sm text-gray-600 mb-3">
//         ❤️ {blog.likes?.length || 0} Likes
//       </p>

//       <Link
//         to={`/blog/${blog._id}`}
//         className="text-indigo-600 font-medium hover:underline"
//       >
//         Read More →
//       </Link>
//     </div>
//   );
// };

// export default BlogCard;


import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        {blog.title}
      </h3>

      <p className="text-sm text-gray-500 mb-3">
        By <strong>{blog.author?.name}</strong> ·{" "}
        {formatDate(blog.createdAt)}
      </p>

      <p className="text-sm text-gray-600 mb-4">
        ❤️ {blog.likes?.length || 0} Likes
      </p>

      <Link
        to={`/blog/${blog._id}`}
        className="text-indigo-600 font-medium hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
};

export default BlogCard;
