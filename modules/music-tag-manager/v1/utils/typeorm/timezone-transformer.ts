import moment from "moment-timezone";
import type { ColumnOptions } from "typeorm";

type Props = {
  name: string;
};

export const timezoneTransformer = ({ name }: Props) => {
  return {
    name,
    type: "timestamptz",
    transformer: {
      to: (value: Date) => value,
      from: (value: Date | null) => (value ? moment(value).tz("Europe/Prague").toDate() : value),
    },
  } satisfies ColumnOptions;
};
