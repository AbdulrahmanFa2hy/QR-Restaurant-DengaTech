import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomModal from "../common/CustomModal";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { categoryValidationSchema } from "../../utils/validationSchemas";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../store/slices/categorySlice";

const CategoryModals = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const { loading } = useSelector((state) => state.category);

  // Modal states
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  // Current items
  const [currentCategory, setCurrentCategory] = useState(null);

  // Category form handlers
  const handleCategorySubmit = async (values, { setSubmitting, resetForm }) => {
    await dispatch(
      createCategory({
        name: values.name,
        restaurant: restaurantId,
      })
    ).unwrap();

    resetForm();
    setIsAddCategoryModalOpen(false);
    setSubmitting(false);
  };

  // Edit category submit
  const handleEditCategorySubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    await dispatch(
      updateCategory({
        categoryId: currentCategory._id,
        name: values.name,
        restaurant: restaurantId,
      })
    ).unwrap();

    resetForm();
    setCurrentCategory(null);
    setIsEditCategoryModalOpen(false);
    setSubmitting(false);
  };

  // Delete category submit
  const handleDeleteCategorySubmit = async () => {
    await dispatch(deleteCategory(currentCategory._id)).unwrap();
    setCurrentCategory(null);
    setIsDeleteCategoryModalOpen(false);
  };

  // Handle edit category
  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditCategoryModalOpen(true);
  };

  // Handle delete category
  const handleDeleteCategory = (category) => {
    setCurrentCategory(category);
    setIsDeleteCategoryModalOpen(true);
  };
  return {
    // Modal states
    isAddCategoryModalOpen,
    setIsAddCategoryModalOpen,
    isEditCategoryModalOpen,
    setIsEditCategoryModalOpen,
    isDeleteCategoryModalOpen,
    setIsDeleteCategoryModalOpen,

    // Current items
    currentCategory,

    // Handlers
    handleCategorySubmit,
    handleEditCategorySubmit,
    handleDeleteCategorySubmit,
    handleEditCategory,
    handleDeleteCategory,

    // JSX
    modals: (
      <>
        {/* Add Category Modal */}
        <CustomModal
          isOpen={isAddCategoryModalOpen}
          onClose={() => setIsAddCategoryModalOpen(false)}
          title="إضافة فئة جديدة"
          maxWidth="max-w-md"
        >
          <Formik
            initialValues={{ name: "" }}
            validationSchema={categoryValidationSchema}
            onSubmit={handleCategorySubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field name="name">
                  {({ field, meta }) => (
                    <CustomInput
                      label="اسم الفئة"
                      {...field}
                      placeholder="أدخل اسم الفئة"
                      error={meta.touched && meta.error}
                      required
                    />
                  )}
                </Field>
                <div className="flex gap-3 pt-4">
                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={() => setIsAddCategoryModalOpen(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </CustomButton>
                  <CustomButton
                    type="submit"
                    loading={isSubmitting}
                    className="flex-1"
                  >
                    إضافة الفئة
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </CustomModal>

        {/* Edit Category Modal */}
        <CustomModal
          isOpen={isEditCategoryModalOpen}
          onClose={() => setIsEditCategoryModalOpen(false)}
          title="تعديل الفئة"
          maxWidth="max-w-md"
        >
          <Formik
            initialValues={{ name: currentCategory?.name || "" }}
            validationSchema={categoryValidationSchema}
            onSubmit={handleEditCategorySubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field name="name">
                  {({ field, meta }) => (
                    <CustomInput
                      label="اسم الفئة"
                      {...field}
                      placeholder="أدخل اسم الفئة"
                      error={meta.touched && meta.error}
                      required
                    />
                  )}
                </Field>
                <div className="flex gap-3 pt-4">
                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={() => setIsEditCategoryModalOpen(false)}
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

        {/* Delete Category Modal */}
        <CustomModal
          isOpen={isDeleteCategoryModalOpen}
          onClose={() => setIsDeleteCategoryModalOpen(false)}
          title="حذف الفئة"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-center text-lg">
              هل أنت متأكد من حذف الفئة "{currentCategory?.name}"؟
            </p>
            <p className="text-center text-sm text-red-600">
              سيتم حذف جميع الفئات الفرعية والمنتجات المرتبطة بها
            </p>
            <div className="flex gap-3 pt-4">
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => setIsDeleteCategoryModalOpen(false)}
                className="flex-1"
              >
                إلغاء
              </CustomButton>
              <CustomButton
                type="button"
                variant="danger"
                onClick={handleDeleteCategorySubmit}
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

export default CategoryModals;
