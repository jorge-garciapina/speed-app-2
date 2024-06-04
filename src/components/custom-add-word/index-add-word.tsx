import { useEffect, useState } from "react";
import pickARandomWord from "../../utils/pickARandomWord";
import { WordsDataType } from "../../types";

export default function useAddWord() {
  // TODO: Ask if that is a good approach to type empty objects
  const [gameWords, setGameWords] = useState<WordsDataType>({
    level1: [],
    level2: [],
    level3: [],
    level4: [],
    level5: [],
    level6: [],
    level7: [],
  });
  const [currentDifficulty, setCurrentDifficulty] = useState(1);
  const [word, setWord] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/words.json");
      if (response.ok) {
        const fetchedData = await response.json();
        setGameWords(fetchedData);
      }
    };
    fetchData();
  }, []);

  //   console.log("IN THE CUSTOM COMPONENT: ", word);
  function handleChange() {
    setCurrentDifficulty((prevValue) => ++prevValue);

    // The problem is when I use the "object" type to type the
    // console.log(gameWords[`level1`]);
    // TODO: Ask about evaluation for this solution.
    // https://www.stephenlewis.me/blog/typescript-object-bracket-notation/#user-content-fn-1
    // @ts-expect-error: Dynamic access of properties
    const currentDifficultyWords = gameWords[`level${currentDifficulty}`];

    setWord(() => pickARandomWord(currentDifficultyWords));
  }

  useEffect(() => {
    // @ts-expect-error: Dynamic access of properties
    const currentDifficultyWords = gameWords[`level${currentDifficulty}`];
    setWord(() => pickARandomWord(currentDifficultyWords));
  }, [gameWords]);

  const inputProps = {
    word: word,
    setWord: handleChange,
  };

  return inputProps;
}
