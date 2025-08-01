// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { getPasswords, savePassword, updatePassword, deletePassword } from "../utils/api";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [editId, setEditId] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    fetchPasswords();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      search.trim() === ""
        ? passwords
        : passwords.filter(
            (p) =>
              p.site.toLowerCase().includes(q) ||
              p.username.toLowerCase().includes(q)
          )
    );
  }, [search, passwords]);

  const fetchPasswords = async () => {
    try {
      const res = await getPasswords();
      setPasswords(res.data);
    } catch (err) {
      console.error("Error fetching passwords:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updatePassword(editId, form);
      } else {
        await savePassword(form);
      }
      setForm({ site: "", username: "", password: "" });
      setEditId(null);
      fetchPasswords();
    } catch (err) {
      console.error("Error saving/updating password:", err);
    }
  };

  const handleEdit = (entry) => {
    setForm({
      site: entry.site,
      username: entry.username,
      password: entry.password,
    });
    setEditId(entry._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deletePassword(id);
        fetchPasswords();
      } catch (err) {
        console.error("Error deleting password:", err);
      }
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by site or username"
        className="w-full p-2 border rounded mb-4"
      />

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          name="site"
          value={form.site}
          onChange={handleChange}
          placeholder="Site"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Update Password" : "Add Password"}
        </button>
      </form>

      {filtered.length === 0 ? (
        <p className="text-gray-600 text-center">No matching passwords.</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((entry) => (
            <li key={entry._id} className="p-3 border rounded shadow-sm bg-white">
              <div><strong>Site:</strong> {entry.site}</div>
              <div><strong>Username:</strong> {entry.username}</div>
              <div><strong>Password:</strong> {entry.password}</div>
              <div className="mt-2 space-x-2">
                <button onClick={() => handleEdit(entry)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(entry._id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
