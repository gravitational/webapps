import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'teleterm/ui/ThemeProvider/theme';

const menuLoginTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    subtle: theme.colors.primary.lighter,
    light: theme.colors.primary.light,
    primary: {
      ...theme.colors.primary,
      lighter: theme.colors.primary.darker,
    },
    grey: {
      [50]: 'rgba(255,255,255,0.05)',
      [900]: theme.colors.text.primary,
      [100]: theme.colors.text.secondary
    },
    link: theme.colors.text.primary,
  },
};

export const MenuLoginTheme: FC = props => (
  <ThemeProvider theme={menuLoginTheme} children={props.children} />
);
