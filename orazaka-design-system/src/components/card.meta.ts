import type { ComponentMeta } from "../meta";

export const meta = {
  title: "Card (1.x)",
  summary: "The 1.x card parts — `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` — drawn by the @krizaka/ui card.",
  why: "Kept so that the apps written against 1.x keep their look while they migrate: no markup of its own any more.",
  status: "deprecated",
  deprecated: { since: "2.3.0", use: "ui/card", removedIn: "3.0.0" },
  category: "layout",
  platforms: "web",
  builtOn: ["ui/card"],
  whenToUse: ["Never in new code: write `Card.Root`, `Card.Body`, `Card.Title`… from `@krizaka/ui/card`."],
  whenNotToUse: [{ when: "Anywhere new: it is deprecated.", use: "ui/card" }],
  bestPractices: ["Migrate part by part: `Card` → `Card.Root`, `CardContent` → `Card.Body padding=\"lg\"`, `CardTitle` → `Card.Title`."],
  accessibility: { keyboard: [], notes: ["The primitive's: plain blocks; give a heading level to the title."] },
  related: ["ui/card"],
  web: { imports: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter"], examples: [] },
} satisfies ComponentMeta;
