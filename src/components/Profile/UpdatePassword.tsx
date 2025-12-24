import { updatePassword } from "@/utils/API";
import { message } from "antd";
import React, { useState } from "react";

const initialUserData = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const passwordFields = [
  {
    name: "oldPassword",
    label: "Old Password",
    type: "password",
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
  },
  {
    name: "confirmNewPassword",
    label: "Confirm New Password",
    type: "password",
  },
];

export default function UpdatePassword() {
  const [formData, setFormData] = useState(initialUserData);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const res = await updatePassword(formData);

    if (res.status === 200) {
      setFormData(initialUserData);
      message.success("Password updated successfully");
    } else {
      message.error("Error while updating password");
    }
  };

  return (
    <section className="flex justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-gray-200 shadow-xl rounded-2xl p-4 mb-8"
      >
        <div className="space-y-4">
          {passwordFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {field.label} <span className="text-red-500">*</span>
              </label>

              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof typeof initialUserData]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {field.name === "confirmNewPassword" && passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-green-500 mt-5! px-6 py-2  hover:bg-green-600 rounded text-white! text-lg font-semibold transition-colors duration-200 cursor-pointer "
          >
            Update Password
          </button>
        </div>
      </form>
    </section>
  );
}
