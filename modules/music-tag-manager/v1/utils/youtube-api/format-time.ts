type Props = {
  seconds: number;
};

export const formatTime = ({ seconds }: Props) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");

  return `${hours}:${minutes}:${remainingSeconds}`;
};
