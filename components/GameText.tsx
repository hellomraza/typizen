import classNames from "classnames";
import { memo } from "react";

type GameTextProps = {
  target: string;
  input: string;
  correctLogs: string;
};
const GameText = ({ target, input, correctLogs }: GameTextProps) => {
  const chars = target.split("");
  const untypedChars = chars.slice(correctLogs.length);
  const inputChars = (input + untypedChars.join("")).split("");

  let correctIndex = 0;
  return inputChars.map((char, idx) => {
    const isCurrent = idx === input.length;
    const isTypedChar = !!input[idx];
    const isCorrect =
      char === correctLogs[correctIndex] ? (correctIndex++, true) : false;
    const isDot = char === ".";
    const isDotError = isDot && isTypedChar && !isCorrect;

    return (
      <span
        key={idx}
        style={{
          fontWeight: isCurrent ? "900" : "100",
        }}
        className={classNames("font-light font-mono text-[28px] py-1", {
          "opacity-50": isTypedChar,
          "opacity-100": !isTypedChar,
          "current underline decoration-2 decoration-blue-500 font-black! border-l-2 animate-blink-border":
            isCurrent,
          "text-red-500": isTypedChar && !isCorrect,
          "text-background": isDot,
          "bg-red-500 text-red-500! opacity-50! rounded": isDotError,
        })}
      >
        {char}
      </span>
    );
  });
};

export default memo(GameText);
