import React, { useState } from "react";
import Button from "./ui/Button";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";

const PasswordList = ({ passwords, onUpdate, onDelete }) => {
  const [visibleId, setVisibleId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const toggleVisibility = (id) => {
    setVisibleId((prev) => (prev === id ? null : id));
  };

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);

      // Clear "Copied!" label after 1.5 sec
      setTimeout(() => setCopiedId(null), 1500);

      // Clear clipboard after 15 seconds
      setTimeout(async () => {
        try {
          const permission = await navigator.permissions.query({
            name: "clipboard-write",
          });

          if (permission.state === "granted" || permission.state === "prompt") {
            await navigator.clipboard.writeText("");
            console.log("Clipboard auto-cleared for security.");
          }
        } catch (err) {
          console.warn("Clipboard clear failed or not permitted:", err);
        }
      }, 30000);
    } catch (err) {
      alert("Failed to copy");
    }
  };

  return (
    <div className="space-y-3">
      {passwords.map((p) => (
        <div
          key={p._id}
          className="p-3 border rounded dark:border-gray-600 dark:text-white"
        >
          <p><strong>Site:</strong> {p.site}</p>
          <p><strong>Username:</strong> {p.username}</p>
          <div className="flex items-center gap-2">
            <p><strong>Password:</strong></p>
            <span className="font-mono">
              {visibleId === p._id ? p.password : "*".repeat(8)}
            </span>
            <button
              onClick={() => toggleVisibility(p._id)}
              className="hover:text-blue-500 transition"
              title="Toggle visibility"
            >
              {visibleId === p._id ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button
              onClick={() => handleCopy(p.password, p._id)}
              className="hover:text-green-500 transition"
              title="Copy password"
            >
              <FaCopy />
            </button>
            {copiedId === p._id && (
              <span className="text-green-500 text-sm">Copied!</span>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="secondary" onClick={() => onUpdate(p)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDelete(p._id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PasswordList;
