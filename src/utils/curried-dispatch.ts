import { ValidActionTypes, ActionType } from "../types";
export default function createDispatchEvent(
  dispatch: React.Dispatch<ActionType> | null
) {
  return (type: ValidActionTypes): ((newInfo: string) => void) => {
    return (newInfo: string) => {
      dispatch!({
        type: type,
        newInfo: newInfo,
      });
    };
  };
}
