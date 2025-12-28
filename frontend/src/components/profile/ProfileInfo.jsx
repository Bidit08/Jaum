// import { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import { Camera, Pencil } from "lucide-react";

// const BACKEND_URL = "http://localhost:5000";

// const ProfileInfo = ({ user, setUser }) => {
//   const [form, setForm] = useState({
//     name: user.name,
//     username: user.username,
//     bio: user.bio || "",
//     dateOfBirth: user.dateOfBirth?.slice(0, 10) || "",
//     email: user.email,
//     profilePicture: user.profilePicture,
//   });

//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const saveProfile = async () => {
//     setLoading(true);
//     try {
//       const res = await api.put("/user/profile", form);
//       localStorage.setItem("user", JSON.stringify(res.data));
//       window.dispatchEvent(new Event("authChanged"));
//       setUser(res.data);
//       toast.success("Profile updated");
//     } catch {
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadImage = async () => {
//     if (!image) return;
//     const formData = new FormData();
//     formData.append("image", image);

//     const res = await api.post("/user/profile/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     setForm((p) => ({ ...p, profilePicture: res.data.profilePicture }));
//     toast.success("Profile picture updated");
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="bg-white rounded-2xl p-6 flex gap-6 items-center shadow">
//         <div className="relative">
//           <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl overflow-hidden">
//             {form.profilePicture ? (
//               <img
//                 src={`${BACKEND_URL}${form.profilePicture}`}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               form.name.charAt(0)
//             )}
//           </div>

//           <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer">
//             <Camera size={16} />
//             <input
//               type="file"
//               hidden
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </label>
//         </div>

//         <div className="flex-1 space-y-3">
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2"
//           />
//           <input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2"
//           />
//         </div>
//       </div>

//       {/* Personal Info */}
//       <div className="bg-white rounded-2xl p-6 shadow space-y-4">
//         <div className="flex items-center gap-2 font-semibold">
//           <Pencil size={16} /> Personal Information
//         </div>

//         <textarea
//           name="bio"
//           value={form.bio}
//           onChange={handleChange}
//           className="w-full border rounded-lg px-3 py-2"
//         />

//         <input
//           type="date"
//           name="dateOfBirth"
//           value={form.dateOfBirth}
//           onChange={handleChange}
//           className="w-full border rounded-lg px-3 py-2"
//         />

//         <input
//           value={form.email}
//           disabled
//           className="w-full border rounded-lg px-3 py-2 bg-gray-100"
//         />

//         <button
//           onClick={saveProfile}
//           disabled={loading}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;

// import { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import { Camera } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const BACKEND_URL = "http://localhost:5000";

// const ProfileInfo = ({ user, setUser }) => {
//   const [form, setForm] = useState({
//     name: user.name,
//     username: user.username,
//     bio: user.bio || "",
//     dateOfBirth: user.dateOfBirth?.slice(0, 10) || "",
//     email: user.email,
//     profilePicture: user.profilePicture,
//   });

//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const saveProfile = async () => {
//     setLoading(true);
//     try {
//       const res = await api.put("/user/profile", form);
//       localStorage.setItem("user", JSON.stringify(res.data));
//       window.dispatchEvent(new Event("authChanged"));
//       setUser(res.data);
//       toast.success("Profile updated");
//     } catch {
//       toast.error("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadImage = async () => {
//     if (!image) return;
//     const formData = new FormData();
//     formData.append("image", image);

//     const res = await api.post("/user/profile/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     setForm((p) => ({ ...p, profilePicture: res.data.profilePicture }));
//     toast.success("Profile picture updated");
//   };

//   return (
//     <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl">
//       <CardContent className="space-y-8 py-8">
//         {/* Avatar */}
//         <div className="flex flex-col items-center">
//           <div className="relative">
//             <div className="w-28 h-28 rounded-full overflow-hidden border border-white/20 bg-black/40 flex items-center justify-center text-4xl text-white">
//               {form.profilePicture ? (
//                 <img
//                   src={`${BACKEND_URL}${form.profilePicture}`}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 form.name.charAt(0)
//               )}
//             </div>

//             <label className="absolute bottom-0 right-0 bg-black/80 p-2 rounded-full cursor-pointer border border-white/20">
//               <Camera size={16} className="text-white" />
//               <input
//                 type="file"
//                 hidden
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//             </label>
//           </div>

//           <Button onClick={uploadImage} className="mt-4 bg-white text-black">
//             Upload Picture
//           </Button>
//         </div>

//         {/* Fields */}
//         <div className="grid gap-5">
//           <Input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="bg-white/20 border-white/30 text-white"
//           />

//           <Input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             placeholder="Username"
//             className="bg-white/20 border-white/30 text-white"
//           />

//           <textarea
//             name="bio"
//             value={form.bio}
//             onChange={handleChange}
//             placeholder="Tell us about yourself"
//             className="bg-white/20 border-white/30 text-white rounded-xl p-3"
//           />

//           <Input
//             type="date"
//             name="dateOfBirth"
//             value={form.dateOfBirth}
//             onChange={handleChange}
//             className="bg-white/20 border-white/30 text-white"
//           />

//           <Input
//             value={form.email}
//             disabled
//             className="bg-white/10 border-white/20 text-gray-400"
//           />
//         </div>

//         <Button
//           onClick={saveProfile}
//           disabled={loading}
//           className="w-full bg-black/80 hover:bg-black text-white h-12 rounded-xl"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProfileInfo;

// import { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import { Camera } from "lucide-react";

// const BACKEND_URL = "http://localhost:5000";

// const ProfileInfo = ({ user, setUser }) => {
//   const [form, setForm] = useState({
//     name: user.name,
//     username: user.username,
//     bio: user.bio || "",
//     dateOfBirth: user.dateOfBirth?.slice(0, 10) || "",
//     email: user.email,
//     profilePicture: user.profilePicture,
//   });

//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const saveProfile = async () => {
//     setLoading(true);
//     try {
//       const res = await api.put("/user/profile", form);
//       localStorage.setItem("user", JSON.stringify(res.data));
//       window.dispatchEvent(new Event("authChanged"));
//       setUser(res.data);
//       toast.success("Profile updated successfully");
//     } catch {
//       toast.error("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadImage = async () => {
//     if (!image) return;

//     const formData = new FormData();
//     formData.append("image", image);

//     const res = await api.post("/user/profile/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     setForm((prev) => ({
//       ...prev,
//       profilePicture: res.data.profilePicture,
//     }));

//     toast.success("Profile picture updated");
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header card */}
//       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex gap-6 items-center">
//         <div className="relative">
//           <div className="w-24 h-24 rounded-full overflow-hidden border border-white/20 bg-black/40 flex items-center justify-center text-3xl font-semibold">
//             {form.profilePicture ? (
//               <img
//                 src={`${BACKEND_URL}${form.profilePicture}`}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               form.name.charAt(0)
//             )}
//           </div>

//           <label className="absolute bottom-0 right-0 bg-black/80 p-2 rounded-full cursor-pointer border border-white/20">
//             <Camera size={16} />
//             <input
//               type="file"
//               hidden
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </label>
//         </div>

//         <div className="flex-1 space-y-4">
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
//           />

//           <input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             placeholder="Username"
//             className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
//           />
//         </div>
//       </div>

//       {/* Personal info */}
//       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4">
//         <textarea
//           name="bio"
//           value={form.bio}
//           onChange={handleChange}
//           placeholder="Tell us about yourself"
//           className="w-full bg-white/20 border border-white/30 rounded-xl px-3 py-2 text-white"
//         />

//         <input
//           type="date"
//           name="dateOfBirth"
//           value={form.dateOfBirth}
//           onChange={handleChange}
//           className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
//         />

//         <input
//           value={form.email}
//           disabled
//           className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-400"
//         />

//         <button
//           onClick={saveProfile}
//           disabled={loading}
//           className="bg-black/80 hover:bg-black text-white px-6 py-2 rounded-xl font-semibold"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;

// import { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import { Camera } from "lucide-react";

// const BACKEND_URL = "http://localhost:5000";

// const ProfileInfo = ({ user, setUser }) => {
//   const [form, setForm] = useState({
//     name: user.name,
//     username: user.username,
//     bio: user.bio || "",
//     dateOfBirth: user.dateOfBirth?.slice(0, 10) || "",
//     email: user.email,
//     profilePicture: user.profilePicture || "",
//   });

//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   // Handle text changes
//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // Save profile details
//   const saveProfile = async () => {
//     setLoading(true);
//     try {
//       const res = await api.put("/user/profile", {
//         name: form.name,
//         username: form.username,
//         bio: form.bio,
//         dateOfBirth: form.dateOfBirth,
//       });

//       localStorage.setItem("user", JSON.stringify(res.data));
//       window.dispatchEvent(new Event("authChanged"));
//       setUser(res.data);

//       toast.success("Profile updated successfully");
//     } catch {
//       toast.error("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Upload profile picture
//   const uploadImage = async () => {
//     if (!image) return;

//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("image", image);

//       const res = await api.post("/user/profile/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // Update local form
//       setForm((prev) => ({
//         ...prev,
//         profilePicture: res.data.profilePicture,
//       }));

//       // Update localStorage user for Navbar
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           ...storedUser,
//           profilePicture: res.data.profilePicture,
//         })
//       );

//       window.dispatchEvent(new Event("authChanged"));
//       toast.success("Profile picture updated");
//       setImage(null);
//     } catch {
//       toast.error("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* HEADER CARD */}
//       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
//         {/* Avatar */}
//         <div className="relative">
//           <div className="w-24 h-24 rounded-full overflow-hidden border border-white/20 bg-black/40 flex items-center justify-center text-3xl font-semibold text-white">
//             {form.profilePicture ? (
//               <img
//                 src={`${BACKEND_URL}${form.profilePicture}`}
//                 className="w-full h-full object-cover"
//                 alt="Profile"
//               />
//             ) : (
//               form.name.charAt(0)
//             )}
//           </div>

//           <label className="absolute bottom-0 right-0 bg-black/80 p-2 rounded-full cursor-pointer border border-white/20">
//             <Camera size={16} className="text-white" />
//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </label>
//         </div>

//         {/* Upload button */}
//         <button
//           onClick={uploadImage}
//           disabled={!image || uploading}
//           className="bg-white text-black px-4 py-2 rounded-xl font-semibold disabled:opacity-50"
//         >
//           {uploading ? "Uploading..." : "Upload Picture"}
//         </button>

//         {/* Name + Username */}
//         <div className="flex-1 space-y-4 w-full">
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
//           />

//           <input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             placeholder="Username"
//             className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
//           />
//         </div>
//       </div>

//       {/* PERSONAL INFO CARD */}
//       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4">
//         <textarea
//           name="bio"
//           value={form.bio}
//           onChange={handleChange}
//           placeholder="Tell us about yourself"
//           className="w-full bg-white/20 border border-white/30 rounded-xl px-3 py-2 text-white"
//         />

//         <input
//           type="date"
//           name="dateOfBirth"
//           value={form.dateOfBirth}
//           onChange={handleChange}
//           className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
//         />

//         <input
//           value={form.email}
//           disabled
//           className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-400"
//         />

//         <button
//           onClick={saveProfile}
//           disabled={loading}
//           className="bg-black/80 hover:bg-black text-white px-6 py-2 rounded-xl font-semibold"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;

import { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { Camera } from "lucide-react";

const BACKEND_URL = "http://localhost:5000";

const ProfileInfo = ({ user, setUser }) => {
  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio || "",
    dateOfBirth: user.dateOfBirth?.slice(0, 10) || "",
    email: user.email,
    profilePicture: user.profilePicture || "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Handle text changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Save profile details
  const saveProfile = async () => {
    setLoading(true);
    try {
      const res = await api.put("/user/profile", {
        name: form.name,
        username: form.username,
        bio: form.bio,
        dateOfBirth: form.dateOfBirth,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      window.dispatchEvent(new Event("authChanged"));
      setUser(res.data);

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 AUTO-UPLOAD IMAGE
  const handleImageSelect = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("/user/profile/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update UI
      setForm((prev) => ({
        ...prev,
        profilePicture: res.data.profilePicture,
      }));

      // Update navbar instantly
      const storedUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          profilePicture: res.data.profilePicture,
        })
      );

      window.dispatchEvent(new Event("authChanged"));
      toast.success("Profile picture updated");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER CARD */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-white/20 bg-black/40 flex items-center justify-center text-3xl font-semibold text-white">
            {form.profilePicture ? (
              <img
                src={`${BACKEND_URL}${form.profilePicture}`}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            ) : (
              form.name.charAt(0)
            )}
          </div>

          {/* Upload icon */}
          <label className="absolute bottom-0 right-0 bg-black/80 p-2 rounded-full cursor-pointer border border-white/20">
            <Camera size={16} className="text-white" />
            <input
              type="file"
              accept="image/*"
              hidden
              disabled={uploading}
              onChange={(e) => handleImageSelect(e.target.files[0])}
            />
          </label>

          {uploading && (
            <p className="text-xs text-gray-300 mt-2 text-center">
              Uploading...
            </p>
          )}
        </div>

        {/* Name + Username */}
        <div className="flex-1 space-y-4 w-full">
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
              // className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder:text-gray-400 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
          /> */}

          {/* USer Name */}
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">
              User Name
            </label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
              // className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder:text-gray-400 focus:border-cyan-400 outline-none"
            />
          </div>
        </div>
      </div>

      {/* PERSONAL INFO CARD */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className="w-full bg-white/20 border border-white/30 rounded-xl px-3 py-2 text-white"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            value={form.email}
            disabled
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-400"
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={loading}
          className="bg-black/80 hover:bg-black text-white px-6 py-2 rounded-xl font-semibold"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
