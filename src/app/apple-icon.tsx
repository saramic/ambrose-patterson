import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        backgroundColor: "#FAF7EF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          width: 96,
          height: 96,
        }}>
        {["A", "C", "V", "A"].map((letter, i) => (
          <div
            key={i}
            style={{
              width: 45,
              height: 45,
              backgroundColor: "#1C1410",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <span
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: 700,
                fontFamily: "serif",
                lineHeight: 1,
              }}>
              {letter}
            </span>
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
