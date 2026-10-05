import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Settings,
  CreditCard,
  Shield,
  QrCodeIcon,
  UserIcon,
  CakeSlice,
  ChevronDown,
  ChevronRight,
  User,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const NavigationMenu = ({ isExpanded, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const { data: user } = useSelector((state) => state.getMe);

  const menuItems = [
    {
      id: "moderator",
      label: "المشرف",
      icon: Shield,
      path: `/dashboard/${user._id}`,
      disabled: false,
      active: user.role == "owner" ? false : true,
    },
    {
      id: "user",
      label: "المستخدمين",
      icon: UserIcon,
      path: "users",
      disabled: false,
      active: user.role == "moderator" ? true : false,
    },
    {
      id: "packages",
      label: "الباقات",
      icon: CreditCard,
      path: "packages",
      disabled: false,
      active: user.role == "moderator" ? true : false,
    },
    {
      id: "qrcode",
      label: "الباركود",
      icon: QrCodeIcon,
      path: "qrcode",
      disabled: false,
      active: user.role == "owner" ? true : false,
    },
    {
      id: "menu-settings",
      label: "تعديل المنيو",
      icon: CakeSlice,
      path: "menu-settings",
      disabled: false,
      active: user.role == "owner" ? true : false,
    },
  ];

  const settingsItems = [
    {
      id: "profile",
      label: "الملف الشخصي",
      icon: User,
      path: "settings/profile",
    },
    {
      id: "password",
      label: "كلمة المرور",
      icon: Lock,
      path: "settings/password",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onNavigate?.();
  };

  const toggleSettings = () => {
    setIsSettingsExpanded(!isSettingsExpanded);
  };

  const isSettingsItemActive = (path) => location.pathname.includes(path);

  return (
    <nav className="mt-6">
      <ul className="space-y-1 px-3">
        {menuItems
          .filter((item) => item.active)
          .map((item) => {
            const IconComponent = item.icon;
            const isActive =
              location.pathname.includes(item.path) ||
              (item.path === `/dashboard/${id}` &&
                location.pathname === `/dashboard/${id}`);
            return (
              <li
                key={item.id}
                className={
                  item.disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
              >
                <button
                  disabled={item.disabled}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-right transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-firstColor-100 to-secondColor-200 text-firstColor-800 shadow-lg shadow-firstColor-100/20"
                      : "text-thirdColor-600 hover:bg-thirdColor-50 hover:text-thirdColor-800 hover:shadow-md"
                  }`}
                  title={item.label}
                >
                  <IconComponent
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />
                  <span
                    className={`font-medium transition-all duration-300 ${
                      isExpanded
                        ? "opacity-100 translate-x-0"
                        : "lg:opacity-100 lg:translate-x-0 opacity-0 translate-x-2"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="mr-auto w-2 h-2 bg-firstColor-800 rounded-full animate-pulse" />
                  )}
                </button>
              </li>
            );
          })}

        {/* Settings Accordion */}
        <li className="cursor-pointer">
          <button
            onClick={toggleSettings}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-right transition-all duration-200 group text-thirdColor-600 hover:bg-thirdColor-50 hover:text-thirdColor-800 hover:shadow-md"
            title="الإعدادات"
          >
            <Settings className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105" />
            <span
              className={`font-medium transition-all duration-300 ${
                isExpanded
                  ? "opacity-100 translate-x-0"
                  : "lg:opacity-100 lg:translate-x-0 opacity-0 translate-x-2"
              }`}
            >
              الإعدادات
            </span>
            <div className="mr-auto flex items-center">
              {isExpanded && (
                <div className="transition-transform duration-200">
                  {isSettingsExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              )}
            </div>
          </button>

          {/* Settings Submenu */}
          {isSettingsExpanded && isExpanded && (
            <ul className="mt-2 space-y-1 text-sm">
              {settingsItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = isSettingsItemActive(item.path);
                return (
                  <li key={item.id} className="cursor-pointer">
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-right transition-all duration-200 group ${
                        isActive
                          ? "bg-firstColor-100 text-firstColor-800 shadow-md"
                          : "text-thirdColor-600 hover:bg-thirdColor-50 hover:text-thirdColor-800"
                      }`}
                      title={item.label}
                    >
                      <IconComponent
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                          isActive ? "scale-110" : "group-hover:scale-105"
                        }`}
                      />
                      <span className="font-medium text-sm">{item.label}</span>
                      {isActive && (
                        <div className="mr-auto w-1.5 h-1.5 bg-firstColor-800 rounded-full animate-pulse" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
