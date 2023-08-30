import React from 'react';

import { PluginDrawer } from '../PluginDrawer';
import { Trash } from '../Trash';
import type { StickyNess } from '../Sidebar';
import { Sidebar } from '../Sidebar';
import { useIsEditMode, useOption } from '../../core/components/hooks';
import { MultiNodesBottomToolbar } from '../MultiNodesBottomToolbar';
import { BottomToolbar } from '../BottomToolbar';

export default React.memo(
  ({
    stickyNess = {
      shouldStickToTop: false,
      shouldStickToBottom: false,
      rightOffset: 0,
      rightOffsetFixed: 0,
    },
  }: {
    stickyNess?: StickyNess;
  }) => {
    const hideEditorSidebar = useOption('hideEditorSidebar');
    const isEditMode = useIsEditMode();
    return (
      <>
        <Trash />
        {!hideEditorSidebar && <Sidebar stickyNess={stickyNess} />}
        <PluginDrawer />
        {/*<MultiNodesBottomToolbar />*/}
        <BottomToolbar open={isEditMode} />
      </>
    );
  }
);
