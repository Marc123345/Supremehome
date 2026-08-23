"use client";

/**
 * True when motion should be suppressed — which is now always.
 *
 * This site sells to commercial property owners and facility managers, who
 * arrive with a specific question and limited time. Scroll reveals, counters
 * and rotating text all delay the moment the page can be read, and on a
 * long page they delay it repeatedly.
 *
 * Every animated component in the codebase already branched on this hook, so
 * returning a constant here switches the whole site to a static render in one
 * place rather than unpicking each call site. It is a constant rather than a
 * media query on purpose: the server and the client now agree, so nothing
 * mounts, measures and swaps.
 *
 * To bring motion back, restore the matchMedia implementation from git
 * history — the call sites are all still wired for it.
 */
export function useReducedMotion(): boolean {
  return true;
}
