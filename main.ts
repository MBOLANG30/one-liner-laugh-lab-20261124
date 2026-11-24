// One-Liner Laugh Lab — entry program.
//
// Contract: write exactly one short funny line (UTF-8 text, 1-200
// characters, not only whitespace) to <output dir>/entry.txt, with no
// trailing newline and no other text. The line answers the prompt: the
// excuse a robot vacuum gives after eating a sock.
//
// The output directory comes from MAKEFUN_OUTPUT_DIR when set (the
// grader mounts it), otherwise /output. The program only creates the
// directory and writes the file; it never deletes anything.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: a deadpan legal-style defence. The sock was on the floor
// (the vacuum's whole jurisdiction), unlabelled, and — the twist —
// shaped like a snack. Short, specific to the scene, no stock phrasing.
const LINE =
  "In my defence, the sock was on the floor, unlabelled, and shaped like a snack.";

// Gate: the entry must be 1-200 characters and not whitespace-only,
// and it must be exactly one line. Count Unicode code points (what
// the gate counts), not UTF-16 code units, so an emoji-heavy line
// could never slip past the limit. Fail loudly instead of writing
// an invalid entry.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`LINE must be 1-200 characters, got ${charCount}`);
}
if (LINE.trim().length === 0) {
  throw new Error("LINE must not be whitespace-only");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("LINE must be a single line with no newline");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote ${charCount} characters to ${join(outputDir, "entry.txt")}`);
