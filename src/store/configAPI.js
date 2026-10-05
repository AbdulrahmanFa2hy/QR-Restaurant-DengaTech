import axios from "axios";
import Cookies from "js-cookie";
import handleRequestError from "../utils/handleRequestError";
import handleRequestSuccess from "../utils/handleRequestSuccess";
import { mockAdapter } from "../mock/mockServer";

// ===== DEMO MODE =====
// All requests are served by a local mock API with demo data instead of
// the real backend. Set USE_DEMO_DATA to false to talk to the real API.
export const USE_DEMO_DATA = true;
if (USE_DEMO_DATA) {
  // Applies to every instance created via axios.create() from now on
  axios.defaults.adapter = mockAdapter;
}

export const tokenCookieKey = "auth_token";

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const refreshToken = async () => {
  try {
    // Create a special axios instance for refresh that includes credentials
    const refreshInstance = axios.create({
      baseURL: services.auth,
      withCredentials: true, // This allows httpOnly cookies to be sent
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Make refresh request - httpOnly refresh token will be sent automatically
    const response = await refreshInstance.post("/auth/refresh");

    const { token } = response.data;

    // Update access token in cookie (refresh token is httpOnly, managed by server)
    Cookies.set(tokenCookieKey, token);

    return token;
  } catch (error) {
    // If refresh fails, clear access token and redirect to login
    Cookies.remove(tokenCookieKey);
    window.location.href = "/login";
    throw error;
  }
};

// Microservices URLs
const services = {
  auth: "https://auth.dengatech.com/api/v1",
  main: "https://qr.dengatech.com/api/v1",
};

// Legacy baseURL for backward compatibility
export const baseURL = services.main;

export const createAPI = (service = "main") => {
  const instance = axios.create({
    baseURL: services[service],
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  });

  // Request interceptor - attach token for non-auth services
  instance.interceptors.request.use((config) => {
    const token = Cookies.get(tokenCookieKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor - centralized error and success handling with token refresh
  instance.interceptors.response.use(
    (response) => {
      // Use centralized success handling
      handleRequestSuccess(response);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Check if error is 401 and we haven't already tried to refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshToken();
          processQueue(null, newToken);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          // Use centralized error handling
          handleRequestError(refreshError);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Use centralized error handling for other errors
      handleRequestError(error);
      return Promise.reject(error);
    }
  );

  return instance;
};

// Default API instance for backward compatibility
export const api = createAPI("main");

// Auth API instance
export const authAPI = createAPI("auth");

// Export refresh token function for manual use
export { refreshToken };
