import React, { useState } from 'react';
import type { Value } from '@kehila/react-page-editor';
import Editor from '@kehila/react-page-editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';

const cellPlugins = [slate(), image];

// Bare without page layout for bundle size debugging
const Bare = () => {
  const [value] = useState<Value | null>(null);

  return (
    <>
      <Editor cellPlugins={cellPlugins} value={value} />
    </>
  );
};
export default Bare;
