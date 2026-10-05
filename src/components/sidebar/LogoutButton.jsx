import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logout } from "../../store/slices/authSlice";
import { clearUser } from "../../store/slices/getMeSlice";
import Cookies from "js-cookie"; // لو استخدمت مكتبة js-cookie

const LogoutButton = ({ isExpanded, onLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1) مسح الـcookie
    Cookies.remove("auth_token");
    // أو بالـdocument.cookie:
    // document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

    // 2) مسح الحالة من redux
    dispatch(logout());
    dispatch(clearUser());

    // 3) تحويل المستخدم
    navigate("/login");
    onLogout?.();
  };

  return (
    <div className="absolute bottom-3 left-3 right-3">
      <button
        onClick={handleLogout}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-right transition-all duration-200 group text-thirdColor-600 hover:bg-red-50 hover:text-red-600 hover:shadow-md`}
        title="تسجيل الخروج"
      >
        <LogOut
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105`}
        />
        <span
          className={`font-medium transition-all duration-300 ${
            isExpanded
              ? "opacity-100 translate-x-0"
              : "lg:opacity-100 lg:translate-x-0 opacity-0 translate-x-2"
          }`}
        >
          تسجيل الخروج
        </span>
      </button>
    </div>
  );
};

export default LogoutButton;
