import { PaletteType } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

export const DARK_GRAY = '#2a3e49';
export const LIGHT_GRAY = '#425159';
export const MAIN_YELLOW = amber[500];
export const LIGHT_GREEN = '#a6ce38';
export const LIGHT_BLUE = '#0098da';
export const appBarHeight = '64px';

const baseTheme: ThemeOptions = {
  palette: {
    primary: {
      main: MAIN_YELLOW,
    },
    secondary: {
      main: DARK_GRAY,
    },
    background: {
      default: DARK_GRAY,
      paper: '#425159',
    },
    success: {
      main: LIGHT_GREEN,
    },
    info: {
      main: LIGHT_BLUE,
    },
  },
  shape: {
    borderRadius: 16,
  },
  overrides: {
    MuiTableCell: {
      body: {
        '& a': {
          textDecoration: 'none',
          color: 'white',
        },
        '&:hover a': {
          textDecoration: 'none',
          cursor: 'pointer',
          color: MAIN_YELLOW,
        },
        '&:active a': {
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 8,
        boxShadow: 'none !important',
        '&:hover': {
          boxShadow: 'none !important',
        },
      },
      containedPrimary: {
        color: DARK_GRAY,
        background: `linear-gradient(137deg, ${amber.A200} -7%, ${amber[500]} 107%)`,
      },
    },
    MuiListItem: {
      root: {
        borderRadius: 8,
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#425159',
      },
    },
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': MAIN_YELLOW,
        },
      },
    },
  },
};

const buildTheme = (type: PaletteType, themeOptions: ThemeOptions) => {
  const newTheme = { ...themeOptions };
  newTheme.palette = newTheme.palette || {};
  newTheme.palette.type = type;
  return createMuiTheme(themeOptions);
};

export const DarkTheme = buildTheme('dark', baseTheme);
export const LightTheme = buildTheme('light', baseTheme);
