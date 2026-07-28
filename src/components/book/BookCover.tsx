"use client";

import { useState } from "react";
import Image from "next/image";
import { FlipHorizontal, XIcon } from "lucide-react";
import coverImage from "@/assets/images/ambrose-patterson-cover.jpeg";
import backCoverImage from "@/assets/images/ambrose-patterson-back-cover.jpeg";
import { AcvaLogo } from "./AcvaLogo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export function BookCover({ className }: { className?: string }) {
  const [side, setSide] = useState<"front" | "back">("front");

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "248px",
        aspectRatio: "25.5 / 32.5",
        boxShadow: "8px 8px 32px oklch(0.16 0.018 55 / 0.35)",
        borderRadius: "2px",
        overflow: "hidden",
        flexShrink: 0,
      }}>
      {/* Front cover */}
      <Dialog
        onOpenChange={(open) => {
          if (!open) setSide("front");
        }}>
        <DialogTrigger
          aria-label="View full cover image"
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            padding: 0,
            border: "none",
            background: "none",
            cursor: "zoom-in",
          }}>
          <Image
            src={coverImage}
            alt="Ambrose Patterson: His Life & Art — book cover"
            placeholder="blur"
            fill
            sizes="248px"
            style={{ objectFit: "cover" }}
          />
          {/* ACVA logo */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              opacity: 0.9,
            }}>
            <AcvaLogo size={28} className="text-white" />
          </div>
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className="flex max-w-none items-center justify-center border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-none"
          style={{ width: "90vw", height: "90vh" }}>
          <div
            style={{
              position: "relative",
              width: "90vw",
              height: "90vh",
              perspective: "2000px",
            }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
                transition: "transform 0.6s ease",
                transform: side === "back" ? "rotateY(180deg)" : "none",
              }}>
              {/* Front face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                }}>
                <Image
                  src={coverImage}
                  alt="Ambrose Patterson: His Life & Art — front cover"
                  placeholder="blur"
                  fill
                  quality={100}
                  sizes="90vw"
                  style={{
                    objectFit: "contain",
                    filter:
                      "drop-shadow(0 16px 48px oklch(0.16 0.018 55 / 0.45))",
                  }}
                />
              </div>
              {/* Back face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}>
                <Image
                  src={backCoverImage}
                  alt="Ambrose Patterson: His Life & Art — back cover"
                  placeholder="blur"
                  fill
                  quality={100}
                  sizes="90vw"
                  style={{
                    objectFit: "contain",
                    filter:
                      "drop-shadow(0 16px 48px oklch(0.16 0.018 55 / 0.45))",
                  }}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-label={
              side === "front" ? "Show back cover" : "Show front cover"
            }
            onClick={() => setSide((s) => (s === "front" ? "back" : "front"))}
            style={{
              position: "absolute",
              top: "56px",
              right: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "9999px",
              background: "oklch(0.16 0.018 55 / 0.55)",
              border: "none",
              color: "white",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}>
            <FlipHorizontal size={16} />
            {side === "front" ? "Back cover" : "Front cover"}
          </button>
          <DialogClose
            aria-label="Close"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "9999px",
              background: "oklch(0.16 0.018 55 / 0.55)",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}>
            <XIcon size={18} />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
