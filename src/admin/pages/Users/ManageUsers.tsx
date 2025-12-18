/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { useEffect, useReducer, useState } from "react";
import { deleteUserData, getUserData, updateUserData } from "@/utils/API";
import { ChevronLeft, ChevronRight, SquarePen, Trash2 } from "lucide-react";
import FilterData from "./FilterData";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export interface UserType {
  // [key: string]: string;
  _id?: string;
  username: string;
  email: string;
  phone: number;
  compnay: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  isActive: boolean;
  isDeleted: boolean;
  newsletter: boolean;
  fax: number;
  info: string;
}

export interface State {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  total: number;
}

type ToggleSwitchProps = {
  type: "isActive" | "isDeleted";
  value: boolean;
  id: string;
};


export type Action =
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_TOTALS"; totalPages: number; total: number };

export const initialState: State = {
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 1,
  total: 0,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "SET_TOTALS":
      return { ...state, totalPages: action.totalPages, total: action.total };
    default:
      return state;
  }
}

function ManageUsers() {
  const [userData, setUserData] = useState<UserType[]>([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const tableHeadings = [
    "Username",
    "Email",
    "Contact Number",
    "Country",
    "is Active",
    "is Deleted",
  ];

  const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ type, value, id }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <label
          style={{
            position: 'relative',
            display: 'inline-block',
            width: 40,
            height: 22,
            backgroundColor: value ? '#001529' : '#f0f0f0',
            borderRadius: 13,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            boxShadow: value
              ? 'inset 0 0 0 2px #001529'
              : 'inset 0 0 0 1px #ccc',
          }}
        >
          <input
            type="checkbox"
            checked={value}
            onChange={() => handleToggleStatus(id, value, type)}
            style={{ display: 'none' }}
          />
          <span
            style={{
              position: 'absolute',
              width: 21,
              height: 19,
              left: value ? 'calc(99% - 21px)' : 2,
              top: 1,
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              transition: 'left 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 'bold',
              color: value ? '#001529' : '#666',
            }}
          >
            {value ? 'ON' : 'OFF'}
          </span>
        </label>
      </div>
    );
  };


  useEffect(() => {
    dispatch({ type: "SET_PAGE", page: 1 });
  }, [state.totalPages]);

  const handlePageChange = (page: number) => {
    dispatch({ type: "SET_PAGE", page: page });
  };

  const handlePreviousPage = () => {
    if (state.currentPage > 1) {
      dispatch({ type: "SET_PAGE", page: state.currentPage - 1 });
    }
  };

  const handleNextPage = () => {
    if (state.currentPage < state.totalPages) {
      dispatch({ type: "SET_PAGE", page: state.currentPage + 1 });
    }
  };

  const fetchUsers = async () => {
    const data = {
      page: state.currentPage,
      search: search,
      status: status,
    };

    const res: any = await getUserData(data);
    if (res && res.status == 200) {
      const users = res.data.users;
      setUserData(users);
      dispatch({
        type: "SET_TOTALS",
        totalPages: res.data.totalPages,
        total: res.data.total,
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [state.currentPage, search, status]);

  const handleEdit = (user: any) => {
    navigate(`/admin/user/${user._id}/edit`);
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean, type: "isActive" | "isDeleted") => {
    try {
      const newStatus = !currentStatus;
      const formData = new FormData();
      // formData.append("id", id);
      formData.append("isActive", String(newStatus)); //  Ensure isActive is explicitly sent

      const res = await updateUserData(id, { isActive: newStatus }); //  Send proper payload
      if (res.data?.success) {
        message.success(`Employee ${newStatus ? "Activated" : "Deactivated"} successfully!`);
        setUserData((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, [type]: newStatus } : user
          )
        );
      } else {
        message.error("Failed to update status.");
      }

      // setFilteredData((prev) =>
      //   prev.map((role) =>
      //     role._id === developerId ? { ...role, isActive: newStatus } : role
      //   )
      // );
    } catch (error) {
      console.error("Error updating role status:", error);
      message.error("Failed to update role status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      await deleteUserData(id);
      await fetchUsers();
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="overflow-y-auto">
        <FilterData
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />
        <div className="flex my-4 mx-2  border-white border-collapse justify-center overflow-hidden">
          <div className="overflow-x-auto w-full rounded-2xl bg-gray-800 shadow-lg">
            {/* <div className=" shadow-lg bg-gray-800"> */}
            <table className="w-full  rounded-2xl">
              <thead>
                <tr className="bg-orange-400 text-white text-sm">
                  {tableHeadings.map((hd) => (
                    <th
                      key={hd}
                      className="px-6 py-4 text-center font-semibold tracking-wider"
                    >
                      {hd}
                    </th>
                  ))}
                  <th className="col-span-2 px-6 py-4 text-left font-semibold tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(userData) &&
                  userData.map((user, i) => (
                    <tr
                      key={user.email || i}
                      className={`${i % 2 === 0
                        ? "bg-gray-900 hover:bg-gray-700 transition-colors"
                        : "bg-gray-800 hover:bg-gray-700 transition-colors"
                        }
                          ${user.isDeleted ? "text-red-300" : "text-white"}`}
                    >
                      <td className=" px-6 py-3 rounded-l-2xl">
                        {user.username}
                      </td>
                      <td className=" whitespace-nowrap px-5 py-3">
                        {user.email}
                      </td>
                      <td className=" whitespace-nowrap px-5 py-3">
                        {user.phone}
                      </td>
                      <td className=" whitespace-nowrap px-5 py-3">
                        {user.country}
                      </td>
                      <td className=" whitespace-nowrap px-5 py-3">
                        {/* {user.isActive ? "Yes" : "No"} */}
                        <ToggleSwitch type="isActive" value={user.isActive} id={user._id!} />
                      </td>
                      <td className=" whitespace-nowrap px-5 py-3">
                        {/* {user.isDeleted ? "Yes" : "No"} */}
                        <ToggleSwitch type="isDeleted" value={user.isDeleted} id={user._id!} />
                      </td>
                      <td className="px-2 py-3 flex flex-row  ">
                        <button
                          className="  whitespace-nowrap px-4 py-1 rounded-lg shadow hover:text-blue-500 cursor-pointer"
                          onClick={() => handleEdit(user)}
                        >
                          <SquarePen className="w-5 h-5" />
                        </button>
                        <button
                          className="  px-4 py-1 rounded-lg shadow hover:text-red-400 cursor-pointer"
                          onClick={() => user._id && handleDelete(user._id)}
                        >
                          {!user.isDeleted && (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* </div> */}
          </div>
        </div>

        {/* pagination */}
        {userData.length > 0 && (
          <div className="custom-shadow rounded-lg shadow-sm border mt-6 overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="text-sm text-gray-300 mr-6">
                Showing {(state.currentPage - 1) * state.itemsPerPage + 1} to{" "}
                {(state.currentPage - 1) * state.itemsPerPage + userData.length}{" "}
                of {state.total} results
              </div>
              <div className="flex items-center space-x-2">
                {/* prev button */}
                <button
                  onClick={handlePreviousPage}
                  disabled={state.currentPage === 1}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${state.currentPage === 1
                    ? "text-white! cursor-not-allowed bg-orange-400"
                    : "text-white bg-orange-400 hover:bg-orange-500 cursor-pointer"
                    }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* page numbers */}
                <div className="flex items-center space-x-1 mr-0">
                  {Array.from(
                    { length: state.totalPages || 1 },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${state.currentPage === page
                        ? "text-white! bg-gray-700"
                        : "text-white! bg-orange-700 hover:bg-orange-600 cursor-pointer"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* next button */}
                <button
                  onClick={handleNextPage}
                  disabled={state.currentPage === state.totalPages}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${state.currentPage === state.totalPages
                    ? "text-gray-500 cursor-not-allowed bg-orange-400"
                    : "text-white bg-orange-400! hover:bg-orange-500! cursor-pointer"
                    }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default ManageUsers;
