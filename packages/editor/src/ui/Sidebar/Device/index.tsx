
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';

import React from 'react';
import {
  useCanRedo,
  useCanUndo,
  useDevice,
  useIsSmallScreen,
  useRedo,
  useSetDevice,
  useUndo,
} from '../../../core/components/hooks';
import Button from '../Button/index';


const ToogleDevice: React.FC = () => {
  const device = useDevice();
  const setDevice = useSetDevice();

  const isSmall = useIsSmallScreen();
  return (
    <div
      style={{
        height: isSmall ? 56 : 80,
        float: 'right',
        display: 'flex',
        direction: 'ltr',
        transform: 'scale(1.2)',
      }}
    >
      <div
        style={{
          width: isSmall ? 29 : 36,
          overflow: 'hidden',
          marginRight: isSmall ? 1 : 2,
        }}
      >
        <Button
          active={device === "DESKTOP"}
          style={{
            transform: `translateX(${isSmall ? 27 : 35}px)`,
          }}
          icon={
            <DesktopMacOutlinedIcon
              style={{ transform: `translateX(-${isSmall ? 6 : 12}px)` }}
            />
          }
          description={"Ordinateur"}
          onClick={()=>setDevice("DESKTOP")}
          activeColor="primary"
        />
      </div>
      <div
        style={{
          width: isSmall ? 28 : 36,
          overflow: 'hidden',
          marginLeft: 1,
        }}
      >
        <Button
          style={{
            position: 'relative',
            transform: 'translateX(1px)',
          }}
          active={device === "MOBILE"}
          icon={
            <SmartphoneIcon
              style={{ transform: `translateX(${isSmall ? 6 : 12}px)` }}
            />
          }
          description={"Mobile"}
          onClick={()=>setDevice("MOBILE")}
          activeColor="primary"
        />
      </div>
    </div>
  );
};

export default React.memo(ToogleDevice);
