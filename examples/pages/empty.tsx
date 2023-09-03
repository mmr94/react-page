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
  const [device, setDevice] = useState<string | null>("DESKTOP");

  return (
    <PageLayout>
      <div style={{paddingLeft:100}}>
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
