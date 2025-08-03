// backend/controllers/passwordController.js
import Password from "../models/password.js";
import { encrypt, decrypt } from "../utils/encryption.js";

// Save new password
export const savePassword = async (req, res) => {
  try {
    const { site, username, password } = req.body;

    if (!site || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const encryptedPassword = encrypt(password);

    const newPassword = new Password({
      user: req.user.id,  // from auth middleware
      site,
      username,
      encryptedPassword,
    });

    const saved = await newPassword.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving password:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all passwords for logged-in user
export const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id }).sort({ createdAt: -1 });

    const decrypted = passwords.map((entry) => ({
      _id: entry._id,
      site: entry.site,
      username: entry.username,
      password: decrypt(entry.encryptedPassword),
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    }));

    res.json(decrypted);
  } catch (err) {
    console.error("Error fetching passwords:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update password entry
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { site, username, password } = req.body;

    const encryptedPassword = encrypt(password);

    const updated = await Password.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { site, username, encryptedPassword },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Password entry not found" });

    res.json(updated);
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete password entry
export const deletePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Password.findOneAndDelete({ _id: id, user: req.user.id });

    if (!deleted) return res.status(404).json({ message: "Password entry not found" });

    res.json({ message: "Password deleted" });
  } catch (err) {
    console.error("Error deleting password:", err);
    res.status(500).json({ message: "Server error" });
  }
};
