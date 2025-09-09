import React, { useState, useEffect } from 'react';

const CardEditData = ({ isOpen, onClose, dataToEdit, onSave }) => {
  // State untuk menyimpan data di dalam form
  const [formData, setFormData] = useState({
    id: null,
    date: '',
    nama: '', // State untuk nama
    judul: '',
    keterangan: '',
    link: '' // State untuk link
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect akan berjalan setiap kali 'dataToEdit' berubah (saat modal dibuka)
  useEffect(() => {
    if (dataToEdit) {
      // Format tanggal agar sesuai dengan input type="date" (YYYY-MM-DD)
      const formattedDate = dataToEdit.date ? new Date(dataToEdit.date).toISOString().split('T')[0] : '';
      
      // Mengisi state formData dengan data yang akan diedit
      setFormData({
        id: dataToEdit.id,
        date: formattedDate,
        nama: dataToEdit.nama || '', // Mengisi field nama
        judul: dataToEdit.judul || '',
        keterangan: dataToEdit.keterangan || '',
        link: dataToEdit.link || '' // Menggunakan 'link' sesuai data dari backend
      });
    }
  }, [dataToEdit]);

  if (!isOpen) return null;

  // Fungsi untuk menangani perubahan pada setiap input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Mengirim data yang sudah diubah ke parent component (Table.js)
      await onSave(formData); 
    } catch (error) {
      console.error("Gagal menyimpan perubahan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        <h3 className="text-xl font-bold mb-4 text-center">
          Edit Data
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Field Nama (Non-aktif) */}
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium mb-1">Nama</label>
            <input
              id="nama"
              name="nama"
              type="text"
              value={formData.nama}
              className="w-full border p-2 rounded bg-gray-200 cursor-not-allowed"
              disabled // Field ini tidak bisa diubah
            />
          </div>

          {/* Tanggal */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium mb-1">Tanggal</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          {/* Judul Kegiatan */}
          <div className="mb-4">
            <label htmlFor="judul" className="block text-sm font-medium mb-1">Judul Kegiatan</label>
            <input
              id="judul"
              name="judul"
              type="text"
              value={formData.judul}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Detail Kegiatan */}
          <div className="mb-4">
            <label htmlFor="keterangan" className="block text-sm font-medium mb-1">Detail Kegiatan</label>
            <textarea
              id="keterangan"
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              className="w-full border p-2 rounded h-24"
            />
          </div>

          {/* Link Google Docs */}
          <div className="mb-4">
            <label htmlFor="link" className="block text-sm font-medium mb-1">Link Google Docs</label>
            <input
              id="link"
              name="link"
              type="text"
              value={formData.link}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menyimpan...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardEditData;
