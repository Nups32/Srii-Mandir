import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden flex">

        {/* Left */}
        <div className="hidden md:flex w-2/5 flex-col justify-center bg-orange-500 text-white px-10">
          <h1 className="text-3xl font-bold mb-4">Register</h1>
          <p className="text-sm leading-relaxed">
            Create your Dev Puja account <br />
            to book pujas & offerings easily.
          </p>
        </div>

        {/* Right */}
        <div className="w-full md:w-3/5 px-8 py-10">
          <h2 className="text-xl font-semibold text-center mb-6">
            Create your account
          </h2>

          <input
            type="text"
            placeholder="Full name"
            className="w-full border rounded-md px-4 py-3 mb-4 focus:ring-2 focus:ring-green-600 outline-none"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded-md px-4 py-3 mb-4 focus:ring-2 focus:ring-green-600 outline-none"
          />

          <input
            type="tel"
            placeholder="Phone number"
            className="w-full border rounded-md px-4 py-3 mb-4 focus:ring-2 focus:ring-green-600 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-4 py-3 mb-6 focus:ring-2 focus:ring-green-600 outline-none"
          />

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold cursor-pointer"
          >
            Create Account
          </button>

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
