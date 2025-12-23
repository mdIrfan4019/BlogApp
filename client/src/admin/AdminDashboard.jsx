// import { Link, Routes, Route } from "react-router-dom";
// import Users from "./Users";
// import Blogs from "./Blogs";
// import Comments from "./Comments";

// const AdminDashboard = () => {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">
//         Admin Dashboard
//       </h2>

//       {/* Admin Navigation */}
//       <nav className="flex gap-4 mb-8 border-b pb-3">
//         <Link
//           to="users"
//           className="text-gray-700 font-medium hover:text-indigo-600 transition"
//         >
//           Users
//         </Link>

//         <Link
//           to="blogs"
//           className="text-gray-700 font-medium hover:text-indigo-600 transition"
//         >
//           Blogs
//         </Link>

//         <Link
//           to="comments"
//           className="text-gray-700 font-medium hover:text-indigo-600 transition"
//         >
//           Comments
//         </Link>
//       </nav>

//       {/* Admin Pages */}
//       <div>
//         <Routes>
//           <Route index element={<Users />} />
//           <Route path="users" element={<Users />} />
//           <Route path="blogs" element={<Blogs />} />
//           <Route path="comments" element={<Comments />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import { NavLink, Routes, Route } from "react-router-dom";
import Users from "./Users";
import Blogs from "./Blogs";
import Comments from "./Comments";

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Admin Navigation */}
      <nav className="flex gap-6 mb-8 border-b pb-3">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 font-semibold" : "text-gray-700"
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/admin/blogs"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 font-semibold" : "text-gray-700"
          }
        >
          Blogs
        </NavLink>

        <NavLink
          to="/admin/comments"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 font-semibold" : "text-gray-700"
          }
        >
          Comments
        </NavLink>
      </nav>

      {/* Admin Routes */}
      <Routes>
        <Route index element={<Users />} />
        <Route path="users" element={<Users />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="comments" element={<Comments />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
