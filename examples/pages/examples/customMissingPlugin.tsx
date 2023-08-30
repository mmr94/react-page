import React, { useState } from 'react';
import type { Options, Value } from '@kehila/react-page-editor';
import Editor from '@kehila/react-page-editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import { demo } from '../../sampleContents/demo';
import { Button } from '@mui/material';

const cellPlugins = [slate(), image];

const customMissingPlugin = () => {
  const [value] = React.useState<Value>(demo);
  const [useCustom, setUseCustom] = useState(true);

  // make sure that you memoize custom components property to avoid unnesseary rerenders
  const components = React.useMemo<Options['components']>(
    () =>
      useCustom
        ? {
            CellPluginMissing: (props) => (
              <p style={{ color: 'red' }}>
                sorry, plugin {props.pluginId} not found 😢{' '}
              </p>
            ),
          }
        : {},
    [useCustom]
  );

  return (
    <>
      <Button onClick={() => setUseCustom(!useCustom)}>
        Toggle custom missing plugin
      </Button>
      <Editor cellPlugins={cellPlugins} value={value} components={components} />
    </>
  );
};

export default customMissingPlugin;
