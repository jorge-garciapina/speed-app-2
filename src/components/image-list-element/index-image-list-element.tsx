import { Box, ImageListItem } from "@mui/material";
import { useContext } from "react";
import { SpeedTypeDispatchContext } from "../../general-store/context-provider";
type ImageListElementPropsType = {
  src: string;
  title: string;
  closeModal: () => void;
};

export default function ImageListElement({
  src,
  title,
  closeModal,
}: ImageListElementPropsType) {
  const dispatch = useContext(SpeedTypeDispatchContext);

  const srcSet = `${src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`;

  // const srcSet = `${src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`;

  // const src = `${src}?w=164&h=164&fit=crop&auto=format`;

  function handleAvatarSelection() {
    dispatch!({ type: "set-avatar", newAvatar: src });

    // With this the modal is closed as soon as user selects avatar
    closeModal();
  }
  return (
    <>
      <Box onClick={handleAvatarSelection}>
        <ImageListItem>
          <img srcSet={srcSet} src={src} alt={title} loading="lazy" />
        </ImageListItem>
      </Box>
    </>
  );
}
