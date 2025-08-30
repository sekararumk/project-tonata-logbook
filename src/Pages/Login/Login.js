import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('🔄 Attempting login...');
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('📡 Login response:', data);

      if (response.ok && data.success) {
        // Simpan token dan user info ke localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        console.log('✅ Login successful, token saved');
        console.log('🔐 Token:', data.token);
        console.log('👤 User:', data.user);

        // Redirect ke Homepage
        navigate('/Homepage');
      } else {
        console.error('Login failed:', data.error || 'Username atau password salah');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col lg:flex-row min-h-screen">
      {/* Image section with carousel */}
      <div className="hidden lg:block lg:w-2/3 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          loop={true}
          pagination={{
            el: ".swiper-pagination", 
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          className="w-full h-screen default-carousel"
        >
          <SwiperSlide>
            <img
              src="./pict (1).jpg"
              alt="Slide 1"
              className="w-full h-screen object-cover object-right"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="./pict (2).jpg"
              alt="Slide 2"
              className="w-full h-screen object-cover object-center"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="./pict (3).jpg"
              alt="Slide 3"
              className="w-full h-screen object-cover object-left"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="./pict (4).jpg"
              alt="Slide 4"
              className="w-full h-screen object-cover object-left"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="./pict (5).jpg"
              alt="Slide 5"
              className="w-full h-screen object-cover object-left"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="./pict (6).jpg"
              alt="Slide 6"
              className="w-full h-screen object-cover object-left"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="./pict (7).jpg"
              alt="Slide 7"
              className="w-full h-screen object-cover object-left"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="./pict (8).jpg"
              alt="Slide 8"
              className="w-full h-screen object-cover object-left"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="./pict (9).jpg"
              alt="Slide 9"
              className="w-full h-screen object-cover object-left"
            />
          </SwiperSlide>
        </Swiper>

        {/* Custom buttons */}
        <div className="absolute top-1/2 left-5 z-10 custom-prev cursor-pointer bg-rose-400 w-8 h-8 flex items-center justify-center rounded-full shadow-lg hover:bg-rose-500">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>

        <div className="absolute top-1/2 right-5 z-10 custom-next cursor-pointer bg-rose-400 w-8 h-8 flex items-center justify-center rounded-full shadow-lg hover:bg-rose-500">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="swiper-pagination absolute bottom-5 left-0 right-0 flex justify-center"></div>
      </div>

      {/* Form section */}
      <div className="flex w-full lg:w-1/3 justify-center items-center p-8 h-screen overflow-y-auto">
        <form onSubmit={handleSubmit}  className="w-full max-w-md bg-white">
          <div className="flex flex-col items-center mb-6">
            <img src="./Logo.png" alt="logo-img" width="120" className="mb-2" />
            <h3 className="text-2xl font-bold">Login</h3>
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-start"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl h-12 px-4 text-sm"
              placeholder="Masukkan username Anda"
              autoComplete="username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-start"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl h-12 px-4 text-sm"
              placeholder="At least 6 characters with number and uppercase"
              autoComplete="current-password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-400 text-white text-sm h-12 rounded-xl hover:bg-rose-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">atau</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 flex items-center justify-center gap-3 h-12 rounded-xl text-sm hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Login dengan Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;