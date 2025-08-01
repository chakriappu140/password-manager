import React, { useEffect, useState } from "react";
import { useGetPasswordsQuery, useDeletePasswordMutation } from "../redux/api/passwordApiSlice";

const PasswordList = () => {
  const { data: passwords = [], refetch } = useGetPasswordsQuery();
  const [deletePassword] = useDeletePasswordMutation();

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(passwords);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        passwords.filter(
          (item) =>
            item.site.toLowerCase().includes(lower) ||
            item.username.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, passwords]);

  const handleDelete = async (id) => {
    await deletePassword(id);
    refetch();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <input
        type="text"
        placeholder="Search by site or username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No matching results</p>
      ) : (
        filtered.map((item) => (
          <div key={item._id} className="border p-3 rounded shadow-sm flex justify-between items-center">
            <div>
              <p><strong>Site:</strong> {item.site}</p>
              <p><strong>Username:</strong> {item.username}</p>
              <p><strong>Password:</strong> {item.password}</p>
            </div>
            <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PasswordList;
