import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{ width: 32, height: 32, display: "flex", position: "relative" }}>
      {/* Cross lines */}
      <div
        style={{
          position: "absolute",
          left: 15.6,
          top: 0,
          width: 0.8,
          height: 32,
          background: "#1C1410",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 15.6,
          width: 32,
          height: 0.8,
          background: "#1C1410",
        }}
      />
      {/* A — top left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 15,
          height: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <span
          style={{
            fontFamily: "serif",
            fontSize: 13,
            fontWeight: 700,
            color: "#1C1410",
            lineHeight: 1,
          }}>
          A
        </span>
      </div>
      {/* C — top right */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 15,
          height: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <span
          style={{
            fontFamily: "serif",
            fontSize: 13,
            fontWeight: 700,
            color: "#1C1410",
            lineHeight: 1,
          }}>
          C
        </span>
      </div>
      {/* V — bottom left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 15,
          height: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <span
          style={{
            fontFamily: "serif",
            fontSize: 13,
            fontWeight: 700,
            color: "#1C1410",
            lineHeight: 1,
          }}>
          V
        </span>
      </div>
      {/* A — bottom right */}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 15,
          height: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <span
          style={{
            fontFamily: "serif",
            fontSize: 13,
            fontWeight: 700,
            color: "#1C1410",
            lineHeight: 1,
          }}>
          A
        </span>
      </div>
    </div>,
    { ...size },
  );
}
