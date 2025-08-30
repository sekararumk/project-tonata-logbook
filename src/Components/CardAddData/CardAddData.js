import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CardAddData = ({ onClose, onDataAdded }) => {
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [formData, setFormData] = useState({
    tanggal: '',
    judul: '',
    keterangan: '',
    link: ''
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API Base URL
  const API_BASE_URL = 'http://localhost:5001';

  // Get current user from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      return;
    }

    if (!formData.tanggal || !formData.judul || !formData.keterangan) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE_URL}/api/add-logbook`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Reset form
        setFormData({
          tanggal: '',
          judul: '',
          keterangan: '',
          link: ''
        });

        // Close modal
        setIsModalAdd(false);

        // Notify parent component to refresh data
        if (onDataAdded) {
          onDataAdded();
        }
      } else {
        console.error('Failed to add logbook:', result.error || 'Gagal menambah logbook');
      }
    } catch (error) {
      console.error('Error adding logbook:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 w-full">
        <div>
          
        </div>
        <button
          onClick={() => setIsModalAdd(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-secondary text-white px-4 py-2 rounded ml-4"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Tambah Data
        </button>
      </div>

      {isModalAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setIsModalAdd(false)}
              className="absolute top-2 me-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className="text-xl text-center font-semibold mb-4 mt-3">
              Tambah Data
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Info User yang Login */}
              <div className="col-span-2 sm:col-span-1 mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nama Pengguna
                </label>
                <div className="border border-gray-300 text-gray-900 text-sm rounded-lg bg-gray-100 p-3">
                  {currentUser ? (
                    <span>{currentUser.nama_pengguna || currentUser.username}</span>
                  ) : (
                    <span className="text-red-500">❌ Belum login</span>
                  )}
                </div>
                {!currentUser && (
                  <p className="text-sm text-red-500 mt-1">
                    Silakan login terlebih dahulu untuk menambah logbook
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Tanggal <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Judul Kegiatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan judul kegiatan"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Detail Kegiatan <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Masukkan detail kegiatan"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Link Google Docs (Opsional)
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://docs.google.com/..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalAdd(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 mt-8 me-2 rounded border border-transparent shadow-md transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 mt-8 rounded border border-transparent shadow-md transition-colors ${
                    isSubmitting || !currentUser
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-rose-400 hover:bg-rose-500 text-white'
                  }`}
                  disabled={isSubmitting || !currentUser}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Menyimpan...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAddData;
