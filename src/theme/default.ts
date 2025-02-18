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
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
};

export default DEFAULT_THEME;
