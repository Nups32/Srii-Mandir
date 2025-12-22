import { useState, useRef, useEffect } from "react";
import ConfirmDetailsModal from "./ConfirmDetailsModal";

type Address = {
  pincode: string;
  city: string;
  state: string;
  house: string;
  road: string;
  landmark: string;
};

const GOTRAS = [
  "Bharadwaja",
  "Kashyap",
  "Atri",
  "Vashishta",
  "Gautam",
  "Jamadagni",
  "Kaushik",
];

export default function PujaDetailsForm({ data }: any) {

  const [whatsapp, setWhatsapp] = useState("+91");
  const [alternateCalling, setAlternateCalling] = useState(false);
  const [callingNumber, setCallingNumber] = useState("");

  const participantCount = Number(data?.person) || 1;

  const [members, setMembers] = useState<string[]>(
    () => Array(participantCount).fill("")
  );

  // Sync members if person count changes
  useEffect(() => {
    setMembers((prev) => {
      if (prev.length === participantCount) return prev;

      if (prev.length < participantCount) {
        return prev.concat(
          Array(participantCount - prev.length).fill("")
        );
      }

      return prev.slice(0, participantCount);
    });
  }, [participantCount]);

  const [gotra, setGotra] = useState("");
  const [unknownGotra, setUnknownGotra] = useState(false);
  const [showGotraList, setShowGotraList] = useState(false);
  const gotraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        gotraRef.current &&
        !gotraRef.current.contains(event.target as Node)
      ) {
        setShowGotraList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [aashirwad, setAashirwad] = useState<"yes" | "no" | null>(null);

  const [address, setAddress] = useState<Address>({
    pincode: "",
    city: "",
    state: "",
    house: "",
    road: "",
    landmark: "",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleMemberChange = (index: number, value: string) => {
    setMembers((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const updateAddress = (key: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [key]: value }));
  };

  const handleUnknownGotraChange = (checked: boolean) => {
    setUnknownGotra(checked);
    setGotra(checked ? "Kashyap" : "");
    setShowGotraList(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  /* ---------------- UI ---------------- */

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border p-6 space-y-8"
    >
      {/* WhatsApp */}
      <section>
        <h2 className="text-lg font-semibold mb-1">
          Your WhatsApp Number
        </h2>
        <p className="text-sm text-gray-500 mb-3">
          Puja updates will be sent on this number
        </p>

        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-2 bg-gray-50"
        />

        <label className="flex items-center gap-2 my-5 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={alternateCalling}
            onChange={(e) =>
              setAlternateCalling(e.target.checked)
            }
          />
          I have a different number for calling
        </label>

        {alternateCalling && (
          <input
            type="tel"
            placeholder="Enter calling number"
            value={callingNumber}
            onChange={(e) =>
              setCallingNumber(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-2"
          />
        )}
      </section>

      <hr />

      {/* Members */}
      <section>
        <h2 className="text-lg font-semibold mb-1">
          Name of members participating in Puja
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {members.map((value, index) => (
            <input
              key={index}
              value={value}
              onChange={(e) =>
                handleMemberChange(index, e.target.value)
              }
              placeholder={`Member ${index + 1} Name`}
              className="border rounded-lg px-4 py-2"
              required
            />
          ))}
        </div>
      </section>

      <hr />

      {/* Gotra */}
      <section ref={gotraRef} className="relative">
        <h2 className="text-lg font-semibold mb-1">
          Fill participant's gotra
        </h2>

        <input
          value={gotra}
          disabled={unknownGotra}
          onFocus={() =>
            !unknownGotra && setShowGotraList(true)
          }
          onChange={(e) => setGotra(e.target.value)}
          placeholder="Enter your Gotra"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        {showGotraList && !unknownGotra && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow">
            {GOTRAS.map((g) => (
              <div
                key={g}
                onClick={() => {
                  setGotra(g);
                  setShowGotraList(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {g}
              </div>
            ))}
          </div>
        )}

        <label className="flex items-center gap-2 mt-3 text-sm">
          <input
            type="checkbox"
            checked={unknownGotra}
            onChange={(e) =>
              handleUnknownGotraChange(e.target.checked)
            }
          />
          I do not know gotra
        </label>
      </section>

      <hr />

      {/* Aashirwad */}
      <section>
        <h2 className="text-lg font-semibold mb-3">
          Would you like to receive the Aashirwad box?
        </h2>

        <div className="flex gap-2">
          {["yes", "no"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() =>
                setAashirwad(v as "yes" | "no")
              }
              className={`px-4 py-2 rounded-lg border ${
                aashirwad === v
                  ? "bg-green-700 text-white"
                  : ""
              }`}
            >
              {v === "yes" ? "Yes" : "No"}
            </button>
          ))}
        </div>

        {aashirwad === "yes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {Object.keys(address).map((k) => (
              <input
                key={k}
                placeholder={`${k} (Compulsory)`}
                value={address[k as keyof Address]}
                onChange={(e) =>
                  updateAddress(
                    k as keyof Address,
                    e.target.value
                  )
                }
                className="border rounded-lg px-4 py-2"
              />
            ))}
          </div>
        )}
      </section>

      <button
        type="submit"
        disabled={!aashirwad}
        className={`w-full py-3 rounded-lg font-semibold text-white ${
          aashirwad ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        Proceed to book
      </button>

      <ConfirmDetailsModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => setShowConfirmModal(false)}
        data={{
          whatsapp,
          callingNumber: alternateCalling
            ? callingNumber
            : whatsapp,
          members: members.filter(Boolean),
          gotra,
          // aashirwad,
          address:
            aashirwad === "yes" ? address : null,
        }}
      />
    </form>
  );
}
