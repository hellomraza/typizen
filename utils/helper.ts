import { readFile } from "fs/promises";
import { join } from "path";

function shuffle<T>(arr: T[]) {
  return arr
    .map((v) => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map((p) => p.v);
}

export function generateText(count = 80, words: string[] = []) {
  if (words.length === 0) return "";
  return shuffle(words).slice(0, count).join(".");
}

export const fetchRandomWords = async (): Promise<string[]> => {
  try {
    const filePath = join(process.cwd(), "public", "random-words.txt");
    const text = await readFile(filePath, "utf-8");
    return text
      .split(",")
      .map((w) => w.trim().replace(/^"|"$/g, ""))
      .filter((w) => w.length > 0);
  } catch (error) {
    console.error("Failed to load random words:", error);
    return [];
  }
};
