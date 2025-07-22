// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row min-h-screen">
      {/* Image section */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2019/01/KPU.jpg"
          alt="Login Visual"
          className="w-full h-screen object-cover -translate-x-[5%]"
        />
      </div>

      {/* Form section */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-6">
        <form className="w-full max-w-md bg-white">
          <img src="https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2019/01/KPU.jpg" alt="logo-img" width="180" className="mb-4" />

          <h3 className="text-2xl font-bold mb-3">Login</h3>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-start">
              Email
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
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-start">
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
            className="w-full bg-rose-400 text-white text-sm h-12 rounded-xl hover:bg-rose-300 transition mb-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
