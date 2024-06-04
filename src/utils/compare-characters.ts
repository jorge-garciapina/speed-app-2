export default function evaluateInputKey(
  inputCharacter: string,
  correctCharacter: string
): {
  isCorrect: boolean;
  character: string;
} {
  const isCorrect =
    correctCharacter.toLowerCase() === inputCharacter.toLowerCase();

  return { isCorrect: isCorrect, character: inputCharacter };
}
