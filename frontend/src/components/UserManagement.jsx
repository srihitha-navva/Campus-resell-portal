import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import {
  btnDanger,
  emptyState,
  error,
  heading,
  input,
  pageBackground,
  pageWrapper,
} from "../styles/Common";

function UserManagement() {

  const [users, setUsers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [search, setSearch] = useState("");

  const loadUsers = () => {

    return axios
      .get(`${API_BASE_URL}/admin-api/users`, {
        withCredentials: true,
      })
      .then((res) => setUsers(res.data.payload || []));

  };

  useEffect(() => {
    loadUsers().catch((err) => setErrMsg(err.response?.data?.message || "Failed to load users"));
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) =>
      `${user.name} ${user.email} ${user.studentId} ${user.mobile} ${user.role}`
        .toLowerCase()
        .includes(query)
    );
  }, [search, users]);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user and their products?")) return;

    try {
      setErrMsg("");

      await axios.delete(
        `${API_BASE_URL}/admin-api/users/${id}`,
        {
          withCredentials: true,
        }
      );

      await loadUsers();
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (

    <div className={pageBackground}>
    <div className={pageWrapper}>

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h1 className={heading}>
            User Management
          </h1>
          <p className="text-sm text-[#8A847F] mt-2">
            View all registered students and admins.
          </p>
        </div>

        <p className="text-sm font-semibold text-[#7C8E65]">
          {filteredUsers.length} of {users.length} users
        </p>
      </div>

      <div className="bg-white border border-[#ECEAE5] rounded-2xl p-4 mb-8">
        <input
          className={input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, student ID, mobile, or role"
        />
      </div>

      {errMsg && <p className={`${error} mb-5`}>{errMsg}</p>}

      {!errMsg && filteredUsers.length === 0 && (
        <div className={emptyState}>No users found.</div>
      )}

      {!errMsg && filteredUsers.length > 0 && (
      <div className="overflow-x-auto bg-white rounded-3xl border border-[#ECEAE5] shadow-sm">
      <table className="w-full min-w-[900px] overflow-hidden">

        <thead className="bg-[#A3B18A] text-white">

          <tr>

            <th className="p-4 text-left">User</th>

            <th className="text-left">Email</th>

            <th className="text-left">Mobile</th>

            <th className="text-left">Student ID</th>

            <th className="text-left">Role</th>

            <th className="text-left">Joined</th>

            <th className="text-left">Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredUsers.map((user) => (

            <tr key={user._id} className="border-b border-[#ECEAE5] last:border-b-0">

              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user.profilePic ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={user.name}
                    className="h-11 w-11 rounded-full object-cover border border-[#ECEAE5]"
                  />

                  <span className="font-semibold text-[#4F4B47]">
                    {user.name}
                  </span>
                </div>
              </td>

              <td className="text-[#6E6964]">{user.email}</td>

              <td className="text-[#6E6964]">{user.mobile}</td>

              <td className="text-[#6E6964]">{user.studentId}</td>

              <td>
                <span className="inline-flex px-3 py-1 rounded-full bg-[#EEF3E8] text-[#7C8E65] text-xs font-semibold">
                  {user.role}
                </span>
              </td>

              <td className="text-[#6E6964]">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </td>

              <td>

                <button
                  onClick={() => deleteUser(user._id)}
                  className={btnDanger}
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
    </div>
  );
}

export default UserManagement;
