import React from 'react';
import { ThemeProvider, useTheme } from 'design/styled';
import DesignTable from 'design/DataTable/Table';
import { TableProps } from 'design/DataTable/types';

export function Table<T>(props: TableProps<T>) {
  const theme = useTheme();

  return (
    <ThemeProvider theme={getTableTheme(theme)}>
      <DesignTable {...props} />
    </ThemeProvider>
  );
}

function getTableTheme(theme) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: {
        ...theme.colors.primary,
        dark: 'rgba(255, 255, 255, 0.05)',
        light: theme.colors.primary.dark,
        lighter: theme.colors.primary.light,
        main: theme.colors.primary.darker,
      },
      link: theme.colors.text.primary,
    },
  };
}
