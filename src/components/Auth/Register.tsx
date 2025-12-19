/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../store/AuthContext";
// import { toast } from "@/utils/ui/toast";
import logo from "../../assets/logo.jpg";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [passwordError, setPasswordError] = useState("");
  const [, setConfirmPassword] = useState("");
  const [isOTPVerification, setIsOTPVerification] = useState(false);
  const [inputOtp, setInputOtp] = useState<(string | number)[]>(
    new Array(4).fill("")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  // const { setAuthData } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // try {
      e.preventDefault();

      // if (userData.confirmPassword !== userData.password) {
      //   setPasswordError("Passwords don't match");
      //   return;
      // } else {
      //   setPasswordError("");
      // }

      setIsLoading(true);

      // show otp verification form after validation of data
      setIsOTPVerification(true);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { confirmPassword, ...data } = userData;
    //   const res: any = await register(data);
    //   if (res && res.status == 200) {
    //     toast("success").fire({
    //       icon: "success",
    //       title: "OTP sent to your email Successfully",
    //       timer: 2000,
    //       showConfirmButton: false,
    //     });
    //     setIsLoading(false);
    //     setIsOTPVerification(true);
    //   } else {
    //     setIsLoading(false);
    //     toast("danger").fire({
    //       icon: "error",
    //       title: res.data.error || "Server Error",
    //       timer: 2000,
    //       showConfirmButton: false,
    //     });
    //   }
    // } catch (error: any) {
    //   setIsLoading(false);
    //   toast("danger").fire({
    //     icon: "error",
    //     title: error.response.data.error || "Server Error",
    //     timer: 2000,
    //     showConfirmButton: false,
    //   });
    // }
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...inputOtp];
    newOtp[index] = element.value;
    setInputOtp(newOtp);

    // focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !inputOtp[index] &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // const enteredOtp = inputOtp.join("");
    // if (inputOtp.some((digit) => digit === "")) {
    //   toast("error").fire({
    //     icon: "error",
    //     title: "Please enter OTP",
    //     timer: 2000,
    //     showConfirmButton: false,
    //   });
    //   setIsLoading(false);
    //   return;
    // }
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { confirmPassword, ...data } = userData as any;
    // const res: any = await register({ ...data, otp: enteredOtp });

    // if (res && res.status == 200) {
    //   setIsLoading(false);
    //   setAuthData({ token: res.data.token, userdata: res.data.userData });
    //   localStorage.setItem("token", res.data.token);
    //   toast("success").fire({
    //     icon: "success",
    //     title: "Register Successful",
    //     timer: 2000,
    //     showConfirmButton: false,
    //   });
    //   navigate("/");
    // } else {
    //   setIsLoading(false);
    //   toast("danger").fire({
    //     icon: "error",
    //     title: res.data.error || "Server Error",
    //     timer: 2000,
    //     showConfirmButton: false,
    //   });
    // }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        {/* Left */}
        <div className="hidden md:flex w-2/5 flex-col justify-center bg-orange-500 text-white px-10">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Logo" className="h-20" />
            {/* <span className="font-semibold text-orange-600">Srii Mandir</span> */}
          </Link>
          <h1 className="text-3xl font-bold mb-4">Register</h1>
          <p className="text-sm leading-relaxed">
            Create your Srii Mandir account <br />
            to book pujas & offerings easily.
          </p>
        </div>

        {/* Right */}
        {!isOTPVerification && (
          <div className="w-full md:w-3/5 px-8 py-10">
            <h2 className="text-xl font-semibold text-center mb-6">
              Create your account
            </h2>

            <form action="" onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                placeholder="Full name"
                value={userData.name}
                onChange={(e: any) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                required
                className="w-full border rounded-md px-4 py-3 mb-4! focus:ring-2 focus:ring-green-600 outline-none"
              />

              <input
                type="email"
                placeholder="Email address"
                value={userData.email}
                onChange={(e: any) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
                className="w-full border rounded-md px-4 py-3 mb-4! focus:ring-2 focus:ring-green-600 outline-none"
              />

              <input
                type="tel"
                placeholder="Phone number"
                value={userData.mobile}
                onChange={(e: any) =>
                  setUserData({ ...userData, mobile: e.target.value })
                }
                required
                className="w-full border rounded-md px-4 py-3 mb-4! focus:ring-2 focus:ring-green-600 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={userData.password}
                required
                onInput={(e) => {
                  setUserData({
                    ...userData,
                    password: (e.target as HTMLInputElement).value,
                  });
                  if (
                    userData.confirmPassword &&
                    (e.target as HTMLInputElement).value !==
                      userData.confirmPassword
                  ) {
                    setPasswordError("Passwords don't match");
                  } else {
                    setPasswordError("");
                    setConfirmPassword("");
                  }
                }}
                className="w-full border rounded-md px-4 py-3 mb-6! focus:ring-2 focus:ring-green-600 outline-none"
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}

              <button className="w-full bg-green-600 hover:bg-green-700 text-white! py-3 rounded-md font-semibold cursor-pointer">
                Create Account
              </button>

              <p className="text-sm text-center mt-6! text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-green-600 font-semibold cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        )}

        {isOTPVerification && (
          <div className="w-full md:w-3/5 px-8 py-10 flex flex-col justify-center">
            {/* Heading */}
            <h2 className="text-xl font-semibold text-center mb-2">
              Verify OTP
            </h2>
            <p className="text-sm text-center text-gray-500 mb-8">
              Enter the 6-digit OTP sent to your registered email
            </p>

            <form
              onSubmit={handleOTPSubmit}
              className="flex flex-col items-center"
            >
              {/* OTP Inputs */}
              <div className="flex justify-center gap-4 mb-8">
                {inputOtp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    // ref={(el) => (inputRefs.current[index] = el)}
                    value={data as string}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition "
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className=" w-full bg-green-600 hover:bg-green-700 text-white! font-semibold py-3 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                ) : (
                  "Verify OTP"
                )}
              </button>

              {/* Back to Register */}
              <p className="text-sm text-gray-600 mt-6! text-center">
                Didn't receive OTP?{" "}
                <span className="text-green-600 font-semibold cursor-pointer hover:underline">
                  Resend
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
