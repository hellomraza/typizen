export function generateText(count = 80, words: string[] = []) {
  if (words.length === 0) return "";
  // chose random words from the list
  const selectedWords = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWords.push(words[randomIndex]);
  }
  return selectedWords.join(".");
}
