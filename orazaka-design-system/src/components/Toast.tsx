"use client";

import { cn } from "@krizaka/ui/cn";

import { Icon, type IconName } from "../icon";

/**
 * Supported toast notification types.
 */
export type ToastVariant = "success" | "error" | "warning" | "info";

/**
 * A single toast notification entry.
 */
export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  exiting?: boolean;
}

const ICONS: Record<ToastVariant, IconName> = {
  success: "checkCircle",
  error: "error",
  warning: "warning",
  info: "info",
};

/** The status colour of the icon — a role, the same in both modes. */
const ICON_COLORS: Record<ToastVariant, string> = {
  success: "text-success",
  error: "text-danger",
  warning: "text-warning",
  info: "text-accent",
};

const BORDER_COLORS: Record<ToastVariant, string> = {
  success: "border-success/20",
  error: "border-danger/20",
  warning: "border-warning/20",
  info: "border-accent/20",
};

/**
 * Renders a single toast notification with auto-dismiss and exit animation.
 *
 * @param props - The toast properties.
 * @param props.toast - The toast item data.
 * @param props.onDismiss - Callback to dismiss the toast.
 * @returns A styled toast notification element.
 */
function ToastEntry({
  toast,
  onDismiss,
}: Readonly<{
  toast: ToastItem;
  onDismiss: (id: string) => void;
}>) {
  const iconName = ICONS[toast.variant];

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto flex items-start gap-3.5 rounded-xl border bg-surface-1/90 px-4 py-3 text-fg shadow-lg backdrop-blur-md transition-all duration-300",
        toast.exiting ? "toast-exit" : "toast-enter",
        BORDER_COLORS[toast.variant],
      )}
    >
      <div className={cn("mt-0.5 shrink-0 rounded-lg bg-fg/5 p-1", ICON_COLORS[toast.variant])}>
        <Icon name={iconName} size={15} />
      </div>
      <p className="mt-0.5 flex-1 pr-1 text-sm leading-relaxed font-medium">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="mt-0.5 shrink-0 rounded-lg p-1 text-fg-muted transition-all duration-150 hover:bg-fg/5 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Dismiss notification"
      >
        <Icon name="close" size={14} />
      </button>
    </div>
  );
}

/**
 * Toast container that renders all active notifications.
 * Positioned at bottom-right on desktop, bottom-center on mobile.
 *
 * @param props - Container properties.
 * @param props.toasts - List of active toast items.
 * @param props.onDismiss - Callback to dismiss a toast by ID.
 * @returns A portal-style toast container element.
 */
export function ToastContainer({
  toasts,
  onDismiss,
}: Readonly<{
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}>) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastEntry toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
