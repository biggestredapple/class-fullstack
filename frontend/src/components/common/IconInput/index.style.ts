import { StyledComponentProps, styled } from '@mui/material';

import { CustomTheme } from 'styles/themes/types';

type IconInputComponentStyleProps = StyledComponentProps & {};

export const IconInputComponentStyle = styled('div')<IconInputComponentStyleProps>(
  ({ theme }: any) => {
    const customTheme = theme as CustomTheme;

    return {
      width: '100%',
      height: '2.5rem',
      backgroundColor: customTheme.colors.primary10,
      border: `1px solid ${customTheme.colors.primary20}`,
      borderRadius: '0.5rem',
      padding: '0.5rem',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',

      '.icon-container': {
        color: customTheme.colors.secondary00,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },

      '.input-container': {
        marginLeft: '0.5rem',
        width: '100%'
      }
    }
  }
);
