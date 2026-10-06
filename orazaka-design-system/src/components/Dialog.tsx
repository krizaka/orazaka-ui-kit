"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Icon } from "../icon";

/**
 * Props for the {@link Dialog} modal component.
 */
export interface DialogProps {
  /** Controls visibility. When false the dialog is fully unmounted. */
  open: boolean;
  /** Invoked on Escape, backdrop click, or the close button. */
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
 * Accessible modal dialog — Calm Obsidian 2026 design.
 *
 * <p>Renders through a portal into <body>, traps Escape/backdrop interactions,
 * locks body scroll while open, and references only theme CSS variables so it
 * reads correctly across every theme (dark, light, custom, cyberpunk, …).
 *
 * @param props - {@link DialogProps}
 * @returns A portalled dialog element, or null when closed.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  closeLabel = "Close",
  children,
}: Readonly<DialogProps>) {
  const [mounted, setMounted] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descId = React.useId();

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onMouseDown={onClose}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[hsla(0,0%,0%,0.55)] backdrop-blur-sm animate-in fade-in duration-200"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-1)] shadow-[var(--shadow-lg)] outline-none animate-in fade-in zoom-in-95 duration-200"
      >
        {(title || description) && (
          <header className="flex items-start justify-between gap-3 border-b border-[var(--border-subtle)] px-5 py-4">
            <div className="space-y-1">
              {title && (
                <h2
                  id={titleId}
                  className="text-base font-semibold text-[var(--text-primary)]"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id={descId}
                  className="text-xs text-[var(--text-secondary)]"
                >
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <Icon name="close" size={18} />
            </button>
          </header>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
