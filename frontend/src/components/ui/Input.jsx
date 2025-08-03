const Input = ({ icon, rightIcon, onRightIconClick, ...props }) => {
  const hasLeftIcon = !!icon;
  const hasRightIcon = !!rightIcon;

  return (
    <div className="relative w-full">
      {hasLeftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`w-full py-2 px-3 border rounded dark:bg-gray-700 dark:text-white placeholder-gray-400
          ${hasLeftIcon ? 'pl-10' : ''}
          ${hasRightIcon ? 'pr-10' : ''}`}
      />
      {hasRightIcon && (
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={onRightIconClick}
        >
          {rightIcon}
        </span>
      )}
    </div>
  );
};

export default Input;
