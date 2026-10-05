import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../common/CustomModal";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { subcategoryValidationSchema } from "../../utils/validationSchemas";
import {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../../store/slices/subcategorySlice";

const SubcategoryModals = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);
  const { loading } = useSelector((state) => state.subcategory);
  // Modal states
  const [isAddSubcategoryModalOpen, setIsAddSubcategoryModalOpen] =
    useState(false);
  const [isEditSubcategoryModalOpen, setIsEditSubcategoryModalOpen] =
    useState(false);
  const [isDeleteSubcategoryModalOpen, setIsDeleteSubcategoryModalOpen] =
    useState(false);

  // Current items
  const [currentSubcategoryForEdit, setCurrentSubcategoryForEdit] =
    useState(null);
  const [autoSelectedCategoryId, setAutoSelectedCategoryId] = useState(null);

  // Subcategory form handlers
  const handleSubcategorySubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      const result = await dispatch(
        createSubcategory({
          name: values.name,
          category: autoSelectedCategoryId,
        })
      ).unwrap();

      console.log("Subcategory created successfully:", result);

      resetForm();
      setAutoSelectedCategoryId(null);
      setIsAddSubcategoryModalOpen(false);
      setSubmitting(false);
    } catch (error) {
      console.error("Error creating subcategory:", error);
      setSubmitting(false);
    }
  };

  // Edit subcategory submit
  const handleEditSubcategorySubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      const result = await dispatch(
        updateSubcategory({
          subcategoryId: currentSubcategoryForEdit._id,
          name: values.name,
          category: values.category,
        })
      ).unwrap();

      console.log("Subcategory updated successfully:", result);

      resetForm();
      setCurrentSubcategoryForEdit(null);
      setIsEditSubcategoryModalOpen(false);
      setSubmitting(false);
    } catch (error) {
      console.error("Error updating subcategory:", error);
      setSubmitting(false);
    }
  };

  // Delete subcategory submit
  const handleDeleteSubcategorySubmit = async () => {
    await dispatch(deleteSubcategory(currentSubcategoryForEdit._id)).unwrap();
    setCurrentSubcategoryForEdit(null);
    setIsDeleteSubcategoryModalOpen(false);
  };

  // Handle add subcategory with auto-category selection
  const handleAddSubcategory = (categoryId) => {
    setAutoSelectedCategoryId(categoryId);
    setIsAddSubcategoryModalOpen(true);
  };

  // Handle edit subcategory
  const handleEditSubcategory = (subcategory) => {
    setCurrentSubcategoryForEdit(subcategory);
    setIsEditSubcategoryModalOpen(true);
  };

  // Handle delete subcategory
  const handleDeleteSubcategory = (subcategory) => {
    setCurrentSubcategoryForEdit(subcategory);
    setIsDeleteSubcategoryModalOpen(true);
  };
  return {
    // Modal states
    isAddSubcategoryModalOpen,
    setIsAddSubcategoryModalOpen,
    isEditSubcategoryModalOpen,
    setIsEditSubcategoryModalOpen,
    isDeleteSubcategoryModalOpen,
    setIsDeleteSubcategoryModalOpen,

    // Current items
    currentSubcategoryForEdit,

    // Handlers
    handleSubcategorySubmit,
    handleEditSubcategorySubmit,
    handleDeleteSubcategorySubmit,
    handleAddSubcategory,
    handleEditSubcategory,
    handleDeleteSubcategory,

    // JSX
    modals: (
      <>
        {/* Add Subcategory Modal */}
        <CustomModal
          isOpen={isAddSubcategoryModalOpen}
          onClose={() => setIsAddSubcategoryModalOpen(false)}
          title="إضافة فئة فرعية جديدة"
          maxWidth="max-w-md"
        >
          <Formik
            initialValues={{ name: "" }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required("اسم الفئة الفرعية مطلوب")
                .min(2, "يجب أن يكون الاسم على الأقل حرفين"),
            })}
            onSubmit={handleSubcategorySubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field name="name">
                  {({ field, meta }) => (
                    <CustomInput
                      label="اسم الفئة الفرعية"
                      {...field}
                      placeholder="أدخل اسم الفئة الفرعية"
                      error={meta.touched && meta.error}
                      required
                    />
                  )}
                </Field>
                <div className="flex gap-3 pt-4">
                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={() => setIsAddSubcategoryModalOpen(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </CustomButton>
                  <CustomButton
                    type="submit"
                    loading={isSubmitting}
                    className="flex-1"
                  >
                    إضافة الفئة الفرعية
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </CustomModal>

        {/* Edit Subcategory Modal */}
        <CustomModal
          isOpen={isEditSubcategoryModalOpen}
          onClose={() => setIsEditSubcategoryModalOpen(false)}
          title="تعديل الفئة الفرعية"
          maxWidth="max-w-md"
        >
          <Formik
            initialValues={{
              name: currentSubcategoryForEdit?.name || "",
              category: currentSubcategoryForEdit?.category?._id || "",
            }}
            validationSchema={subcategoryValidationSchema}
            onSubmit={handleEditSubcategorySubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field name="name">
                  {({ field, meta }) => (
                    <CustomInput
                      label="اسم الفئة الفرعية"
                      {...field}
                      placeholder="أدخل اسم الفئة الفرعية"
                      error={meta.touched && meta.error}
                      required
                    />
                  )}
                </Field>
                <Field name="category">
                  {({ field, meta }) => (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-thirdColor-800">
                        الفئة الرئيسية
                      </label>
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-thirdColor-200 rounded-lg focus:ring-2 focus:ring-firstColor-600 focus:border-transparent"
                        required
                      >
                        <option value="">اختر الفئة الرئيسية</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {meta.touched && meta.error && (
                        <p className="text-red-500 text-sm mt-1">
                          {meta.error}
                        </p>
                      )}
                    </div>
                  )}
                </Field>
                <div className="flex gap-3 pt-4">
                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={() => setIsEditSubcategoryModalOpen(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </CustomButton>
                  <CustomButton
                    type="submit"
                    loading={isSubmitting}
                    className="flex-1"
                  >
                    حفظ التعديلات
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </CustomModal>

        {/* Delete Subcategory Modal */}
        <CustomModal
          isOpen={isDeleteSubcategoryModalOpen}
          onClose={() => setIsDeleteSubcategoryModalOpen(false)}
          title="حذف الفئة الفرعية"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-center text-lg">
              هل أنت متأكد من حذف الفئة الفرعية "
              {currentSubcategoryForEdit?.name}
              "؟
            </p>
            <p className="text-center text-sm text-red-600">
              سيتم حذف جميع المنتجات المرتبطة بها
            </p>
            <div className="flex gap-3 pt-4">
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => setIsDeleteSubcategoryModalOpen(false)}
                className="flex-1"
              >
                إلغاء
              </CustomButton>
              <CustomButton
                type="button"
                variant="danger"
                onClick={handleDeleteSubcategorySubmit}
                loading={loading}
                className="flex-1"
              >
                حذف
              </CustomButton>
            </div>
          </div>
        </CustomModal>
      </>
    ),
  };
};

export default SubcategoryModals;
