import React, { useEffect } from "react";
import { X } from "lucide-react";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-4xl",
  showCloseButton = true,
  closeOnBackdropClick = true,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Apply styles to prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // Cleanup function to restore scrolling
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl ${maxWidth} w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-2 sm:p-4 border-b border-thirdColor-200">
            <h2 className="text-xl font-semibold text-thirdColor-800">
              {title}
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-thirdColor-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-thirdColor-600" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-2 sm:p-4">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
