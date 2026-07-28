"use client";

import Script from "next/script";

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, origin: string) => void;
  }
}

/**
 * Jotform embed.
 *
 * The handler script listens for postMessage from the iframe and resizes it to
 * the form's real height, so the fixed `height` below is only the pre-hydration
 * placeholder.
 *
 * Two deliberate changes from Jotform's copy-paste snippet:
 *
 *  · `onload="window.parent.scrollTo(0,0)"` is dropped. It yanks the whole page
 *    back to the top the moment the iframe finishes loading — if someone has
 *    already scrolled down to the form, it throws them back to the header.
 *
 *  · `frameborder` and `allowtransparency` are dropped. Both are obsolete
 *    attributes that React warns about; the border is handled in CSS.
 */
export function JotformEmbed({
  formId,
  title = "Request Your Free Roof Inspection",
  /** Placeholder height until the handler measures the real form. */
  initialHeight = 700,
}: {
  formId: string;
  title?: string;
  initialHeight?: number;
}) {
  const iframeId = `JotFormIFrame-${formId}`;

  return (
    <>
      <iframe
        id={iframeId}
        title={title}
        allow="geolocation; microphone; camera; fullscreen; payment"
        src={`https://form.jotform.com/${formId}`}
        scrolling="no"
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          width: "1px", // iOS Safari needs this with min-width to size correctly
          height: initialHeight,
          border: "none",
        }}
      />

      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.jotformEmbedHandler?.(
            `iframe[id='${iframeId}']`,
            "https://form.jotform.com/"
          );
        }}
      />

      <noscript>
        <p style={{ marginTop: "1rem" }}>
          The inquiry form needs JavaScript.{" "}
          <a
            href={`https://form.jotform.com/${formId}`}
            className="font-bold text-[var(--supreme-red)]"
          >
            Open it in a new tab
          </a>{" "}
          or call us instead.
        </p>
      </noscript>
    </>
  );
}
