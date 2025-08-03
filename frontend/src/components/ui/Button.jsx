const Button = ({ children, className = '', full = false, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded transition-colors duration-300 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 ${
        full ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
