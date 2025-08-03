import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";

const Signup = () => {
  const { signup, user, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && user) navigate("/dashboard");
  }, [user, loading, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(form);
    } catch (err) {
      setError(err.message || "Signup failed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>
        {error && <Message variant="error">{error}</Message>}

        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Input
            icon={<FiUser />}
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            icon={<FiMail />}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            icon={<FiLock />}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <Button type="submit" full disabled={loading}>
            {loading ? <Loader size="sm" /> : "Sign Up"}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default Signup;
