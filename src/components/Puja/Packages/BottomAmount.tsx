type Props = {
  total: number;
  packageName: string;
  visible: boolean;
};

export default function BottomBar({ total, packageName, visible }: Props) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-green-700 text-white px-6 py-4 rounded-2xl flex justify-between items-center shadow-lg">
      <div>
        <p className="font-semibold">₹ {total}</p>
        <p className="text-sm">{packageName}</p>
      </div>

      <button className="font-semibold">Continue →</button>
    </div>
  );
}
