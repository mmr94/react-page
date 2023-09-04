import { FormControlLabel, Switch, Tooltip } from '@mui/material';
import VisibleIcon from '@mui/icons-material/Visibility';
import NonVisibleIcon from '@mui/icons-material/VisibilityOff';
import React from 'react';
import {
  useCellProps,
  useDevice,
  useLang,
  useSetDraft,
  useUiTranslator,
} from '../../core/components/hooks';

const DraftSwitch = ({ nodeId, lang }: { nodeId: string; lang?: string }) => {
  const { t } = useUiTranslator();
  const device=useDevice()

  const cell = useCellProps(nodeId, (c) => ({
    isDraftI18n: c?.isDraftI18n,
    isDraftMobI18n:c?.isDraftMobI18n
  }));
  const setDraft = useSetDraft(nodeId);
  const currentLang = useLang();
  if (!cell) {
    return null;
  }
  const theLang = lang ?? currentLang;
  const hasI18n = Boolean(cell.isDraftI18n);

  const isDraftDesktop = cell?.isDraftI18n?.[theLang];
  const isDraftMobile= cell?.isDraftMobI18n?.[theLang]

  var isDraft=isDraftDesktop
  if(device==="MOBILE" && isDraftMobile !== undefined){
    isDraft=isDraftMobile
  }

  const title = t(isDraft ? 'Content is hidden' : 'Content is visible');
  return cell ? (
    <Tooltip title={title + (hasI18n ? ' in ' + theLang : '')}>
      <FormControlLabel
        style={{ marginRight: 5 }}
        labelPlacement="start"
        control={
          <Switch
            color="primary"
            checked={!isDraft}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDraft(!e.target.checked, theLang, device);
            }}
          />
        }
        label={
          isDraft ? (
            <NonVisibleIcon style={{ marginTop: 5 }} />
          ) : (
            <VisibleIcon style={{ marginTop: 5 }} />
          )
        }
      />
    </Tooltip>
  ) : null;
};

export default DraftSwitch;
