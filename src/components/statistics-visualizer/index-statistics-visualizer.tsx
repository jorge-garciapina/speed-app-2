import { useContext, useEffect, useState } from "react";
import { SpeedTypeContext } from "../../general-store/context-provider";
import {
  INITIAL_AVAILABLE_CHARACTERS,
  INITIAL_INDIVIDUAL_CHARACTER,
} from "../../utils/initial-values";
import {
  AvailableCharactersType,
  AllowedCharactersType,
  InfoForModal,
} from "../../types";
import { Button, Container, Paper, styled, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

import DataTable from "./data-table";

// FOR TESTING THE MODAL COFIG:
import IndividualCharacterVisualizer from "./individual-character-visualizer";

import { StatisticsVisualizerPropsType } from "../../types";

const CustomGraphChar = styled(BarChart)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: "white",
}));

const CustomSuccessErrorsContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  width: "80%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  marginBottom: "10px",
}));

export default function StatisticsVisualizer({
  statistics,
}: StatisticsVisualizerPropsType) {
  const theme = useTheme();
  const [totalSuccess, setTotalSuccess] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);

  const [charactersResults, setCharactersResults] =
    useState<AvailableCharactersType>(INITIAL_AVAILABLE_CHARACTERS);
  const [infoForIndividualCharModal, setInfoForIndividualCharModal] =
    useState<InfoForModal>({
      character: "A",
      infoObject: { ...INITIAL_INDIVIDUAL_CHARACTER },
    });

  // FOR THE MODAL:
  const [modalOpen, setModalOpen] = useState(false);
  const state = useContext(SpeedTypeContext);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setTotalSuccess(state?.InputStatistics.totalSuccess as number);
    setTotalErrors(state?.InputStatistics.totalErrors as number);
    setCharactersResults(
      state?.InputStatistics.availableCharacters as AvailableCharactersType
    );
    setAccuracy(state?.InputStatistics.accuracy as number);
    setAverageSpeed(state?.InputStatistics.averageSpeed as number);
    setMaxSpeed(state?.InputStatistics.maxSpeed as number);
  }, [state?.InputStatistics]);

  useEffect(() => {
    if (statistics) {
      const propsStatistics = JSON.parse(statistics);

      setTotalErrors(propsStatistics.totalErrors as number);
      setTotalSuccess(propsStatistics.totalSuccess as number);

      setCharactersResults(
        propsStatistics.availableCharacters as AvailableCharactersType
      );
      setAccuracy(propsStatistics.accuracy as number);
      setAverageSpeed(propsStatistics.averageSpeed as number);
      setMaxSpeed(propsStatistics.maxSpeed as number);
    }
  }, [statistics]);

  // To create the buttons associated which is available character
  const availableCharactersArray1 = Object.entries(charactersResults).map(
    (element, index) => {
      return (
        <Button
          key={index}
          onClick={() => {
            setModalOpen(true);
            setInfoForIndividualCharModal({
              character: element[0] as AllowedCharactersType,
              infoObject: element[1],
            });
          }}
        >
          {element[0]}
        </Button>
      );
    }
  );

  const xAxis = Object.keys(charactersResults);
  const totalSuccessArr = Object.values(charactersResults).map((element) => {
    return element.totalSuccess;
  });
  const totalErrorsArr = Object.values(charactersResults).map((element) => {
    return element.totalErrors;
  });

  return (
    <>
      <Container> {availableCharactersArray1}</Container>
      <IndividualCharacterVisualizer
        // Is the modal open when clicking any of the letters in the alphabeth
        open={modalOpen}
        handleClose={handleModalClose}
        infoForIndividualCharModal={infoForIndividualCharModal}
      />

      <CustomSuccessErrorsContainer elevation={24}>
        {/* Text below the alphabeth */}
        <Typography variant="totalSuccess">
          Total Success: {totalSuccess}
        </Typography>

        <Typography variant="totalErrors">
          Total Errors: {totalErrors}
        </Typography>
      </CustomSuccessErrorsContainer>

      {/* Displays: "Accuracy",	"Average Speed" and "Max Speed": */}
      <DataTable
        accuracy={accuracy}
        averageSpeed={averageSpeed}
        maxSpeed={maxSpeed}
      />

      <CustomGraphChar
        series={[
          {
            data: totalSuccessArr,
            color: theme.palette.success.light,
          },
          {
            data: totalErrorsArr,
            color: theme.palette.error.light,
          },
        ]}
        height={290}
        xAxis={[
          {
            data: xAxis,
            scaleType: "band",
          },
        ]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </>
  );
}
