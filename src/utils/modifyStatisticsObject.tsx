import {
  InputStatisticsType,
  KeyboardEventObject,
  AllowedCharactersType,
} from "../types";
function deepCopy<T>(obj: T): T {
  // I extracted this function from the previous homework (meetingsIntek/finalVersions1_8basics/src)
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // If obj is an array, create an array, otherwise create an object of the same type as obj
  const copy = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj));

  // Recursively copy for each value
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      // Recurse or assign directly
      copy[key] =
        typeof value === "object" && value !== null ? deepCopy(value) : value;
    }
  }

  return copy as T;
}

type InputObjectType = {
  InputStatistics: InputStatisticsType;
  keyboardEvent: KeyboardEventObject;
  correctCaracter: AllowedCharactersType;
  lastStrokeTimeStamp: number;
  currentStrokeTimeStamp: number;
};
// This function is not properly be a "pure" function, in the sense that it is using the deepCopy function,
// however, it will return the same output given the same input
export default function updateStatisticsObject({
  InputStatistics,
  keyboardEvent,
  correctCaracter,
  lastStrokeTimeStamp,
  currentStrokeTimeStamp,
}: InputObjectType): InputStatisticsType {
  // The letters are recieved capitalized
  const copiedObject = deepCopy<InputStatisticsType>(InputStatistics);

  const { totalSuccess, totalErrors, averageSpeed } = copiedObject;

  // This is the logic to process the input.
  const { isCorrect } = keyboardEvent;
  const { availableCharacters } = copiedObject;

  const currentSpeed = currentStrokeTimeStamp - lastStrokeTimeStamp;

  // In this part I can add the other 2 measurements:
  // accuracy
  // average time
  // The logic to add these 2 parameters is the same to what I have already implemented
  let totalSuccessOfCharacter =
    availableCharacters[correctCaracter].totalSuccess;
  let totalErrorsOfCharacter = availableCharacters[correctCaracter].totalErrors;

  const currentAverageSpeed = availableCharacters[correctCaracter].averageSpeed;

  if (isCorrect) {
    copiedObject.totalSuccess++;
    availableCharacters[correctCaracter] = {
      totalSuccess: ++totalSuccessOfCharacter,
      totalErrors: totalErrorsOfCharacter,
      accuracy:
        totalSuccessOfCharacter /
        (++totalSuccessOfCharacter + totalErrorsOfCharacter),
      averageSpeed: (currentAverageSpeed + currentSpeed) / 2,
    };
  } else {
    copiedObject.totalErrors++;
    availableCharacters[correctCaracter] = {
      totalSuccess: totalSuccessOfCharacter,
      totalErrors: ++totalErrorsOfCharacter,
      accuracy:
        totalSuccessOfCharacter /
        (totalSuccessOfCharacter + ++totalErrorsOfCharacter),
      averageSpeed: currentAverageSpeed,
    };
  }

  // TO UPDATE THE ACCURACY
  copiedObject.accuracy = totalSuccess / (totalSuccess + totalErrors);

  // TO UPDATE THE SPEED MEASUREMENTS:

  if (currentSpeed < copiedObject.maxSpeed) {
    copiedObject.maxSpeed = currentSpeed;
  }

  copiedObject.averageSpeed = (averageSpeed + currentSpeed) / 2;

  return copiedObject;
}
