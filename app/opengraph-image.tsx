import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Social share card.
 *
 * Every page was previously sharing with no image at all — a bare white card
 * on LinkedIn, Facebook and iMessage, which is where a property manager is
 * most likely to be sent a link.
 *
 * Drawn with ImageResponse rather than a static file so it stays in step with
 * the brand tokens, and uses a system font stack deliberately: fetching Bebas
 * at render time would add a network dependency that can fail and leave the
 * card blank again.
 */

export const alt = `${site.name} — commercial roof restoration in Greater Houston`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RED = "#e00116";
const INK = "#0b0b0d";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: 72,
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {/* Angled brand block, echoing the site header */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 520,
            height: 10,
            background: RED,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* Simplified house mark */}
          <div
            style={{
              display: "flex",
              width: 54,
              height: 54,
              background: RED,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 20, height: 20, background: "#fff" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              Supreme
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 17,
                letterSpacing: 3,
              }}
            >
              COMMERCIAL COATINGS
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: RED,
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: 4,
              marginBottom: 20,
            }}
          >
            GREATER HOUSTON
          </div>
          {/* Satori has no line-box model: a <br> would make this div
              multi-child and it renders each line as its own flex row. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -2,
              maxWidth: 960,
            }}
          >
            <div style={{ display: "flex" }}>We restore commercial roofs</div>
            <div style={{ display: "flex" }}>instead of replacing them.</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 26,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 24 }}>
            Free roof inspection · Insured to $2M
          </div>
          <div style={{ color: "#fff", fontSize: 28, fontWeight: 700 }}>
            {site.phone}
          </div>
        </div>
      </div>
    ),
    size
  );
}
