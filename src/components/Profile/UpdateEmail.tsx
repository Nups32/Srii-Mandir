import { message } from "antd";

export default function UpdateEmail() {
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
            {/* <div>
                <label className="text-gray-500">Current Email</label>
                <input
                //   value={formData.email}
                //   disabled
                  className="w-full p-2 border rounded-xl bg-gray-100"
                />
              </div> */}

            <div>
              <label className="text-gray-500">New Email</label>
              <input
                type="email"
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
          Update Email
        </button>
      </section>
    </>
  );
}
