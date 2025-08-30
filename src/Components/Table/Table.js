import React, { useState, useEffect } from "react";
import CardAddData from "../CardAddData/CardAddData";
import CardEditData from "../CardEditData/CardEditData";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fungsi untuk memformat tanggal (hanya tanggal, tanpa waktu)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      return dateString; // Return original string if parsing fails
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedName, setSelectedName] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  // Function untuk mendapatkan token dari localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Function untuk mendapatkan user dari localStorage
  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  // Function untuk fetch data dari backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const user = getCurrentUser();
      setCurrentUser(user);

      const response = await fetch('http://localhost:5001/api/table-data', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        console.log('Data loaded successfully:', result.data.length, 'items');
        console.log('Current user:', user?.username || 'Anonymous');
      } else {
        throw new Error(result.error || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function untuk handle action dengan backend
  const handleTableAction = async (action, id, data = null) => {
    try {
      const token = getAuthToken();
      
      if (!token && (action === 'edit' || action === 'delete')) {
        return false;
      }

      const response = await fetch('http://localhost:5001/api/table-action', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, id, data })
      });

      const result = await response.json();

      if (response.ok) {
        if (action === 'view') {
          console.log('View logbook:', result.data);
        } else if (action === 'delete') {
          fetchData(); // Refresh data
        } else if (action === 'edit') {
          fetchData(); // Refresh data
        }
        return true;
      } else {
        console.error('Table action error:', result.error || 'Terjadi kesalahan');
        return false;
      }
    } catch (error) {
      console.error('Error handling table action:', error);
      return false;
    }
  };

  const handleView = (id) => {
    handleTableAction('view', id);
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

  const handleConfirmDelete = async (id) => {
    const success = await handleTableAction('delete', id);
    if (success) {
      setIsDeleteModalOpen(false);
      setItemIdToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemIdToDelete(null);
  };

  const handleSaveEditedData = async (updatedData) => {
    const success = await handleTableAction('edit', updatedData.id, {
      date: updatedData.date,
      judul: updatedData.judul,
      keterangan: updatedData.keterangan
    });
    
    if (success) {
      setIsEditModalOpen(false);
      setDataToEdit(null);
      fetchData(); // Refresh data setelah edit
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setDataToEdit(null);
  };
  
  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(data.length);
  const [currentPage, setCurrentPage] = useState(1);

  // Ambil daftar nama unik dari data
  const uniqueNames = ["All", ...new Set(data.map((row) => row.nama))];

  // Filter data berdasarkan search + nama
  const filteredData = data.filter((row) => {
    const matchSearch =
      row.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.keterangan.toLowerCase().includes(searchQuery.toLowerCase());

    const matchName =
      selectedName === "All" || row.nama === selectedName;

    return matchSearch && matchName;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);



  // Loading state
  if (loading) {
    return (
      <div className="mt-16">
        <div className="bg-amber-50 min-h-screen p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-16">
        <div className="bg-amber-50 min-h-screen p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-600 text-xl mb-4">❌ Error</div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={fetchData}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="bg-amber-50 min-h-screen p-6">
        <h2 className="text-3xl text-secondary text-center font-bold">
          Logbook Table
        </h2>        
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <CardAddData onDataAdded={fetchData} />
          <div className="overflow-hidden rounded-md shadow-md">
            <table className="min-w-full">
              <thead className="bg-rose-300">
                <tr>
                  <th className="text-center p-2 border">No</th>
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
                          onClick={() => handleView(row.id)}
                          className="bg-blue-700 text-white font-medium py-2 px-4 rounded hover:bg-blue-800"
                          title="Semua user bisa melihat"
                        >
                          <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                          View
                        </button>
                        {row.canEdit && (
                          <button
                            onClick={() => handleEdit(row.id)}
                            className="bg-yellow-300 text-black font-medium py-2 px-4 rounded hover:bg-yellow-400"
                            title="Klik untuk edit"
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="me-2"
                            />
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
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="flex items-center">
              <label className="mr-2 text-gray-700 text-sm font-bold">Tampilkan :</label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="border border-gray-300 rounded p-1 text-sm"
              >
                <option value={5}>5 data</option>
                <option value={10}>10 data</option>
                <option value={25}>25 data</option>
                <option value={data.length}>Semua</option>
              </select>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-slate-300 py-2 px-3 text-sm shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`min-w-9 rounded-full py-2 px-3.5 text-sm transition-all shadow-sm ${
                    currentPage === i + 1
                      ? "bg-slate-800 text-white"
                      : "border border-slate-300 text-slate-600 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-full border border-slate-300 py-2 px-3 text-sm shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Modals */}
      <CardEditData
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        dataToEdit={dataToEdit}
        onSave={handleSaveEditedData}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemId={itemIdToDelete}
      />
    </div>
  );
};

export default Table;