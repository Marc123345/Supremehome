"use client";

import { useEffect, useState } from "react";
import { MessageSquare, X } from "lucide-react";

/**
 * Hide / show control for the Jotform assessment agent.
 *
 * The embed has no dismiss of its own: the launcher bubble is fixed to the
 * bottom-right of every page and there is no way for a visitor to put it
 * away. On a phone it covers whatever sits in that corner, and a chat you
 * cannot close is the kind of thing people leave a site over.
 *
 * The embed renders into a div whose id is `JotformAgent-<agentId>` as a
 * direct child of <body>. That id is the only thing this depends on — it is
 * derived from the agent id in the embed URL, so it is stable in a way the
 * widget's internal class names are not.
 *
 * Dismissal is remembered for the session, not forever: someone who closes it
 * while reading is not asking to never be offered it again, and a fresh visit
 * is a fresh intent. sessionStorage throws in some embedded contexts, so
 * every access is guarded.
 */
const AGENT_ID = "01a02fe8bce870008b0de7beaa0b1f91da1a";
const CONTAINER_ID = `JotformAgent-${AGENT_ID}`;
const STORAGE_KEY = "scc-agent-hidden";

function readHidden(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeHidden(hidden: boolean) {
  try {
    if (hidden) sessionStorage.setItem(STORAGE_KEY, "1");
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* private mode, or storage blocked — the toggle still works, it just
       won't be remembered. */
  }
}

export function ChatToggle() {
  /** null until the embed has actually rendered; no control before then. */
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [hidden, setHidden] = useState(false);

  // The embed is injected by a lazily-loaded script, so the container does
  // not exist on mount. Watch for it rather than guessing at a delay.
  useEffect(() => {
    const found = document.getElementById(CONTAINER_ID);
    if (found) {
      setContainer(found);
      return;
    }
    const observer = new MutationObserver(() => {
      const el = document.getElementById(CONTAINER_ID);
      if (el) {
        setContainer(el);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!container) return;
    setHidden(readHidden());
  }, [container]);

  useEffect(() => {
    if (!container) return;
    container.style.display = hidden ? "none" : "";
  }, [container, hidden]);

  if (!container) return null;

  if (hidden) {
    return (
      <button
        onClick={() => {
          setHidden(false);
          writeHidden(false);
        }}
        className="fixed bottom-5 right-5 z-[95] flex items-center gap-2 px-4 py-3 bg-[var(--ink-90)] text-white text-[0.9rem] font-semibold shadow-lg hover:bg-[var(--supreme-red)] transition-colors"
      >
        <MessageSquare size={16} aria-hidden="true" />
        Chat
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        setHidden(true);
        writeHidden(true);
      }}
      aria-label="Hide chat"
      title="Hide chat"
      className="fixed bottom-[86px] right-[22px] z-[95] grid place-items-center w-7 h-7 rounded-full bg-[var(--ink-90)] text-white border border-white/25 shadow-lg hover:bg-[var(--supreme-red)] transition-colors"
    >
      <X size={14} aria-hidden="true" />
    </button>
  );
}
