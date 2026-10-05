import React from "react";

const SocialIcon = ({
  icon: Icon,
  onClick,
  title,
  className = "",
  size = "w-6 h-6",
  color = "text-firstColor-800",
}) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${className}`}
      title={title}
    >
      <Icon
        className={`${size} ${color} group-hover:scale-110 transition-transform duration-300`}
      />
    </button>
  );
};

export default SocialIcon;
