// import { styled } from "@mui/material";
import { Typography } from "@mui/material";

// const StyledCharacterComponent = styled(Typography)(() => ({
//   backgroundColor: "white", // Default background color
//   display: "inline-block",
//   padding: "0",
//   margin: "0",
//   lineHeight: "1",
// }));

import { CharacterComponentPropsType } from "../../types";

export default function CharacterComponent({
  isCorrect,
  character,
}: CharacterComponentPropsType) {
  return (
    <Typography
      variant={isCorrect ? "typedCharacterCorrect" : "typedCharacterIncorrect"}
    >
      {character}
    </Typography>
  );
}
