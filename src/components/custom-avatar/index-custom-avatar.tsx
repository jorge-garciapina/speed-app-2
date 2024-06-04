import { Avatar, styled } from "@mui/material";

type CustomAvatarPropsType = {
  openModal: () => void;
  src: string;
};

const StyledAvatar = styled(Avatar)(() => ({
  width: 100,
  height: 100,
}));

export default function CustomAvatar({
  openModal,
  src,
}: CustomAvatarPropsType) {
  return (
    <StyledAvatar
      onClick={openModal}
      src={src || "/static/images/avatar/avatar0.png"}
    />
  );
}
