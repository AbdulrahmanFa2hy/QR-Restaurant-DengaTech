import toast from "react-hot-toast";

/**
 * Centralized success handling function for API requests
 * Determines success message based on the API endpoint path
 * @param {Object} response - The response object from axios
 * @returns {string} - The success message to display
 */
export default function handleRequestSuccess(response) {
  if (!response?.config?.url) {
    return;
  }

  const url = response.config.url;
  const method = response.config.method?.toLowerCase();

  // Extract the endpoint path from the URL
  const path = url.replace(/^https?:\/\/[^/]+/, "").replace(/^\/api\/v1/, "");

  let successMessage = "تمت العملية بنجاح";

  // Handle different API endpoints and methods
  if (path.includes("/auth/login")) {
    successMessage = "تم تسجيل الدخول بنجاح";
  } else if (path.includes("/auth/logout")) {
    successMessage = "تم تسجيل الخروج بنجاح";
  } else if (path.includes("/auth/updatePassword")) {
    successMessage = "تم تغيير كلمة المرور بنجاح";
  } else if (path.includes("/category")) {
    if (method === "post") {
      successMessage = "تم إنشاء الفئة بنجاح";
    } else if (method === "put") {
      successMessage = "تم تحديث الفئة بنجاح";
    } else if (method === "delete") {
      successMessage = "تم حذف الفئة بنجاح";
    }
  } else if (path.includes("/subcategory")) {
    if (method === "post") {
      successMessage = "تم إنشاء الفئة الفرعية بنجاح";
    } else if (method === "put") {
      successMessage = "تم تحديث الفئة الفرعية بنجاح";
    } else if (method === "delete") {
      successMessage = "تم حذف الفئة الفرعية بنجاح";
    }
  } else if (path.includes("/product")) {
    if (method === "post") {
      successMessage = "تم إنشاء المنتج بنجاح";
    } else if (method === "put") {
      successMessage = "تم تحديث المنتج بنجاح";
    } else if (method === "delete") {
      successMessage = "تم حذف المنتج بنجاح";
    }
  } else if (path.includes("/restaurant")) {
    if (method === "post") {
      successMessage = "تم إنشاء المطعم بنجاح";
    } else if (method === "put") {
      successMessage = "تم تحديث المطعم بنجاح";
    } else if (method === "delete") {
      successMessage = "تم حذف المطعم بنجاح";
    } else if (path.includes("/theme/")) {
      successMessage = "تم تحديث ثيم المطعم بنجاح";
    }
  } else if (path.includes("/user")) {
    if (method === "post") {
      successMessage = "تم إنشاء المستخدم بنجاح";
    } else if (method === "put") {
      successMessage = "تم تحديث المستخدم بنجاح";
    } else if (method === "delete") {
      successMessage = "تم حذف المستخدم بنجاح";
    }
  } else if (path.includes("/package")) {
    if (method === "post") {
      successMessage = "تم إنشاء الباقة بنجاح";
    } else if (method === "put") {
      successMessage = "تم تحديث الباقة بنجاح";
    } else if (method === "delete") {
      successMessage = "تم حذف الباقة بنجاح";
    }
  } else {
    if (method === "post") {
      successMessage = "تم إنشاء العملية بنجاح";
    } else if (method === "put") {
      successMessage = "تم تحديث العملية بنجاح";
    } else if (method === "delete") {
      successMessage = "تم حذف العملية بنجاح";
    }
  }

  // Only show success toast for POST, PUT, DELETE methods
  // GET requests typically don't need success toasts
  if (method === "post" || method === "put" || method === "delete") {
    toast.success(successMessage);
  }

  return successMessage;
}
