export default function validateEmail(input: string) {
  // This regex accepts spaces, letters and all the digits
  const lettersAndNumbers = /@/;
  return lettersAndNumbers.test(input) && input.length <= 50;
}
