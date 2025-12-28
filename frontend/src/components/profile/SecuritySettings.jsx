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

import { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const changePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      await api.put("/user/change-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password updated");
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

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-xl">
      {/* <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4"> */}
      <h3 className="text-lg font-semibold mb-4">Change Password</h3>

      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-300">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
          placeholder="Current password"
          className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white mb-3"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-300">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          placeholder="New password"
          className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white mb-3"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-300">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
          className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white mb-4"
        />
      </div>

      <button
        onClick={changePassword}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold"
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
};

export default SecuritySettings;
