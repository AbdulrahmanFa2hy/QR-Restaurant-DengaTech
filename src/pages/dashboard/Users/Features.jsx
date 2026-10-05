import React from "react";
import CustomInput from "../../../components/common/CustomInput";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  EyeOff,
  Save,
  X,
  User,
  Mail,
  Phone,
  Shield,
  MoreVertical,
} from "lucide-react";
import CustomButton from "../../../components/common/CustomButton";
const Features = ({
  searchTerm,
  setSearchTerm,
  filterRole,
  setFilterRole,
  userRoles,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
  handleAddUser,
}) => {
  return (
    <div className="bg-white rounded-xl p-2 border border-thirdColor-200 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-end justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1">
            <CustomInput
              label="البحث"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="البحث بالاسم، الإيميل أو رقم الهاتف..."
              icon={Search}
            />
          </div>
          <div className="w-full sm:w-48">
            <label className="block text-sm font-medium text-thirdColor-800 mb-2">
              الدور
            </label>
            <select
              disabled
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-0 border border-thirdColor-200 rounded-lg focus:ring-2 focus:ring-firstColor-400 focus:border-transparent"
            >
              <option value="all">جميع الأدوار</option>
              {userRoles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-32">
            <label className="block text-sm font-medium text-thirdColor-800 mb-2">
              عدد العناصر
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full px-3 py-0 border border-thirdColor-200 rounded-lg focus:ring-2 focus:ring-firstColor-400 focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <CustomButton
          disabled
          onClick={handleAddUser}
          variant="primary"
          size="md"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة مستخدم</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default Features;
