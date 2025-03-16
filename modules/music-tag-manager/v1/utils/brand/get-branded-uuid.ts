import type { BrandedUUID } from "../../types/brand";

type Props = {
  uuid: string;
};

export const getBrandedUUID = ({ uuid }: Props) => {
  return uuid as BrandedUUID;
};
