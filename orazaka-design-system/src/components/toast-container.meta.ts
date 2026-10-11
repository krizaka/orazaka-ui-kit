import type { ComponentMeta } from "../meta";

export const meta = {
  title: "Toast container (1.x)",
  summary: "The 1.x controlled list of toasts (`toasts`, `onDismiss`), drawn by the @krizaka/ui `Toaster`.",
  why: "Kept so that the apps written against 1.x keep their notifications while they migrate to `toast()`.",
  status: "deprecated",
  deprecated: { since: "2.3.0", use: "ui/toast", removedIn: "3.0.0" },
  category: "feedback",
  platforms: "web",
  builtOn: ["ui/toast"],
  whenToUse: ["Never in new code: mount `Toaster` once and call `toast.success(…)` from `@krizaka/ui/toast`."],
  whenNotToUse: [{ when: "Anywhere new: it is deprecated.", use: "ui/toast" }],
  bestPractices: ["Pass `label` and `closeLabel` translated until the migration."],
  accessibility: { keyboard: [], notes: ["The primitive's: a polite live region named by `label`."] },
  related: ["ui/toast"],
  web: { imports: ["ToastContainer"], examples: [] },
} satisfies ComponentMeta;
