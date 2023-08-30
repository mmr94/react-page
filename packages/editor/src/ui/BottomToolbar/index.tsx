import type { FC, PropsWithChildren } from 'react';
import React, { Fragment, useMemo } from 'react';
import { BottomToolbarDrawer } from './Drawer';
import { BottomToolbarMainBar } from './NodeTools';
import { ScaleButton } from './ScaleButton';
import type { BottomToolbarProps } from './types';
import { useDebouncedCellData, useFocusedNodeId, useIsEditMode, useIsExclusivlyFocused, useIsPreviewMode, useLang, usePluginOfCell, useRemoveCell, useUiTranslator } from '../../core/components/hooks';
import PluginControls from '../../core/components/Cell/PluginControls';
import { CellPluginComponentProps } from '../../core/types';
import { Typography } from '@mui/material';
export * from './types';
export * from './Drawer';
export * from './NodeTools';
export * from './Tools';

export const BottomToolbar: FC<PropsWithChildren<BottomToolbarProps>> =
  React.memo(
    ({
      open=false,
      className,
      anchor = 'bottom',
      style,
      children,
    }) => {
      const [scale, setScale] = React.useState(1);
      const nodeId=useFocusedNodeId()
      const {t}=useUiTranslator()


      return (
        <BottomToolbarDrawer
          className={className}
          open={open}
          anchor={anchor}
          scale={scale}
          style={style}
        >
          {nodeId && (
            <BottomToolbarBody nodeId={nodeId}/>
          )}

          {!nodeId &&(
            <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <Typography variant='subtitle1' color="GrayText">
                {t("Selectionnez un plugin")}
              </Typography>

            </div>
          )}
        </BottomToolbarDrawer>
      );
    }
  );


  /*
   <>
      <BottomToolbarMainBar
        nodeId={nodeId}
        actionsLeft={[]}
      />
      {pluginControls}
      {children}
    </>
  */

  type BottomToolbarBodyProps={
    nodeId:string
  }

  function BottomToolbarBody({nodeId}:BottomToolbarBodyProps)
  {
    const lang = useLang();
    const plugin=usePluginOfCell(nodeId)
    const [data, onChange] = useDebouncedCellData(nodeId);
    const isPreviewMode = useIsPreviewMode();
    const isEditMode = useIsEditMode();
    const focused = useIsExclusivlyFocused(nodeId);
    const remove = useRemoveCell(nodeId);

    const componentProps = useMemo<CellPluginComponentProps>(
      () => ({
        nodeId,
        lang,
        data,
        pluginConfig: plugin,
        focused: isEditMode && focused,
        readOnly: !isEditMode,
        onChange: onChange,
        isEditMode,
        isPreviewMode,
        remove,
      }),
      [
        nodeId,
        lang,
        data,
        plugin,
        isEditMode,
        focused,
        onChange,
        isEditMode,
        isPreviewMode,
        remove,
      ]
    );

      return(
        <>
          <BottomToolbarMainBar
            nodeId={nodeId}
            actionsLeft={[]}
          />
          {plugin?.controls && (
            <PluginControls
              componentProps={componentProps}
              controls={plugin?.controls}
            />
          )}
        </>
      )
  }
