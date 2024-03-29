import { StyledComponentProps, styled } from '@mui/material';

import { CustomTheme } from 'styles/themes/types';

type ConfirmModalStyleProps = StyledComponentProps & {};

export const ConfirmModalStyle = styled('div')<ConfirmModalStyleProps>(
  ({ theme }: any) => {
    const customTheme = theme as CustomTheme;

    return {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 150,

      '.container': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '20rem',
        backgroundColor: customTheme.colors.primary00,
        border: `1px solid ${customTheme.colors.primary20}`,
        borderRadius: '0.5rem',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
        p: 4,
        color: customTheme.colors.textPrimary00,
        boxSizing: 'border-box',

        '.header': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          '.warning': {
            fontSize: '5rem'
          }
        },

        '.content': {
          textAlign: 'center',
          fontSize: '1.2rem',
          marginTop: '1rem'
        },
        
        '.footer': {
          display: 'flex',
          justifyContent: 'center',
          padding: '1rem'
        }
      }
    }
  }
);
