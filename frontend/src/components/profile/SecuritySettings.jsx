// import { useState } from "react";
// import api from "../../utils/api";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { Shield } from "lucide-react";

// export default function SecurityTab() {
//   const [form, setForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleChangePassword = async (e) => {
//     e.preventDefault();

//     if (form.newPassword !== form.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     try {
//       await api.put("/auth/change-password", {
//         currentPassword: form.currentPassword,
//         newPassword: form.newPassword,
//       });
//       toast.success("Password updated");
//       setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   return (
//     <Card>
//       <CardContent className="space-y-6 py-6">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           <Shield className="h-5 w-5" />
//           Change Password
//         </h2>

//         <form onSubmit={handleChangePassword} className="space-y-4">
//           <Input
//             type="password"
//             placeholder="Current password"
//             value={form.currentPassword}
//             onChange={(e) =>
//               setForm({ ...form, currentPassword: e.target.value })
//             }
//             required
//           />

//           <Input
//             type="password"
//             placeholder="New password"
//             value={form.newPassword}
//             onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
//             required
//           />

//           <Input
//             type="password"
//             placeholder="Confirm new password"
//             value={form.confirmPassword}
//             onChange={(e) =>
//               setForm({ ...form, confirmPassword: e.target.value })
//             }
//             required
//           />

//           <Button className="bg-cyan-600 hover:bg-cyan-700">
//             Update Password
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

// import { useState } from "react";
// import api from "../../utils/api";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { Shield } from "lucide-react";

// export default function SecurityTab() {
//   const [form, setForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleChangePassword = async (e) => {
//     e.preventDefault();

//     if (form.newPassword !== form.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     try {
//       await api.put("/auth/change-password", {
//         currentPassword: form.currentPassword,
//         newPassword: form.newPassword,
//       });
//       toast.success("Password updated");
//       setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   return (
//     <Card className="bg-white/10 backdrop-blur-xl border-white/20">
//       <CardContent className="space-y-6 py-6">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           <Shield className="h-5 w-5 text-cyan-400" />
//           Change Password
//         </h2>

//         <form onSubmit={handleChangePassword} className="space-y-4">
//           <Input
//             type="password"
//             placeholder="Current password"
//             className="bg-white/20 border-white/30 text-white"
//             value={form.currentPassword}
//             onChange={(e) =>
//               setForm({ ...form, currentPassword: e.target.value })
//             }
//             required
//           />

//           <Input
//             type="password"
//             placeholder="New password"
//             className="bg-white/20 border-white/30 text-white"
//             value={form.newPassword}
//             onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
//             required
//           />

//           <Input
//             type="password"
//             placeholder="Confirm new password"
//             className="bg-white/20 border-white/30 text-white"
//             value={form.confirmPassword}
//             onChange={(e) =>
//               setForm({ ...form, confirmPassword: e.target.value })
//             }
//             required
//           />

//           <Button className="bg-cyan-500 hover:bg-cyan-600">
//             Update Password
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
// import { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";

// const SecuritySettings = () => {
//   const [passwords, setPasswords] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });

//   const changePassword = async () => {
//     if (passwords.newPassword !== passwords.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     setLoading(true);
//     try {
//       await api.put("/user/change-password", {
//         currentPassword: passwords.currentPassword,
//         newPassword: passwords.newPassword,
//       });
//       toast.success("Password updated");
//       setPasswords({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Password update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow max-w-xl">
//       <h3 className="text-lg font-semibold mb-4">Change Password</h3>

//       <input
//         type="password"
//         name="currentPassword"
//         value={passwords.currentPassword}
//         onChange={handleChange}
//         placeholder="Current password"
//         className="w-full border rounded-lg px-3 py-2 mb-3"
//       />

//       <input
//         type="password"
//         name="newPassword"
//         value={passwords.newPassword}
//         onChange={handleChange}
//         placeholder="New password"
//         className="w-full border rounded-lg px-3 py-2 mb-3"
//       />

//       <input
//         type="password"
//         name="confirmPassword"
//         value={passwords.confirmPassword}
//         onChange={handleChange}
//         placeholder="Confirm new password"
//         className="w-full border rounded-lg px-3 py-2 mb-4"
//       />

//       <button
//         onClick={changePassword}
//         disabled={loading}
//         className="bg-red-500 text-white px-6 py-2 rounded-lg"
//       >
//         {loading ? "Updating..." : "Change Password"}
//       </button>
//     </div>
//   );
// };

// export default SecuritySettings;

// import { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";

// const SecuritySettings = () => {
//   const [passwords, setPasswords] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });

//   const changePassword = async () => {
//     if (passwords.newPassword !== passwords.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     setLoading(true);
//     try {
//       await api.put("/user/change-password", {
//         currentPassword: passwords.currentPassword,
//         newPassword: passwords.newPassword,
//       });
//       toast.success("Password updated");
//       setPasswords({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-xl space-y-4">
//       <h3 className="text-lg font-semibold">Change Password</h3>

//       <input
//         type="password"
//         name="currentPassword"
//         value={passwords.currentPassword}
//         onChange={handleChange}
//         placeholder="Current password"
//         className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2"
//       />

//       <input
//         type="password"
//         name="newPassword"
//         value={passwords.newPassword}
//         onChange={handleChange}
//         placeholder="New password"
//         className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2"
//       />

//       <input
//         type="password"
//         name="confirmPassword"
//         value={passwords.confirmPassword}
//         onChange={handleChange}
//         placeholder="Confirm new password"
//         className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2"
//       />

//       <button
//         onClick={changePassword}
//         disabled={loading}
//         className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold"
//       >
//         {loading ? "Updating..." : "Change Password"}
//       </button>
//     </div>
//   );
// };

// export default SecuritySettings;

// import { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";

// const SecuritySettings = () => {
//   const [passwords, setPasswords] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });

//   const changePassword = async () => {
//     if (passwords.newPassword !== passwords.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     setLoading(true);
//     try {
//       await api.put("/user/change-password", {
//         currentPassword: passwords.currentPassword,
//         newPassword: passwords.newPassword,
//       });
//       toast.success("Password updated");
//       setPasswords({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Password update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-xl">
//       {/* <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4"> */}
//       <h3 className="text-lg font-semibold mb-4">Change Password</h3>

//       <div className="space-y-1">
//         <label htmlFor="name" className="text-sm font-medium text-gray-300">
//           Current Password
//         </label>
//         <input
//           type="password"
//           name="currentPassword"
//           value={passwords.currentPassword}
//           onChange={handleChange}
//           placeholder="Current password"
//           className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white mb-3"
//         />
//       </div>

//       <div className="space-y-1">
//         <label htmlFor="name" className="text-sm font-medium text-gray-300">
//           New Password
//         </label>
//         <input
//           type="password"
//           name="newPassword"
//           value={passwords.newPassword}
//           onChange={handleChange}
//           placeholder="New password"
//           className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white mb-3"
//         />
//       </div>

//       <div className="space-y-1">
//         <label htmlFor="name" className="text-sm font-medium text-gray-300">
//           Confirm Password
//         </label>
//         <input
//           type="password"
//           name="confirmPassword"
//           value={passwords.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm new password"
//           className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white mb-4"
//         />
//       </div>

//       <button
//         onClick={changePassword}
//         disabled={loading}
//         className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold"
//       >
//         {loading ? "Updating..." : "Change Password"}
//       </button>
//     </div>
//   );
// };

// export default SecuritySettings;

// import { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";

// const SecuritySettings = () => {
//   const [passwords, setPasswords] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [deletePassword, setDeletePassword] = useState("");
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const handleChange = (e) =>
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });

//   // Change Password
//   const changePassword = async () => {
//     if (passwords.newPassword !== passwords.confirmPassword) {
//       return toast.error("Passwords do not match ❌");
//     }

//     setLoading(true);
//     try {
//       await api.put("/user/change-password", {
//         currentPassword: passwords.currentPassword,
//         newPassword: passwords.newPassword,
//       });
//       toast.success("Password updated successfully 🎉");

//       setPasswords({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Password update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete account after password authentication
//   const handleDeleteAccount = async () => {
//     if (!deletePassword) {
//       return toast.error("Please enter your password");
//     }

//     setDeleting(true);
//     try {
//       await api.delete("/user/delete-account", {
//         data: { password: deletePassword },
//       });

//       toast.success("Account successfully deleted");

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.dispatchEvent(new Event("authChanged"));
//       window.location.href = "/signup";
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Delete failed");
//     } finally {
//       setDeleting(false);
//       setShowConfirmModal(false);
//       setDeletePassword("");
//     }
//   };

//   return (
//     <>
//       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-xl text-white space-y-10 shadow-xl">
//         {/* Change Password */}
//         <div className="space-y-6">
//           <h3 className="text-xl font-semibold">Change Password</h3>

//           <input
//             type="password"
//             name="currentPassword"
//             placeholder="Current password"
//             className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
//             value={passwords.currentPassword}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="newPassword"
//             placeholder="New password"
//             className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
//             value={passwords.newPassword}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm new password"
//             className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
//             value={passwords.confirmPassword}
//             onChange={handleChange}
//           />

//           <button
//             onClick={changePassword}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {loading ? "Updating..." : "Change Password"}
//           </button>
//         </div>

//         <div className="border-t border-white/20" />

//         {/* Delete Section */}
//         <div className="text-center space-y-4">
//           <h3 className="text-xl font-semibold text-red-400">Danger Zone</h3>
//           <p className="text-sm text-gray-300">
//             Secure — Authentication Required to Delete Account
//           </p>

//           <button
//             onClick={() => setShowConfirmModal(true)}
//             className="bg-red-700 hover:bg-red-800 text-white w-full py-3 rounded-xl font-semibold transition"
//           >
//             Delete Account
//           </button>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-slate-900 border border-red-500/40 p-6 rounded-xl max-w-sm w-full text-center space-y-5 shadow-xl">
//             <h3 className="text-xl font-semibold text-red-400">
//               Are you absolutely sure?
//             </h3>
//             <p className="text-gray-300 text-sm">
//               This action is irreversible. Please enter your password to verify.
//             </p>

//             <input
//               type="password"
//               placeholder="Enter password to confirm"
//               className="w-full bg-black/40 border border-red-400/40 px-3 py-2 rounded-lg text-white"
//               value={deletePassword}
//               onChange={(e) => setDeletePassword(e.target.value)}
//             />

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleDeleteAccount}
//                 disabled={deleting}
//                 className="flex-1 bg-red-700 hover:bg-red-800 text-white py-2 rounded-lg font-semibold"
//               >
//                 {deleting ? "Deleting..." : "Confirm Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SecuritySettings;

// import { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import { Eye, EyeOff, Lock } from "lucide-react";

// const SecuritySettings = () => {
//   const [passwords, setPasswords] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [deletePassword, setDeletePassword] = useState("");
//   const [showDeletePass, setShowDeletePass] = useState(false);

//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const handleChange = (e) =>
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });

//   // Change Password
//   const changePassword = async () => {
//     if (passwords.newPassword !== passwords.confirmPassword) {
//       return toast.error("Passwords do not match ❌");
//     }

//     setLoading(true);
//     try {
//       await api.put("/user/change-password", {
//         currentPassword: passwords.currentPassword,
//         newPassword: passwords.newPassword,
//       });

//       toast.success("Password updated successfully 🎉");

//       setPasswords({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Password update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Account Securely
//   const handleDeleteAccount = async () => {
//     if (!deletePassword) return toast.error("Enter password to confirm");

//     setDeleting(true);
//     try {
//       await api.delete("/user/delete-account", {
//         data: { password: deletePassword },
//       });

//       toast.success("Account deleted 👋");

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.dispatchEvent(new Event("authChanged"));
//       window.location.href = "/signup";
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Delete failed");
//     } finally {
//       setDeleting(false);
//       setShowConfirmModal(false);
//       setDeletePassword("");
//     }
//   };

//   return (
//     <>
//       {/* Main Panel */}
//       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-xl text-white space-y-10 shadow-xl">
//         {/* Change Password */}
//         <div className="space-y-6">
//           <h3 className="text-xl font-semibold">Change Password</h3>

//           {/* Current Password */}
//           <div className="relative">
//             <input
//               type={showCurrent ? "text" : "password"}
//               name="currentPassword"
//               placeholder="Current password"
//               className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white pr-12"
//               value={passwords.currentPassword}
//               onChange={handleChange}
//             />
//             <button
//               type="button"
//               onClick={() => setShowCurrent(!showCurrent)}
//               className="absolute right-3 top-2.5 text-gray-300 hover:text-white"
//             >
//               {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           {/* New Password */}
//           <div className="relative">
//             <input
//               type={showNew ? "text" : "password"}
//               name="newPassword"
//               placeholder="New password"
//               className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white pr-12"
//               value={passwords.newPassword}
//               onChange={handleChange}
//             />
//             <button
//               type="button"
//               onClick={() => setShowNew(!showNew)}
//               className="absolute right-3 top-2.5 text-gray-300 hover:text-white"
//             >
//               {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <input
//               type={showConfirm ? "text" : "password"}
//               name="confirmPassword"
//               placeholder="Confirm new password"
//               className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white pr-12"
//               value={passwords.confirmPassword}
//               onChange={handleChange}
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirm(!showConfirm)}
//               className="absolute right-3 top-2.5 text-gray-300 hover:text-white"
//             >
//               {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <button
//             onClick={changePassword}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-red-800 to-red-800 hover:scale-[1.02] hover:from-red-800 hover:to-red-900 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {loading ? "Updating..." : "Change Password"}
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-white/20" />

//         {/* Danger Zone */}
//         <div className="text-center space-y-4">
//           <h3 className="text-xl font-semibold text-red-400">Danger Zone</h3>
//           <p className="text-sm text-gray-300">
//             Secure — Authentication Required to Delete Account
//           </p>

//           <button
//             onClick={() => setShowConfirmModal(true)}
//             className="bg-red-800 hover:bg-red-700 text-white w-full py-3 rounded-xl font-semibold transition"
//           >
//             Delete Account
//           </button>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-slate-900 border border-red-500/40 p-6 rounded-xl max-w-sm w-full text-center space-y-5 shadow-xl">
//             <h3 className="text-xl font-semibold text-red-400">
//               Are you absolutely sure?
//             </h3>
//             <p className="text-gray-300 text-sm">
//               This action is irreversible. Enter your password:
//             </p>

//             <div className="relative">
//               <input
//                 type={showDeletePass ? "text" : "password"}
//                 placeholder="Confirm password"
//                 className="w-full bg-black/40 border border-red-400/40 px-3 py-2 rounded-lg text-white pr-12"
//                 value={deletePassword}
//                 onChange={(e) => setDeletePassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowDeletePass(!showDeletePass)}
//                 className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
//               >
//                 {showDeletePass ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleDeleteAccount}
//                 disabled={deleting}
//                 className="flex-1 bg-red-700 hover:bg-red-800 text-white py-2 rounded-lg font-semibold"
//               >
//                 {deleting ? "Deleting..." : "Confirm Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SecuritySettings;

// import React, { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import {
//   Eye,
//   EyeOff,
//   ShieldAlert,
//   KeyRound,
//   AlertTriangle,
// } from "lucide-react";

// const SecuritySettings = () => {
//   const [passwords, setPasswords] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [deletePassword, setDeletePassword] = useState("");
//   const [showDeletePass, setShowDeletePass] = useState(false);

//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const handleChange = (e) =>
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });

//   const changePassword = async () => {
//     if (passwords.newPassword !== passwords.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     setLoading(true);
//     try {
//       await api.put("/user/change-password", {
//         currentPassword: passwords.currentPassword,
//         newPassword: passwords.newPassword,
//       });
//       toast.success("Password updated successfully");
//       setPasswords({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Password update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return <div className="space-y-8">Security Settings UI</div>;
// };

// export default SecuritySettings;

import React, { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  ShieldAlert,
  KeyRound,
  AlertTriangle,
} from "lucide-react";

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePass, setShowDeletePass] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const changePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }

    setLoading(true);
    try {
      await api.put("/user/change-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password updated successfully 🎉");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) return toast.error("Enter password to confirm");

    setDeleting(true);
    try {
      await api.delete("/user/delete-account", {
        data: { password: deletePassword },
      });
      toast.success("Account deleted 👋");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("authChanged"));
      window.location.href = "/signup";
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
      setShowConfirmModal(false);
      setDeletePassword("");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl text-slate-900 space-y-8 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50">
              <KeyRound className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Security Credentials
              </h3>
              <p className="text-sm text-slate-500">
                Regularly updating your password enhances account safety.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Current password */}
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                placeholder="Current password"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 pr-12"
                value={passwords.currentPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-4 text-slate-400"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* New password */}
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                placeholder="New password"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 pr-12"
                value={passwords.newPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-4 text-slate-400"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 pr-12"
                value={passwords.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-4 text-slate-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            onClick={changePassword}
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold disabled:opacity-50"
          >
            {loading ? "Updating Securely..." : "Confirm Password Update"}
          </button>
        </div>

        <div className="border-t border-slate-100" />

        {/* Danger zone */}
        <div className="p-6 rounded-2xl bg-red-50 border border-red-100 space-y-4">
          <div className="flex items-center gap-3 text-red-600">
            <ShieldAlert size={20} />
            <h3 className="font-bold">Dangerous Actions</h3>
          </div>

          <p className="text-sm text-slate-600">
            Deleting your account is permanent.
          </p>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full bg-white text-red-600 border border-red-200 py-3.5 rounded-xl font-bold"
          >
            Proceed to Account Deletion
          </button>
        </div>
      </div>

      {/* Confirm delete modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-white p-8 rounded-3xl max-w-sm w-full space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <AlertTriangle size={32} className="text-red-600" />
            </div>

            <input
              type={showDeletePass ? "text" : "password"}
              placeholder="Verify password"
              className="w-full bg-slate-50 border px-4 py-3 rounded-xl"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-slate-100 py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl"
              >
                {deleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;
