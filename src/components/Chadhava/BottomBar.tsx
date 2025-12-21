type Props = {
  handlePayment: any;
  count: number;
  amount: number;
};

export default function BottomBar({ handlePayment, count, amount }: Props) {
  return (
    <div className="fixed bottom-10 left-5 right-5 rounded-2xl bg-green-700 hover:bg-green-800 text-white px-6 py-4 flex justify-between items-center z-50 cursor-pointer">
      <span className="font-medium">
        {count} Offerings · ₹{amount}
      </span>

      <button onClick={handlePayment} className="font-semibold flex items-center gap-2 cursor-pointer">
        Next →
      </button>
    </div>
  );
}
