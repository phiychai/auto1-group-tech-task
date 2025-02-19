import { PaletteOptions, SimplePaletteColorOptions } from '@mui/material';

const PRIMARY_COLOR: SimplePaletteColorOptions = {
  main: '#EA7F28',
  contrastText: '#fff',
};

const SECONDARY_COLOR: SimplePaletteColorOptions = {
  main: '#D37324',
  contrastText: '#fff',
};

const BORDER_COLOR = '#EDEDED';
const TEXT_COLORS = {
  primary: '#4A4A4A',
  disabled: '#999999',
};
export const PALETTE_COLORS: Partial<PaletteOptions> = {
  primary: PRIMARY_COLOR,
  secondary: SECONDARY_COLOR,
  divider: BORDER_COLOR,
  text: TEXT_COLORS,
};
