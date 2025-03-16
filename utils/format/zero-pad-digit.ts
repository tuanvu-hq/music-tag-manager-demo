type Props = {
  digit: number;
  max: number;
};

export const zeroPadDigit = ({ digit, max }: Props) => {
  return String(digit).padStart(String(max).length, "0");
};
