import crypto from "crypto";

const algorithm = "aes-256-cbc";

// Ensure secretKey is exactly 32 bytes
const baseKey = process.env.ENCRYPTION_KEY || "default_insecure_key_123456";
const secretKey = crypto.createHash("sha256").update(baseKey).digest().slice(0, 32); // makes it exactly 32 bytes

// Encrypt
export const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // move inside the function so it's fresh each time
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

// Decrypt
export const decrypt = (text) => {
  const [ivHex, encryptedText] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
