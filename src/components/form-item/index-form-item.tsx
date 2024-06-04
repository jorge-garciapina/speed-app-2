import { useRef, useState } from "react";
import CustomTextField from "../../mui-configurations/styled-components/custom-text-field";
import { FormItemPropsType } from "../../types";

import databaseSingleton from "../../utils/database-operations";

export default function FormItem({
  textToDisplay,
  isLoginItem,
  validationFunction,
  dispatchFunction,
}: FormItemPropsType) {
  const [error, setError] = useState(false);
  const debouncingTimeout = useRef<number | null>(null);

  const currentEntryValue = useRef("");

  // Function to handle debouncing.
  async function debouncingFn(
    delay: number,
    actionToDelay: () => void
  ): Promise<void> {
    // Clear any existing timeout to reset the debounce mechanism
    if (debouncingTimeout.current !== null) {
      clearTimeout(debouncingTimeout.current);
    }

    // Create a delay using a Promise and await
    await new Promise<void>((resolve) => {
      debouncingTimeout.current = window.setTimeout(resolve, delay);
    });

    // Update text after the delay
    actionToDelay();
  }

  async function debouncedFunctionallity() {
    const exists = await databaseSingleton.checkEmailExists(
      currentEntryValue.current
    );

    // !isLoginItem is to prevent loginItems to display errors due to validation
    // (in order to not give so much info on wrong requests)
    if (!isLoginItem && !validationFunction(currentEntryValue.current)) {
      setError(true);
    } else if (!isLoginItem && validationFunction(currentEntryValue.current)) {
      setError(false);
    }

    if (!isLoginItem && exists) {
      setError(true);
    }

    // This increases the decouple of this component with the information it will recieve.
    // It is used on both Login and Register components to display the text inputs it needs
    dispatchFunction(currentEntryValue.current);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    currentEntryValue.current = event.target.value;
    // To make this apply to only Register components: !isLoginItem
    // To Login components: isLoginItem
    debouncingFn(1000, debouncedFunctionallity);
  }

  return (
    <>
      <CustomTextField
        label={`${textToDisplay}`}
        onChange={handleChange}
        error={error}
      />
    </>
  );
}
