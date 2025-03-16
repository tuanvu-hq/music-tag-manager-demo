type Props = {
  ms?: number;
};

export const sleep$ = async ({ ms = 1000 }: Props) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
