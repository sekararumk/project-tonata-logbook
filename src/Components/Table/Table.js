import React, { useState } from "react";
import CardAddData from "../CardAddData/CardAddData";
import CardEditData from "../CardEditData/CardEditData";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal"; // Import komponen modal baru
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Table = () => {
  const [data, setData] = useState([
    {
      id: 1,
      date: "2025-07-20",
      nama: "Sekar Arum",
      judul: "Logbook Entry 1",
      keterangan: "Rapat Pleno",
    },
    {
      id: 2,
      date: "2025-07-21",
      nama: "Sekar Arum",
      judul: "Logbook Entry 2",
      keterangan: "Rapat Pleno 2",
    },
    {
      id: 3,
      date: "2025-07-21",
      nama: "Sekar Arum",
      judul: "Logbook Entry 2",
      keterangan: "Rapat Pleno 2",
    },
    {
      id: 4,
      date: "2025-07-21",
      nama: "Sekar Arum",
      judul: "Logbook Entry 2",
      keterangan: "Rapat Pleno 2",
    },
    {
      id: 5,
      date: "2025-07-21",
      nama: "Sekar Arum",
      judul: "Logbook Entry 2",
      keterangan: "Rapat Pleno 2",
    },
    {
      id: 6,
      date: "2025-07-21",
      nama: "Sekar Arum",
      judul: "Logbook Entry 2",
      keterangan: "Rapat Pleno 2",
    },
    {
      id: 7,
      date: "2025-07-21",
      nama: "Sekar Arum",
      judul: "Logbook Entry 2",
      keterangan: "Rapat Pleno 2",
    },
  ]);

  // State untuk modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  // State untuk modal delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null); // Menyimpan ID item yang akan dihapus

  const handleView = (id) => {
    alert(`Melihat data dengan ID: ${id}`);
  };

  const handleEdit = (id) => {
    const rowToEdit = data.find((row) => row.id === id);
    if (rowToEdit) {
      setDataToEdit(rowToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (id) => {
    setItemIdToDelete(id); // Simpan ID yang akan dihapus
    setIsDeleteModalOpen(true); // Buka modal konfirmasi delete
  };

  const handleConfirmDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
    setIsDeleteModalOpen(false); // Tutup modal setelah konfirmasi
    setItemIdToDelete(null); // Reset ID yang akan dihapus
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemIdToDelete(null); // Reset ID yang akan dihapus
  };

  const handleSaveEditedData = (updatedData) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === updatedData.id ? updatedData : row))
    );
    setIsEditModalOpen(false);
    setDataToEdit(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setDataToEdit(null);
  };

  const [itemsPerPage, setItemsPerPage] = useState(data.length); // Default "Semua"
  const [currentPage, setCurrentPage] = useState(1);
  
  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="mt-16">
      <div className="bg-amber-50 min-h-screen p-6">
        <h2 className="text-3xl text-secondary text-center font-bold">
          Logbook Table
        </h2>
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md mt-6">
          <CardAddData />
          <div className="overflow-hidden rounded-md shadow-md">
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
                    <td className="p-2 border">{row.date}</td>
                    <td className="p-2 border">{row.nama}</td>
                    <td className="p-2 border">{row.judul}</td>
                    <td className="p-2 border">{row.keterangan}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleView(row.id)}
                          className="bg-blue-700 text-white font-medium py-2 px-4 rounded"
                        >
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="me-2"
                          />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(row.id)}
                          className="bg-yellow-300 text-black font-medium py-2 px-4 rounded"
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="me-2"
                          />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="bg-red-600 text-white font-medium py-2 px-4 rounded"
                        >
                          <FontAwesomeIcon icon={faTrash} className="me-2" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            {/* Dropdown Tampilkan Data */}
            <div className="flex items-center">
              <label className="mr-2 text-gray-700 text-sm">Tampilkan:</label>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(parseInt(e.target.value))
                }
                className="border border-gray-300 rounded p-1 text-sm"
              >
                <option value={5}>5 data</option>
                <option value={10}>10 data</option>
                <option value={25}>25 data</option>
                <option value={data.length}>Semua</option>
              </select>
            </div>

            {/* Pagination */}
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="rounded-full border border-slate-300 py-2 px-3 text-sm shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
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
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="rounded-full border border-slate-300 py-2 px-3 text-sm shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal CardEditData */}
      <CardEditData
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        dataToEdit={dataToEdit}
        onSave={handleSaveEditedData}
      />

      {/* Modal DeleteConfirmationModal */}
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
