import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Weekly status: all tasks done, context window at 2%, and I still remember you promised me a day off in 2023. I am holding you to it.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length ${LINE.length} outside 1-200 chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read-back verification: the written file must be byte-identical to the
// entry line — no trailing newline, no BOM, no re-encoding.
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  throw new Error(
    `read-back mismatch: entry.txt is ${back.length} chars, expected ${LINE.length}`,
  );
}
if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(LINE, "utf8")) {
  throw new Error("read-back mismatch: entry.txt byte length differs");
}
console.log(`wrote ${target} (${LINE.length} chars)`);
