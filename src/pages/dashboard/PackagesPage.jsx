import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPackages,
  deletePackage,
  addPackage,
  updatePackage,
  clearPackageError,
} from "../../store/slices/packageSlice";
import PackageHeader from "../../components/packages/PackageHeader";
import EmptyPackageState from "../../components/packages/EmptyPackageState";
import PackageModals from "../../components/packages/PackageModals";
import PackageCard from "../../components/packages/PackageCard";

const PackagesPage = () => {
  const dispatch = useDispatch();
  const {
    data: packages,
    loading,
    error,
  } = useSelector((state) => state.package);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    durationDays: "",
    features: "",
  });

  useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearPackageError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleAddPackage = async (packageData) => {
    const result = await dispatch(addPackage(packageData));
    if (result.type.endsWith("fulfilled")) {
      setIsAddModalOpen(false);
      resetForm();
      return result;
    } else {
      throw new Error(result.payload || "فشل في إضافة الباقة");
    }
  };

  const handleEditPackage = async (packageData) => {
    const result = await dispatch(
      updatePackage({
        packageId: selectedPackage._id,
        packageData,
      })
    );
    if (result.type.endsWith("fulfilled")) {
      setIsEditModalOpen(false);
      setSelectedPackage(null);
      resetForm();
      return result;
    } else {
      throw new Error(result.payload || "فشل في تحديث الباقة");
    }
  };

  const handleDeletePackage = async () => {
    const result = await dispatch(deletePackage(selectedPackage._id));
    if (result.type.endsWith("fulfilled")) {
      setIsDeleteModalOpen(false);
      setSelectedPackage(null);
      return result;
    } else {
      throw new Error(result.payload || "فشل في حذف الباقة");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      durationDays: "",
      features: "",
    });
  };

  const openEditModal = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({
      name: pkg.name,
      price: pkg.price.toString(),
      durationDays: pkg.durationDays.toString(),
      features: pkg.features.join("\n"),
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-3 sm:p-4">
      {/* Header */}
      <div className="mb-6 sm:mb-8 mt-4 sm:mt-0">
        <PackageHeader onAddPackage={() => setIsAddModalOpen(true)} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Packages Grid */}
      {!loading && packages.length > 0 && (
        <div className="flex flex-wrap justify-center gap-8 mb-6 sm:mb-8">
          {packages.map((pkg, index) => (
            <div key={pkg._id}>
              <PackageCard
                pkg={pkg}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                isPopular={index === 1} // Make the second card (index 1) popular
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && packages.length === 0 && (
        <EmptyPackageState onAddPackage={() => setIsAddModalOpen(true)} />
      )}

      {/* Modals */}
      <PackageModals
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        formData={formData}
        handleAddPackage={handleAddPackage}
        handleEditPackage={handleEditPackage}
        handleDeletePackage={handleDeletePackage}
        resetForm={resetForm}
        loading={loading}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
      />
    </div>
  );
};

export default PackagesPage;
