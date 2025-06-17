// src/context/ThemeContext.jsx
import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'; // Rename to avoid conflict
import CssBaseline from '@mui/material/CssBaseline';
import getAppTheme from '../theme/theme.js'; // Import the theme creator function

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ThemeProvider = ({ children }) => {
  // Try to get saved mode from localStorage, default to 'light'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode); // Save preference
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = useMemo(
    () => getAppTheme(mode),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

// Custom hook to easily use the theme toggler
export const useColorMode = () => useContext(ColorModeContext);