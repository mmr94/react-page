import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from '../../reduxConnect';
import { Devices, setDevice, setZoom } from '../../actions/display';
import { useOption, useOptions } from './options';
import { useCallbackOption, useCallbackOptions } from './callbacks';

export const useSetDevice = () => {
  const onChangeDevice=useCallbackOption("onChangeDevice")
  const dispatch = useDispatch();

  return useCallback((device: Devices) => {
    if(onChangeDevice){
      onChangeDevice(device)
    }
    dispatch(setDevice(device))
  }, [dispatch]);
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

  if(screenWidth>992){
    device="DESKTOP"
  }

  console.log("useDeviceByScreen",device,screenWidth)

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
