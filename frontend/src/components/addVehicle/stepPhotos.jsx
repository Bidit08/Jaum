// import React, { useRef } from "react";
// import { Image as ImageIcon, X, Plus, Camera } from "lucide-react";

// const StepPhotos = ({ formData, updateFormData }) => {
//   const fileInputRef = useRef(null);

//   const handleFileSelect = (e) => {
//     const files = e.target.files;
//     if (!files) return;

//     // Simulate instant upload by creating local blobs
//     const newPhotos = Array.from(files).map((file) =>
//       URL.createObjectURL(file)
//     );

//     updateFormData({
//       photos: [...formData.photos, ...newPhotos],
//     });
//   };

//   const removePhoto = (index) => {
//     updateFormData({
//       photos: formData.photos.filter((_, i) => i !== index),
//     });
//   };

//   return (
//     <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
//       <div className="space-y-2">
//         <h2 className="text-xl font-bold text-slate-900">Gallery</h2>
//         <p className="text-slate-500 text-sm">
//           Add high-quality photos. Listings with 5+ photos get 3x more bookings.
//         </p>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {formData.photos.map((photo, idx) => (
//           <div
//             key={idx}
//             className="aspect-square rounded-2xl border border-slate-200 bg-slate-100 relative group overflow-hidden"
//           >
//             <img
//               src={photo}
//               alt="Car"
//               className="w-full h-full object-cover transition-transform group-hover:scale-105"
//             />

//             <button
//               onClick={() => removePhoto(idx)}
//               className="absolute top-2 right-2 p-1.5 bg-white shadow-md text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={() => fileInputRef.current && fileInputRef.current.click()}
//           className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-400 transition-all flex flex-col items-center justify-center gap-2 group text-slate-400 hover:text-blue-600"
//         >
//           <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
//             <Plus size={24} />
//           </div>
//           <span className="text-xs font-bold uppercase tracking-wider">
//             Add Photo
//           </span>
//         </button>
//       </div>

//       <input
//         type="file"
//         ref={fileInputRef}
//         multiple
//         accept="image/*"
//         hidden
//         onChange={handleFileSelect}
//       />

//       <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 flex gap-3 items-center">
//         <Camera size={20} className="text-blue-500" />
//         <p className="text-xs text-blue-700 font-medium">
//           Tip: Take photos in daylight and include interior shots.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default StepPhotos;

import React, { useRef, useState } from "react";
import { X, Plus, Camera } from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const StepPhotos = ({ formData, updateFormData }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const formDataUpload = new FormData();
    files.forEach((file) => formDataUpload.append("photos", file));

    try {
      setUploading(true);

      const res = await api.post("/listings/upload/photos", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      updateFormData({
        photos: [...formData.photos, ...res.data.photos],
      });
    } catch (err) {
      toast.error("Photo upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removePhoto = (index) => {
    const updated = [...formData.photos];
    updated.splice(index, 1);
    updateFormData({ photos: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Vehicle Photos</h2>
        <p className="text-slate-500 text-sm">
          Upload at least one photo. First photo is the cover.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {formData.photos.map((photo, idx) => (
          <div
            key={idx}
            className="relative aspect-square rounded-xl overflow-hidden border"
          >
            <img
              src={`http://localhost:5000${photo}`}
              alt="Vehicle"
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => removePhoto(idx)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow text-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
          className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-600"
        >
          <Plus size={24} />
          <span className="text-xs font-bold">
            {uploading ? "UPLOADING..." : "ADD PHOTO"}
          </span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={handleFileSelect}
      />

      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
        <Camera size={18} className="text-blue-500" />
        <p className="text-xs text-blue-700">
          Photos are uploaded securely to the server.
        </p>
      </div>
    </div>
  );
};

export default StepPhotos;
