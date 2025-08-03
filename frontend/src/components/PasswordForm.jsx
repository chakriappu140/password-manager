import React, { useEffect, useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import usePasswordStrength from "./hooks/usePasswordStrength";
import { savePassword } from "../utils/api";

const generatePassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const PasswordForm = ({ initial = {}, onSave }) => {
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
    _id: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const { label, color } = usePasswordStrength(form.password);

  useEffect(() => {
    if (initial) setForm({ ...form, ...initial });
  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await savePassword(form);
    setForm({ site: "", username: "", password: "", _id: null });
    onSave?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="site" placeholder="Website" value={form.site} onChange={handleChange} />
      <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
      <Input
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        type={showPassword ? "text" : "password"}
        rightIcon={showPassword ? "🙈" : "👁️"}
        onRightIconClick={() => setShowPassword(!showPassword)}
      />
      {form.password && (
        <p className={`text-sm text-${color}-600`}>Strength: {label}</p>
      )}
      <div className="flex gap-2">
        <Button type="submit">{form._id ? "Update" : "Save"}</Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setForm({ ...form, password: generatePassword() })}
        >
          Generate Strong Password
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
