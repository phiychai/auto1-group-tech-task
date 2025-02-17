import { ThemeOptions } from '@mui/material';
import { PALETTE_COLORS } from './colors';

export const DEFAULT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    ...PALETTE_COLORS,
    // background: {
    //   paper: '#f5f5f5',
    //   default: '#FFFFFF',
    // },
  },
};

export default DEFAULT_THEME;
