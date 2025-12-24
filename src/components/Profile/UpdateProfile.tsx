// export default function UpdateProfile({
//   data,
//   onSuccess,
// }: {
//   data: typeof initialUserData;
//   onSuccess: (data: typeof initialUserData) => void;
// }) {
//   const [formData, setFormData] = useState(data);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await updateProfile(formData);
//     if (res.status === 200) {
//       message.success("Profile updated");
//       onSuccess(formData);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* reuse your existing fields + renderInputField */}
//     </form>
//   );
// }
