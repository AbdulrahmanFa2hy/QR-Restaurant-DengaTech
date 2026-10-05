import React from "react";
import CustomModal from "../common/CustomModal";
import CustomButton from "../common/CustomButton";
import PackageForm from "./PackageForm";

const PackageModals = ({
  // Add Modal
  isAddModalOpen,
  setIsAddModalOpen,
  // Edit Modal
  isEditModalOpen,
  setIsEditModalOpen,
  // Delete Modal
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  // Form data
  formData,
  // Actions
  handleAddPackage,
  handleEditPackage,
  handleDeletePackage,
  resetForm,
  // State
  loading,
  selectedPackage,
  setSelectedPackage,
}) => {
  // Enhanced add package handler
  const handleAddPackageWithErrorHandling = async (packageData) => {
    const result = await handleAddPackage(packageData);
    // Success and error handling is now centralized in configAPI.js
  };

  // Enhanced edit package handler
  const handleEditPackageWithErrorHandling = async (packageData) => {
    const result = await handleEditPackage(packageData);
    // Success and error handling is now centralized in configAPI.js
  };

  // Enhanced delete package handler
  const handleDeletePackageWithErrorHandling = async () => {
    const result = await handleDeletePackage();
    // Success and error handling is now centralized in configAPI.js
  };
  return (
    <>
      {/* Add Package Modal */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="إضافة باقة جديدة"
        className=""
      >
        <div className="space-y-6 p-6">
          <PackageForm
            formData={formData}
            onSubmit={handleAddPackageWithErrorHandling}
          />

          <div className="flex gap-3 pt-6 border-t border-thirdColor-200">
            <CustomButton
              type="submit"
              form="package-form"
              variant="primary"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الإضافة...
                </div>
              ) : (
                "إضافة الباقة"
              )}
            </CustomButton>
            <CustomButton
              onClick={() => {
                setIsAddModalOpen(false);
                resetForm();
              }}
              variant="ghost"
              className="flex-1"
            >
              إلغاء
            </CustomButton>
          </div>
        </div>
      </CustomModal>

      {/* Edit Package Modal */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPackage(null);
          resetForm();
        }}
        title="تعديل الباقة"
        className=""
      >
        <div className="space-y-6 p-6">
          <PackageForm
            formData={formData}
            onSubmit={handleEditPackageWithErrorHandling}
          />

          <div className="flex gap-3 pt-6 border-t border-thirdColor-200">
            <CustomButton
              type="submit"
              form="package-form"
              variant="primary"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري التحديث...
                </div>
              ) : (
                "تحديث الباقة"
              )}
            </CustomButton>
            <CustomButton
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedPackage(null);
                resetForm();
              }}
              variant="ghost"
              className="flex-1"
            >
              إلغاء
            </CustomButton>
          </div>
        </div>
      </CustomModal>

      {/* Delete Package Modal */}
      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPackage(null);
        }}
        title="تأكيد الحذف"
        className=""
      >
        <div className="space-y-6 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-thirdColor-800 mb-2">
              حذف الباقة
            </h3>

            <p className="text-thirdColor-600 mb-2">
              هل أنت متأكد من حذف الباقة "{selectedPackage?.name}"؟
            </p>

            <p className="text-sm text-red-600">
              لا يمكن التراجع عن هذا الإجراء.
            </p>
          </div>

          <div className="flex gap-3 pt-6 border-t border-thirdColor-200">
            <CustomButton
              onClick={handleDeletePackageWithErrorHandling}
              disabled={loading}
              variant="danger"
              className="flex-1"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الحذف...
                </div>
              ) : (
                "حذف الباقة"
              )}
            </CustomButton>
            <CustomButton
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedPackage(null);
              }}
              variant="ghost"
              className="flex-1"
            >
              إلغاء
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default PackageModals;
