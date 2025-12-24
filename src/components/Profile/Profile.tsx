/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/utils/API";
import { message } from "antd";
import { User } from "lucide-react";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";

const initialUserData = {
  username: "",
  email: "",
  mobile: "",
  birthPlace: "",
  dob: "",
  address: "",
  city: "",
  pincode: "",
  state: "",
  country: "",
};

const accountInfoFields = [
  { name: "username", label: "User Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "mobile", label: "Phone", type: "tel", required: true },
  // { name: "birthPlace", label: "Birth Place", type: "text" },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "city", label: "City", type: "text" },
  { name: "pincode", label: "Zip Code", type: "text" },
  { name: "state", label: "State", type: "text" },
  {
    name: "country",
    label: "Country",
    type: "select",
    required: true,
  },
  { name: "address", label: "Street Address", type: "textarea" },
];

function Profile() {
  const [formData, setFormData] = useState(initialUserData);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSeclectedCountry] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [editMode, setEditMode] = useState(false);

  const getUserProfile = async () => {
    const res: any = await getProfile();
    console.log("res of use data", res.data.data);
    if (res && res.status == 200) {
      const userData = res.data.data;
      setFormData(userData);
      setSeclectedCountry(userData.country);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUserProfile();
  }, []);

  // fetch countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => res.json())
      .then((data) => {
        const countryNames = data
          .map((country: { name: { common: string } }) => country.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
        setCountries(countryNames);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setCountries([]);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateProfile(formData);
      console.log("res of update profile", res);
      if (res.status == 200) {
        message.success("Profile Updated Successfully");
      } else {
        message.error("Error while updating profile");
      }
    } catch (error: any) {
      message.error("Error:", error);
    }
  };

  type EditTab = "profile" | "email" | "password";
  const [activeTab, setActiveTab] = useState<EditTab>("profile");

  const handleEditClick = () => {
    setEditMode(true);
    setActiveTab("profile");
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    setEditMode(false);
    getUserProfile(); // Refresh data after save
  };

  const renderInputField = (field: any) => {
    const props = {
      name: field.name,
      value: formData[field.name as keyof typeof initialUserData] as string,
      onChange: handleChange,
      className: "w-full p-2 border border-gray-300 rounded-xl text-gray-600",
      required: field.required,
    };

    if (field.type === "textarea") {
      return <textarea rows={4} {...props} />;
    }

    if (field.type === "select") {
      return (
        <select
          name={field.name}
          value={selectedCountry}
          // onChange={(e) => setSeclectedCountry(e.target.value)}
          onChange={(e) => {
            const value = e.target.value;
            setSeclectedCountry(value);
            setFormData((prev) => ({
              ...prev,
              country: value,
            }));
          }}
          required={field.required}
          className="w-full p-2 border border-gray-300 rounded-xl text-gray-600 cursor-pointer"
        >
          <option value="">Select {field.label}</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "tel") {
      return (
        <div className="w-full">
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            maxLength={10}
            className=" w-full p-2 border border-gray-300 rounded-xl text-gray-600"
            required={field.required}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 0 && !/^[1-9]/.test(value)) {
                value = value.replace(/^[^1-9]+/, "");
              }
              if (value.length > 10) value = value.slice(0, 10);
              setFormData({ ...formData, mobile: value });

              if (value.length === 0) {
                setPhoneError("");
              } else if (!/^[1-9]/.test(value)) {
                setPhoneError("Phone number must start with 1-9");
              } else if (value.length !== 10) {
                setPhoneError("Phone number must be exactly 10 digits");
              } else {
                setPhoneError("");
              }
            }}
            onBlur={() => {
              if (formData.mobile.length !== 10) {
                setPhoneError("Phone number must be exactly 10 digits");
              } else if (!/^[1-9]/.test(formData.mobile)) {
                setPhoneError("Phone number must start with 6-9");
              } else {
                setPhoneError("");
              }
            }}
            pattern="[1-9][0-9]{9}"
            inputMode="numeric"
            autoComplete="tel"
          />
          {phoneError && (
            <p className="text-red-500 text-xs mt-1">{phoneError}</p>
          )}
        </div>
      );
    }

    if (field.type === "email") {
      return (
        <input
          type="email"
          {...props}
          disabled
          className="w-full p-2 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
        />
      );
    }

    return (
      <input disabled={field.type == "email"} type={field.type} {...props} />
    );
  };

  return (
    <section className=" p-4 sm:p-8 mt-16">
      <div className="max-w-3xl mx-auto">
        {/* <div className="text-center mb-8">
          <h1 className="text-3xl text-center heading leading-tight">
            Account Details
          </h1>
        </div> */}

        {/* profile */}
        {!editMode && (
          <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center gap-3">
                <span className="border border-gray-200 bg-gray-100 rounded-4xl p-2">
                  <User className="w-6 h-6" />
                </span>
                <h2 className="text-xl font-semibold text-gray-800">
                  {formData.username}
                </h2>
              </div>
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="space-y-3">
              {accountInfoFields.map((menu) => (
                <div key={menu.name} className="flex justify-between text-sm">
                  <span className="text-gray-500">{menu.label}:</span>
                  <span className="font-medium text-gray-800">
                    {formData[menu.name as keyof typeof formData] || "-"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              {!editMode ? (
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-blue-500 hover:text-white! cursor-pointer"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              ) : null}
            </div>
          </div>
        )}

        {editMode && (
          <div className="flex gap-6 border-b border-gray-300 mb-6 cursor-pointer">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`pb-2 text-sm font-semibold border-b-2 ${
                activeTab === "profile"
                  ? "border-orange-500 text-orange-600!"
                  : "border-transparent text-gray-700!"
              }`}
            >
              Update Profile
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("email")}
              className={`pb-2 text-sm font-semibold border-b-2 ${
                activeTab === "email"
                  ? "border-orange-500 text-orange-600!"
                  : "border-transparent text-gray-700!"
              }`}
            >
              Update Email
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("password")}
              className={`pb-2 text-sm font-semibold border-b-2 ${
                activeTab === "password"
                  ? "border-orange-500 text-orange-600!"
                  : "border-transparent text-gray-700!"
              }`}
            >
              Update Password
            </button>
          </div>
        )}

        {editMode && activeTab === "profile" && (
          <form onSubmit={handleSaveChanges} className="border border-gray-200 shadow-xl rounded-2xl ">
            <fieldset >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-2 p-10">
                {accountInfoFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {field.label}
                      {field.required && (
                        <span className="text-red-400 "> *</span>
                      )}
                    </label>
                    {renderInputField(field)}
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="col-span-2 flex justify-center items-center">
              <button
                type="submit"
                className="bg-green-500 mt-5! px-6 py-2 mb-4! hover:bg-green-600 rounded text-white! text-lg font-semibold transition-colors duration-200 cursor-pointer "
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {editMode && activeTab === "email" && <UpdateEmail />}

        {editMode && activeTab === "password" && <UpdatePassword />}
      </div>
    </section>
  );
}

export default Profile;
