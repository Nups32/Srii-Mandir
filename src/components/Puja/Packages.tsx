/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRightIcon, CheckIcon } from "lucide-react";
// import { data } from "../../../details";
import { useEffect, useState } from "react";
import { getPoojaPackages } from "@/utils/API";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Puja/Packages/PackageContext";

export default function Packages({ poojaId }: any) {
  const [, setLoading] = useState(true);
  const [packages, setPackage] = useState<any>();
  const navigate = useNavigate();
  const { setSelectedPackage } = useCart();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await getPoojaPackages();
      // console.log("res of fetch package", response.data)
      if (response.data.status) {
        setPackage(response.data.data);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <section id="packages" className=" py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8!">
          Puja Packages
        </h2>

        {/* Packages Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left!">
          {packages?.map((pkg: any) => (
            <div
              key={pkg?._id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Package Header */}
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2!">
                  {pkg?.title}
                </h3>
                <p className="text-gray-500 mb-4">{pkg?.person}</p>
                <p className="text-2xl font-bold text-orange-600 mb-6!">
                  ₹{pkg?.price}
                </p>

                {/* Services List */}
                <ul className="text-gray-600 mb-6! space-y-3">
                  {pkg?.services.map((service: any, index: any) => (
                    <li
                      key={index}
                      className="flex items-start! justify-start! gap-3"
                    >
                      <CheckIcon className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                      <p className="leading-relaxed w-full text-left">
                        {service}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Participate Button */}
              <button
                onClick={() => {
                  setSelectedPackage(pkg);
                  navigate("/package-detail", {state: { poojaId, package: pkg }});
                }}
                className="mt-auto bg-orange-600 text-white! font-semibold px-6 py-3 rounded-xl w-full flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors duration-300 cursor-pointer"
              >
                Book Now
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
