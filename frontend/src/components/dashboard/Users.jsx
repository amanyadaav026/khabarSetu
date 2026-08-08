import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/user/all-users",
        {
          withCredentials: true,
        }
      );

      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/user/delete/${userId}`,
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="mt-2 text-gray-500">
          Manage all registered users.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Users Found
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {user.username}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    {user.isAdmin ? (
                      <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">
                        Admin
                      </span>
                    ) : (
                      <span className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700">
                        User
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;