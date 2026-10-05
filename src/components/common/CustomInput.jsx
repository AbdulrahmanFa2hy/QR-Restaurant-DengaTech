import React from "react";

const CustomInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  icon: Icon,
  className = "",
  ...props
}) => {
  const baseInputClasses = `
    w-full px-3 py-2 border border-thirdColor-200 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-firstColor-400 
    bg-thirdColor-50 text-thirdColor-800
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
  `;

  const errorClasses = error ? "border-red-300 focus:ring-red-200" : "";

  const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-thirdColor-800">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-thirdColor-600" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default CustomInput;
