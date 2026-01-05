import User from "../models/User.js";
import bcrypt from "bcryptjs";

// GET profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to load profile" });
  }
};

// UPDATE profile
export const updateProfile = async (req, res) => {
  try {
    const { name, username, bio, dateOfBirth, phoneNumber } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, username, bio, dateOfBirth, phoneNumber },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    res.status(500).json({ message: "Image upload failed" });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(req.user.id);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  user.password = newPassword; // will be hashed by pre-save hook
  await user.save();

  res.json({ message: "Password updated successfully" });
};

// DELETE ACCOUNT SECURE
export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    await user.deleteOne();
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};
