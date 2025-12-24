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
          className="max-w-md border-[#dddada] shadow-xl rounded-2xl p-4 mb-8"
        >
          <div className="space-y-4">
            <div>
              <label className="text-gray-500 font-bold">Current Password<span className="text-red-500">*</span></label>
              <input
                type="password"
                required
                className="w-full p-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="text-gray-500 font-bold">New Password<span className="text-red-500">*</span></label>
              <input
                type="password"
                required
                className="w-full p-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="text-gray-500 font-bold">Confirm New Password<span className="text-red-500">*</span></label>
              <input
                type="password"
                required
                className="w-full p-2 border border-slate-300 rounded-xl"
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
