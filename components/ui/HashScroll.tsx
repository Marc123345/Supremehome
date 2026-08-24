"use client";

import { useEffect } from "react";

/**
 * Makes anchor URLs work on a hard load.
 *
 * `/commercial-roofing#scope` typed, pasted, bookmarked or followed from an
 * email landed at the top of the page. Clicking the same link inside the site
 * worked, because that is a client-side navigation into a page that is already
 * laid out. On a hard load the browser applies the hash while the document is
 * still short — fonts, images and the hero have not settled — so it scrolls to
 * a position that stops existing a moment later.
 *
 * This matters more than it used to: the footer's Restoration Scope entry and
 * the home page's links into the commercial page both depend on these anchors
 * resolving, so a link that lands at the top is a promise the page does not
 * keep.
 *
 * Two things had to be true for this to work.
 *
 * Re-apply after `load`, once layout has settled.
 *
 * And scroll with `scroll-behavior` forced to `auto`. globals.css sets
 * `html { scroll-behavior: smooth }`, which turns every programmatic scroll
 * into an animation — and on a hard load the framework's own scroll handling
 * resets the position while that animation is still running, so the page
 * never arrives. Measured: with smooth left on, `window.scrollTo(0, 2400)`
 * ended at 3px. With it forced to auto, it ended at 2400. The property is put
 * back immediately, so anchor clicks still glide.
 */
export function HashScroll() {
  useEffect(() => {
    let firstRun = true;
    /* `force` separates the two callers. The retry schedule below is
       speculative and must not yank a reader who has started scrolling. A
       hashchange is an explicit request and always wins — without this, moving
       from #roof-systems to #scope on the same page did nothing, because the
       guard saw the scroll position left over from the previous anchor. */
    const go = (force = false) => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      // If the reader has already scrolled somewhere themselves, leave them be.
      if (!force && window.scrollY > 40 && !firstRun) return;
      firstRun = false;
      /* Deliberately not wrapped in requestAnimationFrame. rAF does not fire
         while a tab is hidden, so a link opened into a background tab would
         never scroll and would only correct itself once the tab was focused.
         The retry schedule below already covers the layout settling. */
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      el.scrollIntoView({ block: "start" });
      root.style.scrollBehavior = previous;
    };

    /* Timing is the other half. By the time this effect runs the document is
       usually already `complete`, so the load listener never fires — and a
       single attempt lands before images and fonts have settled the layout,
       at which point the framework's scroll handling puts the page back to
       the top. Retrying over the first second covers the reflows without
       fighting the user: each attempt is skipped once they have scrolled
       themselves. */
    const timers = [0, 120, 350, 800].map((ms) =>
      window.setTimeout(() => go(), ms),
    );
    const onLoad = () => go();
    const onHashChange = () => go(true);
    window.addEventListener("load", onLoad);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
