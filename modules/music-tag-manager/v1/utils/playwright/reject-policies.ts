import type { Page } from "playwright";

type Props = {
  page: Page;
};

export const rejectPolicies$ = async ({ page }: Props) => {
  // #PUBLIC - Removed.
};
