import { useEffect, useMemo } from "react";
import OfferingItem from "./ItemOffering";
import BottomBar from "./BottomAmount";
import SelectedPackage from "./SelectedPackage";
import { useCart } from "@/components/Puja/Packages/PackageContext";
import { useLocation } from "react-router-dom";

export default function PackageDetail() {
  const location = useLocation();
  const {
    selectedPackage,
    setSelectedPackage,
    cart,
    addItem,
    // updateQty,
  } = useCart();

  const items = Object.values(cart);
  // const [offerings, setOfferings] = useState([]);
  useEffect(() => {
    if(!selectedPackage){
      setSelectedPackage(location.state.package)
    }
    // // if(offerings.length < 0){
    //   setOfferings(location.state.pooja.offering)
    // // }
  }, [location]);

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
              offers={location.state.pooja.offering}
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
          data={{package: location.state.package, pooja: location.state.pooja, cartDate: cart}}
        />
      </div>
    </div>
  );
}
