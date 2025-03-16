import type { CONSTANTS_PAGINATION } from "../constants";

export type Pagination = {
  limit: number; //   Limit per page
  page: number; //    Current page
  total: number; //   Total amount of available items
  current: number; // Current amount of returned items
};

export type Paginations = {
  [key in PaginationKey]: {
    pagination: Pagination;
    progress: Progress;
  };
};

export type Progress = {
  min: number;
  max: number;
  value: number;
  percentage: number;
};

export type PaginationKey = keyof typeof CONSTANTS_PAGINATION;

export type PaginateCallback = (payload: { page: number }) => Promise<{ data: any[]; pagination: Pagination }>;
