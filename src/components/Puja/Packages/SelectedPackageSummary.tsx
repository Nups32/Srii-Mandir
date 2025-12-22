import { useCart } from "@/components/Puja/Packages/PackageContext";

export default function SelectedPackageSummary() {
  const { selectedPackage } = useCart();

  if (!selectedPackage) return null;

  return (
    <div className="bg-white border rounded-xl p-5 sticky top-6">
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">
            {selectedPackage.title}
          </h3>
          <p className="text-sm text-gray-500">
            {selectedPackage.person}
          </p>
        </div>

        <p className="font-semibold text-lg">
          ₹ {selectedPackage.price}
        </p>
      </div>

      {/* <hr className="my-4" /> */}
    </div>
  );
}
