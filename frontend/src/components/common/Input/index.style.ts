import { InputHTMLAttributes } from 'react';
import { StyledComponentProps, styled } from '@mui/material';

import { CustomTheme } from 'styles/themes/types';

type InputComponentStyleProps = StyledComponentProps &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'disabled'> & {
    label?: string;
    inputSize: 'regular' | 'large';
    multiLine?: boolean;
  };

export const InputComponentStyle = styled('div')<InputComponentStyleProps>(
  ({ theme, disabled, inputSize, multiLine }: any) => {
    const customTheme = theme as CustomTheme;

    return {
      border: `1px solid ${customTheme.colors.primary20}`,
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem 0.5rem 1rem',

      '.text-container': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 1,

        '.label': {
          fontSize: inputSize === 'regular'? '12px': '16px',
          color: customTheme.colors.textPrimary10
        },

        '.text': {
          fontFamily: 'inherit',
          fontSize: inputSize === 'regular'? '16px': '20px', 
          padding: '0px',

          '.MuiInputBase-input': {
            color: 'inherit',
            padding: '0px',
            fontFamily: 'inherit',
          },
        }
      },

      '.icon-container': {
        flex: '0 0 16px',
        height: '16px'
      },

      '.front': {
        marginRight: '8px'
      },

      '.back': {
        marginLeft: '8px'
      }
    }
  }
);
