import type { Page } from "playwright";

type Props = {
  page: Page;
  locator: string;
};

export const waitForLocator$ = async ({ page, locator }: Props) => {
  // #PUBLIC - Removed.
};
