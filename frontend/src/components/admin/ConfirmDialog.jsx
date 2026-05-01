import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  ShieldBan,
  Trash2,
  XCircle,
  PauseCircle,
  PlayCircle,
  Star,
} from "lucide-react";

const VARIANTS = {
  approve: {
    icon: CheckCircle,
    iconClass: "text-emerald-500",
    iconBg: "bg-emerald-50",
    confirmClass: "bg-emerald-600 hover:bg-emerald-700",
    confirmLabel: "Approve",
  },
  reject: {
    icon: XCircle,
    iconClass: "text-red-500",
    iconBg: "bg-red-50",
    confirmClass: "bg-red-600 hover:bg-red-700",
    confirmLabel: "Reject",
  },
  delete: {
    icon: Trash2,
    iconClass: "text-red-500",
    iconBg: "bg-red-50",
    confirmClass: "bg-red-600 hover:bg-red-700",
    confirmLabel: "Delete",
  },
  suspend: {
    icon: ShieldBan,
    iconClass: "text-amber-500",
    iconBg: "bg-amber-50",
    confirmClass: "bg-amber-600 hover:bg-amber-700",
    confirmLabel: "Suspend",
  },
  activate: {
    icon: CheckCircle,
    iconClass: "text-emerald-500",
    iconBg: "bg-emerald-50",
    confirmClass: "bg-emerald-600 hover:bg-emerald-700",
    confirmLabel: "Activate",
  },
  pause: {
    icon: PauseCircle,
    iconClass: "text-amber-500",
    iconBg: "bg-amber-50",
    confirmClass: "bg-amber-600 hover:bg-amber-700",
    confirmLabel: "Pause",
  },
  unpause: {
    icon: PlayCircle,
    iconClass: "text-blue-500",
    iconBg: "bg-blue-50",
    confirmClass: "bg-blue-600 hover:bg-blue-700",
    confirmLabel: "Activate",
  },
  feature: {
    icon: Star,
    iconClass: "text-amber-500",
    iconBg: "bg-amber-50",
    confirmClass: "bg-amber-500 hover:bg-amber-600",
    confirmLabel: "Feature",
  },
  unfeature: {
    icon: Star,
    iconClass: "text-slate-400",
    iconBg: "bg-slate-50",
    confirmClass: "bg-slate-600 hover:bg-slate-700",
    confirmLabel: "Unfeature",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-amber-500",
    iconBg: "bg-amber-50",
    confirmClass: "bg-amber-600 hover:bg-amber-700",
    confirmLabel: "Confirm",
  },
};

/**
 * Generic reusable confirmation dialog for admin actions.
 *
 * Props:
 *  - variant: keyof VARIANTS (e.g. "approve", "delete", "suspend")
 *  - title: dialog heading
 *  - message: body text (can include <strong> tags via dangerouslySetInnerHTML or pass a node)
 *  - confirmLabel: override button text (optional)
 *  - loading: boolean
 *  - onConfirm: function
 *  - onCancel: function
 */
export default function ConfirmDialog({
  variant = "warning",
  title,
  message,
  confirmLabel,
  loading = false,
  onConfirm,
  onCancel,
}) {
  const v = VARIANTS[variant] || VARIANTS.warning;
  const Icon = v.icon;
  const label = confirmLabel || v.confirmLabel;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in-95 duration-200">
        {/* Icon */}
        <div
          className={`w-13 h-13 ${v.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 w-14 h-14`}
        >
          <Icon size={24} className={v.iconClass} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 text-center mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-slate-500 text-sm text-center leading-relaxed mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-xl text-white font-semibold transition text-sm disabled:opacity-60 ${v.confirmClass}`}
          >
            {loading ? `${label}…` : label}
          </button>
        </div>
      </div>
    </div>
  );
}
