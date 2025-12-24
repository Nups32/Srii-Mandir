import { logoutUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    onClose();
    setTimeout(() => navigate("/"), 0);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-xl mb-5 text-white">
          Are you sure you want to logout?
        </h2>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-orange-500 text-white! rounded hover:bg-orange-600 transition cursor-pointer"
          >
            Logout
          </button>

          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
