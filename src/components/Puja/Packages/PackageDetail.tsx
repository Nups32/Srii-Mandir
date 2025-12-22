import { useMemo } from "react";
import OfferingItem from "./ItemOffering";
import BottomBar from "./BottomAmount";
import { packages } from "../../../../details";
import SelectedPackage from "./SelectedPackage";
import { useCart } from "@/components/Puja/Packages/PackageContext";

export default function PackageDetail() {
  const {
    selectedPackage,
    cart,
    addItem,
    // updateQty,
  } = useCart();

  const items = Object.values(cart);

  const totalAmount = useMemo(() => {
    const offeringsTotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    return offeringsTotal + (selectedPackage?.price ?? 0);
  }, [items, selectedPackage]);

  const bottomLabel = useMemo(() => {
    if (items.length === 1) {
      return items[0].name;
    }
    if (items.length > 1) {
      return `${items.length} Offerings Selected`;
    }
    return selectedPackage ? selectedPackage.title : "";
  }, [items, selectedPackage]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="">
            <SelectedPackage />
          </div>

          {/* RIGHT */}
          <div className="">
            <OfferingItem
              offers={packages.offering}
              cart={cart}
              onAdd={addItem}
            />
          </div>
        </div>

        {/* BOTTOM BAR */}
        <BottomBar
          visible={!!selectedPackage || items.length > 0}
          total={totalAmount}
          packageName={bottomLabel}
        />
      </div>
    </div>
  );
}
