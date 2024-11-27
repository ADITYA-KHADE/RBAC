import React, { useState, useEffect } from "react";
import Delete from "./Delete";
import Update from "./Update";
import Pagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUser from "../AddUser/AddUser";
import Tooltip from "@mui/material/Tooltip";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedUsers = data.sort((a, b) => a.name.localeCompare(b.name));
          setUsers(sortedUsers);
        } else {
          console.error("Error: API response is not an array");
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, [reload]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleUpdate = (user) => {
    setUserData(user);
    setUpdateModal(true);
  };

  const handleDelete = (user) => {
    setUserData(user);
    setDeleteModal(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-4 font-poppins font-semibold max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-2 md:mb-0">All Users</h1>
          <button
            onClick={() => setAdd(true)}
            className="bg-white text-blue-600 px-6 py-2 rounded-full shadow-md hover:bg-blue-100 transition duration-300 font-semibold"
          >
            + Add User
          </button>
        </div>
      </div>

      {add && <AddUser setReload={setReload} setAdd={setAdd} />}

      {loading ? (
        <div className="text-center py-4 text-gray-700">Loading users...</div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow-2xl rounded-lg">
            <table className="min-w-full table-auto border-collapse font-poppins ">
              <thead>
                <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 uppercase text-sm">
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Role</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr
                      key={user.id || index}
                      className="bg-white hover:bg-gray-100 transition border-b"
                    >
                      <td className="px-6 py-4 text-gray-800">{user.name}</td>
                      <td className="px-6 py-4 text-gray-800">{user.email}</td>
                      <td className="px-6 py-4 text-gray-800">{user.role}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-start items-center">
                          <span
                            className={`inline-block w-3 h-3 rounded-full ${
                              user.status.toLowerCase() === "active"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          <span className="ml-2 capitalize text-gray-800">
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                        <Tooltip title="Edit">
                          <button
                            onClick={() => handleUpdate(user)}
                            className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition duration-300"
                          >
                            <EditIcon />
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <button
                            onClick={() => handleDelete(user)}
                            className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition duration-300"
                          >
                            <DeleteIcon />
                          </button>
                        </Tooltip>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center px-6 py-4 text-gray-600"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        
          <div className="flex justify-center items-center w-full py-6 ">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              className="shadow-lg rounded bg-white p-2 rounded-3xl"
            />
          </div>
        </>
      )}

      {updateModal && (
        <Update
          userData={userData}
          setReload={setReload}
          setUpdateModal={setUpdateModal}
        />
      )}

      {deleteModal && (
        <Delete
          userData={userData}
          setReload={setReload}
          setDeleteModal={setDeleteModal}
        />
      )}
    </div>
  );
};

export default UserManagement;
