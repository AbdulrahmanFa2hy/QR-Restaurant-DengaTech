import React, { useEffect } from "react";
import {
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  Lock,
  FileText,
  Tag,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import {
  createRestaurantAndOwner,
  clearRestaurantOwnerError,
  resetSuccess,
} from "../../store/slices/RestaurantAndOwnerSlice";
import { restaurantAndOwnerValidationSchema } from "../../utils/validationSchemas";
import { getOurRestaurantsData } from "../../store/slices/restaurantSlice";
import CustomInput from "../common/CustomInput";
import CustomTextarea from "../common/CustomTextarea";
import CustomSelect from "../common/CustomSelect";
import CustomModal from "../common/CustomModal";
import CustomButton from "../common/CustomButton";

const AddRestaurantAndOwner = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.restaurantAndOwner);

  const initialValues = {
    userData: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    restaurantData: {
      name: "",
      address: "",
      phone: "",
      description: "",
      type: "fastfood",
      package: {
        packageId: "68c0588988d6b9892076e3f5",
      },
    },
  };

  useEffect(() => {
    if (error) {
      // Error handling is now centralized in configAPI.js
      // Just clear the error from state
      dispatch(clearRestaurantOwnerError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const result = await dispatch(createRestaurantAndOwner(values));

    if (
      result.type === "restaurantAndOwner/createRestaurantAndOwner/fulfilled"
    ) {
      // Refresh the restaurant list
      dispatch(getOurRestaurantsData());
      onClose();
      resetForm();
    }
    // Error will be handled by centralized error handler
    setSubmitting(false);
  };

  const handleClose = () => {
    dispatch(clearRestaurantOwnerError());
    dispatch(resetSuccess());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="إضافة مطعم وصاحبه"
      maxWidth="max-w-4xl"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={restaurantAndOwnerValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-8">
            {/* User Data Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-firstColor-600" />
                <h3 className="text-lg font-medium text-thirdColor-800">
                  بيانات المالك
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field name="userData.name">
                  {({ field }) => (
                    <CustomInput
                      {...field}
                      type="text"
                      placeholder="اسم المالك"
                      required
                      icon={User}
                      error={touched.userData?.name && errors.userData?.name}
                    />
                  )}
                </Field>

                <Field name="userData.email">
                  {({ field }) => (
                    <CustomInput
                      {...field}
                      type="email"
                      placeholder="البريد الإلكتروني"
                      required
                      icon={Mail}
                      error={touched.userData?.email && errors.userData?.email}
                    />
                  )}
                </Field>

                <Field name="userData.password">
                  {({ field }) => (
                    <CustomInput
                      {...field}
                      type="password"
                      placeholder="كلمة المرور"
                      required
                      icon={Lock}
                      error={
                        touched.userData?.password && errors.userData?.password
                      }
                    />
                  )}
                </Field>

                <Field name="userData.phone">
                  {({ field }) => (
                    <CustomInput
                      {...field}
                      type="tel"
                      placeholder="رقم هاتف المالك (11 رقم)"
                      required
                      icon={Phone}
                      error={touched.userData?.phone && errors.userData?.phone}
                    />
                  )}
                </Field>
              </div>
            </div>

            {/* Restaurant Data Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-5 h-5 text-firstColor-600" />
                <h3 className="text-lg font-medium text-thirdColor-800">
                  بيانات المطعم
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field name="restaurantData.name">
                  {({ field }) => (
                    <CustomInput
                      {...field}
                      type="text"
                      placeholder="اسم المطعم"
                      required
                      icon={Building2}
                      error={
                        touched.restaurantData?.name &&
                        errors.restaurantData?.name
                      }
                    />
                  )}
                </Field>

                <Field name="restaurantData.address">
                  {({ field }) => (
                    <CustomInput
                      {...field}
                      type="text"
                      placeholder="العنوان"
                      required
                      icon={MapPin}
                      error={
                        touched.restaurantData?.address &&
                        errors.restaurantData?.address
                      }
                    />
                  )}
                </Field>

                <Field name="restaurantData.phone">
                  {({ field }) => (
                    <CustomInput
                      {...field}
                      type="tel"
                      placeholder="رقم هاتف المطعم (11 رقم)"
                      required
                      icon={Phone}
                      error={
                        touched.restaurantData?.phone &&
                        errors.restaurantData?.phone
                      }
                    />
                  )}
                </Field>

                <Field name="restaurantData.type">
                  {({ field }) => (
                    <CustomSelect
                      {...field}
                      placeholder="نوع المطعم"
                      options={[
                        { value: "cafe", label: "مقهى" },
                        { value: "sweets", label: "حلويات" },
                        { value: "grill", label: "مشاوي" },
                        { value: "seafood", label: "مأكولات بحرية" },
                        { value: "fastfood", label: "وجبات سريعة" },
                        { value: "italian", label: "إيطالي" },
                        { value: "bakery", label: "مخبز" },
                        { value: "homemade", label: "أكل بيتي" },
                      ]}
                      icon={Tag}
                      error={
                        touched.restaurantData?.type &&
                        errors.restaurantData?.type
                      }
                    />
                  )}
                </Field>
              </div>

              <Field name="restaurantData.description">
                {({ field }) => (
                  <CustomTextarea
                    {...field}
                    placeholder="وصف المطعم"
                    rows={3}
                    icon={FileText}
                    error={
                      touched.restaurantData?.description &&
                      errors.restaurantData?.description
                    }
                  />
                )}
              </Field>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-thirdColor-200">
              <CustomButton
                type="button"
                onClick={handleClose}
                variant="ghost"
                size="sm"
              >
                إلغاء
              </CustomButton>
              <CustomButton
                type="submit"
                disabled={isSubmitting || loading}
                loading={isSubmitting || loading}
                loadingText="جاري الإنشاء..."
                size="sm"
              >
                إنشاء المطعم وصاحبه
              </CustomButton>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddRestaurantAndOwner;
