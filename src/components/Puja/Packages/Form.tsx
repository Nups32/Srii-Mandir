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

export default function PujaDetailsForm() {
  const [whatsapp, setWhatsapp] = useState("+91");
  const [alternateCalling, setAlternateCalling] = useState(false);
  const [callingNumber, setCallingNumber] = useState("");

  const [members, setMembers] = useState(["", "", "", ""]);

  const [gotra, setGotra] = useState("");
  const [unknownGotra, setUnknownGotra] = useState(false);
  const [showGotraList, setShowGotraList] = useState(false);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleMemberChange(index: number, value: string) {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  }

  function updateAddress(key: keyof Address, value: string) {
    setAddress((prev) => ({ ...prev, [key]: value }));
  }

  function handleUnknownGotraChange(checked: boolean) {
    setUnknownGotra(checked);
    if (checked) {
      setGotra("Kashyap");
      setShowGotraList(false);
    } else {
      setGotra("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      whatsapp,
      callingNumber: alternateCalling ? callingNumber : whatsapp,
      members: members.filter(Boolean),
      gotra,
      aashirwad,
      address: aashirwad === "yes" ? address : null,
    };
    setShowConfirmModal(true);

    console.log("SUBMITTED:", payload);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border p-6 space-y-8"
    >
      {/* WhatsApp */}
      <section>
        <h2 className="text-lg font-semibold mb-1">Your WhatsApp Number</h2>
        <p className="text-sm text-gray-500 mb-3">
          Puja updates will be sent on this number
        </p>

        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 bg-gray-50"
        />

        <label className="flex items-center gap-2 my-5 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={alternateCalling}
            onChange={(e) => setAlternateCalling(e.target.checked)}
          />
          I have a different number for calling
        </label>

        {/*  SHOW EXTRA INPUT */}
        <h2 className="text-lg font-semibold mb-1">
          Enter your Calling Number
        </h2>
        {alternateCalling && (
          <input
            type="tel"
            placeholder="Enter calling number"
            value={callingNumber}
            onChange={(e) => setCallingNumber(e.target.value)}
            className="mt-3 w-full border rounded-lg px-4 py-2"
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
              onChange={(e) => handleMemberChange(index, e.target.value)}
              placeholder={`${
                ["First", "Second", "Third", "Fourth"][index]
              } Member Name`}
              className="border rounded-lg px-4 py-2"
            />
          ))}
        </div>
      </section>

      <hr />

      {/* GOTRA */}
      <section ref={gotraRef} className="relative">
        <h2 className="text-lg font-semibold mb-1">Fill participant's gotra</h2>

        <p className="text-sm text-gray-500 mb-3">
          Gotra will be recited during the puja
        </p>

        <input
          value={gotra}
          disabled={unknownGotra}
          onFocus={() => !unknownGotra && setShowGotraList(true)}
          onChange={(e) => setGotra(e.target.value)}
          placeholder="Enter your Gotra"
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* GOTRA DROPDOWN */}
        {showGotraList && !unknownGotra && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg max-h-40 overflow-auto shadow">
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

        <label className="flex items-center gap-2 mt-3 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={unknownGotra}
            onChange={(e) => handleUnknownGotraChange(e.target.checked)}
          />
          I do not know gotra
        </label>
      </section>

      <hr />

      {/* AASHIRWAD */}
      <section className="space-y-4">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Would you like to receive the Aashirwad box?
            </h2>
          </div>
          <div className="flex gap-2">
            {["yes", "no"].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAashirwad(v as "yes" | "no")}
                className={`px-4 py-2 rounded-lg border ${
                  aashirwad === v ? "bg-green-700 text-white!" : ""
                }`}
              >
                {v === "yes" ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            The Aashirwad Box will contain divine blessing elements such as
            Ganga Jal, and more, sourced from sacred Tirth locations.
          </p>
        </div>

        {aashirwad === "yes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(address).map((k) => (
              <input
                key={k}
                placeholder={`${k} (Compulsory)`}
                value={address[k as keyof Address]}
                onChange={(e) =>
                  updateAddress(k as keyof Address, e.target.value)
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
        className={`w-full py-3 rounded-lg font-semibold text-white! cursor-pointer ${
          aashirwad ? "bg-green-600 " : "bg-gray-300"
        }`}
      >
        Proceed to book
      </button>

      <ConfirmDetailsModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          const payload = {
            whatsapp,
            callingNumber: alternateCalling ? callingNumber : whatsapp,
            members: members.filter(Boolean),
            gotra,
            aashirwad,
            address: aashirwad === "yes" ? address : null,
          };

          console.log("FINAL SUBMIT:", payload);
          setShowConfirmModal(false);
          // 👉 navigate to payment here
        }}
        data={{
          members: members.filter(Boolean),
          gotra,
          whatsapp,
          callingNumber: alternateCalling ? callingNumber : whatsapp,
          address: aashirwad === "yes" ? address : null,
        }}
      />
    </form>
  );
}
