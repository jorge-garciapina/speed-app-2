// This is the modal that will be displayed when the game finishes

import { useEffect, useState } from "react";
import StatisticsVisualizer from "../statistics-visualizer/index-statistics-visualizer";
import { Paper, Button, Modal, styled } from "@mui/material";
// import { Typography, Paper, Button, Modal, styled } from "@mui/material";

const CustomEndGameModal = styled(Modal)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  borderStyle: "solid",
  borderBlockColor: "white",
  borderWidth: "5px",
  width: "80%",
  height: "90%",
  padding: "5px",
  top: "5%",
  left: "10%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

type StatisticsModalPropsType = {
  open: boolean;
  handleClose: () => void;
  statistics: string;

  // I need to think more about the information recieved
};

export default function StatisticsModal({
  open,
  handleClose,
  statistics,
}: // I need to think more about the information recieved
StatisticsModalPropsType) {
  const [propStatistics, setPropStatistics] = useState("");

  useEffect(() => {
    setPropStatistics(statistics);
  }, [statistics]);

  return (
    <Paper>
      <CustomEndGameModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {/* <Typography variant="endGameModal">Game Finished</Typography> */}
          <StatisticsVisualizer statistics={propStatistics} />

          <Button
            onClick={() => {
              handleClose();
            }}
            variant="playAgain"
          >
            Close
          </Button>
        </>
      </CustomEndGameModal>
    </Paper>
  );
}
