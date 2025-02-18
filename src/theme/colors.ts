import { PaletteOptions, SimplePaletteColorOptions } from '@mui/material';

const PRIMARY_COLOR: SimplePaletteColorOptions = {
  main: '#EA7F28',
};

const SECONDARY_COLOR: SimplePaletteColorOptions = {
  main: '#D37324',

};

const BORDER_COLOR = '#EDEDED';

export const PALETTE_COLORS: Partial<PaletteOptions> = {
  primary: PRIMARY_COLOR,
  secondary: SECONDARY_COLOR,
  divider: BORDER_COLOR,
};
