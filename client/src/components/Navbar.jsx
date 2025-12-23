// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="bg-white border-b shadow-sm">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo / Brand */}
//         <Link
//           to="/"
//           className="text-xl font-bold text-indigo-600 hover:text-indigo-700"
//         >
//           BlogApp
//         </Link>

//         {/* Navigation Links */}
//         <div className="flex items-center space-x-4">
//           {user ? (
//             <>
//               <Link
//                 to="/create"
//                 className="text-gray-700 hover:text-indigo-600 transition"
//               >
//                 Create
//               </Link>

//               <Link
//                 to="/dashboard"
//                 className="text-gray-700 hover:text-indigo-600 transition"
//               >
//                 Dashboard
//               </Link>

//               {user.role === "admin" && (
//                 <Link
//                   to="/admin"
//                   className="text-red-600 font-semibold hover:underline"
//                 >
//                   Admin
//                 </Link>
//               )}

//               <button
//                 onClick={logout}
//                 className="ml-2 px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100 transition"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="text-gray-700 hover:text-indigo-600 transition"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-indigo-600"
        >
          BlogApp
        </Link>

        {/* Desktop Menu (ONLY md and above) */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/create" className="nav-link">
                Create
              </Link>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>

              {user.role === "admin" && (
                <Link to="/admin" className="text-red-600 font-semibold">
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="px-3 py-1 border rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger (ONLY small screens) */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu (STACKED, SEPARATE ROW) */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          {user ? (
            <>
              <Link
                to="/create"
                className="block text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Create
              </Link>

              <Link
                to="/dashboard"
                className="block text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="block text-red-600 font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block text-center bg-indigo-600 text-white rounded py-2"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
