import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Kirim request logout ke backend
      const response = await fetch('http://localhost:5001/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Hapus token dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect ke halaman login
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Tetap logout meski ada error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-rose-200 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-xl font-bold text-sky-700">
            TONATA Logbook
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-medium py-2 px-4 rounded hover:bg-red-700 transition"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
