export default function validateName(input: string) {
  // This regex accepts spaces, letters and all the digits
  const lettersAndNumbers = /^[a-zA-Z]+$/;
  return lettersAndNumbers.test(input) && input.length <= 10;
}
