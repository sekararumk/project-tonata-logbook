import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom Hook untuk mengelola semua logika data logbook
export const useLogbookData = () => {
  // --- State Management ---
  const [logbookData, setLogbookData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  // --- Data Fetching ---
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Mengambil token dari localStorage untuk otentikasi
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:5001/api/table-data", {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.data.success) {
        setLogbookData(response.data.data);
      } else {
        throw new Error('Gagal mengambil data dari server');
      }
      
    } catch (err) {
      console.error("Gagal mengambil data logbook:", err);
      setError(err.message || 'Terjadi kesalahan jaringan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Hanya berjalan sekali saat komponen dimuat

  // --- Event Handlers ---
  const handleViewPdf = (url) => {
    setSelectedPdfUrl(url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPdfUrl('');
  };

  // Mengembalikan semua state dan fungsi yang dibutuhkan oleh komponen UI
  return {
    logbookData,
    isLoading,
    error,
    isModalOpen,
    selectedPdfUrl,
    handleViewPdf,
    handleCloseModal,
    fetchData, // Diekspor untuk fungsi refresh
  };
};
