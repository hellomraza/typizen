import Game from "@/components/Game";
import randomWords from "@/lib/words/random-words.json";
import { generateText } from "@/utils/helper";

import React from "react";

const HomePage: React.FC = async () => {
  const targetText = generateText(80, randomWords.words);

  if (targetText.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-2xl font-semibold text-red-500">
          Failed to load words
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex  flex-col items-center p-4">
      <div className="mt-20">
        <h1 className="text-4xl font-bold text-center mb-20">Typizen</h1>
        <Game targetText={targetText} />
      </div>
    </main>
  );
};

export default HomePage;
