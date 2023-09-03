import type { FC, PropsWithChildren } from 'react';
import React, { useEffect, useMemo,useState,useRef } from 'react';
import { BottomToolbar } from '../../../../ui';
import type { CellPluginComponentProps } from '../../../types';
import {
  usePluginOfCell,
  useDebouncedCellData,
  useIsEditMode,
  useIsPreviewMode,
  useLang,
  useRemoveCell,
  useCellProps,
  useOption,
  useIsExclusivlyFocused,
  useDeviceByScreen,
  useDevice,
} from '../../hooks';
import PluginControls from '../PluginControls';
import PluginMissing from '../PluginMissing';
import NoopProvider from '../NoopProvider';
import { Devices } from '../../../actions/display';

const PluginComponent: FC<
  PropsWithChildren<{ nodeId: string; hasChildren: boolean }>
> = ({ nodeId, children, hasChildren }) => {
  const lang = useLang();
  const components = useOption('components');
  const CustomPluginMissing = components?.CellPluginMissing;
  const isPreviewMode = useIsPreviewMode();
  const isEditMode = useIsEditMode();

  const device:Devices=useDevice()

  const [data, onChange] = useDebouncedCellData(nodeId,device);
  const pluginId = useCellProps(nodeId, (c) => c?.plugin?.id);
  const plugin = usePluginOfCell(nodeId);
  const focused = useIsExclusivlyFocused(nodeId);
  const hasInlineNeighbour = useCellProps(nodeId, (c) => c?.hasInlineNeighbour);

  const Renderer = plugin?.Renderer;
  const Missing = CustomPluginMissing ?? PluginMissing;
  const Provider = plugin?.Provider ?? NoopProvider;
  const remove = useRemoveCell(nodeId);

  //const Toolbar = components?.BottomToolbar ?? BottomToolbar;

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
      device
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
      device
    ]
  );

  const [localFocused,setLocalFocused]=useState(focused)
  const _timeout:any = useRef(null);
  useEffect(()=>{
    if(focused===false && localFocused === true)
    {
      _timeout.current=setTimeout(()=>setLocalFocused(focused),200)
    }else
    {
      clearTimeout( _timeout.current)
      setLocalFocused(focused)
    }
  },[focused])

  // In case of non-zero cell spacing, nested layouts (layout plugins with children) should have their
  // margin collapsing functionality off. The simplest solution is to use display:flex for the below wrapping <div>.
  // This however is not compatible with inline elements flotation, so if a cell has inline neighbors, we are going
  // to have to keep display:block style. Layout plugins with inline cell support will have to take care of
  // margin collapsing internally on their own.
  const display = hasInlineNeighbour
    ? {}
    : {
        display: 'flex' as const,
        flexDirection: 'column' as const,
      };

  return (
    <Provider {...componentProps}>
      <>
        <div
          style={{
            ...display,
            height: '100%',
            pointerEvents:
              !isPreviewMode &&
              plugin &&
              !plugin?.allowClickInside &&
              !hasChildren
                ? 'none'
                : undefined,
          }}
        >
          {Renderer ? (
            <Renderer {...componentProps}>{children}</Renderer>
          ) : pluginId ? (
            <Missing {...componentProps} pluginId={pluginId} />
          ) : (
            children
          )}
        </div>

      </>
    </Provider>
  );
};

/*
<Toolbar
    nodeId={nodeId}
    open={localFocused}
    pluginControls={
      isEditMode && plugin?.controls ? (
        <PluginControls
          componentProps={componentProps}
          controls={plugin?.controls}
        />
      ) : null
    }
  />
*/

export default PluginComponent;
