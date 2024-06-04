// I will reuse the definition of the context (it comes from the documentation, there is not much I can add to it)
// THIS COMES FROM THE OFFICIAL DOCUMENTATION: https://react.dev/learn/scaling-up-with-reducer-and-context
import { createContext, Dispatch } from "react";

import { ReducerStateType, ActionType } from "../types";

export const SpeedTypeContext = createContext<ReducerStateType | null>(null);
export const SpeedTypeDispatchContext =
  createContext<Dispatch<ActionType> | null>(null);
