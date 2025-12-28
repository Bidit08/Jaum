// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { toast } from "react-toastify";
// import { User } from "lucide-react";

// export default function ProfileTab() {
//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     bio: "",
//     dob: "",
//     email: "",
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     api.get("/auth/profile").then((res) => {
//       setForm({
//         name: res.data.name || "",
//         username: res.data.username || "",
//         bio: res.data.bio || "",
//         dob: res.data.dob ? res.data.dob.split("T")[0] : "",
//         email: res.data.email || "",
//       });
//     });
//   }, []);

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await api.put("/auth/profile", form);

//       // Update navbar name
//       const stored = JSON.parse(localStorage.getItem("user"));
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ ...stored, name: res.data.name })
//       );
//       window.dispatchEvent(new Event("authChanged"));

//       toast.success("Profile updated");
//     } catch {
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Header */}
//       <Card className="mb-6">
//         <CardContent className="flex gap-6 items-center py-6">
//           <Avatar className="h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl">
//             <AvatarFallback>
//               {form.name?.charAt(0)?.toUpperCase()}
//             </AvatarFallback>
//           </Avatar>

//           <div className="flex-1 space-y-4">
//             <div>
//               <label className="text-sm text-gray-500">Full Name</label>
//               <Input
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-500">Username</label>
//               <Input
//                 placeholder="@username"
//                 value={form.username}
//                 onChange={(e) => setForm({ ...form, username: e.target.value })}
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Personal Info */}
//       <Card>
//         <CardContent className="space-y-6 py-6">
//           <h2 className="text-lg font-semibold flex items-center gap-2">
//             <User className="h-5 w-5" />
//             Personal Information
//           </h2>

//           <div>
//             <label className="text-sm text-gray-500">Bio</label>
//             <Input
//               placeholder="Tell us about yourself"
//               value={form.bio}
//               onChange={(e) => setForm({ ...form, bio: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-500">Date of Birth</label>
//             <Input
//               type="date"
//               value={form.dob}
//               onChange={(e) => setForm({ ...form, dob: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-500">Email</label>
//             <Input value={form.email} disabled />
//           </div>

//           <Button
//             onClick={handleSave}
//             disabled={loading}
//             className="bg-cyan-600 hover:bg-cyan-700"
//           >
//             {loading ? "Saving..." : "Save Changes"}
//           </Button>
//         </CardContent>
//       </Card>
//     </>
//   );
// }

// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { toast } from "react-toastify";
// import { User } from "lucide-react";

// export default function ProfileTab() {
//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     bio: "",
//     dob: "",
//     email: "",
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     api.get("/auth/profile").then((res) => {
//       setForm({
//         name: res.data.name || "",
//         username: res.data.username || "",
//         bio: res.data.bio || "",
//         dob: res.data.dob ? res.data.dob.split("T")[0] : "",
//         email: res.data.email || "",
//       });
//     });
//   }, []);

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await api.put("/auth/profile", form);

//       const stored = JSON.parse(localStorage.getItem("user"));
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ ...stored, name: res.data.name })
//       );
//       window.dispatchEvent(new Event("authChanged"));

//       toast.success("Profile updated");
//     } catch {
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Header Card */}
//       <Card className="mb-6 bg-white/10 backdrop-blur-xl border-white/20">
//         <CardContent className="flex flex-col md:flex-row gap-6 items-center py-6">
//           <Avatar className="h-24 w-24 text-4xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg">
//             <AvatarFallback>
//               {form.name?.charAt(0)?.toUpperCase()}
//             </AvatarFallback>
//           </Avatar>

//           <div className="flex-1 w-full space-y-4">
//             <div>
//               <label className="text-sm text-gray-300">Full Name</label>
//               <Input
//                 className="bg-white/20 border-white/30 text-white"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-300">Username</label>
//               <Input
//                 className="bg-white/20 border-white/30 text-white"
//                 placeholder="@username"
//                 value={form.username}
//                 onChange={(e) => setForm({ ...form, username: e.target.value })}
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Personal Info */}
//       <Card className="bg-white/10 backdrop-blur-xl border-white/20">
//         <CardContent className="space-y-6 py-6">
//           <h2 className="text-lg font-semibold flex items-center gap-2">
//             <User className="h-5 w-5 text-cyan-400" />
//             Personal Information
//           </h2>

//           <div>
//             <label className="text-sm text-gray-300">Bio</label>
//             <Input
//               className="bg-white/20 border-white/30 text-white"
//               placeholder="Tell us about yourself"
//               value={form.bio}
//               onChange={(e) => setForm({ ...form, bio: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-300">Date of Birth</label>
//             <Input
//               type="date"
//               className="bg-white/20 border-white/30 text-white"
//               value={form.dob}
//               onChange={(e) => setForm({ ...form, dob: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-300">Email</label>
//             <Input
//               className="bg-white/10 border-white/20 text-gray-400"
//               value={form.email}
//               disabled
//             />
//           </div>

//           <Button
//             onClick={handleSave}
//             disabled={loading}
//             className="bg-cyan-500 hover:bg-cyan-600"
//           >
//             {loading ? "Saving..." : "Save Changes"}
//           </Button>
//         </CardContent>
//       </Card>
//     </>
//   );
// }

// const ProfileTabs = ({ activeTab, setActiveTab }) => {
//   const tabs = [
//     { id: "profile", label: "Profile" },
//     { id: "security", label: "Security" },
//     { id: "bookings", label: "My Bookings" },
//   ];

//   return (
//     <div className="flex bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-1 mb-10">
//       {tabs.map((tab) => (
//         <button
//           key={tab.id}
//           onClick={() => setActiveTab(tab.id)}
//           className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
//             activeTab === tab.id
//               ? "bg-black/80 text-white"
//               : "text-gray-300 hover:bg-white/10"
//           }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default ProfileTabs;

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "bookings", label: "My Bookings" },
  ];

  return (
    <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1 mb-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === tab.id
              ? "bg-black/80 text-white"
              : "text-gray-300 hover:bg-white/10"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
