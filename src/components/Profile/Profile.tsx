import { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import ProfileEditForm from "./ProfileEdit";
import { getUserData } from "@/utils/API";

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res: any = await getUserData(profile);
      if (res?.status === 200) {
        setProfile(res.data.data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>No profile found</div>;

  // profile completion logic
  const isProfileComplete =
    profile.gender &&
    profile.dob &&
    profile.placeOfBirth &&
    profile.occupation;

  return (
    <section className="bg-[#FAF7F2] min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold">Profile</h1>

        {!isEditing ? (
          <ProfileView
            profile={profile}
            isProfileComplete={Boolean(isProfileComplete)}
            onEdit={() => setIsEditing(true)}
          />
        ) : (
          <ProfileEditForm
            profile={profile}
            onCancel={() => setIsEditing(false)}
            onSave={(updated) => {
              setProfile(updated);
              setIsEditing(false);
            }}
          />
        )}
      </div>
    </section>
  );
}





// import { useState } from "react";
// import ProfileView from "./ProfileView";
// import ProfileEditForm from "./ProfileEdit";

// type Profile = {
//   username: string;
//   email: string;
//   phone: string;
//   address: string;
//   state: string;
//   country: string;
//   pin: string;
// };

// export default function Profile() {
//   const [isEditing, setIsEditing] = useState(false);

//   const [profile, setProfile] = useState<Profile>({
//     username: "Srii Mandir Bhakt",
//     email: "bhakt@srimandir.com",
//     phone: "+91 9999999999",
//     address: "Temple Road, Ayodhya",
//     state: "Uttar Pradesh",
//     country: "India",
//     pin: "224123",
//   });

//   return (
//     <section className="bg-[#FAF7F2] min-h-screen px-6 py-10">
//       <div className="max-w-5xl mx-auto space-y-8">
//         <h1 className="text-2xl font-semibold">Profile</h1>

//         {!isEditing ? (
//           <ProfileView
//             profile={profile}
//             onEdit={() => setIsEditing(true)}
//           />
//         ) : (
//           <ProfileEditForm
//             profile={profile}
//             onCancel={() => setIsEditing(false)}
//             onSave={(updated) => {
//               setProfile(updated);
//               setIsEditing(false);
//             }}
//           />
//         )}
//       </div>
//     </section>
//   );
// }
