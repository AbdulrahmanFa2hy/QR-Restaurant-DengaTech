import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AuthInitializer from "./components/common/AuthInitializer";
import { LazyPages } from "./utils/lazyLoading";
import Redirect from "./components/common/redirect";

// Wrapper component to handle Suspense for lazy-loaded components
const LazyWrapper = ({ children }) => (
  <Suspense fallback={null}>{children}</Suspense>
);

// Dashboard redirect component to handle restaurant ID routing
const DashboardRedirect = () => {
  const { data: authUser } = useSelector((state) => state.auth);
  const { data: getMeUser } = useSelector((state) => state.getMe);

  // Use getMe user if available, otherwise fallback to auth user
  const user = getMeUser || authUser;
  const restaurantId = user?.restaurant; // This is the restaurant ID, not user ID

  if (restaurantId) {
    return <Navigate to={`/dashboard/${restaurantId}`} replace />;
  }

  // If no restaurant ID, redirect to login
  return <Navigate to="/login" replace />;
};

const App = () => {
  const { data: user } = useSelector((state) => state.getMe);

  const routes = createBrowserRouter([
    {
      path: "/login",
      element: (
        <LazyWrapper>
          <LazyPages.LoginPage />
        </LazyWrapper>
      ),
      title: "Login",
    },
    {
      path: "/",
      element: (
        <LazyWrapper>
          {/* <LazyPages.OurRestaurantsPage /> */}
          <Redirect />
        </LazyWrapper>
      ),
      title: "Home",
    },
    {
      path: "restaurant/:restaurantId",
      element: (
        <LazyWrapper>
          <LazyPages.Menu2Page />
        </LazyWrapper>
      ),
      title: "Restaurant",
    },

    {
      path: "restaurant/:restaurantName/location",
      element: (
        <LazyWrapper>
          <LazyPages.LocationPage />
        </LazyWrapper>
      ),
      title: "Location",
    },
    {
      path: "/dashboard",
      element: (
        <LazyWrapper>
          <DashboardRedirect />
        </LazyWrapper>
      ),
    },
    {
      path: "/dashboard/:restaurantId",
      element: (
        <LazyWrapper>
          <LazyPages.ProtectDashboard allowed={["moderator", "owner"]}>
            <LazyPages.DashboardPage />
          </LazyPages.ProtectDashboard>
        </LazyWrapper>
      ),
      children: [
        {
          index: true,
          element: (
            <LazyPages.ProtectDashboard allowed={["moderator", "owner"]}>
              <LazyWrapper>
                {user?.role == "moderator" ? (
                  <LazyPages.ModeratorPage />
                ) : (
                  <LazyPages.MenuManagement />
                )}
              </LazyWrapper>
            </LazyPages.ProtectDashboard>
          ),
          title: "Moderator",
        },

        {
          path: "menu-settings",
          element: (
            <LazyPages.ProtectDashboard allowed={["owner", "moderator"]}>
              <LazyWrapper>
                <LazyPages.MenuManagement />
              </LazyWrapper>
            </LazyPages.ProtectDashboard>
          ),
          title: "Settings",
        },
        {
          path: "settings",
          element: (
            <LazyPages.ProtectDashboard allowed={["owner", "moderator"]}>
              <LazyWrapper>
                <LazyPages.SettingsPage />
              </LazyWrapper>
            </LazyPages.ProtectDashboard>
          ),
          title: "Settings",
        },
        {
          path: "settings/profile",
          element: (
            <LazyPages.ProtectDashboard allowed={["owner", "moderator"]}>
              <LazyWrapper>
                <LazyPages.ProfileSettings />
              </LazyWrapper>
            </LazyPages.ProtectDashboard>
          ),
          title: "Profile Settings",
        },
        {
          path: "settings/password",
          element: (
            <LazyPages.ProtectDashboard allowed={["owner", "moderator"]}>
              <LazyWrapper>
                <LazyPages.PasswordSettings />
              </LazyWrapper>
            </LazyPages.ProtectDashboard>
          ),
          title: "Password Settings",
        },
        {
          path: "packages",
          element: (
            <LazyPages.ProtectDashboard allowed={["moderator"]}>
              <LazyWrapper>
                <LazyPages.PackagesPage />
              </LazyWrapper>
            </LazyPages.ProtectDashboard>
          ),
          title: "Packages",
        },
        {
          path: "qrcode",
          element: (
            <LazyPages.ProtectDashboard allowed={["owner"]}>
              <LazyWrapper>
                <LazyPages.QrCodePage />
              </LazyWrapper>
            </LazyPages.ProtectDashboard>
          ),
          title: "QrCode",
        },
        {
          path: "users",
          element: (
            <LazyPages.ProtectDashboard allowed={["moderator"]}>
              <LazyWrapper>
                <LazyPages.UsersPage />
              </LazyWrapper>
            </LazyPages.ProtectDashboard>
          ),
          title: "Users",
        },
      ],
    },
  ]);

  return (
    <AuthInitializer>
      <RouterProvider router={routes} />
    </AuthInitializer>
  );
};

export default App;
