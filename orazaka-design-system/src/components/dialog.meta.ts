import type { ComponentMeta } from "../meta";

export const meta = {
  title: "Dialog (1.x)",
  summary: "The 1.x modal (`open`, `onClose`, `title`, `description`), drawn by the @krizaka/ui dialog.",
  why: "Kept so that the apps written against 1.x keep working: focus trap, Escape and outside click now come from the primitive.",
  status: "deprecated",
  deprecated: { since: "2.3.0", use: "ui/dialog", removedIn: "3.0.0" },
  category: "overlays",
  platforms: "web",
  builtOn: ["ui/dialog"],
  whenToUse: ["Never in new code: compose `Dialog.Root` / `Dialog.Content` / `Dialog.Header` / `Dialog.Title` / `Dialog.Body` from `@krizaka/ui/dialog`."],
  whenNotToUse: [{ when: "Anywhere new: it is deprecated.", use: "ui/dialog" }],
  bestPractices: ["Pass `closeLabel` translated until the migration."],
  accessibility: { keyboard: [{ keys: "Esc", action: "Closes it and returns the focus." }], notes: ["The primitive's: a modal dialog named by its title."] },
  related: ["ui/dialog"],
  web: { imports: ["Dialog"], examples: [] },
} satisfies ComponentMeta;
