const PasswordList = ({ passwords, onEdit, onDelete }) => {
  return (
    <div className="mt-4 space-y-2">
      {passwords.map(p => (
        <div key={p._id} className="bg-white p-2 border rounded">
          <div><strong>Site:</strong> {p.site}</div>
          <div><strong>Username:</strong> {p.username}</div>
          <div><strong>Password:</strong> {p.password}</div>
          <button className="text-blue-600" onClick={() => onEdit(p)}>Edit</button>
          <button className="text-red-600" onClick={() => onDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PasswordList;
