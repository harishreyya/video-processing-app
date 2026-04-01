import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;

    let filter = {};

    if (role) {
      filter.role = role;
    }

    const users = await User.find(filter).select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};