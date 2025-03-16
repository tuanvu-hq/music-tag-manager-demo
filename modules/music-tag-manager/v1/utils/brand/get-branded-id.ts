import type { BrandedID } from "../../types/brand";

type Props = {
  id: string;
};

export const getBrandedID = ({ id }: Props) => {
  return id as BrandedID;
};
