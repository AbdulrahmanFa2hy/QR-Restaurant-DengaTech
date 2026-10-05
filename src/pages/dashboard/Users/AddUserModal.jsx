import React from "react";
import { User, Mail, Phone, Save, X } from "lucide-react";

import CustomModal from "../../../components/common/CustomModal";
import CustomInput from "../../../components/common/CustomInput";
import CustomButton from "../../../components/common/CustomButton";

const AddUserModal = ({
  isOpen,
  onClose,
  loading = false,
  userRoles = [],
  initialValues,
  onChange,
  onSubmit,
  disableRoleSelect = true,
}) => {
  const values = initialValues || {
    name: "",
    email: "",
    phone: "",
    role: "employee",
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="إضافة مستخدم جديد">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit && onSubmit();
        }}
        className="space-y-4"
      >
        <CustomInput
          label="الاسم الكامل"
          type="text"
          value={values.name}
          onChange={(e) =>
            onChange && onChange({ ...values, name: e.target.value })
          }
          icon={User}
          required
        />
        <CustomInput
          label="البريد الإلكتروني"
          type="email"
          value={values.email}
          onChange={(e) =>
            onChange && onChange({ ...values, email: e.target.value })
          }
          icon={Mail}
          required
        />
        <CustomInput
          label="رقم الهاتف"
          type="tel"
          value={values.phone}
          onChange={(e) =>
            onChange && onChange({ ...values, phone: e.target.value })
          }
          icon={Phone}
          required
        />

        <div>
          <label className="block text-sm font-medium text-thirdColor-800 mb-2">
            الدور
          </label>
          <select
            disabled={disableRoleSelect}
            value={values.role}
            onChange={(e) =>
              onChange && onChange({ ...values, role: e.target.value })
            }
            className="w-full px-3 py-2 border border-thirdColor-200 rounded-lg focus:ring-2 focus:ring-firstColor-400 focus:border-transparent"
          >
            {userRoles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3 space-x-reverse mt-6">
          <CustomButton
            onClick={onClose}
            variant="ghost"
            size="md"
            type="button"
          >
            <X className="w-4 h-4" />
            <span>إلغاء</span>
          </CustomButton>
          <CustomButton
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            loadingText="جاري الحفظ..."
          >
            <Save className="w-4 h-4" />
            <span>حفظ</span>
          </CustomButton>
        </div>
      </form>
    </CustomModal>
  );
};

export default AddUserModal;
