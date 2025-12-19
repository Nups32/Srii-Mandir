export default function SectionTitle({ title, badge }: any) {
  return (
    <div className="flex items-center justify-between my-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        {title}
      </h2>
      <span className="text-sm px-4 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
        {badge}
      </span>
    </div>
  );
}
