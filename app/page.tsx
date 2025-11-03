// CLEAN: Single-module HomePage implementation
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const WORDS = [
  "apple",
  "orange",
  "banana",
  "keyboard",
  "javascript",
  "react",
  "typescript",
  "computer",
  "monitor",
  "mouse",
  "coffee",
  "paper",
  "window",
  "lamp",
  "charger",
  "project",
  "design",
  "studio",
  "language",
  "function",
  "variable",
  "array",
  "object",
  "component",
  "server",
  "client",
  "network",
  "performance",
  "style",
  "layout",
];

function shuffle<T>(arr: T[]) {
  return arr
    .map((v) => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map((p) => p.v);
}

function generateText(mode: "time" | "words", count = 80) {
  return shuffle(WORDS).slice(0, count).join(".");
}

function renderText(target: string, input: string) {
  const chars = target.split("");
  const inputChars = input.split("");
  console.log({ chars, target, input, inputChars });

  return chars.map((char, idx) => {
    const isCurrent = idx === inputChars.length;
    return (
      <span
        key={idx}
        className={`char font-mono text-3xl ${
          idx < inputChars.length ? "opacity-100" : "opacity-50"
        } ${
          isCurrent
            ? "current underline decoration-2 decoration-blue-500 tracking-wider"
            : ""
        } ${char === "." ? "text-black" : ""}`}
      >
        {char}
      </span>
    );
  });
}

type Position = {
  word: number;
  char: number;
};
const targetText = generateText("time", 80);

const HomePage: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<Position>({
    word: 0,
    char: 0,
  });
  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let expectedChar = targetText[input.length];
      if (expectedChar === ".") {
        expectedChar = " ";
      }
      if (e.key === expectedChar) {
        setCurrentPosition((prev) => {
          let { word, char } = prev;
          if (char + 1 >= targetText.split(".")[word].length) {
            word += 1;
            char = 0;
          } else {
            char += 1;
          }
          return { word, char };
        });
        setInput((prev) => prev + e.key);
      }
    },
    [input.length]
  );

  useEffect(() => {
    inputRef.current?.focus();
    window.addEventListener("keypress", handleKeyDown);
    return () => {
      window.removeEventListener("keypress", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <main className="min-h-screen flex  flex-col items-center p-4">
      <div className="mt-20">
        <h1 className="text-4xl font-bold text-center mb-20">
          Typizen — MonkeyType style
        </h1>
        <div
          tabIndex={0}
          className="max-w-6xl mx-auto px-8 group leading-6 gr relative"
        >
          <div className="flex flex-wrap group-focus:blur-none ">
            {renderText(targetText, input)}
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <p className="text-3xl font-semibold group-focus:hidden">
              Click Here to Start Typing
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
