import React, { useState, useEffect } from "react";

const CardEditData = ({ isOpen, onClose, dataToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    id: null,
    date: "",
    nama: "",
    judul: "",
    keterangan: "",
  });

  // Efek untuk mengisi form ketika dataToEdit berubah
  useEffect(() => {
    if (dataToEdit) {
      setFormData(dataToEdit);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Panggil fungsi onSave dari parent dengan data terbaru
    onClose(); // Tutup modal setelah menyimpan
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <h3 className="text-xl font-bold mb-4 text-center">
          Edit Data
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="col-span-2 sm:col-span-1 mb-4">
            {/* FIELD NAMA AUTO TERISI KARNA SUDAH LOGIN */}
            <label
              for="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama
            </label>
            <select
              id="category"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option selected="">Pilih Nama</option>
              <option value="ALFI">Andi Muyassar Alfideri Hatta</option>
              <option value="ANDIKA">Andika Falah Himawan</option>
              <option value="ARUM">Sekar Arum Kinasih</option>
              <option value="AKBAR">Akbar Zulkarnaen</option>
              <option value="LATIFAH">Latifah Damayanti</option>
              <option value="SIAGA">Siaga Parlindungan Harahap</option>
              <option value="ALBERT">Albert Michael Putra Yochanan</option>
              <option value="ECKY">Aliefiza Eckyarda Tierza</option>
              <option value="ARA">Zahara Nurjannah</option>
            </select>
          </div>
          <div className="mb-4" id="datepicker-inline">
            <label className="block text-sm font-medium mb-1">Tanggal</label>
            <input
              datepicker
              id="default-datepicker"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Judul Kegiatan
            </label>
            <input type="text" className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Detail Kegiatan
            </label>
            <textarea type="text" className="w-full border p-2 rounded" />
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Link Google Docs
          </label>
          <input type="text" className="w-full border p-2 rounded" />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 mt-8 me-2 rounded border border-transparent shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 mt-8 rounded border border-transparent shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardEditData;
