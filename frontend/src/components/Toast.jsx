import { useEffect, useState } from "react";

const Toast = ({ message, type = "success", duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  if (!visible) return null;

  const bg = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div className={`${bg} text-white px-4 py-2 rounded fixed top-4 right-4 shadow-lg`}>
      {message}
    </div>
  );
};

export default Toast;
