/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";

function FilterData({search, setSearch, status, setStatus}: any) {

  return (
    <div className=" flex lg:justify-center lg:items-center my-8">
      <div className=" flex md:flex-row flex-col">
        <div className=" flex md:flex-row flex-col mb-7">
          {/* search */}
          <div className="flex-1 mx-4">
            <div className="relative flex group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" pl-10 pr-4 py-2 italic text-gray-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>

        </div>

        {/* filter active accounts */}
        <div className="felx flex-row ">
          <select onChange={(e) => setStatus(e.target.value)} className="flex-1 rounded-lg border border-green-400 text-white px-4 ml-2 py-2  cursor-pointer">
            <option
              selected={status == "all"}
              value="all"
              className="bg-gradient-to-l text-white from-green-300 via-teal-400 to-blue-400  rounded-lg py-px-4 mx-4 hover:bg-gradient-to-r hover:from-green-300 hover:via-teal-400 hover:to-blue-400 cursor-pointer"
            >
              All
            </option>
            <option
              selected={status == "delete"}
              value="delete"
              className="bg-gradient-to-l text-white from-green-300 via-teal-400 to-blue-400  rounded-lg py-2 px-4 mx-4 hover:bg-gradient-to-r hover:from-green-300 hover:via-teal-400 hover:to-blue-400 cursor-pointer"
            >
              Deleted Accounts
            </option>
            <option
              selected={status == "inactive"}
              value="inactive"
              className="bg-gradient-to-l text-white from-green-300 via-teal-400 to-blue-400  rounded-lg py-2 px-4 mx-4 hover:bg-gradient-to-r hover:from-green-300 hover:via-teal-400 hover:to-blue-400 cursor-pointer"
            >
              Inactive Accounts
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterData;
