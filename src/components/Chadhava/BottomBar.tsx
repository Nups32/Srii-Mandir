type Props = {
  count: number;
  amount: number;
};

export default function BottomBar({ count, amount }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-700 text-white px-6 py-4 flex justify-between items-center z-50">
      <span className="font-medium">
        {count} Offerings · ₹{amount}
      </span>

      <button className="font-semibold flex items-center gap-2">
        Next →
      </button>
    </div>
  );
}
