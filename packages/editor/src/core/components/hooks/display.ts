import { useCallback } from 'react';

import { useDispatch, useSelector } from '../../reduxConnect';
import { Devices, setDevice, setZoom } from '../../actions/display';
import { useOption } from './options';

export const useSetDevice = () => {
  const dispatch = useDispatch();
  return useCallback((device: Devices) => dispatch(setDevice(device)), [dispatch]);
};

/**
 * @returns the current device
 */
export const useDevice = () => {
  return useSelector((state) => state.reactPage.display.device);
};

/**
 * @returns the current device by screen
 */
export const useDeviceByScreen = ():Devices => {
  let device:Devices='MOBILE'
  let screenWidth:number=window.innerWidth
  //console.log("screenWidth",screenWidth)

  if(screenWidth>992){
    device="DESKTOP"
  }
  return device
};

export const useSetZoom = () => {
  const dispatch = useDispatch();
  return useCallback((zoom: number) => dispatch(setZoom(zoom)), [dispatch]);
};

/**
 * @returns the current zoom
 */
export const useZoom = () => {
  return useSelector((state) => state.reactPage.display.zoom);
};

export const useZoomOut = () => {
  const zoom = useZoom();
  const zoomFactors = useOption('zoomFactors');
  const setZoom = useSetZoom();
  return useCallback(() => {
    const newZoom = zoomFactors?.find((z) => z < zoom);
    if (newZoom) setZoom(newZoom);
  }, [zoom, setZoom, zoomFactors]);
};

export const useZoomIn = () => {
  const zoom = useZoom();
  const setZoom = useSetZoom();
  const zoomFactors = useOption('zoomFactors');
  return useCallback(() => {
    const newZoom = [...(zoomFactors ?? [])].reverse().find((z) => z > zoom);
    if (newZoom) setZoom(newZoom);
  }, [zoom, setZoom, zoomFactors]);
};

export const useCanZoomOut = () => {
  const zoom = useZoom();
  const zoomFactors = useOption('zoomFactors');

  return zoomFactors?.some((z) => z < zoom) ?? false;
};

export const useCanZoomIn = () => {
  const zoom = useZoom();
  const zoomFactors = useOption('zoomFactors');
  return zoomFactors?.some((z) => z > zoom) ?? false;
};
