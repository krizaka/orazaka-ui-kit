import type { IconName } from "../icon";

/** One entry of the palette. */
export interface CommandPaletteItem {
  /** Stable id (also the cmdk value, with the label). */
  id: string;
  /** What the person reads — passed translated. */
  label: string;
  icon: IconName;
  /** Where it goes: handed to `onNavigate`. */
  href?: string;
  /** What it does, instead of (or after) navigating. */
  onSelect?: () => void;
  /** The group heading it sits under — passed translated. */
  section: string;
  /** More words the filter matches. */
  keywords?: string[];
}

/** The words of the palette — passed translated. */
export interface CommandPaletteLabels {
  /** The accessible name of the palette (the dialog and the combobox). */
  label: string;
  placeholder: string;
  /** The accessible name of the list of results. */
  results: string;
  /** Shown when nothing matches. */
  empty: string;
  /** Footer hints. */
  navigate: string;
  open: string;
  close: string;
}

/**
 * The 1.x words, in English: what a palette given no `labels` shows.
 *
 * @deprecated Since 2.3 — pass `labels`, translated. Removed in 3.0.
 */
export const LEGACY_LABELS: CommandPaletteLabels = {
  label: "Command palette",
  placeholder: "Type a command or search...",
  results: "Commands",
  empty: "No commands found",
  navigate: "Navigate",
  open: "Open",
  close: "Close",
};

/**
 * The 1.x entries (routes of the 1.x web client, English words): what a palette given no `commands` lists.
 *
 * @deprecated Since 2.3 — pass `commands`, the app's own routes with translated labels. Removed in 3.0.
 */
export const LEGACY_COMMANDS: CommandPaletteItem[] = [
  { id: "dashboard", label: "Go to Dashboard", icon: "dashboard", href: "/", section: "Navigation" },
  { id: "chat", label: "Open Chat", icon: "chat", href: "/chat", section: "Navigation" },
  { id: "playground", label: "Open Playground", icon: "playground", href: "/playground", section: "Navigation" },
  { id: "settings", label: "Settings", icon: "settings", href: "/settings", section: "Navigation" },
  { id: "profile", label: "View Profile", icon: "profile", href: "/profile", section: "Navigation" },
  { id: "jobs", label: "Jobs History", icon: "history", href: "/dashboard/jobs", section: "Navigation" },
  { id: "admin", label: "Admin Panel", icon: "admin", href: "/dashboard/admin", section: "Navigation" },
  { id: "new-chat", label: "Start New Chat", icon: "newChat", href: "/chat", section: "Actions" },
  { id: "video-gen", label: "Generate Video", icon: "video", href: "/playground/video/generate", section: "Playground" },
  { id: "video-analyze", label: "Analyze Video", icon: "vision", href: "/playground/video/analyze", section: "Playground" },
  { id: "audio-analyze", label: "Analyze Audio", icon: "audio", href: "/playground/audio/analyze", section: "Playground" },
  { id: "text-chat", label: "Text Chat", icon: "text", href: "/playground/text/chat", section: "Playground" },
  { id: "image-gen", label: "Generate Image", icon: "image", href: "/playground/image/generate", section: "Playground" },
  { id: "code-scaffold", label: "Feature to Code", icon: "code", href: "/playground/code/scaffold", section: "Playground" },
];
