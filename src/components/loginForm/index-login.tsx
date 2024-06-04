import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material";
import LoginPaper from "../../mui-configurations/styled-components/login-paper";
import FormHolder from "../form-holder/index-form-holder";
import validateName from "../../utils/name-validation";
import testValidator from "../../utils/test-validator";
import { SpeedTypeContext } from "../../general-store/context-provider";
import { useContext } from "react";

import databaseSingleton from "../../utils/database-operations";

import { SpeedTypeDispatchContext } from "../../general-store/context-provider";

import createDispatchEvent from "../../utils/curried-dispatch";

import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  background: theme.palette.secondary.light,
  height: "100vh",
}));

const nameValidator = testValidator(validateName);

export default function LoginComponent() {
  const state = useContext(SpeedTypeContext);
  const dispatch = useContext(SpeedTypeDispatchContext);

  const setEventType = createDispatchEvent(dispatch);
  const dispatchNewPassword = setEventType("set-userPassword");
  const dispatchNewUserID = setEventType("set-user-ID");

  const navigate = useNavigate();

  const loginItems = [
    {
      textToDisplay: "Name/email",
      isLoginItem: true,
      label: "name_or_email",
      validationFunction: nameValidator,
      dispatchFunction: dispatchNewUserID,
    },
    {
      textToDisplay: "Password",
      isLoginItem: true,
      label: "password",
      validationFunction: nameValidator,
      dispatchFunction: dispatchNewPassword,
    },
  ];

  async function handleLogin() {
    try {
      const result = await databaseSingleton.login({
        userID: state?.userID,
        password: state?.userPassword,
      });

      if (result.success) {
        console.log("LOGIN RESULT: ", result);

        dispatch!({
          type: "notify-user-online",
          validatedUserEmail: result.userEmail,
          validatedUserAvatar: result.userAvatar,
          validatedUserName: result.userName,
        });

        navigate("/game");
      } else {
        console.log(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }
  }

  return (
    <StyledContainer>
      <LoginPaper elevation={24}>
        <Typography variant="loginRegister">Login</Typography>
        <FormHolder items={loginItems} />
        <Button onClick={handleLogin} variant="playAgain">
          Login
        </Button>
      </LoginPaper>
    </StyledContainer>
  );
}
