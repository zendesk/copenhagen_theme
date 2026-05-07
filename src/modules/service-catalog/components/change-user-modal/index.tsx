import type React from "react";
import { Close, Modal } from "@zendeskgarden/react-modals";
import { ChangeUserForm } from "./ChangeUserForm";
import { useTranslation } from "react-i18next";

interface ChangeUserModalProps {
  userId: string | null;
  onClose: () => void;
  onCreate: (userName: string, userId: string | null) => Promise<void> | void;
}

export const ChangeUserModal: React.FC<ChangeUserModalProps> = ({
  onClose,
  onCreate,
}) => {
  const { t } = useTranslation();

  const handleCreate = async (userName: string, userId: string | null) => {
    await onCreate(userName, userId);
  };

  return (
    <Modal onClose={onClose} focusOnMount={false}>
      <ChangeUserForm onCancel={onClose} onCreate={handleCreate} />
      <Close
        aria-label={t(
          "service-catalog.change-user-modal.close",
          "Close dialog"
        )}
      />
    </Modal>
  );
};
