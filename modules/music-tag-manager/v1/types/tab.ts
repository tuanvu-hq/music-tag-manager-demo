import { CONSTANTS_SUBTAB, CONSTANTS_TAB, CONSTANTS_TAB_CONTROLS, CONSTANTS_TAB_GENERAL } from "../constants";

export type Subtab = keyof typeof CONSTANTS_SUBTAB;
export type SubtabControls = keyof typeof CONSTANTS_TAB_CONTROLS;
export type SubtabGeneral = keyof typeof CONSTANTS_TAB_GENERAL;
export type Tab = keyof typeof CONSTANTS_TAB;
