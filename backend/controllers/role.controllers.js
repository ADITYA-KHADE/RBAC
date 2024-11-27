const Role = require("../models/role.model");

const getroles = async (req, res) => {
  try {
    const roles = await Role.find();
    if (!roles.length) {
      return res.status(404).json({ msg: "No roles found" });
    }
    res.status(200).json(roles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const addrole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    if (!name || !permissions) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    const role = new Role({
      name,
      permissions,
    });

    const newRole = await role.save();

    res.status(201).json({
      newRole,
      msg: "Role added successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const updaterole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ msg: "Role not found" });
    }
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true, runValidators: true }
    );

    res.status(200).json({ updatedRole, msg: "Role updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const deleterole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).json({ msg: "role not found" });
    }

    res.status(200).json({ msg: "role deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getroles, updaterole, deleterole, addrole };
