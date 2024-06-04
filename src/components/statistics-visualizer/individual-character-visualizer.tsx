// This will be a component that will be called whenever it is needed.
// It helps me to understand an issue that I have not understood before:
// In which cases use the state of the applications, and in which other
// cases pass the information as props.
// 1 - The cases in which the component should read from the state are those in which the component
//     will be "present" all the time, and it needs to change as state mutates
// 2- The cases in which a component should recieve the information as props are the cases in which
//    the component will not be present at all times, and they can be called to display the same info
//    about a different entity. For example, in this case I will display the information about the characters
//    it will be the same info, but for different character. Try to read from the state will be useless, because
//    the information will change everytime it is called anyways.
// Understand that can improve the performance of the application

import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { InfoForModal } from "../../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type IndividualCharacterVisualizerType = {
  open: boolean;
  handleClose: () => void;
  infoForIndividualCharModal: InfoForModal;
};

export default function IndividualCharacterVisualizer({
  open,
  handleClose,
  infoForIndividualCharModal,
}: IndividualCharacterVisualizerType) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* use flex and  Gap in the Box  */}
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {infoForIndividualCharModal.character}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Accuracy: {infoForIndividualCharModal.infoObject.accuracy}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            AverageSpeed: {infoForIndividualCharModal.infoObject.averageSpeed}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            TotalErrors: {infoForIndividualCharModal.infoObject.totalErrors}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            TotalSuccess: {infoForIndividualCharModal.infoObject.totalSuccess}
          </Typography>

          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Back
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
