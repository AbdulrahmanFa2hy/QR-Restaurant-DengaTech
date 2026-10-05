import React from "react";
import { Trash2, X } from "lucide-react";
import CustomModal from "../../../components/common/CustomModal";
import CustomInput from "../../../components/common/CustomInput";
import CustomButton from "../../../components/common/CustomButton";

const DeleteUserModal = ({
  isOpen,
  onClose,
  loading = false,
  selectedName,
  onConfirm,
  title = "تأكيد الحذف",
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-thirdColor-800 mb-2">
          هل أنت متأكد من الحذف؟
        </h3>
        <p className="text-thirdColor-600 mb-6">
          سيتم حذف المستخدم <strong>{selectedName || "—"}</strong> نهائياً ولا
          يمكن التراجع عن هذا الإجراء.
        </p>
      </div>

      <div className="flex justify-end space-x-3 space-x-reverse">
        <CustomButton onClick={onClose} variant="ghost" size="md" type="button">
          <X className="w-4 h-4" />
          <span>إلغاء</span>
        </CustomButton>
        <CustomButton
          onClick={() => onConfirm && onConfirm()}
          variant="danger"
          size="md"
          loading={loading}
          loadingText="جاري الحذف..."
          type="button"
        >
          <Trash2 className="w-4 h-4" />
          <span>حذف</span>
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default DeleteUserModal;
