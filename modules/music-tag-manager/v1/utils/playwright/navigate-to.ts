import type { Page } from "playwright";

type Props = {
  page: Page;
  url: string;
};

export const navigateTo$ = async ({ page, url }: Props) => {
  // #PUBLIC - Removed.
};
