import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../common/CustomModal";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import CustomTextarea from "../common/CustomTextarea";
import { productValidationSchema } from "../../utils/validationSchemas";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../store/slices/productSlice";

const ProductModals = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

  // Modal states
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] =
    useState(false);

  // Current items
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Handle product click
  const handleProductClick = (product) => {
    setCurrentProduct(product);
    setIsProductDetailsModalOpen(true);
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditProductModalOpen(true);
  };

  // Handle delete product
  const handleDeleteProduct = (product) => {
    setCurrentProduct(product);
    setIsDeleteProductModalOpen(true);
  };

  // Edit product submit
  const handleEditProductSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    const productData = {
      ...values,
      ingredients: values.ingredients
        ? values.ingredients
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item)
        : [],
    };

    await dispatch(
      updateProduct({
        productId: currentProduct._id,
        name: productData.name,
        price: productData.price,
        subCategory: currentProduct.subCategory._id,
        ingredients: productData.ingredients,
      })
    ).unwrap();

    resetForm();
    setCurrentProduct(null);
    setIsEditProductModalOpen(false);
    setSubmitting(false);
  };

  // Delete product submit
  const handleDeleteProductSubmit = async () => {
    await dispatch(deleteProduct(currentProduct._id)).unwrap();
    setCurrentProduct(null);
    setIsDeleteProductModalOpen(false);
  };

  // Product form handlers
  const handleProductSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!selectedSubcategory) {
      return;
    }

    const productData = {
      ...values,
      ingredients: values.ingredients
        ? values.ingredients
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item)
        : [],
    };

    await dispatch(
      createProduct({
        name: productData.name,
        price: productData.price,
        subCategory: selectedSubcategory._id,
        ingredients: productData.ingredients,
      })
    ).unwrap();

    resetForm();
    setIsAddProductModalOpen(false);
    setSubmitting(false);
  };
  return {
    // Modal states
    isAddProductModalOpen,
    setIsAddProductModalOpen,
    isEditProductModalOpen,
    setIsEditProductModalOpen,
    isDeleteProductModalOpen,
    setIsDeleteProductModalOpen,
    isProductDetailsModalOpen,
    setIsProductDetailsModalOpen,

    // Current items
    currentProduct,
    selectedSubcategory,
    setSelectedSubcategory,

    // Handlers
    handleProductSubmit,
    handleEditProductSubmit,
    handleDeleteProductSubmit,
    handleEditProduct,
    handleDeleteProduct,
    handleProductClick,

    // JSX
    modals: (
      <>
        {/* Add Product Modal */}
        <CustomModal
          isOpen={isAddProductModalOpen}
          onClose={() => setIsAddProductModalOpen(false)}
          title="إضافة منتج جديد"
          maxWidth="max-w-md"
        >
          <Formik
            initialValues={{ name: "", price: "", ingredients: "" }}
            validationSchema={productValidationSchema}
            onSubmit={handleProductSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field name="name">
                  {({ field, meta }) => (
                    <CustomInput
                      label="اسم المنتج"
                      {...field}
                      placeholder="أدخل اسم المنتج"
                      error={meta.touched && meta.error}
                      required
                    />
                  )}
                </Field>
                <Field name="price">
                  {({ field, meta }) => (
                    <CustomInput
                      label="السعر"
                      type="number"
                      {...field}
                      placeholder="أدخل السعر"
                      error={meta.touched && meta.error}
                      required
                    />
                  )}
                </Field>
                <Field name="ingredients">
                  {({ field, meta }) => (
                    <CustomTextarea
                      label="المكونات (اختياري)"
                      {...field}
                      placeholder="أدخل المكونات مفصولة بفواصل"
                      rows={3}
                      error={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <div className="flex gap-3 pt-4">
                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={() => setIsAddProductModalOpen(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </CustomButton>
                  <CustomButton
                    type="submit"
                    loading={isSubmitting}
                    className="flex-1"
                  >
                    إضافة المنتج
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </CustomModal>

        {/* Product Details Modal */}
        <CustomModal
          isOpen={isProductDetailsModalOpen}
          onClose={() => setIsProductDetailsModalOpen(false)}
          title="تفاصيل المنتج"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2 text-firstColor-800">
                {currentProduct?.name}
              </h3>
              <p className="text-2xl font-bold mb-4 text-firstColor-600">
                {currentProduct?.price} ج.م
              </p>
              {currentProduct?.ingredients &&
                currentProduct.ingredients.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">المكونات:</h4>
                    <p className="text-sm leading-relaxed">
                      {currentProduct.ingredients.join(", ")}
                    </p>
                  </div>
                )}
            </div>
            <div className="flex gap-3 pt-4">
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => setIsProductDetailsModalOpen(false)}
                className="flex-1"
              >
                إغلاق
              </CustomButton>
              <CustomButton
                type="button"
                onClick={() => {
                  setIsProductDetailsModalOpen(false);
                  handleEditProduct(currentProduct);
                }}
                className="flex-1"
              >
                تعديل
              </CustomButton>
              <CustomButton
                type="button"
                variant="danger"
                onClick={() => {
                  setIsProductDetailsModalOpen(false);
                  handleDeleteProduct(currentProduct);
                }}
                className="flex-1"
              >
                حذف
              </CustomButton>
            </div>
          </div>
        </CustomModal>

        {/* Edit Product Modal */}
        <CustomModal
          isOpen={isEditProductModalOpen}
          onClose={() => setIsEditProductModalOpen(false)}
          title="تعديل المنتج"
          maxWidth="max-w-md"
        >
          <Formik
            initialValues={{
              name: currentProduct?.name || "",
              price: currentProduct?.price || "",
              ingredients: currentProduct?.ingredients?.join(", ") || "",
            }}
            validationSchema={productValidationSchema}
            onSubmit={handleEditProductSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field name="name">
                  {({ field, meta }) => (
                    <CustomInput
                      label="اسم المنتج"
                      {...field}
                      placeholder="أدخل اسم المنتج"
                      error={meta.touched && meta.error}
                      required
                    />
                  )}
                </Field>
                <Field name="price">
                  {({ field, meta }) => (
                    <CustomInput
                      label="السعر"
                      type="number"
                      {...field}
                      placeholder="أدخل السعر"
                      error={meta.touched && meta.error}
                      required
                    />
                  )}
                </Field>
                <Field name="ingredients">
                  {({ field, meta }) => (
                    <CustomTextarea
                      label="المكونات (اختياري)"
                      {...field}
                      placeholder="أدخل المكونات مفصولة بفواصل"
                      rows={3}
                      error={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <div className="flex gap-3 pt-4">
                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={() => setIsEditProductModalOpen(false)}
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

        {/* Delete Product Modal */}
        <CustomModal
          isOpen={isDeleteProductModalOpen}
          onClose={() => setIsDeleteProductModalOpen(false)}
          title="حذف المنتج"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-center text-lg">
              هل أنت متأكد من حذف المنتج "{currentProduct?.name}"؟
            </p>
            <div className="flex gap-3 pt-2 sm:pt-4">
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => setIsDeleteProductModalOpen(false)}
                className="flex-1"
              >
                إلغاء
              </CustomButton>
              <CustomButton
                type="button"
                variant="danger"
                onClick={handleDeleteProductSubmit}
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

export default ProductModals;
