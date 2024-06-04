import * as React from "react";
import { Box, Modal, styled } from "@mui/material";

import { ImageList } from "@mui/material";
import ImageListElement from "../image-list-element/index-image-list-element";

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  borderColor: theme.palette.primary.dark,
  display: "flex",
  flexDirection: "column",
  padding: "0px 20px 10px",
  marginTop: "30px",
  alignItems: "center",
  width: "60%",
  top: "50%",
  left: "50%",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",

  // maxWidth: "80%",
}));

type ModalPropsType = {
  open: boolean;
  closeModal: () => void;
};
export default function AvatarSelectorModal({
  open,
  closeModal,
}: ModalPropsType) {
  const handleClose = () => closeModal();

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomBox>
          <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={164}>
            {itemData.map((item) => (
              <ImageListElement
                key={item.src}
                src={item.src}
                title={item.title}
                closeModal={closeModal}
              />
            ))}
          </ImageList>
        </CustomBox>
      </Modal>
    </>
  );
}

const itemData = [
  {
    src: "/static/images/avatar/avatar0.png",
    title: "avatar0",
  },
  {
    src: "/static/images/avatar/avatar1.png",
    title: "avatar1",
  },
  {
    src: "/static/images/avatar/avatar2.png",
    title: "avatar2",
  },
  {
    src: "/static/images/avatar/avatar3.png",
    title: "avatar3",
  },
  {
    src: "/static/images/avatar/avatar4.png",
    title: "avatar4",
  },
  {
    src: "/static/images/avatar/avatar5.png",
    title: "avatar5",
  },
  {
    src: "/static/images/avatar/avatar6.png",
    title: "avatar6",
  },
  {
    src: "/static/images/avatar/avatar7.png",
    title: "avatar7",
  },
  {
    src: "/static/images/avatar/avatar8.png",
    title: "avatar8",
  },
];
