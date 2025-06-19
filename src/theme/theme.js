import { createTheme } from '@mui/material/styles';

const getAppTheme = (mode) => createTheme({
  palette: {
    mode: mode,
    ...(mode === 'light'
      ? { // Light palette
          background: {
            default: '#F8F9FB',
            paper: '#FFFFFF',
          },
          primary: {
            main: '#1A73E8',
          },
          secondary: {
            main: '#00BCD4',
          },
          success: {
            main: '#4CAF50',
          },
          text: {
            primary: '#333333',
            secondary: '#666666',
          },
          divider: '#E0E0E0',
        }
      : { // Dark palette (based on the dark theme section in your image)
          background: {
            default: '#1A1A1A', // Dark background for the overall app
            paper: '#2C2C2C', // Darker background for cards/containers
          },
          primary: {
            main: '#BBDEFF', // A lighter blue for contrast on dark background
          },
          secondary: {
            main: '#80DEEA', // Lighter cyan for contrast
          },
          success: {
            main: '#A5D6A7', // Lighter green for contrast
          },
          text: {
            primary: '#E0E0E0', // Light grey text
            secondary: '#B0B0B0',
          },
          divider: '#424242', // Darker grey for dividers
        }),
  },
  typography: {
    fontFamily: [
      'Inter',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: mode === 'light' ? '#FFFFFF' : '#3A3A3A', // Adjust background for dark mode
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: mode === 'light' ? '0px 4px 10px rgba(0, 0, 0, 0.05)' : '0px 4px 10px rgba(0, 0, 0, 0.3)', // Darker shadow for dark mode
        },
      },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: '12px',
                boxShadow: mode === 'light' ? '0px 4px 10px rgba(0, 0, 0, 0.05)' : '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }
        }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: mode === 'light' ? '#FFFFFF' : '#2C2C2C', // Adjust for dark mode
          borderBottom: `1px solid ${mode === 'light' ? '#E0E0E0' : '#424242'}`, // Adjust border for dark mode
        },
      },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#2C2C2C', // Adjust for dark mode
                boxShadow: mode === 'light' ? '0px 4px 10px rgba(0, 0, 0, 0.05)' : '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }
        }
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: '8px',
                margin: '4px 8px',
                '&.Mui-selected': {
                    backgroundColor: mode === 'light' ? 'rgba(26, 115, 232, 0.1)' : 'rgba(187, 222, 255, 0.1)',
                    color: mode === 'light' ? '#1A73E8' : '#BBDEFF',
                    '&:hover': {
                        backgroundColor: mode === 'light' ? 'rgba(26, 115, 232, 0.15)' : 'rgba(187, 222, 255, 0.15)',
                    }
                }
            }
        }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
    MuiSelect: {
        styleOverrides: {
            outlined: {
                borderRadius: '8px',
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#3A3A3A',
            }
        }
    }
  },
});

export default getAppTheme;