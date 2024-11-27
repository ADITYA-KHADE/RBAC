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
    <div className="p-4 font-poppins font-semibold">
      <div className="flex  justify-between py-2">
      <h2 className="text-xl font-bold mb-4">Role Management :</h2>
        <button
          onClick={() => setAdd(true)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Add Role
        </button>
      </div>
      {add && <AddRole setReload={setReload} setAdd={setAdd} />}

      {loading ? (
        <div className="text-center py-4">Loading roles...</div>
      ) : roles.length === 0 ? (
        <div className="text-center py-4">No roles available.</div>
      ) : (
        <>
          <table className="min-w-full text-center bg-blue-300 border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-center">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Permissions</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRoles.map((role, index) => (
                <tr key={role.id || index} className="border-t">
                  <td className="px-4 py-2">{role.name}</td>
                  <td className="px-4 py-2">
                    {role.permissions ? role.permissions.join(", ") : "N/A"}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleUpdate(role)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(role)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
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
