export function parseTimestamp(mmss: string): number {
  const [minutes, seconds] = mmss.split(":").map(Number);
  return minutes * 60 + seconds;
}

export function formatIsoDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `PT${minutes}M${seconds}S`;
}
