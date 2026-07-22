"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PUZZLE_IMAGE = "/images/self-portrait-atelier.jpg";
const SIZES = [3, 4, 5, 6] as const;
type Size = (typeof SIZES)[number];
const DIFFICULTY_LABEL: Record<Size, string> = {
  3: "Easy",
  4: "Medium",
  5: "Hard",
  6: "Expert",
};

type Board = (number | null)[];

function solvedBoard(size: Size): Board {
  const board: Board = Array.from({ length: size * size - 1 }, (_, i) => i);
  board.push(null);
  return board;
}

function neighborsOf(index: number, size: Size): number[] {
  const row = Math.floor(index / size);
  const col = index % size;
  const out: number[] = [];
  if (row > 0) out.push(index - size);
  if (row < size - 1) out.push(index + size);
  if (col > 0) out.push(index - 1);
  if (col < size - 1) out.push(index + 1);
  return out;
}

// Shuffle by making random *legal* moves from the solved state, rather
// than a raw random permutation — a 15-puzzle-style board only has a
// solution from half of all permutations (parity), so shuffling any
// other way risks generating an unsolvable board.
function shuffledBoard(size: Size): Board {
  const board = solvedBoard(size);
  let blank = board.length - 1;
  let last = -1;
  const moves = size * size * 40;
  for (let i = 0; i < moves; i++) {
    const options = neighborsOf(blank, size).filter((n) => n !== last);
    const next = options[Math.floor(Math.random() * options.length)];
    board[blank] = board[next];
    board[next] = null;
    last = blank;
    blank = next;
  }
  return board;
}

function isSolved(board: Board): boolean {
  return board.every((tile, i) =>
    i === board.length - 1 ? tile === null : tile === i,
  );
}

export function SlidingJigsawGame() {
  const [size, setSize] = useState<Size>(4);
  const [board, setBoard] = useState<Board>(() => shuffledBoard(4));
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  function newGame(nextSize: Size) {
    setSize(nextSize);
    setBoard(shuffledBoard(nextSize));
    setMoves(0);
    setSolved(false);
  }

  function handleTileClick(index: number) {
    if (solved) return;
    const blank = board.indexOf(null);
    if (!neighborsOf(index, size).includes(blank)) return;
    const next = board.slice();
    next[blank] = next[index];
    next[index] = null;
    setBoard(next);
    setMoves((m) => m + 1);
    if (isSolved(next)) setSolved(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {SIZES.map((s) => (
          <Button
            key={s}
            variant={s === size ? "default" : "outline"}
            size="sm"
            onClick={() => newGame(s)}
            className="font-sans text-xs tracking-wide">
            {s}×{s} — {DIFFICULTY_LABEL[s]}
          </Button>
        ))}
      </div>

      <div className="flex items-start gap-6 flex-wrap">
        <div className="relative">
          <div
            role="group"
            aria-label={`Sliding jigsaw puzzle, ${size} by ${size}`}
            className="grid gap-0.5 bg-border rounded-sm overflow-hidden ring-1 ring-border w-72 h-72 sm:w-96 sm:h-96"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {board.map((tile, index) => {
              if (tile === null) {
                return (
                  <div
                    key={`blank-${index}`}
                    className="bg-muted"
                    aria-hidden="true"
                  />
                );
              }
              const row = Math.floor(tile / size);
              const col = tile % size;
              const isNextToBlank = neighborsOf(index, size).includes(
                board.indexOf(null),
              );
              return (
                <button
                  key={tile}
                  type="button"
                  onClick={() => handleTileClick(index)}
                  aria-label={`Puzzle piece ${tile + 1} of ${size * size - 1}`}
                  className={cn(
                    "bg-cover transition-transform",
                    isNextToBlank && !solved && "hover:brightness-110",
                  )}
                  style={{
                    backgroundImage: `url(${PUZZLE_IMAGE})`,
                    backgroundSize: `${size * 100}% ${size * 100}%`,
                    backgroundPosition: `${(col / (size - 1)) * 100}% ${(row / (size - 1)) * 100}%`,
                  }}
                />
              );
            })}
          </div>

          {solved && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 rounded-sm">
              <div className="flex flex-col items-center gap-3 text-center px-4">
                <span className="font-heading text-2xl text-foreground">
                  Solved!
                </span>
                <span className="font-sans text-xs text-muted-foreground">
                  {moves} moves at {size}×{size}
                </span>
                <Button
                  size="sm"
                  onClick={() => newGame(size)}
                  className="font-sans text-xs tracking-wide">
                  Play again
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 max-w-56">
          <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Reference
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PUZZLE_IMAGE}
            alt="Ambrose Patterson, Self-portrait (La Fenêtre de l'Atelier), ca. 1902 — the full, unshuffled painting"
            className="w-32 rounded-sm ring-1 ring-border"
          />
          <p className="font-sans text-xs text-muted-foreground leading-relaxed">
            Moves: {moves}
          </p>
        </div>
      </div>
    </div>
  );
}
