export default function validateInput(event: string) {
  const onlyLetters = /[a-zA-Z]/;
  if (event.length === 1 && onlyLetters.test(event)) {
    return event.toUpperCase();
  } else {
    return "*";
  }
}
