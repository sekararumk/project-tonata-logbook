import React from 'react';

const SuccessModal = ({ isOpen, onClose, updatedFields }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 max-w-sm flex flex-col items-center transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Checkmark Icon */}
        <div className="w-20 h-20 mb-4">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">Update Berhasil!</h3>
        
        {updatedFields.length > 0 ? (
          <>
            <p className="text-gray-600 mb-4 text-center">Perubahan berikut telah disimpan:</p>
            <ul className="list-disc list-inside bg-gray-100 p-3 rounded-md w-full text-left">
              {updatedFields.map((field, index) => (
                <li key={index} className="text-gray-700">{field}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-600 mb-4">Tidak ada perubahan yang disimpan.</p>
        )}
        
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 mt-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors w-full"
        >
          Tutup
        </button>
      </div>
      
      {/* CSS untuk Animasi */}
      <style>{`
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: #4CAF50;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: block;
          stroke-width: 3;
          stroke: #fff;
          stroke-miterlimit: 10;
          margin: 10% auto;
          box-shadow: inset 0px 0px 0px #4CAF50;
          animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
        }
        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        @keyframes stroke {
          100% { stroke-dashoffset: 0; }
        }
        @keyframes scale {
          0%, 100% { transform: none; }
          50% { transform: scale3d(1.1, 1.1, 1); }
        }
        @keyframes fill {
          100% { box-shadow: inset 0px 0px 0px 40px #4CAF50; }
        }
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

export default SuccessModal;
