"use client";

/**
 * @file VideoResult.tsx
 * @description What a video run of an Orazaka Studio leaves: the clip in a player with its poster, the exact prompt,
 * what the run recorded (model, seed, frame, length, time, cost, run id), the command that makes it again and a
 * download. Words are props; nothing is fetched.
 */
import { Button } from "@krizaka/ui/button";
import { cn } from "@krizaka/ui/cn";
import { CodeBlock } from "@krizaka/ui/code-block";

/** One fact of the run: `Seed` → `20261011`. */
export interface VideoResultFact {
  /** What it is, translated by the app (`Seed`). */
  label: string;
  /** Its value, as the run recorded it (`20261011`). */
  value: string;
}

/** Every word of the component, translated by the app. */
export interface VideoResultLabels {
  /** The heading of the prompt. */
  prompt: string;
  /** The heading of the run's facts. */
  facts: string;
  /** The heading of the command. */
  reproduce: string;
  /** The copy button of the command. */
  copy: string;
  /** What the copy button says once the command is copied. */
  copied: string;
  /** The download button. */
  download: string;
}

/** Props of {@link VideoResult}. */
export interface VideoResultProps {
  /** The accessible name of the video: what it shows, in a sentence. */
  title: string;
  /** The files: H.264 `mp4` (always), `webm` when there is one, and the poster. */
  sources: { mp4: string; webm?: string; poster: string };
  /** The frame the clip was made in; a portrait one is drawn as tall as a phone allows, a landscape one 16:9. */
  orientation?: "landscape" | "portrait";
  /** The exact prompt that reached the model. */
  prompt: string;
  /** What the run recorded, in reading order (model, seed, frame, length, time, cost, run id). */
  facts: readonly VideoResultFact[];
  /** The CLI command that makes the clip again; without it there is no "Reproduce it". */
  reproduce?: string;
  /** Where the file can be downloaded; without it there is no download button. */
  downloadHref?: string;
  /** The words. */
  labels: VideoResultLabels;
  /** Extra classes on the root, merged last. */
  className?: string;
}

const heading = "font-mono text-xs font-semibold uppercase tracking-[0.14em] text-fg-accent";

/**
 * The result of a video run: player with poster, prompt, facts, "Reproduce it" and download.
 *
 * @param props - {@link VideoResultProps}
 * @returns The result card of a video run.
 */
export function VideoResult({ title, sources, orientation = "landscape", prompt, facts, reproduce, downloadHref, labels, className }: Readonly<VideoResultProps>) {
  return (
    <article className={cn("space-y-5", className)} data-orientation={orientation}>
      <figure className="overflow-hidden rounded-2xl border border-border-default bg-surface-2">
        <video
          aria-label={title}
          poster={sources.poster}
          controls
          playsInline
          preload="none"
          className={cn("mx-auto block w-full object-contain", orientation === "portrait" ? "aspect-[9/16] max-h-[70vh] w-auto" : "aspect-video")}
        >
          {sources.webm && <source src={sources.webm} type="video/webm" />}
          <source src={sources.mp4} type="video/mp4" />
        </video>
      </figure>
      <section aria-label={labels.prompt} className="space-y-2">
        <h3 className={heading}>{labels.prompt}</h3>
        <blockquote lang="en" className="text-sm leading-relaxed text-fg-secondary">{prompt}</blockquote>
      </section>
      <section aria-label={labels.facts} className="space-y-2">
        <h3 className={heading}>{labels.facts}</h3>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-xs">
          {facts.map((fact) => (
            <div key={fact.label} className="contents">
              <dt className="text-fg-muted">{fact.label}</dt>
              <dd className="break-all text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      {reproduce && (
        <section aria-label={labels.reproduce} className="space-y-2">
          <h3 className={heading}>{labels.reproduce}</h3>
          <CodeBlock code={reproduce} language="bash" file="Terminal" copyLabel={labels.copy} copiedLabel={labels.copied} />
        </section>
      )}
      {downloadHref && (
        <Button asChild variant="secondary" size="md">
          <a href={downloadHref} download>
            {labels.download}
          </a>
        </Button>
      )}
    </article>
  );
}
