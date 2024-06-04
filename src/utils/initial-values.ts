export const INITIAL_WORD = "";
export const INITIAL_WORD_LENGTH = 0;
export const INITIAL_INDEX_WORD = -1; // To avoid the word starting from index 1 when I type, handled when called
export const INITIAL_LAST_STROKE = Date.now(); // Thus, when game starts it will have the value of that moment
export const INITIAL_IS_PLAYING = true;
export const INITIAL_SHOW_WINNER_MODAL = false;
export const INITIAL_TIME_INTERVAL = 60;
export const INITIAL_DIFFICULTY = 5;
export const INITIAL_USERNAME = "";
export const INITIAL_USER_PASSWORD = "";
export const INITIAL_USER_EMAIL = "";
export const INITIAL_USER_ID = "";
export const INITIAL_INDIVIDUAL_CHARACTER = {
  totalSuccess: 0,
  totalErrors: 0,
  accuracy: 0,
  averageSpeed: 0,
};
export const INITIAL_AVAILABLE_CHARACTERS = {
  A: { ...INITIAL_INDIVIDUAL_CHARACTER },
  B: { ...INITIAL_INDIVIDUAL_CHARACTER },
  C: { ...INITIAL_INDIVIDUAL_CHARACTER },
  D: { ...INITIAL_INDIVIDUAL_CHARACTER },
  E: { ...INITIAL_INDIVIDUAL_CHARACTER },
  F: { ...INITIAL_INDIVIDUAL_CHARACTER },
  G: { ...INITIAL_INDIVIDUAL_CHARACTER },
  H: { ...INITIAL_INDIVIDUAL_CHARACTER },
  I: { ...INITIAL_INDIVIDUAL_CHARACTER },
  J: { ...INITIAL_INDIVIDUAL_CHARACTER },
  K: { ...INITIAL_INDIVIDUAL_CHARACTER },
  L: { ...INITIAL_INDIVIDUAL_CHARACTER },
  M: { ...INITIAL_INDIVIDUAL_CHARACTER },
  N: { ...INITIAL_INDIVIDUAL_CHARACTER },
  O: { ...INITIAL_INDIVIDUAL_CHARACTER },
  P: { ...INITIAL_INDIVIDUAL_CHARACTER },
  Q: { ...INITIAL_INDIVIDUAL_CHARACTER },
  R: { ...INITIAL_INDIVIDUAL_CHARACTER },
  S: { ...INITIAL_INDIVIDUAL_CHARACTER },
  T: { ...INITIAL_INDIVIDUAL_CHARACTER },
  U: { ...INITIAL_INDIVIDUAL_CHARACTER },
  V: { ...INITIAL_INDIVIDUAL_CHARACTER },
  W: { ...INITIAL_INDIVIDUAL_CHARACTER },
  X: { ...INITIAL_INDIVIDUAL_CHARACTER },
  Y: { ...INITIAL_INDIVIDUAL_CHARACTER },
  Z: { ...INITIAL_INDIVIDUAL_CHARACTER },
};
export const INITIAL_STATISTICS = {
  inputInThisSession: [],
  totalSuccess: 0,
  totalErrors: 0,
  accuracy: 0,
  maxSpeed: 10000000,
  averageSpeed: 0,
  availableCharacters: INITIAL_AVAILABLE_CHARACTERS,
};
