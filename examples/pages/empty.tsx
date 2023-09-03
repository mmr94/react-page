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

  return (
    <PageLayout>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        lang={LANGUAGES[0].lang}
        onChange={(v)=>{
          console.log("VALUE EDITOR",v)
          setValue(v)
        }}
        languages={LANGUAGES}
      />
    </PageLayout>
  );
}
