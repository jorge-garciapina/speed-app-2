import { useContext } from "react";
import { SpeedTypeContext } from "../../general-store/context-provider";
import { Typography } from "@mui/material";

export default function CurrentWordVisualizer() {
  const state = useContext(SpeedTypeContext);

  return (
    <>
      <Typography variant="currentWord">
        {state?.winnerModal ? "" : state?.currentWord}
      </Typography>
    </>
  );
}
