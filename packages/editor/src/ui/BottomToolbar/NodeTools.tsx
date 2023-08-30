import { Avatar, Grid, Typography,IconButton,Tooltip,Divider } from '@mui/material';
import React from 'react';
import {
  useFocusCell,
  useOption,
  usePluginOfCell,
  useRemoveCell,
  useUiTranslator,
} from '../../core/components/hooks';
import MoveActions from './MoveActions';
import { BottomToolbarTools } from './Tools';
import { DuplicateButton } from '../DuplicateButton';
import { Delete } from '@mui/icons-material';
import { SelectParentButton } from '../SelectParentButton';
import { I18nTools } from '../I18nTools';
import DraftSwitch from '../DraftSwitch';

export type BottomToolbarMainBarProps = {
  nodeId: string;
  actionsLeft?: React.ReactNode;
};
const divider = (
  <Divider
    style={{
      marginTop: 12,
      marginBottom: 12,
    }}
  />
);

export const BottomToolbarMainBar: React.FC<BottomToolbarMainBarProps> =
  React.memo(({ nodeId, actionsLeft }) => {
    const { title, icon } = usePluginOfCell(nodeId) ?? {};
    const { t } = useUiTranslator();
    const focus = useFocusCell(nodeId);
    const showMoveButtons = useOption('showMoveButtonsInBottomToolbar');
    const removeCell = useRemoveCell(nodeId);

    return (
      <div>
        <Grid container={true} direction="row" alignItems="center" justifyContent="space-between">

          {icon || title ? (
            <Grid item={true}>
              <Avatar
                onClick={() => focus(true)}
                children={icon || (title ? title[0] : '')}
                style={{
                  cursor: 'pointer',
                  marginRight: 16,
                }}
              />
            </Grid>
          ) : null}

          <Grid item={true} onClick={() => focus(true)} style={{cursor: 'pointer'}}>
            <Typography variant="subtitle1">{t(title)}</Typography>
          </Grid>


          <Grid item={true} style={{ marginLeft: 'auto' }}>
          <DuplicateButton nodeId={nodeId} />

            <Tooltip title={t('Remove Plugin') ?? ''}>
              <IconButton
                onClick={() => removeCell()}
                aria-label="delete"
                color="secondary"
              >
                <Delete />
              </IconButton>
              </Tooltip>
          </Grid>

        </Grid>
        {divider}

        <Grid container={true} direction="row" alignItems="center" justifyContent="space-between">

            <Grid item={true}>
              <I18nTools nodeId={nodeId} />
            </Grid>


            <Grid item={true}>
              <DraftSwitch nodeId={nodeId} />
            </Grid>

        </Grid>
        {divider}

        {showMoveButtons ? (
          <Grid container={true} direction="row" alignItems="center" justifyContent="space-between">

            <Grid item={true}>
              <SelectParentButton nodeId={nodeId} />
            </Grid>


            <Grid item={true}>
              <MoveActions nodeId={nodeId} />
            </Grid>

          </Grid>
        ) : null}
      </div>
    );
  });
