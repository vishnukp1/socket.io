const CustomInput = ({ type, name, placeholder, className, ...props }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`px-4 py-2 bg-gray-800 text-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E9522C] transition-all duration-300 ease-in-out ${className}`}
      {...props}
    />
  );
};

export default CustomInput;
