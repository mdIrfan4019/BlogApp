import { useEffect, useState } from "react";
import api from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h3 className="text-2xl font-semibold mb-6">All Users</h3>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>

              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {user.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
