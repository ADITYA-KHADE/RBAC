const User = require("../models/user.model");

const getuser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
}

const adduser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    if (!name || !email || !role || !status) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    const user = new User({
      name,
      email,
      role,
      status,
    });

    const newUser = await user.save();

    res.status(201).json({
      newUser,
      msg: "User added successfully",
    });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
}

const updateuser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    const { id } = req.params;

    if (!name || !email || !role || !status) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    const user = await User.findByIdAndUpdate(id, { name, email, role, status }, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ user, msg: "User updated successfully" });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
}

const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }

}

module.exports = { getuser,adduser,updateuser,deleteuser };
