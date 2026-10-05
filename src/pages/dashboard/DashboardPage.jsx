import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import MobileMenuButton from "../../components/sidebar/MobileMenuButton";
import { Menu } from "lucide-react";

const DashboardPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-firstColor-100 to-secondColor-200 ">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileClose={handleMobileClose}
      />

      <MobileMenuButton
        isOpen={isMobileMenuOpen}
        onToggle={toggleMobileMenu}
        position="left"
        Icon={Menu}
      />

      <div className="flex-1 transition-all duration-300">
        <div className="min-h-screen mr-0 lg:mr-55">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
