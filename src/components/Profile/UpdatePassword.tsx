import { message } from "antd";

export default function UpdatePassword() {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    message.success("Email updated.");
  };

  return (
    <>
      <section className="flex justify-center items-center flex-col">
        <form
          onSubmit={handleSubmit}
          className="max-w-md bg-white border rounded-2xl p-6 shadow"
        >
          <div className="space-y-4">
            <div>
              <label className="text-gray-500">Current Password</label>
              <input
                type="password"
                required
                className="w-full p-2 border rounded-xl"
              />
            </div>

            <div>
              <label className="text-gray-500">New Password</label>
              <input
                type="password"
                required
                className="w-full p-2 border rounded-xl"
              />
            </div>

            <div>
              <label className="text-gray-500">Confirm New Password</label>
              <input
                type="password"
                required
                className="w-full p-2 border rounded-xl"
              />
            </div>
          </div>
        </form>
        <button
          type="submit"
          className="bg-green-500 mt-5! px-6 py-2  hover:bg-green-600 rounded text-white! text-lg font-semibold transition-colors duration-200 cursor-pointer "
        >
          Update Password
        </button>
      </section>
    </>
  );
}
