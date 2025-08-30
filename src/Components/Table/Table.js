import React, { useState } from "react";
import CardAddData from "../CardAddData/CardAddData";
import CardEditData from "../CardEditData/CardEditData";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Table = () => {
  const [data, setData] = useState([
    { id: 1, date: "2025-07-20", nama: "Sekar Arum", judul: "Logbook Entry 1", keterangan: "Rapat Pleno" },
    { id: 2, date: "2025-07-21", nama: "Latifah", judul: "Logbook Entry 2", keterangan: "Rapat Pleno 2" },
    { id: 3, date: "2025-07-21", nama: "Zahara", judul: "Logbook Entry 3", keterangan: "Diskusi" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedName, setSelectedName] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  // Table actions
  const handleView = (id) => alert(`Melihat data dengan ID: ${id}`);
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
  const handleConfirmDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
    setIsDeleteModalOpen(false);
    setItemIdToDelete(null);
  };

  // Save & close modals
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleSaveEditedData = (updatedData) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === updatedData.id ? updatedData : row))
    );
    setIsEditModalOpen(false);
    setDataToEdit(null);
  };
  const handleCloseEditModal = () => setIsEditModalOpen(false);

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

  return (
    <div className="mt-16">
      <div className="bg-amber-50 min-h-screen p-6">
        <h2 className="text-3xl text-secondary text-center font-bold">Logbook Table</h2>
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md mt-6">
          
          {/* Search + Dropdown */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="flex w-full md:w-auto max-w-lg relative">
              {/* Dropdown button */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-bold text-center 
                           text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200"
              >
                {selectedName}
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute top-12 left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    {uniqueNames.map((name) => (
                      <li key={name}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedName(name);
                            setIsDropdownOpen(false);
                          }}
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                        >
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Search input */}
              <div className="relative w-full">
                <input
                  type="search"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:outline-none focus:ring-0"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-rose-400 rounded-e-lg border border-rose-400 hover:bg-rose-500"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>

            <CardAddData />
          </div>

          {/* Table */}
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
                          <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(row.id)}
                          className="bg-yellow-300 text-black font-medium py-2 px-4 rounded"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="bg-red-600 text-white font-medium py-2 px-4 rounded"
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                          Delete
                        </button>
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
