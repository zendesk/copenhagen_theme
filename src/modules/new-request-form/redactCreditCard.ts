const NON_DIGITS_REGEX = /[^\d]/g;
const CC_NUMBERS_REGEX = /[0-9]{13,19}/;
const REDACTED_CC_NUMBER_REGEX = /^[X]{9,15}/;
const MIN_LENGTH = 13;
const MAX_LENGTH = 19;

export function redactCreditCard(input: string) {
  // if number is already redacted, just send it back
  if (alreadyRedactedCCNumber(input)) {
    return input;
  }

  const cleaned = removeNonDigits(input);
  if (!hasValidLength(cleaned)) {
    // if input string is not inside valid length for credit card number,
    // such as in the case when extra text is entered beside cc number,
    // we will remove spaces and dashes from original input,
    // and redact credit card number if we can find it
    // or redact everything if we can't find anything resembling cc number.
    const ccTextWithoutSpacesAndDashes = removeSpacesAndDashes(input);
    const ccNumber = CC_NUMBERS_REGEX.exec(
      ccTextWithoutSpacesAndDashes.toString()
    );
    if (ccNumber !== null) {
      return redactCCNumber(ccNumber.toString());
    } else {
      // redact everything since that is an error and not valid cc number
      return charRepeater("X", cleaned.length);
    }
  } else {
    return redactCCNumber(cleaned.toString());
  }
}

function hasValidLength(input: string) {
  return input.length >= MIN_LENGTH && input.length <= MAX_LENGTH;
}

function removeNonDigits(input: string) {
  return input.replace(NON_DIGITS_REGEX, "");
}

function removeSpacesAndDashes(input: string) {
  return input.replace(/-|\s/g, "");
}

function redactCCNumber(input: string) {
  const length = input.length;
  const redactEnd = length - 4;
  const lastDigits = input.toString().substring(redactEnd, length);
  return charRepeater("X", redactEnd) + lastDigits;
}

function alreadyRedactedCCNumber(input: string) {
  return REDACTED_CC_NUMBER_REGEX.test(input);
}

function charRepeater(character: string, length: number) {
  const repeatedString = [];

  for (let i = 0; i < length; i++) {
    repeatedString.push(character);
  }

  return repeatedString.join("");
}
