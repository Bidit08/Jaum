// import { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     bio: "",
//     dateOfBirth: "",
//     phoneNumber: "",
//   });

//   const [image, setImage] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const res = await axios.get("/api/user/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setForm({
//         name: res.data.name || "",
//         username: res.data.username || "",
//         bio: res.data.bio || "",
//         dateOfBirth: res.data.dateOfBirth
//           ? res.data.dateOfBirth.slice(0, 10)
//           : "",
//         phoneNumber: res.data.phoneNumber || "",
//       });
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();

//     const res = await axios.put("/api/user/profile", form, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // Update localStorage user
//     localStorage.setItem("user", JSON.stringify(res.data));
//     window.dispatchEvent(new Event("authChanged"));

//     alert("Profile updated successfully");
//   };

//   const uploadImage = async () => {
//     if (!image) return;

//     const formData = new FormData();
//     formData.append("image", image);

//     const res = await axios.post("/api/user/profile/upload", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     const updatedUser = {
//       ...JSON.parse(localStorage.getItem("user")),
//       profilePicture: res.data.profilePicture,
//     };

//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     window.dispatchEvent(new Event("authChanged"));
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-24 p-6 bg-slate-900 rounded-xl border border-white/10 text-white">
//       <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

//       <div className="flex flex-col items-center mb-6">
//         <img
//           src={form.profilePicture || "/default-avatar.png"}
//           alt="Profile"
//           className="w-24 h-24 rounded-full object-cover border border-white/20"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="mt-3 text-sm text-gray-300"
//         />

//         <button
//           type="button"
//           onClick={uploadImage}
//           className="mt-2 text-sm bg-white text-black px-4 py-1 rounded"
//         >
//           Upload Picture
//         </button>
//       </div>

//       <form onSubmit={saveProfile} className="space-y-4">
//         <input
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <textarea
//           name="bio"
//           placeholder="Bio"
//           value={form.bio}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           type="date"
//           name="dateOfBirth"
//           value={form.dateOfBirth}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={form.phoneNumber}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <button
//           type="submit"
//           className="w-full bg-white text-black py-2 rounded font-semibold"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../utils/api";

// const Profile = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     bio: "",
//     dateOfBirth: "",
//     phoneNumber: "",
//     profilePicture: "",
//   });

//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Redirect if not logged in
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   // Fetch profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/user/profile");

//         setForm({
//           name: res.data.name || "",
//           username: res.data.username || "",
//           bio: res.data.bio || "",
//           dateOfBirth: res.data.dateOfBirth
//             ? res.data.dateOfBirth.slice(0, 10)
//             : "",
//           phoneNumber: res.data.phoneNumber || "",
//           profilePicture: res.data.profilePicture || "",
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Handle text input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Save profile details
//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.put("/user/profile", {
//         name: form.name,
//         username: form.username,
//         bio: form.bio,
//         dateOfBirth: form.dateOfBirth,
//         phoneNumber: form.phoneNumber,
//       });

//       // Update localStorage user
//       localStorage.setItem("user", JSON.stringify(res.data));
//       window.dispatchEvent(new Event("authChanged"));

//       alert("Profile updated successfully");
//     } catch (err) {
//       alert("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Upload profile picture
//   const uploadImage = async () => {
//     if (!image) return;

//     const formData = new FormData();
//     formData.append("image", image);

//     const res = await api.post("/user/profile/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     // IMPORTANT: merge with existing user
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     const updatedUser = {
//       ...storedUser,
//       profilePicture: res.data.profilePicture,
//     };

//     localStorage.setItem("user", JSON.stringify(updatedUser));

//     // 🔥 FORCE NAVBAR UPDATE
//     window.dispatchEvent(new Event("authChanged"));

//     // Update local state
//     setForm((prev) => ({
//       ...prev,
//       profilePicture: res.data.profilePicture,
//     }));
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-24 p-6 bg-slate-900 rounded-xl border border-white/10 text-white">
//       <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

//       {/* Profile Picture */}
//       <div className="flex flex-col items-center mb-6">
//         <img
//           src={
//             form.profilePicture
//               ? `http://localhost:5000${form.profilePicture}`
//               : "/default-avatar.png"
//           }
//           alt="Profile"
//           className="w-24 h-24 rounded-full object-cover border border-white/20"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="mt-3 text-sm text-gray-300"
//         />

//         <button
//           type="button"
//           onClick={uploadImage}
//           className="mt-2 text-sm bg-white text-black px-4 py-1 rounded"
//         >
//           Upload Picture
//         </button>
//       </div>

//       {/* Profile Form */}
//       <form onSubmit={saveProfile} className="space-y-4">
//         <input
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <textarea
//           name="bio"
//           placeholder="Bio"
//           value={form.bio}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           type="date"
//           name="dateOfBirth"
//           value={form.dateOfBirth}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={form.phoneNumber}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-white text-black py-2 rounded font-semibold"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../utils/api";
// import { toast } from "react-toastify";

// const Profile = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     bio: "",
//     dateOfBirth: "",
//     phoneNumber: "",
//     profilePicture: "",
//   });

//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Redirect if not logged in
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   // Fetch profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/user/profile");

//         setForm({
//           name: res.data.name || "",
//           username: res.data.username || "",
//           bio: res.data.bio || "",
//           dateOfBirth: res.data.dateOfBirth
//             ? res.data.dateOfBirth.slice(0, 10)
//             : "",
//           phoneNumber: res.data.phoneNumber || "",
//           profilePicture: res.data.profilePicture || "",
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Handle text input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Save profile details
//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.put("/user/profile", {
//         name: form.name,
//         username: form.username,
//         bio: form.bio,
//         dateOfBirth: form.dateOfBirth,
//         phoneNumber: form.phoneNumber,
//       });

//       // Update localStorage user
//       localStorage.setItem("user", JSON.stringify(res.data));
//       window.dispatchEvent(new Event("authChanged"));

//       toast.success("Profile updated successfully 🎉");
//     } catch (err) {
//       toast.error("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Upload profile picture
//   const uploadImage = async () => {
//     if (!image) return;

//     try {
//       const formData = new FormData();
//       formData.append("image", image);

//       const res = await api.post("/user/profile/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // IMPORTANT: merge with existing user
//       const storedUser = JSON.parse(localStorage.getItem("user"));

//       const updatedUser = {
//         ...storedUser,
//         profilePicture: res.data.profilePicture,
//       };

//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       // 🔥 FORCE NAVBAR UPDATE
//       window.dispatchEvent(new Event("authChanged"));

//       // Update local state
//       setForm((prev) => ({
//         ...prev,
//         profilePicture: res.data.profilePicture,
//       }));

//       toast.success("Profile picture updated");
//     } catch (err) {
//       toast.error("Image upload failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-24 p-6 bg-slate-900 rounded-xl border border-white/10 text-white">
//       <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

//       {/* Profile Picture */}
//       <div className="flex flex-col items-center mb-6">
//         <img
//           src={
//             form.profilePicture
//               ? `http://localhost:5000${form.profilePicture}`
//               : "/default-avatar.png"
//           }
//           alt="Profile"
//           className="w-24 h-24 rounded-full object-cover border border-white/20"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="mt-3 text-sm text-gray-300"
//         />

//         <button
//           type="button"
//           onClick={uploadImage}
//           className="mt-2 text-sm bg-white text-black px-4 py-1 rounded"
//         >
//           Upload Picture
//         </button>
//       </div>

//       {/* Profile Form */}
//       <form onSubmit={saveProfile} className="space-y-4">
//         <input
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <textarea
//           name="bio"
//           placeholder="Bio"
//           value={form.bio}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           type="date"
//           name="dateOfBirth"
//           value={form.dateOfBirth}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={form.phoneNumber}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-white text-black py-2 rounded font-semibold"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../utils/api";
// import { toast } from "react-toastify";

// const Profile = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     bio: "",
//     dateOfBirth: "",
//     phoneNumber: "",
//     profilePicture: "",
//   });

//   const [passwords, setPasswords] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [passwordLoading, setPasswordLoading] = useState(false);

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   // Fetch profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/user/profile");

//         setForm({
//           name: res.data.name || "",
//           username: res.data.username || "",
//           bio: res.data.bio || "",
//           dateOfBirth: res.data.dateOfBirth
//             ? res.data.dateOfBirth.slice(0, 10)
//             : "",
//           phoneNumber: res.data.phoneNumber || "",
//           profilePicture: res.data.profilePicture || "",
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Handle profile input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle password input change
//   const handlePasswordChange = (e) => {
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });
//   };

//   // Save profile details
//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.put("/user/profile", {
//         name: form.name,
//         username: form.username,
//         bio: form.bio,
//         dateOfBirth: form.dateOfBirth,
//         phoneNumber: form.phoneNumber,
//       });

//       localStorage.setItem("user", JSON.stringify(res.data));
//       window.dispatchEvent(new Event("authChanged"));

//       toast.success("Profile updated successfully 🎉");
//     } catch {
//       toast.error("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Upload profile picture
//   const uploadImage = async () => {
//     if (!image) return;

//     try {
//       const formData = new FormData();
//       formData.append("image", image);

//       const res = await api.post("/user/profile/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       const updatedUser = {
//         ...storedUser,
//         profilePicture: res.data.profilePicture,
//       };

//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       window.dispatchEvent(new Event("authChanged"));

//       setForm((prev) => ({
//         ...prev,
//         profilePicture: res.data.profilePicture,
//       }));

//       toast.success("Profile picture updated");
//     } catch {
//       toast.error("Image upload failed");
//     }
//   };

//   // 🔐 Change password
//   const changePassword = async (e) => {
//     e.preventDefault();

//     if (passwords.newPassword !== passwords.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     setPasswordLoading(true);

//     try {
//       await api.put("/user/change-password", {
//         currentPassword: passwords.currentPassword,
//         newPassword: passwords.newPassword,
//       });

//       toast.success("Password changed successfully 🔐");

//       setPasswords({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Password update failed");
//     } finally {
//       setPasswordLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-24 p-6 bg-slate-900 rounded-xl border border-white/10 text-white space-y-8">
//       <h2 className="text-2xl font-semibold">My Profile</h2>

//       {/* Profile Picture */}
//       <div className="flex flex-col items-center">
//         <img
//           src={
//             form.profilePicture
//               ? `http://localhost:5000${form.profilePicture}`
//               : "/default-avatar.png"
//           }
//           alt="Profile"
//           className="w-24 h-24 rounded-full object-cover border border-white/20"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="mt-3 text-sm text-gray-300"
//         />

//         <button
//           type="button"
//           onClick={uploadImage}
//           className="mt-2 text-sm bg-white text-black px-4 py-1 rounded"
//         >
//           Upload Picture
//         </button>
//       </div>

//       {/* Profile Form */}
//       <form onSubmit={saveProfile} className="space-y-4">
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           name="username"
//           value={form.username}
//           onChange={handleChange}
//           placeholder="Username"
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <textarea
//           name="bio"
//           value={form.bio}
//           onChange={handleChange}
//           placeholder="Bio"
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           type="date"
//           name="dateOfBirth"
//           value={form.dateOfBirth}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           name="phoneNumber"
//           value={form.phoneNumber}
//           onChange={handleChange}
//           placeholder="Phone Number"
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-white text-black py-2 rounded font-semibold"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </form>

//       {/* 🔐 Change Password */}
//       <form
//         onSubmit={changePassword}
//         className="space-y-4 border-t border-white/10 pt-6"
//       >
//         <h3 className="text-lg font-semibold">Change Password</h3>

//         <input
//           type="password"
//           name="currentPassword"
//           value={passwords.currentPassword}
//           onChange={handlePasswordChange}
//           placeholder="Current Password"
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           type="password"
//           name="newPassword"
//           value={passwords.newPassword}
//           onChange={handlePasswordChange}
//           placeholder="New Password"
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <input
//           type="password"
//           name="confirmPassword"
//           value={passwords.confirmPassword}
//           onChange={handlePasswordChange}
//           placeholder="Confirm New Password"
//           className="w-full p-2 rounded bg-black/40 border border-white/10"
//         />

//         <button
//           type="submit"
//           disabled={passwordLoading}
//           className="w-full bg-red-500 text-white py-2 rounded font-semibold"
//         >
//           {passwordLoading ? "Updating..." : "Change Password"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

// import { useState } from "react";
// import ProfileTab from "./ProfileTab";
// import SecurityTab from "./SecurityTab";
// import BookingsTab from "./BookingsTab";

// export default function ProfilePage() {
//   const [activeTab, setActiveTab] = useState("profile");

//   return (
//     <div className="min-h-screen bg-slate-100 pt-28 pb-20">
//       <div className="max-w-5xl mx-auto px-4">
//         {/* Tabs */}
//         <div className="bg-white rounded-xl p-2 flex gap-2 shadow-sm mb-8">
//           {["profile", "security", "bookings"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-2 rounded-lg font-medium transition ${
//                 activeTab === tab
//                   ? "bg-cyan-600 text-white"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {tab === "profile"
//                 ? "Profile"
//                 : tab === "security"
//                 ? "Security"
//                 : "My Bookings"}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         {activeTab === "profile" && <ProfileTab />}
//         {activeTab === "security" && <SecurityTab />}
//         {activeTab === "bookings" && <BookingsTab />}
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import ProfileTab from "./ProfileTab";
// import SecurityTab from "./SecurityTab";
// import BookingsTab from "./BookingsTab";

// export default function Profile() {
//   const [activeTab, setActiveTab] = useState("profile");

//   return (
//     <div className="min-h-screen bg-slate-900 pt-28 pb-20 text-white">
//       <div className="max-w-5xl mx-auto px-4">
//         {/* Tabs */}
//         <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-1 flex gap-2 mb-8">
//           {[
//             { id: "profile", label: "Profile" },
//             { id: "security", label: "Security" },
//             { id: "bookings", label: "My Bookings" },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex-1 py-2 rounded-lg font-medium transition ${
//                 activeTab === tab.id
//                   ? "bg-cyan-500 text-white shadow"
//                   : "text-gray-300 hover:bg-white/10"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {activeTab === "profile" && <ProfileTab />}
//         {activeTab === "security" && <SecurityTab />}
//         {activeTab === "bookings" && <BookingsTab />}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../utils/api";

// import ProfileTabs from "./ProfileTabs";
// import ProfileInfo from "./ProfileInfo";
// import SecuritySettings from "./SecuritySettings";
// import MyBookings from "./MyBookings";

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (!localStorage.getItem("token")) navigate("/login");
//   }, [navigate]);

//   useEffect(() => {
//     api.get("/user/profile").then((res) => setUser(res.data));
//   }, []);

//   if (!user) return null;

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-28 pb-20">
//       <div className="container mx-auto px-6 max-w-5xl">
//         <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//         {activeTab === "profile" && (
//           <ProfileInfo user={user} setUser={setUser} />
//         )}
//         {activeTab === "security" && <SecuritySettings />}
//         {activeTab === "bookings" && <MyBookings />}
//       </div>
//     </section>
//   );
// };

// export default ProfilePage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import ProfileTabs from "../../components/profile/ProfileTabs";
import ProfileInfo from "../../components/profile/ProfileInfo";
import SecuritySettings from "../../components/profile/SecuritySettings";
import MyBookings from "../../components/profile/MyBookings";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    api.get("/user/profile").then((res) => setUser(res.data));
  }, []);

  if (!user) return null;

  return (
    <div>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 text-white">
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "profile" && (
            <ProfileInfo user={user} setUser={setUser} />
          )}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "bookings" && <MyBookings />}
        </div>
        <br />
      </section>
      <Footer />
    </div>
  );
};

export default ProfilePage;
