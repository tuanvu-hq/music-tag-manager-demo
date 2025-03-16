import type { BrandedCustomURL } from "../../types/brand";

type Props = {
  customUrl: string;
};

export const getBrandedCustomURL = ({ customUrl }: Props) => {
  return customUrl as BrandedCustomURL;
};
