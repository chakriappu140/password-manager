import Password from "../models/password.js";
import { encrypt, decrypt } from "../utils/encryption.js";

// Create and save password (encrypted)
export const savePassword = async (req, res) => {
  try {
    const { site, username, password } = req.body;
    const encryptedPassword = encrypt(password);

    const newEntry = new Password({
      user: req.user.id,
      site,
      username,
      encryptedPassword,
    });

    await newEntry.save();

    res.status(201).json({
      ...newEntry.toObject(),
      password, // return decrypted password
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving password" });
  }
};

// Get all passwords (decrypt before sending)
export const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id });

    const decrypted = passwords.map((p) => ({
      ...p.toObject(),
      password: decrypt(p.encryptedPassword),
    }));

    res.json(decrypted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching passwords" });
  }
};

// Update password (re-encrypt updated password)
export const updatePassword = async (req, res) => {
  try {
    const { site, username, password } = req.body;
    const encryptedPassword = encrypt(password);

    const updated = await Password.findByIdAndUpdate(
      req.params.id,
      {
        site,
        username,
        encryptedPassword,
      },
      { new: true }
    );

    res.json({
      ...updated.toObject(),
      password, // return decrypted password
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
};

// Delete password
export const deletePassword = async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting password" });
  }
};
