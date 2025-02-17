import { FunctionComponent, useMemo, PropsWithChildren } from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { CssBaseline } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import LIGHT_THEME from './default';

const COLOR_SCHEME_SELECTOR = 'class';

function getThemeForLightMode() {
  const themeForLightAndDarkWithCssVariables = createTheme({
    colorSchemes: {
      light: LIGHT_THEME,
    },
    cssVariables: {
      colorSchemeSelector: COLOR_SCHEME_SELECTOR,
    },
  });
  const responsiveTheme = responsiveFontSizes(themeForLightAndDarkWithCssVariables);
  return responsiveTheme;
}

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const dualModeTheme = useMemo(() => getThemeForLightMode(), []);

  return (
    <MuiThemeProvider
      noSsr
      theme={dualModeTheme}
      defaultMode='light'
    >
      <InitColorSchemeScript attribute={COLOR_SCHEME_SELECTOR} defaultMode='light' />
      <CssBaseline
        enableColorScheme
      />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
