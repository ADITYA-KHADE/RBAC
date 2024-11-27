import React, { useState, useEffect } from "react";
import Delete from "./Delete";
import Update from "./Update";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRole from "../AddRole/AddRole";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [roleData, setRoleData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(5);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/role")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedRoles = data.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return nameA.localeCompare(nameB);
          });
          setRoles(sortedRoles);
        } else {
          console.error("Error: API response is not an array");
          setRoles([]); // Fix variable name
        }
      })
      .catch((err) => {
        console.error("Error fetching roles:", err);
        setRoles([]); // Fix variable name
      })
      .finally(() => setLoading(false));
  }, [reload]);

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole); // Fix variable name

  const totalPages = Math.ceil(roles.length / rolesPerPage);

  const handleUpdate = (role) => {
    setRoleData(role); // Fix variable name
    setUpdateModal(true);
  };

  const handleDelete = (role) => {
    setRoleData(role); // Fix variable name
    setDeleteModal(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-4 font-poppins font-semibold mx-auto max-w-6xl">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-4xl font-bold m-4">Role Management</h1>
          <button
            onClick={() => setAdd(true)}
            className="bg-white text-blue-600 px-6 py-2 rounded-full shadow-md hover:bg-blue-100 transition duration-300"
          >
           + Add Role
          </button>
        </div>
      </div>
      {add && <AddRole setReload={setReload} setAdd={setAdd} />}

      {loading ? (
        <div className="text-center py-4">Loading roles...</div>
      ) : roles.length === 0 ? (
        <div className="text-center py-4">No roles available.</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md shadow-2xl">
            <table className="min-w-full bg-blue-300 border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 uppercase text-sm ">
                  <th className="px-4 py-3 text-start">Name</th>
                  <th className="px-4 py-3 text-start">Permissions</th>
                  <th className="px-4 py-3 text-start">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRoles.map((role, index) => (
                  <tr key={role.id || index} className="border-t bg-white hover:bg-gray-100 transition border-b">
                    <td className="px-4 py-2">{role.name}</td>
                    <td className="px-4 py-2">
                      {role.permissions ? role.permissions.join(", ") : "N/A"}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition duration-300"
                        onClick={() => handleUpdate(role)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition duration-300"
                        onClick={() => handleDelete(role)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                className=" bg-white p-2 rounded-3xl"
              />
            </Stack>
          </div>
        </>
      )}

      {updateModal && (
        <Update
          roleData={roleData}
          setReload={setReload}
          setUpdateModal={setUpdateModal}
        />
      )}
      {deleteModal && (
        <Delete
          roleData={roleData}
          setReload={setReload}
          setDeleteModal={setDeleteModal}
        />
      )}
    </div>
  );
};

export default RoleManagement;
