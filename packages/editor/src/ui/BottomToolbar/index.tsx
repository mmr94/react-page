import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { BottomToolbarDrawer } from './Drawer';
import { BottomToolbarMainBar } from './NodeTools';
import { ScaleButton } from './ScaleButton';
import type { BottomToolbarProps } from './types';
export * from './types';
export * from './Drawer';
export * from './NodeTools';
export * from './Tools';

export const BottomToolbar: FC<PropsWithChildren<BottomToolbarProps>> =
  React.memo(
    ({
      open = false,
      className,

      anchor = 'bottom',
      pluginControls,
      nodeId,
      actionsLeft,
      style,
      children,
    }) => {

      const [scale, setScale] = React.useState(1);

      return (
        <BottomToolbarDrawer
          className={className}
          open={pluginControls?open:false}
          anchor={anchor}
          scale={scale}
          style={style}
        >
          <BottomToolbarMainBar
            nodeId={nodeId}
            actionsLeft={[
              ...React.Children.toArray(actionsLeft),
            ]}
          />
          {pluginControls}
          {children}


        </BottomToolbarDrawer>
      );
    }
  );
