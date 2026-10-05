import React from "react";
import { useSelector } from "react-redux";

const UserProfile = ({ isExpanded }) => {
  // Get user data from Redux store
  const { data: authUser, loading: authLoading } = useSelector(
    (state) => state.auth
  );
  const { data: getMeUser, loading: getMeLoading } = useSelector(
    (state) => state.getMe
  );

  // Use getMe user data if available, otherwise fall back to auth user
  const currentUser = getMeUser || authUser;
  const isLoading = authLoading || getMeLoading;

  const getUserInitials = () => {
    if (currentUser?.name) return currentUser.name.charAt(0).toUpperCase();
    if (currentUser?.email) return currentUser.email.charAt(0).toUpperCase();
    return "U";
  };

  const getUserName = () => {
    return currentUser?.name || "User";
  };

  const getUserRole = () => {
    return currentUser?.role || "User";
  };

  return (
    <div
      className={`absolute bottom-16 transition-all duration-300 ${
        isExpanded ? "left-3 right-3" : "lg:left-3 lg:right-3 left-1 right-1"
      }`}
    >
      <div className="bg-gradient-to-r from-thirdColor-50 to-thirdColor-50 rounded-lg p-2 border border-thirdColor-200 shadow-sm">
        <div className="flex items-center space-x-3 ">
          <div className="w-8 h-8 bg-gradient-to-br from-firstColor-400 to-secondColor-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="text-white font-bold text-lg">
                {getUserInitials()}
              </span>
            )}
          </div>
          <div
            className={`transition-all duration-300 ${
              isExpanded
                ? "opacity-100 translate-x-0"
                : "lg:opacity-100 lg:translate-x-0 opacity-0 translate-x-2"
            }`}
          >
            <p className="text-sm font-semibold text-thirdColor-800">
              {isLoading ? "جاري التحميل..." : getUserName()}
            </p>
            <p className="text-xs text-thirdColor-600">
              {isLoading ? "يرجى الانتظار" : getUserRole()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
