import { useMemo } from "react";

const getPasswordStrength = (password) => {
  let score = 0;

  if (!password) return { score, label: "Too Short", color: "gray" };

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score === 0 || score === 1) return { score, label: "Weak", color: "red" };
  if (score === 2) return { score, label: "Fair", color: "yellow" };
  if (score === 3) return { score, label: "Strong", color: "blue" };
  if (score === 4) return { score, label: "Very Strong", color: "green" };

  return { score: 0, label: "Too Short", color: "gray" };
};

const usePasswordStrength = (password) => {
  return useMemo(() => getPasswordStrength(password), [password]);
};

export default usePasswordStrength;
