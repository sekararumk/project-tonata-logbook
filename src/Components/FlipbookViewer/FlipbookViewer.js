import React, { useState, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// PERBAIKAN: Menggunakan file worker lokal dari folder 'public'
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const FlipbookViewer = ({ isOpen, onClose, url }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const book = useRef();

  const onFlip = useCallback((e) => {
    setCurrentPage(e.data);
  }, []);
  
  if (!isOpen) return null;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePrevPage = () => {
    if (book.current) {
      book.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (book.current) {
      book.current.pageFlip().flipNext();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="flex flex-col items-center justify-center w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kontainer Flipbook */}
        <div className="w-auto h-[90vh] aspect-[2/1.414] shadow-2xl">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="text-white text-lg">Memuat dokumen...</div>}
            error={<div className="text-red-400 text-lg">Gagal memuat PDF. Pastikan link valid.</div>}
          >
            <HTMLFlipBook
              width={500} // Sesuaikan lebar halaman
              height={707} // Sesuaikan tinggi halaman (rasio A4)
              size="stretch"
              minWidth={315}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1533}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              ref={book}
              className="flipbook-container"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div className="page" key={`page_${index + 1}`}>
                  <Page pageNumber={index + 1} width={500} />
                </div>
              ))}
            </HTMLFlipBook>
          </Document>
        </div>
        
        {/* Kontrol Navigasi */}
        {numPages && (
          <div className="absolute bottom-4 text-white text-lg flex items-center space-x-4 bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            <button onClick={handlePrevPage} className="hover:text-gray-300 transition-colors">‹ Prev</button>
            <span>Halaman {currentPage + 1} dari {numPages}</span>
            <button onClick={handleNextPage} className="hover:text-gray-300 transition-colors">Next ›</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlipbookViewer;
