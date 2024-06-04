import StatisticsVisualizer from "../statistics-visualizer/index-statistics-visualizer";
import PlayingArea from "../playing-area/index-playing-area";
import CustomPaper from "../../mui-configurations/styled-components/custom-paper";
import { styled, Box, Grid } from "@mui/material";
import { useContext, memo, useState, useEffect } from "react";
import {
  SpeedTypeContext,
  SpeedTypeDispatchContext,
} from "../../general-store/context-provider";

import EndGameModal from "../end-of-game-modal/index-end-game-modal";

import TimerComponent from "../timer-component/index-timer";
import LateralMenuComponent from "../lateral-menu/index-lateral-menu";

import databaseSingleton from "../../utils/database-operations";

const CustomGameView = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
}));

const GameView = memo(() => {
  const handleModalClose = () => {
    dispatch!({ type: "restart-values" });
    dispatch!({
      type: "close-winner-modal",
    });
  };

  const state = useContext(SpeedTypeContext);
  const dispatch = useContext(SpeedTypeDispatchContext);

  const [validatedUserEmail, setValidatedUserEmail] = useState("");

  useEffect(() => {
    if (state?.validatedUserEmail) {
      setValidatedUserEmail(state?.validatedUserEmail);
    }
  }, [state?.validatedUserEmail]);

  async function finishGame() {
    dispatch!({ type: "call-winner-modal" });
    dispatch!({ type: "finish-game" });
    try {
      const statistics = {
        accuracy: state?.InputStatistics.accuracy,
        availableCharacters: state?.InputStatistics.availableCharacters,
        averageSpeed: state?.InputStatistics.averageSpeed,
        maxSpeed: state?.InputStatistics.maxSpeed,
        totalErrors: state?.InputStatistics.totalErrors,
        totalSuccess: state?.InputStatistics.totalSuccess,
      };

      await databaseSingleton.saveUserGameData({
        email: validatedUserEmail,
        // email: "player1@company",
        newGameInfoData: JSON.stringify(statistics),
      });
      // console.log("INFO SAVE: index-game-view -DD-", state?.InputStatistics);
    } catch (error) {
      console.error("Error saving user game data:", error);
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <LateralMenuComponent />
      </Grid>
      <Grid item xs={10}>
        <CustomGameView>
          <TimerComponent finishGame={finishGame} />

          <EndGameModal
            open={state?.showWinnerModal as boolean}
            handleClose={handleModalClose}
          />

          <CustomPaper elevation={24}>
            <PlayingArea />
          </CustomPaper>

          <CustomPaper elevation={24}>
            <StatisticsVisualizer />
          </CustomPaper>
        </CustomGameView>
      </Grid>
    </Grid>
  );
});

export default GameView;
