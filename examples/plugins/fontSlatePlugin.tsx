import React, { useMemo } from 'react';
import { pluginFactories } from '@react-page/plugins-slate';
import { Select,MenuItem } from '@mui/material';
import { connectField } from 'uniforms';

const fonts=[
  {value:"Roboto",label:"Roboto"},
  {value:"Arial",label:"Arial"},
]

export default pluginFactories.createComponentPlugin<{
  fontFamily: string;
}>({
  addHoverButton: true, // whether to show it above the text when selected
  addToolbarButton: true, // whether to show it in the bottom toolbar
  type: 'SetFont', // a well defined string, this is kind of the id of the plugin
  object: 'mark', // mark is like a span, other options are inline and block
  icon: <span>Police</span>, // an icon to show
  label: 'Set Font',
  Component: 'span', // the component to render
  getStyle: ({ fontFamily }) => ({ fontFamily }),
  controls: {
    // identical to custom cell plugins
    type: 'autoform',
    schema:{
      type:"object",
      required: ['fontFamily'],
      properties: {
        fontFamily: {
          uniforms: {
            component: connectField<{
              value: string;
              label: string;
              onChange: (v: any) => void;
            }>((props)=>{
                return (
                  <Select label="Police" value={props.value} onChange={(e)=>{
                    const value=e.target.value
                    props.onChange(value)
                  }}>
                    {fonts.map(i=>(<MenuItem value={i.value}>{i.label}</MenuItem>))}
                  </Select>
                )
            }),
          },
          default: fonts[0].value,
          type: 'string',
        },
      },
    }
  },
});


