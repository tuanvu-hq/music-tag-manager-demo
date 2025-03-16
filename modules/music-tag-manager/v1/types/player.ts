export type Playback = {
  playing: boolean;
  repeating: boolean;
  shuffling: boolean;
  continuing: boolean;
};

export type Time = {
  current: number;
  end: number;
  progress: number;
};

export type Volume = {
  current: number;
  previous: number;
};
