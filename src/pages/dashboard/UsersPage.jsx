import React, { useEffect, useMemo, useState } from "react";
import { Users, Edit, Trash2, User, Mail, Phone } from "lucide-react";
import CustomButton from "../../components/common/CustomButton";
import Pagination from "../../components/common/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers /* , createUser, updateUser, deleteUser */,
} from "../../store/slices/usersSlice";
import Features from "./Users/Features";
import AddUserModal from "./Users/AddUserModal";
import EditUserModal from "./Users/EditUserModal";
import DeleteUserModal from "./Users/DeleteUserModal";

const UsersPage = () => {
  // ===== UI State =====
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Redux
  const { data = [], loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // ===== Role options (ثابتة ومتّسقة) =====
  const userRoles = useMemo(
    () => [
      { value: "owner", label: "مالك مطعم" },
      { value: "moderator", label: "مشرف" },
    ],
    []
  );

  // ===== نموذج المودالات =====
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "owner",
    status: "active",
  });

  const resetForm = () =>
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "owner",
      status: "active",
    });

  // ===== Debounce للبحث =====
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // ===== Fetch من الباك-إند =====
  const fetchUsers = () => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      search: debouncedSearch || undefined,
      role: filterRole === "all" ? undefined : filterRole,
      // تقدر تضيف sortBy, sortOrder هنا لو محتاج
    };
    dispatch(getUsers(params));
  };

  // أول تحميل + عند تغيّر المدخلات (مع debounce للبحث)
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, debouncedSearch, filterRole]);

  // إعادة الصفحة للأولى عند تغيّر الفلاتر أو عدد العناصر
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filterRole, itemsPerPage]);

  // ===== Helpers =====
  const getRoleColor = (role) => {
    switch (role) {
      case "owner":
        return "bg-blue-100 text-blue-800";
      case "moderator":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ===== Modal open handlers =====
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "owner",
      status: user?.status || "active",
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // ===== Submit handlers (اربطهم بالـ APIs الفعلية عندك) =====
  const submitAddUser = async () => {
    // await dispatch(createUser(formData)).unwrap();
    setShowAddModal(false);
    fetchUsers();
  };

  const submitEditUser = async () => {
    // await dispatch(updateUser({ id: selectedUser._id, body: formData })).unwrap();
    setShowEditModal(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const confirmDeleteUser = async () => {
    // await dispatch(deleteUser(selectedUser._id)).unwrap();
    setShowDeleteModal(false);
    setSelectedUser(null);
    fetchUsers();
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 space-x-reverse mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-firstColor-600 to-secondColor-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
        </div>
        <p className="text-gray-600">إدارة المستخدمين والصلاحيات في النظام</p>
      </div>

      {/* Filters / Features */}
      <Features
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        userRoles={[{ value: "all", label: "جميع الأدوار" }, ...userRoles]}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
        handleAddUser={openAddModal}
      />

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المستخدم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإيميل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم الهاتف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الدور
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ الإنشاء
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-6 text-center text-gray-500"
                  >
                    جاري التحميل...
                  </td>
                </tr>
              )}

              {!loading && data?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      لا توجد نتائج
                    </h3>
                    <p className="text-gray-500">
                      لم يتم العثور على مستخدمين يطابقون معايير البحث
                    </p>
                  </td>
                </tr>
              )}

              {!loading &&
                data?.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-firstColor-600 to-secondColor-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || "غير متوفر"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 ml-2" />
                        <span className="text-sm text-gray-900">
                          {user.email || "غير متوفر"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 ml-2" />
                        <span className="text-sm text-gray-900">
                          {user.phone || "غير متوفر"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role || "غير متوفر"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.createdAt
                        ? String(user.createdAt).slice(0, 10)
                        : "غير متوفر"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <CustomButton
                          onClick={() => openEditModal(user)}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="w-4 h-4" />
                        </CustomButton>
                        <CustomButton
                          onClick={() => openDeleteModal(user)}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </CustomButton>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        loading={loading}
        userRoles={userRoles}
        initialValues={formData}
        onChange={setFormData}
        onSubmit={submitAddUser}
        disableRoleSelect={false}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        loading={loading}
        userRoles={userRoles}
        initialValues={formData}
        onChange={setFormData}
        onSubmit={submitEditUser}
        showStatus={true}
      />

      {/* Delete Confirmation Modal */}
      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        loading={loading}
        selectedName={selectedUser?.name}
        onConfirm={confirmDeleteUser}
      />
    </div>
  );
};

export default UsersPage;
