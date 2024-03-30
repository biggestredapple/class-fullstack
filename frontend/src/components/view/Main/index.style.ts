import { StyledComponentProps, styled } from '@mui/material';

import { CustomTheme } from 'styles/themes/types';

type MainViewStyleProps = StyledComponentProps & {};

export const MainViewStyle = styled('div')<MainViewStyleProps>(
  ({ theme }: any) => {
    const customTheme = theme as CustomTheme;

    return {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '2rem',
      boxSizing: 'border-box',

      [customTheme.breakpoints.down('md')]: {
        padding: '2rem 0.5rem 0.5rem 0.5rem',
      },

      '.container': {
        width: '80%',
        backgroundColor: customTheme.colors.primary10,
        border: `1px solid ${customTheme.colors.primary20}`,
        borderRadius: '1rem',
        padding: '1.5rem 1.5rem 0.5rem 1.5rem',
        boxSizing: 'border-box',

        [customTheme.breakpoints.down('md')]: {
          width: '100%',
          padding: '1.5rem 0.5rem 0.5rem 0.5rem',
        },

        '.actions-container': {
          display: 'flex',
          justifyContent: 'space-between',

          [customTheme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column'
          },

          '.condition-container': {
            [customTheme.breakpoints.down('md')]: {
              marginTop: '1rem'
            }
          }
        },

        '.data-container': {
          marginTop: '1rem'
        }
      },

      '.btn': {
        color: customTheme.colors.textPrimary00,
        borderColor: customTheme.colors.primary20,
      },

      '.contained': {
        backgroundColor: customTheme.colors.primary20
      }
    }
  }
);
