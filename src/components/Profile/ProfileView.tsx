import { PencilLine } from "lucide-react";

export default function ProfileView({
  profile,
  isProfileComplete,
  onEdit,
}: {
  profile: Profile;
  isProfileComplete: boolean;
  onEdit: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">{profile.username}</h2>
            <p className="text-gray-500">{profile.phone}</p>
          </div>

          <button onClick={onEdit} className="text-blue-600 text-sm flex gap-1">
            <PencilLine size={16} /> Edit
          </button>
        </div>

        {!isProfileComplete && (
          <button
            onClick={onEdit}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            Please complete your profile →
          </button>
        )}
      </div>

      {/* CONTACT INFO */}
      <div className="grid sm:grid-cols-2 gap-6">
        <Info label="Email" value={profile.email} />
        <Info label="Phone" value={profile.phone} />
        {profile.gender && <Info label="Gender" value={profile.gender} />}
        {profile.occupation && (
          <Info label="Occupation" value={profile.occupation} />
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  );
}





// import { getUserData } from "@/utils/API";
// import { PencilLine } from "lucide-react";
// import { useEffect } from "react";

// type Profile = {
//   username: string;
//   email: string;
//   phone: string;
//   address: string;
//   state: string;
//   country: string;
//   pin: string;
// };

// export default function ProfileView({
//   profile,
//   onEdit,
// }: {
//   profile: Profile;
//   onEdit: () => void;
// }) {

//   const getUserProfile = async () => {
//     const res: any = await getUserData(profile);
//     if (res && res.status == 200) {
//       const userData = res.data.data;
//       setFormData(userData);
//     }
//   };

//   useEffect(() => {
//     getUserProfile();
//   }, []);

//   return (
//     <div className="bg-white rounded-xl border p-6 space-y-6">
//       <div className="flex justify-between items-start">
//         <div>
//           <h2 className="text-lg font-semibold">{profile.username}</h2>
//           <p className="text-gray-500">{profile.phone}</p>
//         </div>

//         <button
//           onClick={onEdit}
//           className="flex items-center gap-1 text-blue-600 text-sm font-medium cursor-pointer"
//         >
//           <PencilLine size={16} />
//           Edit
//         </button>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-6">
//         <Info label="Email" value={profile.email} />
//         <Info label="Phone" value={profile.phone} />
//         <Info label="Address" value={profile.address} />
//         <Info label="State" value={profile.state} />
//         <Info label="Country" value={profile.country} />
//         <Info label="PIN Code" value={profile.pin} />
//       </div>
//     </div>
//   );
// }

// function Info({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className="font-medium">{value || "—"}</p>
//     </div>
//   );
// }
