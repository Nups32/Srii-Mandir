type Address = {
  pincode: string;
  city: string;
  state: string;
  house: string;
  road: string;
  landmark: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  data: {
    members: string[];
    gotra: string;
    whatsapp: string;
    callingNumber: string;
    address?: Address | null;
  };
};

export default function ConfirmDetailsModal({
  open,
  onClose,
  data,
}: Props) {
  if (!open) return null;

  const { members, gotra, whatsapp, callingNumber, address } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your details</h2>
          <button onClick={onClose} className="text-xl">
            ×
          </button>
        </div>

        {/* Members */}
        <div className="mb-4">
          <h3 className="font-semibold">Members participating in the puja</h3>
          <p className="text-sm text-gray-500 mb-2">
            Panditji will take these names along with gotra during the puja.
          </p>

          <ol className="list-decimal pl-5 space-y-1">
            {members.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ol>
        </div>

        <hr className="my-3" />

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Gotra</span>
            <span className="font-medium">{gotra}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Phone Number</span>
            <span className="font-medium">{callingNumber}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">WhatsApp Number</span>
            <span className="font-medium">{whatsapp}</span>
          </div>
        </div>

        {/* Address */}
        {address && (
          <>
            <hr className="my-3" />
            <div>
              <h3 className="font-semibold mb-1">
                Address for Aashirwad Box delivery
              </h3>
              <p className="text-sm text-gray-700">
                {address.house}, {address.road}, {address.landmark},{" "}
                {address.city}, {address.state} – {address.pincode}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
