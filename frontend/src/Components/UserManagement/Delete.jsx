import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { toast } from "react-hot-toast";

const Delete = ({ userData, setDeleteModal, setReload }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/auth/${userData._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      await response.json();
      toast.success(`User ${userData.name || userData.email} deleted successfully!`);
      setReload((prev) => !prev);
      setDeleteModal(false);
    } catch (err) {
      toast.error("Error deleting user. Please try again later.");
      console.error("Error deleting user:", err);
    } finally {
      setIsDeleting(false); // Reset loading state
    }
  };

  return (
    <Dialog open onClose={() => setDeleteModal(false)} fullWidth maxWidth="xs">
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        Are you sure you want to delete 
        <strong> {userData.name} </strong>? This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteModal(false)} color="secondary" disabled={isDeleting}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Delete;