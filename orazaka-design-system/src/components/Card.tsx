import {
  CardBody,
  CardDescription as KzCardDescription,
  CardFooter as KzCardFooter,
  CardRoot,
  CardTitle as KzCardTitle,
} from "@krizaka/ui/card";
import { cn } from "@krizaka/ui/cn";
import type * as React from "react";

/*
 * The 1.x card API, kept for the apps not yet migrated and drawn by the @krizaka/ui card (`Card.Root`, `Card.Body`,
 * `Card.Title`…): no markup of its own any more. Each part keeps its 1.x look through `className` (merged last, the
 * caller's override still wins). Deprecated since 2.3, removed in 3.0 — write `import { Card } from "@krizaka/ui/card"`
 * (`Card.Root` / `Card.Body padding="lg"` / `Card.Title` / `Card.Description` / `Card.Footer`).
 */

type DivProps = Readonly<React.HTMLAttributes<HTMLDivElement>>;

/**
 * The card container: surface-1, subtle border, stronger border on hover.
 *
 * @deprecated Since 2.3 — use `Card.Root` from `@krizaka/ui/card`.
 * @param props - div attributes.
 * @returns A card element.
 */
export function Card({ className, ...props }: DivProps) {
  return (
    <CardRoot
      className={cn(
        "block overflow-visible border-border-subtle shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-border-default",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Groups CardTitle and CardDescription.
 *
 * @deprecated Since 2.3 — use `Card.Body padding="lg"` from `@krizaka/ui/card`.
 * @param props - div attributes.
 * @returns The header block.
 */
export function CardHeader({ className, ...props }: DivProps) {
  return <CardBody padding="lg" className={cn("flex-none gap-1.5", className)} {...props} />;
}

/**
 * The card's heading (h3).
 *
 * @deprecated Since 2.3 — use `Card.Title` from `@krizaka/ui/card`.
 * @param props - heading attributes and children.
 * @returns A level-3 heading.
 */
export function CardTitle({
  className,
  children,
  ...props
}: Readonly<React.HTMLAttributes<HTMLHeadingElement>> & { children: React.ReactNode }) {
  return (
    <KzCardTitle
      className={cn("line-clamp-none text-lg leading-none font-semibold tracking-tight group-hover:text-fg", className)}
      {...props}
    >
      {children}
    </KzCardTitle>
  );
}

/**
 * Secondary text under the title.
 *
 * @deprecated Since 2.3 — use `Card.Description` from `@krizaka/ui/card`.
 * @param props - paragraph attributes.
 * @returns A paragraph.
 */
export function CardDescription({ className, ...props }: Readonly<React.HTMLAttributes<HTMLParagraphElement>>) {
  return <KzCardDescription className={cn("line-clamp-none text-sm", className)} {...props} />;
}

/**
 * The card body.
 *
 * @deprecated Since 2.3 — use `Card.Body padding="lg"` from `@krizaka/ui/card`.
 * @param props - div attributes.
 * @returns The content block.
 */
export function CardContent({ className, ...props }: DivProps) {
  return <CardBody padding="lg" className={cn("block pt-0", className)} {...props} />;
}

/**
 * The action or status row at the bottom of the card.
 *
 * @deprecated Since 2.3 — use `Card.Footer` from `@krizaka/ui/card`.
 * @param props - div attributes.
 * @returns The footer block.
 */
export function CardFooter({ className, ...props }: DivProps) {
  return <KzCardFooter className={cn("mt-0 border-t-0 p-6 pt-0 text-sm text-fg", className)} {...props} />;
}
