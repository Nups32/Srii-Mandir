/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "@/store/AuthContext";
// import { toast } from "@/utils/ui/toast";
import logo from "../../assets/logo.jpg";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  // const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin-login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowButton(false);
    setIsLoading(true);

    // dynamicLogin(location.pathname, { email, password })
    //   .then((res: any) => {
    //     // console.log(res);
    //     if (res.status === 200) {
    //       toast("success").fire({
    //         icon: "success",
    //         title: "Login Successful",
    //         timer: 2000,
    //         showConfirmButton: false,
    //       });
    //       setAuthData({
    //         token: res.data.token,
    //         userdata: {
    //           ...res.data.userData,
    //           wifiKey: res.data.wifiKey || null,
    //         },
    //       });
    //       res.data.wifiKey && localStorage.setItem("wifiKey", res.data.wifiKey);
    //       localStorage.setItem("token", res.data.token);
    //       // setIsLoading(false);
    //       navigate("/");
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch((err: any) => {
    //     if (err.response.status === 401) {
    //       // setIsLoading(false);
    //       console.log(err.response);
    //       err.response.data.refreshWhiteList && setShowButton(true);
    //       toast("danger").fire({
    //         icon: "warning",
    //         title:
    //           err.response.data.result ||
    //           err.response?.data?.message ||
    //           "Unauthorized Access",
    //         timer: 2000,
    //         showConfirmButton: false,
    //       });
    //     } else {
    //       toast("danger").fire({
    //         icon: "error",
    //         title: err.response?.data?.message || "Server Error",
    //         timer: 2000,
    //         showConfirmButton: false,
    //       });
    //     }
    //     setIsLoading(false);
    //   });
  };

  const handleSecretSubmit = async () => {
    // try {
      // const encryptedSecretKey = CryptoJS.AES.encrypt(
      //   secretKey,
      //   import.meta.env.VITE_ENCRYPTION_KEY
      // ).toString();
      // const res: any = await createWhitelistip({ secret: encryptedSecretKey });
      // if (res && res.status == 200) {
      //   toast("success").fire({
      //     icon: "success",
      //     title: res.data.message || "Ip Whitelisted Successful",
      //     timer: 2000,
      //     showConfirmButton: false,
      //   });
      // } else {
      //   toast("danger").fire({
      //     icon: "error",
      //     title: res.data.message || "Failed to whitelist IP",
      //     timer: 2000,
      //     showConfirmButton: false,
      //   });
      // }
      setShowButton(false);
      setShowPopup(false);
    // } catch (error: any) {
    //   toast("danger").fire({
    //     icon: "error",
    //     title: error.response.data.message || "Failed to whitelist IP",
    //     timer: 2000,
    //     showConfirmButton: false,
    //   });
    // }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        {isAdminRoute && showButton ? (
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowPopup(!showPopup)}
              className="p-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black"
            >
              🗘
            </button>

            {showPopup && (
              <div className="absolute right-10 top-0 w-64 bg-white rounded-xl shadow-lg p-4 z-50">
                <h3 className="text-center font-semibold text-gray-800 mb-3">
                  Enter Your Secret Key
                </h3>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Secret Key"
                  className="w-full border text-gray-800 border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleSecretSubmit}
                  className="w-full bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ) : null}

        {/* Left Section */}
        <div className="hidden md:flex w-2/5 flex-col justify-center bg-orange-500 text-white px-10">
        <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Logo" className="h-20" />
            {/* <span className="font-semibold text-orange-600">Srii Mandir</span> */}
          </Link>
          <h1 className="text-3xl font-bold mb-4">Login</h1>
          <p className="leading-relaxed text-sm">
            Get access to all <br />
            Srii Mandir services, <br />
            1000+ devotional music <br />
            and other items
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-3/5 px-8 py-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center mb-2">
            Login to check all available pujas & offers
          </h2>

          <p className="text-sm text-gray-500 text-center mb-6!">
            Please login with your registered email and password
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-md px-4 py-3 mb-4! focus:ring-2 focus:ring-green-600 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-md px-4 py-3 mb-2! focus:ring-2 focus:ring-green-600 outline-none"
            />

            {/* Forgot Password */}
            <div className="text-right mb-4">
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-sm! text-green-600! hover:underline cursor-pointer"
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
              of Srii Mandir
            </p>

            <button
              type="submit"
              disabled={isLoading}
              onClick={() => navigate("/")}
              className="w-full bg-green-600 hover:bg-green-700 text-white! py-3 rounded-md font-semibold cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
              ) : (
                "Login"
              )}
            </button>

            {/* Register Link */}
            <p className="text-sm text-center mt-6! text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-green-600 font-semibold cursor-pointer hover:underline"
              >
                Create an account
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
