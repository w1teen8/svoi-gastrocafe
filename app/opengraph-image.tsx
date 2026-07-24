import { ImageResponse } from "next/og";
import settings from "@/data/settings.json";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #2C2926 0%, #443d37 45%, #775944 100%)",
          color: "#F8F6F3",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 42, letterSpacing: 12, color: "#C7A46A" }}>
          ГАСТРОКАФЕ
        </div>
        <div style={{ display: "flex", fontSize: 160, marginTop: 10 }}>СВОЇ</div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 20, opacity: 0.85 }}>
          {settings.brand.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 30, color: "#C7A46A" }}>
          {settings.brand.city}, {settings.brand.country}
        </div>
      </div>
    ),
    { ...size }
  );
}
