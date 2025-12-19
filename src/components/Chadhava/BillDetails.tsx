type CartItem = {
  qty: number;
  name: string;
  price: number;
};

type Props = {
  cart: Record<string, CartItem>;
  totalAmount: number;
};

export default function BillDetails({ cart, totalAmount }: Props) {
  return (
    <div className="bg-white border rounded-xl p-5 space-y-3">
      <h3 className="font-semibold">Bill details</h3>

      {Object.entries(cart).map(([id, item]) => (
        <div key={id} className="flex justify-between text-sm">
          <span>{item.name}</span>
          <span>₹{item.qty * item.price}</span>
        </div>
      ))}

      <div className="border-t pt-2 flex justify-between font-semibold">
        <span>Total Amount</span>
        <span>₹{totalAmount}</span>
      </div>
    </div>
  );
}
