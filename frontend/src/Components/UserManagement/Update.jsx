import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { toast } from "react-hot-toast";

const Update = ({ userData, setUpdateModal, setReload }) => {
  const [updatedData, setUpdatedData] = useState(userData);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/role");
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        } else {
          console.error("Failed to fetch roles");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    fetch(`/api/auth/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update user.");
        }
        return res.json();
      })
      .then(() => {
        toast.success("User updated successfully!");
        setReload((prev) => !prev); // Trigger data reload
        setUpdateModal(false); // Close the modal
      })
      .catch((err) => {
        toast.error("Error updating user.");
        console.error("Error updating user:", err);
      });
  };

  return (
    <Dialog
      open={true}
      onClose={() => setUpdateModal(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={updatedData.name || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={updatedData.email || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          type="email"
        />
        <TextField
          label="Role"
          name="role"
          value={updatedData.role || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          select
          required
        >
          {roles.map((role) => (
            <MenuItem key={role._id} value={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </TextField>


        <TextField
          label="Status"
          name="status"
          value={updatedData.status || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          select
          required
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
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
