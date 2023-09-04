import { Devices } from '../actions/display';
import type { Cell } from '../types';
import _ from 'lodash'

export const getCellData = (
  cell: any,
  lang: string,
  device:Devices="DESKTOP"
) => {
  //console.log("DATA",device,cell?.dataI18n,cell?.dataMobI18n)

  var dataI18n = cell?.dataI18n
  if(device==="MOBILE"){
    dataI18n = _.merge({}, cell?.dataI18n,cell?.dataMobI18n);
  }

  //console.log("FINAL DATA",device,dataI18n)


  return (
    dataI18n?.[lang] ??
    // find first non-empty
    dataI18n?.[Object.keys(dataI18n).find((l) => dataI18n[l]) ?? 'default'] ??
    {}
  );
};

