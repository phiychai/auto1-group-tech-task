import { ThemeOptions } from '@mui/material';
import { PALETTE_COLORS } from './colors';
import typography from './typography'; // Import the typography configuration

export const DEFAULT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    ...PALETTE_COLORS,
    // background: {
    //   paper: '#f5f5f5',
    //   default: '#FFFFFF',
    // },
  },
  typography,
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          textDecoration: 'none',
          transition: 'border 0.3s ease',
          borderBottom: '1px solid transparent',
            paddingTop: '2px',
          paddingBottom: '0px',
          paddingRight: '0px',
          paddingleft: '0px',
          lineHeight: "1.2",
          '&:hover': {
            backgroundColor: 'transparent',
            borderBottom: '1px solid',
            textDecoration: 'none',
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
};

export default DEFAULT_THEME;
