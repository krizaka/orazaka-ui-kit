"use client";

import { Dialog as KzDialog } from "@krizaka/ui/dialog";
import type * as React from "react";

/**
 * Props for the {@link Dialog} modal component (the 1.x API).
 */
export interface DialogProps {
  /** Controls visibility. When false the dialog is fully unmounted. */
  open: boolean;
  /** Invoked on Escape, a click outside, or the close button. */
  onClose: () => void;
  /** Optional heading rendered in the panel header. */
  title?: string;
  /** Optional sub-heading rendered beneath the title. */
  description?: string;
  /** Accessible label for the close (×) button. */
  closeLabel?: string;
  /** Panel body. */
  children: React.ReactNode;
}

/**
 * The 1.x modal dialog, drawn by the @krizaka/ui dialog (Radix: focus trap, scroll lock, Escape, outside click, focus
 * return). Same props as 1.x; without a `title` or a `description` it has no header and no close button, as before.
 *
 * @deprecated Since 2.3, removed in 3.0 — compose `Dialog.Root` / `Dialog.Content` / `Dialog.Header` / `Dialog.Title`
 * / `Dialog.Body` from `@krizaka/ui/dialog`.
 * @param props - {@link DialogProps}
 * @returns A portalled dialog, or nothing when closed.
 */
export function Dialog({ open, onClose, title, description, closeLabel = "Close", children }: Readonly<DialogProps>) {
  const header = Boolean(title || description);
  return (
    <KzDialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      {header ? (
        <KzDialog.Content closeLabel={closeLabel} {...(description ? {} : { "aria-describedby": undefined })}>
          <KzDialog.Header>
            {title ? <KzDialog.Title>{title}</KzDialog.Title> : null}
            {description ? <KzDialog.Description>{description}</KzDialog.Description> : null}
          </KzDialog.Header>
          <KzDialog.Body>{children}</KzDialog.Body>
        </KzDialog.Content>
      ) : (
        <KzDialog.Content hideClose aria-describedby={undefined}>
          <KzDialog.Body className="pt-5">{children}</KzDialog.Body>
        </KzDialog.Content>
      )}
    </KzDialog.Root>
  );
}
