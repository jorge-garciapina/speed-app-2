import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import WritingComponent from "../writing-component/index-writing";
import CurrentWordVisualizer from "../word-visualizer/index-word-visualizer";
import CustomPlayingArea from "../../mui-configurations/styled-components/playing-area";
import { Container, styled } from "@mui/material";

const CustomWordContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "50%",
  width: "50%",
}));

export default function PlayingArea() {
  return (
    <CustomPlayingArea>
      <CustomWordContainer>
        <CurrentWordVisualizer />
      </CustomWordContainer>
      <CustomWordContainer>
        <WritingComponent />
      </CustomWordContainer>

      {/* /////////// */}
    </CustomPlayingArea>
  );
}
