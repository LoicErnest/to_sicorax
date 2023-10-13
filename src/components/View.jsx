import * as React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DoneIcon from '@mui/icons-material/Done';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TreeTableCom from './Table';


const validTheme = createTheme({
  palette: {
    secondary: {
      main: '#31CB00', 
    },
  },
});


const pendingTheme = createTheme({
  palette: {
    secondary: {
      main: '#e71d36', 
    },
  },
});

export default function View({start, end}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const selectedTheme = value === '1' ? validTheme : pendingTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab
                value="1"
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DoneIcon sx={{ color: 'secondary' }} />
                    <span style={{ marginLeft: '8px' }}>VALID</span>
                  </div>
                }
              />
              <Tab
                value="2"
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ErrorOutlineIcon sx={{ color: 'secondary' }} />
                    <span style={{ marginLeft: '8px' }}>PENDING</span>
                  </div>
                }
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TreeTableCom
              start={start}
              end={end}
            />
            </TabPanel>
          <TabPanel value="2">PENDING</TabPanel>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
}
