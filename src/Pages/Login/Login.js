// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row min-h-screen">
      {/* Image section */}
      <div className="hidden lg:block lg:w-2/3">
        <img
          src="./Login.jpg"
          alt="Login Visual"
          className="w-full h-screen object-cover object-right"
        />
      </div>

      {/* Form section */}
      <div className="flex w-full lg:w-1/3 justify-center items-center p-10">
        <form className="w-full max-w-md bg-white">
          <div className="flex flex-col items-center mb-6">
            <img
              src="./Logo.png"
              alt="logo-img"
              width="120"
              className="mb-2"
            />
            <h3 className="text-2xl font-bold">Login</h3>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-start"
            >
              Username
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-xl h-12 px-4 text-sm"
              placeholder="Contoh: johndee@gmail.com"
              autoComplete="true"
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
              className="w-full border border-gray-300 rounded-xl h-12 px-4 text-sm"
              placeholder="At least 6 characters with number and uppercase"
              autoComplete="true"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-rose-400 text-white text-sm h-12 rounded-xl hover:bg-rose-300 transition"
          >
            Login
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
