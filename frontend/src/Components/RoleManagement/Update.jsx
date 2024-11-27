import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-hot-toast";

const Update = ({ roleData, setUpdateModal, setReload }) => {
  const [updatedData, setUpdatedData] = useState({
    id: roleData._id, 
    name: roleData.name,
    permissions: roleData.permissions || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionChange = (permission) => {
    setUpdatedData((prev) => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission];
      return {
        ...prev,
        permissions: newPermissions,
      };
    });
  };

  const handleUpdate = () => {
    fetch(`/api/role/${updatedData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update role.");
        }
        return res.json();
      })
      .then(() => {
        toast.success("Role updated successfully!");
        setReload((prev) => !prev);
        setUpdateModal(false);
      })
      .catch((err) => {
        toast.error("Error updating role.");
        console.error("Error updating role:", err);
      });
  };

  return (
    <Dialog
      open={true}
      onClose={() => setUpdateModal(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Update Role</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          name="name"
          value={updatedData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <div>
          <label className="block font-medium mt-4 mb-2">Permissions:</label>
          {["read", "write", "delete"].map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={updatedData.permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
              }
              label={permission.charAt(0).toUpperCase() + permission.slice(1)}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setUpdateModal(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Update;
