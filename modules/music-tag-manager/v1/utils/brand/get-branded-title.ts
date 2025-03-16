import type { BrandedTitle } from "../../types/brand";

type Props = {
  title: string;
};

export const getBrandedTitle = ({ title }: Props) => {
  return title as BrandedTitle;
};
