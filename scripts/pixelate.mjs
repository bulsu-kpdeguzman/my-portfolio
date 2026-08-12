import sharp from "sharp";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "public", "avatar.png");
const OUT = path.join(process.cwd(), "public", "avatar.pixel.png");
// Smaller grid = more abstract, larger = a more readable face
const GRID = Number(process.env.AVATAR_GRID ?? 48);
const SCALE = 8;

if (!existsSync(SRC)) {
  console.error(`No photo found at ${SRC}`);
  console.error(
    "Drop a square headshot at public/avatar.png and re-run `npm run pixelate`.",
  );
  process.exit(1);
}

await sharp(SRC)
  .resize(GRID, GRID, { kernel: "nearest", fit: "cover" })
  .resize(GRID * SCALE, GRID * SCALE, { kernel: "nearest" })
  .png()
  .toFile(OUT);

console.log(
  `✓ pixelated ${GRID}x${GRID} -> ${GRID * SCALE}x${GRID * SCALE}  ${OUT}`,
);
