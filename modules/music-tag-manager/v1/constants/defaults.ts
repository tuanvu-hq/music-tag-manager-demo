import type { Pagination, Playback, Progress, Time, Volume } from "../types";

export const DEFAULT_PROGRESS: Progress = {
  min: 1,
  max: 1,
  value: 1,
  percentage: 100,
} as const;

export const DEFAULT_PAGINATION: Pagination = {
  limit: 0,
  page: 0,
  current: 0,
  total: 0,
} as const;

export const DEFAULT_PLAYBACK: Playback = {
  playing: false,
  repeating: false,
  shuffling: false,
  continuing: true,
};

export const DEFAULT_TIME: Time = {
  current: 0,
  end: 0,
  progress: 0,
} as const;

export const DEFAULT_VOLUME: Volume = {
  current: 100,
  previous: 0,
};
