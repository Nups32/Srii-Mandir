/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { editUserData, updateUserData } from "@/utils/API";
import { MoveLeft } from "lucide-react";
import type { UserType } from "./ManageUsers";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
// import { toast } from "@/utils/ui/toast";

function EditUser() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [userFormData, setUserFormData] = useState<UserType>({
    username: "",
    email: "",
    phone: 0,
    compnay: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: 0,
    isActive: true,
    isDeleted: false,
    newsletter: true,
    fax: 0,
    info: "",
  });

  const userDataField = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    { name: "company", label: "Company Name", type: "text" },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "address", label: "Street Address", type: "text" },
    { name: "city", label: "City", type: "text", required: true },
    { name: "pincode", label: "Zip Code", type: "text" },
    { name: "state", label: "State", type: "text" },
    {
      name: "country",
      label: "Country",
      type: "select",
      required: true,
    },
    { name: "fax", label: "Fax", type: "text" },
    {
      name: "info",
      label: "Please provide info on the solution you seek",
      type: "textarea",
    },
    {
      name: "isActive",
      label: "Active",
      type: "radio",
      required: true,
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await editUserData(id);
      setUserFormData(response.data);
      // setSeclectedCountry(response.data);
    };
    fetchUsers();
  }, [id]);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateUserData(id, userFormData);

      if (response.status == 200) {
        message.success("User data updated successfully")
        // toast("success").fire({
        //   icon: "success",
        //   title: "User data updated successfully",
        //   timer: 2000,
        //   showConfirmButton: false,
        // });
      } else {
        message.error(response.data.error || "Something went wrong!")
        // toast("error").fire({
        //   icon: "error",
        //   title: response.data.error,
        //   timer: 2000,
        //   showConfirmButton: false,
        // });
      }

      setLoading(false);
      navigate("/admin/users");
    } catch (error) {
      message.error("Server Error!")
      // toast("error").fire({
      //   icon: "error",
      //   title: error || "Something went wrong!",
      //   timer: 2000,
      //   showConfirmButton: false,
      // });
      setLoading(false);
      throw error;
    }
  };

  return (
    <>
      <div className="m-8">
        {/* above section */}
        <div className="flex flex-row justify-between">
          <span className="flex justify-start">
            <h2 className="text-white md:text-3xl ">Edit Users</h2>
          </span>

          {/* <span className="flex flex-row justify-end"> */}
            <button
              onClick={() => navigate("/admin/users")}
              className="cursor-pointer flex flex-row justify-center text-sm md:text-base items-center text-white bg-gradient-to-b from-blue-200 to-blue-600 px-2 py-1 md:px-6 md:py-2 rounded-lg hover:bg-gradient-to-t hover:from-blue-200 hover:to-blue-600"
            >
              <MoveLeft className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Back
            </button>
        </div>

        {/* below section user form */}
        <form action="" onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-1 font-md lg:grid-cols-2  mt-2 space-x-10 text-white">
            {userDataField.map((user, i) =>
              user.name === "isActive" ? (
                <div key={i} className="flex flex-row items-center my-4">
                  <div className=" w-25 md:w-50">
                    <label className="">{user.label}:</label>
                  </div>
                  <input
                    type="radio"
                    name={user.name}
                    value="true"
                    checked={userFormData.isActive}
                    onChange={() =>
                      setUserFormData((prev: any) => ({
                        ...prev,
                        isActive: true,
                      }))
                    }
                    required={user.required}
                    className="mr-2 px-3 border rounded-lg"
                  />
                  <label className="">Yes</label>
                  <input
                    type="radio"
                    value="false"
                    checked={userFormData.isActive == false}
                    name={user.name}
                    onChange={() =>
                      setUserFormData((prev: any) => ({
                        ...prev,
                        isActive: false,
                      }))
                    }
                    className="mx-2 px-3 border rounded-lg"
                  />
                  <label className="">No</label>
                </div>
              ) : user.name === "country" ? (
                <div className="flex flex-col md:flex-row my-4">
                  <div className=" w-50">
                    <label className="">{user.label}:</label>
                  </div>
                  <select
                    name={user.name}
                    value={userFormData.country}
                    onChange={(e) =>
                      setUserFormData((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                    required={user.required}
                    // className="px-2 py-2 md:pl-3 md:pr-13 md:py-3 border rounded-lg cursor-pointer"
                    className="w-3/4 md:w-2/3 xl:w-7/10 px-3 py-2 md:px-3 md:py-3 border rounded-lg cursor-pointer"
                  >
                    <option value="">Select {user.label}</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <div className="flex sm:flex-row flex-col my-4">
                    <div className="w-60 sm:my-3 my-0">
                      <label key={user.name} className="flex">
                        {user.label}:
                      </label>
                    </div>
                    <input
                      type={user.type}
                      value={String(
                        userFormData[user.name as keyof UserType] ?? ""
                      )}
                      // value={userFormData[user.name as keyof UserType]}
                      onChange={(e) =>
                        setUserFormData((prev) => ({
                          ...prev,
                          [user.name as keyof UserType]: e.target.value,
                        }))
                      }
                      required={user.required}
                      className="px-4 w-[75%] py-1 border rounded-lg"
                    />
                  </div>
                </>
              )
            )}
          </div>

          <div className="flex justify-center items-center">
            <button
              disabled={loading}
              className="mt-5 px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg hover:from-blue-600 hover:to-green-400 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin justify-center align-center inline-block" />
                </div>
              ) : (
                "Update User"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUser;
