"use client";

import { toast, Toaster } from "@krizaka/ui/toast";
import * as React from "react";

/**
 * Supported toast notification types.
 *
 * @deprecated Since 2.3 — `toast.success / error / warning / info` from `@krizaka/ui/toast`.
 */
export type ToastVariant = "success" | "error" | "warning" | "info";

/**
 * A single toast notification entry.
 *
 * @deprecated Since 2.3 — `toast(message, { id })` from `@krizaka/ui/toast`.
 */
export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  exiting?: boolean;
}

/** Props of {@link ToastContainer}. */
export interface ToastContainerProps {
  /** The active toasts (controlled): a new id is shown, a removed id is dismissed. */
  toasts: ToastItem[];
  /** Called with the id when a toast is closed or times out. */
  onDismiss: (id: string) => void;
  /** The accessible name of the notifications region — 1.x had none; pass it translated. */
  label?: string;
  /** The accessible name of each close button (1.x: "Dismiss notification"); pass it translated. */
  closeLabel?: string;
}

/**
 * The 1.x controlled toast list, drawn by the @krizaka/ui `Toaster` (sonner, styled by roles): each item of `toasts`
 * becomes a `toast[variant]` with its id, and each removed id is dismissed. Mount it once, like the `Toaster`.
 *
 * @deprecated Since 2.3, removed in 3.0 — mount `<Toaster label closeLabel />` from `@krizaka/ui/toast` once and call
 * `toast.success(message)`.
 * @param props - {@link ToastContainerProps}
 * @returns The toaster.
 */
export function ToastContainer({
  toasts,
  onDismiss,
  label = "Notifications",
  closeLabel = "Dismiss notification",
}: Readonly<ToastContainerProps>) {
  const shown = React.useRef(new Set<string>());
  const dismiss = React.useRef(onDismiss);
  dismiss.current = onDismiss;

  React.useEffect(() => {
    const ids = new Set(toasts.map((item) => item.id));
    for (const item of toasts) {
      if (shown.current.has(item.id) || item.exiting) continue;
      shown.current.add(item.id);
      const close = () => {
        shown.current.delete(item.id);
        dismiss.current(item.id);
      };
      toast[item.variant](item.message, { id: item.id, onDismiss: close, onAutoClose: close });
    }
    for (const id of [...shown.current]) {
      if (ids.has(id)) continue;
      shown.current.delete(id);
      toast.dismiss(id);
    }
  }, [toasts]);

  return <Toaster label={label} closeLabel={closeLabel} />;
}
