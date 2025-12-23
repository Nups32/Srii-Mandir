import { useNavigate } from "react-router-dom";

type Props = {
  total: number;
  packageName: string;
  visible: boolean;
  data: any;
};

export default function BottomBar({
  total,
  packageName,
  visible,
  data,
}: Props) {
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div
      onClick={() => navigate("/package-detail/form", { state: { data } })}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-green-700 text-white px-6 py-4 rounded-2xl flex justify-between items-center shadow-lg  cursor-pointer hover:bg-green-800"
    >
      <div>
        <p className="font-semibold">₹ {total}</p>
        <p className="text-sm">{packageName}</p>
      </div>

      <button className="font-semibold">Continue →</button>
    </div>
  );
}
