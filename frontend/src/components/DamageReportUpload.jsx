import React, { useState } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import api from "../utils/api";
import { toast } from "react-toastify";

const DamageReportUpload = ({
  bookingId,
  type,
  onUploadSuccess,
  existingImages = [],
  locked = false,
}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (locked) return;
    const selectedFiles = Array.from(e.target.files);

    // Limit to 10 files
    if (files.length + selectedFiles.length > 10) {
      toast.warning("You can only upload up to 10 images");
      return;
    }

    setFiles((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    if (locked) return;
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const endpoint =
        type === "before"
          ? `/damage/${bookingId}/before`
          : `/damage/${bookingId}/after`;

      const res = await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      onUploadSuccess(res.data.report);
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  if (locked && existingImages.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="text-blue-500" size={20} />
          <h3 className="font-bold text-slate-900">
            {type === "before"
              ? "Vehicle Pickup Photos"
              : "Vehicle Return Photos"}
          </h3>
        </div>
        {locked && (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">
            <CheckCircle size={12} />
            Submitted
          </span>
        )}
      </div>

      <p className="text-sm text-slate-500">
        {type === "before"
          ? "Upload clear photos of the vehicle from all angles before the rental begins."
          : "Upload clear photos of the vehicle from all angles after the rental is completed."}
      </p>

      {/* Existing Images (if locked) */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {existingImages.map((img, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl overflow-hidden border border-slate-100 relative group"
            >
              <img
                src={
                  img.startsWith("http")
                    ? img
                    : `http://localhost:5000${img.replace(/\\/g, "/").startsWith("/") ? "" : "/"}${img.replace(/\\/g, "/")}`
                }
                alt=""
                className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload Interface (if not locked) */}
      {!locked && (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {previews.map((url, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-xl overflow-hidden border border-slate-200 relative"
              >
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeFile(idx)}
                  className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm p-1 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {files.length < 10 && (
              <label className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition group">
                <Upload
                  className="text-slate-400 group-hover:text-blue-500 mb-1"
                  size={24}
                />
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-500 uppercase">
                  Add Photo
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 ${
                uploading || files.length === 0
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
              }`}
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Submit Report
                </>
              )}
            </button>
          </div>

          <div className="flex gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
            <AlertCircle className="text-amber-500 shrink-0" size={16} />
            <p className="text-[11px] text-amber-700 leading-normal">
              <strong>Note:</strong> Once submitted, pickup photos cannot be
              edited. Ensure they clearly document the current state of the
              vehicle.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DamageReportUpload;
