import type { Devices, DisplayModes } from '../actions/display';

export type Display = {
  mode: DisplayModes;
  referenceNodeId?: string;
  zoom: number;
  device:Devices
};
