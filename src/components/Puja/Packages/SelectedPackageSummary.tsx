// import { useCart } from "@/components/Puja/Packages/PackageContext";

export default function SelectedPackageSummary({ packageData }: any) {
  // const { selectedPackage } = useCart();

  // if (!selectedPackage) return null;

  return (
    <div className="bg-white border rounded-xl p-5 sticky top-6">
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">
            {packageData?.title}
          </h3>
          <p className="text-sm text-gray-500">
            {packageData?.person}
          </p>
        </div>

        <p className="font-semibold text-lg">
          ₹ {packageData?.price}
        </p>
      </div>

      {/* <hr className="my-4" /> */}
    </div>
  );
}
