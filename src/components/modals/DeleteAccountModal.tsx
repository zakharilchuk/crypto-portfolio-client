import Modal from "react-modal";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: Props) {
  const [value, setValue] = useState("");

  const canSubmit = value === "DELETE";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white max-w-md mx-auto mt-40 p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black/50"
    >
      <h2 className="text-lg mb-3">
        Delete account
      </h2>

      <p className=" text-gray-400 mb-4">
        This action is <strong>irreversible</strong>. All your data will be
        permanently deleted.
      </p>

      <p className="text-sm mb-2">
        Type <strong>DELETE</strong> to confirm.
      </p>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-[#f2f2f2] px-3 py-2 focus:outline-none w-full"
        placeholder="DELETE"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2 text-sm border"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          disabled={!canSubmit || isLoading}
          className="px-4 py-2 text-sm bg-red-600 text-white disabled:opacity-50"
        >
          {isLoading ? "Deleting..." : "Delete account"}
        </button>
      </div>
    </Modal>
  );
}
