"use client";
import { useCounter } from "@/hooks/useCounter";
import { useCallback, useEffect, useState } from "react";
import GameText from "./GameText";

type GameProps = {
  targetText: string;
};
const Game = ({ targetText }: GameProps) => {
  const [input, setInput] = useState("");
  const [correctLogs, setCorrectLogs] = useState<string>("");

  const {
    timerDuration,
    timeRemaining,
    isTimerStarted,
    isTimeUp,
    startTimer,
    changeTimerDuration,
  } = useCounter(30);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Prevent typing if time is up
      if (isTimeUp) return;

      // Start timer on first keypress
      if (!isTimerStarted) {
        startTimer();
      }

      let expectedChar = targetText[correctLogs.length];
      if (expectedChar === ".") {
        expectedChar = " ";
      }
      if (e.key === expectedChar) {
        setCorrectLogs((prev) => prev + (e.key === " " ? "." : e.key));
      }
      setInput((prev) => (e.key === " " ? prev + "." : prev + e.key));
    },
    [targetText, correctLogs.length, isTimeUp, isTimerStarted, startTimer]
  );

  const handleBackspace = useCallback(
    (e: KeyboardEvent) => {
      // Prevent backspace if time is up
      if (isTimeUp) return;

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
    [correctLogs, isTimeUp]
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
    <div>
      {/* Timer Controls */}
      <div className="max-w-6xl mx-auto px-8 mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          {[10, 30, 60, 120].map((duration) => (
            <button
              key={duration}
              onClick={() => changeTimerDuration(duration)}
              disabled={isTimerStarted}
              className={`px-4 py-2 rounded ${
                timerDuration === duration
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } ${
                isTimerStarted
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-400 hover:text-white"
              }`}
            >
              {duration}s
            </button>
          ))}
        </div>
        <div className="text-2xl font-bold">
          {isTimeUp ? (
            <span className="text-red-500">Time&apos;s Up!</span>
          ) : (
            <span>{timeRemaining}s</span>
          )}
        </div>
      </div>

      {/* Game Area */}
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
          <GameText
            correctLogs={correctLogs}
            target={targetText}
            input={input}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
