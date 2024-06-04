// This is the modal that will be displayed when the game finishes

import StatisticsVisualizer from "../statistics-visualizer/index-statistics-visualizer";

import { Typography, Paper, Button, Modal, styled } from "@mui/material";
import { Link } from "react-router-dom";

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

type EndGameModalPropsType = {
  open: boolean;
  handleClose: () => void;
  // I need to think more about the information recieved
};

export default function EndGameModal({
  open,
  handleClose,
}: // I need to think more about the information recieved
EndGameModalPropsType) {
  return (
    <Paper>
      <CustomEndGameModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Typography variant="endGameModal">Game Finished</Typography>
          <StatisticsVisualizer />

          {/* TODO: This button will control the dispatch of the information to store in the indexDB
                    it will be the same information that is stored in the state, so the only needed thing 
                    is to transfer it from the state to the data storage
          */}
          <Link to="/">
            <Button
              onClick={() => {
                handleClose();
              }}
              variant="playAgain"
            >
              Play Again
            </Button>
          </Link>
        </>
      </CustomEndGameModal>
    </Paper>
  );
}
