import CharacterComponent from "../character-component/index-character";

import { useEffect, useState, useContext } from "react";

import { KeyboardEventObject, AllowedCharactersType } from "../../types";

import {
  SpeedTypeContext,
  SpeedTypeDispatchContext,
} from "../../general-store/context-provider";

import evaluateInputKey from "../../utils/compare-characters";
import validateInput from "../../utils/validateKeyboardEvent";

// FROM THE CUSTOM COMPONENT:
import useAddWord from "../custom-add-word/index-add-word";

// FROM THE UTILS:
import updateStatisticsObject from "../../utils/modifyStatisticsObject";
function WritingComponent() {
  const state = useContext(SpeedTypeContext);
  const dispatch = useContext(SpeedTypeDispatchContext);
  const [characters, setCharacters] = useState<KeyboardEventObject[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  // CUSTOM HOOK:
  const { word, setWord } = useAddWord();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault(); //*****************THIS IS MEANT TO PREVENT KEYS LIKE "Enter", "Alt", etc */

      // The -->validateInput<-- allows to have only letters for input
      setCurrentInput(validateInput(event.key));

      dispatch!({ type: "notify-new-key" });
    };
    if (!state?.winnerModal) {
      // In this useEffect the code creates the logic to handle the keyboard events.
      // it will run when component renders

      // Add the event listener
      window.addEventListener("keydown", handleKeyPress);
    } else {
      window.removeEventListener("keydown", handleKeyPress);
    }

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // }, []);
  }, [state?.winnerModal]);

  useEffect(() => {
    // This useEffect is meant to execute when there are changes in the central state
    // is is used mainly to dynamically create the CharacterComponent's
    const currentIndex = state?.currentIndexInWord as number;
    const currentWord = state?.currentWord as string;

    const currentStrokeTime = Date.now();

    if (currentIndex >= 0 && currentIndex < currentWord.length) {
      const { isCorrect, character } = evaluateInputKey(
        currentInput,
        state?.currentWord[state?.currentIndexInWord as number] as string
      );

      if (state?.InputStatistics) {
        // This is a updated version of the state?.InputStatistics which will be used to update the state
        const newStatisticsObject = updateStatisticsObject({
          InputStatistics: state?.InputStatistics,

          keyboardEvent: {
            isCorrect,
            character,
          },
          correctCaracter: state?.currentWord[
            state?.currentIndexInWord as number
          ] as AllowedCharactersType,
          lastStrokeTimeStamp: state?.lastStroke,
          currentStrokeTimeStamp: currentStrokeTime,
        });

        dispatch!({
          type: "update-statistics",
          newStatisticsObject: newStatisticsObject,
        });
      }

      setCharacters((characters) => {
        return [...characters, { isCorrect, character }];
      });
    }

    // The "condition" to go to the next word will be to press the spacebar
    if (currentIndex >= currentWord.length) {
      // This part is meant to control the display of the words. The logic behind this is:
      //   - When currentIndex >= currentWord.length then the user has typed all the character
      //     in the word and it is time to change to a new one
      //     In that case I need to:
      //     1 - Change the current word
      //     2 - Reset the currentIndex to -1 (that was already studied, go to App or gloal-reducer to see)
      //     3 - Reset the --->characters<---

      // Step 1:
      setWord();

      // Step 2:
      dispatch!({ type: "reset-current-index-in-word" });

      // Step 3:
      setCharacters([]);
    }

    // The time for the last stroke is updated until all the calculations have been made
    dispatch!({
      type: "update-time-of-last-stroke",
      lastStrokeTimeStamp: currentStrokeTime,
    });

    //TODO:
  }, [state?.currentIndexInWord]);

  useEffect(() => {
    // I put this useEffect here because I need to see the changes in the word
    if (word) dispatch!({ type: "change-current-word", newWord: word });
  }, [word]);

  const testingMap = characters.map((element, index) => {
    return (
      <CharacterComponent
        key={index}
        character={element.character}
        isCorrect={element.isCorrect}
      />
    );
  });

  return <>{testingMap}</>;
}

export default WritingComponent;
