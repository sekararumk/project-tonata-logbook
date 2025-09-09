import React from 'react';

// Mengembalikan fungsi modal untuk membuka link di tab baru
const CardViewData = ({ isOpen, onClose, url }) => {
  if (!isOpen) return null;

  const handleOpenLink = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-xl shadow-2xl w-11/12 max-w-lg flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-scale-in text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Buka Dokumen</h3>
        <p className="text-gray-600 mb-6">
          Pratinjau langsung tidak tersedia. Silakan buka dokumen di tab baru.
        </p>
        <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 break-words mb-6">
          {url || 'URL tidak tersedia'}
        </div>
        <div className="flex justify-center space-x-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors"
          >
            Batal
          </button>
          <button 
            type="button" 
            onClick={handleOpenLink} 
            disabled={!url}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buka di Tab Baru
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CardViewData;