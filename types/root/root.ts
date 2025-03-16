export type Tab = "Routes" | "APIs";

type RootApiItem = {
  url: string;
  method: string;
};

export type RootApiBlock = {
  type: string;
  items: RootApiItem[];
};
