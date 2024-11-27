import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Stack,
  Modal,
} from "@mui/material";

const AddRole = ({ setReload, setAdd }) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  const handlePermissionChange = (event) => {
    const { name, checked } = event.target;
    setPermissions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedPermissions = Object.keys(permissions).filter(
      (key) => permissions[key]
    );

    const newRole = {
      name: roleName,
      permissions: selectedPermissions,
    };

    try {
      const response = await fetch("/api/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRole),
      });

      if (response.ok) {
        setRoleName("");
        setPermissions({ read: false, write: false, delete: false });
        setReload((prev) => !prev);
        setAdd(false);
      } else {
        console.error("Failed to add role");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => setAdd(false);

  return (
    <Modal open onClose={handleClose} aria-labelledby="add-role-modal">
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
          borderRadius: 2,
        }}
      >
        <Typography id="add-role-modal" variant="h6" gutterBottom>
          Add New Role
        </Typography>
        <TextField
          label="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Typography variant="subtitle1" gutterBottom>
          Permissions
        </Typography>
        <Stack spacing={1}>
          {["read", "write", "delete"].map((perm) => (
            <FormControlLabel
              key={perm}
              control={
                <Checkbox
                  name={perm}
                  checked={permissions[perm]}
                  onChange={handlePermissionChange}
                />
              }
              label={perm.charAt(0).toUpperCase() + perm.slice(1)}
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add Role
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddRole;
