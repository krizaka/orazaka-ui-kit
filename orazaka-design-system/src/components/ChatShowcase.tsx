"use client";

/**
 * @file ChatShowcase.tsx
 * @description Self-playing, sovereign AI-chat showcase — Calm Obsidian 2026.
 *
 * A code-driven mockup of the Orazaka engine answering a query *locally*.
 * Dramatizes the product's value prop (deterministic interceptor pipeline +
 * on-prem inference + zero data egress). Token-driven (theme.css vars only),
 * reduced-motion safe, and framework-agnostic on copy (all strings via props
 * so each app localizes through its own i18n).
 *
 * Shared by orazaka-web-client and orazaka-web-admin (AGENTS.md §8).
 *
 * Usage:
 *   <ChatShowcase
 *     labels={{ agent, status, model, routed, privacy, placeholder }}
 *     question={t("...")} answer={t("...")} pipeline={[...]} />
 */

import * as React from "react";
import { Icon } from "../icon";

/** Localizable, non-conversational chrome labels. */
export interface ChatShowcaseLabels {
  agent: string;
  status: string;
  model: string;
  routed: string;
  privacy: string;
  placeholder: string;
}

/** Props for {@link ChatShowcase}. */
export interface ChatShowcaseProps {
  labels: ChatShowcaseLabels;
  /** The user's scripted question. */
  question: string;
  /** The assistant's scripted answer (typed out char-by-char). */
  answer: string;
  /** Interceptor pipeline steps rendered as chips once the answer lands. */
  pipeline: string[];
  className?: string;
}

type Phase = 0 | 1 | 2 | 3 | 4; // idle · user · typing · answering · done

/**
 * Renders the animated sovereign-chat card.
 *
 * @param props - {@link ChatShowcaseProps}
 * @returns The showcase React element.
 */
export function ChatShowcase({
  labels,
  question,
  answer,
  pipeline,
  className = "",
}: Readonly<ChatShowcaseProps>) {
  const [phase, setPhase] = React.useState<Phase>(0);
  const [typed, setTyped] = React.useState("");

  // Orchestrate the scripted sequence; restarts if the copy (locale) changes.
  React.useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase(4);
      setTyped(answer);
      return;
    }
    setPhase(0);
    setTyped("");
    const timers = [
      setTimeout(() => setPhase(1), 650),
      setTimeout(() => setPhase(2), 1350),
      setTimeout(() => setPhase(3), 2450),
    ];
    return () => timers.forEach(clearTimeout);
  }, [answer]);

  // Character reveal of the assistant answer.
  React.useEffect(() => {
    if (phase !== 3) return;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(answer.slice(0, i));
      if (i >= answer.length) {
        clearInterval(id);
        setPhase(4);
      }
    }, 16);
    return () => clearInterval(id);
  }, [phase, answer]);

  return (
    <div className={`relative w-full max-w-[440px] ${className}`}>
      {/* Ambient accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -top-10 -bottom-14 rounded-[var(--radius-xl)]"
        style={{
          background:
            "radial-gradient(60% 55% at 60% 35%, var(--accent-soft) 0%, transparent 70%)",
        }}
      />

      <div
        role="img"
        aria-label={`${question} — ${answer}`}
        className="relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-1)] shadow-[var(--shadow-lg)]"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-2)] px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
              <Icon name="shield" size={17} />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-[family-name:var(--font-display)] text-[13px] font-bold tracking-tight text-[var(--text-primary)]">
                {labels.agent}
              </span>
              <span className="flex items-center gap-1.5 text-[10.5px] text-[var(--text-secondary)]">
                <span className="kzc-dot h-1.5 w-1.5 rounded-full bg-[var(--status-success)]" />
                {labels.status}
              </span>
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--border-subtle)] bg-[var(--surface-1)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[var(--text-secondary)]">
            <Icon name="model" size={11} />
            {labels.model}
          </span>
        </div>

        {/* ── Conversation ── */}
        <div className="flex min-h-[268px] flex-col gap-3 px-4 py-[18px]">
          {/* User */}
          <div
            className="flex justify-end transition-all duration-300"
            style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? "none" : "translateY(8px)" }}
          >
            <div className="max-w-[84%] rounded-2xl rounded-br-[5px] bg-[var(--accent)] px-3 py-2.5 text-[13px] font-medium leading-[1.55] text-zinc-950">
              {question}
            </div>
          </div>

          {/* Typing */}
          {phase === 2 && (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-[5px] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-3 py-3">
                <span className="kzc-typing h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                <span className="kzc-typing h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                <span className="kzc-typing h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
              </div>
            </div>
          )}

          {/* Assistant */}
          {phase >= 3 && (
            <div className="flex justify-start">
              <div className="max-w-[84%] rounded-2xl rounded-bl-[5px] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-3 py-2.5 text-[13px] leading-[1.55] text-[var(--text-primary)]">
                <span className="mb-[7px] inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[9.5px] font-bold uppercase tracking-[0.04em] text-[var(--status-success)]">
                  <Icon name="checkCircle" size={11} />
                  {labels.routed}
                </span>
                <p className="m-0">
                  {phase === 4 ? answer : typed}
                  {phase === 3 && (
                    <span className="kzc-caret ml-px inline-block h-[1em] w-0.5 translate-y-[2px] bg-[var(--accent)] align-text-bottom" />
                  )}
                </p>
                <div
                  className="mt-[11px] flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)] pt-[11px] transition-opacity duration-300"
                  style={{ opacity: phase >= 4 ? 1 : 0 }}
                >
                  {pipeline.map((step, i) => (
                    <span
                      key={step}
                      className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[var(--accent)]"
                    >
                      <Icon name="check" size={10} />
                      {step}
                      {i < pipeline.length - 1 && <span className="ml-0.5 opacity-50">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex flex-col gap-2.5 border-t border-[var(--border-subtle)] bg-[var(--surface-2)] px-4 pb-[15px] pt-[13px]">
          <div
            aria-hidden
            className="flex items-center justify-between gap-2.5 rounded-full border border-[var(--border-default)] bg-[var(--surface-1)] py-2 pl-3.5 pr-2"
          >
            <span className="text-[12.5px] text-[var(--text-muted)]">{labels.placeholder}</span>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-zinc-950">
              <Icon name="send" size={13} />
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-secondary)]">
            <span className="text-[var(--status-success)]">
              <Icon name="shield" size={12} />
            </span>
            {labels.privacy}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes kzc-pulse {
          0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--status-success) 55%, transparent); }
          70%  { box-shadow: 0 0 0 6px color-mix(in srgb, var(--status-success) 0%, transparent); }
          100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--status-success) 0%, transparent); }
        }
        @keyframes kzc-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes kzc-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .kzc-dot { animation: kzc-pulse 2s ease-out infinite; }
        .kzc-typing { animation: kzc-typing 1.1s ease-in-out infinite; }
        .kzc-typing:nth-child(2) { animation-delay: 0.18s; }
        .kzc-typing:nth-child(3) { animation-delay: 0.36s; }
        .kzc-caret { animation: kzc-blink 1s steps(2) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .kzc-dot, .kzc-typing, .kzc-caret { animation: none; }
        }
      `}</style>
    </div>
  );
}

ChatShowcase.displayName = "ChatShowcase";
