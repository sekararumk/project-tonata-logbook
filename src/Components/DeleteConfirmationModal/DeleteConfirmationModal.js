import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemId }) => {
  if (!isOpen) return null;

  return (
    <div
      data-dialog-backdrop="modal-sm"
      data-dialog-backdrop-close="true"
      className="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        data-dialog="modal-sm"
        className="relative m-4 p-4 w-1/3 rounded-lg bg-white shadow-sm pointer-events-auto"
      >
        <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
          Konfirmasi Hapus Data
        </div>
        <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
          Apakah Anda yakin ingin menghapus data ini? Aksi ini tidak dapat
          dibatalkan.
        </div>
        <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-500 hover:bg-gray-700 py-2 px-4 border border-transparent text-white text-center text-sm shadow-md"
            type="button"
          >
            Batal
          </button>
          <button
            onClick={() => onConfirm(itemId)}
            className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
