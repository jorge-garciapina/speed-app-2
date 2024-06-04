import { memo, useContext, useEffect, useRef, useState } from "react";
import {
  SpeedTypeContext,
  // SpeedTypeDispatchContext,
} from "../../general-store/context-provider";

type TimerComponentPropType = {
  finishGame: () => void;
};

const TimerComponent = memo(
  ({
    // The idea of recieving the timeInterval as props does not seem so correct now.
    // The reason for the change is that the "Start Game" button can be used to update the
    // state with the values provided by the user. This timer can read the timeInterval
    // from the value in the state. That will simplify passing the information from the user
    // selection to this component, otherwise I might need to implement some useState on the
    // index-game-view which will be against the idea of centralize the state
    finishGame,
  }: TimerComponentPropType) => {
    const state = useContext(SpeedTypeContext);
    // const dispatch = useContext(SpeedTypeDispatchContext);

    const [time, setTime] = useState(state?.timeInterval as number);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
      // console.log("HERE TIME: ", state?.timeInterval);
      // Now this logic is called upon changes in state?.winnerModal and not the initial renders.
      if (state?.winnerModal) {
        // The initial state for --->state?.winnerModal<--- is false, when that value
        // is true then the game has not finished
        clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
      } else {
        // Only the "current" field is update, not the intervalRef
        intervalRef.current = setInterval(() => {
          setTime((prevTime) => prevTime - 1);

          // dispatch!({ type: "decrease-interval-time" });
        }, 100);
      } //TODO: Change to seconds or miliseconds after first test
      return () =>
        clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
      // return () => clearInterval(countDown);
    }, [state?.winnerModal]);

    useEffect(() => {
      if ((time as number) <= 0) {
        // if ((state?.timeInterval as number) <= 0) {
        finishGame();
        clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
      }
    }, [time]);

    useEffect(() => {
      setTime(state?.timeInterval as number);
    }, [state?.timeInterval]);

    return <h1>{state?.winnerModal ? "" : time}</h1>;
  }
);
export default TimerComponent;
