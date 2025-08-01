import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">🔐 Password Manager</h1>
      {user && (
        <button
          onClick={logout}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
