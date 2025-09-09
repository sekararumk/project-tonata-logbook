import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import TableContainer from "../../Components/Table/Table";
import CardViewData from "../../Components/CardViewData/CardViewData"; // Kembali menggunakan CardViewData
import { useLogbookData } from "../../hooks/useLogbookData";

function Homepage() {
  const {
    logbookData,
    isLoading,
    error,
    isModalOpen,
    selectedPdfUrl,
    handleViewPdf,
    handleCloseModal,
    fetchData,
  } = useLogbookData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        <p className="ml-4 text-gray-600">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-center">
        <div>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <TableContainer
        dataLogbook={logbookData}
        onViewPdf={handleViewPdf}
        refreshData={fetchData}
      />
      {/* Kembali me-render CardViewData */}
      <CardViewData
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        url={selectedPdfUrl}
      />
    </div>
  );
}

export default Homepage;
