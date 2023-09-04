import type { Value, Options } from '@kehila/react-page-editor';
import Editor from '@kehila/react-page-editor';

import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { cellPlugins } from '../plugins/cellPlugins';

const LANGUAGES = [
  {
    lang: 'en',
    label: 'English',
  },
  {
    lang: 'de',
    label: 'Deutsch',
  },
];

export default function Empty() {
  const [value, setValue] = useState<Value | null>(null);
  const [device, setDevice] = useState<string>("DESKTOP");
  const [readOnly, setReadOnly] = useState<boolean>(false);

  return (
    <PageLayout onChangeReadOnly={setReadOnly}>
      <div style={{paddingLeft:readOnly?0:100}}>
        <div className={device==="MOBILE"?"sm-force":undefined} style={{width:device==="DESKTOP"?"100%":350}}>
          <Editor
            cellPlugins={cellPlugins}
            value={value}
            lang={LANGUAGES[0].lang}
            onChange={(v)=>{
              console.log("VALUE EDITOR",v)
              setValue(v)
            }}
            languages={LANGUAGES}
            readOnly={readOnly}
            onChangeLang={(l)=>console.log("CHANGE LANG",l)}
            onChangeDevice={(d)=>{
              if(d==="MOBILE"){
                //document.querySelector('meta[name="viewport"]')?.setAttribute('content', 'width='+350);
              }
              setDevice(d)
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
}
