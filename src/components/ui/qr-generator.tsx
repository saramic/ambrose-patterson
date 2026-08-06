"use client";

import { useEffect, useRef, useState } from "react";
import type { Options as QRStylingOptions } from "qr-code-styling";
import { Button } from "@/components/ui/button";

const DEFAULT_VALUE = "https://ambrosepatterson.com.au";
const SIZE = 260;
// --primary (globals.css), converted from oklch to hex for the <input type="color"> default.
const PRIMARY_COLOR = "#ed5d65";

type LogoOption = "none" | "acva";

function buildOptions({
  value,
  fgColor,
  bgColor,
  logo,
}: {
  value: string;
  fgColor: string;
  bgColor: string;
  logo: LogoOption;
}): Partial<QRStylingOptions> {
  return {
    width: SIZE,
    height: SIZE,
    type: "svg",
    data: value.trim() || DEFAULT_VALUE,
    margin: 8,
    qrOptions: { errorCorrectionLevel: logo === "none" ? "Q" : "H" },
    image: logo === "acva" ? "/acva-logo.svg" : undefined,
    imageOptions: { crossOrigin: "anonymous", margin: 6, imageSize: 0.32 },
    dotsOptions: { color: fgColor, type: "square" },
    cornersSquareOptions: { color: fgColor, type: "square" },
    cornersDotOptions: { color: fgColor, type: "square" },
    backgroundOptions: { color: bgColor },
  };
}

export function QRGenerator() {
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [fgColor, setFgColor] = useState(PRIMARY_COLOR);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logo, setLogo] = useState<LogoOption>("acva");

  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const qrRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (!mounted || !containerRef.current) return;
      qrRef.current = new QRCodeStyling(
        buildOptions({ value, fgColor, bgColor, logo }),
      );
      containerRef.current.innerHTML = "";
      qrRef.current.append(containerRef.current);
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    qrRef.current?.update(buildOptions({ value, fgColor, bgColor, logo }));
  }, [value, fgColor, bgColor, logo]);

  const download = (extension: "png" | "svg") => {
    qrRef.current?.download({ extension, name: "ambrosepatterson-qr" });
  };

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">
            URL / Text
          </span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={DEFAULT_VALUE}
            className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
          />
        </label>

        <div className="flex gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              Foreground
            </span>
            <div className="flex items-center gap-2 rounded-sm border border-border px-2 py-1.5">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-6 w-8 cursor-pointer rounded-xs border border-border"
              />
              <span className="text-xs text-muted-foreground uppercase">
                {fgColor}
              </span>
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              Background
            </span>
            <div className="flex items-center gap-2 rounded-sm border border-border px-2 py-1.5">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-6 w-8 cursor-pointer rounded-xs border border-border"
              />
              <span className="text-xs text-muted-foreground uppercase">
                {bgColor}
              </span>
            </div>
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">
            Center mark
          </span>
          <select
            value={logo}
            onChange={(e) => setLogo(e.target.value as LogoOption)}
            className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary">
            <option value="none">None</option>
            <option value="acva">ACVA mark</option>
          </select>
        </label>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => download("png")}>
            Download PNG
          </Button>
          <Button variant="outline" size="sm" onClick={() => download("svg")}>
            Download SVG
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center rounded-sm border border-border bg-muted/30 p-4 shrink-0">
        <div ref={containerRef} style={{ width: SIZE, height: SIZE }} />
      </div>
    </div>
  );
}
