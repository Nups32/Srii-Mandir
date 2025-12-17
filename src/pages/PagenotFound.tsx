import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] text-center">
      <h1 className="text-6xl font-bold mb-4 text-red-400">404</h1>

      <h2 className="text-2xl font-semibold mb-2 text-gray-400">Page Not Found</h2>

      <p className="mb-6 text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>

      <button
        onClick={handleGoHome}
        className="rounded-3xl bg-blue-500 text-white! hover:bg-blue-600 transition px-4! py-2! cursor-pointer"
      >
        Go Home
      </button>
    </div>
  );
}

export default PageNotFound;
