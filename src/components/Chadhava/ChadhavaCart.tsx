import ReviewBooking from "./ReviewBooking";
import AdditionalOffers from "./AdditionalOffers";
import BottomBar from "./BottomBar";
import { useCart } from "./CartContext";

export default function ChadhavaCart() {
  const { cart, addOrUpdateItem } = useCart();

  const totalCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <section className="min-h-screen bg-gray-50 pb-24 px-4">
      {/* <div className="max-w-3xl mx-auto space-y-6 pt-6"> */}
      <div className="max-w-7xl mx-auto pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <ReviewBooking updateQty={updateQty} /> */}
        <div>
           <ReviewBooking cart={cart} updateQty={(id, delta) => addOrUpdateItem({ ...cart[id], id }, delta)} />
        </div>
        {/* <BillDetails cart={cart} totalAmount={totalAmount} /> */}
        <div>
          {/* <AdditionalOffers onAdd={(offer) => addOffer(offer.id, offer)} /> */}
           <AdditionalOffers cart={cart} onAdd={(offer) => addOrUpdateItem({
          ...offer,
          qty: 0
        })} />
        </div>

        {/* <ReviewBooking cart={cart} updateQty={(id, delta) => addOrUpdateItem({ ...cart[id], id }, delta)} />
        <AdditionalOffers cart={cart} onAdd={(offer) => addOrUpdateItem({
          ...offer,
          qty: 0
        })} /> */}
      </div>
      {totalCount > 0 && <BottomBar count={totalCount} amount={totalAmount} />}
    </section>
  );
}
