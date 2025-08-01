import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const { handleLogin, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await handleLogin(form);
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
          {error}
        </div>
      )}

      <div className="relative">
        <FiMail className="absolute left-3 top-3 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          className="input pl-10"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div className="relative">
        <FiLock className="absolute left-3 top-3 text-gray-400" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input pl-10 pr-10"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <div
          className="absolute right-3 top-3 text-gray-400 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </div>
      </div>

      <button
        type="submit"
        className="btn w-full"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">Register</Link>
      </p>
    </form>
  );
};

export default Login;
