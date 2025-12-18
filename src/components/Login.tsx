import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden flex">

        {/* Left Section */}
        <div className="hidden md:flex w-2/5 flex-col justify-center bg-orange-500 text-white px-10">
          <h1 className="text-3xl font-bold mb-4">Login</h1>
          <p className="leading-relaxed text-sm">
            Get access to all <br />
            Dev Puja services, <br />
            1000+ devotional music <br />
            and other items
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-3/5 px-8 py-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center mb-2">
            Login to check all available pujas & offers
          </h2>

          <p className="text-sm text-gray-500 text-center mb-6">
            Please login with your registered email and password
          </p>

          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded-md px-4 py-3 mb-4 focus:ring-2 focus:ring-green-600 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-4 py-3 mb-2 focus:ring-2 focus:ring-green-600 outline-none"
          />

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-green-600 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <p className="text-xs text-gray-500 mb-6">
            By proceeding you agree to the{" "}
            <span className="text-orange-500 hover:underline cursor-pointer">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="text-orange-500 hover:underline cursor-pointer">
              Privacy Policy
            </span>{" "}
            of Dev Puja
          </p>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold cursor-pointer"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
