// In this component I created a form holder which will recieve an array of items
// to configure and it will render automatically
import { FormItemsToRender } from "../../types";
import FormItem from "../form-item/index-form-item";

export default function FormHolder({ items }: FormItemsToRender) {
  const formItems = items.map((element, index) => {
    const name = element.textToDisplay;
    const isLoginItem = element.isLoginItem;
    const label = element.label;
    const validationFunction = element.validationFunction;
    const dispatchFunction = element.dispatchFunction;
    return (
      <FormItem
        key={index}
        textToDisplay={name}
        isLoginItem={isLoginItem}
        label={label}
        validationFunction={validationFunction}
        dispatchFunction={dispatchFunction}
      />
    );
  });
  return <>{formItems}</>;
}
