import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Stack,
  Modal,
} from "@mui/material";

const AddUser = ({ setReload, setAdd }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    status: "Active",
    role: "",
  });

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
          toast.error("Failed to fetch roles");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error fetching roles");
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setUserData({ name: "", email: "", status: "Active", role: "" });
        setReload((prev) => !prev);
        setAdd(false);
        toast.success("User added successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to add user:", errorData);
        toast.error(errorData.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const handleClose = () => setAdd(false);

  return (
    <Modal open onClose={handleClose} aria-labelledby="add-user-modal">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
          maxWidth: "90%",
          borderRadius: 2,
        }}
      >
        <Typography id="add-user-modal" variant="h6" gutterBottom>
          Add New User
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          type="email"
        />
        <TextField
          label="Role"
          name="role"
          value={userData.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
          select
          required
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </TextField>
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddUser;

