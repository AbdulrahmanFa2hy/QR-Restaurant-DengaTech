import React from "react";
import { Menu, X } from "lucide-react";

const MobileMenuButton = ({
  isOpen,
  onToggle,
  position = "left",
  className,
  Icon,
}) => {
  const positionClass = position === "right" ? "right-4" : "left-4";

  return (
    <button
      onClick={onToggle}
      className={`lg:hidden fixed top-4 ${positionClass} ${className} z-50 bg-white border border-thirdColor-200 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}
    >
      {isOpen ? (
        <X className="w-6 h-6 text-thirdColor-800" />
      ) : (
        <Icon className="w-6 h-6 text-thirdColor-800" />
      )}
    </button>
  );
};

export default MobileMenuButton;
