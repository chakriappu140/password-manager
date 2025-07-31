import Password from "../models/password.js";
import crypto from "crypto";

const algorithm = 'aes-256-cbc';
const iv = Buffer.alloc(16, 0);
const getKey = () => crypto.scryptSync(process.env.ENCRYPTION_SECRET, 'salt', 32);

export const savePassword = async (req, res) => {
    const { site, username, password } = req.body;
    const userId = req.user.id;  // ✅ FIXED

    try {
        const key = getKey();
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const newEntry = await Password.create({
            user: userId,
            site,
            username,
            encryptedPassword: encrypted,
        });

        res.status(201).json(newEntry);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "error saving password" });
    }
};

export const getPasswords = async (req, res) => {
    const userId = req.user.id;  // ✅ FIXED

    try {
        const key = getKey();
        const entries = await Password.find({ user: userId });

        const decryptedEntries = entries.map(entry => {
            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decrypted = decipher.update(entry.encryptedPassword, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            return {
                _id: entry._id,
                site: entry.site,
                username: entry.username,
                password: decrypted,
            };
        });

        res.json(decryptedEntries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "error retrieving passwords" });
    }
};
