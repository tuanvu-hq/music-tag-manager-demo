import type { Page } from "playwright";

type Props = {
  page: Page;
  selector: string;
};

export const scrollPageDown$ = async ({ page, selector }: Props) => {
  // #PUBLIC - Removed.
};
