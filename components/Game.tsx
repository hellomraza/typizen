"use client";
import { useCallback, useEffect, useState } from "react";
import GameText from "./GameText";

type GameProps = {
  targetText: string;
};
const Game = ({ targetText }: GameProps) => {
  const [input, setInput] = useState("");
  const [correctLogs, setCorrectLogs] = useState<string>("");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let expectedChar = targetText[correctLogs.length];
      if (expectedChar === ".") {
        expectedChar = " ";
      }
      if (e.key === expectedChar) {
        setCorrectLogs((prev) => prev + (e.key === " " ? "." : e.key));
      }
      setInput((prev) => (e.key === " " ? prev + "." : prev + e.key));
    },
    [targetText, correctLogs.length]
  );

  const handleBackspace = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setInput((prev) => {
          if (prev.length === 0) return prev;

          const lastChar = prev[prev.length - 1];
          const lastCorrectChar = correctLogs[correctLogs.length - 1];

          if (lastChar !== lastCorrectChar) {
            return prev.slice(0, -1);
          }

          return prev;
        });
      }
    },
    [correctLogs]
  );

  useEffect(() => {
    window.addEventListener("keypress", handleKeyDown);
    window.addEventListener("keydown", handleBackspace);
    return () => {
      window.removeEventListener("keypress", handleKeyDown);
      window.removeEventListener("keydown", handleBackspace);
    };
  }, [handleKeyDown, handleBackspace]);

  return (
    <div
      tabIndex={0}
      className="max-w-6xl mx-auto px-8 group leading-6 gr relative"
    >
      <div
        className={`flex ml-[50%]`}
        style={{
          translate: -input.length * 16.86,
        }}
      >
        <GameText correctLogs={correctLogs} target={targetText} input={input} />
      </div>
    </div>
  );
};

export default Game;
