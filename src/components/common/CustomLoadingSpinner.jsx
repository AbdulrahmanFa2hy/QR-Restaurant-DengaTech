import React from "react";

const CustomLoadingSpinner = ({
  size = "md",
  message = "جاري التحميل...",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;
  const textSize = textSizeClasses[size] || textSizeClasses.md;

  const spinnerContent = (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div
          className={`${spinnerSize} border-4 border-thirdColor-200 rounded-full animate-spin`}
          style={{
            borderTopColor: "var(--color-firstColor-100)",
            borderRightColor: "var(--color-secondColor-200)",
            borderBottomColor: "var(--color-firstColor-100)",
            borderLeftColor: "var(--color-secondColor-200)",
            animation: "spin 1s linear infinite",
          }}
        ></div>

        {/* Inner Ring */}
        <div
          className={`absolute inset-2 border-2 border-transparent rounded-full animate-spin`}
          style={{
            borderTopColor: "var(--color-firstColor-800)",
            borderRightColor: "var(--color-firstColor-400)",
            animation: "spin 0.8s linear infinite reverse",
          }}
        ></div>

        {/* Center Dot */}
        <div
          className={`absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-firstColor-100 to-secondColor-200 rounded-full animate-pulse`}
        ></div>
      </div>

      {/* Loading Message */}
      {message && (
        <div className="text-center">
          <p
            className={`${textSize} font-medium text-thirdColor-800 animate-pulse`}
            style={{
              background:
                "linear-gradient(45deg, var(--color-firstColor-800), var(--color-firstColor-400))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="pointer-events-auto">{spinnerContent}</div>
    </div>
  );
};

export default CustomLoadingSpinner;
