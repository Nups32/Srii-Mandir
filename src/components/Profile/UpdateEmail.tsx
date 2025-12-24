/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import { updateEmail } from "@/utils/API";
import { useRef, useState } from "react";

export default function UpdateEmail() {
  const [newEmail, setNewEmail] = useState("");
  const [isOTPVerification, setIsOTPVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const otpLength = 4;
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  //   const handleSubmit = async (values: any) => {
  //     setIsUpdating(true);
  //     try {
  //       const formData = { email: values.newEmail };
  //       setNewEmail(values.newEmail);
  //       const response = await updateEmail(formData);

  //       // if (response) {
  //       //   message.success("Verification email sent successfully!");
  //       //   emailForm.resetFields();
  //       // }

  //       if (response.status == 200) {
  //         message.success("OTP sent to your new email!");
  //         setOtpSent(true);
  //         setUser((prev) => ({ ...prev, otp: true, newEmail: newEmail }));
  //       } else {
  //         message.error(
  //           response?.data?.error ||
  //             response?.data?.message ||
  //             "Failed to send OTP"
  //         );
  //       }
  //     } catch (error: any) {
  //       message.error(
  //         error.response?.data?.error || error.message || "Failed to send OTP"
  //       );
  //     } finally {
  //       setIsUpdating(false);
  //     }
  //   };

  //   const onVerifyOTP = async (values: any) => {
  //     setIsUpdating(true);
  //     try {
  //       const enteredOtp = Object.values(values).join("");
  //       const formData = { otp: enteredOtp, email: newEmail };

  //       const response = await updateEmail(formData);
  //       if (
  //         response?.data?.updatedUser ||
  //         response?.data?.message?.includes("successfully")
  //       ) {
  //         message.success("Email updated successfully!");
  //         setUser((prev: any) => ({
  //           ...prev,
  //           otp: false,
  //           email: response?.data?.updatedUser?.email || prev.newEmail,
  //           newEmail: "",
  //         }));

  //         form.setFieldsValue({
  //           email: response?.data?.updatedUser?.email || user.newEmail,
  //         });
  //         emailForm.resetFields();
  //         setOtpSent(false);
  //         setNewEmail("");
  //       } else {
  //         message.warning("Invalid OTP or verification failed.");
  //       }
  //     } catch (error: any) {
  //       message.error(
  //         error.response?.data?.error || error.message || "Failed to verify OTP"
  //       );
  //     } finally {
  //       setIsUpdating(false);
  //     }
  //   };

  //   const handleChange = (element: HTMLInputElement, index: number) => {
  //     if (isNaN(Number(element.value))) return false;

  //     const newOtp = [...inputOtp];
  //     newOtp[index] = element.value;
  //     setInputOtp(newOtp);

  //     // focus next input
  //     if (element.nextSibling && element.value) {
  //       (element.nextSibling as HTMLInputElement).focus();
  //     }
  //   };

  //   const handleKeyDown = (
  //     e: React.KeyboardEvent<HTMLInputElement>,
  //     index: number
  //   ) => {
  //     if (
  //       e.key === "Backspace" &&
  //       !inputOtp[index] &&
  //       inputRefs.current[index - 1]
  //     ) {
  //       inputRefs.current[index - 1]?.focus();
  //     }
  //   };

  //   const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     try {
  //       e.preventDefault();
  //       setIsLoading(true);

  //       const enteredOtp = inputOtp.join("");
  //       if (inputOtp.some((digit) => digit === "")) {
  //         message.error("Please enter OTP");
  //         setIsLoading(false);
  //         return;
  //       }
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       const { confirmPassword, ...data } = userData as any;
  //       const res: any = await registerUser({ ...data, otp: enteredOtp });

  //       if (res && res.status) {
  //         setIsLoading(false);
  //         // setAuthData({ token: res?.token, userdata: res?.userData });
  //         const authData = {
  //           token: res.token,
  //           ...res.userData,
  //         };
  //         dispatch(setUserConfig(authData));
  //         // localStorage.setItem("token", res?.token);

  //         message.success("Register Successful");
  //         navigate("/");
  //       } else {
  //         setIsLoading(false);
  //         message.error(res.error || "Server Error");
  //       }
  //     } catch (error: any) {
  //       setIsLoading(false);
  //       message.error(error?.response?.data?.error || "Server Error");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res: any = await updateEmail({ email: newEmail });

      if (res?.status === 200) {
        message.success("OTP sent to your new email");
        setIsOTPVerification(true);
      } else {
        message.error(res?.data?.message || "Failed to send OTP");
      }
    } catch (err: any) {
      message.error(err?.response?.data?.error || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next input
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some((d) => d === "")) {
      message.error("Please enter complete OTP");
      return;
    }

    setIsLoading(true);

    try {
      const res: any = await updateEmail({
        email: newEmail,
        otp: otp.join(""),
      });

      if (res?.status === 200) {
        message.success("Email updated successfully");
        setIsOTPVerification(false);
        setNewEmail("");
        setOtp(["", "", "", ""]);
      } else {
        message.error("OTP not matched");
      }
    } catch (err: any) {
      message.error(err?.response?.data?.error || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center flex-col">
        {!isOTPVerification && (
          <form
            onSubmit={handleSendOtp}
            className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-5"
          >
            <div className="text-center">
              <p className="text-sm text-gray-500 mt-1">
                We will send an OTP to verify your new email
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                New Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="example@email.com"
                className=" w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-500 mt-5! px-6 py-2  hover:bg-green-600 rounded text-white! text-lg font-semibold transition-colors duration-200 cursor-pointer "
              >
                {isLoading && (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isLoading ? "Sending OTP..." : "Update Email"}
              </button>
            </div>
          </form>
        )}

        {isOTPVerification && (
          <form
            onSubmit={handleVerifyOtp}
            className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Verify OTP
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter the 4-digit OTP sent to your email
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {(inputRefs.current[index] = el)}}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  className=" w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition "
                />
              ))}
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-500 mt-5! px-6 py-2  hover:bg-green-600 rounded text-white! text-lg font-semibold transition-colors duration-200 cursor-pointer "
              >
                {isLoading && (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>

            {/* Resend */}
            <p className="text-sm text-center text-gray-600">
              Didn't receive OTP?{" "}
              <span
                className="text-green-600 font-semibold cursor-pointer hover:underline"
                onClick={handleSendOtp}
              >
                Resend
              </span>
            </p>
          </form>
        )}
      </section>
    </>
  );
}
