import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-center"
        dir="rtl"
        toastOptions={{
          duration: 4000,
          style: {
            background: "white",
            color: "var(--color-thirdColor-800)",
            border: "1px solid var(--color-thirdColor-200)",
          },
          success: {
            iconTheme: {
              primary: "var(--color-firstColor-800)",
              secondary: "white",
            },
          },
          error: {
            icon: false,
          },
        }}
        closeButton={false}
      />
    </Provider>
  </StrictMode>
);
