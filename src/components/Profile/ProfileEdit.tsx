import { useState } from "react";

export default function ProfileEditForm({
  profile,
  onSave,
  onCancel,
}: {
  profile: Profile;
  onSave: (p: Profile) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(profile);

  const update = (k: keyof Profile, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="bg-white rounded-xl border p-6 space-y-8">
      <h2 className="text-lg font-semibold">Edit Personal Information</h2>

      <Input label="Email" value={form.email} disabled />
      <Input label="Name" value={form.username} onChange={(v) => update("username", v)} />
      <Input label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />

      <Input label="Gender" value={form.gender || ""} onChange={(v) => update("gender", v)} />
      <Input label="Date of Birth" value={form.dob || ""} onChange={(v) => update("dob", v)} />
      <Input label="Place of Birth" value={form.placeOfBirth || ""} onChange={(v) => update("placeOfBirth", v)} />
      <Input label="Occupation" value={form.occupation || ""} onChange={(v) => update("occupation", v)} />

      <div className="flex gap-4">
        <button onClick={() => onSave(form)} className="bg-orange-500 text-white px-6 py-3 rounded-lg">
          Save
        </button>
        <button onClick={onCancel} className="border px-6 py-3 rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
}







// import { useState } from "react";

// type Profile = {
//   username: string;
//   email: string;
//   phone: string;
//   address: string;
//   state: string;
//   country: string;
//   pin: string;
// };

// export default function ProfileEditForm({
//   profile,
//   onSave,
//   onCancel,
// }: {
//   profile: Profile;
//   onSave: (p: Profile) => void;
//   onCancel: () => void;
// }) {
//   const [form, setForm] = useState<Profile>(profile);

//   const update = (key: keyof Profile, value: string) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   return (
//     <div className="bg-white rounded-xl border p-6 space-y-8">
//       <h2 className="text-lg font-semibold">Edit Profile</h2>

//       <div className="grid sm:grid-cols-2 gap-6">
//         <Input label="Username" value={form.username} onChange={(v) => update("username", v)} />
//         <Input label="Email" value={form.email} onChange={(v) => update("email", v)} />
//         <Input label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
//         <Input label="Address" value={form.address} onChange={(v) => update("address", v)} />
//         <Input label="State" value={form.state} onChange={(v) => update("state", v)} />
//         <Input label="Country" value={form.country} onChange={(v) => update("country", v)} />
//         <Input label="PIN Code" value={form.pin} onChange={(v) => update("pin", v)} />
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={() => onSave(form)}
//           className="bg-orange-500 hover:bg-orange-600 text-white! px-8 py-3 rounded-lg font-medium cursor-pointer"
//         >
//           Save Changes
//         </button>

//         <button onClick={onCancel} className="px-8 py-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// function Input({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   return (
//     <div>
//       <label className="text-sm text-gray-500">{label}</label>
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full border rounded-lg px-4 py-2 mt-1"
//       />
//     </div>
//   );
// }
