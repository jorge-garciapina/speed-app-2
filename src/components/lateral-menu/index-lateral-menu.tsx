import Box from "@mui/material/Box";
import { Slider, Typography, Button } from "@mui/material";
import { useRef, useContext, useState, useEffect } from "react";
import {
  SpeedTypeDispatchContext,
  SpeedTypeContext,
} from "../../general-store/context-provider";
import {
  INITIAL_TIME_INTERVAL,
  INITIAL_DIFFICULTY,
} from "../../utils/initial-values";

import databaseSingleton from "../../utils/database-operations";
import StatisticsModal from "../statistics-modal/index-statistics-modal";

export default function LateralMenuComponent() {
  const state = useContext(SpeedTypeContext);
  const difficultySlider = useRef<HTMLSpanElement>(null);
  const timeSlider = useRef<HTMLSpanElement>(null);

  const [difficulty, setDifficulty] = useState(INITIAL_DIFFICULTY);
  const [timeInterval, setTimeInterval] = useState(INITIAL_TIME_INTERVAL);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statisticsInformation, setStatisticsInformation] = useState("");

  const [validatedUserEmail, setValidatedUserEmail] = useState("");

  function closeModal() {
    setIsModalOpen(false);
  }

  const dispatch = useContext(SpeedTypeDispatchContext);

  function difficultyChanges(_: Event, value: number | number[]) {
    setDifficulty(value as number);
  }

  function timeChanges(_: Event, value: number | number[]) {
    setTimeInterval(value as number);
  }

  function startGame() {
    dispatch!({ type: "start-game" });
    dispatch!({ type: "set-interval-time", totalTime: timeInterval });
    dispatch!({ type: "set-difficulty", difficulty: difficulty });
  }

  useEffect(() => {
    if (state?.validatedUserEmail) {
      setValidatedUserEmail(state?.validatedUserEmail);
    }
  }, [state?.validatedUserEmail]);

  async function callUSerGameInfo() {
    try {
      const result = await databaseSingleton.getUserGameData({
        email: validatedUserEmail,
      });

      if (result.success) {
        setStatisticsInformation(result.data as string);
        setIsModalOpen(true);
      } else {
        console.log(`Failed to retrieve game data: ${result.message}`);
      }
    } catch (error) {
      console.error("Error retrieving user game data:", error);
    }
  }

  return (
    <Box sx={{ height: "100vh" }}>
      <Typography variant="gameConfigHeader">Configuration</Typography>

      <Typography variant="lateralMenuSectionHeader">Difficulty:</Typography>

      <Slider
        onChange={difficultyChanges}
        ref={difficultySlider}
        aria-label="Difficulty"
        defaultValue={INITIAL_DIFFICULTY}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
      />

      <Typography variant="lateralMenuSectionHeader">Time:</Typography>

      <Slider
        onChange={timeChanges}
        ref={timeSlider}
        aria-label="Time"
        defaultValue={INITIAL_TIME_INTERVAL}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={120}
      />

      <Button onClick={startGame} variant="playAgain">
        Start Game
      </Button>

      <Button onClick={callUSerGameInfo}>User Info</Button>
      <StatisticsModal
        open={isModalOpen}
        handleClose={closeModal}
        statistics={statisticsInformation}
      />
    </Box>
  );
}
