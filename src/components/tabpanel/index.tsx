import { Box } from '@material-ui/core';
import React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    padding: boolean;
}

function TabPanel (props: TabPanelProps) {
    const { children, value, index, padding, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {padding 
      ? value === index && (
        <Box p={3}>
          {children}
        </Box>
      )
      : children}
    </div>
  );
}

export default TabPanel;