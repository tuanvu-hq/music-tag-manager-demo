type Props = {
  iso: string;
};

export const isoToYear = ({ iso }: Props) => {
  const date = new Date(iso);

  return "" + date.getFullYear();
};
