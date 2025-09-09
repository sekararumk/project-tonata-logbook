import { useState, useEffect } from 'react';

// Custom hook untuk menunda pembaruan nilai (debouncing)
function useDebounce(value, delay) {
  // State untuk menyimpan nilai yang sudah di-debounce
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Atur timer untuk memperbarui nilai setelah delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Bersihkan timer jika nilai berubah (misalnya, pengguna mengetik lagi)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Hanya jalankan ulang efek jika nilai atau delay berubah

  return debouncedValue;
}

export default useDebounce;
