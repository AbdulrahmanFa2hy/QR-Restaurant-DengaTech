import * as Yup from "yup";

// Package Form Validation Schema
export const packageValidationSchema = Yup.object({
  name: Yup.string()
    .required("⚠️ اسم الباقة مطلوب")
    .min(3, "⚠️ يجب أن يكون اسم الباقة 3 أحرف على الأقل")
    .max(50, "⚠️ يجب أن يكون اسم الباقة أقل من 50 حرف"),
  price: Yup.number()
    .required("⚠️ السعر مطلوب")
    .min(0.01, "⚠️ يجب أن يكون السعر أكبر من 0")
    .max(999999, "⚠️ السعر كبير جداً"),
  durationDays: Yup.number()
    .required("⚠️ مدة الاشتراك مطلوبة")
    .min(1, "⚠️ يجب أن تكون المدة يوم واحد على الأقل")
    .max(3650, "⚠️ المدة طويلة جداً"),
  features: Yup.string()
    .required("⚠️ الميزات مطلوبة")
    .min(10, "⚠️ يجب كتابة ميزة واحدة على الأقل"),
});

// Restaurant and Owner Form Validation Schema
export const restaurantAndOwnerValidationSchema = Yup.object({
  userData: Yup.object({
    name: Yup.string()
      .min(3, "يجب أن يكون الاسم أكثر من 3 أحرف")
      .max(50, "يجب أن يكون الاسم أقل من 50 حرف")
      .required("اسم المالك مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
    phone: Yup.string()
      .matches(/^(010|011|012|015)[0-9]{8}$/, "رقم الهاتف غير صحيح")
      .required("رقم الهاتف مطلوب"),
  }),
  restaurantData: Yup.object({
    name: Yup.string()
      .min(2, "يجب أن يكون اسم المطعم أكثر من حرفين")
      .max(100, "يجب أن يكون اسم المطعم أقل من 100 حرف")
      .required("اسم المطعم مطلوب"),
    address: Yup.string()
      .min(5, "يجب أن يكون العنوان أكثر من 5 أحرف")
      .max(200, "يجب أن يكون العنوان أقل من 200 حرف")
      .required("عنوان المطعم مطلوب"),
    phone: Yup.string()
      .matches(/^(010|011|012|015)[0-9]{8}$/, "رقم الهاتف غير صحيح")
      .required("رقم هاتف المطعم مطلوب"),
    description: Yup.string().max(500, "يجب أن يكون الوصف أقل من 500 حرف"),
    type: Yup.string()
      .oneOf(
        [
          "cafe",
          "sweets",
          "grill",
          "seafood",
          "fastfood",
          "italian",
          "bakery",
          "homemade",
        ],
        "نوع المطعم غير صحيح"
      )
      .required("نوع المطعم مطلوب"),
  }),
});

// Common validation patterns that can be reused
export const commonValidations = {
  // Phone number validation (Egyptian mobile numbers)
  phone: Yup.string()
    .matches(
      /^(010|011|012|015)[0-9]{8}$/,
      "رقم الهاتف يجب أن يبدأ بـ (010، 011، 012، أو 015) ويحتوي على 11 رقم"
    )
    .required("رقم الهاتف مطلوب"),

  // Email validation
  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),

  // Password validation
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),

  // Name validation (2-50 characters)
  name: (fieldName = "الاسم") =>
    Yup.string()
      .min(2, `يجب أن يكون ${fieldName} أكثر من حرفين`)
      .max(50, `يجب أن يكون ${fieldName} أقل من 50 حرف`)
      .required(`${fieldName} مطلوب`),

  // Required string validation
  requiredString: (fieldName = "الحقل") =>
    Yup.string().required(`${fieldName} مطلوب`),

  // Number validation
  positiveNumber: (fieldName = "الرقم") =>
    Yup.number()
      .positive(`${fieldName} يجب أن يكون موجب`)
      .required(`${fieldName} مطلوب`),
};

// Menu Management Validation Schemas
export const categoryValidationSchema = Yup.object({
  name: Yup.string()
    .required("اسم الفئة مطلوب")
    .min(2, "يجب أن يكون الاسم على الأقل حرفين")
    .max(50, "يجب أن يكون الاسم أقل من 50 حرف"),
});

export const subcategoryValidationSchema = Yup.object({
  name: Yup.string()
    .required("اسم الفئة الفرعية مطلوب")
    .min(2, "يجب أن يكون الاسم على الأقل حرفين")
    .max(50, "يجب أن يكون الاسم أقل من 50 حرف"),
  category: Yup.string().required("الفئة مطلوبة"),
});

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .required("اسم المنتج مطلوب")
    .min(2, "يجب أن يكون الاسم على الأقل حرفين")
    .max(100, "يجب أن يكون الاسم أقل من 100 حرف"),
  price: Yup.number()
    .required("السعر مطلوب")
    .min(0.01, "السعر يجب أن يكون أكبر من 0")
    .max(999999, "السعر كبير جداً"),
  ingredients: Yup.string(),
});
