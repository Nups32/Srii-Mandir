import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  badge?: string;
  viewAllPath?: string;
  showViewAll?: boolean;
};

export default function SectionTitle({
  title,
  badge,
  viewAllPath,
  showViewAll = true,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between my-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

      <div className="flex items-center gap-3">
        {badge && (
          <span className="text-sm px-4 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
            {badge}
          </span>
        )}

        {showViewAll && viewAllPath && (
          <span
            onClick={() => navigate(viewAllPath)}
            className="text-sm px-4 py-1 rounded-full text-orange-500 hover:underline font-medium cursor-pointer"
          >
            View All -&gt;
          </span>
        )}
      </div>
    </div>
  );
}
