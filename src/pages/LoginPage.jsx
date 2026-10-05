import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/common/CustomInput";
import { Mail, Lock } from "lucide-react";

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: user,
    loading,
    error,
    token,
  } = useSelector((state) => state.auth);

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (token && user && user._id) {
      console.log(user?.organization?.id);
      navigate(
        `/dashboard/${user.role == "owner" ? user?.organization?.id : user._id}`
      );
    }
  }, [token, user?._id, navigate, user]);

  useEffect(() => {
    return () => {
      if (error) dispatch(clearError());
    };
  }, [dispatch, error]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await dispatch(loginUser(values)).unwrap();

      navigate(
        `/dashboard/${
          data.user.role == "owner" ? data.user?.organization?.id : data.user._id
        }`
      );
    } catch {
      // Error toast is handled centrally
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (error) {
      // Error handling is now centralized in configAPI.js
      // No need to show toast here as it will be handled automatically
      // Just clear the error from state
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-fourthColor-900 via-firstColor-800 to-secondColor-800 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-orange-600/30"></div>

      {/* floating accents */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-firstColor-400 to-secondColor-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-80 h-80 bg-gradient-to-br from-secondColor-400 to-fifthColor-400 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-6 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-white">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-firstColor-200 to-secondColor-300 bg-clip-text text-transparent leading-tight">
                أهلاً بعودتك
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-firstColor-400 to-secondColor-500 rounded-full"></div>
            </div>
            <p className="text-lg lg:text-xl text-firstColor-100 max-w-lg">
              سجل الدخول لإدارة قائمة مطعمك ولوحة التحكم.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-thirdColor-200">
              <h2 className="text-2xl font-bold mb-6 text-center text-thirdColor-800">
                تسجيل الدخول
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="space-y-5">
                    <Field name="email">
                      {({ field }) => (
                        <CustomInput
                          {...field}
                          label="البريد الإلكتروني"
                          type="email"
                          placeholder="user@gmail.com"
                          required
                          icon={Mail}
                          className="ltr"
                          error={touched.email && errors.email}
                        />
                      )}
                    </Field>

                    <Field name="password">
                      {({ field }) => (
                        <CustomInput
                          {...field}
                          label="كلمة المرور"
                          type="password"
                          placeholder="123456"
                          required
                          icon={Lock}
                          className="ltr"
                          error={touched.password && errors.password}
                        />
                      )}
                    </Field>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-firstColor-400 to-secondColor-500 text-white py-3 rounded-xl hover:opacity-95 transition font-medium shadow-md"
                      disabled={isSubmitting || loading}
                    >
                      {isSubmitting || loading
                        ? "جاري تسجيل الدخول..."
                        : "تسجيل الدخول"}
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Demo accounts hint */}
              <div className="mt-6 p-4 rounded-xl bg-firstColor-100/60 border border-thirdColor-200 text-sm text-thirdColor-800 space-y-1">
                <p className="font-bold mb-1">حسابات تجريبية (Demo)</p>
                <p>
                  صاحب مطعم: <span className="font-mono ltr">owner@demo.com</span>
                </p>
                <p>
                  مشرف: <span className="font-mono ltr">admin@demo.com</span>
                </p>
                <p>
                  كلمة المرور: <span className="font-mono">123456</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
