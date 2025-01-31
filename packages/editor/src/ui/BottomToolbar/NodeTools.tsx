import { Avatar, Grid, Typography,IconButton,Tooltip,Divider, Button } from '@mui/material';
import React from 'react';
import {
  useDevice,
  useFocusCell,
  useOption,
  usePluginOfCell,
  useRemoveCell,
  useSetDevice,
  useUiTranslator,
} from '../../core/components/hooks';
import MoveActions from './MoveActions';
import { BottomToolbarTools } from './Tools';
import { DuplicateButton } from '../DuplicateButton';
import { Delete } from '@mui/icons-material';
import { SelectParentButton } from '../SelectParentButton';
import { I18nTools } from '../I18nTools';
import DraftSwitch from '../DraftSwitch';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';

export type BottomToolbarMainBarProps = {
  nodeId: string;
  actionsLeft?: React.ReactNode;
};
const divider=(full=false)=>(
  <Divider
    variant={full?"fullWidth":"middle"}
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

    const device=useDevice()
    const setDevice=useSetDevice()

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

          <Grid item={true} onClick={() => focus(true)} style={{cursor: 'pointer',width:160}}>
            <Typography variant="subtitle1" style={{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{t(title)}</Typography>
          </Grid>


          <Grid item={true} style={{ marginLeft: 'auto' }}>
            <DuplicateButton nodeId={nodeId} />

            <Tooltip title={t('Remove Plugin') ?? ''}>
                <IconButton
                  onClick={() => removeCell()}
                  aria-label="delete"
                  color="error"
                  style={{border:"1px solid #d32f2f",marginLeft:10}}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
          </Grid>

        </Grid>
        {divider(false)}

        <Grid container={true} direction="row" alignItems="center" justifyContent="space-between">

            <Grid item={true}>
              <I18nTools nodeId={nodeId} />
            </Grid>


            <Grid item={true}>
              <DraftSwitch nodeId={nodeId} />
            </Grid>

        </Grid>
        {divider(false)}

        {showMoveButtons ? (
          <>
          <Grid container={true} direction="row" alignItems="center" justifyContent="space-between">

            <Grid item={true}>
              <SelectParentButton nodeId={nodeId} />
            </Grid>


            <Grid item={true}>
              <MoveActions nodeId={nodeId} />
            </Grid>

          </Grid>

          {divider(false)}
          </>
        ) : null}

        <Grid container={true} direction="row" alignItems="center" justifyContent="space-around">

          <Grid item={true}>
            <Button
                variant={device === "DESKTOP"?"contained":"outlined"}
                startIcon={<DesktopMacOutlinedIcon/>}
                onClick={()=>setDevice("DESKTOP")}
            >
              Desktop
            </Button>
          </Grid>


          <Grid item={true}>
          <Button
                variant={device === "MOBILE"?"contained":"outlined"}
                startIcon={<SmartphoneIcon/>}
                onClick={()=>setDevice("MOBILE")}
            >
              Mobile
            </Button>
          </Grid>

        </Grid>
        {divider(true)}

      </div>
    );
  });
