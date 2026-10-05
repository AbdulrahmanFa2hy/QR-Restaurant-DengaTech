import React from "react";

const CustomSelect = ({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  className = "",
  options = [],
  placeholder,
  ...props
}) => {
  const baseSelectClasses = `
    w-full px-3 py-2 border border-thirdColor-200 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-firstColor-400 
    bg-thirdColor-50 text-thirdColor-800
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200 appearance-none cursor-pointer
  `;

  const errorClasses = error ? "border-red-300 focus:ring-red-200" : "";

  const selectClasses = `${baseSelectClasses} ${errorClasses} ${className}`;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-thirdColor-800">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={selectClasses}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-thirdColor-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default CustomSelect;
