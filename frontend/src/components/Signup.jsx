import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Signup = () => {
  const { handleSignup, user, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await handleSignup(form);
    } catch (err) {
      setError("Signup failed.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Create Account</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
          {error}
        </div>
      )}

      <div className="relative">
        <FiUser className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input pl-10"
          required
        />
      </div>

      <div className="relative">
        <FiMail className="absolute left-3 top-3 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input pl-10"
          required
        />
      </div>

      <div className="relative">
        <FiLock className="absolute left-3 top-3 text-gray-400" />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="input pl-10"
          required
        />
      </div>

      <button
        type="submit"
        className="btn w-full"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
