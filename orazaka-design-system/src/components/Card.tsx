import { cn } from "@krizaka/ui/cn";
import type * as React from "react";

/*
 * The Orazaka card, kept here — tokenized — until `@krizaka/ui/card` ships; it will then be re-exported from it.
 * Roles only, `className` merged last (the override wins).
 */

/**
 * The card container: surface-1, subtle border, stronger border on hover.
 *
 * @param props - div attributes.
 * @returns A card element.
 */
export function Card({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-subtle bg-surface-1 text-fg shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-border-default",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Groups CardTitle and CardDescription.
 *
 * @param props - div attributes.
 * @returns The header block.
 */
export function CardHeader({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

/**
 * The card's heading (h3).
 *
 * @param props - heading attributes and children.
 * @returns A level-3 heading.
 */
export function CardTitle({
  className,
  children,
  ...props
}: Readonly<React.HTMLAttributes<HTMLHeadingElement>> & { children: React.ReactNode }) {
  return (
    <h3 className={cn("text-lg leading-none font-semibold tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
}

/**
 * Secondary text under the title.
 *
 * @param props - paragraph attributes.
 * @returns A paragraph.
 */
export function CardDescription({ className, ...props }: Readonly<React.HTMLAttributes<HTMLParagraphElement>>) {
  return <p className={cn("text-sm text-fg-secondary", className)} {...props} />;
}

/**
 * The card body.
 *
 * @param props - div attributes.
 * @returns The content block.
 */
export function CardContent({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

/**
 * The action or status row at the bottom of the card.
 *
 * @param props - div attributes.
 * @returns The footer block.
 */
export function CardFooter({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
