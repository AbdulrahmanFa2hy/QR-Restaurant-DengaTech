import toast from "react-hot-toast";

/**
 * Centralized error handling function for API requests
 * Handles different error formats from backend and displays appropriate toast messages
 * @param {Object} error - The error object from axios
 * @returns {string} - The extracted error message
 */
export default function handleRequestError(error) {
  let errorMessage = "حدث خطأ غير متوقع";

  // Handle different error response structures
  if (error?.response?.data) {
    const errorData = error.response.data;

    // Handle different error data formats
    if (typeof errorData === "string") {
      errorMessage = errorData;
    } else if (Array.isArray(errorData)) {
      // Handle array of errors
      if (errorData.length > 0) {
        if (typeof errorData[0] === "string") {
          errorMessage = errorData[0];
        } else if (errorData[0]?.message) {
          errorMessage = errorData[0].message;
        } else if (errorData[0]?.error) {
          errorMessage = errorData[0].error;
        }
      }
    } else if (typeof errorData === "object") {
      // Handle object errors
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.errors) {
        // Handle validation errors object
        if (Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors[0] || errorMessage;
        } else if (typeof errorData.errors === "object") {
          // Get first error from validation object
          const firstError = Object.values(errorData.errors)[0];
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
          } else if (typeof firstError === "string") {
            errorMessage = firstError;
          }
        }
      } else if (errorData.details) {
        errorMessage = errorData.details;
      }
    }
  } else if (error?.response?.status) {
    // Handle HTTP status errors when no data is available
    const status = error.response.status;
    const statusMessages = {
      400: "طلب غير صحيح - يرجى التحقق من البيانات المرسلة",
      401: "غير مصرح - البريد الإلكتروني أو كلمة المرور غير صحيحة",
      403: "مرفوض - ليس لديك صلاحية للوصول",
      404: "الرابط غير موجود - يرجى التحقق من الرابط",
      409: "تعارض في البيانات - البيانات المرسلة موجودة مسبقاً",
      422: "بيانات غير صحيحة - يرجى التحقق من البيانات المرسلة",
      429: "تم تجاوز الحد المسموح - يرجى المحاولة لاحقاً",
      500: "خطأ في الخادم - يرجى المحاولة لاحقاً",
      502: "خطأ في الخادم - يرجى المحاولة لاحقاً",
      503: "الخدمة غير متاحة مؤقتاً - يرجى المحاولة لاحقاً",
    };

    errorMessage = statusMessages[status] || `خطأ في الخادم (${status})`;
  } else if (error?.message) {
    // Handle network errors or other issues
    if (error.message.includes("Network Error")) {
      errorMessage = "خطأ في الشبكة - يرجى التحقق من الاتصال بالإنترنت";
    } else if (error.message.includes("timeout")) {
      errorMessage = "انتهت مهلة الطلب - يرجى المحاولة مرة أخرى";
    } else {
      errorMessage = error.message;
    }
  }

  // Display error toast
  toast.error(errorMessage);

  return errorMessage;
}
