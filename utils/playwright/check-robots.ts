import nodeFetch from "node-fetch";
import robotsParser from "robots-parser";

type Props = {
  url: string;
  robotsUrl: string;
};

export const checkRobots$ = async ({ url, robotsUrl }: Props) => {
  const userAgent = "*";

  const response = await nodeFetch(robotsUrl);
  const text = await response.text();
  const robots = robotsParser(robotsUrl, text);

  return robots.isAllowed(url, userAgent);
};
