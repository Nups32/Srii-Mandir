/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import { forgetPassword } from "../../utils/API";
import { message } from "antd";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPVerification, setIsOTPVerification] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [inputOtp, setInputOtp] = useState<(string | number)[]>(
    new Array(4).fill("")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

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
    if (inputOtp.some((digit) => digit === "")) {
      message.warning("Please enter OTP");
      setIsLoading(false);
      return;
    }
    const otp = inputOtp.join("");
    const res: any = await forgetPassword({
      email,
      otp,
    });

    if (res && res.status == 200) {
      setIsLoading(false);
      message.success("OTP verified");
      // move to new password step after successful OTP verification
      setIsOTPVerification(false);
      setIsNewPassword(true);
    } else {
      setIsLoading(false);
      message.error("OTP verified Failed");
    }
  };

  const handleNewPassword = async (e: any) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (password !== confirmPassword) {
        message.error("Passwords do not match");
        return;
      }

      const otp = inputOtp.join("");
      const res: any = await forgetPassword({
        email,
        otp,
        newPassword: password,
      });
      if (res && res.status == 200) {
        message.success("Password updated successfully");
        navigate("/login");
      } else {
        message.error("Upadate Password Failed");
      }
    } catch (error: any) {
      message.error("Server Error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res: any = await forgetPassword({ email });
      if (res && res.status === 200) {
        message.success("OTP sent to your email");
        setIsOTPVerification(true);
      } else {
        message.error("Email not registered");
      }
      // message.error("Email not registered");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-orange-50">
        <div className="w-full max-w-md md:max-w-lg">
          <div
            className="relative bg-linear-to-b from-orange-500 to-orange-700 
                    rounded-3xl shadow-2xl px-8 py-10 overflow-hidden"
          >
            {/* overlay  */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Logo */}
            <div className="relative flex justify-center mb-6">
              <Link to="/">
                <img
                  src={logo}
                  alt="Dev Puja"
                  className="w-24 h-auto cursor-pointer drop-shadow-lg"
                />
              </Link>
            </div>

            {/* email verification */}
            {!isOTPVerification && !isNewPassword && (
              <div className="relative">
                <h3 className="text-center text-lg font-semibold text-white mb-6!">
                  Enter Registered Email
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl bg-white/20 text-white! 
                         placeholder-white/70 px-4 py-3
                         border border-white/30
                         focus:outline-none focus:ring-2 focus:ring-white/60"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-white text-orange-700 
                         font-semibold py-3 mt-4
                         hover:bg-orange-100 transition cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin inline-block" />
                    ) : (
                      "Verify Email"
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* otp verification */}
            {isOTPVerification && (
              <div className="relative">
                <h3 className="text-center text-lg font-semibold text-white mb-6!">
                  Verify OTP
                </h3>

                <form onSubmit={handleOTPSubmit} className="flex flex-col">
                  <div className="flex justify-between gap-2 mb-6">
                    {inputOtp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        // ref={(el) => (inputRefs.current[index] = el)}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-14 text-center text-2xl font-bold 
                             bg-transparent text-white!
                             border-b-2 border-white/60
                             focus:border-white focus:outline-none"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-white text-orange-700 
                         font-semibold py-3 hover:bg-orange-100 transition cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin inline-block" />
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* new password */}
            {isNewPassword && (
              <div className="relative">
                <h3 className="text-center text-lg font-semibold text-white mb-6!">
                  Set New Password
                </h3>

                <form
                  onSubmit={handleNewPassword}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="New Password"
                    className="rounded-xl bg-white/20 text-white!
                         placeholder-white/70 px-4 py-3
                         border border-white/30
                         focus:outline-none focus:ring-2 focus:ring-white/60"
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="Confirm New Password"
                    className="rounded-xl bg-white/20 text-white! 
                         placeholder-white/70 px-4 py-3
                         border border-white/30
                         focus:outline-none focus:ring-2 focus:ring-white/60"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-white text-orange-700 
                         font-semibold py-3 mt-4 hover:bg-orange-100 transition cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin inline-block" />
                    ) : (
                      "Update Password"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
