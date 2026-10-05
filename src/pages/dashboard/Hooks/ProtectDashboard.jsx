import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import CustomLoadingSpinner from "../../../components/common/CustomLoadingSpinner";

const ProtectDashboard = ({ children, allowed = [] }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { restaurantId } = useParams();

  const { data: user, error, loading } = useSelector((state) => state.getMe);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      setRequested(true);
      return;
    }
    if (!requested) setRequested(true);
  }, [requested, dispatch]);

  const token = Cookies.get("auth_token");
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 2) لسه بنطلب/بنستنى الداتا
  if (!requested || loading || (!error && !user)) {
    return (
      <CustomLoadingSpinner
        size="xl"
        message="جاري التحقق من الصلاحيات..."
        showBackground
      />
    );
  }

  if (user.role !== "moderator" && restaurantId !== user?.organization?.id) {
    return <Navigate to="/" replace />;
  }

  // 4) السماح بالأدوار
  if (user && allowed.includes(user.role)) {
    return <>{children}</>;
  }

  // 5) دور غير مسموح → صفحة عامة غير محمية
  return <Navigate to="/" replace />;
};

export default ProtectDashboard;
