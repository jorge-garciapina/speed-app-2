export default function validatePassword(input: string) {
  // This regex accepts spaces, letters and all the digits
  const lettersAndNumbers = /^[a-zA-Z0-9]+$/;
  return lettersAndNumbers.test(input) && input.length >= 8;
}
