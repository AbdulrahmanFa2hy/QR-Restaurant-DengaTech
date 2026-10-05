import React from "react";
import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import UserProfile from "./UserProfile";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ isMobileMenuOpen, onMobileClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`absolute bg-white h-dvh shadow-2xl border-l border-thirdColor-200 transition-all duration-300 ${
          isMobileMenuOpen
            ? " lg:translate-x-0 fixed right-0 top-0 z-50 translate-x-0 w-72"
            : " lg:translate-x-0 fixed right-0 top-0 z-50 translate-x-full w-55 overflow-hidden"
        }`}
      >
        {/* Logo Section */}
        <Logo isExpanded={isMobileMenuOpen} />

        {/* Navigation Menu */}
        <NavigationMenu isExpanded={true} onNavigate={onMobileClose} />

        {/* User Profile Section */}
        <UserProfile isExpanded={isMobileMenuOpen} />

        {/* Logout Button */}
        <LogoutButton isExpanded={isMobileMenuOpen} onLogout={onMobileClose} />
      </div>
    </>
  );
};

export default Sidebar;
