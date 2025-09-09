import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FlipbookViewer from '../../Components/FlipbookViewer/FlipbookViewer';

// Halaman ini didedikasikan untuk menampilkan flipbook
const PDFViewPage = () => {
  const [searchParams] = useSearchParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Mengambil URL file dari query parameter '?file='
    const fileUrl = searchParams.get('file');
    if (fileUrl) {
      // Decode URL untuk mengatasi karakter spesial seperti spasi (%20)
      setPdfUrl(decodeURIComponent(fileUrl));
    } else {
      setError('URL file PDF tidak ditemukan.');
    }
  }, [searchParams]);

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!pdfUrl) {
    return <div className="flex justify-center items-center h-screen">Memuat...</div>;
  }

  // Komponen FlipbookViewer dipanggil di sini dengan properti isOpen={true}
  // agar langsung tampil. onClose di sini bisa diabaikan atau dibuat untuk menutup tab.
  return (
    <FlipbookViewer 
      isOpen={true} 
      onClose={() => window.close()} // Opsional: tombol close akan menutup tab
      url={pdfUrl} 
    />
  );
};

export default PDFViewPage;
