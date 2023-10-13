import { createTheme } from '@mui/material/styles';

export const themeBar = createTheme({
    palette: {
      primary: {
        main: '#4281A4',       
      },
      secondary: {
        main: '#4281A4', 
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      fontSize: 14,
    },
    spacing: 8, 
  });