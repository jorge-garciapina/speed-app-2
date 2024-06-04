export default function pickARandomWord(wordsArray: string[]) {
  const randomInLessThanLength = Math.floor(Math.random() * wordsArray.length);

  return wordsArray[randomInLessThanLength];
}
