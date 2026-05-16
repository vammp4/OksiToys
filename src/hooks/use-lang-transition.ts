import { useLayoutEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

export type LangSwitchPhase = "idle" | "out" | "entering";

const OUT_MS = 240;

export function useLangTransition(lang: Lang) {
  const [displayLang, setDisplayLang] = useState(lang);
  const [phase, setPhase] = useState<LangSwitchPhase>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (lang === displayLang) {
      return;
    }

    const clearTimers = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    clearTimers();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplayLang(lang);
      setPhase("idle");
      return;
    }

    setPhase("out");

    timeoutRef.current = setTimeout(() => {
      setDisplayLang(lang);
      setPhase("entering");
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setPhase("idle");
          rafRef.current = null;
        });
      });
    }, OUT_MS);

    return clearTimers;
  }, [lang, displayLang]);

  const isSwitching = phase !== "idle";

  return { displayLang, phase, isSwitching };
}
