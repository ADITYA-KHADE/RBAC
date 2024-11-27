import React, { useState, useEffect } from "react";
import Delete from "./Delete";
import Update from "./Update";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUser from "../AddUser/AddUser";

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
          const sortedUsers = data.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return nameA.localeCompare(nameB);
          });
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
    <div className="p-4 font-poppins font-semibold">
      <div className="flex justify-between py-2">
        <h2 className="text-xl font-bold mb-4">All Users :</h2>
        <button
          onClick={() => setAdd(true)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>
      {add && <AddUser setReload={setReload} setAdd={setAdd} />}
      {loading ? (
        <div className="text-center py-4">Loading users...</div>
      ) : (
        <>
          <table className="min-w-full text-center bg-blue-300 border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-center">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id || index} className="border-t">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3 flex justify-center items-center">
                      {/* Show green dot if active, red if inactive */}
                      <span
                        className={`h-3 w-3 rounded-full ${
                          user.status.toLowerCase() === "active"
                            ? "bg-green-500 border-2 border-gray-800"
                            : "bg-red-500 border-2 border-gray-800"
                        } mr-2`}
                      ></span>
                     
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleUpdate(user)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(user)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center px-4 py-2">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Stack spacing={2} className="mt-4 justify-center items-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
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
