import { ValidatorFunctionType } from "../types";
const testValidator = (validator: ValidatorFunctionType) => {
  return (inputToValidate: string) => {
    return validator(inputToValidate);
  };
};

export default testValidator;
