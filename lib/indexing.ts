/**
 * One switch controlling whether this deployment may be indexed.
 *
 * ── Why it defaults to closed ───────────────────────────────────────────────
 *
 * The development deployment was serving `index, follow` and `Allow: /` with a
 * live sitemap, on a public URL, throughout a rebuild that currently has a
 * sixteen-section homepage where the specification calls for seven. Anything
 * crawled in that state is a half-finished page indexed under SCC's name.
 *
 * File 02 requires environment-specific `noindex, nofollow` on the development
 * deployment, immediately. Defaulting to closed rather than open means the
 * unsafe state is the one you have to ask for.
 *
 * ── Turning it on ───────────────────────────────────────────────────────────
 *
 * Set `NEXT_PUBLIC_ALLOW_INDEXING=true` in the Vercel project, on the
 * production environment only, when SCC signs off the launch gates in
 * docs/SCC_CONTENT_REQUEST.md. Do not set it on preview deployments — every
 * preview would then compete with the real domain for the same content.
 *
 * It is `NEXT_PUBLIC_` because the value is needed in the metadata export,
 * which is inlined at build time. Changing it requires a redeploy, which is
 * the correct amount of friction for a switch of this kind.
 */
export const INDEXABLE = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
