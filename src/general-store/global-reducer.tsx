// import evaluateInputKey from "../utils/compare-characters";
import { ReducerStateType, ActionType, InputStatisticsType } from "../types";
import {
  INITIAL_WORD,
  INITIAL_WORD_LENGTH,
  INITIAL_INDEX_WORD,
  INITIAL_LAST_STROKE,
  INITIAL_IS_PLAYING,
  INITIAL_SHOW_WINNER_MODAL,
  INITIAL_TIME_INTERVAL,
  INITIAL_DIFFICULTY,
  INITIAL_STATISTICS,
} from "../utils/initial-values";

export default function reducer(state: ReducerStateType, action: ActionType) {
  switch (action.type) {
    case "change-current-word": {
      const newWord = action.newWord as string;

      // This event is meant to change the current word that will be used to reference so the user
      // can test his typing abilities. It will be called every time a new word is added (not modified)
      return {
        ...state,
        currentWord: newWord,
        currentWordLength: newWord.length,
        currentIndexInWord: -1, // To avoid the word starting from index 1 when I type, handled when called
      };
    }

    case "notify-new-key": {
      return { ...state, currentIndexInWord: state.currentIndexInWord++ };
    }

    case "update-time-of-last-stroke": {
      // Everytime this event is called the time of the last stroke is updated
      //TODO: it will recieve the time of the stroke. I have dedided to do that to have more freedom to use it

      return { ...state, lastStroke: action.lastStrokeTimeStamp as number };
    }

    case "reset-current-index-in-word": {
      return { ...state, currentIndexInWord: -1 };
    }

    case "update-statistics": {
      // To simplify this component, I will make this recieve only the newStatisticsObject with type InputStatisticsType
      // The index-writing will be in charge of handling the logic to modify that object
      return {
        ...state,
        InputStatistics: action.newStatisticsObject as InputStatisticsType,
      };
    }

    case "start-game": {
      // To simplify this component, I will make this recieve only the newStatisticsObject with type InputStatisticsType
      // The index-writing will be in charge of handling the logic to modify that object
      // console.log("start-game");
      return {
        ...state,
        winnerModal: false,
      };
    }

    case "finish-game": {
      // To simplify this component, I will make this recieve only the newStatisticsObject with type InputStatisticsType
      // The index-writing will be in charge of handling the logic to modify that object
      // console.log("finish-game");
      // // console.log(state.InputStatistics);
      // // console.log(JSON.stringify(state.InputStatistics));

      const durationOfInterval = action.newTimeInterval;

      return {
        ...state,
        winnerModal: true,
        timeInterval: durationOfInterval as number,
      };
    }

    case "decrease-interval-time": {
      // To simplify this component, I will make this recieve only the newStatisticsObject with type InputStatisticsType
      // The index-writing will be in charge of handling the logic to modify that object
      return {
        ...state,
        timeInterval: state.timeInterval - 1,
      };
    }

    case "set-interval-time": {
      // To simplify this component, I will make this recieve only the newStatisticsObject with type InputStatisticsType
      // The index-writing will be in charge of handling the logic to modify that object

      // // console.log("TOTAL TIME: ", action.totalTime);

      return {
        ...state,
        timeInterval: action.totalTime as number,
      };
    }

    case "set-difficulty": {
      // To simplify this component, I will make this recieve only the newStatisticsObject with type InputStatisticsType
      // The index-writing will be in charge of handling the logic to modify that object

      // // console.log("DIFFICULTY:  ", action.difficulty);

      return {
        ...state,
        difficulty: action.difficulty as number,
      };
    }

    case "call-winner-modal": {
      return {
        ...state,
        showWinnerModal: true,
      };
    }

    case "close-winner-modal": {
      return {
        ...state,
        showWinnerModal: false,
      };
    }

    case "restart-values": {
      return {
        ...state,
        currentWord: INITIAL_WORD,
        currentWordLength: INITIAL_WORD_LENGTH,
        currentIndexInWord: INITIAL_INDEX_WORD,
        lastStroke: INITIAL_LAST_STROKE,
        winnerModal: INITIAL_IS_PLAYING,
        showWinnerModal: INITIAL_SHOW_WINNER_MODAL,
        timeInterval: INITIAL_TIME_INTERVAL,
        difficulty: INITIAL_DIFFICULTY,
        InputStatistics: INITIAL_STATISTICS,
      };
    }

    case "set-userName": {
      // console.log("set-userName", action.newInfo);

      return {
        ...state,
        userName: action.newInfo as string,
      };
    }

    case "set-userPassword": {
      // console.log("set-userPassword", action.newInfo);
      return {
        ...state,
        userPassword: action.newInfo as string,
      };
    }

    case "set-userEmail": {
      // console.log("set-userEmail", action.newInfo);
      return {
        ...state,
        userEmail: action.newInfo as string,
      };
    }

    case "set-user-ID": {
      // console.log("set-user-ID", action.newInfo);
      return {
        ...state,
        userID: action.newInfo as string,
      };
    }

    case "set-avatar": {
      // This case will be used by the component in charge of handling the logic for the
      // icon selector (to be build)
      // // console.log("set-avatar", action.newAvatar);
      return {
        ...state,
        avatar: action.newAvatar as string,
      };
    }

    case "notify-user-offline": {
      // console.log("LOGOUT");
      return {
        ...state,
        validatedUserEmail: "",
      };
    }

    case "notify-user-online": {
      return {
        ...state,
        validatedUserEmail: action.validatedUserEmail as string,
        validatedUserAvatar: action.validatedUserAvatar as string,
        validatedUserName: action.validatedUserName as string,
      };
    }
    default: {
      return state;
    }
  }
}
