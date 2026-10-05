import { lazy } from "react";

// Lazy load all pages for better performance
export const LazyPages = {
  // Main pages
  LoginPage: lazy(() => import("../pages/LoginPage.jsx")),
  OurRestaurantsPage: lazy(() => import("../pages/OurRestaurantsPage.jsx")),
  LocationPage: lazy(() => import("../pages/LocationPage.jsx")),

  // Theme pages
  Menu1Page: lazy(() => import("../pages/themes/Menu1Page.jsx")),
  Menu2Page: lazy(() => import("../pages/themes/Menu2Page.jsx")),

  // Dashboard pages
  DashboardPage: lazy(() => import("../pages/dashboard/DashboardPage.jsx")),
  ModeratorPage: lazy(() => import("../pages/dashboard/ModeratorPage.jsx")),
  SettingsPage: lazy(() => import("../pages/dashboard/SettingsPage.jsx")),
  PackagesPage: lazy(() => import("../pages/dashboard/PackagesPage.jsx")),
  QrCodePage: lazy(() => import("../pages/dashboard/QrCodePage.jsx")),
  UsersPage: lazy(() => import("../pages/dashboard/UsersPage.jsx")),
  MenuManagement: lazy(() => import("../pages/dashboard/MenuManagement.jsx")),

  // Settings pages
  ProfileSettings: lazy(() =>
    import("../pages/dashboard/settings/ProfileSettings.jsx")
  ),
  PasswordSettings: lazy(() =>
    import("../pages/dashboard/settings/PasswordSettings.jsx")
  ),

  // Hooks
  ProtectDashboard: lazy(() =>
    import("../pages/dashboard/Hooks/ProtectDashboard.jsx")
  ),
};
