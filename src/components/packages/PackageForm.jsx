import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import CustomInput from "../common/CustomInput";
import CustomTextarea from "../common/CustomTextarea";
import { packageValidationSchema } from "../../utils/validationSchemas";

const PackageForm = ({ formData, onSubmit }) => {
  const formRef = useRef(null);

  const handleSubmit = (values, { setSubmitting }) => {
    // Convert features string to array
    const packageData = {
      ...values,
      features: values.features
        .split("\n")
        .filter((feature) => feature.trim())
        .map((feature) => feature.trim()),
    };

    onSubmit(packageData);
    setSubmitting(false);
  };

  // Expose submit method to parent
  React.useImperativeHandle(formRef, () => ({
    submit: () => {
      if (formRef.current) {
        formRef.current.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        );
      }
    },
  }));

  return (
    <Formik
      initialValues={formData}
      validationSchema={packageValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {() => (
        <Form ref={formRef} id="package-form" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Field name="name">
                {({ field, meta }) => (
                  <CustomInput
                    label="اسم الباقة"
                    name="name"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="أدخل اسم الباقة"
                    required
                    error={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Field name="price">
                  {({ field, meta }) => (
                    <CustomInput
                      label="السعر (جنيه مصري)"
                      name="price"
                      type="number"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="199.99"
                      step="0.01"
                      required
                      error={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </div>

              <div className="space-y-2">
                <Field name="durationDays">
                  {({ field, meta }) => (
                    <CustomInput
                      label="مدة الاشتراك (بالأيام)"
                      name="durationDays"
                      type="number"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="30"
                      required
                      error={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </div>
            </div>

            <div className="space-y-2">
              <Field name="features">
                {({ field, meta }) => (
                  <CustomTextarea
                    label="الميزات (كل ميزة في سطر منفصل)"
                    name="features"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="إضافة عدد غير محدود من المنتجات&#10;دعم فني 24/7&#10;إمكانية تعديل الواجهة"
                    rows={5}
                    required
                    className="resize-none"
                    error={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PackageForm;
