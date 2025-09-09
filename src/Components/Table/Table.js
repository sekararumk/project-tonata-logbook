import React, { useState, useEffect, useCallback } from "react";
import CardAddData from "../CardAddData/CardAddData";
import CardEditData from "../CardEditData/CardEditData";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
// PERBAIKAN: Path impor disesuaikan untuk mencari di dalam folder Components
import SuccessModal from "../SuccessModal/SuccessModal"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

const Table = ({ onViewPdf }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [updatedFields, setUpdatedFields] = useState([]);
  
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getAuthToken = () => localStorage.getItem('token');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5001/api/table-data', {
        headers: { 'Authorization': token ? `Bearer ${token}` : '' }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch data');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTableAction = async (action, id, data = null) => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5001/api/table-action', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, id, data })
      });

      if (response.ok) {
        fetchData();
        return true;
      } else {
        const result = await response.json();
        throw new Error(result.error || 'Page not found');
      }
    } catch (error) {
      console.error('Table action error:', error.message);
      toast.error(`Gagal: ${error.message}`);
      return false;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const handleEdit = (id) => {
    const rowToEdit = data.find((row) => row.id === id);
    if (rowToEdit) {
      setDataToEdit(rowToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (id) => {
    setItemIdToDelete(id);
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (itemIdToDelete) {
      const success = await handleTableAction('delete', itemIdToDelete);
      if (success) {
        toast.success('Data berhasil dihapus!');
        setIsDeleteModalOpen(false);
        setItemIdToDelete(null);
      }
    }
  };

  const handleSaveEditedData = async (updatedData) => {
    const originalData = data.find(item => item.id === updatedData.id);
    if (!originalData) return;

    const changes = [];
    const originalDate = new Date(originalData.date).toISOString().split('T')[0];
    if (originalDate !== updatedData.date) changes.push('Tanggal');
    if (originalData.judul !== updatedData.judul) changes.push('Judul');
    if (originalData.keterangan !== updatedData.keterangan) changes.push('Keterangan');
    if (originalData.link !== updatedData.link) changes.push('Link');

    const success = await handleTableAction('edit', updatedData.id, {
      date: updatedData.date,
      judul: updatedData.judul,
      keterangan: updatedData.keterangan,
      link: updatedData.link
    });

    if (success) {
      setUpdatedFields(changes);
      setIsSuccessModalOpen(true);
      setIsEditModalOpen(false);
      setDataToEdit(null);
    }
  };
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handlePageChange = (page) => { setCurrentPage(page); };
  const handleItemsPerPageChange = (value) => { setItemsPerPage(Number(value)); setCurrentPage(1); };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-16">
      <div className="bg-amber-50 min-h-screen p-6">
        <h2 className="text-3xl text-secondary text-center font-bold">Logbook Table</h2>
        
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md mt-6">
          <CardAddData onDataAdded={fetchData} />
          <div className="overflow-hidden rounded-md shadow-md">
            {/* PERBAIKAN: Kode JSX lengkap untuk tabel disertakan di sini */}
            <table className="min-w-full">
              <thead className="bg-rose-300">
                <tr>
                  <th className="text-center p-2 border">#</th>
                  <th className="text-center p-2 border">Tanggal</th>
                  <th className="text-center p-2 border">Nama</th>
                  <th className="text-center p-2 border">Judul</th>
                  <th className="text-center p-2 border">Keterangan</th>
                  <th className="text-center p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr key={row.id}>
                    <td className="p-2 border">{startIndex + index + 1}</td>
                    <td className="p-2 border">{formatDate(row.date)}</td>
                    <td className="p-2 border">{row.nama}</td>
                    <td className="p-2 border">{row.judul}</td>
                    <td className="p-2 border">{row.keterangan}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => onViewPdf(row.link)}
                          className="bg-blue-700 text-white font-medium py-2 px-4 rounded hover:bg-blue-800"
                          title="Lihat file PDF"
                        >
                          <FontAwesomeIcon icon={faCircleInfo} className="me-2" />
                          View
                        </button>
                        
                        {row.canEdit && (
                          <button
                            onClick={() => handleEdit(row.id)}
                            className="bg-yellow-300 text-black font-medium py-2 px-4 rounded hover:bg-yellow-400"
                            title="Klik untuk edit"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
                            Edit
                          </button>
                        )}
                        {row.canDelete && (
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="bg-red-600 text-white font-medium py-2 px-4 rounded hover:bg-red-700"
                            title="Klik untuk hapus"
                          >
                            <FontAwesomeIcon icon={faTrash} className="me-2" />
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-4">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="flex items-center">
              <label className="mr-2 text-gray-700 text-sm">Tampilkan:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                className="border border-gray-300 rounded p-1 text-sm"
              >
                <option value={5}>5 data</option>
                <option value={10}>10 data</option>
                <option value={25}>25 data</option>
                <option value={data.length}>Semua</option>
              </select>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button onClick={handlePrevious} disabled={currentPage === 1} className="rounded-full border border-slate-300 py-2 px-3 text-sm shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50">
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => handlePageChange(i + 1)} className={`min-w-9 rounded-full py-2 px-3.5 text-sm transition-all shadow-sm ${ currentPage === i + 1 ? "bg-slate-800 text-white" : "border border-slate-300 text-slate-600 hover:text-white hover:bg-slate-800"}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={handleNext} disabled={currentPage === totalPages} className="rounded-full border border-slate-300 py-2 px-3 text-sm shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <CardEditData isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} dataToEdit={dataToEdit} onSave={handleSaveEditedData} />
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} itemId={itemIdToDelete} />
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} updatedFields={updatedFields} />
    </div>
  );
};

export default Table;
